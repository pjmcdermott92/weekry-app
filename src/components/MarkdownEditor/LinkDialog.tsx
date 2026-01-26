import { Editor } from '@tiptap/react';
import { LinkIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { ToggleGroupItem } from '../ui/toggle-group';

export function LinkDialog({ editor }: { editor: Editor }) {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');

    const openDialog = useCallback(() => {
        if (!editor) return;
        const { from, to } = editor.state.selection;
        const selectionText = editor.state.doc.textBetween(from, to, ' ');
        setText(selectionText);

        let existingUrl = '';
        const marks = editor.state.doc.rangeHasMark(from, to, editor.schema.marks.link);

        if (marks) {
            editor.state.doc.nodesBetween(from, to, node => {
                const linkMark = node.marks.find(mark => mark.type.name === 'link');
                if (linkMark) existingUrl = linkMark.attrs.href;
            });
        }

        setUrl(existingUrl);
        setOpen(true);
    }, [editor]);

    const insertLink = useCallback(() => {
        if (!editor || !url) return;

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();

        if (!editor.state.selection.content().size) {
            editor
                .chain()
                .focus()
                .insertContent(text || url)
                .run();
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }

        setOpen(false);
        setUrl('');
        setText('');
    }, [editor, url, text]);

    return (
        <>
            <ToggleGroupItem
                value='link'
                aria-label='Open link dialog'
                onClick={openDialog}
                title='Add link'>
                <LinkIcon />
            </ToggleGroupItem>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className='sm:max-w-md'>
                    <DialogHeader>
                        <DialogTitle>Insert Link</DialogTitle>
                    </DialogHeader>

                    <div className='grid gap-4 py-4'>
                        <Input
                            placeholder='Link text'
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                        <Input
                            placeholder='URL (https://example.com)'
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                    </div>

                    <DialogFooter className='flex justify-end gap-2'>
                        <Button variant='outline' onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={insertLink} disabled={!url}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
