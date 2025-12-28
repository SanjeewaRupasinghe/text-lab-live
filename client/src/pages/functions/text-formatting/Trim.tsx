import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { trimFaqs } from "@/data/faq/text-formatting-faq";
import { FaqType } from "@/types/faq.type";

export default function Trim() {
  const transform = (text: string): string => {
    return text
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .trim();
  };

  // Get faqs
  const faqs: FaqType[] = trimFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Trim Whitespace"
        description="Remove leading and trailing whitespace from the entire text and each line."
        example="  hello world  → hello world"
        transform={transform}
        storageKey="trim-transformer"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
