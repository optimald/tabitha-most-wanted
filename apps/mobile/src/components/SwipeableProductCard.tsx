import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  State,
} from 'react-native-gesture-handler';
import { Product } from '@tabitha/shared';

const { width: screenWidth } = Dimensions.get('window');
const SWIPE_THRESHOLD = screenWidth * 0.3;

interface SwipeableProductCardProps {
  product: Product;
  onSwipeLeft: (productId: string) => void;
  onSwipeRight: (productId: string) => void;
  style?: any;
}

export const SwipeableProductCard: React.FC<SwipeableProductCardProps> = ({
  product,
  onSwipeLeft,
  onSwipeRight,
  style,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getRetailerColor = (retailer: string) => {
    switch (retailer) {
      case 'amazon':
        return '#FF9900';
      case 'walmart':
        return '#0071CE';
      default:
        return '#6B7280';
    }
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    {
      useNativeDriver: true,
      listener: (event: PanGestureHandlerGestureEvent) => {
        const { translationX } = event.nativeEvent;
        
        // Update rotation based on translation
        const rotateValue = translationX / screenWidth * 30; // Max 30 degrees
        rotate.setValue(rotateValue);
      },
    }
  );

  const onHandlerStateChange = (event: PanGestureHandlerGestureEvent) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.END) {
      if (Math.abs(translationX) > SWIPE_THRESHOLD) {
        // Animate card off screen
        const toValue = translationX > 0 ? screenWidth : -screenWidth;
        
        Animated.parallel([
          Animated.timing(translateX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Call appropriate callback
          if (translationX > 0) {
            onSwipeRight(product.id);
          } else {
            onSwipeLeft(product.id);
          }
          
          // Reset values for next card
          translateX.setValue(0);
          rotate.setValue(0);
          opacity.setValue(1);
        });
      } else {
        // Snap back to center
        Animated.parallel([
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }),
          Animated.spring(rotate, {
            toValue: 0,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  };

  const rotateInterpolate = rotate.interpolate({
    inputRange: [-30, 30],
    outputRange: ['-30deg', '30deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = translateX.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const passOpacity = translateX.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.card,
          style,
          {
            transform: [
              { translateX },
              { rotate: rotateInterpolate },
            ],
            opacity,
          },
        ]}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Retailer Badge */}
          <View
            style={[
              styles.retailerBadge,
              { backgroundColor: getRetailerColor(product.retailer) },
            ]}
          >
            <Text style={styles.retailerText}>
              {product.retailer.toUpperCase()}
            </Text>
          </View>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Text>
            </View>
          )}

          {/* Swipe Indicators */}
          <Animated.View style={[styles.likeIndicator, { opacity: likeOpacity }]}>
            <Text style={styles.likeText}>LIKE</Text>
          </Animated.View>
          
          <Animated.View style={[styles.passIndicator, { opacity: passOpacity }]}>
            <Text style={styles.passText}>PASS</Text>
          </Animated.View>
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {product.title}
          </Text>
          
          {product.description && (
            <Text style={styles.description} numberOfLines={2}>
              {product.description}
            </Text>
          )}

          <View style={styles.priceRatingContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                {formatPrice(product.price, product.currency)}
              </Text>
              {product.originalPrice && product.originalPrice > product.price && (
                <Text style={styles.originalPrice}>
                  {formatPrice(product.originalPrice, product.currency)}
                </Text>
              )}
            </View>
            
            {product.rating && (
              <View style={styles.ratingContainer}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  card: {
    width: screenWidth * 0.9,
    height: screenWidth * 1.2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    flex: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  retailerBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  retailerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  likeIndicator: {
    position: 'absolute',
    top: '50%',
    right: 20,
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    transform: [{ translateY: -20 }],
  },
  likeText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  passIndicator: {
    position: 'absolute',
    top: '50%',
    left: 20,
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    transform: [{ translateY: -20 }],
  },
  passText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  star: {
    color: '#F59E0B',
    fontSize: 16,
  },
  rating: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
});
