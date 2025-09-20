import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";

const swipeCardVariants = cva(
  "relative bg-white rounded-xl shadow-lg overflow-hidden",
  {
    variants: {
      size: {
        default: "w-full max-w-sm aspect-[3/4]",
        sm: "w-64 aspect-[3/4]",
        lg: "w-full max-w-md aspect-[3/4]",
        full: "w-full aspect-[3/4]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface SwipeCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof swipeCardVariants> {
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
  onSwipeLeft?: (productId: string) => void;
  onSwipeRight?: (productId: string) => void;
  disabled?: boolean;
}

const SwipeCard = React.forwardRef<HTMLDivElement, SwipeCardProps>(
  ({ 
    className, 
    size, 
    product, 
    onSwipeLeft, 
    onSwipeRight, 
    disabled = false,
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

    const handleSwipeLeft = () => {
      if (!disabled) {
        onSwipeLeft?.(product.id);
      }
    };

    const handleSwipeRight = () => {
      if (!disabled) {
        onSwipeRight?.(product.id);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(swipeCardVariants({ size, className }), {
          'opacity-50 pointer-events-none': disabled,
        })}
        {...props}
      >
        {/* Product Image */}
        <div className="relative h-2/3 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          
          {/* Retailer Badge */}
          <div className={cn(
            "absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold text-white capitalize",
            getRetailerColor(product.retailer)
          )}>
            {product.retailer}
          </div>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}

          {/* Swipe Indicators */}
          <div className="absolute inset-0 flex">
            {/* Left swipe indicator (Pass) */}
            <div className="flex-1 flex items-center justify-center bg-red-500/20">
              <div className="text-red-600 text-6xl font-bold opacity-0 transition-opacity duration-200" id="pass-indicator">
                ✕
              </div>
            </div>
            {/* Right swipe indicator (Like) */}
            <div className="flex-1 flex items-center justify-center bg-green-500/20">
              <div className="text-green-600 text-6xl font-bold opacity-0 transition-opacity duration-200" id="like-indicator">
                ♥
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="h-1/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-1">
              {product.title}
            </h3>
            
            {product.description && (
              <p className="text-sm text-gray-600 line-clamp-1 mb-2">
                {product.description}
              </p>
            )}
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
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
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-sm text-gray-600 font-medium">{product.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons for Web/Testing */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-3 md:flex lg:flex xl:flex">
          <button
            onClick={handleSwipeLeft}
            className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
            disabled={disabled}
          >
            <span className="text-lg">✕</span>
            Pass
          </button>
          <button
            onClick={handleSwipeRight}
            className="flex-1 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-full font-medium transition-colors flex items-center justify-center gap-2"
            disabled={disabled}
          >
            <span className="text-lg">♥</span>
            Like
          </button>
        </div>
      </div>
    );
  }
);

SwipeCard.displayName = "SwipeCard";

export { SwipeCard, swipeCardVariants };
