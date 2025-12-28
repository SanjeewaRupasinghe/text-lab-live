import { FaqType } from "@/types/faq.type";

// Emoji Picker FAQ
export const emojiPickerFaqs: FaqType[] = [
  {
    question: "How do I copy an emoji to use in my project?",
    answer:
      "Simply click on any emoji in the picker and it will be automatically copied to your clipboard. You can then paste it directly into your code, documentation, messages, or anywhere else you need it. No additional steps required!",
  },
  {
    question: "What's the difference between emoji, Unicode, and shortcode?",
    answer:
      "An emoji is the visual character (😀), Unicode is its unique code point (U+1F600), and shortcode is the text representation (:grinning:) used in platforms like Slack or GitHub. Our picker shows all three formats so you can use whichever your project requires.",
  },
  {
    question: "Will emojis look the same across all platforms and devices?",
    answer:
      "No, emojis are rendered differently on each platform (iOS, Android, Windows, macOS). While the general meaning stays the same, colors and styles vary. A yellow smiley on iPhone might look slightly different on Android. Test your emojis on target platforms for consistency.",
  },
  {
    question: "How do I use emojis in HTML and JavaScript?",
    answer:
      "You can paste emojis directly into your code: <span>😀</span> or use Unicode escape sequences in JavaScript: '\\u{1F600}' or '\\uD83D\\uDE00'. HTML entities aren't standard for emojis, so direct Unicode is recommended for best compatibility.",
  },
  {
    question: "Can I use emojis in database fields and URLs?",
    answer:
      "Yes, but your database must support UTF-8 encoding (preferably utf8mb4 in MySQL). For URLs, emojis need to be percent-encoded. While technically possible, emojis in URLs aren't recommended for SEO and compatibility reasons. They work fine in database content fields.",
  },
  {
    question: "What are skin tone modifiers and how do they work?",
    answer:
      "Skin tone modifiers are special Unicode characters that combine with certain emojis (like 👋) to create variations (👋🏻👋🏿). Not all emojis support skin tones - mainly those depicting people or body parts. The modifier is a separate character that follows the base emoji.",
  },
  {
    question: "How do I search for specific emojis quickly?",
    answer:
      "Use the search bar to find emojis by name, keyword, or category. Try searching for emotions (happy, sad), objects (car, phone), or activities (running, cooking). You can also browse by categories like smileys, animals, food, or symbols.",
  },
  {
    question: "Are all emojis supported in older browsers or systems?",
    answer:
      "No, newer emojis may not display on older operating systems or browsers. If an emoji isn't supported, users will see a blank square or tofu character (□). For critical content, consider providing text alternatives or using emoji fonts as fallbacks.",
  },
  {
    question: "Can I use emojis in variable names or code identifiers?",
    answer:
      "While Unicode allows emojis in identifiers in many modern languages (Python 3, JavaScript ES6+), it's strongly discouraged. Emojis make code harder to type, search, and maintain. Reserve emojis for strings, comments, and user-facing content only.",
  },
  {
    question: "What's the best way to handle emojis in my API responses?",
    answer:
      "Always use UTF-8 encoding and ensure your Content-Type header specifies charset=utf-8. Return emojis as-is in JSON strings - they're valid JSON. Avoid encoding them as HTML entities or escape sequences unless absolutely necessary, as it makes responses harder to read and debug.",
  },
];
