'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Heading2, Minus, Palette, Pilcrow } from 'lucide-react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-t-md border border-input bg-transparent p-2">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ color: 'var(--color-tiptap-blue)' })}
        onPressedChange={() => editor.chain().focus().toggleColor('var(--color-tiptap-blue)').run()}
      >
        <Palette className="h-4 w-4 text-blue-500" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ color: 'var(--color-tiptap-gray)' })}
        onPressedChange={() => editor.chain().focus().toggleColor('var(--color-tiptap-gray)').run()}
      >
        <Palette className="h-4 w-4 text-gray-500" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textStyle: { fontSize: 'small' } })}
        onPressedChange={() => editor.chain().focus().toggleTextStyle({ fontSize: 'small' }).run()}
      >
        <Pilcrow className="h-4 w-4" />
      </Toggle>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="h-4 w-4" />
      </Button>
    </div>
  );
};

interface VitaEditorDialogProps {
  trigger: React.ReactNode;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ trigger, initialValue, onSave }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [3, 4],
        },
        horizontalRule: {},
      }),
      Underline,
      TextStyle,
      Color.configure({
        types: ['textStyle'],
      }),
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class: 'prose prose-sm dark:prose-invert max-w-none focus:outline-none rounded-b-md border border-input border-t-0 p-4 min-h-[250px] bg-accent/95 text-background',
      },
    },
  });

  useEffect(() => {
    if (isOpen && editor) {
      editor.commands.setContent(initialValue);
    }
  }, [isOpen, initialValue, editor]);

  const handleSave = () => {
    if (editor) {
      onSave(editor.getHTML());
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeiten Sie den Inhalt mit dem Editor. Die Textanzeige im Editor ist dunkel, entspricht aber nicht der finalen Darstellung auf der Karte.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <MenuBar editor={editor} />
          <EditorContent editor={editor} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
