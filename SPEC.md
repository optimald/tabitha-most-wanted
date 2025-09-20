# Tabitha Most Wanted - Product Specification

## Overview

**Tabitha Most Wanted** is a cross-platform wishlist application designed for children to browse age-appropriate products from major retailers and create shareable wishlists for birthdays and holidays. The app features an intuitive swipe-based interface and allows parents to receive wishlist notifications via email or text.

## Target Audience

- **Primary Users**: Children ages 6-16
- **Secondary Users**: Parents and family members
- **Use Cases**: Birthday wishlists, holiday gift lists, special occasion planning

## Core Features

### 1. Product Discovery
- **Swipe Interface**: Tinder-style swipe left (pass) / right (add to wishlist) functionality
- **Age-Appropriate Filtering**: Products filtered by user's age and interests
- **Category Browsing**: Toys, games, electronics, books, clothing, sports equipment
- **Search Functionality**: Text-based product search with filters
- **Product Details**: Images, descriptions, prices, ratings, availability

### 2. Wishlist Management
- **Multiple Lists**: Create separate lists for birthdays, Christmas, other holidays
- **List Organization**: Drag-and-drop reordering, priority levels
- **Product Notes**: Add personal notes or reasons for wanting items
- **Price Tracking**: Monitor price changes and availability
- **List Sharing**: Generate shareable links for family members

### 3. Communication Features
- **Email Sharing**: Send formatted wishlist emails to parents/family
- **SMS Notifications**: Text message alerts for new wishlist items
- **Push Notifications**: Remind kids to update lists before special occasions
- **Family Accounts**: Connect child accounts to parent oversight

### 4. User Profile & Preferences
- **Age-Based Filtering**: Automatic content curation based on age
- **Interest Categories**: Select preferred product categories
- **Budget Awareness**: Optional price range preferences
- **Parental Controls**: Content filtering and spending limits

## Technical Architecture

### Platform Strategy
- **Mobile App**: React Native with Expo Go for iOS and Android
- **Web App**: Next.js 14+ with TypeScript for desktop experience
- **Shared Backend**: Node.js API with shared business logic
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Vercel for web app and API routes

### Tech Stack

#### Mobile (Expo/React Native)
```
- Expo SDK 50+
- React Native 0.73+
- TypeScript
- React Navigation 6
- React Native Gesture Handler (swipe functionality)
- Expo Notifications
- Expo MailComposer
- AsyncStorage for local data
```

#### Web (Next.js)
```
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- React Hook Form
- Zustand (state management)
- NextAuth.js (authentication)
```

#### Backend & Services
```
- Node.js 18+
- PostgreSQL 15+
- Prisma ORM
- Redis (caching)
- Puppeteer (web scraping)
- SendGrid (email service)
- Twilio (SMS service)
- Cloudinary (image optimization)
```

#### Infrastructure
```
- Vercel (hosting & deployment)
- Vercel Postgres (database)
- Vercel KV (Redis)
- GitHub Actions (CI/CD)
- Sentry (error monitoring)
```

## API Design

### Core Endpoints

#### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

#### Products
```
GET  /api/products/discover?age={age}&category={category}&page={page}
GET  /api/products/search?q={query}&filters={filters}
GET  /api/products/{id}
POST /api/products/scrape
```

#### Wishlists
```
GET    /api/wishlists
POST   /api/wishlists
GET    /api/wishlists/{id}
PUT    /api/wishlists/{id}
DELETE /api/wishlists/{id}
POST   /api/wishlists/{id}/items
DELETE /api/wishlists/{id}/items/{itemId}
PUT    /api/wishlists/{id}/items/{itemId}/priority
```

#### Sharing
```
POST /api/wishlists/{id}/share/email
POST /api/wishlists/{id}/share/sms
GET  /api/wishlists/shared/{shareId}
```

#### User Management
```
GET  /api/users/profile
PUT  /api/users/profile
GET  /api/users/preferences
PUT  /api/users/preferences
```

## Data Models

### User
```typescript
interface User {
  id: string
  email: string
  name: string
  age: number
  gender?: 'male' | 'female' | 'other'
  interests: string[]
  parentEmail?: string
  createdAt: Date
  updatedAt: Date
}
```

### Product
```typescript
interface Product {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  imageUrl: string
  productUrl: string
  retailer: 'amazon' | 'walmart'
  category: string
  ageRange: {
    min: number
    max: number
  }
  rating?: number
  availability: boolean
  scrapedAt: Date
}
```

### Wishlist
```typescript
interface Wishlist {
  id: string
  userId: string
  name: string
  type: 'birthday' | 'christmas' | 'holiday' | 'general'
  description?: string
  items: WishlistItem[]
  shareId?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}
```

### WishlistItem
```typescript
interface WishlistItem {
  id: string
  wishlistId: string
  productId: string
  priority: number
  notes?: string
  addedAt: Date
  product: Product
}
```

## Web Scraping Strategy

### Target Retailers
1. **Amazon**
   - Product search API (if available)
   - Web scraping for product details
   - Age-appropriate category filtering
   - Price and availability monitoring

2. **Walmart**
   - Walmart Open API integration
   - Supplementary web scraping
   - Category-based product discovery
   - Real-time price updates

### Scraping Implementation
```typescript
// Scraping service architecture
interface ScrapingService {
  scrapeProducts(retailer: string, category: string, ageRange: AgeRange): Promise<Product[]>
  updateProductPrices(productIds: string[]): Promise<void>
  checkAvailability(productIds: string[]): Promise<AvailabilityStatus[]>
}
```

### Rate Limiting & Ethics
- Respect robots.txt and terms of service
- Implement exponential backoff
- Use rotating user agents and proxies
- Cache results to minimize requests
- Monitor for IP blocking

## User Interface Design

### Mobile App (Expo)
- **Swipe Cards**: Full-screen product cards with swipe gestures
- **Navigation**: Bottom tab navigation (Discover, Wishlists, Profile)
- **Animations**: Smooth card transitions and micro-interactions
- **Accessibility**: Voice-over support, large touch targets

### Web App (Next.js)
- **Responsive Design**: Desktop-first with mobile fallback
- **Grid Layout**: Product grid with hover interactions
- **Keyboard Navigation**: Full keyboard accessibility
- **Progressive Enhancement**: Works without JavaScript

### Design System
```
Colors:
- Primary: #6366F1 (Indigo)
- Secondary: #EC4899 (Pink)
- Success: #10B981 (Emerald)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)

Typography:
- Headings: Inter Bold
- Body: Inter Regular
- UI: Inter Medium

Spacing: 4px base unit (4, 8, 12, 16, 24, 32, 48, 64)
Border Radius: 8px standard, 16px cards
```

## User Flow

### Onboarding
1. Welcome screen with app explanation
2. Age and gender selection
3. Interest category selection
4. Parent email setup (optional)
5. Tutorial on swipe functionality

### Core Usage Flow
1. **Discover**: Swipe through age-appropriate products
2. **Organize**: Create and manage multiple wishlists
3. **Share**: Send wishlists to family via email/SMS
4. **Track**: Monitor price changes and availability

### Wishlist Creation Flow
1. Create new wishlist (name, type, description)
2. Add products via discovery or search
3. Organize items by priority
4. Add personal notes to items
5. Share with family members

## Security & Privacy

### Data Protection
- COPPA compliance for users under 13
- Minimal data collection
- Encrypted data transmission (HTTPS)
- Secure authentication (JWT tokens)
- Regular security audits

### Parental Controls
- Parent email verification
- Spending limit notifications
- Content filtering options
- Account oversight dashboard
- Privacy settings management

## Performance Requirements

### Mobile App
- App startup: < 3 seconds
- Swipe response: < 100ms
- Image loading: Progressive with placeholders
- Offline functionality: Cached wishlists
- Bundle size: < 50MB

### Web App
- Page load: < 2 seconds (LCP)
- Core Web Vitals: Green scores
- SEO optimization: Server-side rendering
- Accessibility: WCAG 2.1 AA compliance

## Deployment Strategy

### Development Workflow
```
1. Feature branches from main
2. Pull request reviews
3. Automated testing (Jest, Playwright)
4. Staging deployment on Vercel
5. Production deployment after approval
```

### Environment Setup
```
- Development: Local with Docker Compose
- Staging: Vercel preview deployments
- Production: Vercel with custom domain
```

### Monitoring & Analytics
- Error tracking: Sentry
- Performance monitoring: Vercel Analytics
- User analytics: Privacy-focused solution
- Uptime monitoring: Vercel monitoring

## Development Phases

### Phase 1: MVP (4-6 weeks)
- Basic product discovery with swipe functionality
- Simple wishlist creation and management
- Email sharing capability
- Basic user authentication
- Amazon product scraping

### Phase 2: Enhanced Features (3-4 weeks)
- Walmart integration
- SMS sharing
- Multiple wishlist types
- Price tracking
- Mobile app optimization

### Phase 3: Advanced Features (4-5 weeks)
- Parental controls and oversight
- Advanced filtering and search
- Push notifications
- Social features (family accounts)
- Performance optimizations

### Phase 4: Polish & Launch (2-3 weeks)
- UI/UX refinements
- Comprehensive testing
- App store submission
- Marketing website
- Documentation

## Success Metrics

### User Engagement
- Daily active users
- Swipe-through rate
- Wishlist creation rate
- Sharing frequency
- Session duration

### Business Metrics
- User retention (7-day, 30-day)
- Wishlist completion rate
- Parent engagement rate
- App store ratings
- Referral rate

## Risk Mitigation

### Technical Risks
- **Scraping Blocks**: Implement multiple scraping strategies and APIs
- **Rate Limits**: Use caching and intelligent request scheduling
- **Data Quality**: Implement validation and manual review processes
- **Scalability**: Design for horizontal scaling from day one

### Legal Risks
- **Terms of Service**: Ensure compliance with retailer ToS
- **Privacy Laws**: COPPA, GDPR compliance
- **Content Liability**: Age-appropriate filtering and moderation
- **Intellectual Property**: Respect trademark and copyright laws

## Future Enhancements

### Potential Features
- AI-powered product recommendations
- Augmented reality product preview
- Integration with more retailers (Target, Best Buy)
- Social wishlist sharing with friends
- Gamification elements (points, badges)
- Voice-activated product search
- Barcode scanning for in-store products

### Platform Expansion
- Smart TV app for family browsing
- Voice assistant integration (Alexa, Google)
- Browser extension for easy adding
- API for third-party integrations

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI
- PostgreSQL
- Redis (optional for development)

### Quick Start
```bash
# Clone repository
git clone https://github.com/your-org/tabitha-most-wanted.git
cd tabitha-most-wanted

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development servers
npm run dev:web    # Next.js web app
npm run dev:mobile # Expo mobile app
npm run dev:api    # API server
```

### Project Structure
```
tabitha-most-wanted/
├── README.md
├── package.json                    # Root package.json with workspaces
├── .gitignore
├── .env.example
├── .github/
│   └── workflows/
│       ├── ci.yml                 # Continuous integration
│       ├── deploy-web.yml         # Web app deployment
│       └── deploy-mobile.yml      # Mobile app deployment
├── apps/
│   ├── mobile/                    # Expo React Native app
│   │   ├── package.json
│   │   ├── app.json              # Expo configuration
│   │   ├── babel.config.js
│   │   ├── metro.config.js
│   │   ├── tsconfig.json
│   │   ├── .expo/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   ├── src/
│   │   │   ├── app/              # Expo Router app directory
│   │   │   │   ├── (tabs)/       # Tab navigation
│   │   │   │   │   ├── discover.tsx
│   │   │   │   │   ├── wishlists.tsx
│   │   │   │   │   └── profile.tsx
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login.tsx
│   │   │   │   │   └── register.tsx
│   │   │   │   ├── wishlist/
│   │   │   │   │   ├── [id].tsx
│   │   │   │   │   └── create.tsx
│   │   │   │   ├── _layout.tsx   # Root layout
│   │   │   │   └── index.tsx     # Landing page
│   │   │   ├── components/
│   │   │   │   ├── ui/           # Basic UI components
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   └── Modal.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── SwipeableCard.tsx
│   │   │   │   ├── WishlistItem.tsx
│   │   │   │   └── Navigation.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useSwipeGesture.ts
│   │   │   │   ├── useProducts.ts
│   │   │   │   ├── useWishlists.ts
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   ├── api.ts
│   │   │   │   ├── auth.ts
│   │   │   │   ├── notifications.ts
│   │   │   │   └── storage.ts
│   │   │   ├── store/
│   │   │   │   ├── authStore.ts
│   │   │   │   ├── productStore.ts
│   │   │   │   └── wishlistStore.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       ├── constants.ts
│   │   │       ├── helpers.ts
│   │   │       └── validation.ts
│   │   └── eas.json              # EAS Build configuration
│   ├── web/                      # Next.js web application
│   │   ├── package.json
│   │   ├── next.config.js
│   │   ├── tailwind.config.js
│   │   ├── tsconfig.json
│   │   ├── .env.local.example
│   │   ├── public/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   ├── favicon.ico
│   │   │   └── manifest.json
│   │   ├── src/
│   │   │   ├── app/              # Next.js 14 App Router
│   │   │   │   ├── globals.css
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx      # Home page
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── not-found.tsx
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── register/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── discover/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── loading.tsx
│   │   │   │   ├── wishlists/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── [id]/
│   │   │   │   │   │   ├── page.tsx
│   │   │   │   │   │   └── edit/
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   └── create/
│   │   │   │   │       └── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── shared/
│   │   │   │   │   └── [shareId]/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── api/          # API routes
│   │   │   │       ├── auth/
│   │   │   │       │   ├── login/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   ├── register/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── me/
│   │   │   │       │       └── route.ts
│   │   │   │       ├── products/
│   │   │   │       │   ├── discover/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   ├── search/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   ├── scrape/
│   │   │   │       │   │   └── route.ts
│   │   │   │       │   └── [id]/
│   │   │   │       │       └── route.ts
│   │   │   │       ├── wishlists/
│   │   │   │       │   ├── route.ts
│   │   │   │       │   └── [id]/
│   │   │   │       │       ├── route.ts
│   │   │   │       │       ├── items/
│   │   │   │       │       │   └── route.ts
│   │   │   │       │       └── share/
│   │   │   │       │           ├── email/
│   │   │   │       │           │   └── route.ts
│   │   │   │       │           └── sms/
│   │   │   │       │               └── route.ts
│   │   │   │       └── users/
│   │   │   │           ├── profile/
│   │   │   │           │   └── route.ts
│   │   │   │           └── preferences/
│   │   │   │               └── route.ts
│   │   │   ├── components/
│   │   │   │   ├── ui/           # Shadcn/ui components
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   ├── modal.tsx
│   │   │   │   │   ├── toast.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   └── Navigation.tsx
│   │   │   │   ├── products/
│   │   │   │   │   ├── ProductGrid.tsx
│   │   │   │   │   ├── ProductCard.tsx
│   │   │   │   │   ├── ProductModal.tsx
│   │   │   │   │   └── ProductFilters.tsx
│   │   │   │   ├── wishlists/
│   │   │   │   │   ├── WishlistCard.tsx
│   │   │   │   │   ├── WishlistGrid.tsx
│   │   │   │   │   ├── WishlistItem.tsx
│   │   │   │   │   └── CreateWishlistModal.tsx
│   │   │   │   ├── auth/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   └── AuthGuard.tsx
│   │   │   │   └── shared/
│   │   │   │       ├── LoadingSpinner.tsx
│   │   │   │       ├── ErrorBoundary.tsx
│   │   │   │       └── SEO.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProducts.ts
│   │   │   │   ├── useWishlists.ts
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLocalStorage.ts
│   │   │   │   └── useDebounce.ts
│   │   │   ├── lib/
│   │   │   │   ├── auth.ts        # NextAuth configuration
│   │   │   │   ├── db.ts          # Database connection
│   │   │   │   ├── scraper.ts     # Web scraping utilities
│   │   │   │   ├── email.ts       # Email service
│   │   │   │   ├── sms.ts         # SMS service
│   │   │   │   ├── utils.ts       # Utility functions
│   │   │   │   └── validations.ts # Zod schemas
│   │   │   ├── store/
│   │   │   │   ├── authStore.ts
│   │   │   │   ├── productStore.ts
│   │   │   │   └── wishlistStore.ts
│   │   │   ├── styles/
│   │   │   │   └── globals.css
│   │   │   └── types/
│   │   │       ├── auth.ts
│   │   │       ├── product.ts
│   │   │       ├── wishlist.ts
│   │   │       └── api.ts
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   └── vercel.json           # Vercel configuration
│   └── scraper/                  # Standalone scraping service
│       ├── package.json
│       ├── Dockerfile
│       ├── src/
│       │   ├── index.ts
│       │   ├── scrapers/
│       │   │   ├── amazon.ts
│       │   │   ├── walmart.ts
│       │   │   └── base.ts
│       │   ├── services/
│       │   │   ├── queue.ts
│       │   │   ├── cache.ts
│       │   │   └── database.ts
│       │   ├── utils/
│       │   │   ├── proxy.ts
│       │   │   ├── rate-limiter.ts
│       │   │   └── helpers.ts
│       │   └── types/
│       │       └── index.ts
│       └── cron/
│           ├── update-prices.ts
│           └── check-availability.ts
├── packages/
│   ├── shared/                   # Shared utilities and types
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── src/
│   │   │   ├── types/
│   │   │   │   ├── user.ts
│   │   │   │   ├── product.ts
│   │   │   │   ├── wishlist.ts
│   │   │   │   └── api.ts
│   │   │   ├── utils/
│   │   │   │   ├── validation.ts
│   │   │   │   ├── formatting.ts
│   │   │   │   ├── constants.ts
│   │   │   │   └── helpers.ts
│   │   │   ├── hooks/            # Shared React hooks
│   │   │   │   ├── useApi.ts
│   │   │   │   ├── useDebounce.ts
│   │   │   │   └── useLocalStorage.ts
│   │   │   └── config/
│   │   │       ├── api.ts
│   │   │       └── constants.ts
│   │   └── index.ts
│   ├── ui/                       # Shared UI components
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.js
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Card.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Input/
│   │   │   │   │   ├── Input.tsx
│   │   │   │   │   ├── Input.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── styles/
│   │   │   │   ├── globals.css
│   │   │   │   └── components.css
│   │   │   └── utils/
│   │   │       └── cn.ts         # Class name utility
│   │   └── index.ts
│   └── database/                 # Database package
│       ├── package.json
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── migrations/
│       │   └── seed.ts
│       ├── src/
│       │   ├── client.ts
│       │   ├── types.ts
│       │   └── utils.ts
│       └── index.ts
├── docs/                         # Documentation
│   ├── README.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   ├── API.md
│   ├── SCRAPING.md
│   └── ARCHITECTURE.md
├── tools/                        # Build and deployment tools
│   ├── scripts/
│   │   ├── build.sh
│   │   ├── deploy.sh
│   │   ├── test.sh
│   │   └── setup-env.sh
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.scraper
│   │   └── docker-compose.yml
│   └── config/
│       ├── eslint.config.js
│       ├── prettier.config.js
│       └── jest.config.js
├── .eslintrc.js                  # Root ESLint config
├── .prettierrc                   # Prettier config
├── turbo.json                    # Turborepo configuration
├── pnpm-workspace.yaml          # PNPM workspace config
└── SPEC.md                      # This specification document
```

This specification provides a comprehensive roadmap for building Tabitha Most Wanted as a modern, scalable, and user-friendly wishlist application for children and families.
