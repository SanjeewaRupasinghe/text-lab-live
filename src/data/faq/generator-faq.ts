import { FaqType } from "@/types/faq.type";

// Lorem Generator FAQ
export const loremGeneratorFaqs: FaqType[] = [
  {
    question: "What is Lorem Ipsum?",
    answer: "Lorem Ipsum is placeholder text used in publishing and web design to demonstrate visual form without relying on meaningful content. It uses scrambled Latin text from Cicero's work 'de Finibus Bonorum et Malorum' from 45 BC. The text appears random but has a more-or-less normal distribution of letters, making it look like readable English."
  },
  {
    question: "When should I use a Lorem Ipsum generator?",
    answer: "Use Lorem Ipsum when designing websites or mockups, creating templates without final content, demonstrating typography and layout, testing content management systems, prototyping user interfaces, showing clients design concepts, and whenever you need realistic-looking placeholder text to visualize how actual content will appear in your design."
  },
  {
    question: "Why not just use random words or 'test test test'?",
    answer: "Lorem Ipsum has a realistic distribution of letters and word lengths that resembles actual English text, making designs more accurate. Repeating 'test test test' looks artificial and doesn't show how real content flows. Meaningful content can distract clients from design review. Lorem Ipsum provides realistic visual texture without the distraction of readable content."
  },
  {
    question: "How many paragraphs or words should I generate?",
    answer: "Generate enough text to realistically fill your design: a few sentences for headlines, 1-2 paragraphs for short descriptions, 3-5 paragraphs for article previews, and more for full page layouts. Consider your actual content needs—if blog posts will be 500 words, use similar amounts of Lorem Ipsum to accurately test layout and readability."
  },
  {
    question: "Does it matter which Lorem Ipsum generator I use?",
    answer: "Standard Lorem Ipsum follows the same source text, so most generators produce similar output. However, some offer additional features like HTML formatting (paragraphs, lists), different starting points in the source text, alternative placeholder text styles (Bacon Ipsum, Hipster Ipsum), or custom word counts. Choose based on your formatting needs."
  },
  {
    question: "What are alternative placeholder text generators?",
    answer: "Alternatives include Bacon Ipsum (meat-themed), Hipster Ipsum (hipster culture terms), Cupcake Ipsum (desserts), Pirate Ipsum (pirate speak), and many others. These themed generators add humor to projects but may distract from design review. Use Lorem Ipsum for professional client presentations and themed generators for internal mockups or fun projects."
  },
  {
    question: "Can Lorem Ipsum be used in final production?",
    answer: "Never leave Lorem Ipsum in production. It's placeholder text only. Replace all Lorem Ipsum with actual content before launch. Leaving placeholder text looks unprofessional and confuses users. Use search tools to find any remaining 'lorem ipsum' text, and implement content reviews as part of your launch checklist to ensure all placeholder text is removed."
  },
  {
    question: "Does Lorem Ipsum affect SEO or accessibility?",
    answer: "Lorem Ipsum itself doesn't directly affect SEO or accessibility, but only because it should never be in production. If accidentally published, it provides no SEO value, confuses screen readers, and creates a poor user experience. Always replace placeholder text with real, optimized content that includes relevant keywords and accessible descriptions."
  },
  {
    question: "What does Lorem Ipsum actually mean?",
    answer: "Lorem Ipsum is scrambled Latin text from Cicero's philosophical work. The standard Lorem Ipsum passage beginning 'Lorem ipsum dolor sit amet...' starts mid-sentence from 'dolorem ipsum' (pain itself). The text has been altered and doesn't translate coherently. It's chosen specifically because it's meaningless while appearing like natural language."
  },
  {
    question: "How do I customize Lorem Ipsum length or format?",
    answer: "Most generators let you specify word count, sentence count, or paragraph count. Some offer HTML formatting with proper paragraph tags, lists, or emphasis. You can also specify starting points (all start with 'Lorem ipsum' or vary), include HTML tags for bold or italic text, or generate plain text versus formatted markup based on your needs."
  }
];

// Password Generator FAQ
export const passwordGeneratorFaqs: FaqType[] = [
  {
    question: "What makes a strong password?",
    answer: "A strong password is at least 12-16 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and special symbols. It should be random and unpredictable, avoiding dictionary words, common patterns, personal information, or sequential characters. The more random and longer the password, the harder it is to crack through brute force or guessing attacks."
  },
  {
    question: "When should I use a password generator?",
    answer: "Use a password generator when creating accounts on websites or apps, updating old weak passwords, generating unique passwords for each service, creating passwords that meet specific security requirements, setting up administrative or system accounts, and whenever you need a secure password that's difficult to guess or crack. Never reuse passwords across multiple sites."
  },
  {
    question: "How long should my password be?",
    answer: "Aim for at least 12-16 characters for most accounts, with 16+ characters being ideal for sensitive accounts like email, banking, or work systems. Longer passwords are exponentially harder to crack. Some security experts recommend passphrases of 20+ characters. However, balance security with the site's maximum length limit and your ability to store it securely in a password manager."
  },
  {
    question: "Should I include special characters in passwords?",
    answer: "Yes, including special characters (!@#$%^&*) increases password complexity and security by expanding the possible character pool. However, some websites restrict certain special characters. Most generators let you enable or disable special characters. If a site has restrictions, generate a password that meets their requirements while maximizing length and using all allowed character types."
  },
  {
    question: "Are randomly generated passwords safe to use?",
    answer: "Yes, randomly generated passwords are among the safest because they're unpredictable and don't follow patterns. However, ensure you're using a reputable generator, preferably offline or client-side (where generation happens in your browser, not on a server). Never use passwords from untrusted sources. Store generated passwords securely in a password manager, not in plain text."
  },
  {
    question: "What's better: random passwords or passphrases?",
    answer: "Both are strong if done correctly. Random passwords (like 'Kx9!mP2@qZ7#') are highly secure but hard to remember without a password manager. Passphrases (like 'correct-horse-battery-staple') are easier to remember and can be very secure if long and random. For accounts stored in password managers, use random passwords. For master passwords you must remember, consider passphrases."
  },
  {
    question: "Can I customize the password generator settings?",
    answer: "Most password generators allow customization: length (8-64+ characters), character types (uppercase, lowercase, numbers, symbols), exclude ambiguous characters (0/O, 1/l/I), exclude specific characters that may cause issues, and pronounceable vs. completely random passwords. Adjust settings based on the website's requirements and your security needs, prioritizing length and complexity."
  },
  {
    question: "Should I avoid ambiguous characters like 0, O, 1, l, I?",
    answer: "Excluding ambiguous characters (0/O, 1/l/I) can help prevent confusion when manually typing passwords, especially in certain fonts. However, this slightly reduces password entropy (randomness). If you're using a password manager that auto-fills passwords, include all characters for maximum security. If you must type passwords manually, excluding ambiguous characters is a reasonable trade-off."
  },
  {
    question: "How do I remember generated passwords?",
    answer: "Don't try to memorize generated passwords—use a password manager like Bitwarden, 1Password, LastPass, or KeePass to securely store them. Password managers encrypt your passwords and auto-fill them when needed. You only need to remember one strong master password. This lets you use unique, complex passwords for every account without memorization burden."
  },
  {
    question: "Is it safe to use online password generators?",
    answer: "Reputable online password generators that generate passwords client-side (in your browser using JavaScript) are generally safe, as passwords never leave your device. However, for maximum security, use offline generators, built-in password manager generators, or open-source tools where you can verify the code. Avoid generators that transmit your password to a server or have unclear privacy practices."
  }
];

// ASCII Generator FAQ
export const asciiGeneratorFaqs: FaqType[] = [
  {
    question: "What is ASCII art?",
    answer: "ASCII art is a graphic design technique that uses printable ASCII characters (letters, numbers, symbols) to create images and text designs. It arranges characters like spaces, letters, and symbols to form pictures or stylized text. ASCII art dates back to early computer and typewriter days when graphical displays were limited or unavailable."
  },
  {
    question: "When should I use an ASCII art generator?",
    answer: "Use ASCII art generators for creating eye-catching text banners, adding visual interest to README files or documentation, designing email signatures, creating retro-style graphics, generating terminal or console decorations, making text-based logos, adding personality to plain text communications, and creating art for environments where images aren't supported or desired."
  },
  {
    question: "What's the difference between ASCII text art and ASCII image art?",
    answer: "ASCII text art (also called FIGlet fonts) transforms regular text into large stylized letters using ASCII characters, like banner text. ASCII image art converts photos or drawings into character-based representations where different characters represent brightness or shading. Text art is for typography, image art is for pictures and illustrations."
  },
  {
    question: "Can I convert images to ASCII art?",
    answer: "Yes, ASCII image converters analyze image brightness and map darker areas to dense characters (like @, #, $) and lighter areas to sparse characters (like ., -, space). The result is a text-based representation of the image. Simple, high-contrast images with clear subjects work best. Complex photos may lose detail in conversion."
  },
  {
    question: "What fonts or styles are available for ASCII text?",
    answer: "ASCII text generators offer hundreds of fonts (called FIGlet fonts), ranging from bold and blocky to elegant and cursive styles. Popular styles include 'Banner', 'Big', 'Block', 'Standard', 'Small', 'Graffiti', and '3D'. Different fonts work better for different purposes: bold fonts for headers, compact fonts for space-limited contexts like terminals."
  },
  {
    question: "Where can I use ASCII art?",
    answer: "ASCII art works in plain text environments: code comments, README.md files, terminal applications, email signatures, forum posts, text-based games, IRC or chat clients, source code headers, command-line interfaces, and any context where only text formatting is available. It's universally compatible since it uses only standard ASCII characters."
  },
  {
    question: "Does ASCII art display correctly everywhere?",
    answer: "ASCII art displays best in monospace (fixed-width) fonts like Courier, Consolas, or Monaco where each character occupies the same width. Proportional fonts (like Arial or Times New Roman) can distort ASCII art alignment. Most code editors, terminals, and technical documentation use monospace fonts by default, making them ideal for ASCII art."
  },
  {
    question: "Can I customize ASCII art generation?",
    answer: "Yes, generators typically allow customization: character width and height, specific character sets or palettes, brightness/contrast adjustments for image conversion, color (if supported by the output environment), aspect ratio correction, and level of detail. Experiment with settings to achieve the desired appearance and file size for your use case."
  },
  {
    question: "How do I include ASCII art in code or documentation?",
    answer: "In code, place ASCII art in multi-line comments (/* */ or triple quotes in Python). In Markdown, use code blocks with triple backticks (```) to preserve formatting. Ensure you're using a monospace font context. Some languages may require escaping backslashes. Test that the art displays correctly in your target environment before committing."
  },
  {
    question: "What's the difference between ASCII art and Unicode art?",
    answer: "ASCII art uses only the 95 printable characters from the original ASCII standard (letters, numbers, basic symbols). Unicode art (also called text art) uses the much larger Unicode character set, including box-drawing characters, blocks, and special symbols, allowing for more detailed and refined designs. ASCII is more compatible but more limited."
  }
];

// QR Generator FAQ
export const qrGeneratorFaqs: FaqType[] = [
  {
    question: "What is a QR code?",
    answer: "A QR (Quick Response) code is a two-dimensional barcode that stores information in a pattern of black squares on a white background. It can encode URLs, text, contact information, WiFi credentials, and other data. QR codes can be scanned by smartphone cameras to quickly access the encoded information without manual typing."
  },
  {
    question: "When should I use a QR code generator?",
    answer: "Use QR code generators for sharing website URLs on printed materials, creating contactless payment options, sharing WiFi credentials, adding links to business cards or flyers, enabling quick app downloads, providing event or ticket information, creating interactive marketing materials, and anywhere you want to bridge physical and digital experiences seamlessly."
  },
  {
    question: "What types of data can QR codes store?",
    answer: "QR codes can store various data types: website URLs, plain text, email addresses with subjects, phone numbers for quick dialing, SMS messages, WiFi network credentials, vCards (contact information), geographic coordinates, calendar events, and more. The data type affects how smartphones interpret and act on the scanned information automatically."
  },
  {
    question: "How much information can a QR code hold?",
    answer: "QR code capacity depends on the version (size) and error correction level. Maximum capacities range from about 25 alphanumeric characters (version 1) to 4,296 alphanumeric characters (version 40). However, more data creates denser, larger codes that are harder to scan. For practical use, keep content under 300 characters for reliable scanning."
  },
  {
    question: "What are QR code error correction levels?",
    answer: "QR codes have four error correction levels: Low (7% recovery), Medium (15% recovery), Quartile (25% recovery), and High (30% recovery). Higher levels allow the code to remain readable even if partially damaged or obscured, but require more space. Medium is standard; use High for codes that might get dirty or damaged."
  },
  {
    question: "Can I customize QR code colors and design?",
    answer: "Yes, QR codes can be customized with colors, logos, and designs while remaining scannable. Dark elements should contrast well with light backgrounds. You can change colors (ensure sufficient contrast), add logos in the center (QR error correction compensates), round corners, and add branding. However, excessive customization may reduce scannability—always test thoroughly."
  },
  {
    question: "Do QR codes expire or stop working?",
    answer: "Static QR codes (encoding data directly) never expire—the code itself contains all information. Dynamic QR codes (redirecting through a short URL) depend on the URL service remaining active. If the redirect service shuts down or the URL expires, dynamic codes stop working. Use static codes for permanent materials, dynamic for trackable campaigns."
  },
  {
    question: "What size should a QR code be for printing?",
    answer: "Minimum recommended size is 2 x 2 cm (0.8 x 0.8 inches), but larger is better for reliable scanning. Consider viewing distance: for business cards, 2-3 cm works; for posters viewed from a distance, use 10+ cm. The formula is roughly: size = scanning distance ÷ 10. Always include quiet zone (white border) around the code."
  },
  {
    question: "How do I ensure my QR code scans reliably?",
    answer: "Ensure high contrast between dark and light areas (black on white is best), maintain adequate size for viewing distance, include quiet zone (white border) of at least 4 modules wide, use appropriate error correction level, test on multiple devices and lighting conditions, avoid placing on curved or reflective surfaces, and keep designs simple."
  },
  {
    question: "Can QR codes be used for security or authentication?",
    answer: "QR codes can facilitate security but aren't inherently secure. They're used for two-factor authentication (displaying tokens), secure login (scanning to authenticate), and cryptocurrency transactions. However, malicious QR codes can redirect to phishing sites. Always verify the source before scanning, and use QR code readers that preview URLs before opening them."
  }
];

// Sample Data Generator FAQ
export const sampleDataGeneratorFaqs: FaqType[] = [
  {
    question: "What is a sample data generator?",
    answer: "A sample data generator creates realistic fake data for testing, development, and demonstration purposes. It can generate various data types like users, products, orders, or addresses with realistic names, emails, phone numbers, and other attributes. This data looks authentic but is completely fictional, making it safe for development and testing environments."
  },
  {
    question: "When should I use a sample data generator?",
    answer: "Use sample data generators when developing applications without real user data, testing database schemas and queries, creating demos or presentations, populating staging environments, performance testing with realistic data volumes, training on new systems, creating documentation examples, and whenever you need realistic-looking data without using actual sensitive information."
  },
  {
    question: "What types of sample data can be generated?",
    answer: "Generators can create diverse data types including people data (users, employees, customers, students), business data (companies, products, orders, invoices), location data (addresses, offices, geopoints), content data (articles, documents, comments), transaction data (payments, subscriptions, shipments), organizational data (departments, hierarchies), and system data (logs, notifications, tasks)."
  },
  {
    question: "How realistic is generated sample data?",
    answer: "Quality generators produce highly realistic data with proper formatting, valid patterns, and logical relationships. For example, email addresses match name patterns, phone numbers follow regional formats, addresses are geographically consistent, and dates make chronological sense. However, it's obviously fake data—names use common patterns, and no real individuals are represented."
  },
  {
    question: "Can I customize the generated data format?",
    answer: "Yes, most generators allow customization including output format (JSON, CSV, SQL, XML), number of records to generate, field selection (choose which attributes to include), data localization (names and addresses for specific countries), and custom value ranges or patterns. You can typically adjust settings to match your exact schema and requirements."
  },
  {
    question: "Is generated sample data safe to use publicly?",
    answer: "Yes, generated data is safe for public use because it's completely fictional—no real people, companies, or sensitive information is included. It's ideal for demos, tutorials, open-source projects, and documentation. However, avoid using generators that might accidentally produce real credit card numbers, social security numbers, or other sensitive identifiers through random chance."
  },
  {
    question: "Can sample data maintain relationships between records?",
    answer: "Advanced generators can create relational data where records connect logically, such as orders linked to customers, products in multiple categories, employees assigned to departments, or comments belonging to users. This relational integrity is crucial for testing complex applications with foreign keys, joins, and data dependencies across multiple tables."
  },
  {
    question: "How do I generate data for specific regions or locales?",
    answer: "Many generators support localization, producing data appropriate for specific countries or regions. This includes locale-specific names, addresses with proper postal codes and regions, phone numbers in local formats, appropriate currencies, and culturally relevant data. Choose your target locale to ensure generated data matches the geographic context of your application."
  },
  {
    question: "What's the difference between random and seeded data generation?",
    answer: "Random generation creates different data each time, useful for varied testing scenarios. Seeded generation uses a seed value to produce the same data set reproducibly, essential for consistent testing, debugging specific scenarios, sharing test cases with team members, or creating stable demo data that doesn't change between sessions."
  },
  {
    question: "Can I generate large datasets for performance testing?",
    answer: "Yes, sample data generators can create large volumes of data for load and performance testing. You can generate thousands or millions of records to test database performance, query optimization, pagination, search functionality, and system scalability. Be mindful of browser memory limits for web-based generators—use server-side or command-line tools for very large datasets."
  }
];