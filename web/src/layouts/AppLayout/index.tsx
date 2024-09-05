import Prompts from 'components/Prompts';
import { Outlet } from 'react-router-dom';
import Sidebar from './views/Sidebar';

export default function AppLayout() {
  return (
    <>
      <div className="max-w-7xl mx-auto flex gap-8">
        <div className="w-[190px]">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Prompts />
    </>
  );
}
