import { TextEditor } from "@/components/TextEditor";

const Slugify = () => {
  const slugify = (text: string): string => {
    if (!text) return "";
    
    return text
      .toString()
      .toLowerCase()
      .trim()
      // Remove accents, diacritics, and special characters
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      // Replace spaces and non-alphanumeric characters with hyphens
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      // Remove multiple consecutive hyphens
      .replace(/-+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '');
  };

  return (
    <TextEditor
      title="Slugify"
      description="Convert text to URL-safe slugs by removing special characters, converting to lowercase, and replacing spaces with hyphens."
      example="Hello World! → hello-world"
      transform={slugify}
      storageKey="slugify"
    />
  );
};

export default Slugify;