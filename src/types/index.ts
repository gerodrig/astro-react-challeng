import type { RenderedContent, InferEntrySchema } from "astro:content";

export interface Project {
    name: string;
    description: string;
    componentName?: string;
}

export interface Challenges {
        id: string;
        body?: string;
        collection: "reactChallenges";
        data: InferEntrySchema<"reactChallenges">;
        rendered?: RenderedContent;
        filePath?: string;
}