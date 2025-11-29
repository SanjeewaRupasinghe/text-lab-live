import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RotateCcw, ArrowUpDown, Star, StarOff, RotateCw, Hash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";

export default function ROT13() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"rot13" | "rot47">("rot13");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { toast } = useToast();

  // Check if current page is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('text-transformer-bookmarks') || '[]');
    const currentPath = window.location.pathname;
    setIsBookmarked(bookmarks.includes(currentPath));
  }, []);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('text-transformer-bookmarks') || '[]');
    const currentPath = window.location.pathname;
    
    const newBookmarks = isBookmarked
      ? bookmarks.filter((path: string) => path !== currentPath)
      : [...bookmarks, currentPath];
    
    localStorage.setItem('text-transformer-bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked 
        ? "This tool has been removed from your bookmarks." 
        : "This tool has been added to your bookmarks.",
    });
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("rot-transformer");
    if (saved) {
      try {
        const { input, output, mode: savedMode, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setInputText(input);
          setOutputText(output);
          setMode(savedMode);
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (inputText || outputText) {
      localStorage.setItem("rot-transformer", JSON.stringify({
        input: inputText,
        output: outputText,
        mode,
        timestamp: Date.now()
      }));
    }
  }, [inputText, outputText, mode]);

  const rot13 = (text: string): string => {
    if (!text) return "";
    
    return text.replace(/[A-Za-z]/g, (char) => {
      const start = char <= 'Z' ? 65 : 97; // ASCII value for 'A' or 'a'
      return String.fromCharCode(((char.charCodeAt(0) - start + 13) % 26) + start);
    });
  };

  const rot47 = (text: string): string => {
    if (!text) return "";
    
    return text.replace(/[!-~]/g, (char) => {
      // ROT47 works on printable ASCII characters from ! (33) to ~ (126)
      const charCode = char.charCodeAt(0);
      if (charCode >= 33 && charCode <= 126) {
        return String.fromCharCode(((charCode - 33 + 47) % 94) + 33);
      }
      return char;
    });
  };

  useEffect(() => {
    if (inputText) {
      const result = mode === "rot13" ? rot13(inputText) : rot47(inputText);
      setOutputText(result);
    } else {
      setOutputText("");
    }
  }, [inputText, mode]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "Text has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    localStorage.removeItem("rot-transformer");
    toast({
      title: "Reset complete",
      description: "All fields have been cleared.",
    });
  };

  const handleSwapInputOutput = () => {
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  const applyExampleText = (example: string) => {
    setInputText(example);
  };

  const examples = {
    rot13: [
      "Hello World!",
      "The quick brown fox jumps over the lazy dog.",
      "ROT13 is a simple letter substitution cipher."
    ],
    rot47: [
      "Hello World! 123",
      "ROT47 encodes letters, numbers & symbols!",
      "Test @#$%^&*()_+ symbols"
    ]
  };

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">ROT13 & ROT47 Encoder</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleBookmark}
            className="flex-shrink-0"
          >
            {isBookmarked ? (
              <Star className="w-5 h-5 fill-current text-yellow-500" />
            ) : (
              <StarOff className="w-5 h-5" />
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">
          Apply ROT13 (letters only) or ROT47 (letters, numbers & symbols) encoding. Both are self-reversing.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Examples:</p>
          <code className="text-xs sm:text-sm font-mono break-words block">
            ROT13: "Hello" → "Uryyb" | ROT47: "Hello123!" → "96==@abc0"
          </code>
        </div>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <Tabs value={mode} onValueChange={(value) => setMode(value as "rot13" | "rot47")}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="rot13">
                <RotateCw className="w-4 h-4 mr-2" />
                ROT13
              </TabsTrigger>
              <TabsTrigger value="rot47">
                <Hash className="w-4 h-4 mr-2" />
                ROT47
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" onClick={handleSwapInputOutput}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap
            </Button>
          </div>
        </Tabs>

        {/* Example buttons */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick examples:</p>
          <div className="flex gap-2 flex-wrap">
            {examples[mode].map((example, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => applyExampleText(example)}
                className="text-xs"
              >
                Example {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">Input Text</CardTitle>
              <Badge variant="outline" className="text-xs">
                {inputText.length} characters
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Enter text to apply ${mode.toUpperCase()} encoding...`}
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode.toUpperCase()} Encoded
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {outputText.length} characters
                </Badge>
                <Button size="sm" variant="outline" onClick={() => handleCopy(outputText)} disabled={!outputText}>
                  <Copy className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button size="sm" variant="outline" onClick={handleReset} disabled={!inputText && !outputText}>
                  <RotateCcw className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={outputText}
              readOnly
              placeholder={`${mode.toUpperCase()} encoded text will appear here...`}
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>
      </div>

      {/* Information Cards */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <RotateCw className="w-4 h-4 mr-2" />
              ROT13 Info
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-1">
              <li>• Shifts letters by 13 positions</li>
              <li>• Only affects A-Z and a-z</li>
              <li>• Self-reversing (applying twice returns original)</li>
              <li>• Commonly used for spoiler protection</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              ROT47 Info
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <ul className="space-y-1">
              <li>• Shifts printable ASCII by 47 positions</li>
              <li>• Affects letters, numbers & symbols</li>
              <li>• Self-reversing like ROT13</li>
              <li>• Covers characters ! through ~</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <FAQ />
    </div>
  );
}