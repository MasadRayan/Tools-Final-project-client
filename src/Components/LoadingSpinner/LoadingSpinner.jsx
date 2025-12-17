import { FiShoppingCart } from "react-icons/fi";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100/95 backdrop-blur-sm">
      {/* Bouncing Cart */}
      <div className="relative mb-6">
        <div className="animate-bounce">
          <div className="relative">
            <FiShoppingCart className="h-16 w-16 text-primary drop-shadow-lg" />
          </div>
        </div>
        {/* Shadow effect */}
        <div className="absolute -bottom-2 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full bg-secondary/20 blur-sm animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="flex items-center gap-1">
        <span className="text-lg font-semibold text-secondary">
          Loading
        </span>
        {/* Bouncing dots */}
        <div className="flex gap-1 ml-1">
          <span 
            className="h-2 w-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span 
            className="h-2 w-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span 
            className="h-2 w-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>

      {/* Subtext */}
      <p className="mt-3 text-sm text-accent">
        Preparing your shopping experience...
      </p>
    </div>
  );
};

export default LoadingSpinner;
