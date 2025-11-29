import { TextEditor } from "@/components/TextEditor";

export default function Uppercase() {
  const transform = (text: string): string => {
    return text.toUpperCase();
  };

  return (
    <TextEditor
      title="Uppercase Text"
      description="Convert all text to uppercase letters. Perfect for headings, constants, and emphasis."
      example="hello world → HELLO WORLD"
      transform={transform}
      storageKey="uppercase-transformer"
    />
  );
}