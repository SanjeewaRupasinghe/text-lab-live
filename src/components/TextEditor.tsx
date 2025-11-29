import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Copy, Download, RotateCcw, FileDown, Star, StarOff, SplitSquareHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { FAQ } from "@/components/FAQ";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface TextEditorProps {
  title: string;
  description: string;
  example: string;
  transform: (text: string) => string;
  storageKey: string;
}

export const TextEditor = ({ title, description, example, transform, storageKey }: TextEditorProps) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [comparisonView, setComparisonView] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedPref = localStorage.getItem('text-transformer-comparison-view');
    if (savedPref === 'true') setComparisonView(true);
  }, []);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('text-transformer-bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(window.location.pathname));
  }, []);

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem('text-transformer-bookmarks') || '[]');
    const currentPath = window.location.pathname;
    const newBookmarks = isBookmarked ? bookmarks.filter((path: string) => path !== currentPath) : [...bookmarks, currentPath];
    localStorage.setItem('text-transformer-bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
    toast({ title: isBookmarked ? "Bookmark removed" : "Bookmark added" });
  };

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const { input, timestamp } = JSON.parse(saved);
        if (Date.now() - timestamp < 7 * 24 * 60 * 60 * 1000) {
          setInputText(input);
          setOutputText(transform(input));
        }
      } catch (e) {}
    }
  }, [storageKey, transform]);

  useEffect(() => {
    if (inputText) {
      setOutputText(transform(inputText));
      localStorage.setItem(storageKey, JSON.stringify({ input: inputText, timestamp: Date.now() }));
    } else {
      setOutputText("");
    }
  }, [inputText, transform, storageKey]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast({ title: "Copied to clipboard" });
    } catch { toast({ title: "Copy failed", variant: "destructive" }); }
  };

  const handleDownload = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-output.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Download started" });
  };

  const handleReset = () => {
    setInputText("");
    setOutputText("");
    localStorage.removeItem(storageKey);
    toast({ title: "Reset complete" });
  };

  const toggleComparisonView = () => {
    const newValue = !comparisonView;
    setComparisonView(newValue);
    localStorage.setItem('text-transformer-comparison-view', String(newValue));
    toast({ title: newValue ? "Comparison view enabled" : "Comparison view disabled" });
  };

  const getStats = (text: string) => {
    if (!text) return { chars: 0, words: 0, lines: 0, sentences: 0 };
    return {
      chars: text.length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text.split('\n').length,
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    };
  };

  const inputStats = getStats(inputText);
  const outputStats = getStats(outputText);

  return (
    <div className="p-3 sm:p-6">
      <div className="mb-6">
        <div className="flex items-start justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={toggleComparisonView} title={comparisonView ? "Stacked view" : "Comparison view"}>
              <SplitSquareHorizontal className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleBookmark}>
              {isBookmarked ? <Star className="w-5 h-5 fill-current text-yellow-500" /> : <StarOff className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">{description}</p>
        {example && (
          <div className="bg-muted/50 rounded-lg p-3 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Example:</p>
            <code className="text-xs sm:text-sm font-mono break-words">{example}</code>
          </div>
        )}
      </div>

      {comparisonView ? (
        <Card>
          <CardContent className="p-6">
            <ResizablePanelGroup direction="horizontal" className="min-h-[500px] rounded-lg border">
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full flex flex-col p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Input</label>
                    <div className="flex gap-2"><Badge variant="outline" className="text-xs">{inputStats.chars} chars</Badge><Badge variant="outline" className="text-xs">{inputStats.words} words</Badge></div>
                  </div>
                  <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste or type..." className="flex-1 w-full p-4 rounded-md border bg-background resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={30}>
                <div className="h-full flex flex-col p-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">Output</label>
                    <div className="flex gap-2"><Badge variant="outline" className="text-xs">{outputStats.chars} chars</Badge><Badge variant="outline" className="text-xs">{outputStats.words} words</Badge><Button variant="outline" size="sm" onClick={handleCopy} disabled={!outputText}><Copy className="w-3 h-3 mr-1" />Copy</Button><Button variant="outline" size="sm" onClick={handleDownload} disabled={!outputText}><Download className="w-3 h-3 mr-1" />Download</Button></div>
                  </div>
                  <textarea value={outputText} readOnly placeholder="Output..." className="flex-1 w-full p-4 rounded-md border bg-muted resize-none font-mono text-sm" />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
            <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground"><div>Lines: {inputStats.lines} → {outputStats.lines}</div><div>Sentences: {inputStats.sentences} → {outputStats.sentences}</div></div>
            <div className="flex justify-center mt-4"><Button variant="outline" onClick={handleReset}><RotateCcw className="w-4 h-4 mr-2" />Reset</Button></div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card><CardHeader className="pb-3"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><CardTitle className="text-base">Input Text</CardTitle><div className="flex gap-2 flex-wrap"><Badge variant="outline" className="text-xs">{inputStats.chars} chars</Badge><Badge variant="outline" className="text-xs">{inputStats.words} words</Badge></div></div></CardHeader><CardContent className="p-3 sm:p-6"><textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste or type..." className="w-full h-64 p-3 text-sm border rounded-md bg-editor-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50" /></CardContent></Card>
            <Card><CardHeader className="pb-3"><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><CardTitle className="text-base">Output Text</CardTitle><div className="flex flex-wrap gap-2"><Badge variant="outline" className="text-xs">{outputStats.chars} chars</Badge><Badge variant="outline" className="text-xs">{outputStats.words} words</Badge><div className="flex gap-1"><Button size="sm" variant="outline" onClick={handleCopy} disabled={!outputText}><Copy className="w-3 h-3 mr-1" /><span className="hidden sm:inline">Copy</span></Button><Button size="sm" variant="outline" onClick={handleDownload} disabled={!outputText}><Download className="w-3 h-3 mr-1" /><span className="hidden sm:inline">Download</span></Button></div></div></div></CardHeader><CardContent className="p-3 sm:p-6"><textarea value={outputText} readOnly placeholder="Output..." className="w-full h-64 p-3 text-sm border rounded-md bg-editor-background text-foreground resize-none" /></CardContent></Card>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-6 text-sm text-muted-foreground"><div>Lines: {inputStats.lines} → {outputStats.lines}</div><div>Sentences: {inputStats.sentences} → {outputStats.sentences}</div></div><Button variant="outline" onClick={handleReset}><RotateCcw className="w-4 h-4 mr-2" />Reset</Button></div>
        </>
      )}
      <FAQ />
    </div>
  );
};
