interface PriceCardProps {
  title: string;
  symbol: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  price?: string;
  priceChange?: string;
  volume?: string;
  marketCap?: string;
  expiryDate?: string;
  openInterest?: string;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

export default function PriceCard({
  title,
  symbol,
  icon,
  iconBg,
  iconColor,
  price,
  priceChange,
  volume,
  marketCap,
  expiryDate,
  openInterest,
  isLoading,
  hasError,
  onRetry
}: PriceCardProps) {
  const isPositiveChange = priceChange && !priceChange.startsWith("-");
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center`}>
            <i className={`${icon} ${iconColor} text-xl`}></i>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500">{symbol}</p>
          </div>
        </div>
        {priceChange && (
          <div className="text-right">
            <div className={`flex items-center space-x-1 ${
              isPositiveChange ? "text-success" : "text-danger"
            }`}>
              <i className={`fas ${isPositiveChange ? "fa-arrow-up" : "fa-arrow-down"} text-xs`}></i>
              <span className="text-sm font-medium">{priceChange}</span>
            </div>
            <div className="text-xs text-gray-500">24h change</div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {/* Price Display */}
        <div className="relative">
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          ) : hasError ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-red-600">
                <i className="fas fa-exclamation-triangle"></i>
                <span className="text-sm font-medium">Failed to load price</span>
              </div>
              <button 
                onClick={onRetry}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="text-4xl font-bold text-gray-900">
              {price || "No data"}
            </div>
          )}
        </div>
        
        {/* Additional Info */}
        {volume && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Volume (24h)</span>
            <span className="font-medium text-gray-700">{volume}</span>
          </div>
        )}
        
        {marketCap && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Market Cap</span>
            <span className="font-medium text-gray-700">{marketCap}</span>
          </div>
        )}
        
        {expiryDate && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Expiry Date</span>
            <span className="font-medium text-gray-700">{expiryDate}</span>
          </div>
        )}
        
        {openInterest && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Open Interest</span>
            <span className="font-medium text-gray-700">{openInterest}</span>
          </div>
        )}
      </div>
    </div>
  );
}
