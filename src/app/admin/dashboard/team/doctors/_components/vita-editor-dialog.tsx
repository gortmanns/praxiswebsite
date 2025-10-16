
'use client';

import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent, Editor, Mark, Extension } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, List, Minus, Palette, Code2, Underline as UnderlineIcon, Indent, Outdent, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import TextAlign from '@tiptap/extension-text-align';

// Custom Indent Extension
const IndentExtension = Extension.create({
  name: 'indent',

  addOptions() {
    return {
      types: ['paragraph', 'heading', 'listItem'],
      minIndent: 0,
      maxIndent: 10, // 10 * 10px = 100px max indent
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: element => parseInt(element.style.paddingLeft, 10) / 10 || 0,
            renderHTML: attributes => {
              if (!attributes.indent) {
                return {};
              }
              return { style: `padding-left: ${attributes.indent * 10}px` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      increaseIndent: () => ({ tr, dispatch, state }) => {
        const { selection } = tr;
        const { from, to } = selection;
        let changed = false;

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0;
            if (currentIndent < this.options.maxIndent) {
              const newIndent = currentIndent + 1;
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: newIndent });
              changed = true;
            }
          }
        });

        if (dispatch && changed) {
          dispatch(tr);
          return true;
        }
        return false;
      },
      decreaseIndent: () => ({ tr, dispatch, state }) => {
        const { selection } = tr;
        const { from, to } = selection;
        let changed = false;

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0;
            if (currentIndent > this.options.minIndent) {
              const newIndent = currentIndent - 1;
              tr.setNodeMarkup(pos, undefined, { ...node.attrs, indent: newIndent });
              changed = true;
            }
          }
        });
        
        if (dispatch && changed) {
          dispatch(tr);
          return true;
        }
        return false;
      },
    };
  },

   addKeyboardShortcuts() {
    return {
      'Tab': () => this.editor.commands.increaseIndent(),
      'Shift-Tab': () => this.editor.commands.decreaseIndent(),
    }
  },
});


declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    small: {
      toggleSmall: () => ReturnType,
    },
    indent: {
      increaseIndent: () => ReturnType,
      decreaseIndent: () => ReturnType,
    }
  }
}

const Small = Mark.create({
  name: 'small',
  parseHTML() {
    return [{ tag: 'span', getAttrs: node => (node as HTMLElement).classList.contains('is-small') && null }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', { ...HTMLAttributes, class: 'is-small' }, 0];
  },
  addCommands() {
    return { toggleSmall: () => ({ commands }) => commands.toggleMark(this.name) };
  },
});

const MenuBar = ({ editor, isHtmlMode, onHtmlModeToggle }: { editor: Editor | null; isHtmlMode: boolean; onHtmlModeToggle: () => void; }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-input border-b-0 bg-transparent p-1">
      {/* Group 1: Style */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 px-2" disabled={isHtmlMode} title="Schriftgrösse">
                Schriftgrösse
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                Normal
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleSmall().run()}>
                Klein
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-1.5" disabled={isHtmlMode} title="Textfarbe">
                <Palette className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem onClick={() => editor.chain().focus().unsetColor().run()}>
                Weiss
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
      
      {/* Group 2.5: Alignment */}
       <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'left' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
        disabled={isHtmlMode}
        title="Linksbündig"
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>
       <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'center' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
        disabled={isHtmlMode}
        title="Zentriert"
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'right' })}
        onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
        disabled={isHtmlMode}
        title="Rechtsbündig"
      >
        <AlignRight className="h-4 w-4" />
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
        variant="ghost"
        size="sm"
        onClick={() => editor.commands.increaseIndent()}
        disabled={isHtmlMode}
        className="h-8 w-8 p-1.5"
        title="Einrücken"
      >
        <Indent className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.commands.decreaseIndent()}
        disabled={isHtmlMode}
        className="h-8 w-8 p-1.5"
        title="Ausrücken"
      >
        <Outdent className="h-4 w-4" />
      </Button>

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
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  initialValue: string;
  onSave: (value: string) => void;
}

export const VitaEditorDialog: React.FC<VitaEditorDialogProps> = ({ isOpen, onOpenChange, initialValue, onSave }) => {
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
      Color.configure({ types: ['textStyle'] }),
      Small,
      IndentExtension,
      TextAlign.configure({
        types: ['paragraph', 'heading'],
      }),
    ],
    content: initialValue,
    editorProps: {
      attributes: {
        class: cn('prose prose-sm dark:prose-invert max-w-none focus:outline-none rounded-b-md border border-input border-t-0 p-4 min-h-[250px] bg-accent/95 text-background'),
      },
    },
  });

  useEffect(() => {
    if (isOpen) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(initialValue, 'text/html');
        const contentDiv = doc.querySelector('.vita-content');
        const content = contentDiv ? contentDiv.innerHTML : initialValue;

        setHtmlContent(content);
        if (editor && !editor.isDestroyed) {
            editor.commands.setContent(content, false);
        }
    }
  }, [isOpen, initialValue, editor]);

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;
    if (isHtmlMode) {
      setHtmlContent(editor.getHTML());
    } else {
      if (editor.getHTML() !== htmlContent) {
        editor.commands.setContent(htmlContent, false);
      }
    }
  }, [isHtmlMode, editor, htmlContent]);


  const handleSave = () => {
    const contentToSave = isHtmlMode ? htmlContent : editor?.getHTML() || '';
    onSave(contentToSave);
    onOpenChange(false);
  };

  const handleHtmlModeToggle = () => {
    setIsHtmlMode(prev => !prev);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
          <Button onClick={handleSave}>Übernehmen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
