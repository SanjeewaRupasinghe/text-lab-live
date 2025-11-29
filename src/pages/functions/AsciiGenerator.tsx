import { useState } from "react";
import { TextEditor } from "@/components/TextEditor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Type, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    "9": ["█████", "█   █", "█████", "    █", "█████"]
  },
  
  simple: {
    A: [" ▄▀█ ", "█▀▀█ ", "█▄▄█ ", "▀  █ ", "   █ "],
    B: ["█▀▀▄ ", "█▀▀▄ ", "█▄▄▀ ", "█▀▀▄ ", "▀▀▀  "],
    C: [" ▄▀█▄", "█   ▀", "█    ", "█   ▄", " ▀█▀ "],
    H: ["█   █", "█▀▀▀█", "█   █", "█   █", "▀   ▀"],
    E: ["█▀▀▀▀", "█▀▀▀ ", "█▀▀▀ ", "█▄▄▄▄", "▀▀▀▀▀"],
    L: ["█    ", "█    ", "█    ", "█▄▄▄▄", "▀▀▀▀▀"],
    O: [" ▄▀█▄", "█   █", "█   █", "█▄▄▄█", " ▀▀▀ "],
    " ": ["     ", "     ", "     ", "     ", "     "]
  }
};

const BOX_CHARS = {
  light: { h: "─", v: "│", tl: "┌", tr: "┐", bl: "└", br: "┘" },
  heavy: { h: "━", v: "┃", tl: "┏", tr: "┓", bl: "┗", br: "┛" },
  double: { h: "═", v: "║", tl: "╔", tr: "╗", bl: "╚", br: "╝" },
  rounded: { h: "─", v: "│", tl: "╭", tr: "╮", bl: "╰", br: "╯" }
};

export default function AsciiGenerator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState("text");
  const [font, setFont] = useState("block");
  const [boxStyle, setBoxStyle] = useState("light");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const { toast } = useToast();

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

  const generateBox = (text: string, style: string) => {
    if (!text) return "";
    
    const chars = BOX_CHARS[style as keyof typeof BOX_CHARS];
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    
    let result = "";
    
    // Top border
    result += chars.tl + chars.h.repeat(maxLength + 2) + chars.tr + "\n";
    
    // Content with side borders
    for (const line of lines) {
      result += chars.v + " " + line.padEnd(maxLength, " ") + " " + chars.v + "\n";
    }
    
    // Bottom border  
    result += chars.bl + chars.h.repeat(maxLength + 2) + chars.br;
    
    return result;
  };

  const generateTable = (text: string, style: string) => {
    if (!text) return "";
    
    const chars = BOX_CHARS[style as keyof typeof BOX_CHARS];
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return "";
    
    // Assume first line is headers, split by common delimiters
    const headers = lines[0].split(/[,|\t]/).map(h => h.trim());
    const rows = lines.slice(1).map(line => 
      line.split(/[,|\t]/).map(cell => cell.trim())
    );
    
    // Calculate column widths
    const colWidths = headers.map((header, i) => {
      const maxCellWidth = Math.max(...rows.map(row => (row[i] || "").length));
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
    rows.forEach(row => {
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

  const generateBanner = (text: string) => {
    if (!text) return "";
    
    const lines = text.split('\n');
    const maxLength = Math.max(...lines.map(line => line.length));
    
    let result = "";
    result += "╔" + "═".repeat(maxLength + 4) + "╗\n";
    result += "║" + " ".repeat(maxLength + 4) + "║\n";
    
    for (const line of lines) {
      const padding = Math.floor((maxLength - line.length) / 2);
      const paddedLine = " ".repeat(padding) + line + " ".repeat(maxLength - line.length - padding);
      result += "║  " + paddedLine + "  ║\n";
    }
    
    result += "║" + " ".repeat(maxLength + 4) + "║\n";
    result += "╚" + "═".repeat(maxLength + 4) + "╝";
    
    return result;
  };

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

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    toast({
      title: "Copied to clipboard",
      description: "ASCII art has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-bold">ASCII Art Generator</h1>
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
              <Tabs value={mode} onValueChange={setMode} className="w-full">
                <TabsList className="grid w-full grid-cols-2 h-auto">
                  <TabsTrigger value="text" className="text-xs">ASCII Text</TabsTrigger>
                  <TabsTrigger value="box" className="text-xs">Box</TabsTrigger>
                </TabsList>
                <TabsList className="grid w-full grid-cols-2 h-auto mt-1">
                  <TabsTrigger value="table" className="text-xs">Table</TabsTrigger>
                  <TabsTrigger value="banner" className="text-xs">Banner</TabsTrigger>
                </TabsList>
              </Tabs>

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

              <div className="flex gap-2">
                <Button onClick={generateOutput} className="flex-1">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Generate
                </Button>
                <Button 
                  variant="outline" 
                  onClick={copyToClipboard}
                  disabled={!output}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>

              {mode === "table" && (
                <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded">
                  <strong>Table format:</strong> Use commas or tabs to separate columns. First row will be treated as headers.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Input and Output */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Text</CardTitle>
              <CardDescription>Enter the text you want to convert</CardDescription>
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
        </div>
      </div>
    </div>
  );
}