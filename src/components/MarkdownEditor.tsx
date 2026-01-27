'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TurndownService from 'turndown';
import { useState } from 'react';

interface Props {
    initialContent?: any; // JSON from DB
}

export default function TipTapMarkdownEditor({ initialContent }: Props) {
    const [markdown, setMarkdown] = useState('');

    // Initialize TipTap editor
    const editor = useEditor({
        extensions: [StarterKit, Link],
        content: initialContent || '<p></p>',
        onUpdate({ editor }) {
            const html = editor.getHTML();
            const turndownService = new TurndownService();
            setMarkdown(turndownService.turndown(html));
        },
        editorProps: {
            attributes: {
                class: 'flex-1 w-full h-full outline-none focus:outline-none placeholder-gray-400',
            },
        },
    });

    if (!editor) return null;

    // Toolbar actions
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

    // Save function (simulate DB save)
    const saveContent = () => {
        const json = editor.getJSON(); // store in DB
        const html = editor.getHTML(); // optional: for preview
        const turndownService = new TurndownService();
        const md = turndownService.turndown(html); // export Markdown
        console.log('JSON to store in DB:', json);
        console.log('Markdown export:', md);
        alert('Saved to console!');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button onClick={toggleBold}>Bold</button>
                <button onClick={toggleItalic}>Italic</button>
                <button onClick={toggleUnderline}>Underline</button>
                <button onClick={toggleStrike}>Strikethrough</button>
                <button onClick={toggleBulletList}>• List</button>
                <button onClick={toggleOrderedList}>1. List</button>
                <button onClick={addLink}>Link</button>
                <button onClick={saveContent}>Save</button>
            </div>

            {/* Editor */}
            <div className='editor border border-gray-300 rounded p-4 h-[300px] flex flex-col'>
                <EditorContent editor={editor} />
            </div>

            {/* Markdown Preview */}
            <div
                style={{
                    border: '1px solid #eee',
                    padding: '1rem',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9',
                    whiteSpace: 'pre-wrap',
                    minHeight: '150px',
                }}>
                <h4>Markdown Preview:</h4>
                {markdown}
            </div>
        </div>
    );
}
