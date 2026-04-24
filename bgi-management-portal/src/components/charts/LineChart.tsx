import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface LineChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>;
  xKey: string;
  yKey: string;
  secondaryYKey?: string;
  title?: string;
  color?: string;
  secondaryColor?: string;
  strokeWidth?: number;
}

export const LineChart = ({
  data,
  xKey,
  yKey,
  secondaryYKey,
  title,
  color = '#3b82f6',
  secondaryColor = '#ef4444',
  strokeWidth = 2,
}: LineChartProps) => {
  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          {secondaryYKey && (
            <Line
              type="monotone"
              dataKey={secondaryYKey}
              stroke={secondaryColor}
              strokeWidth={strokeWidth}
              dot={{ r: 4 }}
            />
          )}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};