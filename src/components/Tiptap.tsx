import React, { useDeferredValue, useEffect } from "react";
import { useCurrentEditor, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
//import FontSize from "../extensions/FontSize";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import "./editor.css";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

const lowlight = createLowlight(all);

const MenuBar = ({ value }: { value: any }) => {
  const { editor } = useCurrentEditor();

  if (!editor) return null;

  useEffect(() => {
    if (editor && value) {
      const { from, to } = editor.state.selection;
      editor.commands.setContent(value);
      editor.commands.setContent(value, false, { preserveWhitespace: "full" });
      editor.commands.setTextSelection({ from, to });
    }
  }, [editor, value]);

  return (
    <div className='editor-toolbar'>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
        Underline
      </button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        1. List
      </button>
      <button onClick={() => editor.chain().focus().toggleCode().run()}>
        Inline Code
      </button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        Code Block
      </button>
      <button
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
        }
      >
        Table
      </button>
      <button
        onClick={() =>
          editor
            .chain()
            .focus()
            .setImage({ src: prompt("Image URL") || "" })
            .run()
        }
      >
        Image
      </button>
    </div>
  );
};

const extensions = [
  StarterKit,
  Underline,
  TextStyle,
  CodeBlockLowlight.configure({ lowlight }),
  Image,
  Table.configure({ resizable: true }),
  TableRow,
  TableCell,
  TableHeader,
];

const Tiptap = ({ value, onChange }: Props) => {
  const deferredContentValue = useDeferredValue(value);

  return (
    <EditorProvider
      onUpdate={({ editor }) => onChange(editor.getHTML())}
      slotBefore={<MenuBar value={deferredContentValue} />}
      extensions={extensions}
    />
  );
};

export default Tiptap;
