import { TextEditor } from "@/components/TextEditor";

const XmlFormatter = () => {
  const xmlFormatter = (text: string): string => {
    if (!text.trim()) return "";
    
    try {
      // Remove whitespace between tags
      const minified = text.replace(/>\s*</g, '><');
      
      // Parse and format XML
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(minified, 'text/xml');
      
      // Check for parsing errors
      const errorNode = xmlDoc.querySelector('parsererror');
      if (errorNode) {
        return `Invalid XML: ${errorNode.textContent || 'Parsing error'}`;
      }
      
      // Format XML with indentation
      const serializer = new XMLSerializer();
      const xmlString = serializer.serializeToString(xmlDoc);
      
      // Add proper indentation
      return formatXmlString(xmlString);
    } catch (error) {
      return `Error formatting XML: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const formatXmlString = (xml: string): string => {
    let formatted = '';
    let indent = 0;
    const tab = '  ';
    
    xml.split(/>\s*</).forEach((node, index) => {
      if (index > 0) {
        node = '<' + node;
      }
      if (index < xml.split(/>\s*</).length - 1) {
        node = node + '>';
      }
      
      const isClosingTag = node.match(/^<\//);
      const isSelfClosing = node.match(/\/>$/);
      const isOpeningTag = !isClosingTag && !isSelfClosing && node.match(/^</);
      
      if (isClosingTag) {
        indent--;
      }
      
      formatted += tab.repeat(Math.max(0, indent)) + node + '\n';
      
      if (isOpeningTag) {
        indent++;
      }
    });
    
    return formatted.trim();
  };

  return (
    <TextEditor
      title="XML Formatter & Minifier"
      description="Format and beautify your XML data with proper indentation and structure validation."
      example='<root><item id="1"><name>Example</name><value>Test</value></item></root>'
      transform={xmlFormatter}
      storageKey="xml-formatter"
    />
  );
};

export default XmlFormatter;