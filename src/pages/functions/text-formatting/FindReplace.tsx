import { useState } from "react";
import { TextEditor } from "@/components/TextEditor";
import { FAQ } from "@/components/FAQ";
import { FaqType } from "@/types/faq.type";
import { findReplaceFaqs } from "@/data/faq/text-formatting-faq";

const FindReplace = () => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [useRegex, setUseRegex] = useState(false);

  const transformText = (text: string) => {
    if (!text || !findText) return text;

    try {
      let result = text;

      if (useRegex) {
        const flags = caseSensitive ? "g" : "gi";
        const regex = new RegExp(findText, flags);
        result = text.replace(regex, replaceText);
      } else {
        if (caseSensitive) {
          result = text.split(findText).join(replaceText);
        } else {
          // Case insensitive replacement
          const regex = new RegExp(
            findText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            "gi"
          );
          result = text.replace(regex, replaceText);
        }
      }

      return result;
    } catch (error) {
      // Invalid regex
      return text;
    }
  };

  // Get faqs
  const faqs: FaqType[] = findReplaceFaqs;

  return (
    <div className="container mx-auto p-3 sm:p-6 max-w-6xl">
      <div className="mb-6">
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          {/* Find Text */}
          <div>
            <label className="block text-sm font-medium mb-2">Find Text:</label>
            <input
              type="text"
              value={findText}
              onChange={(e) => setFindText(e.target.value)}
              placeholder="Text to find"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          {/* END Find Text */}

          {/* Replace Text */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Replace With:
            </label>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              placeholder="Replacement text"
              className="w-full px-3 py-2 border border-border rounded-md bg-background"
            />
          </div>
          {/* END Replace Text */}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mb-4">
          {/* Case Sensitive */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Case Sensitive</span>
          </label>
          {/* END Case Sensitive */}

          {/* Use Regular Expression */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useRegex}
              onChange={(e) => setUseRegex(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Use Regular Expression</span>
          </label>
          {/* END Use Regular Expression */}
        </div>
      </div>

      {/* Text Editor area*/}
      <TextEditor
        title="Find & Replace"
        description="Find and replace text with support for case sensitivity and regular expressions."
        example='Input: "Hello world\nHello everyone" with Find: "Hello", Replace: "Hi" → Output: "Hi world\nHi everyone"'
        transform={transformText}
        storageKey="find-replace"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default FindReplace;
