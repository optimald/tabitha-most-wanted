import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  price: z.number().min(0),
  originalPrice: z.number().min(0).optional(),
  currency: z.string().length(3), // USD, EUR, etc.
  imageUrl: z.string().url(),
  productUrl: z.string().url(),
  retailer: z.enum(['amazon', 'walmart']),
  category: z.string(),
  ageRange: z.object({
    min: z.number().int().min(0),
    max: z.number().int().max(18),
  }),
  rating: z.number().min(0).max(5).optional(),
  availability: z.boolean(),
  scrapedAt: z.date(),
});

export type Product = z.infer<typeof ProductSchema>;

export const CreateProductSchema = ProductSchema.omit({
  id: true,
});

export type CreateProduct = z.infer<typeof CreateProductSchema>;

export const ProductFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  retailer: z.enum(['amazon', 'walmart']).optional(),
  ageRange: z.object({
    min: z.number().int().min(0),
    max: z.number().int().max(18),
  }).optional(),
  availability: z.boolean().optional(),
});

export type ProductFilter = z.infer<typeof ProductFilterSchema>;

export const ProductSearchSchema = z.object({
  query: z.string().min(1),
  filters: ProductFilterSchema.optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export type ProductSearch = z.infer<typeof ProductSearchSchema>;
