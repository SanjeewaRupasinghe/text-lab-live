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
  Volume2,
  AlertCircle,
  CheckCircle,
  Radio,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";
import { morseCodeFaqs } from "@/data/faq/encoding-encryption-faq";

export default function MorseCode() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [validationStatus, setValidationStatus] = useState<
    "valid" | "invalid" | "neutral"
  >("neutral");
  const { toast } = useToast();

  // Morse code dictionary
  const morseCode: { [key: string]: string } = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
  };

  // Reverse mapping for decoding
  const reverseMorseCode: { [key: string]: string } = {};
  Object.keys(morseCode).forEach((key) => {
    reverseMorseCode[morseCode[key]] = key;
  });

  // Check if current page is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("text-transformer-bookmarks") || "[]"
    );
    const currentPath = window.location.pathname;
    setIsBookmarked(bookmarks.includes(currentPath));
  }, []);

  // Handle bookmark
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
    const saved = localStorage.getItem("morse-code-transformer");
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
      localStorage.setItem(
        "morse-code-transformer",
        JSON.stringify({
          input: inputText,
          output: outputText,
          mode,
          timestamp: Date.now(),
        })
      );
    }
  }, [inputText, outputText, mode]);

  // Encode to Morse
  const encodeToMorse = (text: string): string => {
    if (!text) return "";

    return text
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return "/"; // Word separator
        return morseCode[char] || char;
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Decode from Morse
  const decodeFromMorse = (morse: string): string => {
    if (!morse) return "";

    try {
      return morse
        .split(" / ")
        .map((word) => {
          return word
            .split(" ")
            .map((code) => {
              if (code === "") return "";
              return reverseMorseCode[code] || "?";
            })
            .join("");
        })
        .join(" ");
    } catch (error) {
      return "Invalid Morse code";
    }
  };

  // Validate Morse code
  const isValidMorse = (text: string): boolean => {
    if (!text) return false;
    const morsePattern = /^[.\-\s\/]+$/;
    return morsePattern.test(text);
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
        result = encodeToMorse(text);
        setValidationStatus("valid");
      } else {
        if (isValidMorse(text)) {
          result = decodeFromMorse(text);
          setValidationStatus("valid");
        } else {
          setValidationStatus("invalid");
          result = "Invalid Morse code format";
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

  // useEffect
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
    localStorage.removeItem("morse-code-transformer");
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

  // Play morse
  const playMorse = () => {
    if (!outputText || mode === "decode") return;

    // Simple audio feedback for morse code
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const dotDuration = 100;
    const dashDuration = 300;
    const pauseDuration = 100;

    let currentTime = audioContext.currentTime;

    outputText.split("").forEach((char) => {
      if (char === ".") {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dotDuration / 1000);
        currentTime += (dotDuration + pauseDuration) / 1000;
      } else if (char === "-") {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.start(currentTime);
        oscillator.stop(currentTime + dashDuration / 1000);
        currentTime += (dashDuration + pauseDuration) / 1000;
      } else if (char === " ") {
        currentTime += pauseDuration / 1000;
      } else if (char === "/") {
        currentTime += (pauseDuration * 3) / 1000;
      }
    });

    toast({
      title: "Playing Morse code",
      description: "Playing audio representation of the Morse code.",
    });
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
          ? "Successfully encoded to Morse code"
          : "Valid Morse code decoded successfully";
      case "invalid":
        return "Invalid Morse code format (use dots, dashes, spaces, and / for word separators)";
      default:
        return null;
    }
  };

  // Get faqs
  const faqs = morseCodeFaqs;

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Morse Code Translator
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
          Convert text to Morse code or decode Morse code back to text. Includes
          audio playback feature.
        </p>

        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Example:</p>
          <code className="text-xs sm:text-sm font-mono break-words">
            "SOS" → "... --- ..." | Use "/" for word separators in Morse
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
              <TabsTrigger value="encode">
                <Radio className="w-4 h-4 mr-2" />
                Text to Morse
              </TabsTrigger>
              <TabsTrigger value="decode">
                <Radio className="w-4 h-4 mr-2" />
                Morse to Text
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSwapMode}>
                <ArrowUpDown className="w-4 h-4 mr-2" />
                Swap
              </Button>
              {mode === "encode" && outputText && (
                <Button variant="outline" size="sm" onClick={playMorse}>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Play
                </Button>
              )}
            </div>
          </div>
        </Tabs>
      </div>
      {/* END Mode Selection */}

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
                {mode === "encode" ? "Text to Convert" : "Morse Code to Decode"}
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
              placeholder={
                mode === "encode"
                  ? "Enter text to convert to Morse code..."
                  : "Enter Morse code (use / for word separators)..."
              }
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>
        {/* END Input Section */}

        {/* Output Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">
                {mode === "encode" ? "Morse Code" : "Decoded Text"}
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
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={outputText}
              readOnly
              placeholder={
                mode === "encode"
                  ? "Morse code will appear here..."
                  : "Decoded text will appear here..."
              }
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none text-editor custom-scrollbar font-mono"
            />
          </CardContent>
        </Card>
        {/* END Output Section */}
      </div>

      {/* Reference Chart */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Morse Code Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-sm font-mono">
            {Object.entries(morseCode)
              .slice(0, 26)
              .map(([letter, code]) => (
                <div
                  key={letter}
                  className="flex justify-between p-2 bg-muted/50 rounded"
                >
                  <span className="font-bold">{letter}</span>
                  <span>{code}</span>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
      {/* END Reference Chart */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
