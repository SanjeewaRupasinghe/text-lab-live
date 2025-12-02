import { useEffect, useState } from "react";
import {
  Copy,
  Download,
  Database,
  Check,
  ChevronsUpDown,
  Star,
  StarOff,
} from "lucide-react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { DataType } from "@/data/SampleDataGeneratorData";
import { dataTemplates } from "@/data/SampleDataGeneratorData";
import { FAQ } from "@/components/FAQ";
import { sampleDataGeneratorFaqs } from "@/data/faq/generator-faq";
import { toggleBookmark } from "@/lib/textEditorUtils";
import { FaqType } from "@/types/faq.type";

export default function SampleDataGenerator() {
  const [dataType, setDataType] = useState<DataType>("user");
  const [count, setCount] = useState<number>(10);
  const [generatedData, setGeneratedData] = useState<any[]>([]);
  const [output, setOutput] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const generateData = () => {
    const template = dataTemplates[dataType];
    const data = Array.from({ length: count }, () => template.generator());
    setGeneratedData(data);
    setOutput(JSON.stringify(data, null, 2));
  };

  const copyToClipboard = async (text: string, format: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${format} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        variant: "destructive",
      });
    }
  };

  const downloadFile = (
    content: string,
    filename: string,
    mimeType: string
  ) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyObject = () => {
    if (generatedData.length > 0) {
      copyToClipboard(JSON.stringify(generatedData[0], null, 2), "Object");
    }
  };

  const handleDownloadObject = () => {
    if (generatedData.length > 0) {
      downloadFile(
        JSON.stringify(generatedData[0], null, 2),
        "sample-object.json",
        "application/json"
      );
    }
  };

  const handleCopyArray = () => {
    copyToClipboard(JSON.stringify(generatedData, null, 2), "Array");
  };

  const handleDownloadArray = () => {
    downloadFile(
      JSON.stringify(generatedData, null, 2),
      "sample-array.json",
      "application/json"
    );
  };

  const handleCopyJSON = () => {
    copyToClipboard(output, "JSON");
  };

  const handleDownloadJSON = () => {
    downloadFile(output, "sample-data.json", "application/json");
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            const stringValue = Array.isArray(value)
              ? value.join("; ")
              : String(value);
            return `"${stringValue.replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];

    return csvRows.join("\n");
  };

  const handleCopyCSV = () => {
    const csv = convertToCSV(generatedData);
    copyToClipboard(csv, "CSV");
  };

  const handleDownloadCSV = () => {
    const csv = convertToCSV(generatedData);
    downloadFile(csv, "sample-data.csv", "text/csv");
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(generatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "sample-data.xlsx");

    toast({
      title: "Downloaded!",
      description: "Excel file downloaded successfully",
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
  const faqs: FaqType[]  = sampleDataGeneratorFaqs;

  return (
    <div className="container max-w-6xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Database className="w-6 h-6 text-primary" />
              <CardTitle>Sample Data Generator</CardTitle>
            </div>
            <div>
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
          </div>
          <CardDescription>
            Generate realistic dummy data for testing and development with
            multiple export formats
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {/* Data Type  */}
            <div className="grid gap-2">
              <Label htmlFor="dataType">Data Type</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                  >
                    {dataType
                      ? dataTemplates[dataType].label
                      : "Select data type..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-[var(--radix-popover-trigger-width)] max-h-[300px] p-0 bg-white"
                  align="start"
                >
                  <Command>
                    <CommandInput placeholder="Search data type..." />
                    <CommandList>
                      <CommandEmpty>No data type found.</CommandEmpty>
                      <CommandGroup>
                        {Object.entries(dataTemplates).map(
                          ([key, template]) => (
                            <CommandItem
                              key={key}
                              value={template.label}
                              className="bg-white"
                              onSelect={() => {
                                setDataType(key as DataType);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  dataType === key ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {template.label}
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* END Data Type  */}

            {/* Number of Entries  */}
            <div className="grid gap-2">
              <Label htmlFor="count">Number of Entries</Label>
              <Input
                id="count"
                type="number"
                min="1"
                max="1000"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              />
            </div>
            {/* END Number of Entries  */}

            {/* Generate button */}
            <Button onClick={generateData} className="w-full">
              Generate Sample Data
            </Button>
            {/* END Generate button */}
          </div>
        </CardContent>
      </Card>

      {/* Generated Data */}
      {generatedData.length > 0 && (
        <>
          <Card>
            <CardContent className="pt-6">
              {/* Export Options */}
              <div className="grid gap-4">
                <Label>Export Options</Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {/* Copy Object */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyObject}
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Object
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadObject}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* END Copy Object */}

                  {/* Copy Array */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyArray}
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Array
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadArray}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* END Copy Array */}

                  {/* Copy JSON */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyJSON}
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy JSON
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadJSON}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* END Copy JSON */}

                  {/* Copy CSV */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyCSV}
                      className="flex-1"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy CSV
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadCSV}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                  {/* END Copy CSV */}

                  {/* Download Excel */}
                  <div className="flex gap-2 sm:col-span-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadExcel}
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Excel
                    </Button>
                  </div>
                  {/* END Download Excel */}
                </div>
              </div>
              {/* END Export Options */}
            </CardContent>
          </Card>

          {/* Generated Data Preview */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-2">
                <Label>Generated Data Preview</Label>
                <Textarea
                  value={output}
                  readOnly
                  className="font-mono text-xs min-h-[400px]"
                />
                <p className="text-sm text-muted-foreground">
                  Generated {generatedData.length}{" "}
                  {generatedData.length === 1 ? "entry" : "entries"}
                </p>
              </div>
            </CardContent>
          </Card>
          {/* Generated Data Preview */}
        </>
      )}
      {/* END Generated Data */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
}
