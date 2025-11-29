import { TextEditor } from "@/components/TextEditor";

const NewlineConverter = () => {
  const convertToUnix = (text: string): string => {
    if (!text) return "";
    
    // Convert Windows (CRLF) and Mac (CR) to Unix (LF)
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  };

  const convertToWindows = (text: string): string => {
    if (!text) return "";
    
    // First normalize to Unix, then convert to Windows
    const unix = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    return unix.replace(/\n/g, '\r\n');
  };

  const convertToMac = (text: string): string => {
    if (!text) return "";
    
    // First normalize to Unix, then convert to Mac
    const unix = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    return unix.replace(/\n/g, '\r');
  };

  // For now, we'll default to Unix conversion. Later we can add toggle buttons
  return (
    <TextEditor
      title="Newline Converter"
      description="Convert between different newline formats: Unix (LF), Windows (CRLF), and Mac (CR)."
      example="Line 1\r\nLine 2\r\nLine 3"
      transform={convertToUnix}
      storageKey="newline-converter"
    />
  );
};

export default NewlineConverter;