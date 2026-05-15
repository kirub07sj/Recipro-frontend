import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecipeCardSkeleton = ({ cards = 4 }) => {
    return (
        <>
            {Array(cards).fill(0).map((_, i) => (
                <div key={i} className="bg-[#0d2114] rounded-[2rem] overflow-hidden border border-white/5 p-0">
                    <div className="aspect-[4/3]">
                        <Skeleton height="100%" baseColor="#0a1d12" highlightColor="#0d2618" />
                    </div>
                    <div className="p-5">
                        <Skeleton height={24} width="80%" baseColor="#0a1d12" highlightColor="#0d2618" className="mb-3" />
                        <div className="flex gap-4">
                            <Skeleton height={16} width={60} baseColor="#0a1d12" highlightColor="#0d2618" />
                            <Skeleton height={16} width={60} baseColor="#0a1d12" highlightColor="#0d2618" />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default RecipeCardSkeleton;
