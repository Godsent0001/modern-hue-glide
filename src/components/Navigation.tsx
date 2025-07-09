
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
              <Bot className="w-8 h-8" />
              <span>AI WORKFORCE</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/browse-ai"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/browse-ai') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Browse AI
            </Link>
            <Link
              to="/chat-history"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/chat-history') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Chat History
            </Link>
            <Link
              to="/categories"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/categories') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Categories
            </Link>
            <Link
              to="/settings"
              className={`font-medium transition-colors hover:text-blue-600 ${
                isActive('/settings') ? 'text-blue-600' : 'text-gray-700'
              }`}
            >
              Settings
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" onClick={() => navigate("/signin")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-blue-600 hover:bg-gray-50 ${
                isActive('/') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/browse-ai"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-blue-600 hover:bg-gray-50 ${
                isActive('/browse-ai') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse AI
            </Link>
            <Link
              to="/chat-history"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-blue-600 hover:bg-gray-50 ${
                isActive('/chat-history') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Chat History
            </Link>
            <Link
              to="/categories"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-blue-600 hover:bg-gray-50 ${
                isActive('/categories') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/settings"
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors hover:text-blue-600 hover:bg-gray-50 ${
                isActive('/settings') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    navigate("/signin");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    navigate("/signup");
                    setIsMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
