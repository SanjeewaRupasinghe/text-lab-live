import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Maximize,
  Minimize,
  Save,
  FileText,
  Code,
  FileImage,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Link as LinkIcon,
  Image as ImageIcon,
  Table,
  Smile,
  FilePlus,
  Star,
  StarOff,
  Search,
  Tag,
  X,
  ChevronDown,
  ChevronRight,
  FileIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FAQ } from "@/components/FAQ";
import { markdownEditorFaqs } from "@/data/faq/conversion-tool-faq";
import { FaqType } from "@/types/faq.type";

interface MarkdownFile {
  id: string;
  name: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  lastModified: Date;
}

const TAG_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
];

const TEMPLATES = {
  "Blog Post": `# Blog Post Title

## Introduction
Write your introduction here...

## Main Content
Your main content goes here...

## Conclusion
Wrap up your thoughts...`,

  Documentation: `# Project Documentation

## Overview
Brief overview of the project...

## Installation
\`\`\`bash
npm install package-name
\`\`\`

## Usage
Example usage...

## API Reference
### Method Name
Description and parameters...`,

  "Meeting Notes": `# Meeting Notes - [Date]

**Attendees:** 
- Person 1
- Person 2

## Agenda
1. Topic 1
2. Topic 2

## Discussion Points
- Point 1
- Point 2

## Action Items
- [ ] Task 1
- [ ] Task 2`,

  README: `# Project Name

## Description
A brief description of your project...

## Features
- Feature 1
- Feature 2

## Installation
\`\`\`bash
git clone repository-url
cd project-name
npm install
\`\`\`

## Usage
\`\`\`bash
npm start
\`\`\`

## Contributing
Pull requests are welcome!

## License
MIT`,
};

const MarkdownEditor = () => {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTagInput, setNewTagInput] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["favorites", "all-files"])
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  const autoSaveTimerRef = useRef<NodeJS.Timeout>();

  const emojis = [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
    "😋",
    "😛",
    "😝",
    "😜",
    "🤪",
    "🤨",
    "🧐",
    "🤓",
    "😎",
    "🤩",
    "🥳",
    "😏",
    "😒",
    "😞",
    "😔",
    "😟",
    "😕",
    "🙁",
    "☹️",
    "😣",
    "😖",
    "😫",
    "😩",
    "🥺",
    "😢",
    "😭",
    "😤",
    "😠",
    "😡",
    "🤬",
    "🤯",
    "😳",
    "🥵",
    "🥶",
    "😱",
    "😨",
    "😰",
    "😥",
    "😓",
    "🤗",
    "🤔",
    "🤭",
    "🤫",
    "🤥",
    "😶",
    "😐",
    "😑",
    "😬",
    "🙄",
    "😯",
    "😦",
    "😧",
    "😮",
    "😲",
    "🥱",
    "😴",
    "🤤",
    "😪",
    "😵",
    "🤐",
    "🥴",
    "🤢",
    "🤮",
    "🤧",
    "😷",
    "🤒",
    "🤕",
    "🤑",
    "🤠",
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "👇",
    "☝️",
    "👏",
    "🙌",
    "👐",
    "🤲",
    "🤝",
    "🙏",
    "💪",
    "🦾",
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
    "☮️",
    "✝️",
    "☪️",
    "🕉️",
    "☸️",
    "✡️",
    "🔯",
    "🕎",
    "☯️",
    "☦️",
    "🛐",
    "⚛️",
    "🌟",
    "⭐",
    "✨",
    "💫",
    "🌠",
    "🔥",
    "💥",
    "☄️",
    "🌈",
    "☀️",
    "🌤️",
    "⛅",
    "🌥️",
    "☁️",
    "🌦️",
    "🌧️",
    "⛈️",
    "🌩️",
    "🌨️",
    "❄️",
    "☃️",
    "⛄",
    "🌬️",
    "💨",
    "🌪️",
    "🌫️",
    "🌊",
    "💧",
    "💦",
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🥎",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥅",
    "🎯",
  ];

  const currentFile = files.find((f) => f.id === currentFileId);
  const markdown = currentFile?.content || "";

  // Get faqs
  const faqs: FaqType[] = markdownEditorFaqs;

  // Load files from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem("markdown-editor-files");
    if (savedFiles) {
      const parsed = JSON.parse(savedFiles);
      const filesWithDates = parsed.map((f: any) => ({
        ...f,
        lastModified: new Date(f.lastModified),
      }));
      setFiles(filesWithDates);
      if (filesWithDates.length > 0) {
        setCurrentFileId(filesWithDates[0].id);
      }
    } else {
      // Create initial file
      const initialFile: MarkdownFile = {
        id: Date.now().toString(),
        name: "Untitled.md",
        content: "# Welcome to Markdown Editor\n\nStart writing...",
        tags: [],
        isFavorite: false,
        lastModified: new Date(),
      };
      setFiles([initialFile]);
      setCurrentFileId(initialFile.id);
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    if (currentFile && markdown) {
      autoSaveTimerRef.current = setTimeout(() => {
        handleAutoSave();
      }, 30000);
    }

    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, [markdown, currentFileId]);

  const saveFiles = (updatedFiles: MarkdownFile[]) => {
    localStorage.setItem("markdown-editor-files", JSON.stringify(updatedFiles));
    setFiles(updatedFiles);
  };

  const handleAutoSave = () => {
    if (currentFile) {
      const updatedFiles = files.map((f) =>
        f.id === currentFileId
          ? { ...f, content: markdown, lastModified: new Date() }
          : f
      );
      saveFiles(updatedFiles);
      toast({
        title: "Auto-saved",
        description: `${currentFile.name} saved automatically`,
      });
    }
  };

  const handleManualSave = () => {
    if (currentFile) {
      const updatedFiles = files.map((f) =>
        f.id === currentFileId
          ? { ...f, content: markdown, lastModified: new Date() }
          : f
      );
      saveFiles(updatedFiles);
      toast({
        title: "Saved",
        description: `${currentFile.name} saved successfully`,
      });
    }
  };

  const updateMarkdown = (newContent: string) => {
    if (currentFile) {
      const updatedFiles = files.map((f) =>
        f.id === currentFileId ? { ...f, content: newContent } : f
      );
      setFiles(updatedFiles);
    }
  };

  const createNewFile = (template?: string) => {
    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      name: `Untitled-${files.length + 1}.md`,
      content: template || "# New Document\n\nStart writing...",
      tags: [],
      isFavorite: false,
      lastModified: new Date(),
    };
    const updatedFiles = [...files, newFile];
    saveFiles(updatedFiles);
    setCurrentFileId(newFile.id);
    toast({
      title: "File created",
      description: newFile.name,
    });
  };

  const renameFile = (id: string, newName: string) => {
    const updatedFiles = files.map((f) =>
      f.id === id
        ? { ...f, name: newName.endsWith(".md") ? newName : `${newName}.md` }
        : f
    );
    saveFiles(updatedFiles);
  };

  const deleteFile = (id: string) => {
    const updatedFiles = files.filter((f) => f.id !== id);
    saveFiles(updatedFiles);
    if (currentFileId === id && updatedFiles.length > 0) {
      setCurrentFileId(updatedFiles[0].id);
    }
    toast({
      title: "File deleted",
    });
  };

  const toggleFavorite = (id: string) => {
    const updatedFiles = files.map((f) =>
      f.id === id ? { ...f, isFavorite: !f.isFavorite } : f
    );
    saveFiles(updatedFiles);
  };

  const addTag = (id: string, tag: string) => {
    if (!tag.trim()) return;
    const updatedFiles = files.map((f) =>
      f.id === id && !f.tags.includes(tag)
        ? { ...f, tags: [...f.tags, tag.trim()] }
        : f
    );
    saveFiles(updatedFiles);
    setNewTagInput("");
  };

  const removeTag = (id: string, tag: string) => {
    const updatedFiles = files.map((f) =>
      f.id === id ? { ...f, tags: f.tags.filter((t) => t !== tag) } : f
    );
    saveFiles(updatedFiles);
  };

  const getTagColor = (tag: string) => {
    const index = tag
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return TAG_COLORS[index % TAG_COLORS.length];
  };

  const filteredFiles = files.filter((file) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      file.name.toLowerCase().includes(query) ||
      file.content.toLowerCase().includes(query) ||
      file.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  const favoriteFiles = filteredFiles.filter((f) => f.isFavorite);
  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const exportMarkdown = () => {
    if (!currentFile) return;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = currentFile.name;
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported",
      description: `${currentFile.name} downloaded`,
    });
  };

  const exportHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Document</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
    pre { background: #f4f4f4; padding: 10px; border-radius: 5px; overflow-x: auto; }
    code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }
    blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 20px; color: #666; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f4f4f4; }
    img { max-width: 100%; height: auto; }
  </style>
</head>
<body>
  ${previewRef.current?.innerHTML || ""}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported",
      description: "HTML file downloaded successfully",
    });
  };

  const exportPDF = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF("p", "mm", "a4");
      let position = 0;

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("document.pdf");
      toast({
        title: "Exported",
        description: "PDF file downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not export to PDF",
        variant: "destructive",
      });
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const insertMarkdown = (
    before: string,
    after: string = "",
    placeholder: string = "text"
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end) || placeholder;
    const newText =
      markdown.substring(0, start) +
      before +
      selectedText +
      after +
      markdown.substring(end);

    updateMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText =
      markdown.substring(0, start) + text + markdown.substring(end);

    updateMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      const newPosition = start + text.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          insertMarkdown("**", "**", "bold");
          break;
        case "i":
          e.preventDefault();
          insertMarkdown("*", "*", "italic");
          break;
        case "k":
          e.preventDefault();
          insertMarkdown("[", "](url)", "link text");
          break;
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          const imageName = file.name;
          insertAtCursor(`![${imageName}](${imageUrl})\n`);
        };
        reader.readAsDataURL(file);
      });

      toast({
        title: "Images added",
        description: `${imageFiles.length} image(s) inserted as markdown`,
      });
    }
  };

  const generateTable = () => {
    let table = "\n";
    const headers = Array(tableCols)
      .fill(0)
      .map((_, i) => `Header ${i + 1}`)
      .join(" | ");
    const separator = Array(tableCols)
      .fill(0)
      .map(() => "---")
      .join(" | ");

    table += `| ${headers} |\n`;
    table += `| ${separator} |\n`;

    for (let i = 0; i < tableRows; i++) {
      const row = Array(tableCols)
        .fill(0)
        .map((_, j) => `Cell ${i + 1},${j + 1}`)
        .join(" | ");
      table += `| ${row} |\n`;
    }

    insertAtCursor(table);
    toast({
      title: "Table inserted",
      description: `${tableRows}x${tableCols} table added to your markdown`,
    });
  };

  const insertCodeBlock = (language: string) => {
    insertAtCursor(`\n\`\`\`${language}\n// Your code here\n\`\`\`\n`);
  };

  const formatLastModified = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return `${seconds}s ago`;
  };

  return (
    <div
      className={`flex ${
        isFullScreen
          ? "fixed inset-0 z-50 bg-background"
          : "h-[calc(100vh-4rem)]"
      }`}
    >
      {/* File Browser Sidebar */}
      {showSidebar && !isFullScreen && (
        <div className="w-64 border-r bg-muted/30 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Files</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <FilePlus className="w-4 h-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>New File</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Button onClick={() => createNewFile()} className="w-full">
                      Blank File
                    </Button>
                    <Separator />
                    <p className="text-sm font-medium">Templates</p>
                    {Object.entries(TEMPLATES).map(([name, content]) => (
                      <Button
                        key={name}
                        variant="outline"
                        onClick={() => createNewFile(content)}
                        className="w-full"
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {/* Favorites Section */}
            {favoriteFiles.length > 0 && (
              <div className="p-2">
                <button
                  onClick={() => toggleSection("favorites")}
                  className="flex items-center gap-1 w-full px-2 py-1.5 hover:bg-muted rounded text-sm font-medium"
                >
                  {expandedSections.has("favorites") ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  <Star className="w-4 h-4" />
                  Favorites
                </button>
                {expandedSections.has("favorites") && (
                  <div className="ml-2 mt-1 space-y-1">
                    {favoriteFiles.map((file) => (
                      <button
                        key={file.id}
                        onClick={() => setCurrentFileId(file.id)}
                        className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-muted ${
                          currentFileId === file.id ? "bg-primary/10" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="truncate">{file.name}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(file.id);
                            }}
                          >
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* All Files Section */}
            <div className="p-2">
              <button
                onClick={() => toggleSection("all-files")}
                className="flex items-center gap-1 w-full px-2 py-1.5 hover:bg-muted rounded text-sm font-medium"
              >
                {expandedSections.has("all-files") ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <FileIcon className="w-4 h-4" />
                All Files
              </button>
              {expandedSections.has("all-files") && (
                <div className="ml-2 mt-1 space-y-1">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`group relative px-3 py-2 rounded text-sm hover:bg-muted ${
                        currentFileId === file.id ? "bg-primary/10" : ""
                      }`}
                    >
                      <button
                        onClick={() => setCurrentFileId(file.id)}
                        className="w-full text-left"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="truncate font-medium">
                            {file.name}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(file.id);
                            }}
                          >
                            {file.isFavorite ? (
                              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            ) : (
                              <StarOff className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formatLastModified(file.lastModified)}
                        </p>
                        {file.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {file.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className={`text-xs ${getTagColor(
                                  tag
                                )} text-white`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {!isFullScreen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSidebar(!showSidebar)}
                >
                  {showSidebar ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>
              )}
              <div>
                <input
                  type="text"
                  value={currentFile?.name || ""}
                  onChange={(e) =>
                    currentFile && renameFile(currentFile.id, e.target.value)
                  }
                  className="text-xl font-bold bg-transparent border-none outline-none focus:ring-1 focus:ring-primary rounded px-2"
                />
                <p className="text-sm text-muted-foreground px-2">
                  {currentFile &&
                    `Modified: ${formatLastModified(currentFile.lastModified)}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentFile && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Tag className="w-4 h-4 mr-2" />
                      Tags
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Manage Tags</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="New tag..."
                          value={newTagInput}
                          onChange={(e) => setNewTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              addTag(currentFile.id, newTagInput);
                            }
                          }}
                        />
                        <Button
                          onClick={() => addTag(currentFile.id, newTagInput)}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentFile.tags.map((tag) => (
                          <Badge
                            key={tag}
                            className={`${getTagColor(tag)} text-white`}
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(currentFile.id, tag)}
                              className="ml-2"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button variant="outline" size="sm" onClick={handleManualSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={exportMarkdown}>
                <FileText className="w-4 h-4 mr-2" />
                .MD
              </Button>
              <Button variant="outline" size="sm" onClick={exportHTML}>
                <Code className="w-4 h-4 mr-2" />
                HTML
              </Button>
              <Button variant="outline" size="sm" onClick={exportPDF}>
                <FileImage className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullScreen}>
                {isFullScreen ? (
                  <Minimize className="w-4 h-4" />
                ) : (
                  <Maximize className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div className="border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-1 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("**", "**", "bold")}
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("*", "*", "italic")}
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("# ", "", "Heading 1")}
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("## ", "", "Heading 2")}
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("### ", "", "Heading 3")}
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("- ", "", "List item")}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("1. ", "", "List item")}
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("> ", "", "Quote")}
              title="Blockquote"
            >
              <Quote className="w-4 h-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("`", "`", "code")}
              title="Inline Code"
            >
              <Code2 className="w-4 h-4" />
            </Button>

            <Select onValueChange={insertCodeBlock}>
              <SelectTrigger className="w-[130px] h-8">
                <Code className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Code block" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="typescript">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="csharp">C#</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem value="php">PHP</SelectItem>
                <SelectItem value="ruby">Ruby</SelectItem>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="sql">SQL</SelectItem>
                <SelectItem value="bash">Bash</SelectItem>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="yaml">YAML</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-6 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("[", "](url)", "link text")}
              title="Link (Ctrl+K)"
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => insertMarkdown("![alt text](", ")", "image-url")}
              title="Image"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" title="Insert Table">
                  <Table className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Insert Table</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rows">Rows</Label>
                      <Input
                        id="rows"
                        type="number"
                        min="1"
                        max="20"
                        value={tableRows}
                        onChange={(e) =>
                          setTableRows(parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="cols">Columns</Label>
                      <Input
                        id="cols"
                        type="number"
                        min="1"
                        max="10"
                        value={tableCols}
                        onChange={(e) =>
                          setTableCols(parseInt(e.target.value) || 1)
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={generateTable}>Insert Table</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" title="Insert Emoji">
                  <Smile className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Pick an Emoji</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-8 gap-2 max-h-[400px] overflow-y-auto p-2">
                  {emojis.map((emoji, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      size="sm"
                      className="text-2xl p-2 h-auto"
                      onClick={() => {
                        insertAtCursor(emoji);
                        setShowEmojiPicker(false);
                      }}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Split View */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col">
                <div className="bg-muted/50 px-4 py-2 border-b">
                  <h2 className="text-sm font-semibold">Editor</h2>
                </div>
                <Textarea
                  ref={textareaRef}
                  value={markdown}
                  onChange={(e) => updateMarkdown(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  placeholder="# Start writing markdown here...

## Features
- Live preview
- Auto-save every 30 seconds
- Export to .md, HTML, and PDF

**Bold text** and *italic text*

> This is a quote

```javascript
const code = 'syntax highlighted';
```

[Link example](https://example.com)
"
                  className="flex-1 resize-none rounded-none border-0 focus-visible:ring-0 font-mono text-sm"
                />
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full flex flex-col overflow-hidden">
                <div className="bg-muted/50 px-4 py-2 border-b">
                  <h2 className="text-sm font-semibold">Preview</h2>
                </div>
                <div
                  ref={previewRef}
                  className="flex-1 overflow-auto p-6 prose prose-slate dark:prose-invert max-w-none"
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={{
                      code: ({
                        node,
                        inline,
                        className,
                        children,
                        ...props
                      }: any) => {
                        return inline ? (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                            <code className={className} {...props}>
                              {children}
                            </code>
                          </pre>
                        );
                      },
                    }}
                  >
                    {markdown ||
                      "*Nothing to preview yet. Start typing in the editor!*"}
                  </ReactMarkdown>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* FAQ Section */}
        {!isFullScreen && (
          <div className="border-t p-4">
            <FAQ faqs={faqs} />
          </div>
        )}
        {/* END FAQ Section */}
      </div>
    </div>
  );
};

export default MarkdownEditor;
