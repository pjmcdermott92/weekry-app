'use client';
import { Button } from '@/components/ui/button';
import { logoutUser } from '@/services/supabase/actions/auth';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
        await logoutUser();
        router.push('/login');
    };

    return <Button onClick={logout}>Logout</Button>;
}
