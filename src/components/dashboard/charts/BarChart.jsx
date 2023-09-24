
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import { useState, useEffect } from 'react';


export default function Barchart(props) {
  const [errors, setErrors] = useState([]);

  const getErrors = (data) => {
    const filtered = data.filter((obj) => obj.error_occured === true);
    const errorObj = {};

    filtered.forEach((el) => {
      errorObj[el.error_code] = errorObj[el.error_code] ? errorObj[el.error_code] + 1 : 1;
    });
    const errorArr = [];
    for (let i in errorObj) {
      const temp = {
        type: i,
        errors: errorObj[i]
      }
       errorArr.push(temp);
    }
    setErrors(errorArr);
  }

  useEffect(() => {
    getErrors(props.queryData);
  }, [errors])

    return (
      <div className='border-2 rounded-md shadow p-5 w-1/2 ml-8 mt-3 bg-white'>
         <h1 className='font-semibold'>Errors</h1>
        <BarChart
          width={500}
          height={300}
          data={errors}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="errors" fill="#8884d8" />
        </BarChart>
        </div>
    );
  }
