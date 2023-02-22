import React, { PureComponent } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: 'BOOK',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'MOVIE',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'PERFOMANCE',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

export default class Chart extends PureComponent {
  render() {
    return (
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    );
  }
}