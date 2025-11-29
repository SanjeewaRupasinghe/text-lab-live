import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface WordFrequency {
  word: string;
  count: number;
  size: number;
  color: string;
}

const STOP_WORDS = new Set([
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
  'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
  'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
  'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
  'is', 'was', 'are', 'been', 'has', 'had', 'were', 'said', 'did', 'having',
  'am', 'being', 'does', 'done', 'may', 'might', 'must', 'shall', 'should', 'ought'
]);

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))',
  'hsl(var(--accent))',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#6366f1'
];

const WordCloudGenerator = () => {
  const [text, setText] = useState("");
  const [maxWords, setMaxWords] = useState([50]);
  const [minWordLength, setMinWordLength] = useState([3]);
  const [removeStopWords, setRemoveStopWords] = useState(true);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [words, setWords] = useState<WordFrequency[]>([]);

  useEffect(() => {
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
    wordMatches.forEach(word => {
      if (word.length < minWordLength[0]) return;
      if (removeStopWords && STOP_WORDS.has(word.toLowerCase())) return;
      
      frequencyMap.set(word, (frequencyMap.get(word) || 0) + 1);
    });

    // Sort by frequency and take top N
    const sortedWords = Array.from(frequencyMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxWords[0]);

    // Calculate sizes
    const maxFreq = Math.max(...sortedWords.map(w => w[1]));
    const minFreq = Math.min(...sortedWords.map(w => w[1]));
    const freqRange = maxFreq - minFreq || 1;

    // Create word objects with sizes
    const wordObjects: WordFrequency[] = sortedWords.map(([word, count]) => {
      const normalizedFreq = (count - minFreq) / freqRange;
      const size = 12 + normalizedFreq * 48; // 12px to 60px
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      
      return { word, count, size, color };
    });

    setWords(wordObjects);
  }, [text, maxWords, minWordLength, removeStopWords, caseSensitive]);

  const regenerateColors = () => {
    setWords(words.map(w => ({
      ...w,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    })));
  };

  const downloadImage = async () => {
    const cloudElement = document.getElementById('word-cloud');
    if (!cloudElement) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cloudElement, {
        backgroundColor: getComputedStyle(document.documentElement)
          .getPropertyValue('--background'),
      });
      
      const link = document.createElement('a');
      link.download = 'word-cloud.png';
      link.href = canvas.toDataURL();
      link.click();
      
      toast.success("Word cloud downloaded");
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  const totalWords = words.reduce((sum, w) => sum + w.count, 0);
  const uniqueWords = words.length;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Word Cloud Generator</CardTitle>
          <CardDescription>Visualize word frequency with an interactive word cloud</CardDescription>
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

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="removeStopWords"
                checked={removeStopWords}
                onCheckedChange={(checked) => setRemoveStopWords(checked as boolean)}
              />
              <Label htmlFor="removeStopWords" className="text-sm cursor-pointer">
                Remove common words (the, and, of, etc.)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="caseSensitive"
                checked={caseSensitive}
                onCheckedChange={(checked) => setCaseSensitive(checked as boolean)}
              />
              <Label htmlFor="caseSensitive" className="text-sm cursor-pointer">
                Case sensitive
              </Label>
            </div>
          </div>

          {/* Statistics */}
          {words.length > 0 && (
            <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg">
              <Badge variant="outline">
                Total Words: {totalWords}
              </Badge>
              <Badge variant="outline">
                Unique Words: {uniqueWords}
              </Badge>
              <Badge variant="outline">
                Displayed: {words.length}
              </Badge>
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
                      transition: 'all 0.2s',
                    }}
                    className="cursor-pointer hover:scale-110"
                    title={`${word.word}: ${word.count} occurrence${word.count > 1 ? 's' : ''}`}
                  >
                    {word.word}
                  </span>
                ))}
              </div>
            </div>
          )}

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
                        <span className="font-medium" style={{ color: word.color }}>
                          {word.word}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {word.count} {word.count === 1 ? 'time' : 'times'}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default WordCloudGenerator;
