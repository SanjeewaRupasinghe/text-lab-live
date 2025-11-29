import { TextEditor } from "@/components/TextEditor";

const HtmlEntities = () => {
  const encodeHtmlEntities = (text: string): string => {
    if (!text) return "";
    
    const entityMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    };
    
    return text.replace(/[&<>"'`=\/]/g, (char) => entityMap[char]);
  };

  const decodeHtmlEntities = (text: string): string => {
    if (!text) return "";
    
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  // For now, we'll default to encoding. Later we can add toggle buttons
  return (
    <TextEditor
      title="HTML Entities Encoder"
      description="Convert special characters to HTML entities and vice versa. Useful for displaying HTML code safely."
      example='<div class="example">Hello & welcome to "my" site</div>'
      transform={encodeHtmlEntities}
      storageKey="html-entities"
    />
  );
};

export default HtmlEntities;