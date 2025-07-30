# 🚀 Vercel Deployment Guide

## Quick Deploy

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the configuration

2. **Verify Settings**
   - Build Command: `npm run build:vercel` ✅ (auto-detected)
   - Output Directory: `dist/public` ✅ (auto-detected)  
   - Install Command: `npm install` ✅ (auto-detected)

3. **Deploy**
   - Click "Deploy" 
   - Wait for build to complete (~2-3 minutes)

## What Happens During Deployment

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Build Frontend**
   ```bash
   npm run build:vercel
   # Creates: dist/public/index.html + assets
   ```

3. **Deploy API Functions**
   - `api/bitcoin-prices.ts` → `/api/bitcoin-prices`
   - `api/health.ts` → `/api/health`

4. **Configure Routes**
   - Frontend: All routes serve `index.html` (SPA routing)
   - API: `/api/*` routes to serverless functions

## Testing After Deployment

✅ Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
✅ Check that Bitcoin prices load
✅ Verify API endpoints:
   - `https://your-app.vercel.app/api/health`
   - `https://your-app.vercel.app/api/bitcoin-prices`

## Expected Features

- 📊 Real-time Bitcoin spot prices from Binance
- 📈 Futures price tracking with automatic quarter detection  
- 💰 Price difference and premium calculations
- 🔄 Auto-refresh every 30 seconds
- 📱 Responsive design

## Troubleshooting

If build fails:
1. Check Node.js version (should be 18+)
2. Verify all dependencies installed
3. Check build logs for specific errors

If API doesn't work:
1. Check Vercel function logs
2. Verify Binance API is accessible
3. Test API endpoints directly

## Success! 🎉

Your Bitcoin price screener is now live on Vercel's global edge network!