import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { TopNavbar } from './TopNavbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}