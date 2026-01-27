'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronUpIcon, LogOut, User2Icon } from 'lucide-react';

export function UserMenu({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger className='outline-0'>
                <div className='flex items-center gap-1'>
                    <div className='size-6 shrink-0 rounded-full flex items-center justify-center bg-primary text-primary-foreground text-xs font-semibold'>
                        PM
                    </div>
                    <div className='flex transition-all duration-200 opacity-100 translate-x-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-translate-x-2 pointer-events-none whitespace-nowrap'>
                        <div className='text-left ps-1'>
                            <p className='leading-4 text-sm font-semibold'>Patrick McDermott</p>
                            <p className='text-xs text-muted-foreground'>patrick@pjmcdermott.com</p>
                        </div>
                        <ChevronUpIcon className='size-5' />
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start' className='min-w-[175px]'>
                <DropdownMenuItem>
                    <User2Icon />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LogOut />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
