import { TextEditor } from "@/components/TextEditor";

export default function RemoveBlankLines() {
  const transform = (text: string): string => {
    return text
      .split('\n')
      .filter(line => line.trim().length > 0)
      .join('\n');
  };

  return (
    <TextEditor
      title="Remove Blank Lines"
      description="Remove all empty lines and lines containing only whitespace characters."
      example="line 1\n\nline 2\n   \nline 3 → line 1\nline 2\nline 3"
      transform={transform}
      storageKey="remove-blank-lines-transformer"
    />
  );
}