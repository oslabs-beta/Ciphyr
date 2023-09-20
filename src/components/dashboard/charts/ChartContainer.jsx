import { useState, useEffect} from 'react'
import LineChart from './LineChart.jsx';
import BarChart from './BarChart.jsx';
import PieChart from './PieChart.jsx';

export default function ChartContainer() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    console.log("in try block");
    try {
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "04ffad9d-73ed-4d44-9e6a-3cbf2db31d2b",
        }),
      });
      if (!response.ok) {
        throw new Error(`Server side error. Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      console.log(data)
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <>
    <h1 className="ml-20 mt-10 font-semibold text-2xl">Insights</h1>
    <LineChart queryData={data}/>
    <div className='flex'>
    <BarChart />
    <PieChart queryData={data}/>
    </div>
  </>
  )
}