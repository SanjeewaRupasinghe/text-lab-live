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

// Title Case FAQ
export const titleCaseFaqs: FaqType[] = [
  {
    question: "What is title case conversion?",
    answer:
      "Title case conversion capitalizes the first letter of each major word in your text while keeping minor words lowercase. For example, 'the quick brown fox' becomes 'The Quick Brown Fox'. Articles, conjunctions, and short prepositions are typically kept lowercase unless they're the first or last word.",
  },
  {
    question: "Which words should stay lowercase in title case?",
    answer:
      "In title case, minor words like articles (a, an, the), coordinating conjunctions (and, but, or), and short prepositions (in, on, at, to, for) typically remain lowercase. However, these words are capitalized when they're the first or last word of the title.",
  },
  {
    question: "When should I use title case?",
    answer:
      "Title case is commonly used for book titles, article headlines, blog post titles, section headings, movie and song titles, and formal document headers. It's the standard format for most English-language titles and creates a professional, polished appearance.",
  },
  {
    question: "Are there different title case styles?",
    answer:
      "Yes, there are several title case styles including AP (Associated Press), APA (American Psychological Association), Chicago Manual of Style, and MLA (Modern Language Association). Each has slightly different rules about which words to capitalize, particularly for prepositions of varying lengths.",
  },
  {
    question: "How does title case handle hyphenated words?",
    answer:
      "In hyphenated words, both parts are typically capitalized in title case, like 'Self-Made' or 'Twenty-One'. However, some style guides have specific rules: prefixes like 're-' or 'pre-' might not be capitalized, and it can depend on whether the hyphenated term is a compound modifier or permanent compound.",
  },
  {
    question: "Should acronyms and abbreviations be changed in title case?",
    answer:
      "No, acronyms and abbreviations should maintain their original casing in title case. For example, 'API' stays as 'API', not 'Api', and 'iOS' remains 'iOS'. The title case converter should recognize and preserve these special cases.",
  },
  {
    question: "Does title case work with numbers and special characters?",
    answer:
      "Yes, title case conversion preserves numbers and special characters while only affecting letter casing. For example, '10 ways to improve your code' becomes '10 Ways to Improve Your Code'. Numbers, symbols, and punctuation remain exactly as they were.",
  },
  {
    question: "How is title case different from sentence case?",
    answer:
      "Title case capitalizes the first letter of most major words (The Quick Brown Fox), while sentence case only capitalizes the first letter of the first word and proper nouns (The quick brown fox). Title case is for titles and headings, while sentence case is for regular prose.",
  },
  {
    question: "Can title case handle multiple sentences or paragraphs?",
    answer:
      "While title case is designed for single titles or headings, most converters can process multiple lines. However, each line is typically treated as a separate title. For body text with multiple sentences, sentence case or normal capitalization is more appropriate than title case.",
  },
];

// Camel Case FAQ
export const camelCaseFaqs: FaqType[] = [
  {
    question: "What is camelCase?",
    answer:
      "camelCase is a naming convention where the first word starts with a lowercase letter and each subsequent word begins with an uppercase letter, with no spaces or punctuation between words. For example, 'user profile name' becomes 'userProfileName'.",
  },
  {
    question: "When should I use camelCase?",
    answer:
      "camelCase is commonly used for variable names, function names, method names, and object properties in many programming languages like JavaScript, Java, C#, and Swift. It's the standard convention for identifiers in these languages and improves code readability.",
  },
  {
    question: "What's the difference between camelCase and PascalCase?",
    answer:
      "camelCase starts with a lowercase letter (myVariable), while PascalCase (also called UpperCamelCase) starts with an uppercase letter (MyVariable). PascalCase is typically used for class names and constructors, while camelCase is used for variables and functions.",
  },
  {
    question: "How does camelCase handle numbers and special characters?",
    answer:
      "In camelCase, numbers are preserved as-is (user2Factor becomes user2Factor), but special characters, spaces, hyphens, and underscores are removed. The word following a special character gets capitalized, so 'user_first_name' or 'user-first-name' becomes 'userFirstName'.",
  },
  {
    question: "Can camelCase conversion handle acronyms?",
    answer:
      "Acronym handling in camelCase varies by convention. Some treat acronyms as single words (apiKey, httpRequest), while others keep them uppercase (APIKey, HTTPRequest). Most converters use the lowercase approach for better readability, especially when acronyms appear mid-identifier.",
  },
  {
    question: "Why is camelCase preferred over snake_case in JavaScript?",
    answer:
      "camelCase is the established convention in JavaScript and most C-family languages because it improves readability without underscores, aligns with the language's built-in methods (getElementById, querySelector), and maintains consistency with the broader JavaScript ecosystem and style guides.",
  },
  {
    question: "Does camelCase work with non-English characters?",
    answer:
      "Yes, camelCase can work with Unicode characters and accented letters, though it's less common. For example, 'café menu' could become 'caféMenu'. However, for maximum compatibility and following common coding standards, it's best to use only ASCII letters in identifiers.",
  },
  {
    question: "How do I convert between camelCase and other formats?",
    answer:
      "Converting from camelCase involves identifying uppercase letters as word boundaries. 'userProfileName' can split into words 'user', 'profile', 'name', which can then be transformed to snake_case (user_profile_name), kebab-case (user-profile-name), or other formats as needed.",
  },
  {
    question: "Should I use camelCase for CSS classes or HTML attributes?",
    answer:
      "No, CSS classes and HTML attributes conventionally use kebab-case (user-profile-name) rather than camelCase. However, in JavaScript frameworks like React, inline style objects use camelCase properties (backgroundColor) to match the DOM API, while CSS files use kebab-case (background-color).",
  },
];

// Snake Case FAQ
export const snakeCaseFaqs: FaqType[] = [
  {
    question: "What is snake_case?",
    answer:
      "snake_case is a naming convention where words are separated by underscores and all letters are typically lowercase. For example, 'user profile name' becomes 'user_profile_name'. It's called snake_case because the underscores resemble a snake moving along the ground.",
  },
  {
    question: "When should I use snake_case?",
    answer:
      "snake_case is commonly used for variable and function names in Python, Ruby, and Rust, database table and column names, API endpoints, configuration file keys, environment variables (though often in UPPER_SNAKE_CASE), and file names in Unix-based systems.",
  },
  {
    question:
      "What's the difference between snake_case and SCREAMING_SNAKE_CASE?",
    answer:
      "snake_case uses all lowercase letters (user_profile_name), while SCREAMING_SNAKE_CASE uses all uppercase letters (USER_PROFILE_NAME). SCREAMING_SNAKE_CASE is typically used for constants, environment variables, and configuration values that shouldn't change during program execution.",
  },
  {
    question: "Why is snake_case preferred in Python?",
    answer:
      "snake_case is the official Python convention defined in PEP 8, the Python style guide. It's considered more readable than camelCase in Python's context, aligns with the language's philosophy of explicit and readable code, and maintains consistency across the Python ecosystem.",
  },
  {
    question: "How does snake_case handle numbers and special characters?",
    answer:
      "In snake_case, numbers are preserved as-is (user_2fa_token), while special characters, hyphens, and extra spaces are removed. Multiple consecutive spaces or separators are typically converted to a single underscore, so 'user  -  name' becomes 'user_name'.",
  },
  {
    question: "Can snake_case be used in JavaScript?",
    answer:
      "While snake_case can be used in JavaScript, it goes against the language's conventions where camelCase is standard. However, snake_case is commonly used in JavaScript for database column names, API response fields from Python/Ruby backends, and when interfacing with systems that use snake_case.",
  },
  {
    question: "Should database columns use snake_case?",
    answer:
      "Yes, snake_case is the widely accepted convention for database table and column names across most database systems including PostgreSQL, MySQL, and SQLite. It's case-insensitive, readable, and avoids issues with reserved keywords and SQL syntax compared to camelCase or PascalCase.",
  },
  {
    question: "How do I convert from snake_case to other formats?",
    answer:
      "Converting from snake_case is straightforward since underscores clearly mark word boundaries. Split on underscores to get individual words, then apply the target format: remove underscores and capitalize for camelCase (userProfileName), replace with hyphens for kebab-case (user-profile-name), or capitalize all words for title case.",
  },
  {
    question: "What's the difference between snake_case and kebab-case?",
    answer:
      "snake_case uses underscores as separators (user_profile_name) while kebab-case uses hyphens (user-profile-name). snake_case is common in programming languages and databases, while kebab-case is standard for URLs, CSS classes, HTML attributes, and file names in web development.",
  },
];

export const kebabCaseFaqs: FaqType[] = [
  {
    question: "What is kebab-case?",
    answer:
      "kebab-case is a naming convention where words are separated by hyphens and all letters are lowercase. For example, 'user profile name' becomes 'user-profile-name'. It's called kebab-case because the hyphens resemble skewers holding pieces of a kebab together.",
  },
  {
    question: "When should I use kebab-case?",
    answer:
      "kebab-case is commonly used for URLs and slugs, CSS class names and IDs, HTML attributes, file names in web projects, Git branch names, Docker container names, and command-line flags. It's the standard convention for web-facing identifiers and improves SEO.",
  },
  {
    question: "Why is kebab-case preferred for URLs?",
    answer:
      "kebab-case is preferred for URLs because hyphens are recognized by search engines as word separators, improving SEO. It's more readable than underscores or no separators, works consistently across all systems, and follows web standards. For example, 'my-blog-post' is better than 'my_blog_post' or 'myblogpost'.",
  },
  {
    question: "Can I use kebab-case in programming languages?",
    answer:
      "Most programming languages don't allow hyphens in variable or function names because the hyphen is interpreted as a minus operator. However, kebab-case is commonly used in Lisp-family languages like Clojure and in configuration files (YAML, JSON keys), CSS, and HTML where it's perfectly valid.",
  },
  {
    question: "What's the difference between kebab-case and snake_case?",
    answer:
      "kebab-case uses hyphens as separators (user-profile-name) while snake_case uses underscores (user_profile_name). kebab-case is standard for web-facing content like URLs and CSS classes, while snake_case is common in programming languages like Python and database column names.",
  },
  {
    question: "How does kebab-case handle numbers and special characters?",
    answer:
      "In kebab-case, numbers are preserved as-is (user-2fa-token), while special characters, spaces, and underscores are removed or converted to hyphens. Multiple consecutive separators are typically converted to a single hyphen, so 'user  --  name' becomes 'user-name'.",
  },
  {
    question: "Should CSS class names always use kebab-case?",
    answer:
      "While kebab-case is the most common and recommended convention for CSS class names, it's not strictly required. However, kebab-case is preferred because it's readable, consistent with HTML attributes, follows BEM and other CSS methodologies, and avoids issues with CSS preprocessors and frameworks.",
  },
  {
    question: "Is kebab-case case-sensitive?",
    answer:
      "kebab-case itself uses lowercase letters, but its case-sensitivity depends on context. URLs and file names may be case-sensitive depending on the server (Linux is case-sensitive, Windows isn't). CSS classes and HTML attributes are case-insensitive in HTML but case-sensitive in JavaScript selectors. It's best practice to keep everything lowercase.",
  },
  {
    question: "How do I convert from kebab-case to other formats?",
    answer:
      "Converting from kebab-case is simple since hyphens clearly mark word boundaries. Split on hyphens to get individual words, then apply the target format: remove hyphens and capitalize for camelCase (userProfileName), replace with underscores for snake_case (user_profile_name), or capitalize each word for title case.",
  },
  {
    question: "Can kebab-case include uppercase letters?",
    answer:
      "While technically possible, mixing uppercase letters with kebab-case (like User-Profile-Name) is non-standard and discouraged. This hybrid is sometimes called Train-Case or HTTP-Header-Case, used mainly in HTTP headers. Standard kebab-case should always be lowercase for consistency and to avoid confusion.",
  },
];
