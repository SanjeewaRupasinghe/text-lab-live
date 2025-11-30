import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { snakeCaseFaqs } from "@/data/faq/case-conversion-faq";
import { FaqType } from "@/types/faq.type";

export default function SnakeCase() {
  const transform = (text: string): string => {
    return text
      .replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map((word) => word.toLowerCase())
      .join("_");
  };

  // Get faqs
  const faqs: FaqType[] = snakeCaseFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Snake Case"
        description="Convert text to snake_case format. All lowercase with underscores replacing spaces."
        example="Hello World Example → hello_world_example"
        transform={transform}
        storageKey="snake-case-transformer"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
