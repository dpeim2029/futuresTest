import { z } from "zod";

export const binancePriceSchema = z.object({
  symbol: z.string(),
  price: z.string(),
  priceChangePercent: z.string().optional(),
  volume: z.string().optional(),
  openTime: z.number().optional(),
  closeTime: z.number().optional(),
});

export const bitcoinPriceDataSchema = z.object({
  spot: binancePriceSchema,
  futures: binancePriceSchema,
  priceDifference: z.number(),
  premiumPercentage: z.number(),
  lastUpdated: z.string(),
});

export type BinancePrice = z.infer<typeof binancePriceSchema>;
export type BitcoinPriceData = z.infer<typeof bitcoinPriceDataSchema>;

export const errorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  timestamp: z.string(),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
