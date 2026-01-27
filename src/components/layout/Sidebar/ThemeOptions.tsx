'use client';
import { DropdownMenuGroup, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { OptionItem } from './OptionItem';

const THEMES = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: MonitorIcon },
] as const;

export function ThemeSettings() {
    const { theme, setTheme } = useTheme();
    if (!theme) return null;

    return (
        <DropdownMenuGroup>
            <DropdownMenuLabel className='text-xs font-bold'>Theme</DropdownMenuLabel>
            {THEMES.map(t => (
                <OptionItem
                    key={t.value}
                    value={t.value}
                    current={theme}
                    onSelect={setTheme}
                    icon={t.icon}
                    label={t.label}
                />
            ))}
        </DropdownMenuGroup>
    );
}
