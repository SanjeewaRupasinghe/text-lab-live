import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Type, Star, StarOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";
import { loremGeneratorFaqs } from "@/data/faq/generator-faq";
import { copyToClipboard, toggleBookmark } from "@/lib/textEditorUtils";
import { FaqType } from "@/types/faq.type";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "at",
  "vero",
  "eos",
  "accusamus",
  "accusantium",
  "doloremque",
  "laudantium",
  "totam",
  "rem",
  "aperiam",
  "eaque",
  "ipsa",
  "quae",
  "ab",
  "illo",
  "inventore",
  "veritatis",
  "et",
  "quasi",
  "architecto",
  "beatae",
  "vitae",
  "dicta",
  "explicabo",
  "nemo",
  "ipsam",
  "quia",
  "voluptas",
  "aspernatur",
  "aut",
  "odit",
  "fugit",
  "consequuntur",
  "magni",
  "dolores",
  "ratione",
  "sequi",
  "nesciunt",
];

const RANDOM_WORDS = [
  "adventure",
  "beautiful",
  "creative",
  "discovery",
  "elegant",
  "fantastic",
  "gorgeous",
  "harmony",
  "innovation",
  "journey",
  "kindness",
  "luminous",
  "magnificent",
  "nature",
  "opportunity",
  "peaceful",
  "quantum",
  "radiant",
  "sunshine",
  "tranquil",
  "universe",
  "vibrant",
  "wonderful",
  "xenial",
  "yearning",
  "zenith",
  "amazing",
  "brilliant",
  "charming",
  "delightful",
  "enchanting",
  "fabulous",
  "graceful",
  "heartwarming",
  "inspiring",
  "joyful",
  "kaleidoscope",
  "lovely",
  "marvelous",
  "nostalgic",
];

export default function LoremGenerator() {
  // State
  const [output, setOutput] = useState("");
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [textType, setTextType] = useState("lorem");
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Generate random text
  const generateRandomText = () => {
    const wordList = textType === "lorem" ? LOREM_WORDS : RANDOM_WORDS;
    let result = "";

    switch (type) {
      case "words":
        const words = [];
        for (let i = 0; i < count; i++) {
          words.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }
        result = words.join(" ");
        break;

      case "sentences":
        const sentences = [];
        for (let i = 0; i < count; i++) {
          const sentenceLength = Math.floor(Math.random() * 15) + 8;
          const sentenceWords = [];

          for (let j = 0; j < sentenceLength; j++) {
            sentenceWords.push(
              wordList[Math.floor(Math.random() * wordList.length)]
            );
          }

          let sentence = sentenceWords.join(" ");
          sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
          sentences.push(sentence);
        }
        result = sentences.join(" ");
        break;

      case "paragraphs":
        const paragraphs = [];
        for (let p = 0; p < count; p++) {
          const sentences = [];
          const sentenceCount = Math.floor(Math.random() * 5) + 3;

          for (let s = 0; s < sentenceCount; s++) {
            const sentenceLength = Math.floor(Math.random() * 15) + 8;
            const sentenceWords = [];

            // First sentence of first paragraph starts with Lorem ipsum if enabled
            if (p === 0 && s === 0 && startWithLorem && textType === "lorem") {
              sentenceWords.push("Lorem", "ipsum");
              for (let j = 2; j < sentenceLength; j++) {
                sentenceWords.push(
                  wordList[Math.floor(Math.random() * wordList.length)]
                );
              }
            } else {
              for (let j = 0; j < sentenceLength; j++) {
                sentenceWords.push(
                  wordList[Math.floor(Math.random() * wordList.length)]
                );
              }
            }

            let sentence = sentenceWords.join(" ");
            sentence =
              sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
            sentences.push(sentence);
          }
          paragraphs.push(sentences.join(" "));
        }
        result = paragraphs.join("\n\n");
        break;
    }

    setOutput(result);
  };

  // Handle copy
  const handleCopy = async () => {
    await copyToClipboard(output);
    toast({
      title: "Copied to clipboard",
      description: "Generated text has been copied to your clipboard.",
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
  const faqs: FaqType[] = loremGeneratorFaqs;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">Text Generator</h1>
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
        </div>
        <p className="text-muted-foreground">
          Generate Lorem Ipsum text or random words for placeholder content,
          mockups, and testing.
        </p>
      </div>
      {/* END Header */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Generation Options</CardTitle>
              <CardDescription>
                Customize your text generation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Text Type */}
              <div>
                <Label htmlFor="textType">Text Type</Label>
                <Select value={textType} onValueChange={setTextType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lorem">
                      Lorem Ipsum (Classical)
                    </SelectItem>
                    <SelectItem value="random">
                      Random Words (Modern)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* END Text Type */}

              {/* Generate */}
              <div>
                <Label htmlFor="type">Generate</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="sentences">Sentences</SelectItem>
                    <SelectItem value="paragraphs">Paragraphs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* END Generate */}

              {/* Number of */}
              <div>
                <Label htmlFor="count">Number of {type}</Label>
                <Input
                  id="count"
                  type="number"
                  value={count}
                  onChange={(e) =>
                    setCount(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  min="1"
                  max="100"
                />
              </div>
              {/* END Number of */}

              {/* Start with Lorem */}
              {textType === "lorem" && type === "paragraphs" && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="startWithLorem"
                    checked={startWithLorem}
                    onCheckedChange={setStartWithLorem}
                  />
                  <Label htmlFor="startWithLorem">
                    Start with "Lorem ipsum"
                  </Label>
                </div>
              )}
              {/* END Start with Lorem */}

              {/* Generate Button */}
              <div className="flex gap-2">
                <Button onClick={generateRandomText} className="flex-1">
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
              {/* END Generate Button */}
            </CardContent>
          </Card>
        </div>
        {/* END Controls */}

        {/* Output */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Generated Text</CardTitle>
              <CardDescription>Your generated lorem ipsum text</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                placeholder="Generated text will appear here..."
                className="w-full h-64 p-3 text-sm border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <div className="mt-2 text-sm text-muted-foreground">
                Characters: {output.length} | Words:{" "}
                {output.trim() ? output.trim().split(/\s+/).length : 0}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* END Output */}
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
