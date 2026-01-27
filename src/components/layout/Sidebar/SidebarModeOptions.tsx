'use client';
import { DropdownMenuGroup, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { PanelLeftIcon, PanelLeftInactiveIcon, PanelLeftOpen } from 'lucide-react';
import { SidebarMode } from './sidebar.types';
import { OptionItem } from './OptionItem';

const MODES = [
    { value: 'expanded', label: 'Expanded', icon: PanelLeftIcon },
    { value: 'collapsed', label: 'Collapsed', icon: PanelLeftInactiveIcon },
    { value: 'hover', label: 'Expand on Hover', icon: PanelLeftOpen },
] as const;

export function SidebarModeOptions({
    mode,
    setMode,
}: {
    mode: SidebarMode;
    setMode: (mode: SidebarMode) => void;
}) {
    return (
        <DropdownMenuGroup>
            <DropdownMenuLabel className='text-xs font-bold'>Sidebar Settings</DropdownMenuLabel>
            {MODES.map(m => (
                <OptionItem
                    key={m.value}
                    value={m.value}
                    current={mode}
                    onSelect={setMode}
                    icon={m.icon}
                    label={m.label}
                />
            ))}
        </DropdownMenuGroup>
    );
}
