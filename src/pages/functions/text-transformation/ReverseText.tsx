import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { reverseTextFaqs } from "@/data/faq/text-transformation-faq";
import { FaqType } from "@/types/faq.type";
import { useState } from "react";

const ReverseText = () => {
  // State
  const [type, setType] = useState<"reverse" | "reverseLines">("reverse");

  // Process text
  const reverseText = (text: string): string => {
    // Validate
    if (!text) return "";

    const lines = text.split("\n");
    return lines.map((line) => line.split("").reverse().join("")).join("\n");
  };

  // Process lines
  const reverseLines = (text: string): string => {
    // Validate
    if (!text) return "";

    const lines = text.split("\n");
    return lines.reverse().join("\n");
  };

  // Transform
  const transform = (text: string): string => {
    if (type === "reverseLines") {
      return reverseLines(text);
    }
    return reverseText(text);
  };

  // Get faqs
  const faqs: FaqType[] = reverseTextFaqs;

  return (
    <>
      {/* Set Type */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4 mb-4">
          <label className="block text-sm font-medium">Encoding Type:</label>
          <div className="flex gap-2">
            {/* Encode Button */}
            <button
              onClick={() => setType("reverse")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                type === "reverse"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Reverse
            </button>
            {/* END Encode Button */}

            {/* Decode Button */}
            <button
              onClick={() => setType("reverseLines")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                type === "reverseLines"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Reverse Lines
            </button>
            {/* END Decode Button */}
          </div>
        </div>
      </div>
      {/* END Set Type */}

      {/* Text editor */}
      <TextEditor
        title="Reverse Text"
        description="Reverse the order of characters in your text. Each line is reversed individually while maintaining line breaks."
        example="Hello World → dlroW olleH"
        transform={transform}
        storageKey="reverse-text"
      />
      {/* END Text editor */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
};

export default ReverseText;
