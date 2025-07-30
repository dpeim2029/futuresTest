import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BitcoinPriceData, ErrorResponse } from "@shared/schema";
import { queryClient } from "@/lib/queryClient";
import StatusBar from "@/components/status-bar";
import PriceCard from "@/components/price-card";
import PriceAnalysis from "@/components/price-analysis";

export default function Home() {
  const { data, isLoading, error, isError } = useQuery<BitcoinPriceData, ErrorResponse>({
    queryKey: ["/api/bitcoin-prices"],
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchIntervalInBackground: true,
    staleTime: 0, // Always consider data stale for real-time updates
  });

  // Force refetch on window focus for better UX
  useEffect(() => {
    const handleFocus = () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bitcoin-prices"] });
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/bitcoin-prices"] });
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(price));
  };

  const formatVolume = (volume: string) => {
    const vol = parseFloat(volume);
    if (vol >= 1000000) {
      return `₿${(vol / 1000000).toFixed(2)}M`;
    } else if (vol >= 1000) {
      return `₿${(vol / 1000).toFixed(2)}K`;
    }
    return `₿${vol.toFixed(2)}`;
  };

  const formatPercentage = (percent: string) => {
    const num = parseFloat(percent);
    const sign = num >= 0 ? "+" : "";
    return `${sign}${num.toFixed(2)}%`;
  };

  if (isError && !data) {
    return (
      <div className="min-h-screen bg-gray-50 font-inter">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="fab fa-bitcoin text-white text-sm"></i>
                </div>
                <h1 className="text-xl font-semibold text-gray-900">Bitcoin Price Tracker</h1>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <i className="fas fa-database"></i>
                <span>Powered by Binance API</span>
              </div>
            </div>
          </div>
        </header>

        {/* Error State */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-wifi text-red-500 text-2xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Connection Error</h3>
            <p className="text-red-700 mb-4">
              {error?.message || "Unable to connect to Binance API. Please check your internet connection."}
            </p>
            <button 
              onClick={handleRetry}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <i className="fas fa-redo-alt mr-2"></i>
              Retry Connection
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <i className="fab fa-bitcoin text-white text-sm"></i>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Bitcoin Price Tracker</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <i className="fas fa-database"></i>
              <span>Powered by Binance API</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Bar */}
        <StatusBar 
          isConnected={!isError}
          lastUpdated={data?.lastUpdated}
          isLoading={isLoading}
        />

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Bitcoin Spot Price Card */}
          <PriceCard
            title="Bitcoin Spot"
            symbol="BTCUSDT"
            icon="fab fa-bitcoin"
            iconBg="bg-orange-100"
            iconColor="text-orange-500"
            price={data?.spot.price ? formatPrice(data.spot.price) : undefined}
            priceChange={data?.spot.priceChangePercent ? formatPercentage(data.spot.priceChangePercent) : undefined}
            volume={data?.spot.volume ? formatVolume(data.spot.volume) : undefined}
            marketCap="$1.93T" // This would need to be calculated separately
            isLoading={isLoading}
            hasError={isError}
            onRetry={handleRetry}
          />

          {/* Bitcoin Futures Price Card */}
          <PriceCard
            title="Bitcoin Futures"
            symbol={data?.futures.symbol || "BTCUSD_FUTURE"}
            icon="fas fa-chart-line"
            iconBg="bg-blue-100"
            iconColor="text-blue-500"
            price={data?.futures.price ? formatPrice(data.futures.price) : undefined}
            priceChange={data?.futures.priceChangePercent ? formatPercentage(data.futures.priceChangePercent) : undefined}
            volume={data?.futures.volume ? formatVolume(data.futures.volume) : undefined}
            expiryDate={data?.futures.symbol ? getExpiryFromSymbol(data.futures.symbol) : undefined}
            openInterest="₿12,439.32" // This would need to be fetched separately
            isLoading={isLoading}
            hasError={isError}
            onRetry={handleRetry}
          />
        </div>

        {/* Price Analysis */}
        {data && (
          <PriceAnalysis
            priceDifference={data.priceDifference}
            premiumPercentage={data.premiumPercentage}
            daysToExpiry={data.futures.symbol ? getDaysToExpiry(data.futures.symbol) : 0}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© 2024 Bitcoin Price Tracker</span>
              <span>•</span>
              <span>Deployed on Vercel</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <i className="fas fa-question-circle mr-1"></i>
                Help
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                <i className="fas fa-cog mr-1"></i>
                Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getExpiryFromSymbol(symbol: string): string {
  // Extract date from symbol like BTCUSD_250328
  const match = symbol.match(/(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    const fullYear = 2000 + parseInt(year);
    const date = new Date(fullYear, parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  }
  return "Unknown";
}

function getDaysToExpiry(symbol: string): number {
  const match = symbol.match(/(\d{2})(\d{2})(\d{2})$/);
  if (match) {
    const [, year, month, day] = match;
    const fullYear = 2000 + parseInt(year);
    const expiryDate = new Date(fullYear, parseInt(month) - 1, parseInt(day));
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }
  return 0;
}
