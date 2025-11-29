import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RotateCcw, ArrowUpDown, Star, StarOff, Shield, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";

export default function CaesarCipher() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [preserveCase, setPreserveCase] = useState(true);
  const [preserveNumbers, setPreserveNumbers] = useState(true);
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
    const saved = localStorage.getItem("caesar-cipher-transformer");
    if (saved) {
      try {
        const { input, output, shift: savedShift, mode: savedMode, preserveCase: savedPreserveCase, preserveNumbers: savedPreserveNumbers, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setInputText(input);
          setOutputText(output);
          setShift(savedShift);
          setMode(savedMode);
          setPreserveCase(savedPreserveCase);
          setPreserveNumbers(savedPreserveNumbers);
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (inputText || outputText) {
      localStorage.setItem("caesar-cipher-transformer", JSON.stringify({
        input: inputText,
        output: outputText,
        shift,
        mode,
        preserveCase,
        preserveNumbers,
        timestamp: Date.now()
      }));
    }
  }, [inputText, outputText, shift, mode, preserveCase, preserveNumbers]);

  const caesarCipher = (text: string, shiftAmount: number, encrypt: boolean = true): string => {
    if (!text) return "";
    
    const actualShift = encrypt ? shiftAmount : -shiftAmount;
    
    return text.split('').map(char => {
      // Handle letters
      if (/[A-Za-z]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const charCode = char.toLowerCase().charCodeAt(0);
        const shifted = ((charCode - 97 + actualShift + 26) % 26) + 97;
        const result = String.fromCharCode(shifted);
        
        return preserveCase && isUpperCase ? result.toUpperCase() : result;
      }
      
      // Handle numbers (0-9) if enabled
      if (preserveNumbers && /[0-9]/.test(char)) {
        const num = parseInt(char);
        const shifted = (num + actualShift + 10) % 10;
        return shifted.toString();
      }
      
      // Return other characters unchanged
      return char;
    }).join('');
  };

  const rot13 = (text: string): string => {
    return caesarCipher(text, 13, true);
  };

  useEffect(() => {
    if (inputText) {
      const result = caesarCipher(inputText, shift, mode === "encrypt");
      setOutputText(result);
    } else {
      setOutputText("");
    }
  }, [inputText, shift, mode, preserveCase, preserveNumbers]);

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
    setShift(3);
    setMode("encrypt");
    localStorage.removeItem("caesar-cipher-transformer");
    toast({
      title: "Reset complete",
      description: "All fields have been cleared.",
    });
  };

  const handleSwapMode = () => {
    setMode(mode === "encrypt" ? "decrypt" : "encrypt");
    // Swap input and output
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  const applyROT13 = () => {
    if (inputText) {
      const result = rot13(inputText);
      setOutputText(result);
      setShift(13);
    }
  };

  const quickShiftButtons = [1, 3, 5, 7, 13, 25];

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Caesar Cipher</h1>
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
          Encrypt or decrypt text using the Caesar cipher with customizable shift values. Includes ROT13 support.
        </p>
        
        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Example:</p>
          <code className="text-xs sm:text-sm font-mono break-words">
            "Hello World" → "Khoor Zruog" (shift 3)
          </code>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <Tabs value={mode} onValueChange={(value) => setMode(value as "encrypt" | "decrypt")}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="encrypt">
                <Shield className="w-4 h-4 mr-2" />
                Encrypt
              </TabsTrigger>
              <TabsTrigger value="decrypt">
                <Key className="w-4 h-4 mr-2" />
                Decrypt
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" onClick={handleSwapMode}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap
            </Button>
          </div>
        </Tabs>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="shift">Shift Amount</Label>
            <Input
              id="shift"
              type="number"
              min="1"
              max="25"
              value={shift}
              onChange={(e) => setShift(parseInt(e.target.value) || 1)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Quick Shifts</Label>
            <div className="flex gap-1 flex-wrap">
              {quickShiftButtons.map((shiftValue) => (
                <Button
                  key={shiftValue}
                  variant={shift === shiftValue ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShift(shiftValue)}
                >
                  {shiftValue}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Options</Label>
            <div className="flex gap-2">
              <Button
                variant={preserveCase ? "default" : "outline"}
                size="sm"
                onClick={() => setPreserveCase(!preserveCase)}
              >
                Case
              </Button>
              <Button
                variant={preserveNumbers ? "default" : "outline"}
                size="sm"
                onClick={() => setPreserveNumbers(!preserveNumbers)}
              >
                Numbers
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Special</Label>
            <Button variant="outline" size="sm" onClick={applyROT13} className="w-full">
              Apply ROT13
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode === "encrypt" ? "Text to Encrypt" : "Text to Decrypt"}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {inputText.length} characters
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Enter ciphertext to decrypt..."}
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode === "encrypt" ? "Encrypted Text" : "Decrypted Text"}
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
              placeholder={mode === "encrypt" ? "Encrypted text will appear here..." : "Decrypted text will appear here..."}
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>
      </div>

      <FAQ />
    </div>
  );
}
