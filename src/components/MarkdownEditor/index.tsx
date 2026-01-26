'use client';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Editor, EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useState } from 'react';
import { EditorToolbar } from './EditorToolbar';

type Props = {
    content?: JSONContent;
    setContent?: (value: JSONContent) => void;
    isEditable?: boolean;
    placeholder?: string;
};

export function MarkdownEditor({
    content,
    setContent,
    isEditable = true,
    placeholder = 'Type something....',
}: Props) {
    const [activeFormats, setActiveFormats] = useState<string[]>([]);
    const [hasContent, setHasContent] = useState<boolean>(false);

    const updateActiveFormats = useCallback((editor: Editor) => {
        setActiveFormats(
            [
                editor.isActive('bold') ? 'bold' : null,
                editor.isActive('italic') ? 'italic' : null,
                editor.isActive('underline') ? 'underline' : null,
                editor.isActive('strike') ? 'strikethrough' : null,
                editor.isActive('bulletList') ? 'bulletList' : null,
                editor.isActive('orderedList') ? 'orderedList' : null,
            ].filter(Boolean) as string[],
        );
    }, []);

    const tiptapEditor = useEditor({
        immediatelyRender: false, // For SSR
        editable: isEditable,
        content,
        extensions: [
            StarterKit,
            Link.configure({ openOnClick: false }),
            Placeholder.configure({ placeholder }),
        ],
        editorProps: {
            attributes: {
                class: `ProseMirror w-full h-full box-border overflow-auto outline-none`,
            },
        },
        onUpdate: ({ editor }) => {
            if (typeof setContent === 'function') setContent(editor.getJSON());

            setHasContent(() => (editor.isEmpty && editor.isEditable ? false : true));
            updateActiveFormats(editor);
        },
        onTransaction: ({ editor }) => updateActiveFormats(editor),
        onSelectionUpdate: ({ editor }) => updateActiveFormats(editor),
        onCreate: ({ editor }) => {
            updateActiveFormats(editor);
            setHasContent(() => (editor.isEmpty && editor.isEditable ? false : true));
        },
    });

    if (!tiptapEditor) return null;

    return (
        <div className='bg-input border border-input shadow-sm p-2 rounded-sm w-full h-full flex flex-col gap-2'>
            <div className='shrink-0'>
                <EditorToolbar editor={tiptapEditor} activeFormats={activeFormats} />
            </div>
            <div className='md-editor relative flex-1 min-h-0 w-full [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:my-1 [&_a]:text-primary [&_a]:underline flex flex-col'>
                {!hasContent && (
                    <span className='absolute top-0 left-0 opacity-50 pointer-events-none'>
                        {placeholder}
                    </span>
                )}
                <EditorContent
                    editor={tiptapEditor}
                    className='flex-1 min-h-0 w-full box-border prose max-w-none dark:prose-invert prose-p:my-0 prose-li:my-0 leading-normal'
                    spellCheck
                />
            </div>
        </div>
    );
}
