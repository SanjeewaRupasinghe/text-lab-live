import { useState } from "react";
import { TextEditor } from "@/components/TextEditor";
import { FAQ } from "@/components/FAQ";
import { FaqType } from "@/types/faq.type";
import { sortLineFaqs } from "@/data/faq/text-formatting-faq";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";

const SortLines = () => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const transformText = (text: string) => {
    // Validate
    if (!text.trim()) return "";

    const lines = text.split("\n");
    const sortedLines = [...lines].sort((a, b) => {
      if (sortOrder === "asc") {
        // ASC
        return a.localeCompare(b);
      } else {
        // DESC
        return b.localeCompare(a);
      }
    });
    return sortedLines.join("\n");
  };

  // Get faqs
  const faqs: FaqType[] = sortLineFaqs;

  return (
    <div className="container mx-auto p-3">
      {/* Sort Order */}
      <div className="mb-6">
        <div className="ms-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4 mb-4">
          <label className="block text-sm font-medium">Sort Order:</label>
          <div className="flex gap-2">
            {/* ASC Button */}
            <button
              onClick={() => setSortOrder("asc")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sortOrder === "asc"
                  ? "bg-primary text-primary-foreground flex"
                  : "bg-muted hover:bg-muted/80 flex"
              }`}
            >
              <ArrowDownAZ className="mr-2" />
              Ascending (A-Z)
            </button>
            {/* END ASC Button */}

            {/* DESC Button */}
            <button
              onClick={() => setSortOrder("desc")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                sortOrder === "desc"
                  ? "bg-primary text-primary-foreground flex"
                  : "bg-muted hover:bg-muted/80 flex"
              }`}
            >
              <ArrowDownZA className="mr-2" />
              Descending (Z-A)
            </button>
            {/* END DESC Button */}
          </div>
        </div>
      </div>
      {/* END Sort Order */}

      {/* Text Editor area*/}
      <TextEditor
        title="Sort Lines"
        description="Sort text lines alphabetically in ascending or descending order."
        example=""
        transform={transformText}
        storageKey="sort-lines"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default SortLines;
