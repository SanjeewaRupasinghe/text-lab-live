import { FaqType } from "@/types/faq.type";

// Trim FAQ
export const trimFaqs: FaqType[] = [
  {
    question: "What does trimming text do?",
    answer:
      "Trimming text removes whitespace characters (spaces, tabs, line breaks) from the beginning and end of your text while preserving the content and internal spacing. For example, '  hello world  ' becomes 'hello world'. It's essential for cleaning up user input and data processing.",
  },
  {
    question: "When should I trim text?",
    answer:
      "You should trim text when processing user input from forms, cleaning data from files or databases, preparing strings for comparison or validation, removing accidental whitespace from copied content, and standardizing data before storage. Trimming prevents issues caused by invisible whitespace characters.",
  },
  {
    question: "What's the difference between trim, trim start, and trim end?",
    answer:
      "Trim removes whitespace from both the beginning and end of text. Trim start (or trim left) only removes whitespace from the beginning, while trim end (or trim right) only removes whitespace from the end. Each serves different purposes depending on your formatting needs.",
  },
  {
    question: "Does trimming affect spaces between words?",
    answer:
      "No, standard trimming only removes whitespace from the beginning and end of the text, not between words. Internal spacing remains unchanged. For example, '  hello   world  ' becomes 'hello   world' with the internal spaces preserved. To remove extra internal spaces, you need additional processing.",
  },
  {
    question: "What whitespace characters does trim remove?",
    answer:
      "Trim typically removes spaces, tabs, line breaks (newlines), carriage returns, and other Unicode whitespace characters like non-breaking spaces. The exact characters removed may vary by implementation, but standard trim handles all common whitespace characters that appear invisible to users.",
  },
  {
    question: "Why is trimming important for form validation?",
    answer:
      "Trimming is crucial for form validation because users often accidentally add spaces when copying, pasting, or typing. Without trimming, '  email@example.com  ' would fail exact matches, valid usernames might be rejected, and databases could store duplicate entries that differ only by whitespace.",
  },
  {
    question: "Can trim remove all whitespace from text?",
    answer:
      "Standard trim only removes leading and trailing whitespace. To remove all whitespace including spaces between words, you need a different operation that replaces or removes all whitespace characters throughout the entire string, not just at the edges.",
  },
  {
    question: "Does trimming work with multiple lines of text?",
    answer:
      "Yes, trim works with multi-line text and removes whitespace from the very beginning and very end of the entire text block. However, it doesn't remove leading or trailing spaces from individual lines within the text. For that, you'd need to trim each line separately.",
  },
  {
    question: "Should I always trim user input?",
    answer:
      "In most cases, yes. Trimming user input is a best practice that prevents validation errors, improves data consistency, and enhances user experience. However, there are exceptions where whitespace is meaningful, such as passwords (where spaces might be intentional) or formatted text where leading/trailing spaces have purpose.",
  },
  {
    question: "How does trim affect empty or whitespace-only strings?",
    answer:
      "When you trim a string that contains only whitespace characters, the result is an empty string. This is useful for validation, as you can trim input and check if it's empty to determine whether the user provided meaningful content or just whitespace.",
  },
];

// Remove Extra Spaces FAQ
export const removeSpacesFaqs: FaqType[] = [
  {
    question: "What does removing extra spaces do?",
    answer:
      "Removing extra spaces consolidates multiple consecutive whitespace characters into a single space throughout your text. For example, 'hello    world' becomes 'hello world'. This operation also typically trims leading and trailing spaces, resulting in clean, normalized text with consistent spacing.",
  },
  {
    question: "When should I remove extra spaces?",
    answer:
      "Remove extra spaces when cleaning data from copied content, processing text from PDFs or scanned documents, normalizing user input for storage, preparing text for display or printing, fixing formatting issues in imported data, and standardizing spacing in addresses or names before validation.",
  },
  {
    question: "What's the difference between trim and remove extra spaces?",
    answer:
      "Trim only removes whitespace from the beginning and end of text, leaving internal spacing unchanged. Remove extra spaces goes further by consolidating all multiple consecutive spaces throughout the entire text into single spaces, while also trimming the edges. It's a more comprehensive cleaning operation.",
  },
  {
    question: "Does removing extra spaces affect line breaks?",
    answer:
      "This depends on the implementation. Some tools remove extra spaces but preserve line breaks (newlines), maintaining paragraph structure. Others treat line breaks as whitespace and may consolidate them too. For most use cases, preserving line breaks while removing extra spaces between words is preferred.",
  },
  {
    question: "Will removing extra spaces affect formatted code or data?",
    answer:
      "Yes, removing extra spaces can break code formatting, especially in indentation-sensitive languages like Python or YAML. It can also damage ASCII art, formatted tables, and aligned data. Only use this operation on natural language text or when you specifically want to normalize spacing in code comments or strings.",
  },
  {
    question: "How does removing extra spaces handle tabs?",
    answer:
      "Most implementations treat tabs as whitespace and convert them to single spaces along with multiple spaces. This normalizes all horizontal whitespace to single spaces. However, if you need to preserve tabs for structured data like TSV files, use a tool that specifically preserves tab characters.",
  },
  {
    question: "Why do extra spaces appear in copied text?",
    answer:
      "Extra spaces often appear when copying from PDFs (where spacing is rendered, not structural), websites with specific formatting, justified text, data exports, or when text is copied from multiple sources and pasted together. These artifacts can cause issues in databases, forms, and text processing.",
  },
  {
    question:
      "Can I remove extra spaces while keeping double spaces after periods?",
    answer:
      "Standard remove extra spaces operations don't distinguish between different contexts. To preserve double spaces after periods (a typing convention some prefer), you'd need a more sophisticated tool that recognizes sentence boundaries or manually review the text after basic space removal.",
  },
  {
    question:
      "Does removing extra spaces affect special whitespace characters?",
    answer:
      "Most tools handle common whitespace like spaces, tabs, and sometimes non-breaking spaces. However, there are many Unicode whitespace characters (em space, en space, thin space) that may or may not be processed depending on the implementation. For thorough cleaning, use tools that handle all Unicode whitespace.",
  },
  {
    question:
      "Should I remove extra spaces before or after other text operations?",
    answer:
      "It's typically best to remove extra spaces after other transformations like case conversion or find-and-replace operations, as those operations might introduce spacing issues. However, removing extra spaces before validation or comparison operations ensures consistent results regardless of how the text was formatted initially.",
  },
];

// Remove Blank Lines FAQ
export const removeBlankLinesFaqs: FaqType[] = [
  {
    question: "What does removing blank lines do?",
    answer:
      "Removing blank lines eliminates empty lines from your text, consolidating content into a continuous block or reducing excessive vertical spacing. For example, text with multiple empty lines between paragraphs becomes more compact with those blank lines removed, improving readability and reducing file size.",
  },
  {
    question: "When should I remove blank lines?",
    answer:
      "Remove blank lines when cleaning up exported data, compacting log files, preparing text for processing where line breaks matter, removing excessive spacing from copied content, optimizing file size for storage or transmission, and formatting text that has unnecessary vertical whitespace.",
  },
  {
    question:
      "What's the difference between removing blank lines and trimming?",
    answer:
      "Trimming removes whitespace from the beginning and end of the entire text, while removing blank lines eliminates empty lines throughout the document. Blank lines are entire lines that contain no characters or only whitespace. These are different operations that solve different formatting problems.",
  },
  {
    question:
      "Does removing blank lines delete lines with only spaces or tabs?",
    answer:
      "This depends on the implementation. Most tools consider lines containing only whitespace characters (spaces, tabs) as blank lines and remove them. However, some tools only remove completely empty lines with zero characters. Choose based on whether you want to preserve lines with invisible whitespace.",
  },
  {
    question: "Will removing blank lines affect my document structure?",
    answer:
      "Yes, removing blank lines can significantly change document structure by eliminating paragraph spacing, section breaks, and visual separation between content blocks. This can reduce readability in documents where blank lines serve a formatting purpose. Use this operation carefully when structure matters.",
  },
  {
    question: "Can I remove only consecutive blank lines but keep single ones?",
    answer:
      "Standard remove blank lines operations eliminate all blank lines. To remove only multiple consecutive blank lines while preserving single blank lines for paragraph separation, you need a more advanced tool or operation that specifically targets consecutive empty lines rather than all blank lines.",
  },
  {
    question: "Why do blank lines appear in text files?",
    answer:
      "Blank lines appear intentionally for paragraph separation, section breaks, and readability. They also appear accidentally from copy-paste operations, data exports, converting between formats, merging files, or editing operations that leave empty lines. Both intentional and accidental blank lines can accumulate over time.",
  },
  {
    question: "Should I remove blank lines from code files?",
    answer:
      "Generally no. Blank lines in code serve important purposes: separating logical sections, improving readability, grouping related functions, and following style guides. Most coding standards require blank lines in specific places. Only remove blank lines from code if you're sure they're excessive or accidental.",
  },
  {
    question: "Does removing blank lines affect CSV or data files?",
    answer:
      "Removing blank lines from CSV or structured data files can corrupt the data if blank lines represent missing or null entries. In CSV files, blank lines might indicate empty records that should be preserved. Always verify the data format before removing blank lines from structured data.",
  },
  {
    question:
      "How is removing blank lines different from removing extra spaces?",
    answer:
      "Removing blank lines eliminates vertical spacing (empty lines between content), while removing extra spaces eliminates horizontal spacing (multiple spaces between words). These are complementary operations: one compacts vertical whitespace and the other compacts horizontal whitespace, both improving text density.",
  },
];

// Sort Lines FAQ
export const sortLineFaqs: FaqType[] = [
  {
    question: "What does sorting lines do?",
    answer: "Sorting lines rearranges the lines in your text according to a specified order, typically alphabetically or numerically. For example, a list of names or items can be sorted from A to Z (ascending) or Z to A (descending). Each line is treated as a separate item to be sorted."
  },
  {
    question: "When should I sort lines of text?",
    answer: "Sort lines when organizing lists, alphabetizing names or items, arranging data for easier lookup, preparing sorted imports in code files, organizing configuration entries, creating indexes or glossaries, removing duplicates more easily, and presenting data in a logical order for readability."
  },
  {
    question: "What's the difference between alphabetical and numerical sorting?",
    answer: "Alphabetical sorting orders text based on letter sequence (A-Z), treating numbers as text characters. Numerical sorting recognizes numbers and orders them by value. For example, alphabetically '10' comes before '2', but numerically '2' comes before '10'. Choose based on your content type."
  },
  {
    question: "Is sorting case-sensitive?",
    answer: "This depends on the sorting implementation. Case-sensitive sorting treats uppercase and lowercase letters differently, placing 'Apple' before 'apple'. Case-insensitive sorting treats them the same. Most user-friendly tools default to case-insensitive sorting for more intuitive results, but both options have valid use cases."
  },
  {
    question: "Does sorting preserve line content and formatting?",
    answer: "Yes, sorting only changes the order of lines, not their content. Each complete line moves as a unit to its new sorted position. The text within each line, including spaces, punctuation, and formatting, remains exactly as it was before sorting."
  },
  {
    question: "Can I sort lines in reverse or descending order?",
    answer: "Yes, most sorting tools offer both ascending (A to Z, 0 to 9) and descending (Z to A, 9 to 0) options. Descending or reverse sorting is useful for showing highest-to-lowest rankings, most recent dates first, or creating reverse alphabetical lists for specific purposes."
  },
  {
    question: "How does sorting handle special characters and punctuation?",
    answer: "Special characters and punctuation are typically sorted according to their Unicode or ASCII values, usually appearing before letters. The exact order depends on the character encoding: numbers often come before letters, and symbols like @, #, $ have specific positions. Blank lines typically sort to the top or bottom."
  },
  {
    question: "Will sorting remove duplicate lines?",
    answer: "Standard sorting doesn't remove duplicates, it just places them together consecutively in the sorted output. However, many sorting tools offer an optional 'remove duplicates' or 'unique lines only' feature that can eliminate duplicate lines during or after the sorting process."
  },
  {
    question: "Can I sort by a specific column or field in each line?",
    answer: "Basic line sorting treats each entire line as a single unit. To sort by specific columns or fields (like sorting CSV data by the second column), you need advanced sorting tools that understand delimiters and can parse structured data. Basic tools only sort by the complete line content."
  },
  {
    question: "Does sorting work with different languages and character sets?",
    answer: "Modern sorting tools generally support Unicode and can handle multiple languages, though the sort order follows language-specific collation rules. For example, accented characters may sort differently in different languages. English sorting is straightforward, but languages with special characters may require locale-aware sorting."
  }
];

// Number Lines FAQ
export const numberLinesFaqs: FaqType[] = [
  {
    question: "What does numbering lines do?",
    answer: "Numbering lines adds sequential numbers to the beginning of each line in your text. For example, a list of items becomes '1. First item', '2. Second item', and so on. This creates ordered lists, adds line references, and makes it easier to reference specific lines in discussions or documentation."
  },
  {
    question: "When should I number lines?",
    answer: "Number lines when creating ordered lists, adding line references for code review or debugging, preparing numbered instructions or steps, creating TODOs or checklists, adding line numbers to logs for analysis, formatting agendas or meeting notes, and making it easier to reference specific items in collaborative discussions."
  },
  {
    question: "What numbering formats are available?",
    answer: "Common numbering formats include plain numbers (1, 2, 3), numbers with periods (1. 2. 3.), numbers with parentheses (1) 2) 3)), and numbers with brackets [1] [2] [3]. Some tools also support Roman numerals (I, II, III), letters (A, B, C), or custom prefixes and suffixes for specialized formatting needs."
  },
  {
    question: "Can I start numbering from a specific number?",
    answer: "Yes, many line numbering tools allow you to specify a starting number other than 1. This is useful when continuing a numbered list from a previous section, adding line numbers that match external references, or creating subsections with custom numbering schemes like starting from 10 or 100."
  },
  {
    question: "Does line numbering preserve existing content and formatting?",
    answer: "Yes, line numbering only adds numbers to the beginning of each line without modifying the original content. Any existing spacing, punctuation, or formatting within the lines is preserved. The numbers are prepended, so your original text remains intact after the numbering."
  },
  {
    question: "Can I customize the spacing or delimiter after the number?",
    answer: "Most line numbering tools allow customization of what appears after the number, such as periods, colons, dashes, or custom separators. You can also typically control spacing, choosing between no space, single space, or tab character between the number and your text for proper alignment."
  },
  {
    question: "Will numbering skip blank lines?",
    answer: "This depends on the tool's configuration. Some implementations number every line including blank ones, maintaining strict line count. Others skip blank lines and only number lines with content. Choose based on whether you want to count actual content items or maintain absolute line positions."
  },
  {
    question: "Can I add leading zeros to line numbers?",
    answer: "Yes, many tools support leading zeros for consistent number width, useful when you have many lines. For example, with 3-digit padding: 001, 002, ..., 099, 100. This ensures proper alignment in plain text and maintains correct sorting order when lines are sorted alphabetically."
  },
  {
    question: "How do I remove line numbers that were previously added?",
    answer: "To remove line numbers, you typically use a find-and-replace operation or a dedicated 'remove line numbers' tool that strips the numbering pattern from the beginning of each line. Regular expressions can efficiently match and remove common numbering patterns like '^\\d+\\.\\s*' to restore the original text."
  },
  {
    question: "Can I number only specific lines or sections?",
    answer: "Basic line numbering tools number all lines in the text. To number only specific sections, you would need to manually select those sections and number them separately, or use advanced text editors with selective numbering features. Alternatively, number everything then manually remove numbers from unwanted lines."
  }
];

// Find Replace FAQ
export const findReplaceFaqs: FaqType[] = [
  {
    question: "What is find and replace?",
    answer: "Find and replace is a text operation that searches for specific text patterns in your content and replaces them with different text. For example, you can find all instances of 'color' and replace them with 'colour'. It's essential for bulk editing, correcting mistakes, and updating repeated content efficiently."
  },
  {
    question: "When should I use find and replace?",
    answer: "Use find and replace when correcting spelling errors throughout a document, updating variable or function names in code, changing formatting or terminology consistently, replacing outdated information, removing or substituting specific words or phrases, and making bulk edits that would be tedious to do manually."
  },
  {
    question: "What's the difference between case-sensitive and case-insensitive search?",
    answer: "Case-sensitive search distinguishes between uppercase and lowercase letters, so 'Apple' and 'apple' are treated as different. Case-insensitive search treats them the same, finding both variants. Use case-sensitive when exact matches matter, and case-insensitive when you want to catch all variations regardless of capitalization."
  },
  {
    question: "What are regular expressions in find and replace?",
    answer: "Regular expressions (regex) are powerful pattern-matching tools that can find complex text patterns, not just exact text. For example, '\\d+' matches any number, '[A-Z]+' matches uppercase words. Regex enables advanced operations like finding email addresses, phone numbers, or specific formatting patterns for replacement."
  },
  {
    question: "Can find and replace match whole words only?",
    answer: "Yes, most find and replace tools offer a 'whole word' or 'match whole words only' option. This prevents partial matches within larger words. For example, searching for 'cat' with whole word matching finds 'cat' but not 'category' or 'concatenate', avoiding unintended replacements."
  },
  {
    question: "How do I replace text with nothing to delete it?",
    answer: "To delete text using find and replace, simply leave the replacement field empty. Enter the text you want to remove in the find field and provide no replacement text. All instances of the found text will be deleted, effectively removing that content from your document."
  },
  {
    question: "Can I undo find and replace operations?",
    answer: "This depends on the tool. Many text editors allow you to undo find and replace operations. However, in web-based tools or when working with large files, undo might not be available. It's always recommended to backup your text or test your find and replace pattern on a small sample first."
  },
  {
    question: "What's the difference between replace and replace all?",
    answer: "Replace changes one instance at a time, allowing you to review each match before replacing it. Replace all changes every instance throughout the entire text in one operation. Use replace for selective changes where you want control, and replace all for bulk operations when you're confident in your pattern."
  },
  {
    question: "How do I find and replace line breaks or special characters?",
    answer: "Special characters like line breaks, tabs, or other whitespace require specific notation. Common representations include '\\n' for newline, '\\t' for tab, and '\\r' for carriage return. Some tools use visual buttons or menus to insert these special characters, while others require you to type escape sequences."
  },
  {
    question: "Can find and replace preserve formatting or capitalization?",
    answer: "Basic find and replace replaces text exactly as you specify. However, advanced tools may offer options to match case patterns, where replacing 'hello' with 'goodbye' would also change 'Hello' to 'Goodbye' and 'HELLO' to 'GOODBYE', preserving the original capitalization style of each match."
  }
];