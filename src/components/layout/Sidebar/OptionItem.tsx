'use client';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { CheckIcon } from 'lucide-react';

type Props<T> = {
    value: T;
    current: T;
    onSelect: (v: T) => void;
    icon: LucideIcon;
    label: string;
};

export function OptionItem<T>({ value, current, onSelect, icon: Icon, label }: Props<T>) {
    return (
        <DropdownMenuItem
            onClick={e => {
                e.preventDefault();
                onSelect(value);
            }}>
            <Icon />
            {label}
            <CheckIcon className={cn('ml-auto', current === value ? 'opacity-100' : 'opacity-0')} />
        </DropdownMenuItem>
    );
}
