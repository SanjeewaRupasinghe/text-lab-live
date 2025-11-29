import { TextEditor } from "@/components/TextEditor";

export default function Lowercase() {
  const transform = (text: string): string => {
    return text.toLowerCase();
  };

  return (
    <TextEditor
      title="Lowercase Text"
      description="Convert all text to lowercase letters. Useful for normalizing input or creating consistent formatting."
      example="HELLO WORLD → hello world"
      transform={transform}
      storageKey="lowercase-transformer"
    />
  );
}