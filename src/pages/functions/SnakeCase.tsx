import { TextEditor } from "@/components/TextEditor";

export default function SnakeCase() {
  const transform = (text: string): string => {
    return text
      .replace(/\W+/g, ' ')
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
  };

  return (
    <TextEditor
      title="Snake Case"
      description="Convert text to snake_case format. All lowercase with underscores replacing spaces."
      example="Hello World Example → hello_world_example"
      transform={transform}
      storageKey="snake-case-transformer"
    />
  );
}