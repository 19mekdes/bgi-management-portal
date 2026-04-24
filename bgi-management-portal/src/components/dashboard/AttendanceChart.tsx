import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts';

interface AttendanceChartProps {
  data: Array<{
    date: string;
    present: number;
    absent: number;
    late?: number;
  }>;
}

export const AttendanceChart = ({ data }: AttendanceChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="present" fill="#3b82f6" name="Present" />
        <Bar dataKey="absent" fill="#ef4444" name="Absent" />
        {data[0]?.late !== undefined && (
          <Line type="monotone" dataKey="late" stroke="#f59e0b" name="Late" />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};