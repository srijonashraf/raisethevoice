import { IoNewspaperOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from 'store';
import { handlePostModal, requireAuth } from 'store/prompt';
import { cn } from 'utils';

const navItems = [
  {
    label: 'My Feed',
    href: '/',
    icon: (
      <IoNewspaperOutline className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
    ),
  },
  {
    label: 'Explore',
    href: '/explore',
    icon: (
      <svg
        className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  console.log('🚀 ~ Sidebar ~ location:', location);

  const onWritePost = () => {
    if (user) {
      dispatch(handlePostModal({ open: true }));
    } else {
      dispatch(requireAuth());
    }
  };

  return (
    <div className="max-w-xl sticky top-[88px] mx-auto">
      <aside className="w-full" aria-label="Sidebar">
        <div className="pb-4 overflow-y-auto rounded">
          <div className="space-y-2">
            {navItems.map((navItem) => (
              <NavItem
                key={navItem.href}
                {...navItem}
                active={pathname === navItem.href}
              />
            ))}
          </div>
        </div>
        <div>
          <ActionButton onClick={onWritePost}>Write</ActionButton>
        </div>
      </aside>
    </div>
  );
}

const NavItem = ({ icon, label, href, active }: any) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100',
        { 'font-semibold': active }
      )}
    >
      {icon}
      <span className="flex-1 ml-3 whitespace-nowrap">{label}</span>
    </Link>
  );
};

const ActionButton = ({ children, ...props }: any) => {
  return (
    <button
      className="bg-gray-900 mt-4 text-white px-3 py-2 w-full rounded-full font-semibold"
      {...props}
    >
      {children}
    </button>
  );
};
