import { FaqType } from "@/types/faq.type";

// Uppercase FAQ
export const statisticsFaqs: FaqType[] = [
  {
    question: "What is uppercase text conversion?",
    answer:
      "Uppercase text conversion transforms all lowercase letters in your text to their capital letter equivalents. For example, 'hello world' becomes 'HELLO WORLD'. Numbers, symbols, and punctuation remain unchanged.",
  },
  {
    question: "When should I use uppercase text?",
    answer:
      "Uppercase text is commonly used for headings, titles, acronyms, constants in programming, environment variables, emphasis in plain text, and creating visual hierarchy in documents. It's also useful for standardizing data entries like postal codes or product codes.",
  },
  {
    question:
      "Does uppercase conversion work with special characters and accents?",
    answer:
      "Yes, most uppercase converters handle accented characters and special letters from various languages. For example, 'café' becomes 'CAFÉ' and 'straße' becomes 'STRASSE'. However, some characters like the German ß have special uppercase rules.",
  },
  {
    question: "Will converting to uppercase affect my code or data?",
    answer:
      "Converting code to uppercase can break functionality since most programming languages are case-sensitive. Variable names, function calls, and keywords must maintain their original casing. Use uppercase conversion carefully and primarily for strings, comments, or constant declarations.",
  },
  {
    question: "Can I convert only specific parts of my text to uppercase?",
    answer:
      "While basic uppercase tools convert entire text blocks, you can manually select and convert specific portions. Some advanced tools offer pattern-based conversion, allowing you to uppercase only certain words, sentences, or patterns within your text.",
  },
  {
    question: "How is uppercase different from title case or sentence case?",
    answer:
      "Uppercase converts every letter to capitals (LIKE THIS), while title case capitalizes the first letter of each major word (Like This), and sentence case capitalizes only the first letter of sentences (Like this). Each serves different formatting purposes.",
  },
  {
    question: "Does uppercase conversion preserve line breaks and spacing?",
    answer:
      "Yes, uppercase conversion typically preserves the original formatting of your text, including line breaks, spaces, tabs, and paragraph structure. Only the letter casing changes while all other formatting remains intact.",
  },
  {
    question: "Is there a character limit for uppercase conversion?",
    answer:
      "Most web-based uppercase converters can handle large amounts of text, often up to several thousand characters or more. However, extremely large files may need to be processed in chunks or require desktop tools for better performance.",
  },
];
