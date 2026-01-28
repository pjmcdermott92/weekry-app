'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutUser } from '@/services/supabase/actions/auth';
import { ChevronUpIcon, LogOut, User2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function UserMenu({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const router = useRouter();
    const logout = async () => {
        await logoutUser();
        router.push('/login');
    };

    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger className='outline-0 flex gap-2'>
                <UserDetails />
                <ChevronUpIcon className='text-sm ms-auto' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='min-w-[175px]'>
                <DropdownMenuLabel>
                    <UserDetails />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User2Icon />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                    <LogOut />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function UserDetails() {
    return (
        <div className='flex items-center gap-1'>
            <div className='size-6 shrink-0 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-semibold'>
                PM
            </div>
            <div className='flex transition-all duration-200 opacity-100 translate-x-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-translate-x-2 pointer-events-none whitespace-nowrap'>
                <div className='text-left ps-1'>
                    <p className='leading-4 text-sm font-semibold'>Patrick McDermott</p>
                    <p className='text-xs text-muted-foreground'>patrick@pjmcdermott.com</p>
                </div>
            </div>
        </div>
    );
}
