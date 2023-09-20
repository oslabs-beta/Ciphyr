import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Piechart(props) {

  let query = 0;
  let mutation = 0;

  const operationRatio = (queries) => {
    queries.forEach((el) => {
      if (el.operation === 'query') {
        query++
      } else {
        mutation++
      }
    });
  }

  operationRatio(props.queryData);

  const data = [
    { name: 'Query', value: query },
    { name: 'Mutation', value: mutation },
  ];

    return (
      <div className ='border border-2 mt-3 ml-3 rounded-md bg-white '>
        <h1 className='font-semibold mt-5 ml-5'>Operation Type</h1>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        </div>
    );
  }

