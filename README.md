# FadeImage - Online Store

A modern e-commerce web application built with Next.js 15, featuring real-time product management, secure authentication, and seamless shopping experience.

## 🚀 Features

- **Modern Stack**: Built with Next.js 15 App Router and React 19
- **Database Integration**: Prisma ORM with PostgreSQL/MySQL support
- **Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **State Management**: Zustand for efficient client-side state management
- **Responsive Design**: Tailwind CSS with aspect-ratio utilities
- **Type Safety**: Full TypeScript implementation
- **Performance**: Turbopack for faster development builds

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS with PostCSS 4
- **State Management**: Zustand
- **TypeScript**: Full type safety

### Backend
- **Database**: Prisma ORM
- **Authentication**: JWT + bcryptjs
- **API**: Next.js API Routes

### Development
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Build Tool**: Turbopack (development)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd online-store
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="your-database-connection-string"
   JWT_SECRET="your-jwt-secret-key"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate dev
   
   # Seed the database (if seed file exists)
   pnpm prisma db seed
   ```

## 🚀 Getting Started

### Development Server

```bash
# Start development server with Turbopack
pnpm dev

# Alternative commands
npm run dev
yarn dev
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
├── prisma/              # Database schema and migrations
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # Reusable React components
│   ├── lib/           # Utility functions and configurations
│   ├── store/         # Zustand state management
│   └── types/         # TypeScript type definitions
├── .env               # Environment variables
└── package.json       # Project dependencies
```

## 🗄️ Database

This project uses Prisma as the ORM. To work with the database:

```bash
# View database in Prisma Studio
pnpm prisma studio

# Reset database
pnpm prisma migrate reset

# Deploy migrations
pnpm prisma migrate deploy
```

## 🔒 Authentication

The application implements JWT-based authentication with:
- Secure password hashing using bcryptjs
- Token-based session management
- Protected routes and API endpoints

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach
- **Aspect Ratio**: Built-in aspect ratio utilities for images

## 📱 Features

- **Product Catalog**: Browse and search products
- **Shopping Cart**: Add, remove, and modify cart items
- **User Authentication**: Register, login, and profile management
- **Order Management**: Place and track orders
- **Admin Panel**: Manage products and orders (if implemented)

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

This Next.js application can be deployed on:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔧 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm prisma:*     # Prisma commands
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Prisma Documentation](https://www.prisma.io/docs)

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

