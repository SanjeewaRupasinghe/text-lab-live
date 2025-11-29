import { TextEditor } from "@/components/TextEditor";

export default function KebabCase() {
  const transform = (text: string): string => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('-');
  };

  return (
    <TextEditor
      title="Kebab Case"
      description="Convert text to kebab-case format. All lowercase with hyphens replacing spaces."
      example="Hello World Example → hello-world-example"
      transform={transform}
      storageKey="kebab-case-transformer"
    />
  );
}