import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, Copy, Download, Star, StarOff } from "lucide-react";
import { toast } from "sonner";
import { FAQ } from "@/components/FAQ";
import { FaqType } from "@/types/faq.type";
import { csvJsonConverterFaqs } from "@/data/faq/conversion-tool-faq";
import { toggleBookmark } from "@/lib/textEditorUtils";

const CsvJsonConverter = () => {
  // States
  const [csvInput, setCsvInput] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeaders, setHasHeaders] = useState(true);
  const [prettyPrint, setPrettyPrint] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);

  const parseCsv = (csv: string): any[] => {
    const lines = csv.trim().split("\n");
    // Validate
    if (lines.length === 0) return [];

    const parseRow = (row: string): string[] => {
      // Variables
      const result: string[] = [];
      let current = "";
      let inQuotes = false;

      // Loop
      for (let i = 0; i < row.length; i++) {
        const char = row[i];

        if (char === '"') {
          if (inQuotes && row[i + 1] === '"') {
            // Append
            current += '"';
            i++;
          } else {
            // Toggle
            inQuotes = !inQuotes;
          }
        } else if (char === delimiter && !inQuotes) {
          // Push
          result.push(current.trim());
          current = "";
        } else {
          // Append
          current += char;
        }
      }

      // Push
      result.push(current.trim());
      return result;
    };

    // Parse
    const rows = lines.map(parseRow);

    if (hasHeaders && rows.length > 0) {
      const headers = rows[0];
      return rows.slice(1).map((row) => {
        // With headers
        const obj: any = {};
        headers.forEach((header, idx) => {
          obj[header] = row[idx] || "";
        });
        return obj;
      });
    } else {
      // Without headers
      return rows.map((row) => {
        const obj: any = {};
        row.forEach((value, idx) => {
          obj[`column_${idx + 1}`] = value;
        });
        return obj;
      });
    }
  };

  // Convert to JSON
  const convertCsvToJson = () => {
    try {
      // Validate
      if (!csvInput.trim()) {
        setError("Please enter CSV data");
        setOutput("");
        return;
      }

      // Parse
      const data = parseCsv(csvInput);
      const json = prettyPrint
        ? JSON.stringify(data, null, 2)
        : JSON.stringify(data);

      // Set
      setOutput(json);
      setError("");
      toast.success("Converted to JSON");
    } catch (e) {
      // Error
      setError(e instanceof Error ? e.message : "Failed to parse CSV");
      setOutput("");
    }
  };

  // Convert to CSV
  const convertJsonToCsv = () => {
    try {
      // Validate
      if (!jsonInput.trim()) {
        setError("Please enter JSON data");
        setOutput("");
        return;
      }

      // Parse
      const data = JSON.parse(jsonInput);

      // Validate
      if (!Array.isArray(data)) {
        throw new Error("JSON must be an array of objects");
      }

      // Validate
      if (data.length === 0) {
        setOutput("");
        setError("");
        return;
      }

      // Get all unique keys
      const keys = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));

      // Escape value
      const escapeValue = (value: any): string => {
        const str = String(value ?? "");
        if (
          str.includes(delimiter) ||
          str.includes('"') ||
          str.includes("\n")
        ) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      let csv = "";

      if (hasHeaders) {
        csv += keys.map(escapeValue).join(delimiter) + "\n";
      }

      // Add rows
      csv += data
        .map((row) => keys.map((key) => escapeValue(row[key])).join(delimiter))
        .join("\n");

      // Set
      setOutput(csv);
      setError("");
      toast.success("Converted to CSV");
    } catch (e) {
      // Error
      setError(e instanceof Error ? e.message : "Failed to parse JSON");
      setOutput("");
    }
  };

  // Copy output
  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  // Download output
  const downloadOutput = (filename: string) => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

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
    toast.success(newState ? "Bookmark added" : "Bookmark removed");
  };

  // FAQs
  const faqs: FaqType[] = csvJsonConverterFaqs;

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            CSV ↔ JSON Converter
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
          </CardTitle>
          <CardDescription>
            Transform between CSV and JSON formats with customizable options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="csv-to-json" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv-to-json">CSV → JSON</TabsTrigger>
              <TabsTrigger value="json-to-csv">JSON → CSV</TabsTrigger>
            </TabsList>

            {/* CSV to JSON */}
            <TabsContent value="csv-to-json" className="space-y-6">
              <div className="space-y-4">
                {/* Options */}
                <div className="flex flex-wrap gap-6 p-4 bg-muted rounded-lg">
                  {/* Delimiter */}
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="csv-delimiter"
                      className="text-sm whitespace-nowrap"
                    >
                      Delimiter:
                    </Label>
                    <Input
                      id="csv-delimiter"
                      value={delimiter}
                      onChange={(e) => setDelimiter(e.target.value.slice(0, 1))}
                      className="w-16 text-center"
                      maxLength={1}
                    />
                  </div>
                  {/* END Delimiter */}

                  {/* Has Headers */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="csv-has-headers"
                      checked={hasHeaders}
                      onCheckedChange={(checked) =>
                        setHasHeaders(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="csv-has-headers"
                      className="text-sm cursor-pointer"
                    >
                      First row is header
                    </Label>
                  </div>
                  {/* END Has Headers */}

                  {/* Pretty Print */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="csv-pretty-print"
                      checked={prettyPrint}
                      onCheckedChange={(checked) =>
                        setPrettyPrint(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="csv-pretty-print"
                      className="text-sm cursor-pointer"
                    >
                      Pretty print JSON
                    </Label>
                  </div>
                  {/* END Pretty Print */}
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <Label>CSV Input</Label>
                  <Textarea
                    value={csvInput}
                    onChange={(e) => setCsvInput(e.target.value)}
                    placeholder="name,email,age&#10;John Doe,john@example.com,30&#10;Jane Smith,jane@example.com,25"
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>

                {/* Convert Button */}
                <Button onClick={convertCsvToJson} className="w-full">
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Convert CSV to JSON
                </Button>
              </div>
            </TabsContent>

            {/* JSON to CSV */}
            <TabsContent value="json-to-csv" className="space-y-6">
              <div className="space-y-4">
                {/* Options */}
                <div className="flex flex-wrap gap-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2">
                    {/* Delimiter */}
                    <Label
                      htmlFor="json-delimiter"
                      className="text-sm whitespace-nowrap"
                    >
                      Delimiter:
                    </Label>
                    <Input
                      id="json-delimiter"
                      value={delimiter}
                      onChange={(e) => setDelimiter(e.target.value.slice(0, 1))}
                      className="w-16 text-center"
                      maxLength={1}
                    />
                  </div>
                  {/* END Delimiter */}

                  {/* Has Headers */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="json-has-headers"
                      checked={hasHeaders}
                      onCheckedChange={(checked) =>
                        setHasHeaders(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="json-has-headers"
                      className="text-sm cursor-pointer"
                    >
                      Include header row
                    </Label>
                  </div>
                  {/* END Has Headers */}
                </div>

                {/* Input */}
                <div className="space-y-2">
                  <Label>JSON Input</Label>
                  <Textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder='[{"name": "John Doe", "email": "john@example.com", "age": 30}, {"name": "Jane Smith", "email": "jane@example.com", "age": 25}]'
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                {/* END Input */}

                {/* Convert Button */}
                <Button onClick={convertJsonToCsv} className="w-full">
                  <ArrowLeftRight className="w-4 h-4 mr-2" />
                  Convert JSON to CSV
                </Button>
                {/* END Convert Button */}
              </div>
            </TabsContent>
          </Tabs>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/10 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* END Error */}

          {/* Output */}
          {output && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Output</Label>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={copyOutput}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      downloadOutput(
                        output.startsWith("{") || output.startsWith("[")
                          ? "output.json"
                          : "output.csv"
                      )
                    }
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                value={output}
                readOnly
                className="min-h-[300px] font-mono text-sm"
              />
              <div className="flex gap-2">
                <Badge variant="outline">
                  {output.split("\n").length} lines
                </Badge>
                <Badge variant="outline">{output.length} characters</Badge>
              </div>
            </div>
          )}
          {/* END Output */}
        </CardContent>
      </Card>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default CsvJsonConverter;
