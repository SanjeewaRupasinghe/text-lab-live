import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { mirrorTextFaqs } from "@/data/faq/text-transformation-faq";
import { mirrorMap } from "@/data/MirrorTextData";
import { FaqType } from "@/types/faq.type";

const MirrorText = () => {
  // 
  const mirrorText = (text: string): string => {
    if (!text) return "";

    return text
      .split("")
      .map((char) => mirrorMap[char] || char)
      .reverse()
      .join("");
  };

  // Get faqs
  const faqs: FaqType[] = mirrorTextFaqs;

  return (
    <>
      {/* Text Editor */}
      <TextEditor
        title="Mirror Text"
        description="Create mirrored/flipped text using Unicode characters. Text appears as if reflected in a mirror."
        example="Hello → oƖƖǝH"
        transform={mirrorText}
        storageKey="mirror-text"
      />
      {/* END Text Editor */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
};

export default MirrorText;
