import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecipeDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-[#051109] text-white pb-24 relative overflow-x-hidden animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative h-[55vh] min-h-[450px] w-full bg-[#0a1d12]">
                <Skeleton height="100%" baseColor="#0a1d12" highlightColor="#0d2618" />
                <div className="absolute bottom-12 left-0 right-0 p-8">
                    <div className="max-w-5xl mx-auto space-y-4">
                        <Skeleton width={120} height={20} borderRadius={20} baseColor="#0d2618" highlightColor="#14331e" />
                        <Skeleton width="60%" height={60} baseColor="#0d2618" highlightColor="#14331e" />
                        <Skeleton width="80%" height={24} baseColor="#0d2618" highlightColor="#14331e" />
                    </div>
                </div>
            </div>

            {/* Quick Stats Skeleton */}
            <div className="max-w-5xl mx-auto px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-[#0d2114]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-5 flex flex-col items-center justify-center text-center">
                            <Skeleton circle width={24} height={24} baseColor="#0a1d12" highlightColor="#0d2618" className="mb-3" />
                            <Skeleton width={60} height={20} baseColor="#0a1d12" highlightColor="#0d2618" />
                            <Skeleton width={80} height={10} baseColor="#0a1d12" highlightColor="#0d2618" className="mt-2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Health Insight Skeleton */}
            <div className="max-w-5xl mx-auto px-8 mt-12">
                <div className="bg-[#0d2114] border border-white/5 rounded-3xl p-8">
                    <div className="flex items-start gap-5 mb-8">
                        <Skeleton circle width={48} height={48} baseColor="#0a1d12" highlightColor="#0d2618" />
                        <div className="flex-1">
                            <Skeleton width={150} height={24} baseColor="#0a1d12" highlightColor="#0d2618" className="mb-2" />
                            <Skeleton count={2} baseColor="#0a1d12" highlightColor="#0d2618" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} height={80} borderRadius={16} baseColor="#0a1d12" highlightColor="#0d2618" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="max-w-5xl mx-auto px-8 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-20">
                    <div className="space-y-8">
                        <Skeleton width={200} height={32} baseColor="#0a1d12" highlightColor="#0d2618" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Skeleton key={i} height={60} borderRadius={24} baseColor="#0a1d12" highlightColor="#0d2618" />
                            ))}
                        </div>
                    </div>
                    <div className="space-y-10">
                        <Skeleton width={250} height={32} baseColor="#0a1d12" highlightColor="#0d2618" />
                        <div className="space-y-12">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-8">
                                    <Skeleton circle width={40} height={40} baseColor="#0a1d12" highlightColor="#0d2618" />
                                    <div className="flex-1 space-y-3">
                                        <Skeleton width={100} height={12} baseColor="#0a1d12" highlightColor="#0d2618" />
                                        <Skeleton count={2} baseColor="#0a1d12" highlightColor="#0d2618" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailsSkeleton;
