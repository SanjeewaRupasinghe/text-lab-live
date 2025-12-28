import { FaqType } from "@/types/faq.type";

// Base64 FAQ
export const base64Faqs: FaqType[] = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 encoding converts binary data into ASCII text format using 64 printable characters (A-Z, a-z, 0-9, +, /). It represents binary data as text, making it safe to transmit over systems that only handle text. For example, an image or file can be encoded as a Base64 string and embedded directly in HTML, CSS, or JSON.",
  },
  {
    question: "When should I use Base64 encoding?",
    answer:
      "Use Base64 encoding when embedding images in HTML or CSS (data URIs), sending binary data through JSON APIs, encoding attachments in emails, storing binary data in text-based databases or configuration files, transmitting files through text-only protocols, and ensuring binary data integrity during transfer over systems that might modify non-text data.",
  },
  {
    question: "What's the difference between encoding and decoding Base64?",
    answer:
      "Encoding converts binary data or text into Base64 format, creating a longer ASCII string that's safe for text transmission. Decoding converts Base64 strings back into their original binary or text format. Encode when preparing data for transmission, decode when receiving Base64 data to restore the original content.",
  },
  {
    question: "Why does Base64 increase file size?",
    answer:
      "Base64 encoding increases data size by approximately 33% because it represents every 3 bytes of binary data using 4 ASCII characters. This overhead is the trade-off for text compatibility. For example, a 100KB image becomes roughly 133KB when Base64 encoded. Despite the size increase, it's useful for embedding small resources or ensuring data integrity.",
  },
  {
    question: "What is the = padding at the end of Base64 strings?",
    answer:
      "The equals sign (=) serves as padding to ensure the Base64 string length is a multiple of 4 characters. You might see one or two = symbols at the end. This padding is necessary for proper decoding because Base64 processes data in groups of 3 bytes (24 bits) encoded as 4 characters.",
  },
  {
    question: "Can I encode images and files to Base64?",
    answer:
      'Yes, any binary file including images, PDFs, audio, or video can be Base64 encoded. This is commonly used for data URIs in HTML (<img src="data:image/png;base64,...">), embedding fonts in CSS, or including file attachments in JSON. However, large files create very long Base64 strings that may be impractical for some applications.',
  },
  {
    question: "Is Base64 encoding secure or encrypted?",
    answer:
      "No, Base64 is encoding, not encryption. It's easily reversible and provides no security. Anyone can decode Base64 strings to see the original content. Don't use Base64 to hide sensitive information. For security, use proper encryption algorithms like AES. Base64 is solely for data format conversion, not protection.",
  },
  {
    question: "What are URL-safe Base64 variants?",
    answer:
      "Standard Base64 uses + and / characters that have special meaning in URLs. URL-safe Base64 (Base64URL) replaces + with - (minus) and / with _ (underscore), making encoded data safe to use in URLs, filenames, and other contexts where + and / cause problems. Padding (=) is also often omitted in URL-safe variants.",
  },
  {
    question: "Can Base64 handle non-English text and special characters?",
    answer:
      "Yes, Base64 can encode any text in any language. However, the text is first converted to bytes (typically UTF-8 encoding), then those bytes are Base64 encoded. When decoding, you must use the same character encoding (UTF-8, ASCII, etc.) to correctly restore special characters, accents, and non-Latin scripts.",
  },
  {
    question: "How do I use Base64 encoded images in HTML?",
    answer:
      "Use data URIs with the format: <img src=\"data:image/png;base64,iVBORw0KG...\">. The 'image/png' is the MIME type (use image/jpeg for JPG, image/svg+xml for SVG, etc.), followed by ';base64,' and the encoded data. This embeds the image directly in HTML, eliminating separate file requests but increasing HTML size.",
  },
];

// URL Encoder FAQ
export const urlEncoderFaqs: FaqType[] = [
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (also called percent encoding) converts special characters in URLs into a format that can be safely transmitted over the internet. It replaces unsafe characters with a percent sign (%) followed by two hexadecimal digits. For example, a space becomes '%20' and '&' becomes '%26'. This ensures URLs work correctly across all systems.",
  },
  {
    question: "When should I use URL encoding?",
    answer:
      "Use URL encoding when passing data in query parameters, including user input in URLs, sending form data via GET requests, creating shareable links with special characters, encoding file names in URLs, building API requests with parameters, and whenever you need to include spaces, special characters, or non-ASCII text in URLs.",
  },
  {
    question: "What's the difference between URL encoding and decoding?",
    answer:
      "URL encoding converts special characters into percent-encoded format (%20, %26, etc.), making text safe for URLs. URL decoding reverses this process, converting percent-encoded characters back to their original form. Encode before sending data in URLs, decode when receiving URL parameters to read the original values.",
  },
  {
    question: "Which characters need to be URL encoded?",
    answer:
      "Reserved characters that need encoding include spaces, &, =, ?, #, /, +, %, <, >, {, }, |, \\, ^, ~, [, ], and `. Non-ASCII characters (accents, non-Latin scripts) also require encoding. Unreserved characters (A-Z, a-z, 0-9, -, _, ., ~) are safe and don't need encoding. Different URL parts (path, query, fragment) have slightly different encoding rules.",
  },
  {
    question: "What's the difference between space as %20 and +?",
    answer:
      "In query strings, spaces can be encoded as either %20 or + (plus sign). Both are valid: 'hello world' can become 'hello%20world' or 'hello+world'. However, in URL paths, only %20 is correct. The + encoding is specific to application/x-www-form-urlencoded format used in forms and query parameters.",
  },
  {
    question: "Should I encode the entire URL or just parts?",
    answer:
      "Never encode the entire URL including the protocol (https://) and domain. Only encode the dynamic parts: path segments, query parameter values, and fragments. For example, encode 'search term' in 'https://example.com/search?q=search%20term', but don't encode the base URL structure or parameter names.",
  },
  {
    question: "How does URL encoding handle non-English characters?",
    answer:
      "Non-ASCII characters (like é, ñ, 中文, العربية) are first converted to UTF-8 bytes, then each byte is percent-encoded. For example, 'café' becomes 'caf%C3%A9' where %C3%A9 represents the UTF-8 encoding of 'é'. Modern browsers handle this automatically, but it's important when building URLs programmatically.",
  },
  {
    question: "Can URL encoding break my links?",
    answer:
      "Double-encoding can cause problems. If you encode an already encoded URL, '%20' becomes '%2520', breaking the link. Also, encoding parts that shouldn't be encoded (like the domain or protocol) will break URLs. Always encode only the dynamic values, not the URL structure, and avoid encoding data that's already encoded.",
  },
  {
    question: "What's the difference between URL encoding and HTML encoding?",
    answer:
      "URL encoding uses percent notation (%20) for URLs and URIs. HTML encoding uses entity notation (&amp;, &lt;) for HTML content. They serve different purposes: URL encoding makes characters safe for URLs, HTML encoding makes characters safe for HTML display. Use URL encoding for links and parameters, HTML encoding for page content.",
  },
  {
    question: "Do I need to URL encode JSON in API requests?",
    answer:
      "If sending JSON in the request body (POST, PUT), don't URL encode it—send it as-is with proper Content-Type headers. However, if passing JSON as a URL query parameter (less common), you must URL encode the entire JSON string. Most APIs use request bodies for JSON data, avoiding the need for URL encoding.",
  },
];

// Caesar Cipher FAQ
export const caesarCipherFaqs: FaqType[] = [
  {
    question: "What is a Caesar Cipher?",
    answer:
      "A Caesar Cipher is one of the simplest encryption techniques where each letter in the text is shifted by a fixed number of positions in the alphabet. For example, with a shift of 3, 'A' becomes 'D', 'B' becomes 'E', and so on. Named after Julius Caesar who reportedly used it, it's a basic substitution cipher.",
  },
  {
    question: "When should I use a Caesar Cipher?",
    answer:
      "Use Caesar Cipher for educational purposes to learn encryption basics, creating simple puzzles or games, obfuscating text in non-security contexts like ROT13 for spoilers, demonstrating cryptography concepts, or creating basic encoding challenges. Never use it for actual security as it's extremely easy to break.",
  },
  {
    question: "How does the shift value work?",
    answer:
      "The shift value (also called key) determines how many positions each letter moves in the alphabet. A shift of 1 moves 'A' to 'B', shift of 3 moves 'A' to 'D', and so on. Shifts wrap around: with shift 3, 'Z' becomes 'C'. Valid shifts are 1-25; shift of 0 leaves text unchanged, shift of 26 returns to the original.",
  },
  {
    question: "What is ROT13 and how is it related to Caesar Cipher?",
    answer:
      "ROT13 is a specific Caesar Cipher with a shift of 13. It's special because applying ROT13 twice returns the original text (since the alphabet has 26 letters). ROT13 is commonly used online to hide spoilers, puzzle solutions, or potentially offensive content without actual encryption, as it's trivially reversible.",
  },
  {
    question: "Does Caesar Cipher work with numbers and special characters?",
    answer:
      "Traditional Caesar Cipher only shifts letters (A-Z, a-z), leaving numbers, spaces, punctuation, and special characters unchanged. Some implementations offer options to shift numbers (0-9) separately or include other character sets, but the classic cipher preserves all non-alphabetic characters in their original positions.",
  },
  {
    question: "How do I decrypt Caesar Cipher without knowing the shift?",
    answer:
      "With only 25 possible shifts, you can try all of them (brute force attack) in seconds. Look for readable text in the outputs. Alternatively, use frequency analysis: 'E' is the most common letter in English, so find the most frequent letter and calculate the shift. This is why Caesar Cipher provides no real security.",
  },
  {
    question: "Is Caesar Cipher case-sensitive?",
    answer:
      "Most implementations preserve the original case: uppercase letters shift to uppercase, lowercase to lowercase. For example, with shift 3, 'Hello' becomes 'Khoor', not 'KHOOR' or 'khoor'. This maintains the text's readability while applying the cipher transformation to each letter independently based on its case.",
  },
  {
    question: "Can Caesar Cipher encrypt non-English text?",
    answer:
      "Standard Caesar Cipher works with the 26-letter Latin alphabet (A-Z). For languages with accented characters (é, ñ, ü) or non-Latin scripts (Cyrillic, Arabic, Chinese), you need adapted implementations. Some tools ignore accents, others have extended character sets, but classic Caesar Cipher is designed for English text.",
  },
  {
    question:
      "What's the difference between encoding and encrypting with Caesar Cipher?",
    answer:
      "While Caesar Cipher performs a transformation, it's technically encryption (though very weak). Encoding (like Base64) is reversible without a key, while encryption requires a key (the shift value). However, Caesar Cipher is so weak that it's often considered obfuscation rather than true encryption for security purposes.",
  },
  {
    question: "Why is Caesar Cipher considered insecure?",
    answer:
      "Caesar Cipher is insecure because there are only 25 possible keys, making brute force attacks trivial. Frequency analysis easily breaks it by identifying common letters. It has no confusion or diffusion properties. Modern encryption like AES uses complex algorithms with enormous key spaces. Caesar Cipher is purely educational, never use it for protecting sensitive data.",
  },
];

// ROT13 FAQ
export const rot13Faqs: FaqType[] = [
  {
    question: "What is ROT13?",
    answer:
      "ROT13 (rotate by 13 places) is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet. For example, 'A' becomes 'N', 'B' becomes 'O', and 'N' becomes 'A'. Because the alphabet has 26 letters, applying ROT13 twice returns the original text.",
  },
  {
    question: "When should I use ROT13?",
    answer:
      "Use ROT13 for hiding spoilers in online discussions, obscuring puzzle solutions or answers, masking potentially offensive content, creating simple text obfuscation for games or challenges, and hiding email addresses from spam bots. It's not for security—anyone can easily decode it. It's purely for hiding text from casual viewing.",
  },
  {
    question: "How is ROT13 different from other Caesar Ciphers?",
    answer:
      "ROT13 is a specific Caesar Cipher with a fixed shift of 13. Its unique property is symmetry: encoding and decoding use the same operation. Other Caesar Ciphers require knowing the shift value to decrypt, but ROT13 is its own inverse. Apply ROT13 to encode, apply it again to decode—no separate decryption needed.",
  },
  {
    question: "Why is ROT13 self-reciprocal?",
    answer:
      "ROT13 is self-reciprocal because 13 is exactly half of 26 (the alphabet size). Shifting 13 positions forward, then 13 more positions forward, totals 26 positions, which wraps back to the starting letter. This makes ROT13 uniquely symmetrical: encoding and decoding are identical operations, simplifying implementation and use.",
  },
  {
    question: "Does ROT13 affect numbers and special characters?",
    answer:
      "Standard ROT13 only transforms letters (A-Z, a-z), leaving numbers, spaces, punctuation, and special characters completely unchanged. Some extended versions include ROT5 for digits (rotating 0-9 by 5 positions) or ROT47 for a wider ASCII range, but classic ROT13 preserves all non-alphabetic characters.",
  },
  {
    question: "What is ROT13 commonly used for online?",
    answer:
      "ROT13 is widely used on forums, newsgroups, and discussion boards to hide spoilers for movies, books, or TV shows, conceal puzzle or riddle answers, obscure potentially offensive jokes or content, hide email addresses from web scrapers, and mark content that readers should consciously choose to reveal rather than see accidentally.",
  },
  {
    question: "Is ROT13 secure for protecting sensitive data?",
    answer:
      "Absolutely not. ROT13 provides zero security—it's trivially decoded by anyone. It's obfuscation, not encryption. Never use ROT13 for passwords, personal information, financial data, or anything requiring actual security. Use proper encryption like AES for sensitive data. ROT13 is only for hiding casual content from accidental viewing.",
  },
  {
    question: "How do I decode ROT13 text?",
    answer:
      "Simply apply ROT13 again to the encoded text. Because ROT13 is its own inverse, encoding and decoding are the same operation. You can use online ROT13 tools, write a simple script, or mentally decode short text by counting 13 letters forward in the alphabet for each character.",
  },
  {
    question: "Can ROT13 handle uppercase and lowercase letters?",
    answer:
      "Yes, ROT13 preserves case: uppercase letters rotate to uppercase, lowercase to lowercase. For example, 'Hello' becomes 'Uryyb', maintaining the capital 'H' as capital 'U'. This case preservation keeps encoded text readable and makes it clear that the text has been transformed rather than just scrambled randomly.",
  },
  {
    question: "What is the relationship between ROT13 and ROT5 or ROT47?",
    answer:
      "ROT5 rotates digits 0-9 by 5 positions (0→5, 5→0), while ROT47 rotates a wider range of ASCII characters including letters, numbers, and common symbols. ROT13 can be combined with ROT5 to handle both letters and numbers. ROT47 is more comprehensive but less commonly used than the simpler, letter-only ROT13.",
  },
];

// Morse Code FAQ
export const morseCodeFaqs: FaqType[] = [
  {
    question: "What is Morse Code?",
    answer: "Morse Code is a method of encoding text characters using sequences of dots (·) and dashes (−), or short and long signals. Each letter, number, and punctuation mark has a unique pattern. For example, 'A' is '·−', 'B' is '−···', and 'SOS' is '···−−−···'. It was developed in the 1830s for telegraph communication."
  },
  {
    question: "When should I use Morse Code conversion?",
    answer: "Use Morse Code for learning or teaching telegraphy, creating puzzles and games, emergency signaling (SOS is universally recognized), educational projects about communication history, amateur radio practice, accessibility tools for certain disabilities, novelty applications, and understanding historical or military communications that used Morse Code."
  },
  {
    question: "What's the difference between dots and dashes?",
    answer: "In Morse Code, a dot (dit) represents a short signal and a dash (dah) represents a long signal, typically three times the duration of a dot. When written, dots are shown as '·' or '.' and dashes as '−' or '-'. The timing and spacing between dots, dashes, letters, and words are crucial for proper transmission and decoding."
  },
  {
    question: "How are letters separated in Morse Code?",
    answer: "Morse Code uses specific spacing: short space between dots and dashes within a letter, medium space between letters (typically 3 dot-lengths), and longer space between words (typically 7 dot-lengths). When written, letters are often separated by spaces or forward slashes, and words by multiple spaces or slashes: '·− / −··· / ···' for 'A B S'."
  },
  {
    question: "Can Morse Code encode numbers and punctuation?",
    answer: "Yes, Morse Code includes patterns for all digits (0-9) and common punctuation marks. For example, '1' is '·−−−−', '5' is '·····', '0' is '−−−−−', period is '·−·−·−', and comma is '−−··−−'. Special characters and symbols have standardized codes, though some rarely-used characters may vary by implementation."
  },
  {
    question: "What is International Morse Code versus American Morse Code?",
    answer: "International Morse Code (also called Continental Morse) is the standardized version used worldwide, developed in the 1850s. American Morse Code (Railroad Morse) was used mainly for landline telegraphy in North America and has different patterns for some letters. Modern tools use International Morse Code as it's the global standard."
  },
  {
    question: "How do I pronounce or sound out Morse Code?",
    answer: "Morse Code is traditionally vocalized as 'dit' for dots and 'dah' for dashes. For example, 'A' (·−) is pronounced 'dit-dah', 'S' (···) is 'dit-dit-dit', and 'O' (−−−) is 'dah-dah-dah'. This vocalization helps with learning and transmitting Morse Code, especially in radio communications where operators verbally practice patterns."
  },
  {
    question: "What is the SOS distress signal in Morse Code?",
    answer: "SOS is '···−−−···' (dit-dit-dit-dah-dah-dah-dit-dit-dit), representing the letters S, O, S. It was chosen for distress signals because it's distinctive and easy to recognize, not because it stands for 'Save Our Ship' (a backronym). SOS should be sent as a continuous sequence without letter spacing for maximum clarity in emergencies."
  },
  {
    question: "Can Morse Code be transmitted beyond sound?",
    answer: "Yes, Morse Code can be transmitted through sound (radio, telegraph), light (flashlight, signal lamp, blinking), visual flags, electrical signals, vibrations, or even touch. This versatility makes it valuable for emergency communication when normal channels fail. Each method uses short and long signals to represent dots and dashes respectively."
  },
  {
    question: "Is Morse Code still used today?",
    answer: "While no longer required for commercial radio operators, Morse Code is still used by amateur radio enthusiasts, in some aviation and maritime contexts, for emergency signaling, in accessibility technology for people with certain disabilities, and for educational purposes. Its simplicity and reliability make it valuable in situations where other communication methods fail."
  }
];