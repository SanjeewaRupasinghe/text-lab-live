import { TextEditor } from "@/components/TextEditor";

const JsonFormatter = () => {
  const jsonFormatter = (text: string): string => {
    if (!text.trim()) return "";
    
    try {
      // First try to parse as JSON
      const parsed = JSON.parse(text);
      // Return formatted JSON with 2 spaces indentation
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const jsonMinifier = (text: string): string => {
    if (!text.trim()) return "";
    
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed);
    } catch (error) {
      return `Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  // For now, we'll default to formatter. Later we can add toggle buttons
  return (
    <TextEditor
      title="JSON Formatter & Validator"
      description="Format, validate, and beautify your JSON data with proper indentation and syntax highlighting."
      example='{"name":"John","age":30,"city":"New York"}'
      transform={jsonFormatter}
      storageKey="json-formatter"
    />
  );
};

export default JsonFormatter;