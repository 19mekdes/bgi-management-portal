import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

export const Breadcrumb: React.FC = () => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter((x) => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Dashboard', path: '/' }
    ];

    let currentPath = '';
    pathnames.forEach((name) => {
      currentPath += `/${name}`;
      
      // Format the label: capitalize and replace hyphens with spaces
      const label = name
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase());
      
      breadcrumbs.push({
        label,
        path: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center hover:text-gray-700 transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {breadcrumbs.slice(1).map((item, index) => {
        const isLast = index === breadcrumbs.length - 2;
        
        return (
          <div key={item.path} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-900">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};