import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { uppercaseFaqs } from "@/data/faq/case-conversion-faq";
import { FaqType } from "@/types/faq.type";

export default function Uppercase() {
  // Transform function
  const transform = (text: string): string => {
    return text.toUpperCase();
  };

  // Get faqs
  const faqs: FaqType[] = uppercaseFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Uppercase Text"
        description="Convert all text to uppercase letters. Perfect for headings, constants, and emphasis."
        example="hello world → HELLO WORLD"
        transform={transform}
        storageKey="uppercase-transformer"
      />
      {/* Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
