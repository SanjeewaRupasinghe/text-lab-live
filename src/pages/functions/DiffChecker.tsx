import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface DiffLine {
  type: 'equal' | 'insert' | 'delete';
  value: string;
  lineNumber1?: number;
  lineNumber2?: number;
}

const DiffChecker = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [ignoreCase, setIgnoreCase] = useState(false);

  const preprocessLine = (line: string): string => {
    let processed = line;
    if (ignoreWhitespace) {
      processed = processed.replace(/\s+/g, ' ').trim();
    }
    if (ignoreCase) {
      processed = processed.toLowerCase();
    }
    return processed;
  };

  const computeDiff = (): DiffLine[] => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    
    const processed1 = lines1.map(preprocessLine);
    const processed2 = lines2.map(preprocessLine);
    
    const result: DiffLine[] = [];
    let i = 0, j = 0;
    
    while (i < lines1.length || j < lines2.length) {
      if (i >= lines1.length) {
        result.push({ type: 'insert', value: lines2[j], lineNumber2: j + 1 });
        j++;
      } else if (j >= lines2.length) {
        result.push({ type: 'delete', value: lines1[i], lineNumber1: i + 1 });
        i++;
      } else if (processed1[i] === processed2[j]) {
        result.push({ 
          type: 'equal', 
          value: lines1[i], 
          lineNumber1: i + 1, 
          lineNumber2: j + 1 
        });
        i++;
        j++;
      } else {
        // Look ahead to find matches
        let foundMatch = false;
        for (let k = 1; k <= 3 && j + k < lines2.length; k++) {
          if (processed1[i] === processed2[j + k]) {
            for (let m = 0; m < k; m++) {
              result.push({ type: 'insert', value: lines2[j + m], lineNumber2: j + m + 1 });
            }
            j += k;
            foundMatch = true;
            break;
          }
        }
        
        if (!foundMatch) {
          for (let k = 1; k <= 3 && i + k < lines1.length; k++) {
            if (processed1[i + k] === processed2[j]) {
              for (let m = 0; m < k; m++) {
                result.push({ type: 'delete', value: lines1[i + m], lineNumber1: i + m + 1 });
              }
              i += k;
              foundMatch = true;
              break;
            }
          }
        }
        
        if (!foundMatch) {
          result.push({ type: 'delete', value: lines1[i], lineNumber1: i + 1 });
          result.push({ type: 'insert', value: lines2[j], lineNumber2: j + 1 });
          i++;
          j++;
        }
      }
    }
    
    return result;
  };

  const diff = computeDiff();
  
  const addedCount = diff.filter(d => d.type === 'insert').length;
  const removedCount = diff.filter(d => d.type === 'delete').length;
  const unchangedCount = diff.filter(d => d.type === 'equal').length;

  const copyDiff = () => {
    const diffText = diff.map(line => {
      if (line.type === 'insert') return `+ ${line.value}`;
      if (line.type === 'delete') return `- ${line.value}`;
      return `  ${line.value}`;
    }).join('\n');
    
    navigator.clipboard.writeText(diffText);
    toast.success("Diff copied to clipboard");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card>
        <CardHeader>
          <CardTitle>Diff Checker</CardTitle>
          <CardDescription>Compare two text blocks with visual highlighting of differences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Options */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreWhitespace"
                checked={ignoreWhitespace}
                onCheckedChange={(checked) => setIgnoreWhitespace(checked as boolean)}
              />
              <Label htmlFor="ignoreWhitespace" className="text-sm cursor-pointer">
                Ignore whitespace
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ignoreCase"
                checked={ignoreCase}
                onCheckedChange={(checked) => setIgnoreCase(checked as boolean)}
              />
              <Label htmlFor="ignoreCase" className="text-sm cursor-pointer">
                Ignore case
              </Label>
            </div>
          </div>

          {/* Input Textareas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Original Text</Label>
              <Textarea
                value={text1}
                onChange={(e) => setText1(e.target.value)}
                placeholder="Paste original text here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Modified Text</Label>
              <Textarea
                value={text2}
                onChange={(e) => setText2(e.target.value)}
                placeholder="Paste modified text here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>

          {/* Statistics */}
          {(text1 || text2) && (
            <div className="flex flex-wrap gap-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm">Added: {addedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm">Removed: {removedCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-muted-foreground rounded"></div>
                <span className="text-sm">Unchanged: {unchangedCount}</span>
              </div>
              <Button size="sm" variant="outline" onClick={copyDiff} className="ml-auto">
                <Copy className="w-4 h-4 mr-2" />
                Copy Diff
              </Button>
            </div>
          )}

          {/* Diff Output */}
          {(text1 || text2) && (
            <div className="space-y-2">
              <Label>Differences</Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted/50 p-2 border-b">
                  <span className="text-xs text-muted-foreground">
                    Line-by-line comparison
                  </span>
                </div>
                <div className="max-h-[500px] overflow-auto">
                  {diff.map((line, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-1 font-mono text-sm border-b last:border-b-0 ${
                        line.type === 'insert'
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                          : line.type === 'delete'
                          ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                          : 'bg-background'
                      }`}
                    >
                      <span className="inline-block w-12 text-muted-foreground text-xs mr-2">
                        {line.lineNumber1 || line.lineNumber2 || ''}
                      </span>
                      <span className="inline-block w-6 font-bold">
                        {line.type === 'insert' ? '+' : line.type === 'delete' ? '-' : ' '}
                      </span>
                      <span>{line.value || ' '}</span>
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

export default DiffChecker;
