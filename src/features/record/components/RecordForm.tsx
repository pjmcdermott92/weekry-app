'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectContent } from '@radix-ui/react-select';
import { EllipsisVerticalIcon, XIcon } from 'lucide-react';

export function RecordForm() {
    return (
        <div className='grid grid-cols-[50px_1fr] gap-2 space-y-2'>
            <div className='flex justify-end items-end'>
                <Button variant='icon-rounded'>
                    <XIcon className='size-6' />
                    <span className='sr-only'>Cancel</span>
                </Button>
            </div>
            <div className='flex items-end gap-2'>
                <div className='border-b w-full'>
                    <input
                        className='border-b-2 border-b-transparent w-full outline:none focus:outline-none focus:border-primary text-2xl pb-px'
                        placeholder='Add title'
                    />
                </div>
                <Button size='sm'>Save</Button>
                <Button variant='icon-rounded'>
                    <EllipsisVerticalIcon />
                </Button>
            </div>
            <div className='col-start-2 flex item-center gap-4'>
                <Select>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Record type' />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                </Select>
                <Select>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Record type' />
                    </SelectTrigger>
                    <SelectContent></SelectContent>
                </Select>
            </div>
        </div>
    );
}
