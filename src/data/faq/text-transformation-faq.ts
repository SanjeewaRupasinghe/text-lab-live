import { FaqType } from "@/types/faq.type";

// Reverse Text FAQ
export const reverseTextFaqs: FaqType[] = [
  {
    question: "What does reversing text do?",
    answer:
      "Reversing text flips the order of characters or words in your text. Character reversal transforms 'hello' into 'olleh', reading the text backwards. Word reversal keeps words intact but reverses their order, so 'hello world' becomes 'world hello'. Both create mirror effects useful for various creative and practical purposes.",
  },
  {
    question: "When should I reverse text?",
    answer:
      "Reverse text for creating puzzles and games, generating palindrome checks, creating unique usernames or design elements, testing string manipulation functions in code, creating mirror effects for artistic purposes, encoding simple messages for fun, analyzing text patterns, and demonstrating text processing capabilities in educational contexts.",
  },
  {
    question: "What's the difference between character and word reversal?",
    answer:
      "Character reversal flips every character including spaces, so 'Hello World' becomes 'dlroW olleH'. Word reversal maintains word integrity but reverses their sequence, making 'Hello World' into 'World Hello'. Choose character reversal for complete backwards text, word reversal for rearranging sentence order while keeping words readable.",
  },
  {
    question: "Does text reversal work with special characters and emojis?",
    answer:
      "Most text reversers handle ASCII characters reliably. However, emojis, accented characters, and complex Unicode symbols may reverse unexpectedly because some characters are composed of multiple Unicode code points. Simple emojis usually work, but complex ones (like flags or multi-part emojis) might break apart when reversed due to technical Unicode limitations.",
  },
  {
    question: "Can I reverse text line by line?",
    answer:
      "Yes, some reversal tools offer line-by-line reversal where each line is reversed independently, preserving the overall document structure. For example, a three-line poem would have each line reversed separately rather than reversing the entire text as one block. This maintains formatting while applying reversal effects to individual lines.",
  },
  {
    question: "How does reversing text affect readability?",
    answer:
      "Character-reversed text is generally unreadable unless you're skilled at reading backwards or use a mirror. Word-reversed text maintains word readability but sentence structure becomes confusing. Neither method provides actual encryption or security—reversed text is easily decoded. It's purely for fun, creative effects, or simple obfuscation.",
  },
  {
    question: "What are practical uses for text reversal?",
    answer:
      "Practical uses include checking for palindromes (words reading same forwards and backwards), testing text processing algorithms, creating reversible encoding for simple puzzles, generating unique identifiers by combining text with its reverse, debugging string manipulation code, and creating visual interest in designs where mirrored text adds artistic value.",
  },
  {
    question: "Can reversed text be used for security or encryption?",
    answer:
      "No, text reversal provides no security or encryption. It's trivially easy to reverse again, and any reversed text is immediately recognizable as such. Never use text reversal to protect sensitive information. For actual security, use proper encryption algorithms like AES. Reversal is only suitable for games, puzzles, or artistic purposes.",
  },
  {
    question:
      "Does text reversal preserve formatting like spaces and punctuation?",
    answer:
      "Yes, text reversal typically preserves all characters including spaces, punctuation, and line breaks—they just appear in reversed order. For example, 'Hello, world!' becomes '!dlrow ,olleH' with the comma and exclamation mark reversing positions along with the letters. Some tools offer options to preserve or strip certain formatting elements.",
  },
  {
    question: "How do I reverse text back to its original form?",
    answer:
      "Simply reverse the text again using the same method. Text reversal is its own inverse operation—reversing reversed text restores the original. This symmetry makes it easy to encode and decode, but also means it provides no real protection. Keep a copy of your original text if you need to reference it before re-reversal.",
  },
];

// Mirror Text
export const mirrorTextFaqs: FaqType[] = [
  {
    question: "What is mirror text?",
    answer:
      "Mirror text (also called flipped or reflected text) displays text as if viewed in a mirror, reversing each character horizontally so 'HELLO' appears as 'OЯƎH'. This creates a backwards reflection effect where text can be read normally when held up to a mirror. It's different from simply reversing character order—each individual character is flipped.",
  },
  {
    question: "When should I use mirror text?",
    answer:
      "Use mirror text for creative designs and artistic effects, creating text for vehicle windshields or storefront windows (readable from outside), designing t-shirts or merchandise with mirror effects, creating puzzles or educational activities, adding visual interest to graphics, making watermarks or security features, and demonstrating symmetry concepts in educational contexts.",
  },
  {
    question: "What's the difference between mirroring and reversing text?",
    answer:
      "Reversing text changes character order ('hello' becomes 'olleh'), while mirroring flips each character horizontally to create a reflection effect. Mirrored text appears backwards visually but maintains the original character sequence. For example, mirrored 'HELLO' looks like backwards letters that read correctly in a mirror, while reversed 'HELLO' becomes 'OLLEH'.",
  },
  {
    question: "Does mirror text work with all characters?",
    answer:
      "Mirror text works best with letters that have clear mirrored equivalents, primarily using Unicode characters that resemble flipped versions. Not all characters have perfect mirror representations, especially lowercase letters, numbers, and special symbols. Some mirror text generators use similar-looking Unicode characters, which may not be exact mirrors but create the visual effect.",
  },
  {
    question: "Can I read mirror text without a mirror?",
    answer:
      "With practice, some people can read mirror text directly, but it's challenging and tiring for most. The brain needs to mentally flip each character, slowing reading speed significantly. Mirror text is intentionally designed to be difficult to read normally and easy when reflected, making it useful for privacy (from casual observation) or creating interactive reading experiences.",
  },
  {
    question: "How do I create mirror text for vehicle windshields?",
    answer:
      "For ambulances, emergency vehicles, or delivery trucks, mirror text ensures the word (like 'AMBULANCE') reads correctly in rear-view mirrors of cars ahead. Use a mirror text generator or graphic design software with flip/mirror functions. Ensure the font is clear and bold for readability, test visibility at various distances, and verify it reads correctly in mirrors.",
  },
  {
    question: "Does mirror text work in all fonts?",
    answer:
      "True mirror text relies on Unicode characters that look like mirrored letters, which may not exist for all fonts or be rendered consistently across different systems. CSS or graphic design tools can create true mirrored text by horizontally flipping any font. For web or document use, Unicode-based mirror text has compatibility advantages despite limitations.",
  },
  {
    question: "Can mirror text be used for security or privacy?",
    answer:
      "Mirror text provides minimal security—anyone with a mirror or who knows to flip the image can read it easily. It only protects against casual observation by people glancing at screens or documents. For actual privacy or security, use proper encryption. Mirror text is suitable for light obfuscation or aesthetic purposes, not protecting sensitive information.",
  },
  {
    question: "How do I mirror text in images or graphics?",
    answer:
      "In graphic design software (Photoshop, Illustrator, GIMP), use horizontal flip or transform tools to mirror text layers. In CSS, use 'transform: scaleX(-1)' to flip text horizontally. For printed materials, design software can flip text before printing. Note that true mirrored text flips the entire character, not just reorders them, creating the reflection effect.",
  },
  {
    question: "What are practical applications of mirror text?",
    answer:
      "Practical uses include emergency vehicle markings (readable in mirrors), window decals for businesses (readable from outside), iron-on transfers for fabrics (which mirror when applied), creating ambigrams and artistic typography, educational tools for teaching symmetry and reflection, anti-copying measures in documents (harder to photocopy clearly), and theatrical or film effects requiring mirrored text.",
  },
];

// Upside Down Text FAQ
export const upsideDownFaqs: FaqType[] = [
  {
    question: "What is upside down text?",
    answer:
      "Upside down text flips text 180 degrees so it appears inverted, as if rotated upside down. It uses special Unicode characters that resemble upside down versions of regular letters. For example, 'hello' becomes 'oןןǝɥ'. The text reads normally when you physically flip your screen or page upside down, creating a fun visual effect.",
  },
  {
    question: "When should I use upside down text?",
    answer:
      "Use upside down text for social media posts to grab attention, creating playful messages in chats or comments, adding novelty to usernames or bio sections (where allowed), making puzzles or games, creating artistic typography effects, surprising friends with unconventional messages, and adding humor or creativity to casual digital communications where visual impact matters.",
  },
  {
    question: "How does upside down text work technically?",
    answer:
      "Upside down text uses Unicode characters that visually resemble inverted letters. These are actual characters from various Unicode blocks (Latin Extended, IPA Extensions, etc.) that happen to look like upside down English letters. The generator maps each regular character to its upside down equivalent. Note that not all characters have perfect upside down versions available.",
  },
  {
    question: "Does upside down text work on all platforms?",
    answer:
      "Upside down text displays on most modern platforms that support Unicode, including social media (Facebook, Twitter, Instagram), messaging apps, websites, and documents. However, some platforms may filter or block certain Unicode characters, and older systems might show missing character symbols (□) instead. Always test on your target platform before relying on upside down text.",
  },
  {
    question: "Can I flip text upside down and backwards simultaneously?",
    answer:
      "Yes, you can combine upside down and reverse transformations to create text that's both inverted and mirrored. This requires first flipping characters upside down, then reversing their order. The result is text that reads correctly when rotated 180 degrees and viewed in a mirror, or simply when rotated 180 degrees, depending on the approach.",
  },
  {
    question: "Are there limitations to upside down text characters?",
    answer:
      "Not all letters, numbers, and symbols have perfect upside down Unicode equivalents. Some characters use approximate matches that may not look exactly inverted. Uppercase and lowercase letters have varying quality matches. Special characters, emojis, and non-Latin scripts often lack upside down versions. The effect works best with standard English lowercase letters.",
  },
  {
    question: "Can upside down text be read by screen readers?",
    answer:
      "Screen readers interpret upside down text as the actual Unicode characters used, not as upside down English letters. For example, 'ɥǝןןo' might be read as individual IPA or Latin Extended characters rather than as 'hello'. This makes upside down text inaccessible to visually impaired users. Avoid it in contexts where accessibility is important.",
  },
  {
    question: "Will upside down text affect SEO or searchability?",
    answer:
      "Yes, negatively. Search engines index upside down text as the actual Unicode characters used, not as their visual representation. Searching for 'hello' won't find 'oןןǝɥ'. This makes content unsearchable and hurts SEO. Use upside down text only for decorative purposes, never for important content, headings, or keywords you want indexed.",
  },
  {
    question: "Can I use upside down text in professional contexts?",
    answer:
      "Generally avoid upside down text in professional contexts like business emails, formal documents, resumes, or client communications. It appears unprofessional and may not display correctly on all systems. It also creates accessibility issues and can be perceived as gimmicky. Reserve upside down text for casual, creative, or entertainment-focused communications.",
  },
  {
    question: "How do I convert upside down text back to normal?",
    answer:
      "Use the same upside down text tool to convert back—most generators work bidirectionally. Alternatively, manually replace upside down Unicode characters with their normal equivalents, though this is tedious. If you've saved the original text, that's the simplest solution. Some tools offer 'flip back' or 'normalize' functions specifically for reversing the transformation.",
  },
];

// Leet Speak FAQ
export const leetSpeakFaqs: FaqType[] = [
  {
    question: "What is leetspeak (1337 speak)?",
    answer:
      "Leetspeak (or 1337 speak) is an alternative alphabet where letters are replaced with numbers and special characters that resemble them. For example, 'leet' becomes '1337', 'A' becomes '4', 'E' becomes '3', and 'S' becomes '5' or '$'. It originated in 1980s hacker culture and gaming communities as a way to bypass text filters and create in-group language.",
  },
  {
    question: "When should I use leetspeak?",
    answer:
      "Use leetspeak for gaming usernames or clan tags, creating nostalgic internet culture references, adding style to informal online communications, making text stand out in forums or chats, creating passwords with character substitutions, designing retro or gaming-themed content, and referencing hacker or cyberpunk aesthetics in creative projects.",
  },
  {
    question: "What are the common leetspeak character substitutions?",
    answer:
      "Common substitutions include: A→4, B→8, E→3, G→9, I→1, L→1, O→0, S→5 or $, T→7, and Z→2. Advanced leetspeak uses more complex replacements like A→@, H→#, S→$, X→><, or multi-character substitutions. Different leetspeak 'levels' exist, from basic (minimal substitutions) to extreme (maximum character replacement and modifications).",
  },
  {
    question: "What are different levels of leetspeak?",
    answer:
      "Leetspeak has varying complexity levels: Basic level uses simple number substitutions (hello→h3llo), intermediate adds special characters (hello→h3ll0), advanced uses multiple substitutions and creative spellings (hello→|-|3|_|_0), and extreme or 'elite' level becomes nearly unreadable with maximum substitutions, intentional misspellings, and complex character combinations. Choose the level based on your audience and purpose.",
  },
  {
    question: "Is leetspeak still relevant today?",
    answer:
      "Leetspeak has evolved from practical necessity to nostalgic internet culture reference. While less common for bypassing filters (modern filters detect it), it remains popular in gaming communities, internet memes, retro aesthetics, and as homage to early internet culture. It's now more about style and community identity than functional obfuscation or exclusivity.",
  },
  {
    question: "Can leetspeak bypass content filters?",
    answer:
      "Modern content filters and moderation systems are designed to detect leetspeak variations, making it largely ineffective for bypassing restrictions. Attempting to use leetspeak to evade filters may result in account penalties. Filters now use pattern recognition and character substitution detection to identify leetspeak versions of prohibited words, making this historical purpose obsolete.",
  },
  {
    question: "Should I use leetspeak for passwords?",
    answer:
      "While leetspeak-style substitutions (password→p4ssw0rd) were once recommended, they're now considered weak because password crackers include common leetspeak patterns in their dictionaries. Modern password security emphasizes length, randomness, and using password managers. If you do use substitutions, combine them with other security practices like sufficient length (16+ characters) and unique passwords per account.",
  },
  {
    question: "Does leetspeak work with all languages?",
    answer:
      "Leetspeak originated for English and works best with the Latin alphabet where character-to-number visual similarities exist. Some substitutions may work for other Latin-based languages, but languages with different scripts (Cyrillic, Arabic, Chinese) don't have equivalent leetspeak conventions. The visual similarity between letters and numbers is specific to Latin letterforms and Arabic numerals.",
  },
  {
    question: "How readable is leetspeak text?",
    answer:
      "Basic leetspeak remains fairly readable (h3ll0 w0r1d), but advanced levels become difficult to read, especially for those unfamiliar with the conventions. The more substitutions used, the harder comprehension becomes. This was partly intentional—creating an in-group language. For communication effectiveness, use basic leetspeak sparingly or stick to normal text for important messages.",
  },
  {
    question: "What's the cultural significance of leetspeak?",
    answer:
      "Leetspeak represents early internet hacker culture, online gaming communities, and BBS era communication. It symbolized technical savvy and community membership while providing practical ways to bypass early content filters. Today it's a nostalgic reference to 1990s-2000s internet culture, appearing in memes, retro gaming contexts, and as an ironic or humorous stylistic choice referencing early online subcultures.",
  },
];

// Slugify FAQ
export const slugifyFaqs: FaqType[] = [
  {
    question: "What is a slug and why do I need it?",
    answer:
      "A slug is a URL-friendly version of a string, typically used in web addresses. It converts text into lowercase, replaces spaces with hyphens, and removes special characters. Slugs are essential for creating clean, readable URLs like 'my-blog-post' instead of 'My Blog Post!'.",
  },
  {
    question: "How does slugify handle special characters and accents?",
    answer:
      "Slugify automatically removes or converts special characters and accented letters. For example, 'café' becomes 'cafe', and symbols like @, #, $ are stripped out. This ensures your slugs work properly in URLs across all browsers and systems.",
  },
  {
    question: "Can I customize the separator in my slugs?",
    answer:
      "Yes! While hyphens (-) are the default separator, you can choose alternatives like underscores (_) or other characters. Hyphens are recommended because they're treated as word separators by search engines, improving SEO.",
  },
  {
    question:
      "What happens to multiple consecutive spaces or special characters?",
    answer:
      "Slugify condenses multiple spaces or special characters into a single separator. For example, 'Hello    World!!!' becomes 'hello-world' instead of 'hello----world'. This prevents awkward-looking URLs with repeated separators.",
  },
  {
    question: "Are slugs case-sensitive?",
    answer:
      "No, slugs are converted to lowercase by default. This is a best practice because URLs can be case-sensitive on some servers, and lowercase ensures consistency. 'MyBlogPost' and 'myblogpost' will both become 'myblogpost'.",
  },
  {
    question: "How do I handle very long titles when creating slugs?",
    answer:
      "Most slugify tools allow you to set a maximum length. It's recommended to keep slugs under 50-60 characters for SEO and readability. The tool will truncate at word boundaries to avoid cutting words in half.",
  },
  {
    question:
      "Can slugify handle non-English characters like Chinese or Arabic?",
    answer:
      "This depends on the implementation. Basic slugify removes non-Latin characters entirely. Advanced versions can transliterate them (converting 'Привет' to 'privet') or preserve them in URL-encoded format. Check your tool's settings for Unicode support.",
  },
  {
    question: "Is it safe to use slugified text as database identifiers?",
    answer:
      "While slugs work well for URLs, they're not ideal as primary database keys because they can change if titles change, and duplicates are possible. Use numeric IDs as primary keys and slugs as secondary identifiers for user-friendly URLs.",
  },
];

// Unicode Normalizer FAQ
export const unicodeNormalizerFaqs: FaqType[] = [
  {
    question: "What is Unicode normalization and why is it important?",
    answer:
      "Unicode normalization is the process of converting text into a standard form. The same character can be represented in multiple ways in Unicode (like é as a single character or e + accent). Normalization ensures consistent text comparison, searching, and storage across applications.",
  },
  {
    question:
      "What are the different Unicode normalization forms (NFC, NFD, NFKC, NFKD)?",
    answer:
      "NFC (Canonical Composition) combines characters into their composed form. NFD (Canonical Decomposition) breaks them into base + combining marks. NFKC and NFKD are compatibility forms that also convert similar-looking characters to standard equivalents. NFC is most commonly used for general text processing.",
  },
  {
    question: "When should I use NFC vs NFD normalization?",
    answer:
      "Use NFC for most web applications, databases, and file systems as it's more compact and widely supported. Use NFD when you need to process individual character components separately, such as removing accents or analyzing linguistic elements. macOS file systems use NFD by default.",
  },
  {
    question:
      "What's the difference between canonical and compatibility normalization?",
    answer:
      "Canonical normalization (NFC/NFD) preserves character meaning exactly - 'é' stays 'é'. Compatibility normalization (NFKC/NFKD) converts similar characters to common forms - '①' becomes '1', 'ﬁ' becomes 'fi'. Use compatibility forms when you need strict text matching regardless of formatting.",
  },
  {
    question: "Can normalization change the visible appearance of my text?",
    answer:
      "Canonical normalization (NFC/NFD) doesn't change how text looks - it only changes the underlying representation. Compatibility normalization (NFKC/NFKD) can change appearance by converting styled characters like superscripts, circled numbers, or ligatures to their basic equivalents.",
  },
  {
    question:
      "Why do identical-looking strings sometimes fail equality comparisons?",
    answer:
      "This happens when strings use different Unicode representations. For example, 'café' might have é as one character (U+00E9) or as e + combining accent (U+0065 U+0301). They look identical but aren't byte-equal. Normalizing both strings to the same form (like NFC) solves this issue.",
  },
  {
    question: "Does Unicode normalization affect string length?",
    answer:
      "Yes, it can. NFD decomposition typically increases character count (é becomes two characters: e + accent). NFC composition reduces it. This matters for validation, database column sizes, and character limits. Always consider normalized length when setting constraints.",
  },
  {
    question: "Should I normalize user input before storing it in a database?",
    answer:
      "Yes, it's a best practice to normalize (usually to NFC) before storage. This ensures consistent searching, sorting, and comparison. Without normalization, users might create duplicate accounts or miss search results because their input uses different Unicode representations.",
  },
  {
    question: "How does normalization affect sorting and alphabetization?",
    answer:
      "Proper sorting requires normalization first. Without it, 'café' and 'café' (different representations) might sort differently. After normalization, they're treated as identical. For locale-specific sorting (like Spanish or Swedish), you'll also need collation rules beyond normalization.",
  },
  {
    question: "Can normalization help with security vulnerabilities?",
    answer:
      "Yes! Normalization prevents homograph attacks where visually similar characters (like Cyrillic 'а' vs Latin 'a') are used maliciously. NFKC normalization is particularly useful for security-sensitive contexts like usernames, as it converts look-alike characters to standard forms.",
  },
];
