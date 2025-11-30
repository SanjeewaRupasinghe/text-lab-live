import { FaqType } from "@/types/faq.type";

// Uppercase FAQ
export const uppercaseFaqs: FaqType[] = [
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

// Lowercase FAQ
export const lowercaseFaqs: FaqType[] = [
  {
    question: "What is lowercase text conversion?",
    answer:
      "Lowercase text conversion transforms all uppercase letters in your text to their lowercase equivalents. For example, 'HELLO WORLD' becomes 'hello world'. Numbers, symbols, and punctuation marks remain unchanged during the conversion.",
  },
  {
    question: "When should I use lowercase text?",
    answer:
      "Lowercase text is commonly used for email addresses, usernames, URLs, CSS class names, file names, database column names, and general body text. It's also useful for normalizing user input and ensuring consistency in data processing.",
  },
  {
    question: "Does lowercase conversion work with accented characters?",
    answer:
      "Yes, lowercase converters typically handle accented and special characters from various languages. For example, 'CAFÉ' becomes 'café' and 'RÉSUMÉ' becomes 'résumé'. Unicode characters are generally supported across different alphabets.",
  },
  {
    question: "Will converting to lowercase break my code?",
    answer:
      "Converting code to lowercase can break functionality in case-sensitive programming languages. Class names, variables, and function calls must maintain their original casing. Be cautious when converting code and typically only apply lowercase to strings, comments, or specific identifiers.",
  },
  {
    question: "Why is lowercase preferred for URLs and file names?",
    answer:
      "Lowercase is preferred for URLs and file names because some systems are case-sensitive while others aren't. Using lowercase prevents broken links and file access issues. It also improves readability and follows web standards and best practices.",
  },
  {
    question: "Can I convert only certain parts of text to lowercase?",
    answer:
      "While basic lowercase tools convert entire text blocks, you can manually select specific portions to convert. Some advanced tools allow pattern-based conversion, enabling you to lowercase only certain elements like tags, attributes, or specific words.",
  },
  {
    question: "Does lowercase conversion preserve formatting and spacing?",
    answer:
      "Yes, lowercase conversion maintains the original structure of your text, including line breaks, spaces, indentation, and paragraph formatting. Only the letter casing changes while all other formatting elements remain intact.",
  },
  {
    question: "How does lowercase help with data normalization?",
    answer:
      "Converting text to lowercase is a common data normalization technique that ensures consistency in comparisons and searches. It prevents issues where 'Email', 'email', and 'EMAIL' would be treated as different values, making data processing more reliable.",
  },
];
