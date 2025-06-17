//1. Import utilities from astro:content
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

//2. Define a type and schema for each collection
const reactChallengeCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content" }),
    schema: z.object({
        name: z.string(),
        description: z.string(),
    })
});

export const collections = { 'reactChallenges': reactChallengeCollection }