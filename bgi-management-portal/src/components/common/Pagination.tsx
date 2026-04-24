import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export const Pagination = ({ currentPage, totalPages, onPageChange, siblingCount = 1 }: PaginationProps) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  
  const getPageNumbers = () => {
    const totalPageNumbers = siblingCount * 2 + 3;
    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }
    
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;
    
    if (!showLeftDots && showRightDots) {
      const leftItems = range(1, 3 + siblingCount * 2);
      return [...leftItems, '...', totalPages];
    }
    
    if (showLeftDots && !showRightDots) {
      const rightItems = range(totalPages - (siblingCount * 2 + 2), totalPages);
      return [1, '...', ...rightItems];
    }
    
    return [1, '...', ...range(leftSiblingIndex, rightSiblingIndex), '...', totalPages];
  };
  
  const pages = getPageNumbers();
  
  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage
              ? 'bg-blue-600 text-white'
              : page === '...'
              ? 'cursor-default'
              : 'border hover:bg-gray-50'
          }`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};