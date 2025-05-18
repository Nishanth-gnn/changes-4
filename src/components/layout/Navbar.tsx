
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X,
  Calendar, 
  User, 
  LogOut
} from "lucide-react";
import { useClerk, SignInButton, SignedIn, SignedOut } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  
  // Check if user is on a dashboard page (authenticated)
  const isAuthenticated = location.pathname.includes('/patient') || 
                         location.pathname.includes('/staff') || 
                         location.pathname.includes('/admin');

  const handleSignOut = () => {
    signOut(() => navigate("/"));
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">MediQueue</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-primary text-sm font-medium">
                Home
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                About
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <SignedIn>
              <Button asChild variant="outline" onClick={handleSignOut}>
                <div>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </div>
              </Button>
            </SignedIn>
            <SignedOut>
              <Button asChild variant="outline">
                <SignInButton afterSignInUrl="/auth/select-role" />
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </SignedOut>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-primary text-base font-medium text-primary bg-primary-50">
              Home
            </Link>
            <Link to="/about" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
              About
            </Link>
            <Link to="/contact" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300">
              Contact
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4 gap-2">
                <SignedIn>
                  <Button asChild variant="outline" className="w-full" onClick={handleSignOut}>
                    <div>
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </div>
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Button asChild variant="outline" className="w-full">
                    <SignInButton afterSignInUrl="/auth/select-role" />
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/register">Register</Link>
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
