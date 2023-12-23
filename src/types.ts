import { z } from 'zod';

//Initialization options
export type DockerHubTagsOptions = {
	limit: number;
	retry: number;
};
export const defaultDockerHubTagsOptions: DockerHubTagsOptions = {
	limit: 1000,
	retry: 10
};

//Hub response
export const HubImage = z.object({
	os: z.string(),
	architecture: z.string(),
	variant: z.string().nullable(),
	size: z.number(),
	status: z.string(),
	digest: z.string()
});
export type HubImage = z.infer<typeof HubImage>;

export const HubResult = z.object({
	name: z.string(),
	tag_status: z.string(),
	content_type: z.string(),
	full_size: z.number(),
	last_updated: z.date({ coerce: true }),
	digest: z.string(),
	images: z.array(HubImage)
});
export type HubResult = z.infer<typeof HubResult>;

export const HubResponse = z.object({
	count: z.number(),
	next: z.string().nullable(),
	results: z.array(HubResult)
});

export type HubResponse = z.infer<typeof HubResponse>;