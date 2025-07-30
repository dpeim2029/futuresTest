interface PriceAnalysisProps {
  priceDifference: number;
  premiumPercentage: number;
  daysToExpiry: number;
}

export default function PriceAnalysis({ 
  priceDifference, 
  premiumPercentage, 
  daysToExpiry 
}: PriceAnalysisProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percent: number) => {
    const sign = percent >= 0 ? "+" : "";
    return `${sign}${percent.toFixed(2)}%`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <i className="fas fa-calculator text-purple-500 text-xl"></i>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Price Analysis</h2>
          <p className="text-sm text-gray-500">Spot vs Futures Comparison</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(Math.abs(priceDifference))}
          </div>
          <div className="text-sm text-gray-500 mt-1">Price Difference</div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className={`text-2xl font-bold ${
            premiumPercentage >= 0 ? "text-success" : "text-danger"
          }`}>
            {formatPercentage(premiumPercentage)}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {premiumPercentage >= 0 ? "Futures Premium" : "Futures Discount"}
          </div>
        </div>
        
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="text-2xl font-bold text-gray-900">{daysToExpiry}</div>
          <div className="text-sm text-gray-500 mt-1">Days to Expiry</div>
        </div>
      </div>
    </div>
  );
}
