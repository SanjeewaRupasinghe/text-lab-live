import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Copy,
  RotateCcw,
  BarChart3,
  AlertTriangle,
  Star,
  StarOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Cell,
  Pie,
  ResponsiveContainer,
} from "recharts";
import { FAQ } from "@/components/FAQ";
import { statisticsFaqs } from "@/data/faq/statistics-faq";
import { copyToClipboard, toggleBookmark } from "@/lib/textEditorUtils";

export default function Statistics() {
  // State
  const [inputText, setInputText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [wordCountThreshold, setWordCountThreshold] = useState(1000);
  const [readingTimeThreshold, setReadingTimeThreshold] = useState(5);
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
    const saved = localStorage.getItem("statistics-transformer");
    if (saved) {
      try {
        const { input, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setInputText(input);
        }
      } catch (e) {
        // Invalid JSON, ignore
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (inputText) {
      localStorage.setItem(
        "statistics-transformer",
        JSON.stringify({
          input: inputText,
          timestamp: Date.now(),
        })
      );
    }
  }, [inputText]);

  // Get detailed stats
  const getDetailedStats = (text: string) => {
    if (!text)
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        lines: 0,
        readingTime: 0,
        speakingTime: 0,
        avgWordsPerSentence: 0,
        avgCharsPerWord: 0,
        mostCommonWords: [],
        wordFrequency: new Map(),
        characterFrequency: new Map(),
        sentimentScore: 0,
        readabilityScore: "",
        entities: [],
        themes: [],
        alerts: [],
      };

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const words = text.trim()
      ? text
          .trim()
          .toLowerCase()
          .match(/\b\w+\b/g) || []
      : [];
    const wordCount = words.length;
    const sentences = text
      .split(/[.!?]+/)
      .filter((s) => s.trim().length > 0).length;
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;
    const lines = text.split("\n").length;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);
    // Speaking time (average 150 words per minute)
    const speakingTime = Math.ceil(wordCount / 150);

    const avgWordsPerSentence =
      sentences > 0 ? Math.round((wordCount / sentences) * 10) / 10 : 0;
    const avgCharsPerWord =
      wordCount > 0
        ? Math.round((charactersNoSpaces / wordCount) * 10) / 10
        : 0;

    // Word frequency
    const wordFrequency = new Map();
    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      if (cleanWord.length > 2) {
        wordFrequency.set(cleanWord, (wordFrequency.get(cleanWord) || 0) + 1);
      }
    });

    // Character frequency
    const characterFrequency = new Map();
    text
      .toLowerCase()
      .split("")
      .forEach((char) => {
        if (char.match(/[a-z]/)) {
          characterFrequency.set(char, (characterFrequency.get(char) || 0) + 1);
        }
      });

    const mostCommonWords = Array.from(wordFrequency.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10);

    // Basic sentiment analysis
    const positiveWords = [
      "good",
      "great",
      "excellent",
      "amazing",
      "wonderful",
      "fantastic",
      "awesome",
      "love",
      "like",
      "happy",
      "joy",
      "success",
      "perfect",
      "brilliant",
    ];
    const negativeWords = [
      "bad",
      "terrible",
      "awful",
      "horrible",
      "hate",
      "dislike",
      "sad",
      "angry",
      "fail",
      "failure",
      "wrong",
      "problem",
      "issue",
      "difficult",
    ];

    let positiveCount = 0;
    let negativeCount = 0;
    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      if (positiveWords.includes(cleanWord)) positiveCount++;
      if (negativeWords.includes(cleanWord)) negativeCount++;
    });

    const sentimentScore = positiveCount - negativeCount;

    // Readability assessment
    const avgSentenceLength = avgWordsPerSentence;
    let readabilityScore = "";
    if (avgSentenceLength < 10) readabilityScore = "Very Easy";
    else if (avgSentenceLength < 15) readabilityScore = "Easy";
    else if (avgSentenceLength < 20) readabilityScore = "Moderate";
    else if (avgSentenceLength < 25) readabilityScore = "Difficult";
    else readabilityScore = "Very Difficult";

    // Basic entity recognition
    const entities = [];
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const urlRegex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const phoneRegex =
      /(\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;

    const emails = text.match(emailRegex) || [];
    const urls = text.match(urlRegex) || [];
    const phones = text.match(phoneRegex) || [];

    if (emails.length > 0)
      entities.push({
        type: "Email",
        count: emails.length,
        examples: emails.slice(0, 3),
      });
    if (urls.length > 0)
      entities.push({
        type: "URL",
        count: urls.length,
        examples: urls.slice(0, 3),
      });
    if (phones.length > 0)
      entities.push({
        type: "Phone",
        count: phones.length,
        examples: phones.slice(0, 3),
      });

    // Theme analysis (basic keyword extraction)
    const themes = mostCommonWords
      .slice(0, 5)
      .map(([word, count]) => ({ theme: word, relevance: count }));

    // Alerts based on thresholds
    const alerts = [];
    if (wordCount > wordCountThreshold) {
      alerts.push({
        type: "warning",
        message: `Text exceeds ${wordCountThreshold} words (${wordCount} words)`,
      });
    }
    if (readingTime > readingTimeThreshold) {
      alerts.push({
        type: "info",
        message: `Reading time exceeds ${readingTimeThreshold} minutes (${readingTime} minutes)`,
      });
    }
    if (avgSentenceLength > 30) {
      alerts.push({
        type: "warning",
        message: "Very long sentences detected - consider breaking them up",
      });
    }

    return {
      characters,
      charactersNoSpaces,
      words: wordCount,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
      avgWordsPerSentence,
      avgCharsPerWord,
      mostCommonWords,
      wordFrequency,
      characterFrequency,
      sentimentScore,
      readabilityScore,
      entities,
      themes,
      alerts,
    };
  };

  // Get stats
  const stats = getDetailedStats(inputText);

  // Copy to clipboard
  const handleCopy = async () => {
    const statsText = `
Text Statistics:
- Characters: ${stats.characters}
- Characters (no spaces): ${stats.charactersNoSpaces}
- Words: ${stats.words}
- Sentences: ${stats.sentences}
- Paragraphs: ${stats.paragraphs}
- Lines: ${stats.lines}
- Estimated reading time: ${stats.readingTime} minute(s)
- Estimated speaking time: ${stats.speakingTime} minute(s)
- Average words per sentence: ${stats.avgWordsPerSentence}
- Average characters per word: ${stats.avgCharsPerWord}
    `.trim();

    try {
      await copyToClipboard(statsText);

      toast({
        title: "Statistics copied",
        description: "Text statistics have been copied to your clipboard.",
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
    localStorage.removeItem("statistics-transformer");
    toast({
      title: "Reset complete",
      description: "Input has been cleared.",
    });
  };

  // Colors
  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--secondary))",
    "hsl(var(--accent))",
    "hsl(var(--muted))",
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
  ];

  // Get chart data
  const getChartData = (frequency: Map<string, number>, limit = 10) => {
    return Array.from(frequency.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([name, value]) => ({ name, value }));
  };

  // Get faqs
  const faqs = statisticsFaqs;

  return (
    <div className="p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Text Analytics & Statistics
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
          Comprehensive text analysis with statistics, sentiment analysis,
          visual charts, and customizable alerts.
        </p>

        <div className="bg-muted/50 rounded-lg p-3 border border-border">
          <p className="text-sm text-muted-foreground mb-1">Example:</p>
          <code className="text-xs sm:text-sm font-mono break-words">
            "This is a sample text for analysis. It contains multiple sentences
            and provides various statistics like word count, readability, and
            sentiment analysis."
          </code>
        </div>
      </div>
      {/* END Header */}

      {/* Alerts */}
      {stats.alerts.length > 0 && (
        <div className="mb-6 space-y-2">
          {stats.alerts.map((alert, index) => (
            <Alert
              key={index}
              className={
                alert.type === "warning"
                  ? "border-destructive/50"
                  : "border-primary/50"
              }
            >
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
      {/* END Alerts */}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">Input Text</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  {stats.characters} chars
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {stats.words} words
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your text here to analyze..."
              className="w-full h-64 p-3 text-sm border border-editor-border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 text-editor custom-scrollbar"
            />
          </CardContent>
        </Card>
        {/* END Input Section */}

        {/* Analysis Tabs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle className="text-base">Analysis Results</CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!inputText}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Copy</span>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!inputText}
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">Reset</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4 text-xs">
                <TabsTrigger value="basic" className="text-xs">
                  Basic
                </TabsTrigger>
                <TabsTrigger value="advanced" className="text-xs">
                  Advanced
                </TabsTrigger>
                <TabsTrigger value="charts" className="text-xs">
                  Charts
                </TabsTrigger>
                <TabsTrigger value="settings" className="text-xs">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Characters:</span>
                      <Badge variant="outline">
                        {stats.characters.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">No spaces:</span>
                      <Badge variant="outline">
                        {stats.charactersNoSpaces.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Words:</span>
                      <Badge variant="outline">
                        {stats.words.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sentences:</span>
                      <Badge variant="outline">
                        {stats.sentences.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Paragraphs:</span>
                      <Badge variant="outline">
                        {stats.paragraphs.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Lines:</span>
                      <Badge variant="outline">
                        {stats.lines.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading:</span>
                      <Badge variant="secondary">{stats.readingTime} min</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Speaking:</span>
                      <Badge variant="secondary">
                        {stats.speakingTime} min
                      </Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-4 space-y-4">
                <div className="space-y-4">
                  {/* Readability & Sentiment */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Readability:
                      </span>
                      <Badge
                        variant={
                          stats.readabilityScore === "Very Easy" ||
                          stats.readabilityScore === "Easy"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {stats.readabilityScore}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sentiment:</span>
                      <Badge
                        variant={
                          stats.sentimentScore > 0
                            ? "secondary"
                            : stats.sentimentScore < 0
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {stats.sentimentScore > 0
                          ? "Positive"
                          : stats.sentimentScore < 0
                          ? "Negative"
                          : "Neutral"}{" "}
                        ({stats.sentimentScore})
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Avg. words/sentence:
                      </span>
                      <Badge variant="outline">
                        {stats.avgWordsPerSentence}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Avg. chars/word:
                      </span>
                      <Badge variant="outline">{stats.avgCharsPerWord}</Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Entities */}
                  {stats.entities.length > 0 && (
                    <>
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">
                          Detected Entities
                        </h4>
                        {stats.entities.map((entity, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <span className="text-muted-foreground">
                              {entity.type}:
                            </span>
                            <Badge variant="outline">{entity.count}</Badge>
                          </div>
                        ))}
                      </div>
                      <Separator />
                    </>
                  )}

                  {/* Themes */}
                  {stats.themes.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Key Themes</h4>
                      {stats.themes.map((theme, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span className="text-muted-foreground">
                            {theme.theme}
                          </span>
                          <Badge variant="outline">{theme.relevance}</Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="charts" className="mt-4 space-y-4">
                {inputText ? (
                  <div className="space-y-6">
                    {/* Word Frequency Chart */}
                    {stats.mostCommonWords.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium mb-3">
                          Word Frequency
                        </h4>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={getChartData(stats.wordFrequency, 8)}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <Tooltip />
                              <Bar dataKey="value" fill="hsl(var(--primary))" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}

                    {/* Character Frequency Chart */}
                    {stats.characterFrequency &&
                      stats.characterFrequency.size > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-3">
                            Character Distribution
                          </h4>
                          <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={getChartData(
                                    stats.characterFrequency,
                                    6
                                  )}
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={60}
                                  fill="hsl(var(--primary))"
                                  dataKey="value"
                                  label={({ name, percent }) =>
                                    `${name} ${(percent * 100).toFixed(0)}%`
                                  }
                                >
                                  {getChartData(
                                    stats.characterFrequency,
                                    6
                                  ).map((_, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enter text to see visual analytics</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="settings" className="mt-4 space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="word-threshold"
                      className="text-sm font-medium"
                    >
                      Word Count Alert Threshold
                    </Label>
                    <Input
                      id="word-threshold"
                      type="number"
                      value={wordCountThreshold}
                      onChange={(e) =>
                        setWordCountThreshold(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="reading-threshold"
                      className="text-sm font-medium"
                    >
                      Reading Time Alert (minutes)
                    </Label>
                    <Input
                      id="reading-threshold"
                      type="number"
                      value={readingTimeThreshold}
                      onChange={(e) =>
                        setReadingTimeThreshold(Number(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <h4 className="text-sm font-medium">Current Alerts</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>• Word count &gt; {wordCountThreshold}</p>
                      <p>• Reading time &gt; {readingTimeThreshold} minutes</p>
                      <p>• Average sentence length &gt; 30 words</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* END Analysis Tabs */}
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
