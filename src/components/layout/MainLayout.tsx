import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-[#0b110d] text-white font-sans overflow-hidden">
            <Sidebar />
            <div className="flex-1 h-full overflow-hidden flex flex-col">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
