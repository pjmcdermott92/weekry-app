'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SettingsIcon } from 'lucide-react';
import { SidebarModeOptions } from './SidebarModeOptions';
import { ThemeSettings } from './ThemeOptions';
import { SidebarMode } from './sidebar.types';

type SettingsMenuProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: SidebarMode;
    setMode: (mode: SidebarMode) => void;
};

export function SettingsMenu({ open, onOpenChange, mode, setMode }: SettingsMenuProps) {
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger
                aria-label='Settings'
                className='flex items-center gap-2 outline-none'>
                <SettingsIcon className='shrink-0' />
                <span className='transition-all duration-200 opacity-100 translate-x-0 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:-translate-x-2 pointer-events-none whitespace-nowrap'>
                    Settings
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
                <ThemeSettings />
                <DropdownMenuSeparator />
                <SidebarModeOptions mode={mode} setMode={setMode} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
