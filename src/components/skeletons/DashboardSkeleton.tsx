import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import RecipeCardSkeleton from './RecipeCardSkeleton';

const DashboardSkeleton = () => {
    return (
        <div className="space-y-8 animate-pulse">
            <header className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton width={100} height={12} baseColor="#0a1d12" highlightColor="#0d2618" />
                    <Skeleton width={300} height={32} baseColor="#0a1d12" highlightColor="#0d2618" />
                    <Skeleton width={150} height={20} baseColor="#0a1d12" highlightColor="#0d2618" borderRadius={20} />
                </div>
                <Skeleton circle width={44} height={44} baseColor="#0a1d12" highlightColor="#0d2618" />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Skeleton height={200} borderRadius={32} baseColor="#0a1d12" highlightColor="#0d2618" />
                <div className="flex flex-col gap-4">
                    <Skeleton height={100} borderRadius={32} baseColor="#0a1d12" highlightColor="#0d2618" />
                    <Skeleton height={100} borderRadius={32} baseColor="#0a1d12" highlightColor="#0d2618" />
                </div>
            </div>

            <section>
                <div className="flex items-center justify-between mb-6">
                    <Skeleton width={200} height={28} baseColor="#0a1d12" highlightColor="#0d2618" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <RecipeCardSkeleton cards={4} />
                </div>
            </section>
        </div>
    );
};

export default DashboardSkeleton;
