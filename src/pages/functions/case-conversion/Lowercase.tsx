import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { lowercaseFaqs } from "@/data/faq/case-conversion-faq";
import { FaqType } from "@/types/faq.type";

export default function Lowercase() {
  const transform = (text: string): string => {
    return text.toLowerCase();
  };

  // Get faqs
  const faqs: FaqType[] = lowercaseFaqs;

  return (
    <>
    <TextEditor
      title="Lowercase Text"
      description="Convert all text to lowercase letters. Useful for normalizing input or creating consistent formatting."
      example="HELLO WORLD → hello world"
      transform={transform}
      storageKey="lowercase-transformer"
      />
      <FAQ faqs={faqs} />
    </>
  );
}