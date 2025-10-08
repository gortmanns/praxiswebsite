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
import { Bold, Underline as UnderlineIcon, Italic, List, Minus, Palette, Pilcrow, Code2 } from 'lucide-react';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const MenuBar = ({ editor, isHtmlMode, onHtmlModeToggle }: { editor: Editor | null; isHtmlMode: boolean; onHtmlModeToggle: () => void; }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-input border-b-0 bg-transparent p-1">
       {/* Group 1: Style */}
       <Toggle
        size="sm"
        pressed={editor.isActive({ textStyle: { fontSize: 'small' } })}
        onPressedChange={() => editor.chain().focus().toggleTextStyle({ fontSize: 'small' }).run()}
        disabled={isHtmlMode}
        title="Kleinere Schrift"
      >
        <Pilcrow className="h-4 w-4" />
      </Toggle>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-1.5" disabled={isHtmlMode} title="Textfarbe">
                <Palette className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().unsetColor().run()}>
                Normal (Weiss)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setColor('var(--color-tiptap-blue)').run()}>
                Blau
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().setColor('var(--color-tiptap-gray)').run()}>
                Grau
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Group 2: Formatting */}
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        disabled={isHtmlMode}
        title="Fett"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
       <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        disabled={isHtmlMode}
        title="Kursiv"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        disabled={isHtmlMode}
        title="Unterstrichen"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Group 3: Structure */}
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        disabled={isHtmlMode}
        title="Aufzählungsliste"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Button
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-1.5"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        disabled={isHtmlMode}
        title="Trennlinie einfügen"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-6 mx-1" />
      
      {/* Group 4: Mode */}
      <Toggle
        size="sm"
        pressed={isHtmlMode}
        onPressedChange={onHtmlModeToggle}
        title={isHtmlMode ? "Visuellen Editor anzeigen" : "HTML-Code anzeigen"}
      >
        <Code2 className="h-4 w-4" />
      </Toggle>
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
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const [htmlContent, setHtmlContent] = useState(initialValue);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
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

  // Sync content to local state when opening or initial value changes
  useEffect(() => {
    if (isOpen) {
        const content = initialValue;
        setHtmlContent(content);
        if (editor && !editor.isDestroyed) {
            editor.commands.setContent(content);
        }
    }
  }, [isOpen, initialValue, editor]);

  // Sync editor with htmlContent state when switching modes
  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    if (isHtmlMode) {
      // From Visual to HTML: update textarea with latest editor content
      setHtmlContent(editor.getHTML());
    } else {
      // From HTML to Visual: update editor with textarea content
      if (editor.getHTML() !== htmlContent) {
        editor.commands.setContent(htmlContent);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHtmlMode, editor]);


  const handleSave = () => {
    // Save content from the current active mode
    const contentToSave = isHtmlMode ? htmlContent : editor?.getHTML() || '';
    onSave(contentToSave);
    setIsOpen(false);
  };

  const handleHtmlModeToggle = () => {
    setIsHtmlMode(prev => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Text der Kartenrückseite bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeiten Sie den Inhalt mit dem visuellen Editor oder wechseln Sie in den HTML-Modus für volle Kontrolle.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <MenuBar editor={editor} isHtmlMode={isHtmlMode} onHtmlModeToggle={handleHtmlModeToggle} />
          {isHtmlMode ? (
            <Textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="mt-0 h-[250px] rounded-t-none font-mono text-xs"
              aria-label="HTML-Editor"
            />
          ) : (
            <EditorContent editor={editor} />
          )}
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
