import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { removeSpacesFaqs } from "@/data/faq/text-formatting-faq";
import { FaqType } from "@/types/faq.type";

export default function RemoveSpaces() {
  const transform = (text: string): string => {
    return text.replace(/\s+/g, " ").trim();
  };

  // Get faqs
  const faqs: FaqType[] = removeSpacesFaqs;

  return (
    <>
      {/* Text Editor area*/}
      <TextEditor
        title="Remove Extra Spaces"
        description="Replace multiple consecutive spaces with single spaces throughout the text."
        example="hello    world     example → hello world example"
        transform={transform}
        storageKey="remove-spaces-transformer"
      />
      {/* END Text Editor area*/}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
}
