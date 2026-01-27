'use client';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import TurndownService from 'turndown';
import { useState } from 'react';
import { Button } from './ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
    Bold,
    BoldIcon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from 'lucide-react';

type Props = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialContent?: any;
    isEditable?: boolean;
    enableFileUploader?: boolean;
    placeholder?: string;
};

export function VisualEditor({
    initialContent,
    isEditable = true,
    enableFileUploader = false,
    placeholder = 'Type something...',
}: Props) {
    const tiptapEditor = useEditor({
        immediatelyRender: false, // for SSR
        editable: isEditable,
        content: initialContent || null,
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
        ],
        editorProps: {
            attributes: {
                class: 'w-full h-full outline-none focus:outline-none placeholder-gray-400',
            },
        },
        onUpdate: ({ editor }) => {},
    });

    if (!tiptapEditor) return null;

    return (
        <div>
            <EditorToolbar editor={tiptapEditor} />
        </div>
    );
}

function EditorToolbar({ editor }: { editor: Editor }) {
    const toggleBold = () => editor.chain().focus().toggleBold().run();
    const toggleItalic = () => editor.chain().focus().toggleItalic().run();
    const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
    const toggleStrike = () => editor.chain().focus().toggleStrike().run();
    const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
    const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
    const addLink = () => {
        const url = prompt('Enter URL');
        if (!url) return;
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };

    if (!editor) return null;

    return (
        <div className='flex items-center gap-1'>
            <div className='flex items-center gap-1'>
                <ToggleGroup variant='outline' type='multiple'>
                    <ToggleGroupItem value='bold' aria-label='Toggle bold'>
                        <BoldIcon />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='italic' aria-label='Toggle italic'>
                        <ItalicIcon />
                    </ToggleGroupItem>
                    <ToggleGroupItem value='strikethrough' aria-label='Toggle strikethrough'>
                        <UnderlineIcon />
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div className='w-px border-s' />
            <div className='flex items-center gap-1'>
                <Button variant='outline' onClick={toggleBulletList}>
                    <ListIcon />
                    <span className='sr-only'>Unordered List</span>
                </Button>
                <Button variant='outline' onClick={toggleOrderedList}>
                    <ListOrderedIcon />
                    <span className='sr-only'>Ordered List</span>
                </Button>
            </div>
            <div className='w-px border-s' />
        </div>
    );
}
