import { useState, useEffect } from "react";
import DashLoadingScreen from "./DashLoadingScreen";

export default function EmptyMessage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulate a 2-second delay
    const delay = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <>
      {loading ? (
        <DashLoadingScreen />
      ) : (
        <div className="flex flex-col justify-center items-center h-2/3 w-full">
          <div>
            <p className="text-slate-600">No data available.</p>
          </div>
        </div>
      )}
    </>
  );
}
