import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { xmlFormatterFaqs } from "@/data/faq/conversion-tool-faq";
import { FaqType } from "@/types/faq.type";

const XmlFormatter = () => {
  const xmlFormatter = (text: string): string => {
    // Validate
    if (!text.trim()) return "";

    try {
      // Remove whitespace between tags
      const minified = text.replace(/>\s*</g, "><");

      // Parse and format XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(minified, "text/xml");

      // Check for parsing errors
      const errorNode = xmlDoc.querySelector("parsererror");
      if (errorNode) {
        return `Invalid XML: ${errorNode.textContent || "Parsing error"}`;
      }

      // Format XML with indentation
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(xmlDoc);

      // Add proper indentation
      return formatXmlString(xmlString);
    } catch (error) {
      // Error handling
      return `Error formatting XML: ${
        error instanceof Error ? error.message : "Unknown error"
      }`;
    }
  };

  const formatXmlString = (xml: string): string => {
    // Format XML string
    let formatted = "";
    let indent = 0;
    const tab = "  ";

    // Format XML string
    xml.split(/>\s*</).forEach((node, index) => {
      if (index > 0) {
        node = "<" + node;
      }
      if (index < xml.split(/>\s*</).length - 1) {
        node = node + ">";
      }

      // Format XML string
      const isClosingTag = node.match(/^<\//);
      const isSelfClosing = node.match(/\/>$/);
      const isOpeningTag = !isClosingTag && !isSelfClosing && node.match(/^</);

      // Format XML string
      if (isClosingTag) {
        indent--;
      }

      // Format XML string
      formatted += tab.repeat(Math.max(0, indent)) + node + "\n";

      // Format XML string
      if (isOpeningTag) {
        indent++;
      }
    });

    // Return formatted XML string
    return formatted.trim();
  };

  // Get faqs
  const faqs: FaqType[] = xmlFormatterFaqs;

  return (
    <>
      {/* Text Editor */}
      <TextEditor
        title="XML Formatter & Minifier"
        description="Format and beautify your XML data with proper indentation and structure validation."
        example='<root><item id="1"><name>Example</name><value>Test</value></item></root>'
        transform={xmlFormatter}
        storageKey="xml-formatter"
      />
      {/* END Text Editor */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
};

export default XmlFormatter;
