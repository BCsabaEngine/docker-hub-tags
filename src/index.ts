import { readFileSync, writeFileSync } from 'node:fs';

import { defaultDockerHubTagsOptions, DockerHubTagsOptions, HubResponse, HubResult } from './types';
import { fetchRetry } from './utils';

export const OFFICIALIMAGES_NAMESPACE = 'library';
export class DockerHubTags {
	private tags: HubResult[] = [];

	private constructor(tags: HubResult[]) {
		this.tags = tags;
	}

	private static async fetch(
		namespace: string,
		repository: string,
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
				if (tag.content_type === 'image' && tag.tag_status === 'active') {
					tag.images = tag.images.filter(
						(image) =>
							image.status === 'active' &&
							image.os !== 'unknown' &&
							image.architecture !== 'unknown'
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
		options: Partial<DockerHubTagsOptions> = defaultDockerHubTagsOptions
	) =>
		new DockerHubTags(
			await DockerHubTags.fetch(
				namespace,
				repository,
				Object.assign(defaultDockerHubTagsOptions, options)
			)
		);

	public static createFrom = (filename: string) =>
		new DockerHubTags(JSON.parse(readFileSync(filename).toString()));

	public exportTo = (filename: string) => writeFileSync(filename, JSON.stringify(this.tags));

	public getAllTags = () => this.tags;
}
