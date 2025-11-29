import { TextEditor } from "@/components/TextEditor";

export default function CamelCase() {
  const transform = (text: string): string => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  return (
    <TextEditor
      title="Camel Case"
      description="Convert text to camelCase format. First word lowercase, subsequent words capitalized with no spaces."
      example="hello world example → helloWorldExample"
      transform={transform}
      storageKey="camel-case-transformer"
    />
  );
}