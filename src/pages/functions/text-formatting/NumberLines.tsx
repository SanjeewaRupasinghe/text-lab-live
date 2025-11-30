import { useState } from "react";
import { TextEditor } from "@/components/TextEditor";
import { FAQ } from "@/components/FAQ";
import { FaqType } from "@/types/faq.type";
import { numberLinesFaqs } from "@/data/faq/text-formatting-faq";

const NumberLines = () => {
  const [startNumber, setStartNumber] = useState(1);
  const [format, setFormat] = useState<"number" | "bullet">("number");

  const transformText = (text: string) => {
    // Validate
    if (!text.trim()) return "";

    const lines = text.split("\n");
    const numberedLines = lines.map((line, index) => {
      if (format === "number") {
        // Number format
        return `${startNumber + index}. ${line}`;
      } else {
        // Bullet format
        return `• ${line}`;
      }
    });
    return numberedLines.join("\n");
  };

  // Get faqs
  const faqs: FaqType[] = numberLinesFaqs;

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-6xl">
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Format:</label>
            <div className="flex gap-2">
              {/* Number format */}
              <button
                onClick={() => setFormat("number")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  format === "number"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Numbers
              </button>
              {/* END Number format */}

              {/* Bullet format */}
              <button
                onClick={() => setFormat("bullet")}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  format === "bullet"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                Bullets
              </button>
              {/* END Bullet format */}
            </div>
          </div>

          {/* Start number */}
          {format === "number" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Start Number:
              </label>
              <input
                type="number"
                value={startNumber}
                onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                className="w-20 px-2 py-1.5 border border-border rounded-md bg-background"
              />
            </div>
          )}
          {/* END Start number */}
        </div>
      </div>

      {/* Text Editor area*/}
      <TextEditor
        title="Number Lines"
        description="Add line numbers or bullet points to each line of text."
        example=""
        transform={transformText}
        storageKey="number-lines"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default NumberLines;
