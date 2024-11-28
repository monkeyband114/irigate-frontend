import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SensorChartProps {
  data: any[];
  dataKey: string;
  unit: string;
}

const SensorChart: React.FC<SensorChartProps> = ({ data, dataKey, unit }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip
          formatter={(value: number) => [
            `${value.toFixed(2)} ${unit}`,
            dataKey,
          ]}
          labelFormatter={() => ""}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorChart;
