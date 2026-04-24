import React from 'react';
import { Download, FileText, FileSpreadsheet, FileJson } from 'lucide-react';
import { Button } from '../../../components/common/Button';

interface ExportButtonsProps {
  onExport: (format: 'csv' | 'excel' | 'pdf') => void;
  isLoading?: boolean;
  formats?: Array<'csv' | 'excel' | 'pdf'>;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  onExport,
  isLoading = false,
  formats = ['csv', 'excel', 'pdf'],
}) => {
  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'csv':
        return <FileText size={16} />;
      case 'excel':
        return <FileSpreadsheet size={16} />;
      case 'pdf':
        return <FileJson size={16} />;
      default:
        return <Download size={16} />;
    }
  };

  const getFormatLabel = (format: string) => {
    switch (format) {
      case 'csv':
        return 'CSV';
      case 'excel':
        return 'Excel';
      case 'pdf':
        return 'PDF';
      default:
        return format.toUpperCase();
    }
  };

  return (
    <div className="flex gap-2">
      {formats.map((format) => (
        <Button
          key={format}
          variant="secondary"
          onClick={() => onExport(format)}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          {getFormatIcon(format)}
          {getFormatLabel(format)}
        </Button>
      ))}
    </div>
  );
};