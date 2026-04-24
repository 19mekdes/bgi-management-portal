import React from 'react';

interface SimpleBarChartProps {
  data: Array<{ name: string; value: number }>;
  title?: string;
  color?: string;
  height?: number;
}

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ 
  data, 
  title, 
  color = '#3b82f6',
  height = 300
}) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div className="flex items-end gap-4" style={{ height }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 40);
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full rounded-t transition-all duration-500"
                style={{ height: barHeight, backgroundColor: color }}
              />
              <span className="text-xs text-gray-600 mt-2">{item.name}</span>
              <span className="text-xs font-semibold">{item.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};