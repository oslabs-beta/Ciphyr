import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function EmptyInstanceMessage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a 2-second delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-2/3 w-full">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
        </div>
      )}
    </div>
  );
}
