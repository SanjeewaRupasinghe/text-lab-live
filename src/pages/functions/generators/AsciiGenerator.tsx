import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw, Sparkles, Star, StarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { asciiGeneratorFaqs } from "@/data/faq/generator-faq";
import { FAQ } from "@/components/FAQ";
import { copyToClipboard, toggleBookmark } from "@/lib/textEditorUtils";
import { FaqType } from "@/types/faq.type";

// ASCII Art Font Mappings (simplified versions)
const ASCII_FONTS = {
  block: {
    A: ["█████", "█   █", "█████", "█   █", "█   █"],
    B: ["█████", "█   █", "█████", "█   █", "█████"],
    C: ["█████", "█    ", "█    ", "█    ", "█████"],
    D: ["████ ", "█   █", "█   █", "█   █", "████ "],
    E: ["█████", "█    ", "████ ", "█    ", "█████"],
    F: ["█████", "█    ", "████ ", "█    ", "█    "],
    G: ["█████", "█    ", "█ ███", "█   █", "█████"],
    H: ["█   █", "█   █", "█████", "█   █", "█   █"],
    I: ["█████", "  █  ", "  █  ", "  █  ", "█████"],
    J: ["█████", "    █", "    █", "█   █", "█████"],
    K: ["█   █", "█  █ ", "███  ", "█  █ ", "█   █"],
    L: ["█    ", "█    ", "█    ", "█    ", "█████"],
    M: ["█   █", "██ ██", "█ █ █", "█   █", "█   █"],
    N: ["█   █", "██  █", "█ █ █", "█  ██", "█   █"],
    O: ["█████", "█   █", "█   █", "█   █", "█████"],
    P: ["█████", "█   █", "█████", "█    ", "█    "],
    Q: ["█████", "█   █", "█ █ █", "█  █ ", "████ "],
    R: ["█████", "█   █", "█████", "█  █ ", "█   █"],
    S: ["█████", "█    ", "█████", "    █", "█████"],
    T: ["█████", "  █  ", "  █  ", "  █  ", "  █  "],
    U: ["█   █", "█   █", "█   █", "█   █", "█████"],
    V: ["█   █", "█   █", "█   █", " █ █ ", "  █  "],
    W: ["█   █", "█   █", "█ █ █", "██ ██", "█   █"],
    X: ["█   █", " █ █ ", "  █  ", " █ █ ", "█   █"],
    Y: ["█   █", " █ █ ", "  █  ", "  █  ", "  █  "],
    Z: ["█████", "   █ ", "  █  ", " █   ", "█████"],
    " ": ["     ", "     ", "     ", "     ", "     "],
    "0": ["█████", "█   █", "█   █", "█   █", "█████"],
    "1": ["  █  ", " ██  ", "  █  ", "  █  ", "█████"],
    "2": ["█████", "    █", "█████", "█    ", "█████"],
    "3": ["█████", "    █", "█████", "    █", "█████"],
    "4": ["█   █", "█   █", "█████", "    █", "    █"],
    "5": ["█████", "█    ", "█████", "    █", "█████"],
    "6": ["█████", "█    ", "█████", "█   █", "█████"],
    "7": ["█████", "    █", "    █", "    █", "    █"],
    "8": ["█████", "█   █", "█████", "█   █", "█████"],
    "9": ["█████", "█   █", "█████", "    █", "█████"],
  },

  simple: {
    A: [" ▄▀█ ", "█▀▀█ ", "█▄▄█ ", "▀  █ ", "   █ "],
    B: ["█▀▀▄ ", "█▀▀▄ ", "█▄▄▀ ", "█▀▀▄ ", "▀▀▀  "],
    C: [" ▄▀█▄", "█   ▀", "█    ", "█   ▄", " ▀█▀ "],
    H: ["█   █", "█▀▀▀█", "█   █", "█   █", "▀   ▀"],
    E: ["█▀▀▀▀", "█▀▀▀ ", "█▀▀▀ ", "█▄▄▄▄", "▀▀▀▀▀"],
    L: ["█    ", "█    ", "█    ", "█▄▄▄▄", "▀▀▀▀▀"],
    O: [" ▄▀█▄", "█   █", "█   █", "█▄▄▄█", " ▀▀▀ "],
    " ": ["     ", "     ", "     ", "     ", "     "],
  },
};

const BOX_CHARS = {
  light: { h: "─", v: "│", tl: "┌", tr: "┐", bl: "└", br: "┘" },
  heavy: { h: "━", v: "┃", tl: "┏", tr: "┓", bl: "┗", br: "┛" },
  double: { h: "═", v: "║", tl: "╔", tr: "╗", bl: "╚", br: "╝" },
  rounded: { h: "─", v: "│", tl: "╭", tr: "╮", bl: "╰", br: "╯" },
};

export default function AsciiGenerator() {
  // State
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("text");
  const [font, setFont] = useState("block");
  const [boxStyle, setBoxStyle] = useState("light");
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Generate ASCII
  const generateAsciiText = (text: string, fontName: string) => {
    const font = ASCII_FONTS[fontName as keyof typeof ASCII_FONTS];
    if (!font || !text) return "";

    const lines = ["", "", "", "", ""];

    for (const char of text.toUpperCase()) {
      const charLines = font[char as keyof typeof font] || font[" "];
      if (charLines) {
        for (let i = 0; i < 5; i++) {
          lines[i] += charLines[i] + " ";
        }
      }
    }

    return lines.join("\n");
  };

  // Generate Box
  const generateBox = (text: string, style: string) => {
    // Validate
    if (!text) return "";

    const chars = BOX_CHARS[style as keyof typeof BOX_CHARS];
    const lines = text.split("\n");
    const maxLength = Math.max(...lines.map((line) => line.length));

    let result = "";

    // Top border
    result += chars.tl + chars.h.repeat(maxLength + 2) + chars.tr + "\n";

    // Content with side borders
    for (const line of lines) {
      result +=
        chars.v + " " + line.padEnd(maxLength, " ") + " " + chars.v + "\n";
    }

    // Bottom border
    result += chars.bl + chars.h.repeat(maxLength + 2) + chars.br;

    return result;
  };

  // Generate Table
  const generateTable = (text: string, style: string) => {
    if (!text) return "";

    const chars = BOX_CHARS[style as keyof typeof BOX_CHARS];
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length === 0) return "";

    // Assume first line is headers, split by common delimiters
    const headers = lines[0].split(/[,|\t]/).map((h) => h.trim());
    const rows = lines
      .slice(1)
      .map((line) => line.split(/[,|\t]/).map((cell) => cell.trim()));

    // Calculate column widths
    const colWidths = headers.map((header, i) => {
      const maxCellWidth = Math.max(
        ...rows.map((row) => (row[i] || "").length)
      );
      return Math.max(header.length, maxCellWidth);
    });

    let result = "";

    // Top border
    result += chars.tl;
    for (let i = 0; i < colWidths.length; i++) {
      result += chars.h.repeat(colWidths[i] + 2);
      if (i < colWidths.length - 1) result += "┬";
    }
    result += chars.tr + "\n";

    // Header row
    result += chars.v;
    headers.forEach((header, i) => {
      result += " " + header.padEnd(colWidths[i]) + " ";
      if (i < headers.length - 1) result += chars.v;
    });
    result += chars.v + "\n";

    // Header separator
    result += "├";
    for (let i = 0; i < colWidths.length; i++) {
      result += chars.h.repeat(colWidths[i] + 2);
      if (i < colWidths.length - 1) result += "┼";
    }
    result += "┤\n";

    // Data rows
    rows.forEach((row) => {
      result += chars.v;
      colWidths.forEach((width, i) => {
        const cell = row[i] || "";
        result += " " + cell.padEnd(width) + " ";
        if (i < colWidths.length - 1) result += chars.v;
      });
      result += chars.v + "\n";
    });

    // Bottom border
    result += chars.bl;
    for (let i = 0; i < colWidths.length; i++) {
      result += chars.h.repeat(colWidths[i] + 2);
      if (i < colWidths.length - 1) result += "┴";
    }
    result += chars.br;

    return result;
  };

  // Generate Banner
  const generateBanner = (text: string) => {
    if (!text) return "";

    const lines = text.split("\n");
    const maxLength = Math.max(...lines.map((line) => line.length));

    let result = "";
    result += "╔" + "═".repeat(maxLength + 4) + "╗\n";
    result += "║" + " ".repeat(maxLength + 4) + "║\n";

    for (const line of lines) {
      const padding = Math.floor((maxLength - line.length) / 2);
      const paddedLine =
        " ".repeat(padding) +
        line +
        " ".repeat(maxLength - line.length - padding);
      result += "║  " + paddedLine + "  ║\n";
    }

    result += "║" + " ".repeat(maxLength + 4) + "║\n";
    result += "╚" + "═".repeat(maxLength + 4) + "╝";

    return result;
  };

  // Generate Output
  const generateOutput = () => {
    if (!input) {
      setOutput("");
      return;
    }

    let result = "";

    switch (mode) {
      case "text":
        result = generateAsciiText(input, font);
        break;
      case "box":
        result = generateBox(input, boxStyle);
        break;
      case "table":
        result = generateTable(input, boxStyle);
        break;
      case "banner":
        result = generateBanner(input);
        break;
    }

    setOutput(result);
  };

  const handleCopy = async () => {
    await copyToClipboard(output);
    toast({
      title: "Copied to clipboard",
      description: "ASCII art has been copied to your clipboard.",
    });
  };

  // Handle bookmark
  const handleBookmark = () => {
    const newState = toggleBookmark(window.location.pathname);
    setIsBookmarked(newState);
    toast({ title: newState ? "Bookmark added" : "Bookmark removed" });
  };

  // Check if current page is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("text-transformer-bookmarks") || "[]"
    );
    const currentPath = window.location.pathname;
    setIsBookmarked(bookmarks.includes(currentPath));
  }, []);

  // Get faqs
  const faqs: FaqType[]  = asciiGeneratorFaqs;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">ASCII Art Generator</h1>
          </div>
          <div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBookmark}
              className="flex-shrink-0"
            >
              {isBookmarked ? (
                <Star className="w-5 h-5 fill-current text-yellow-500" />
              ) : (
                <StarOff className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Create ASCII art, boxes, tables, and banners from your text input.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Generation Options</CardTitle>
              <CardDescription>
                Choose your ASCII art style and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Tabs */}
              <Tabs value={mode} onValueChange={setMode} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="text" className="text-xs">
                    ASCII Text
                  </TabsTrigger>
                  <TabsTrigger value="box" className="text-xs">
                    Box
                  </TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2 h-auto mt-1">
                  <TabsTrigger value="table" className="text-xs">
                    Table
                  </TabsTrigger>
                  <TabsTrigger value="banner" className="text-xs">
                    Banner
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {/* END Tabs */}

              {/* Font */}
              {mode === "text" && (
                <div>
                  <Label>Font Style</Label>
                  <Select value={font} onValueChange={setFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="block">Block (█)</SelectItem>
                      <SelectItem value="simple">Simple (▀▄)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {/* END Font */}

              {/* Border */}
              {(mode === "box" || mode === "table") && (
                <div>
                  <Label>Border Style</Label>
                  <Select value={boxStyle} onValueChange={setBoxStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light (─│┌┐)</SelectItem>
                      <SelectItem value="heavy">Heavy (━┃┏┓)</SelectItem>
                      <SelectItem value="double">Double (═║╔╗)</SelectItem>
                      <SelectItem value="rounded">Rounded (─│╭╮)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {/* END Border */}

              {/* Buttons */}
              <div className="flex gap-2">
                <Button onClick={generateOutput} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              {/* END Buttons */}

              {/* Table Format */}
              {mode === "table" && (
                <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
                  <strong>Table format:</strong> Use commas or tabs to separate
                  columns. First row will be treated as headers.
                </div>
              )}
              {/* END Table Format */}
            </CardContent>
          </Card>
        </div>
        {/* END Controls */}

        {/* Input and Output */}
        <div className="lg:col-span-2 space-y-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>
                Enter the text you want to convert
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "table"
                    ? "Enter table data (comma or tab separated):\nName,Age,City\nJohn,25,New York\nJane,30,Los Angeles"
                    : "Enter text to convert to ASCII art..."
                }
                className="w-full min-h-[150px] p-3 text-sm border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </CardContent>
          </Card>
          {/* END Input */}

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle>ASCII Output</CardTitle>
              <CardDescription>Your generated ASCII art</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="Generated ASCII art will appear here..."
                className="w-full min-h-[300px] p-3 text-sm border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono"
                readOnly
              />
            </CardContent>
          </Card>
          {/* END Output */}
        </div>
        {/* END Input and Output */}
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
