import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  RotateCcw,
  ArrowUpDown,
  Star,
  StarOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";
import { base64Faqs } from "@/data/faq/encoding-encryption-faq";

export default function Base64() {
  // State
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    "valid" | "invalid" | "neutral"
  >("neutral");
  const { toast } = useToast();

  // Check if current page is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("text-transformer-bookmarks") || "[]"
    );
    const currentPath = window.location.pathname;
    setIsBookmarked(bookmarks.includes(currentPath));
  }, []);


  const toggleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("text-transformer-bookmarks") || "[]"
    );
    const currentPath = window.location.pathname;

    const newBookmarks = isBookmarked
      ? bookmarks.filter((path: string) => path !== currentPath)
      : [...bookmarks, currentPath];

    localStorage.setItem(
      "text-transformer-bookmarks",
      JSON.stringify(newBookmarks)
    );
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
    const saved = localStorage.getItem("base64-transformer");
    if (saved) {
      // Load saved state
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
      localStorage.setItem(
        "base64-transformer",
        JSON.stringify({
          input: inputText,
          output: outputText,
          mode,
          timestamp: Date.now(),
        })
      );
    }
  }, [inputText, outputText, mode]);

  // Validation
  const isValidBase64 = (str: string): boolean => {
    // Validate
    if (!str) return false;
    try {
      const decoded = atob(str);
      const reEncoded = btoa(decoded);
      return reEncoded === str;
    } catch (e) {
      return false;
    }
  };

  // Process text
  const processText = (text: string) => {
    // Validate
    if (!text) {
      setOutputText("");
      setValidationStatus("neutral");
      return;
    }

    try {
      let result = "";

      if (mode === "encode") {
        result = btoa(unescape(encodeURIComponent(text)));
        setValidationStatus("valid");
      } else {
        if (isValidBase64(text)) {
          result = decodeURIComponent(escape(atob(text)));
          setValidationStatus("valid");
        } else {
          setValidationStatus("invalid");
          result = "Invalid Base64 input";
        }
      }

      setOutputText(result);
    } catch (error) {
      // Error
      setValidationStatus("invalid");
      setOutputText(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  useEffect(() => {
    processText(inputText);
  }, [inputText, mode]);

  // Copy to clipboard
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

  // Reset
  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setValidationStatus("neutral");
    localStorage.removeItem("base64-transformer");
    toast({
      title: "Reset complete",
      description: "All fields have been cleared.",
    });
  };

  // Swap mode
  const handleSwapMode = () => {
    setMode(mode === "encode" ? "decode" : "encode");
    // Swap input and output
    const temp = inputText;
    setInputText(outputText);
    setOutputText(temp);
  };

  // Get status icon
  const getStatusIcon = () => {
    switch (validationStatus) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "invalid":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  // Get status message
  const getStatusMessage = () => {
    // Validate
    if (!inputText) return null;

    switch (validationStatus) {
      case "valid":
        return mode === "encode"
          ? "Successfully encoded to Base64"
          : "Valid Base64 decoded successfully";
      case "invalid":
        return "Invalid Base64 format";
      default:
        return null;
    }
  };

  // Get faqs
  const faqs = base64Faqs;

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Base64 Encoder/Decoder
          </h1>
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
          Encode text to Base64 or decode Base64 strings. Supports UTF-8
          encoding for international characters.
        </p>

        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Example:</p>
          <code className="text-xs sm:text-sm font-mono break-words">
            Text: "Hello World!" → Base64: "SGVsbG8gV29ybGQh"
          </code>
        </div>
      </div>
      {/* END Header */}

      {/* Mode Selection */}
      <div className="mb-6">
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as "encode" | "decode")}
        >
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" onClick={handleSwapMode}>
              <ArrowUpDown className="w-4 h-4 mr-2" />
              Swap
            </Button>
          </div>
        </Tabs>
      </div>

      {/* Status Alert */}
      {getStatusMessage() && (
        <Alert
          className={`mb-6 ${
            validationStatus === "invalid"
              ? "border-destructive/50"
              : "border-green-500/50"
          }`}
        >
          {getStatusIcon()}
          <AlertDescription>{getStatusMessage()}</AlertDescription>
        </Alert>
      )}
      {/* END Status Alert */}

      <div className="grid gap-6 lg:grid-cols-2">
      {/* Input Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                {inputText.length} characters
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {/* Input Textarea */}
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Enter text to encode..."
                  : "Enter Base64 string to decode..."
              }
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-editor custom-scrollbar"
            />
            {/* END Input Textarea */}
          </CardContent>
        </Card>
      {/* END Input Section */}

        {/* Output Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode === "encode" ? "Base64 Encoded" : "Decoded Text"}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {outputText.length} characters
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy(outputText)}
                  disabled={!outputText}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!inputText && !outputText}
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          {/* Output Textarea */}
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={outputText}
              readOnly
              placeholder={
                mode === "encode"
                  ? "Base64 encoded text will appear here..."
                  : "Decoded text will appear here..."
              }
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none text-editor custom-scrollbar"
            />
          </CardContent>
          {/* Output Textarea */}

        </Card>
        {/* END Output Section */}
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
