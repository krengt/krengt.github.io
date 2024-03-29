import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		categories: z.array(z.string().nonempty()),
		tags: z.array(z.string().nonempty()),
		featured: z.string().optional(),
		// description: z.string(),
		// // Transform string to Date object
		// pubDate: z
		// 	.string()
		// 	.or(z.date())
		// 	.transform((val) => new Date(val)),
		// updatedDate: z
		// 	.string()
		// 	.optional()
		// 	.transform((str) => (str ? new Date(str) : undefined)),
		// heroImage: z.string().optional(),
	}),
});

export const collections = { articles };
