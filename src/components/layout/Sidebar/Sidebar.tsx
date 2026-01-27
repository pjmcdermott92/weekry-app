'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    useSidebar,
} from '@/components/ui/sidebar';
import { useEffect, useRef, useState } from 'react';
import { SettingsMenu } from './SettingsMenu';
import { SidebarMode } from './sidebar.types';
import { usePersistedState } from '@/hooks/use-persisted-state';
import { UserMenu } from './UserMenu';

export function AppSidebar() {
    const { setOpen } = useSidebar();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const [mode, setMode] = usePersistedState<SidebarMode>('sidebar:mode', 'hover');
    const [isHovered, setIsHovered] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        settings: false,
        user: false,
    });

    const dropdownOpen = Object.values(dropdowns).some(Boolean);

    const shouldBeOpen = mode === 'expanded' || (mode === 'hover' && (isHovered || dropdownOpen));

    useEffect(() => {
        setOpen(shouldBeOpen);
    }, [shouldBeOpen, setOpen]);

    return (
        <Sidebar
            ref={sidebarRef}
            collapsible='icon'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <SidebarContent>
                <SidebarMenu>f</SidebarMenu>
            </SidebarContent>

            <SidebarFooter className='space-y-2'>
                <SettingsMenu
                    open={dropdowns.settings}
                    onOpenChange={open => setDropdowns(prev => ({ ...prev, settings: open }))}
                    mode={mode}
                    setMode={setMode}
                />
                <UserMenu
                    open={dropdowns.user}
                    onOpenChange={open => setDropdowns(prev => ({ ...prev, user: open }))}
                />
            </SidebarFooter>
        </Sidebar>
    );
}
