# Bitcoin Price Tracker Application

## Overview
This is a full-stack React application that tracks Bitcoin prices from Binance API, comparing spot prices with futures prices. The application provides real-time updates and price analysis including premium calculations and market data visualization.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **UI Framework**: Tailwind CSS with Shadcn/UI component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API architecture
- **External APIs**: Binance API for cryptocurrency data
- **Development**: Hot reload with Vite middleware integration

### Data Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured but not currently used for core functionality)
- **Validation**: Zod schemas for runtime type checking
- **Storage**: In-memory storage implementation with interface for future database integration

## Key Components

### API Integration
- **Binance Spot API**: Real-time Bitcoin spot prices
- **Binance Futures API**: Bitcoin futures contract prices with automatic quarter detection
- **Price Analysis**: Calculates price differences and premium percentages
- **Error Handling**: Comprehensive error handling for external API failures

### UI Components
- **StatusBar**: Shows connection status and last update time
- **PriceCard**: Displays formatted price data with loading and error states
- **PriceAnalysis**: Shows price difference calculations and market analysis
- **Responsive Design**: Mobile-first design with Tailwind CSS

### Real-time Features
- **Auto-refresh**: 30-second intervals for price updates
- **Focus Refresh**: Automatic refresh when window regains focus
- **Loading States**: Visual feedback during data fetching
- **Error Recovery**: Retry functionality for failed requests

## Data Flow

1. **Client Request**: React components request data via TanStack Query
2. **API Route**: Express server handles `/api/bitcoin-prices` endpoint
3. **External APIs**: Server fetches data from Binance spot and futures APIs
4. **Data Processing**: Server calculates price differences and premiums
5. **Response**: Formatted data returned to client with timestamps
6. **UI Update**: Components re-render with new data and visual indicators

## External Dependencies

### Development Dependencies
- **Vite**: Build tool and dev server
- **TypeScript**: Type checking and compilation
- **ESBuild**: Production bundling
- **PostCSS**: CSS processing with Autoprefixer

### UI Dependencies
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant styling

### Backend Dependencies
- **Express**: Web framework
- **Neon Database**: PostgreSQL serverless driver
- **Date-fns**: Date manipulation utilities
- **Nanoid**: ID generation

## Deployment Strategy

### Build Process
- **Client Build**: Vite bundles React app to `dist/public`
- **Server Build**: ESBuild bundles server code to `dist/index.js`
- **Static Assets**: Client build served as static files in production

### Environment Configuration
- **Development**: Vite dev server with Express API proxy
- **Production**: Express serves static files and API routes
- **Database**: PostgreSQL connection via DATABASE_URL environment variable

### Scripts
- `npm run dev`: Development with hot reload
- `npm run build`: Production build for both client and server
- `npm run start`: Production server
- `npm run db:push`: Database schema migration

The application is designed for easy deployment on platforms like Replit, with automatic environment detection and appropriate middleware setup for development vs production modes.