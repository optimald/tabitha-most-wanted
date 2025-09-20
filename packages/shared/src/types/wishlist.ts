import { z } from 'zod';
import { ProductSchema } from './product';

export const WishlistSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  name: z.string().min(1),
  type: z.enum(['birthday', 'christmas', 'holiday', 'general']),
  description: z.string().optional(),
  shareId: z.string().optional(),
  isPublic: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Wishlist = z.infer<typeof WishlistSchema>;

export const CreateWishlistSchema = WishlistSchema.omit({
  id: true,
  shareId: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateWishlist = z.infer<typeof CreateWishlistSchema>;

export const UpdateWishlistSchema = CreateWishlistSchema.partial();

export type UpdateWishlist = z.infer<typeof UpdateWishlistSchema>;

export const WishlistItemSchema = z.object({
  id: z.string().uuid(),
  wishlistId: z.string().uuid(),
  productId: z.string().uuid(),
  priority: z.number().int().min(1).max(10).default(5),
  notes: z.string().optional(),
  addedAt: z.date(),
});

export type WishlistItem = z.infer<typeof WishlistItemSchema>;

export const WishlistItemWithProductSchema = WishlistItemSchema.extend({
  product: ProductSchema,
});

export type WishlistItemWithProduct = z.infer<typeof WishlistItemWithProductSchema>;

export const WishlistWithItemsSchema = WishlistSchema.extend({
  items: z.array(WishlistItemWithProductSchema),
});

export type WishlistWithItems = z.infer<typeof WishlistWithItemsSchema>;

export const CreateWishlistItemSchema = WishlistItemSchema.omit({
  id: true,
  addedAt: true,
});

export type CreateWishlistItem = z.infer<typeof CreateWishlistItemSchema>;

export const UpdateWishlistItemSchema = z.object({
  priority: z.number().int().min(1).max(10).optional(),
  notes: z.string().optional(),
});

export type UpdateWishlistItem = z.infer<typeof UpdateWishlistItemSchema>;

export const ShareWishlistSchema = z.object({
  wishlistId: z.string().uuid(),
  method: z.enum(['email', 'sms']),
  recipients: z.array(z.string()),
  message: z.string().optional(),
});

export type ShareWishlist = z.infer<typeof ShareWishlistSchema>;
