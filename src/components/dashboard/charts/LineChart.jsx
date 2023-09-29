import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from "recharts";

export default function Charts(props) {


const testData = [
  {name: '', react: 32, angular: 37, vue: 60},
  {name: '2019', react: 42, angular: 42, vue: 54},
  {name: '2020', react: 51, angular: 41, vue: 54},
  {name: '2021', react: 60, angular: 37, vue: 28},
  {name: '2022', react: 51, angular: 31, vue: 27},
  {name: '2023', react: 95, angular: 44, vue: 49},
]
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