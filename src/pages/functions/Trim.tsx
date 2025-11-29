import { TextEditor } from "@/components/TextEditor";

export default function Trim() {
  const transform = (text: string): string => {
    return text
      .split('\n')
      .map(line => line.trim())
      .join('\n')
      .trim();
  };

  return (
    <TextEditor
      title="Trim Whitespace"
      description="Remove leading and trailing whitespace from the entire text and each line."
      example="  hello world  → hello world"
      transform={transform}
      storageKey="trim-transformer"
    />
  );
}