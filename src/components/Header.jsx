import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Header = ({ title = "Timesheets" }) => {
  const [userName, setUserName] = useState("User");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name || "User");
      } catch (e) {
        console.error('Failed to parse user data:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-200 bg-white">
      <div className="flex justify-between h-[68px] w-full  items-center  p-4 box-border">
        <div className='flex gap-8 items-center'>
        <div
          className="cursor-pointer font-sans font-semibold text-2xl text-[#111928]"
          onClick={() => navigate('/dashboard')}
        >
          ticktock
        </div>
        <nav className=" text-sm font-medium text-[#111928]">
          {title}
        </nav>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-base font-medium font-sans text-[#6B7280] flex items-center gap-1 hover:text-gray-900"
          >
            {userName}
            <ChevronDown className="h-4 w-4 text-[#6B7280]" />
          </button>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-20">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t last:rounded-b"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
