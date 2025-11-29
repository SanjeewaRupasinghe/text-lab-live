import { TextEditor } from "@/components/TextEditor";

const TabsSpaces = () => {
  const tabsToSpaces = (text: string): string => {
    if (!text) return "";
    
    // Convert tabs to 4 spaces (common standard)
    return text.replace(/\t/g, '    ');
  };

  const spacesToTabs = (text: string): string => {
    if (!text) return "";
    
    // Convert 4 consecutive spaces at line beginning to tabs
    return text.replace(/^(    )+/gm, (match) => {
      return '\t'.repeat(match.length / 4);
    });
  };

  // For now, we'll default to tabs to spaces. Later we can add toggle buttons
  return (
    <TextEditor
      title="Tabs to Spaces Converter"
      description="Convert tabs to spaces (4 spaces per tab) or spaces to tabs for consistent code formatting."
      example="function example() {\n\treturn 'Hello World';\n}"
      transform={tabsToSpaces}
      storageKey="tabs-spaces"
    />
  );
};

export default TabsSpaces;