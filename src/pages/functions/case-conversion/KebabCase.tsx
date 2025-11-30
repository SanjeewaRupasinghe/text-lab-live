import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { kebabCaseFaqs } from "@/data/faq/case-conversion-faq";
import { FaqType } from "@/types/faq.type";

export default function KebabCase() {
  const transform = (text: string): string => {
    return text
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("-");
  };

  // Get faqs
  const faqs: FaqType[] = kebabCaseFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Kebab Case"
        description="Convert text to kebab-case format. All lowercase with hyphens replacing spaces."
        example="Hello World Example → hello-world-example"
        transform={transform}
        storageKey="kebab-case-transformer"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
