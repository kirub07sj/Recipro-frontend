import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useHealthProfileStore } from '../store/healthProfileStore';

interface RequireHealthProfileProps {
    children: ReactNode;
}

const RequireHealthProfile = ({ children }: RequireHealthProfileProps) => {
    const { userId, isAuthenticated } = useAuth();
    const { profile, fetchProfile, isLoading } = useHealthProfileStore();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (isAuthenticated && userId && !profile) {
            fetchProfile(userId).catch(() => {}).finally(() => setChecked(true));
        } else {
            setChecked(true);
        }
    }, [isAuthenticated, userId, profile, fetchProfile]);

    if (!checked || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#071611]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00E676]"></div>
            </div>
        );
    }

    if (!profile) {
        return <Navigate to="/health-profile" replace />;
    }

    return <>{children}</>;
};

export default RequireHealthProfile;
