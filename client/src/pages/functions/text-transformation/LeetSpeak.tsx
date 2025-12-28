import { FAQ } from "@/components/FAQ";
import { TextEditor } from "@/components/TextEditor";
import { leetSpeakFaqs } from "@/data/faq/text-transformation-faq";
import { FaqType } from "@/types/faq.type";

const LeetSpeak = () => {
  // 1337 speak character mappings
  const leetMap: Record<string, string> = {
    A: "4",
    a: "4",
    B: "8",
    b: "8",
    E: "3",
    e: "3",
    G: "6",
    g: "6",
    I: "1",
    i: "1",
    L: "1",
    l: "1",
    O: "0",
    o: "0",
    S: "5",
    s: "5",
    T: "7",
    t: "7",
    Z: "2",
    z: "2",
  };

  // Advanced leet mappings for more authentic look
  const advancedLeetMap: Record<string, string> = {
    A: "@",
    a: "@",
    B: "|3",
    b: "|3",
    C: "(",
    c: "(",
    D: "|)",
    d: "|)",
    E: "3",
    e: "3",
    F: "|=",
    f: "|=",
    G: "6",
    g: "6",
    H: "|-|",
    h: "|-|",
    I: "!",
    i: "!",
    J: "_|",
    j: "_|",
    K: "|<",
    k: "|<",
    L: "1",
    l: "1",
    M: "|\\/|",
    m: "|\\/|",
    N: "|\\|",
    n: "|\\|",
    O: "0",
    o: "0",
    P: "|*",
    p: "|*",
    Q: "0_",
    q: "0_",
    R: "|2",
    r: "|2",
    S: "5",
    s: "5",
    T: "7",
    t: "7",
    U: "|_|",
    u: "|_|",
    V: "\\/",
    v: "\\/",
    W: "\\/\\/",
    w: "\\/\\/",
    X: "><",
    x: "><",
    Y: "`/",
    y: "`/",
    Z: "2",
    z: "2",
  };

  const leetTransform = (text: string): string => {
    if (!text) return "";

    // Use basic leet mapping for simplicity
    return text
      .split("")
      .map((char) => leetMap[char] || char)
      .join("");
  };

  // Get faqs
  const faqs: FaqType[] = leetSpeakFaqs;

  return (
    <>
      {/* Text Editor */}
      <TextEditor
        title="Leet Speak (1337)"
        description="Convert text to leet speak (1337 speak) using numbers and symbols. Popular in gaming and hacker culture."
        example="Hello World → H3110 W0r1d"
        transform={leetTransform}
        storageKey="leet-speak"
      />
      {/* END Text Editor */}

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </>
  );
};

export default LeetSpeak;
