import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-[#071611] text-gray-100 overflow-hidden font-sans">
            <Sidebar />
            <main className="flex-1 overflow-y-auto w-full relative md:ml-[20rem]">
                <div className="p-6 md:p-8 pt-20 md:pt-10 w-full h-full min-h-screen">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
