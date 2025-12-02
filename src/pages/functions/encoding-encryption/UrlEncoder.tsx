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
  Link,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";
import { urlEncoderFaqs } from "@/data/faq/encoding-encryption-faq";
import { copyToClipboard, toggleBookmark } from "@/lib/textEditorUtils";
import { FaqType } from "@/types/faq.type";

export default function UrlEncoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodingType, setEncodingType] = useState<"component" | "uri">(
    "component"
  );
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

  // Handle bookmark
  const handleBookmark = () => {
    const newState = toggleBookmark(window.location.pathname);
    setIsBookmarked(newState);
    toast({ title: newState ? "Bookmark added" : "Bookmark removed" });
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("url-encoder-transformer");
    if (saved) {
      try {
        const {
          input,
          output,
          mode: savedMode,
          encodingType: savedEncodingType,
          timestamp,
        } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setInputText(input);
          setOutputText(output);
          setMode(savedMode);
          setEncodingType(savedEncodingType);
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
        "url-encoder-transformer",
        JSON.stringify({
          input: inputText,
          output: outputText,
          mode,
          encodingType,
          timestamp: Date.now(),
        })
      );
    }
  }, [inputText, outputText, mode, encodingType]);

  // Validate URL
  const isValidUrl = (str: string): boolean => {
    if (!str) return false;
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  };

  // Process text
  const processText = (text: string) => {
    if (!text) {
      setOutputText("");
      setValidationStatus("neutral");
      return;
    }

    try {
      let result = "";

      if (mode === "encode") {
        if (encodingType === "component") {
          result = encodeURIComponent(text);
        } else {
          result = encodeURI(text);
        }
        setValidationStatus("valid");
      } else {
        try {
          result = decodeURIComponent(text);
          setValidationStatus("valid");
        } catch {
          try {
            result = decodeURI(text);
            setValidationStatus("valid");
          } catch {
            setValidationStatus("invalid");
            result = "Invalid URL encoding";
          }
        }
      }

      setOutputText(result);
    } catch (error) {
      setValidationStatus("invalid");
      setOutputText(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  // Process text on input change
  useEffect(() => {
    processText(inputText);
  }, [inputText, mode, encodingType]);

  // Copy to clipboard
  const handleCopy = async () => {
    const success = await copyToClipboard(outputText);
    toast({
      title: success ? "Copied to clipboard" : "Copy failed",
      variant: success ? "default" : "destructive",
    });
  };

  // Reset
  const handleReset = () => {
    setInputText("");
    setOutputText("");
    setValidationStatus("neutral");
    localStorage.removeItem("url-encoder-transformer");
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
    if (!inputText) return null;

    switch (validationStatus) {
      case "valid":
        return mode === "encode"
          ? "Successfully URL encoded"
          : "Successfully URL decoded";
      case "invalid":
        return "Invalid URL encoding format";
      default:
        return null;
    }
  };

  // Get faqs
  const faqs: FaqType[]  = urlEncoderFaqs;

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            URL Encoder/Decoder
          </h1>
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
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">
          Encode URLs and URI components or decode URL-encoded strings. Choose
          between full URI or component encoding.
        </p>

        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Example:</p>
          <code className="text-xs sm:text-sm font-mono break-words">
            "Hello World!" → "Hello%20World%21" (Component) or "Hello World!" →
            "Hello%20World!" (URI)
          </code>
        </div>
      </div>
      {/* END Header */}

      {/* Mode & Type Selection */}
      <div className="mb-6 space-y-4">
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

        {mode === "encode" && (
          <Tabs
            value={encodingType}
            onValueChange={(value) =>
              setEncodingType(value as "component" | "uri")
            }
          >
            <TabsList>
              <TabsTrigger value="component">Component</TabsTrigger>
              <TabsTrigger value="uri">Full URI</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
      </div>
      {/* END Mode & Type Selection */}

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
                {mode === "encode" ? "Text to Encode" : "URL to Decode"}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {inputText.length} characters
                </Badge>
                {mode === "decode" && inputText && isValidUrl(inputText) && (
                  <Badge variant="secondary" className="text-xs">
                    <Link className="w-3 h-3 mr-1" />
                    Valid URL
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Enter text or URL to encode..."
                  : "Enter URL-encoded string to decode..."
              }
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>
        {/* End Input Section */}

        {/* Output Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode === "encode" ? "URL Encoded" : "Decoded Text"}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-xs">
                  {outputText.length} characters
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCopy()}
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
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={outputText}
              readOnly
              placeholder={
                mode === "encode"
                  ? "URL encoded text will appear here..."
                  : "Decoded text will appear here..."
              }
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>
        {/* END Output Section */}
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
