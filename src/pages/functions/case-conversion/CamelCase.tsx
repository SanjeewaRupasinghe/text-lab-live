import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { camelCaseFaqs } from "@/data/faq/case-conversion-faq";
import { FaqType } from "@/types/faq.type";

export default function CamelCase() {
  const transform = (text: string): string => {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, '');
  };

  // Get faqs
  const faqs: FaqType[] = camelCaseFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Camel Case"
        description="Convert text to camelCase format. First word lowercase, subsequent words capitalized with no spaces."
        example="hello world example → helloWorldExample"
        transform={transform}
        storageKey="camel-case-transformer"
      />
      {/* END Text Editor area*/}
      
      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
      
      </>
  );
}