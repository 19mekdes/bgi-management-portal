import { useState, useCallback } from 'react';

interface UsePaginationProps {
  initialPage?: number;
  initialLimit?: number;
  totalItems?: number;
}

export const usePagination = ({ initialPage = 1, initialLimit = 10, totalItems = 0 }: UsePaginationProps = {}) => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages || 1)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (page < totalPages) setPage(p => p + 1);
  }, [page, totalPages]);

  const previousPage = useCallback(() => {
    if (page > 1) setPage(p => p - 1);
  }, [page]);

  const setItemsPerPage = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // reset to first page when changing limit
  }, []);

  return {
    page,
    limit,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    previousPage,
    setItemsPerPage,
  };
};