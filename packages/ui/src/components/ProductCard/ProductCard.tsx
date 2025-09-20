import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const productCardVariants = cva(
  "relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl",
  {
    variants: {
      size: {
        default: "w-full max-w-sm",
        sm: "w-64",
        lg: "w-full max-w-md",
        full: "w-full",
      },
      interactive: {
        true: "cursor-pointer hover:scale-105 active:scale-95",
        false: "",
      },
    },
    defaultVariants: {
      size: "default",
      interactive: true,
    },
  }
);

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  product: {
    id: string;
    title: string;
    description?: string;
    price: number;
    originalPrice?: number;
    currency: string;
    imageUrl: string;
    retailer: 'amazon' | 'walmart';
    rating?: number;
  };
  onAddToWishlist?: (productId: string) => void;
  onPass?: (productId: string) => void;
  showActions?: boolean;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ 
    className, 
    size, 
    interactive, 
    product, 
    onAddToWishlist, 
    onPass, 
    showActions = true,
    ...props 
  }, ref) => {
    const formatPrice = (price: number, currency: string) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(price);
    };

    const getRetailerColor = (retailer: string) => {
      switch (retailer) {
        case 'amazon':
          return 'bg-orange-500';
        case 'walmart':
          return 'bg-blue-500';
        default:
          return 'bg-gray-500';
      }
    };

    return (
      <div
        ref={ref}
        className={cn(productCardVariants({ size, interactive, className }))}
        {...props}
      >
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
          
          {/* Retailer Badge */}
          <div className={cn(
            "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold text-white capitalize",
            getRetailerColor(product.retailer)
          )}>
            {product.retailer}
          </div>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
            {product.title}
          </h3>
          
          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>
          )}

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price, product.currency)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice, product.currency)}
                </span>
              )}
            </div>
            
            {product.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {showActions && (
            <div className="flex gap-2">
              <button
                onClick={() => onPass?.(product.id)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
              >
                Pass
              </button>
              <button
                onClick={() => onAddToWishlist?.(product.id)}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Add to Wishlist
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";

export { ProductCard, productCardVariants };
