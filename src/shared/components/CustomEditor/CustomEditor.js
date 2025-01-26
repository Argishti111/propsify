import { Editor } from "@tinymce/tinymce-react";
import "./CustomEditor.css";
import React from "react";
React.lazy(() => import("tinymce/icons/default"));

export function CustomEditor({
  editorRef,
  initialValue,
  onChange,
  onLoadContent,
  maxWidth = "auto",
}) {
  return (
    <Editor
      tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
      onLoadContent={onLoadContent}
      onInit={(_, editor) => {
        editorRef.current = editor;
      }}
      initialValue={initialValue}
      onChange={onChange}
      init={{
        height: 500,
        max_width: maxWidth,
        menubar: false,
        force_br_newlines: false,
        force_p_newlines: false,
        font_formats: "Lora",
        plugins: ["link", "image", "table"],
        toolbar:
          "undo redo | styles | " +
          "bold italic backcolor link | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist",
        content_style: "body { font-family: Lora; } p { margin: 0 }",
        image_dimensions: false,
        image_class_list: [
          { title: "Responsive", value: "img-responsive" },
          { title: "Raw", value: "img-raw" },
        ],
        style_formats: [
          {
            title: "Headers",
            items: [
              {
                title: "Header 1",
                format: "h1",
                styles: { fontFamily: "Lora" },
              },
              {
                title: "Header 2",
                format: "h2",
                styles: { fontFamily: "Lora" },
              },
              {
                title: "Header 3",
                format: "h3",
                styles: { fontFamily: "Lora" },
              },
              {
                title: "Header 4",
                format: "h4",
                styles: { fontFamily: "Lora" },
              },
              {
                title: "Header 5",
                format: "h5",
                styles: { fontFamily: "Lora" },
              },
              {
                title: "Header 6",
                format: "h6",
                styles: { fontFamily: "Lora" },
              },
            ],
          },
          {
            title: "Inline",
            items: [
              { title: "Bold", icon: "bold", format: "bold" },
              { title: "Italic", icon: "italic", format: "italic" },
              { title: "Underline", icon: "underline", format: "underline" },
              {
                title: "Strikethrough",
                icon: "strike-through",
                format: "strikethrough",
              },
              {
                title: "Superscript",
                icon: "superscript",
                format: "superscript",
              },
              { title: "Subscript", icon: "subscript", format: "subscript" },
            ],
          },
          {
            title: "Blocks",
            items: [
              {
                title: "Paragraph",
                inline: "span",
                styles: { fontFamily: "Lora" },
              },

              {
                title: "Blockquote",
                format: "blockquote",
                styles: { fontFamily: "Lora" },
              },
              { title: "Div", format: "div", styles: { fontFamily: "Lora" } },
              { title: "Pre", format: "pre", styles: { fontFamily: "Lora" } },
            ],
          },
          {
            title: "Alignment",
            items: [
              { title: "Left", icon: "align-left", format: "alignleft" },
              { title: "Center", icon: "align-center", format: "aligncenter" },
              { title: "Right", icon: "align-right", format: "alignright" },
              {
                title: "Justify",
                icon: "align-justify",
                format: "alignjustify",
              },
            ],
          },
        ],
      }}
    />
  );
}
