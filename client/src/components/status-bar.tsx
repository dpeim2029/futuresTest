interface StatusBarProps {
  isConnected: boolean;
  lastUpdated?: string;
  isLoading: boolean;
}

export default function StatusBar({ isConnected, lastUpdated, isLoading }: StatusBarProps) {
  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return "Never";
    
    const date = new Date(dateString);
    return date.toLocaleString("en-SG", {
      timeZone: "Asia/Singapore",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short"
    });
  };

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isLoading 
              ? "bg-yellow-500 animate-pulse" 
              : isConnected 
                ? "bg-success animate-pulse" 
                : "bg-red-500"
          }`}></div>
          <span className="text-sm font-medium text-gray-700">
            {isLoading ? "Updating..." : isConnected ? "Live Data" : "Disconnected"}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: <span className="font-medium">{formatLastUpdated(lastUpdated)}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <i className="fas fa-clock text-gray-400"></i>
        <span className="text-sm text-gray-500">Auto-refresh: 30s</span>
      </div>
    </div>
  );
}
