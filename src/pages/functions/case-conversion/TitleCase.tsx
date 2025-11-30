import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { titleCaseFaqs } from "@/data/faq/case-conversion-faq";
import { FaqType } from "@/types/faq.type";

export default function TitleCase() {
  const transform = (text: string): string => {
    return text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  // Get faqs
  const faqs: FaqType[] = titleCaseFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Title Case"
        description="Capitalize the first letter of each word. Perfect for titles, headings, and proper nouns."
        example="hello world example → Hello World Example"
        transform={transform}
        storageKey="title-case-transformer"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
