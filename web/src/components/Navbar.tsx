import { Dropdown, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { RootState } from 'store';
import { handleAuthModal } from 'store/prompt';
import storage from 'utils/storage';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchQuery && location.pathname !== '/search') {
      setSearchQuery('');
    } else if (location.pathname === '/search') {
      const query = searchParams.get('q');
      if (query) {
        setSearchQuery(query);
      }
    }
  }, [location]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <div>
      <nav className="bg-white shadow fixed w-full z-[999]">
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-700 mb-0">
                  RaiseTheVoice
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex ml-2">
                  <div className="relative mt-1">
                    <form onSubmit={handleSearch}>
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-gray-300 block w-80 pl-10 py-2"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {user ? (
                <NavbarDropdown />
              ) : (
                <div
                  className="bg-gray-900 !hover:text-white !text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                  onClick={() => dispatch(handleAuthModal({ open: true }))}
                >
                  Sign in
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div style={{ height: 64 }} />
    </div>
  );
}

const NavbarDropdown = () => {
  const handleLogout = () => {
    storage.clear();
    window.location.reload();
  };

  return (
    <Dropdown
      placement="bottomRight"
      trigger={['click']}
      overlayStyle={{ width: 150 }}
      overlay={
        <Menu
          items={[
            {
              label: <Link to="/profile">Profile</Link>,
              key: 'profile',
            },
            {
              label: <Link to="/help">Help</Link>,
              key: 'help',
            },
            { type: 'divider' },
            {
              label: <span>Logout</span>,
              key: 'Logout',
              onClick: handleLogout,
            },
          ]}
        />
      }
    >
      <button
        type="button"
        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-4"
        id="user-menu-button"
        aria-expanded="false"
        aria-haspopup="true"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="h-8 w-8 rounded-full"
          src="/default-avatar.webp"
          alt="profile"
        />
      </button>
    </Dropdown>
  );
};
