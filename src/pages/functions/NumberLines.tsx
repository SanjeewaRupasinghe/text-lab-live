import { useState } from "react";
import { TextEditor } from "@/components/TextEditor";

const NumberLines = () => {
  const [startNumber, setStartNumber] = useState(1);
  const [format, setFormat] = useState<'number' | 'bullet'>('number');

  const transformText = (text: string) => {
    if (!text.trim()) return "";
    
    const lines = text.split('\n');
    const numberedLines = lines.map((line, index) => {
      if (format === 'number') {
        return `${startNumber + index}. ${line}`;
      } else {
        return `• ${line}`;
      }
    });
    return numberedLines.join('\n');
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Format:</label>
            <div className="flex gap-2">
              <button
                onClick={() => setFormat('number')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  format === 'number' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                Numbers
              </button>
              <button
                onClick={() => setFormat('bullet')}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  format === 'bullet' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                Bullets
              </button>
            </div>
          </div>
          
          {format === 'number' && (
            <div>
              <label className="block text-sm font-medium mb-2">Start Number:</label>
              <input
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                className="w-20 px-2 py-1.5 border border-border rounded-md bg-background"
              />
            </div>
          )}
        </div>
      </div>

      <TextEditor
        title="Number Lines"
        description="Add line numbers or bullet points to each line of text."
        example="Input: First line\nSecond line\nThird line → Output: 1. First line\n2. Second line\n3. Third line"
        transform={transformText}
        storageKey="number-lines"
      />
    </div>
  );
};

export default NumberLines;