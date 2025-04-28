
import { Link } from 'react-router-dom';
import { Calendar } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">MediQueue</span>
            </Link>
            <p className="mt-3 text-sm text-gray-500 max-w-md">
              Streamlining patient flow in hospitals with our innovative queue management system. Making healthcare more accessible and efficient.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-24">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-sm text-gray-600 hover:text-primary">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-gray-600 hover:text-primary">About</Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-4">Portals</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/patient" className="text-sm text-gray-600 hover:text-primary">Patient Portal</Link>
                </li>
                <li>
                  <Link to="/staff" className="text-sm text-gray-600 hover:text-primary">Staff Portal</Link>
                </li>
                <li>
                  <Link to="/admin" className="text-sm text-gray-600 hover:text-primary">Admin Portal</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MediQueue. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
