import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <div>
        <Link to="/about" className="mx-2">
          About
        </Link>
        <Link to="/" className="mx-2">
          Catalog
        </Link>
      </div>
    </nav>
  );
}
