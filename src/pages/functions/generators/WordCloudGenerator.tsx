import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, Star, StarOff } from "lucide-react";
import { toast } from "sonner";
import {
  COLORS,
  STOP_WORDS,
  WordFrequency,
} from "@/data/WorldCloudGeneratorData";
import { FAQ } from "@/components/FAQ";
import { wordCloudFaqs } from "@/data/faq/generator-faq";
import { FaqType } from "@/types/faq.type";
import { toggleBookmark } from "@/lib/textEditorUtils";

const WordCloudGenerator = () => {
  // States
  const [text, setText] = useState("");
  const [maxWords, setMaxWords] = useState([50]);
  const [minWordLength, setMinWordLength] = useState([3]);
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [words, setWords] = useState<WordFrequency[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Validate
    if (!text.trim()) {
      setWords([]);
      return;
    }

    // Process text
    let processedText = text;
    if (!caseSensitive) {
      processedText = processedText.toLowerCase();
    }

    // Extract words
    const wordMatches = processedText.match(/\b[\w']+\b/g) || [];

    // Count frequencies
    const frequencyMap = new Map<string, number>();
    wordMatches.forEach((word) => {
      if (word.length < minWordLength[0]) return;
      if (removeStopWords && STOP_WORDS.has(word.toLowerCase())) return;

      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    // Sort by frequency and take top N
    const sortedWords = Array.from(frequencyMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxWords[0]);

    // Calculate sizes
    const maxFreq = Math.max(...sortedWords.map((w) => w[1]));
    const minFreq = Math.min(...sortedWords.map((w) => w[1]));
    const freqRange = maxFreq - minFreq || 1;

    // Create word objects with sizes
    const wordObjects: WordFrequency[] = sortedWords.map(([word, count]) => {
      const normalizedFreq = (count - minFreq) / freqRange;
      const size = 12 + normalizedFreq * 48; // 12px to 60px
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      return { word, count, size, color };
    });

    // Set words
    setWords(wordObjects);
  }, [text, maxWords, minWordLength, removeStopWords, caseSensitive]);

  // Regenerate colors
  const regenerateColors = () => {
    setWords(
      words.map((w) => ({
        ...w,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }))
    );
  };

  // Download image
  const downloadImage = async () => {
    // Validate
    const cloudElement = document.getElementById("word-cloud");
    if (!cloudElement) return;

    try {
      const html2canvas = (await import("html2canvas")).default;

      const bgVar = getComputedStyle(document.documentElement)
        .getPropertyValue("--background")
        .trim();
      const backgroundColor = bgVar ? `hsl(${bgVar})` : undefined;

      const canvas = await html2canvas(cloudElement as HTMLElement, {
        backgroundColor, // valid CSS color
        scale: window.devicePixelRatio || 1, // sharper image on HiDPI
        useCORS: true,
      });

      // Prefer Blob for download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to export image");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "word-cloud.png";
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Word cloud downloaded");
      }, "image/png");
    } catch (error) {
      // Error
      toast.error("Failed to download image");
    }
  };

  // Handle bookmark
  const handleBookmark = () => {
    const newState = toggleBookmark(window.location.pathname);
    setIsBookmarked(newState);
    toast.success(newState ? "Bookmark added" : "Bookmark removed");
  };

  // Check if current page is bookmarked
  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("text-transformer-bookmarks") || "[]"
    );
    const currentPath = window.location.pathname;
    setIsBookmarked(bookmarks.includes(currentPath));
  }, []);

  // Calculate stats
  const totalWords = words.reduce((sum, w) => sum + w.count, 0);
  const uniqueWords = words.length;

  // Get faqs
  const faqs: FaqType[] = wordCloudFaqs;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center justify-between gap-2">
              Word Cloud Generator
            </div>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBookmark}
                className="flex-shrink-0"
              >
                {isBookmarked ? (
                  <Star className="w-5 h-5 fill-current text-yellow-500 animate-bounce" />
                ) : (
                  <StarOff className="w-5 h-5 animate-bounce" />
                )}
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Visualize word frequency with an interactive word cloud
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Text Input */}
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here to generate a word cloud..."
              className="min-h-[150px]"
            />
          </div>
          {/* END Text Input */}

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Maximum words */}
            <div className="space-y-2">
              <Label>Maximum Words: {maxWords[0]}</Label>
              <Slider
                value={maxWords}
                onValueChange={setMaxWords}
                min={10}
                max={100}
                step={5}
              />
            </div>
            {/* END Maximum words */}

            {/* Minimum word length */}
            <div className="space-y-2">
              <Label>Minimum Word Length: {minWordLength[0]}</Label>
              <Slider
                value={minWordLength}
                onValueChange={setMinWordLength}
                min={1}
                max={10}
                step={1}
              />
            </div>
            {/* END Minimum word length */}
          </div>
          {/* END Options */}

          <div className="flex flex-wrap gap-6">
            {/* Remove stop words */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeStopWords"
                checked={removeStopWords}
                onCheckedChange={(checked) =>
                  setRemoveStopWords(checked as boolean)
                }
              />
              <Label
                htmlFor="removeStopWords"
                className="text-sm cursor-pointer"
              >
                Remove common words (the, and, of, etc.)
              </Label>
            </div>
            {/* END Remove stop words */}

            {/* Case sensitive */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="caseSensitive"
                checked={caseSensitive}
                onCheckedChange={(checked) =>
                  setCaseSensitive(checked as boolean)
                }
              />
              <Label htmlFor="caseSensitive" className="text-sm cursor-pointer">
                Case sensitive
              </Label>
            </div>
            {/* END Case sensitive */}
          </div>

          {/* Statistics */}
          {words.length > 0 && (
            <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg">
              <Badge variant="outline">Total Words: {totalWords}</Badge>
              <Badge variant="outline">Unique Words: {uniqueWords}</Badge>
              <Badge variant="outline">Displayed: {words.length}</Badge>
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onClick={regenerateColors}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate Colors
                </Button>
                <Button size="sm" variant="outline" onClick={downloadImage}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          )}
          {/* END Statistics */}

          {/* Word Cloud */}
          {words.length > 0 && (
            <div className="space-y-2">
              <Label>Word Cloud</Label>
              <div
                id="word-cloud"
                className="border rounded-lg p-8 bg-background min-h-[400px] flex flex-wrap items-center justify-center gap-4"
              >
                {words.map((word, idx) => (
                  <span
                    key={`${word.word}-${idx}`}
                    style={{
                      fontSize: `${word.size}px`,
                      color: word.color,
                      fontWeight: 600,
                      lineHeight: 1.2,
                      transition: "all 0.2s",
                    }}
                    className="cursor-pointer hover:scale-110"
                    title={`${word.word}: ${word.count} occurrence${
                      word.count > 1 ? "s" : ""
                    }`}
                  >
                    {word.word}
                  </span>
                ))}
              </div>
            </div>
          )}
          {/* END Word Cloud */}

          {/* Word List */}
          {words.length > 0 && (
            <div className="space-y-2">
              <Label>Word Frequency List</Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[300px] overflow-auto">
                  {words.map((word, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 border-b last:border-b-0 hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <span
                          className="font-medium"
                          style={{ color: word.color }}
                        >
                          {word.word}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {word.count} {word.count === 1 ? "time" : "times"}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {((word.count / totalWords) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* END Word List */}
        </CardContent>
      </Card>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default WordCloudGenerator;
