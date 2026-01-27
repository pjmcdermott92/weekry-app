import { getCurrentUser } from '@/services/supabase/lib/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    if (user?.id) return redirect('/');
    
    return (
        <div className='flex flex-col w-screen h-screen'>
            <div className='h-12 bg-card shadow-sm flex items-center px-2'>
                <h1 className='font-bold text-2xl'>Weekry App</h1>
            </div>
            <div className='flex-1 w-full flex items-center justify-center'>{children}</div>
            <div>copyright</div>
        </div>
    );
}
