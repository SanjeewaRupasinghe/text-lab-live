import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { removeBlankLinesFaqs } from "@/data/faq/text-formatting-faq";
import { FaqType } from "@/types/faq.type";

export default function RemoveBlankLines() {
  const transform = (text: string): string => {
    return text
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .join("\n");
  };

  // Get faqs
  const faqs: FaqType[] = removeBlankLinesFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Remove Blank Lines"
        description="Remove all empty lines and lines containing only whitespace characters."
        example="line 1\n\nline 2\n   \nline 3 → line 1\nline 2\nline 3"
        transform={transform}
        storageKey="remove-blank-lines-transformer"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
