import { TextEditor } from "@/components/TextEditor";

export default function RemoveSpaces() {
  const transform = (text: string): string => {
    return text.replace(/\s+/g, ' ').trim();
  };

  return (
    <TextEditor
      title="Remove Extra Spaces"
      description="Replace multiple consecutive spaces with single spaces throughout the text."
      example="hello    world     example → hello world example"
      transform={transform}
      storageKey="remove-spaces-transformer"
    />
  );
}