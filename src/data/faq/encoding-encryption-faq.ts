import { FaqType } from "@/types/faq.type";

// Base64 FAQ
export const base64Faqs: FaqType[] = [
  {
    question: "What is Base64 encoding?",
    answer: "Base64 encoding converts binary data into ASCII text format using 64 printable characters (A-Z, a-z, 0-9, +, /). It represents binary data as text, making it safe to transmit over systems that only handle text. For example, an image or file can be encoded as a Base64 string and embedded directly in HTML, CSS, or JSON."
  },
  {
    question: "When should I use Base64 encoding?",
    answer: "Use Base64 encoding when embedding images in HTML or CSS (data URIs), sending binary data through JSON APIs, encoding attachments in emails, storing binary data in text-based databases or configuration files, transmitting files through text-only protocols, and ensuring binary data integrity during transfer over systems that might modify non-text data."
  },
  {
    question: "What's the difference between encoding and decoding Base64?",
    answer: "Encoding converts binary data or text into Base64 format, creating a longer ASCII string that's safe for text transmission. Decoding converts Base64 strings back into their original binary or text format. Encode when preparing data for transmission, decode when receiving Base64 data to restore the original content."
  },
  {
    question: "Why does Base64 increase file size?",
    answer: "Base64 encoding increases data size by approximately 33% because it represents every 3 bytes of binary data using 4 ASCII characters. This overhead is the trade-off for text compatibility. For example, a 100KB image becomes roughly 133KB when Base64 encoded. Despite the size increase, it's useful for embedding small resources or ensuring data integrity."
  },
  {
    question: "What is the = padding at the end of Base64 strings?",
    answer: "The equals sign (=) serves as padding to ensure the Base64 string length is a multiple of 4 characters. You might see one or two = symbols at the end. This padding is necessary for proper decoding because Base64 processes data in groups of 3 bytes (24 bits) encoded as 4 characters."
  },
  {
    question: "Can I encode images and files to Base64?",
    answer: "Yes, any binary file including images, PDFs, audio, or video can be Base64 encoded. This is commonly used for data URIs in HTML (<img src=\"data:image/png;base64,...\">), embedding fonts in CSS, or including file attachments in JSON. However, large files create very long Base64 strings that may be impractical for some applications."
  },
  {
    question: "Is Base64 encoding secure or encrypted?",
    answer: "No, Base64 is encoding, not encryption. It's easily reversible and provides no security. Anyone can decode Base64 strings to see the original content. Don't use Base64 to hide sensitive information. For security, use proper encryption algorithms like AES. Base64 is solely for data format conversion, not protection."
  },
  {
    question: "What are URL-safe Base64 variants?",
    answer: "Standard Base64 uses + and / characters that have special meaning in URLs. URL-safe Base64 (Base64URL) replaces + with - (minus) and / with _ (underscore), making encoded data safe to use in URLs, filenames, and other contexts where + and / cause problems. Padding (=) is also often omitted in URL-safe variants."
  },
  {
    question: "Can Base64 handle non-English text and special characters?",
    answer: "Yes, Base64 can encode any text in any language. However, the text is first converted to bytes (typically UTF-8 encoding), then those bytes are Base64 encoded. When decoding, you must use the same character encoding (UTF-8, ASCII, etc.) to correctly restore special characters, accents, and non-Latin scripts."
  },
  {
    question: "How do I use Base64 encoded images in HTML?",
    answer: "Use data URIs with the format: <img src=\"data:image/png;base64,iVBORw0KG...\">. The 'image/png' is the MIME type (use image/jpeg for JPG, image/svg+xml for SVG, etc.), followed by ';base64,' and the encoded data. This embeds the image directly in HTML, eliminating separate file requests but increasing HTML size."
  }
];
