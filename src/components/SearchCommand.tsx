import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Type, 
  FileText, 
  BarChart3,
  RotateCcw,
  Search,
  Shield,
  Sparkles,
  Smile
} from "lucide-react";

interface SearchCommandProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const SearchCommand = ({ open, setOpen }: SearchCommandProps) => {
  const navigate = useNavigate();

  const allPages = [
    // Case Conversion
    { name: "Uppercase", path: "/uppercase", category: "Case Conversion", icon: Type },
    { name: "Lowercase", path: "/lowercase", category: "Case Conversion", icon: Type },
    { name: "Title Case", path: "/title-case", category: "Case Conversion", icon: Type },
    { name: "Camel Case", path: "/camel-case", category: "Case Conversion", icon: Type },
    { name: "Snake Case", path: "/snake-case", category: "Case Conversion", icon: Type },
    { name: "Kebab Case", path: "/kebab-case", category: "Case Conversion", icon: Type },
    
    // Text Formatting
    { name: "Trim Whitespace", path: "/trim", category: "Text Formatting", icon: FileText },
    { name: "Remove Extra Spaces", path: "/remove-spaces", category: "Text Formatting", icon: FileText },
    { name: "Remove Blank Lines", path: "/remove-blank-lines", category: "Text Formatting", icon: FileText },
    { name: "Sort Lines", path: "/sort-lines", category: "Text Formatting", icon: FileText },
    { name: "Number Lines", path: "/number-lines", category: "Text Formatting", icon: FileText },
    { name: "Find & Replace", path: "/find-replace", category: "Text Formatting", icon: FileText },
    
    // Conversion Tools
    { name: "JSON Formatter", path: "/json-formatter", category: "Conversion Tools", icon: RotateCcw },
    { name: "XML Formatter", path: "/xml-formatter", category: "Conversion Tools", icon: RotateCcw },
    { name: "HTML Entities", path: "/html-entities", category: "Conversion Tools", icon: RotateCcw },
    { name: "Tabs ↔ Spaces", path: "/tabs-spaces", category: "Conversion Tools", icon: RotateCcw },
    { name: "Newline Converter", path: "/newline-converter", category: "Conversion Tools", icon: RotateCcw },
    
    // Encoding & Encryption
    { name: "Base64", path: "/base64", category: "Encoding & Encryption", icon: Shield },
    { name: "URL Encoder", path: "/url-encoder", category: "Encoding & Encryption", icon: Shield },
    { name: "Caesar Cipher", path: "/caesar-cipher", category: "Encoding & Encryption", icon: Shield },
    { name: "ROT13 / ROT47", path: "/rot13", category: "Encoding & Encryption", icon: Shield },
    { name: "Morse Code", path: "/morse-code", category: "Encoding & Encryption", icon: Shield },
    
    // Statistics
    { name: "Text Statistics", path: "/statistics", category: "Statistics", icon: BarChart3 },
    
    // Generators
    { name: "Lorem Ipsum Generator", path: "/lorem-generator", category: "Generators", icon: Type },
    { name: "Password Generator", path: "/password-generator", category: "Generators", icon: Shield },
    { name: "ASCII Art Generator", path: "/ascii-generator", category: "Generators", icon: Sparkles },
    { name: "QR Code Generator", path: "/qr-generator", category: "Generators", icon: Sparkles },
    { name: "Sample Data Generator", path: "/sample-data-generator", category: "Generators", icon: Sparkles },
    
    // Text Transformations
    { name: "Reverse Text", path: "/reverse-text", category: "Text Transformations", icon: RotateCcw },
    { name: "Mirror Text", path: "/mirror-text", category: "Text Transformations", icon: RotateCcw },
    { name: "Upside Down", path: "/upside-down", category: "Text Transformations", icon: RotateCcw },
    { name: "Leet Speak", path: "/leet-speak", category: "Text Transformations", icon: RotateCcw },
    { name: "Slugify", path: "/slugify", category: "Text Transformations", icon: RotateCcw },
    { name: "Unicode Normalizer", path: "/unicode-normalizer", category: "Text Transformations", icon: RotateCcw },
    
    // Fun & Creative
    { name: "Emoji Picker", path: "/emoji-picker", category: "Fun & Creative", icon: Smile },
  ];

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  // Group pages by category
  const groupedPages = allPages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, typeof allPages>);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search for text transformation tools..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        {Object.entries(groupedPages).map(([category, pages]) => (
          <CommandGroup key={category} heading={category}>
            {pages.map((page) => (
              <CommandItem
                key={page.path}
                value={page.name}
                onSelect={() => handleSelect(page.path)}
                className="flex items-center gap-2"
              >
                <page.icon className="w-4 h-4" />
                <span>{page.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};