import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Info } from "lucide-react";
import { toast } from "sonner";

interface Match {
  match: string;
  index: number;
  groups: string[];
}

const COMMON_PATTERNS = [
  { name: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "" },
  { name: "URL", pattern: "https?://[^\\s]+", flags: "g" },
  { name: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { name: "IP Address", pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", flags: "g" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-\\d{2}-\\d{2}", flags: "g" },
  { name: "Hex Color", pattern: "#[0-9A-Fa-f]{6}\\b", flags: "g" },
  { name: "Credit Card", pattern: "\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}[\\s-]?\\d{4}", flags: "g" },
  { name: "Username", pattern: "@[a-zA-Z0-9_]{3,}", flags: "g" },
  { name: "Hashtag", pattern: "#[a-zA-Z0-9_]+", flags: "g" },
  { name: "HTML Tag", pattern: "<[^>]+>", flags: "g" },
];

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
    y: false,
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string>("");

  const getFlagsString = () => {
    return Object.entries(flags)
      .filter(([_, value]) => value)
      .map(([key]) => key)
      .join('');
  };

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, getFlagsString());
      const foundMatches: Match[] = [];
      
      if (flags.g) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          
          // Prevent infinite loop
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }
      
      setMatches(foundMatches);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid regular expression");
      setMatches([]);
    }
  }, [pattern, testString, flags]);

  const loadPattern = (value: string) => {
    const selectedPattern = COMMON_PATTERNS.find(p => p.name === value);
    if (selectedPattern) {
      setPattern(selectedPattern.pattern);
      setFlags({
        g: selectedPattern.flags.includes('g'),
        i: selectedPattern.flags.includes('i'),
        m: selectedPattern.flags.includes('m'),
        s: selectedPattern.flags.includes('s'),
        u: selectedPattern.flags.includes('u'),
        y: selectedPattern.flags.includes('y'),
      });
    }
  };

  const highlightMatches = () => {
    if (matches.length === 0 || !testString) return testString;
    
    let lastIndex = 0;
    const parts: JSX.Element[] = [];
    
    matches.forEach((match, idx) => {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${idx}`}>
            {testString.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      parts.push(
        <mark
          key={`match-${idx}`}
          className="bg-yellow-300 dark:bg-yellow-600 rounded px-1"
        >
          {match.match}
        </mark>
      );
      
      lastIndex = match.index + match.match.length;
    });
    
    if (lastIndex < testString.length) {
      parts.push(
        <span key="text-end">
          {testString.substring(lastIndex)}
        </span>
      );
    }
    
    return parts;
  };

  const copyRegex = () => {
    const regexString = `/${pattern}/${getFlagsString()}`;
    navigator.clipboard.writeText(regexString);
    toast.success("Regex pattern copied");
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>Regex Tester</CardTitle>
          <CardDescription>Test and build regular expression patterns with live matching</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common Patterns */}
          <div className="space-y-2">
            <Label>Quick Start - Common Patterns</Label>
            <Select onValueChange={loadPattern}>
              <SelectTrigger>
                <SelectValue placeholder="Select a common pattern..." />
              </SelectTrigger>
              <SelectContent>
                {COMMON_PATTERNS.map((p) => (
                  <SelectItem key={p.name} value={p.name}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pattern Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Regular Expression Pattern</Label>
              {pattern && (
                <Button size="sm" variant="ghost" onClick={copyRegex}>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">/</span>
              <Input
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="font-mono"
              />
              <span className="text-muted-foreground">/</span>
              <span className="font-mono text-sm text-muted-foreground min-w-[60px]">
                {getFlagsString()}
              </span>
            </div>
            {error && (
              <div className="text-sm text-red-500 flex items-center gap-2">
                <Info className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          {/* Flags */}
          <div className="space-y-2">
            <Label>Flags</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-g"
                  checked={flags.g}
                  onCheckedChange={(checked) => setFlags({ ...flags, g: checked as boolean })}
                />
                <Label htmlFor="flag-g" className="text-sm cursor-pointer">
                  <span className="font-mono font-bold">g</span> - Global
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-i"
                  checked={flags.i}
                  onCheckedChange={(checked) => setFlags({ ...flags, i: checked as boolean })}
                />
                <Label htmlFor="flag-i" className="text-sm cursor-pointer">
                  <span className="font-mono font-bold">i</span> - Ignore Case
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-m"
                  checked={flags.m}
                  onCheckedChange={(checked) => setFlags({ ...flags, m: checked as boolean })}
                />
                <Label htmlFor="flag-m" className="text-sm cursor-pointer">
                  <span className="font-mono font-bold">m</span> - Multiline
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-s"
                  checked={flags.s}
                  onCheckedChange={(checked) => setFlags({ ...flags, s: checked as boolean })}
                />
                <Label htmlFor="flag-s" className="text-sm cursor-pointer">
                  <span className="font-mono font-bold">s</span> - Dot All
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-u"
                  checked={flags.u}
                  onCheckedChange={(checked) => setFlags({ ...flags, u: checked as boolean })}
                />
                <Label htmlFor="flag-u" className="text-sm cursor-pointer">
                  <span className="font-mono font-bold">u</span> - Unicode
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flag-y"
                  checked={flags.y}
                  onCheckedChange={(checked) => setFlags({ ...flags, y: checked as boolean })}
                />
                <Label htmlFor="flag-y" className="text-sm cursor-pointer">
                  <span className="font-mono font-bold">y</span> - Sticky
                </Label>
              </div>
            </div>
          </div>

          {/* Test String */}
          <div className="space-y-2">
            <Label>Test String</Label>
            <Textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="Enter text to test your regex pattern..."
              className="min-h-[150px] font-mono text-sm"
            />
          </div>

          {/* Matches Summary */}
          {pattern && testString && !error && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant={matches.length > 0 ? "default" : "secondary"}>
                  {matches.length} {matches.length === 1 ? 'match' : 'matches'} found
                </Badge>
              </div>
            </div>
          )}

          {/* Highlighted Output */}
          {testString && pattern && !error && (
            <div className="space-y-2">
              <Label>Highlighted Matches</Label>
              <div className="border rounded-lg p-4 bg-muted/30 font-mono text-sm whitespace-pre-wrap break-words">
                {highlightMatches()}
              </div>
            </div>
          )}

          {/* Match Details */}
          {matches.length > 0 && (
            <div className="space-y-2">
              <Label>Match Details</Label>
              <div className="border rounded-lg overflow-hidden">
                <div className="max-h-[300px] overflow-auto">
                  {matches.map((match, idx) => (
                    <div
                      key={idx}
                      className="p-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              Match {idx + 1}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Index: {match.index}
                            </span>
                          </div>
                          <div className="font-mono text-sm bg-muted px-2 py-1 rounded">
                            {match.match}
                          </div>
                          {match.groups.length > 0 && (
                            <div className="mt-2 space-y-1">
                              <span className="text-xs text-muted-foreground">Capture Groups:</span>
                              {match.groups.map((group, groupIdx) => (
                                <div key={groupIdx} className="font-mono text-xs bg-muted/50 px-2 py-1 rounded">
                                  ${groupIdx + 1}: {group}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
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

export default RegexTester;
