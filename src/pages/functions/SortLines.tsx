import { useState } from "react";
import { TextEditor } from "@/components/TextEditor";

const SortLines = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const transformText = (text: string) => {
    if (!text.trim()) return "";
    
    const lines = text.split('\n');
    const sortedLines = [...lines].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
    return sortedLines.join('\n');
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4 mb-4">
          <label className="block text-sm font-medium">Sort Order:</label>
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sortOrder === 'asc' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Ascending (A-Z)
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sortOrder === 'desc' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              Descending (Z-A)
            </button>
          </div>
        </div>
      </div>

      <TextEditor
        title="Sort Lines"
        description="Sort text lines alphabetically in ascending or descending order."
        example="Input: zebra\napple\nbanana\ncat → Output: apple\nbanana\ncat\nzebra"
        transform={transformText}
        storageKey="sort-lines"
      />
    </div>
  );
};

export default SortLines;