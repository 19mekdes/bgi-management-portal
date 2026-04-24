export default function Footer() {
  return (
    <footer className="bg-white border-t py-3 px-6 text-center text-sm text-gray-500">
      <p>&copy; {new Date().getFullYear()} Beer Factory Management Portal. All rights reserved.</p>
    </footer>
  );
}