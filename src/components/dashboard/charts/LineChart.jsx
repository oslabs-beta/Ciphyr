import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts";

export default function Charts(props) {

  return (
    <>
    <div className='border border-2 rounded-md shadow p-5 w-3/4 ml-8 bg-white'>
    <h1 className='font-semibold'>Query Data</h1>
    <LineChart width={600} height={300} data={props.queryData}>
      <Line type='monotone' dataKey='depth' stroke='#2196F3' strokeWidth={3} />
      <Line type='monotone' dataKey='latency' stroke='#F44236' strokeWidth={3} />
      <CartesianGrid stroke='#ccc' />
      <XAxis dataKey='timestamp' />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
    </div>
    </>
  )
}