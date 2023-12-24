import { z } from 'zod';

//Initialization options
export type DockerHubTagsFilter = {
	os?: string;
	architecture?: string;
	variant?: string;
};
export const defaultDockerHubTagsFilter: DockerHubTagsFilter = {};

export type DockerHubTagsOptions = {
	limit: number;
	retry: number;
};
export const defaultDockerHubTagsOptions: DockerHubTagsOptions = {
	limit: 1000,
	retry: 10
};

//Error
export class DockerHubTagsError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'DockerHubTagsError';
	}
}

//Version
export type SemverLevel = 'patch' | 'minor' | 'major' | 'evenMajor';

export type ParsedVersion = {
	major: number;
	minor: number;
	patch: number;
	postfix: string;
};
export type ParsedVersionLevel = ParsedVersion & { semverLevel: SemverLevel };

//TagInfo
export type Tag = HubResult;
export type TagDetailed = HubResult & { sameTags: string[] };

//Hub response
export const HubImage = z.object({
	os: z.string(),
	architecture: z.string(),
	variant: z.string().nullable(),
	size: z.number(),
	status: z.string(),
	digest: z.string().default('') //not exists for inactive items
});
export type HubImage = z.infer<typeof HubImage>;

export const HubResult = z.object({
	name: z.string(),
	tag_status: z.string(),
	content_type: z.string(),
	full_size: z.number(),
	last_updated: z.date({ coerce: true }),
	digest: z.string().default(''), //not exists for inactive items
	images: z.array(HubImage)
});
export type HubResult = z.infer<typeof HubResult>;

export const HubResponse = z.object({
	count: z.number(),
	next: z.string().nullable(),
	results: z.array(HubResult)
});
export type HubResponse = z.infer<typeof HubResponse>;
