import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SwipeableProductCard } from '../../../components/SwipeableProductCard';
import { Product } from '@tabitha/shared';

// Mock product data - this will be replaced with API calls
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'LEGO Classic Creative Brick Box',
    description: 'A classic collection of LEGO bricks in 33 different colors.',
    price: 30.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/lego',
    retailer: 'amazon',
    category: 'toys',
    ageRange: { min: 4, max: 99 },
    rating: 4.8,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Kinetic Sand Sandbox Set',
    description: 'Moldable sand that never dries out, perfect for indoor play.',
    price: 20.00,
    originalPrice: 25.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=400&h=400&fit=crop',
    productUrl: 'https://walmart.com/kineticsand',
    retailer: 'walmart',
    category: 'toys',
    ageRange: { min: 3, max: 8 },
    rating: 4.5,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Kids Tablet 7-inch',
    description: 'Android tablet designed for kids with parental controls.',
    price: 80.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/kidstablet',
    retailer: 'amazon',
    category: 'electronics',
    ageRange: { min: 3, max: 12 },
    rating: 4.2,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Nerf N-Strike Elite Disruptor',
    description: 'Quick-draw blaster with a 6-dart rotating drum.',
    price: 15.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop',
    productUrl: 'https://amazon.com/nerf',
    retailer: 'amazon',
    category: 'toys',
    ageRange: { min: 8, max: 16 },
    rating: 4.6,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Barbie Dreamhouse',
    description: 'Three-story dollhouse with 8 rooms and working elevator.',
    price: 199.00,
    originalPrice: 249.00,
    currency: 'USD',
    imageUrl: 'https://images.unsplash.com/photo-1558877385-8c2b41d7e5e2?w=400&h=400&fit=crop',
    productUrl: 'https://walmart.com/barbie',
    retailer: 'walmart',
    category: 'toys',
    ageRange: { min: 3, max: 10 },
    rating: 4.7,
    availability: true,
    scrapedAt: new Date().toISOString(),
  },
];

export default function DiscoverScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading products
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSwipeLeft = (productId: string) => {
    console.log('Passed on product:', productId);
    setCurrentIndex(prev => prev + 1);
    
    // Show feedback
    Alert.alert('Passed!', 'Product removed from recommendations', [{ text: 'OK' }]);
  };

  const handleSwipeRight = (productId: string) => {
    console.log('Added to wishlist:', productId);
    setCurrentIndex(prev => prev + 1);
    
    // Show feedback
    Alert.alert('Added to Wishlist!', 'Product saved to your wishlist', [{ text: 'OK' }]);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366F1" />
          <Text style={styles.loadingText}>Loading amazing products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (currentIndex >= products.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>🎉 All done!</Text>
          <Text style={styles.emptyText}>
            You've seen all available products. Check back later for more!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentProduct = products[currentIndex];
  const nextProduct = products[currentIndex + 1];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Products</Text>
        <Text style={styles.subtitle}>
          Swipe right to like, left to pass
        </Text>
        <Text style={styles.counter}>
          {currentIndex + 1} of {products.length}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        {/* Next card (behind) */}
        {nextProduct && (
          <View style={[styles.cardWrapper, styles.nextCard]}>
            <SwipeableProductCard
              product={nextProduct}
              onSwipeLeft={() => {}}
              onSwipeRight={() => {}}
              style={styles.card}
            />
          </View>
        )}

        {/* Current card (front) */}
        <View style={[styles.cardWrapper, styles.currentCard]}>
          <SwipeableProductCard
            product={currentProduct}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
            style={styles.card}
          />
        </View>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          👈 Swipe left to pass • Swipe right to add to wishlist 👉
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  counter: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cardWrapper: {
    position: 'absolute',
  },
  currentCard: {
    zIndex: 2,
  },
  nextCard: {
    zIndex: 1,
    transform: [{ scale: 0.95 }],
    opacity: 0.5,
  },
  card: {
    // Card styles are defined in SwipeableProductCard
  },
  instructions: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});