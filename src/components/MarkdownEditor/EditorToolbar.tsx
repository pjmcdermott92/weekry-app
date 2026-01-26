import { Editor } from '@tiptap/react';
import {
    BoldIcon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    StrikethroughIcon,
    UnderlineIcon,
} from 'lucide-react';
import { useMemo } from 'react';
import { Separator } from '../ui/separator';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { LinkDialog } from './LinkDialog';

type Props = {
    editor: Editor;
    activeFormats: string[];
};

const FORMAT_ICONS: Record<
    string,
    { icon: React.ReactNode; command: (editor: Editor) => void; label: string }
> = {
    bold: {
        icon: <BoldIcon />,
        command: e => e.chain().focus().toggleBold().run(),
        label: 'Bold (crl + b)',
    },
    italic: {
        icon: <ItalicIcon />,
        command: e => e.chain().focus().toggleItalic().run(),
        label: 'Italic (crl + i)',
    },
    underline: {
        icon: <UnderlineIcon />,
        command: e => e.chain().focus().toggleUnderline().run(),
        label: 'Underline (crl + u)',
    },
    strikethrough: {
        icon: <StrikethroughIcon />,
        command: e => e.chain().focus().toggleStrike().run(),
        label: 'Strikethrough (crl + shit + s)',
    },
    bulletList: {
        icon: <ListIcon />,
        command: e => e.chain().focus().toggleBulletList().run(),
        label: 'Unordered list',
    },
    orderedList: {
        icon: <ListOrderedIcon />,
        command: e => e.chain().focus().toggleOrderedList().run(),
        label: 'Ordered list',
    },
};

export function EditorToolbar({ editor, activeFormats }: Props) {
    if (!editor) return null;

    return (
        <div className='flex items-center gap-1'>
            <div className='flex items-center gap-1 not-last:border-r'>
                <ToggleGroup
                    variant='outline'
                    type='multiple'
                    value={activeFormats}
                    className='h-8 flex items-center gap-1'>
                    {['bold', 'italic', 'underline', 'strikethrough'].map(key => {
                        const { icon, command, label } = FORMAT_ICONS[key];
                        return (
                            <ToggleGroupItem
                                key={key}
                                value={key}
                                aria-label={`Toggle ${key}`}
                                onClick={() => command(editor)}
                                className='flex items-center justify-center'
                                title={label}>
                                <Tooltip>
                                    <TooltipTrigger asChild>{icon}</TooltipTrigger>
                                    <TooltipContent>{label}</TooltipContent>
                                </Tooltip>
                            </ToggleGroupItem>
                        );
                    })}
                    <Separator orientation='vertical' />
                    {['bulletList', 'orderedList'].map(key => {
                        const { icon, command, label } = FORMAT_ICONS[key];
                        return (
                            <ToggleGroupItem
                                key={key}
                                value={key}
                                aria-label={`Toggle ${key}`}
                                onClick={() => command(editor)}
                                className='flex items-center justify-center'
                                title={label}>
                                <Tooltip>
                                    <TooltipTrigger asChild>{icon}</TooltipTrigger>
                                    <TooltipContent>{label}</TooltipContent>
                                </Tooltip>
                            </ToggleGroupItem>
                        );
                    })}
                    <Separator orientation='vertical' />
                    <LinkDialog editor={editor} />
                </ToggleGroup>
            </div>
        </div>
    );
}
