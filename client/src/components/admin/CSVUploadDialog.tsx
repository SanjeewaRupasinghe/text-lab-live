import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, FileSpreadsheet, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { read, utils } from 'xlsx';
import { useBlogStore } from '@/stores/blogStore';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CSVRow {
  title: string;
  description: string;
  status: 'draft' | 'published';
  author?: string;
  featureImage?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  geoRegion?: string;
  geoPlacename?: string;
  geoPosition?: string;
}

interface ImportStatus {
  row: number;
  title: string;
  status: 'pending' | 'success' | 'error';
  error?: string;
}

export const CSVUploadDialog = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [importing, setImporting] = useState(false);
  const [importStatuses, setImportStatuses] = useState<ImportStatus[]>([]);
  const { createBlog } = useBlogStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith('.csv')) {
      toast.error('Please upload a CSV file');
      return;
    }

    setFile(selectedFile);
    parseCSV(selectedFile);
  };

  const parseCSV = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json<CSVRow>(worksheet);

      if (jsonData.length === 0) {
        toast.error('CSV file is empty');
        return;
      }

      // Validate required fields
      const requiredFields = ['title', 'description', 'status'];
      const firstRow = jsonData[0];
      const missingFields = requiredFields.filter(field => !(field in firstRow));
      
      if (missingFields.length > 0) {
        toast.error(`Missing required fields: ${missingFields.join(', ')}`);
        return;
      }

      setCsvData(jsonData);
      setImportStatuses(jsonData.map((row, index) => ({
        row: index + 1,
        title: row.title || `Row ${index + 1}`,
        status: 'pending'
      })));
      toast.success(`Parsed ${jsonData.length} blogs from CSV`);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      toast.error('Failed to parse CSV file');
    }
  };

  const handleImport = async () => {
    if (csvData.length === 0) return;

    setImporting(true);
    const statuses = [...importStatuses];

    for (let i = 0; i < csvData.length; i++) {
      const row = csvData[i];
      
      try {
        // Prepare blog input
        const blogInput = {
          title: row.title,
          description: row.description,
          status: row.status || 'draft' as 'draft' | 'published',
          featureImage: row.featureImage || null,
          faqs: [],
          metaTags: {
            title: row.metaTitle || row.title,
            description: row.metaDescription || '',
            keywords: row.metaKeywords ? row.metaKeywords.split(',').map(k => k.trim()) : []
          },
          geoTag: (row.geoRegion && row.geoPlacename && row.geoPosition) ? {
            region: row.geoRegion,
            placename: row.geoPlacename,
            position: row.geoPosition
          } : null
        };

        await createBlog(blogInput);
        
        statuses[i] = {
          ...statuses[i],
          status: 'success'
        };
      } catch (error: any) {
        statuses[i] = {
          ...statuses[i],
          status: 'error',
          error: error.message || 'Failed to import'
        };
      }

      setImportStatuses([...statuses]);
    }

    setImporting(false);
    
    const successCount = statuses.filter(s => s.status === 'success').length;
    const errorCount = statuses.filter(s => s.status === 'error').length;
    
    if (errorCount === 0) {
      toast.success(`Successfully imported ${successCount} blogs`);
    } else {
      toast.warning(`Imported ${successCount} blogs, ${errorCount} failed`);
    }
  };

  const handleReset = () => {
    setFile(null);
    setCsvData([]);
    setImportStatuses([]);
    setImporting(false);
  };

  const handleClose = () => {
    if (!importing) {
      handleReset();
      setOpen(false);
    }
  };

  const progress = importStatuses.length > 0 
    ? (importStatuses.filter(s => s.status !== 'pending').length / importStatuses.length) * 100 
    : 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="w-4 h-4 mr-2" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Import Blogs from CSV</DialogTitle>
          <DialogDescription>
            Upload a CSV file with blog data. Required columns: title, description, status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload */}
          {!file && (
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <Input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="max-w-xs mx-auto"
              />
              <p className="text-sm text-muted-foreground mt-2">
                CSV format: title, description, status, author (optional), metaTitle (optional)
              </p>
            </div>
          )}

          {/* Preview & Status */}
          {file && csvData.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span className="font-medium">{file.name}</span>
                  <Badge>{csvData.length} rows</Badge>
                </div>
                {!importing && importStatuses.every(s => s.status === 'pending') && (
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    Clear
                  </Button>
                )}
              </div>

              {/* Progress */}
              {importing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Importing...</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              {/* Status List */}
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-2">
                  {importStatuses.map((status, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">#{status.row}</span>
                        <span className="text-sm font-medium">{status.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {status.status === 'pending' && !importing && (
                          <Badge variant="outline">Pending</Badge>
                        )}
                        {status.status === 'pending' && importing && (
                          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                        )}
                        {status.status === 'success' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        {status.status === 'error' && (
                          <div className="flex items-center gap-2">
                            <XCircle className="w-4 h-4 text-destructive" />
                            <span className="text-xs text-destructive">{status.error}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Actions */}
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  disabled={importing}
                >
                  {importStatuses.some(s => s.status === 'success') ? 'Done' : 'Cancel'}
                </Button>
                {importStatuses.every(s => s.status === 'pending') && (
                  <Button onClick={handleImport} disabled={importing}>
                    {importing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importing...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Import {csvData.length} Blogs
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
