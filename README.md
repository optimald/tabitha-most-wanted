# Tabitha Most Wanted

A cross-platform wishlist application designed for children to browse age-appropriate products and create shareable wishlists for birthdays and holidays.

## 🎯 Overview

Tabitha Most Wanted helps kids discover products they want through an intuitive swipe-based interface and allows them to create and share wishlists with family members via email or SMS.

## ✨ Features

- **Swipe-based Product Discovery**: Tinder-style interface for browsing products
- **Age-Appropriate Filtering**: Content curated based on user's age and interests
- **Multiple Wishlist Types**: Birthday, holiday, and general wishlists
- **Cross-Platform**: Native mobile app (iOS/Android) and responsive web app
- **Family Sharing**: Email and SMS wishlist sharing with parents and family
- **Real-time Updates**: Price tracking and availability monitoring
- **Parental Controls**: Safe browsing with parental oversight features

## 🏗️ Architecture

This is a monorepo containing:

- **Mobile App**: React Native with Expo for iOS and Android
- **Web App**: Next.js 14 with TypeScript hosted on Vercel
- **Scraper Service**: Automated product scraping from Amazon and Walmart
- **Shared Packages**: Common utilities, types, and UI components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PNPM (recommended) or npm
- Expo CLI
- PostgreSQL (for local development)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/tabitha-most-wanted.git
cd tabitha-most-wanted

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up the database
pnpm db:migrate
pnpm db:seed

# Start development servers
pnpm dev
```

This will start:
- Web app at `http://localhost:3000`
- Mobile app with Expo Go
- API server at `http://localhost:3001`

## 📱 Mobile Development

```bash
# Start the mobile app
cd apps/mobile
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android
```

## 🌐 Web Development

```bash
# Start the web app
cd apps/web
pnpm dev

# Build for production
pnpm build
```

## 🛠️ Tech Stack

### Frontend
- **Mobile**: React Native, Expo, TypeScript
- **Web**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI**: Shared component library with Storybook

### Backend
- **API**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Caching**: Redis (Vercel KV)

### Services
- **Scraping**: Puppeteer for Amazon/Walmart
- **Email**: SendGrid
- **SMS**: Twilio
- **Images**: Cloudinary
- **Hosting**: Vercel

## 📁 Project Structure

```
tabitha-most-wanted/
├── apps/
│   ├── mobile/          # React Native mobile app
│   ├── web/             # Next.js web application
│   └── scraper/         # Product scraping service
├── packages/
│   ├── shared/          # Shared utilities and types
│   ├── ui/              # Shared UI components
│   └── database/        # Prisma schema and utilities
├── docs/                # Documentation
└── tools/               # Build and deployment tools
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests for specific app
pnpm test:web
pnpm test:mobile

# Run E2E tests
pnpm test:e2e
```

## 🚀 Deployment

### Web App (Vercel)
```bash
# Deploy to Vercel
pnpm deploy:web
```

### Mobile App (EAS Build)
```bash
# Build for app stores
pnpm build:mobile

# Submit to app stores
pnpm submit:ios
pnpm submit:android
```

## 📚 Documentation

- [Technical Specification](./SPEC.md)
- [Development Checklist](./CHECKLIST.md)
- [API Documentation](./docs/API.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🔒 Privacy & Security

- COPPA compliant for users under 13
- GDPR compliant data handling
- Secure authentication and data encryption
- Parental controls and oversight features
- Ethical web scraping practices

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./docs/CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@tabitha-most-wanted.com
- 📖 Documentation: [docs.tabitha-most-wanted.com](https://docs.tabitha-most-wanted.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/tabitha-most-wanted/issues)

## 🎉 Acknowledgments

- Thanks to all contributors and beta testers
- Built with love for kids and families
- Powered by modern web technologies

---

**Made with ❤️ by the Tabitha Development Team**
