import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { jsonFormatterFaqs } from "@/data/faq/conversion-tool-faq";
import { FaqType } from "@/types/faq.type";

const JsonFormatter = () => {
  const jsonFormatter = (text: string): string => {
    // Validate
    if (!text.trim()) return "";

    try {
      // First try to parse as JSON
      const parsed = JSON.parse(text);
      // Return formatted JSON with 2 spaces indentation
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      return `Invalid JSON: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
    }
  };

  // Get faqs
  const faqs: FaqType[] = jsonFormatterFaqs;

  return (
    <>
      {/* Text Editor */}
      <TextEditor
        title="JSON Formatter & Validator"
        description="Format, validate, and beautify your JSON data with proper indentation and syntax highlighting."
        example=""
        transform={jsonFormatter}
        storageKey="json-formatter"
      />
      {/* END Text Editor */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
};

export default JsonFormatter;
