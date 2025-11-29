import { TextEditor } from "@/components/TextEditor";

export default function TitleCase() {
  const transform = (text: string): string => {
    return text.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  return (
    <TextEditor
      title="Title Case"
      description="Capitalize the first letter of each word. Perfect for titles, headings, and proper nouns."
      example="hello world example → Hello World Example"
      transform={transform}
      storageKey="title-case-transformer"
    />
  );
}