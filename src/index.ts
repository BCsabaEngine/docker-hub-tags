import {
	defaultDockerHubTagsFilter,
	defaultDockerHubTagsOptions,
	DockerHubTagsError,
	DockerHubTagsFilter,
	DockerHubTagsOptions,
	HubResponse,
	HubResult,
	ParsedVersion,
	ParsedVersionLevel,
	Tag,
	TagDetailed
} from './types';
import { fetchRetry, isHigherVersion, parseVersion, parseVersionWithLevel } from './utils';

export const OFFICIALIMAGES_NAMESPACE = 'library';
export class DockerHubTags {
	private tags: HubResult[] = [];

	private constructor(tags: HubResult[]) {
		this.tags = tags;
	}

	private static async fetch(
		namespace: string,
		repository: string,
		filter: DockerHubTagsFilter,
		options: DockerHubTagsOptions
	): Promise<HubResult[]> {
		const PAGESIZE = 100;
		const HTTP_HEADERS = { Accept: 'application/json' };

		const getUrl = (page: number = 0) =>
			`https://hub.docker.com/v2/namespaces/${namespace}/repositories/${repository}/tags?page=${page}&page_size=${PAGESIZE}`;

		const tags: HubResult[] = [];

		let page = 0;
		// eslint-disable-next-line no-constant-condition
		tagLimit: while (true) {
			page++;

			const fetched = await fetchRetry(getUrl(page), options.retry, {
				method: 'GET',
				mode: 'cors',
				headers: HTTP_HEADERS
			});
			const json = JSON.parse(await fetched.text());
			const response = HubResponse.parse(json);

			for (const tag of response.results) {
				if (tag.content_type === 'image' && tag.tag_status === 'active' && tag.digest) {
					tag.images = tag.images.filter(
						(image) =>
							image.status === 'active' &&
							image.digest &&
							image.os !== 'unknown' &&
							image.architecture !== 'unknown' &&
							(!filter.os || image.os === filter.os) &&
							(!filter.architecture || image.architecture === filter.architecture) &&
							(!filter.variant || image.variant === filter.variant)
					);
					if (tag.images.length > 0) tags.push(tag);
					if (options.limit > 0 && tags.length >= options.limit) break tagLimit;
				}
			}
			if (!response.next) break;
		}

		return tags;
	}

	public static init = async (
		namespace: string,
		repository: string,
		filter: Partial<DockerHubTagsFilter> = defaultDockerHubTagsFilter,
		options: Partial<DockerHubTagsOptions> = defaultDockerHubTagsOptions
	) =>
		new DockerHubTags(
			await DockerHubTags.fetch(
				namespace,
				repository,
				Object.assign(defaultDockerHubTagsFilter, filter),
				Object.assign(defaultDockerHubTagsOptions, options)
			)
		);

	public static createFromJson = (json: string) => new DockerHubTags(JSON.parse(json));
	public exportToJson = (): string => JSON.stringify(this.tags, undefined, 2);

	public getAllTags = (): Tag[] => this.tags;
	public getLatest = (): TagDetailed | undefined => this.getTag('latest');
	public getTag = (tag: string): TagDetailed | undefined => {
		const tagFound: Tag | undefined = this.tags.find((t) => tag.localeCompare(t.name) === 0);
		if (!tagFound) return;

		return {
			...tagFound,
			sameTags: this.tags.filter((t) => t.digest === tagFound.digest).map((t) => t.name)
		};
	};

	public getRecent = (version: string | ParsedVersionLevel): TagDetailed | undefined => {
		const currentVersion: ParsedVersionLevel | undefined =
			typeof version === 'string' ? parseVersionWithLevel(version) : version;
		if (!currentVersion) throw new DockerHubTagsError(`Cannot parse ${version}`);

		let resultTag: { name: string; version: ParsedVersion } | undefined;
		for (const t of this.tags) {
			const targetVersion = parseVersion(t.name);
			if (
				targetVersion &&
				isHigherVersion(currentVersion, targetVersion) &&
				(!resultTag || isHigherVersion(resultTag.version, targetVersion))
			)
				resultTag = {
					name: t.name,
					version: targetVersion
				};
		}

		return resultTag ? this.getTag(resultTag.name) : undefined;
	};
}
