import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { htmlEntitiesFaqs } from "@/data/faq/conversion-tool-faq";
import { FaqType } from "@/types/faq.type";
import { useState } from "react";

const HtmlEntities = () => {
  const [type, setType] = useState<"encode" | "decode">("encode");

  const encodeHtmlEntities = (text: string): string => {
    // Validate
    if (!text) return "";

    // mapping
    const entityMap: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;",
    };

    // Replace
    return text.replace(/[&<>"'`=\/]/g, (char) => entityMap[char]);
  };

  // Get faqs
  const faqs: FaqType[] = htmlEntitiesFaqs;

  const decodeHtmlEntities = (text: string): string => {
    // Validate
    if (!text) return "";

    // Create textarea element
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-6xl">
      {/* Set Type */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-4 mb-4">
          <label className="block text-sm font-medium">Encoding Type:</label>
          <div className="flex gap-2">
            {/* Encode Button */}
            <button
              onClick={() => setType("encode")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                type === "encode"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Encode
            </button>
            {/* END Encode Button */}

            {/* Decode Button */}
            <button
              onClick={() => setType("decode")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                type === "decode"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              Decode
            </button>
            {/* END Decode Button */}
          </div>
        </div>
      </div>
      {/* END Set Type */}

      {/* Text Editor */}
      <TextEditor
        title="HTML Entities Encoder"
        description="Convert special characters to HTML entities and vice versa. Useful for displaying HTML code safely."
        example='<div class="example">Hello & welcome to "my" site</div>'
        transform={type === "encode" ? encodeHtmlEntities : decodeHtmlEntities}
        storageKey="html-entities"
      />
      {/* END Text Editor */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default HtmlEntities;
