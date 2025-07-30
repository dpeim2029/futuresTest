# Bitcoin Price Tracker - Vercel Deployment

This Bitcoin price screener tracks real-time BTC spot and futures prices from the Binance API, deployed on Vercel.

## Features

- 📊 Real-time Bitcoin spot price tracking
- 📈 Bitcoin futures price monitoring with automatic quarter detection
- 💰 Price difference and premium calculations
- 🔄 Auto-refresh every 30 seconds
- 📱 Responsive design with Tailwind CSS
- ⚡ Fast deployment on Vercel's edge network

## API Endpoints

- `GET /api/bitcoin-prices` - Returns current BTC spot and futures prices with analysis
- `GET /api/health` - Health check endpoint

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Vercel Serverless Functions
- **Styling**: Tailwind CSS + Shadcn/UI components
- **Data**: Binance API integration
- **Deployment**: Vercel

## Deployment

This project is configured for Vercel deployment with:

- `vercel.json` configuration
- Serverless API functions in `/api` directory  
- Optimized build process with `npm run build:vercel`
- Static asset serving from `/dist/public`

## Development

```bash
# Install dependencies
npm install

# Start development server (original Express.js version)
npm run dev

# Build for Vercel
npm run build:vercel

# Type check
npm run check
```

## Environment Variables

No environment variables required - the application uses public Binance API endpoints.

## Performance

- ⚡ Fast edge deployment with Vercel
- 🔄 30-second auto-refresh intervals
- 📊 Real-time price analysis
- 💾 Optimized bundle size with tree shaking

## Live Demo

Access the live application at your Vercel deployment URL.