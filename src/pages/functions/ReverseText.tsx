import { TextEditor } from "@/components/TextEditor";

const ReverseText = () => {
  const reverseText = (text: string): string => {
    if (!text) return "";
    
    const lines = text.split('\n');
    return lines.map(line => line.split('').reverse().join('')).join('\n');
  };

  const reverseLines = (text: string): string => {
    if (!text) return "";
    
    const lines = text.split('\n');
    return lines.reverse().join('\n');
  };

  // Default to character reverse, but could be enhanced to support line reverse
  const transform = (text: string): string => {
    return reverseText(text);
  };

  return (
    <TextEditor
      title="Reverse Text"
      description="Reverse the order of characters in your text. Each line is reversed individually while maintaining line breaks."
      example="Hello World → dlroW olleH"
      transform={transform}
      storageKey="reverse-text"
    />
  );
};

export default ReverseText;