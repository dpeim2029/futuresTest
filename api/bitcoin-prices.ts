import type { VercelRequest, VercelResponse } from '@vercel/node';
import { bitcoinPriceDataSchema, errorResponseSchema } from '../shared/schema';

const BINANCE_API_BASE = "https://api.binance.com/api/v3";
const BINANCE_FUTURES_API_BASE = "https://fapi.binance.com/fapi/v1";

async function fetchBinancePrice(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Binance API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch from Binance:", error);
    throw error;
  }
}

async function getNextQuarterFuturesSymbol() {
  // Get current date
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-based
  
  // Calculate next quarter end month (March=2, June=5, September=8, December=11)
  let targetMonth: number;
  let targetYear = currentYear;
  
  if (currentMonth < 2) { // Jan-Feb -> March
    targetMonth = 2;
  } else if (currentMonth < 5) { // Mar-May -> June
    targetMonth = 5;
  } else if (currentMonth < 8) { // Jun-Aug -> September
    targetMonth = 8;
  } else if (currentMonth < 11) { // Sep-Nov -> December
    targetMonth = 11;
  } else { // December -> March next year
    targetMonth = 2;
    targetYear++;
  }
  
  // Format as YYMMDD (last Friday of the month)
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  const lastFriday = new Date(targetYear, targetMonth, lastDay);
  
  // Find the last Friday
  while (lastFriday.getDay() !== 5) {
    lastFriday.setDate(lastFriday.getDate() - 1);
  }
  
  const yearStr = targetYear.toString().slice(-2);
  const monthStr = (targetMonth + 1).toString().padStart(2, '0');
  const dayStr = lastFriday.getDate().toString().padStart(2, '0');
  
  return `BTCUSD_${yearStr}${monthStr}${dayStr}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch spot price
    const spotUrl = `${BINANCE_API_BASE}/ticker/24hr?symbol=BTCUSDT`;
    const spotData = await fetchBinancePrice(spotUrl);
    
    // Get next quarter futures symbol
    const futuresSymbol = await getNextQuarterFuturesSymbol();
    
    // Fetch futures price
    const futuresUrl = `${BINANCE_FUTURES_API_BASE}/ticker/24hr?symbol=${futuresSymbol}`;
    const futuresData = await fetchBinancePrice(futuresUrl);
    
    // Calculate price difference and premium
    const spotPrice = parseFloat(spotData.lastPrice);
    const futuresPrice = parseFloat(futuresData.lastPrice);
    const priceDifference = futuresPrice - spotPrice;
    const premiumPercentage = ((priceDifference / spotPrice) * 100);
    
    const responseData = {
      spot: {
        symbol: spotData.symbol,
        price: spotData.lastPrice,
        priceChangePercent: spotData.priceChangePercent,
        volume: spotData.volume,
        openTime: spotData.openTime,
        closeTime: spotData.closeTime,
      },
      futures: {
        symbol: futuresData.symbol,
        price: futuresData.lastPrice,
        priceChangePercent: futuresData.priceChangePercent,
        volume: futuresData.volume,
        openTime: futuresData.openTime,
        closeTime: futuresData.closeTime,
      },
      priceDifference,
      premiumPercentage,
      lastUpdated: new Date().toISOString(),
    };
    
    // Validate response data
    const validatedData = bitcoinPriceDataSchema.parse(responseData);
    res.json(validatedData);
    
  } catch (error) {
    console.error("Error fetching Bitcoin prices:", error);
    
    const errorResponse = {
      error: "FETCH_ERROR",
      message: error instanceof Error ? error.message : "Failed to fetch Bitcoin prices",
      timestamp: new Date().toISOString(),
    };
    
    const validatedError = errorResponseSchema.parse(errorResponse);
    res.status(500).json(validatedError);
  }
}