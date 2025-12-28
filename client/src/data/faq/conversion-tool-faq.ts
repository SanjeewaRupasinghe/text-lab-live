import { FaqType } from "@/types/faq.type";

// Markdown Editor FAQ
export const markdownEditorFaqs: FaqType[] = [
  {
    question: "What is Markdown?",
    answer:
      "Markdown is a lightweight markup language that uses plain text formatting syntax to create formatted documents. It uses simple symbols like asterisks, hashtags, and brackets to indicate headings, bold text, links, and other formatting. It's widely used for documentation, README files, blogs, and content management systems.",
  },
  {
    question: "When should I use a Markdown editor?",
    answer:
      "Use a Markdown editor when writing documentation, creating README files for projects, drafting blog posts or articles, taking notes, writing technical documentation, creating formatted content for GitHub or other platforms, and whenever you need to create formatted text without complex word processors or HTML.",
  },
  {
    question: "What are the basic Markdown syntax elements?",
    answer:
      "Basic Markdown syntax includes hashtags for headings (# Heading 1, ## Heading 2), asterisks or underscores for emphasis (*italic*, **bold**), square brackets and parentheses for links [text](url), exclamation marks for images ![alt](url), backticks for code (`code`), and hyphens or numbers for lists.",
  },
  {
    question:
      "What's the difference between Markdown preview and raw Markdown?",
    answer:
      "Raw Markdown shows the plain text with formatting symbols visible (like **bold** or # Heading), while preview mode renders the formatted output showing how it will appear when published. Most Markdown editors offer split-view or toggle options to see both the source and rendered versions simultaneously.",
  },
  {
    question: "Can I use HTML in Markdown?",
    answer:
      "Yes, most Markdown processors support inline HTML, allowing you to use HTML tags when Markdown syntax is insufficient. This is useful for advanced formatting like tables, custom styling, or specific HTML elements. However, for portability and simplicity, it's best to use pure Markdown syntax when possible.",
  },
  {
    question: "How do I create tables in Markdown?",
    answer:
      "Tables in Markdown use pipes (|) to separate columns and hyphens to create headers. For example: | Header 1 | Header 2 | followed by | --- | --- | and then data rows. While functional, Markdown tables can be tedious to format manually, and many editors offer table generators or formatting helpers.",
  },
  {
    question: "What are code blocks and how do I create them?",
    answer:
      "Code blocks display formatted code with syntax highlighting. Create them by wrapping code in triple backticks (```). You can specify the language after the opening backticks (```javascript) for syntax highlighting. Inline code uses single backticks (`code`). This is essential for technical documentation and tutorials.",
  },
  {
    question: "Is Markdown the same across all platforms?",
    answer:
      "While basic Markdown syntax is standardized, different platforms support various Markdown flavors like GitHub Flavored Markdown (GFM), CommonMark, or MultiMarkdown. Each may have additional features like task lists, emoji support, or table extensions. Check your target platform's documentation for specific syntax support.",
  },
  {
    question: "Can I export Markdown to other formats?",
    answer:
      "Yes, Markdown can be converted to HTML, PDF, Word documents, and other formats using various tools and converters. Many Markdown editors include export features, or you can use dedicated tools like Pandoc for conversion. This makes Markdown excellent for creating content that needs to be published in multiple formats.",
  },
  {
    question: "How do I add images and links in Markdown?",
    answer:
      "Links use the syntax [link text](URL), such as [Google](https://google.com). Images use a similar syntax with an exclamation mark: ![alt text](image-url). You can also use reference-style links where the URL is defined elsewhere in the document, keeping your content cleaner and more maintainable.",
  },
];

// JSON Formatter FAQ
export const jsonFormatterFaqs: FaqType[] = [
  {
    question: "What is JSON formatting?",
    answer: "JSON formatting transforms compact or minified JSON data into a readable, indented structure with proper line breaks and spacing. For example, '{\"name\":\"John\",\"age\":30}' becomes neatly formatted with each property on its own line. This makes JSON easier to read, debug, and edit while maintaining the same data structure."
  },
  {
    question: "When should I format JSON?",
    answer: "Format JSON when debugging API responses, reviewing configuration files, inspecting data structures, editing JSON manually, analyzing logs, comparing JSON objects, documenting API payloads, and whenever you need to understand or modify JSON data that's been minified or poorly formatted."
  },
  {
    question: "What's the difference between formatting and minifying JSON?",
    answer: "Formatting adds indentation, line breaks, and whitespace to make JSON human-readable, increasing file size. Minifying removes all unnecessary whitespace and line breaks to create compact JSON, reducing file size. Use formatting for development and debugging, minifying for production to optimize network transfer and storage."
  },
  {
    question: "Can JSON formatters validate JSON syntax?",
    answer: "Yes, most JSON formatters include validation that checks for syntax errors like missing commas, unclosed brackets, invalid characters, or incorrect data types. If your JSON is invalid, the formatter will typically show error messages indicating where the problem is, helping you fix syntax issues before formatting."
  },
  {
    question: "What indentation options are available for JSON formatting?",
    answer: "Common indentation options include 2 spaces, 4 spaces, or tabs. Two spaces is most common in modern web development for its balance of readability and compactness. Four spaces offers maximum readability, while tabs allow users to control visual width. Choose based on your project's coding standards."
  },
  {
    question: "Does formatting change the JSON data or structure?",
    answer: "No, formatting only changes whitespace and presentation, never the actual data or structure. The JSON object remains functionally identical after formatting. All keys, values, data types, nesting, and relationships are preserved exactly. Only visual layout changes to improve readability."
  },
  {
    question: "Can JSON formatters handle large files?",
    answer: "Most web-based JSON formatters can handle moderately large files (several megabytes), but very large JSON files may cause browser performance issues or crashes. For extremely large files, consider using command-line tools or desktop applications that can process JSON more efficiently without browser memory limitations."
  },
  {
    question: "What are common JSON syntax errors?",
    answer: "Common errors include trailing commas (not allowed in standard JSON), single quotes instead of double quotes, unquoted property names, missing commas between properties, unclosed brackets or braces, incorrect escape sequences, and invalid data types. JSON formatters help identify these by showing exactly where parsing fails."
  },
  {
    question: "Can I format JSON with comments?",
    answer: "Standard JSON does not support comments, and most strict JSON parsers will reject JSON containing comments. However, some tools support JSON5 or JSONC (JSON with Comments) which allow comments. If your JSON contains comments, ensure your formatter and target application support these extended formats."
  },
  {
    question: "How do I convert between JSON and other formats?",
    answer: "While JSON formatters focus on beautifying JSON, separate tools can convert between JSON and formats like XML, YAML, CSV, or JavaScript objects. Many developer tools offer multi-format conversion. Choose the right tool based on your source and target formats, as each conversion has specific considerations."
  }
];

// XML Formatter FAQ
export const xmlFormatterFaqs: FaqType[] = [
  {
    question: "What is XML formatting?",
    answer: "XML formatting transforms compact or unformatted XML data into a readable, hierarchical structure with proper indentation and line breaks. It arranges opening tags, closing tags, and content in a visually clear way that reflects the document's nested structure, making XML easier to read, edit, and debug."
  },
  {
    question: "When should I format XML?",
    answer: "Format XML when debugging API responses, reviewing configuration files, editing SOAP requests/responses, working with SVG files, analyzing RSS or Atom feeds, inspecting Android layout files, reviewing build configurations (Maven, Gradle), and whenever you need to understand or modify XML that's minified or poorly formatted."
  },
  {
    question: "What's the difference between XML and HTML formatting?",
    answer: "XML is stricter than HTML, requiring all tags to be properly closed, case-sensitive tag names, and quoted attributes. XML formatting preserves these strict rules. HTML formatters are more lenient, handling unclosed tags and case variations. XML is for data exchange, while HTML is for web page structure."
  },
  {
    question: "Can XML formatters validate syntax and structure?",
    answer: "Yes, most XML formatters include validation that checks for well-formedness: proper tag nesting, closed tags, valid attribute syntax, correct escape sequences, and XML declaration format. Some advanced formatters also validate against XML schemas (XSD) or DTDs to ensure the document follows specific structural rules."
  },
  {
    question: "What indentation styles are available for XML?",
    answer: "Common XML indentation options include 2 spaces, 4 spaces, or tabs per nesting level. Two spaces is compact and widely used in modern development. Four spaces offers maximum readability for deeply nested structures. Some formatters also allow custom indentation width and can align attributes vertically."
  },
  {
    question: "Does XML formatting preserve comments and processing instructions?",
    answer: "Yes, good XML formatters preserve comments (<!-- comment -->), processing instructions (<?xml-stylesheet ?>), CDATA sections, and the XML declaration (<?xml version=\"1.0\"?>). These elements are maintained in their correct positions while the surrounding structure is reformatted for better readability."
  },
  {
    question: "How does XML formatting handle attributes?",
    answer: "XML formatters typically keep short attribute lists on the same line as the opening tag, but may break long attribute lists across multiple lines for readability. Some formatters offer options to always place attributes on separate lines, sort attributes alphabetically, or align them vertically for complex elements."
  },
  {
    question: "What are common XML syntax errors?",
    answer: "Common errors include unclosed tags, mismatched opening and closing tags, unquoted or improperly quoted attributes, invalid characters in tag names, incorrect use of special characters without proper escaping (&, <, >, \", '), missing XML declaration, and improper nesting where closing tags appear in wrong order."
  },
  {
    question: "Can XML formatters handle namespaces?",
    answer: "Yes, XML formatters properly handle namespaces including namespace declarations (xmlns), prefixed elements (ns:element), and default namespaces. The formatter preserves namespace declarations and correctly formats elements with namespace prefixes while maintaining the document's namespace structure and validity."
  },
  {
    question: "How do I minify XML for production use?",
    answer: "XML minification removes unnecessary whitespace, line breaks, and optionally comments to reduce file size for production deployment. This is useful for configuration files, API responses, and web services where bandwidth matters. Minified XML maintains all data and structure but becomes difficult for humans to read."
  }
];

// HTML Entities FAQ
export const htmlEntitiesFaqs: FaqType[] = [
  {
    question: "What are HTML entities?",
    answer: "HTML entities are special codes used to represent reserved characters, symbols, and special characters in HTML. For example, '&lt;' represents '<', '&gt;' represents '>', and '&amp;' represents '&'. They ensure these characters are displayed correctly rather than being interpreted as HTML code."
  },
  {
    question: "When should I encode HTML entities?",
    answer: "Encode HTML entities when displaying user-generated content to prevent XSS attacks, showing code examples in HTML, including special characters in HTML attributes, displaying reserved HTML characters like <, >, &, and quotes, and ensuring text is safely rendered in browsers without breaking HTML structure."
  },
  {
    question: "What's the difference between encoding and decoding HTML entities?",
    answer: "Encoding converts special characters into HTML entity format ('&' becomes '&amp;'), making them safe for HTML display. Decoding converts HTML entities back into their original characters ('&amp;' becomes '&'). Encoding is for output to HTML, decoding is for processing or displaying the actual characters."
  },
  {
    question: "What are the most common HTML entities?",
    answer: "Common HTML entities include &lt; (<), &gt; (>), &amp; (&), &quot; (\"), &apos; ('), &nbsp; (non-breaking space), &copy; (©), &reg; (®), &trade; (™), and &euro; (€). These handle reserved characters, quotes, spacing, and frequently used symbols."
  },
  {
    question: "Why is encoding important for security?",
    answer: "Encoding prevents Cross-Site Scripting (XSS) attacks by ensuring user input containing HTML or JavaScript code is displayed as text rather than executed. For example, '<script>alert(\"XSS\")</script>' becomes '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;', which displays safely without running malicious code."
  },
  {
    question: "What's the difference between named and numeric HTML entities?",
    answer: "Named entities use memorable names like '&copy;' for ©, while numeric entities use character codes like '&#169;' (decimal) or '&#xA9;' (hexadecimal). Named entities are more readable but limited to predefined characters. Numeric entities can represent any Unicode character but are harder to remember."
  },
  {
    question: "Do I need to encode all special characters in HTML?",
    answer: "Not always. Only encode characters that have special meaning in HTML (<, >, &, quotes) or characters that might cause display issues. Modern UTF-8 encoded HTML can display most international characters directly without encoding. However, encoding is always safer when dealing with user input or dynamic content."
  },
  {
    question: "Can HTML entity encoding break my content?",
    answer: "Double-encoding can cause issues where '&amp;' becomes '&amp;amp;', displaying incorrectly. Also, encoding content that's already been properly escaped can create problems. Avoid encoding HTML entities multiple times, and ensure you're only encoding raw content, not already-processed HTML."
  },
  {
    question: "How do HTML entities work with different character encodings?",
    answer: "HTML entities work universally across different character encodings (UTF-8, ISO-8859-1, etc.). This makes them useful for ensuring special characters display correctly regardless of the document's encoding. However, with modern UTF-8 encoding, many special characters can be included directly without entity encoding."
  },
  {
    question: "Should I use HTML entities in JavaScript strings?",
    answer: "No, HTML entities are for HTML content, not JavaScript strings. In JavaScript, use escape sequences (\\n for newline, \\' for quote) or Unicode escapes (\\u00A9 for ©). If inserting JavaScript strings into HTML, encode them as HTML entities at the insertion point, not within the JavaScript code itself."
  }
];

// CSV to JSON Converter FAQs
export const csvJsonConverterFaqs: FaqType[] = [
  {
    question: "What is CSV to JSON conversion?",
    answer: "CSV to JSON conversion transforms comma-separated values data into JSON (JavaScript Object Notation) format. Each CSV row becomes a JSON object, with column headers becoming property names. For example, a CSV with 'name,age' header and 'John,30' data becomes {\"name\":\"John\",\"age\":30}. This makes tabular data usable in web applications and APIs."
  },
  {
    question: "When should I convert CSV to JSON?",
    answer: "Convert CSV to JSON when importing data into web applications, preparing data for API consumption, working with JavaScript frameworks, transforming spreadsheet exports for programming use, creating configuration files, feeding data to visualization libraries, or whenever you need structured data in a format easily parsed by modern programming languages."
  },
  {
    question: "How does the converter handle CSV headers?",
    answer: "Most converters use the first row as headers, which become JSON property names. For example, headers 'firstName,lastName,email' create objects like {\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\"}. If your CSV lacks headers, some tools can generate generic names like 'column1', 'column2', or let you specify custom headers."
  },
  {
    question: "What happens to empty cells in CSV?",
    answer: "Empty cells can be handled in different ways: converted to empty strings (\"\"), null values, or omitted entirely from the JSON object. The approach depends on your converter settings and use case. For data integrity, null values are often preferred to distinguish between empty and missing data."
  },
  {
    question: "Can the converter detect data types automatically?",
    answer: "Advanced converters can detect and convert data types, recognizing numbers, booleans, and dates. For example, '25' becomes 25 (number), 'true' becomes true (boolean), and '2024-01-15' might become a date object. Basic converters treat all values as strings. Type detection is useful but may occasionally misinterpret data."
  },
  {
    question: "How does conversion handle special characters and quotes?",
    answer: "CSV files use quotes to escape commas, quotes, and newlines within fields. Good converters properly parse these escape sequences, so a CSV field containing 'John \"Johnny\" Doe' correctly becomes a JSON string. The converter must handle both single and double quotes according to CSV standards."
  },
  {
    question: "What's the difference between array and object JSON output?",
    answer: "Array format creates a JSON array of objects: [{\"name\":\"John\"},{\"name\":\"Jane\"}]. Object format might nest data or use keys: {\"row1\":{\"name\":\"John\"},\"row2\":{\"name\":\"Jane\"}}. Array format is most common and works well with JavaScript array methods and most APIs expecting collections of records."
  },
  {
    question: "Can I convert JSON back to CSV?",
    answer: "Yes, JSON to CSV conversion is also available. It transforms an array of JSON objects back into CSV format, using object keys as headers and values as row data. This is useful for exporting data to spreadsheets, creating reports, or working with tools that only accept CSV format."
  },
  {
    question: "How do converters handle nested or complex JSON structures?",
    answer: "Simple CSV converters work best with flat data (one level deep). Nested JSON objects or arrays within values require special handling: they might be flattened with dot notation (user.name), converted to JSON strings within CSV cells, or require manual restructuring. Complex hierarchical data doesn't map cleanly to CSV's flat structure."
  },
  {
    question: "What about different CSV delimiters like semicolons or tabs?",
    answer: "While standard CSV uses commas, many converters support alternative delimiters like semicolons (common in European locales), tabs (TSV format), pipes, or custom characters. This flexibility is essential because different regions and systems export CSV with different separators. Good converters auto-detect or let you specify the delimiter."
  }
];

// Diff Checker FAQs
export const diffCheckerFaqs: FaqType[] = [
  {
    question: "What is a diff checker?",
    answer: "A diff checker (difference checker) compares two text inputs and highlights the differences between them. It shows what's been added, removed, or changed, typically using color coding: green for additions, red for deletions, and sometimes yellow for modifications. This makes it easy to spot changes between document versions or code revisions."
  },
  {
    question: "When should I use a diff checker?",
    answer: "Use a diff checker when comparing document versions, reviewing code changes before committing, checking what's changed in configuration files, verifying data synchronization, comparing API responses, proofreading edited text, identifying differences in contracts or legal documents, and debugging by comparing expected versus actual output."
  },
  {
    question: "What's the difference between line-by-line and character-by-character comparison?",
    answer: "Line-by-line comparison treats each line as a unit, showing which entire lines were added, removed, or changed. Character-by-character (or word-by-word) comparison shows precise differences within lines, highlighting specific characters or words that changed. Use line mode for code, character mode for prose or small text changes."
  },
  {
    question: "How does a diff checker highlight changes?",
    answer: "Most diff checkers use color coding: red or pink background for deleted content, green background for added content, and sometimes yellow or blue for modified content. Side-by-side views show original and modified versions in parallel, while unified views show changes inline with context lines above and below."
  },
  {
    question: "What is a unified diff versus a side-by-side diff?",
    answer: "Side-by-side diff displays both versions in parallel columns, making it easy to see the full context of both texts. Unified diff shows changes inline in a single view with +/- symbols indicating additions and removals, like Git diffs. Side-by-side is better for readability, unified is more compact and standard in version control."
  },
  {
    question: "Can diff checkers ignore whitespace or case differences?",
    answer: "Yes, most diff checkers offer options to ignore whitespace changes (spaces, tabs, line breaks), trailing whitespace, or case differences. This is useful when comparing code with different formatting styles, checking content changes without caring about indentation, or when case variations don't matter for your comparison purpose."
  },
  {
    question: "How accurate are diff checkers with large files?",
    answer: "Diff checkers use algorithms like Myers diff or patience diff that efficiently handle large files. However, very large files (megabytes) may cause performance issues in web-based tools. For optimal accuracy and performance, diff checkers work best with text files under a few thousand lines. For larger files, consider command-line tools."
  },
  {
    question: "What does context mean in diff output?",
    answer: "Context refers to unchanged lines shown around changes to help you understand where modifications occurred. For example, showing 3 lines of context means displaying 3 unchanged lines before and after each change. More context helps locate changes in large documents, while less context creates more compact diffs."
  },
  {
    question: "Can diff checkers compare code and preserve syntax?",
    answer: "Yes, many diff checkers support syntax highlighting for various programming languages, showing code differences while maintaining proper color coding for keywords, strings, and comments. This makes it easier to review code changes by providing visual cues about the code structure alongside the difference indicators."
  },
  {
    question: "How do I export or share diff results?",
    answer: "Diff checkers often provide options to copy the highlighted comparison, export as HTML with color coding preserved, generate a patch file (unified diff format), or create a shareable link. HTML export is useful for documentation, while patch files work with version control systems like Git for applying changes programmatically."
  }
];

// Regex Tester FAQs
export const regexTesterFaqs: FaqType[] = [
  {
    question: "What is a regex tester?",
    answer: "A regex tester is a tool that lets you write and test regular expressions (regex) against sample text in real-time. It highlights matches, shows capture groups, and helps you debug pattern matching issues. This makes it easier to build and refine regex patterns for validation, searching, and text manipulation tasks."
  },
  {
    question: "When should I use a regex tester?",
    answer: "Use a regex tester when validating email addresses, phone numbers, or URLs, extracting specific patterns from text, building search and replace operations, parsing log files or data, testing form validation rules, learning regex syntax, and debugging why a regex pattern isn't matching as expected."
  },
  {
    question: "What are regex flags and how do they work?",
    answer: "Regex flags modify pattern matching behavior. Common flags include 'g' (global - find all matches), 'i' (case-insensitive), 'm' (multiline - ^ and $ match line boundaries), 's' (dotall - dot matches newlines), and 'u' (unicode). For example, /test/gi finds all instances of 'test', 'Test', 'TEST' in the text."
  },
  {
    question: "What are capture groups in regex?",
    answer: "Capture groups use parentheses to extract specific parts of a match. For example, in the pattern (\\d{3})-(\\d{4}), each set of parentheses creates a group. Matching '555-1234' captures '555' as group 1 and '1234' as group 2. This is useful for extracting or rearranging parts of matched text."
  },
  {
    question: "What's the difference between greedy and lazy matching?",
    answer: "Greedy matching (default) captures as much text as possible, while lazy matching captures as little as possible. For example, with text '<div>content</div>', the pattern <.*> (greedy) matches the entire string, but <.*?> (lazy, using ?) matches just '<div>'. Lazy quantifiers add '?' after *, +, or {}."
  },
  {
    question: "How do I match special characters in regex?",
    answer: "Special regex characters like . * + ? [ ] ( ) { } ^ $ | \\ must be escaped with a backslash to match literally. For example, to match a period, use \\. instead of just . (which matches any character). To match a backslash itself, use \\\\. This is crucial for matching punctuation or special symbols."
  },
  {
    question: "What are common regex patterns for validation?",
    answer: "Common patterns include: email ^[\\w.-]+@[\\w.-]+\\.\\w+$, phone \\d{3}-\\d{3}-\\d{4}, URL https?://[\\w.-]+, IP address \\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b, date \\d{4}-\\d{2}-\\d{2}, and hexadecimal color #[0-9A-Fa-f]{6}. These can be customized for specific requirements."
  },
  {
    question: "What are lookaheads and lookbehinds?",
    answer: "Lookaheads and lookbehinds are zero-width assertions that check for patterns without including them in the match. Positive lookahead (?=pattern) checks if pattern follows, negative lookahead (?!pattern) checks it doesn't. Lookbehind uses (?<=pattern) and (?<!pattern). For example, \\d(?=px) matches numbers followed by 'px' without including 'px'."
  },
  {
    question: "Why isn't my regex pattern matching?",
    answer: "Common issues include: forgetting to escape special characters, incorrect flag usage (like missing 'g' for multiple matches), case sensitivity without 'i' flag, greedy vs lazy matching problems, anchors (^ $) restricting matches, whitespace characters not being accounted for, or the pattern being too specific. Test incrementally by simplifying your pattern."
  },
  {
    question: "How can I improve regex performance?",
    answer: "Optimize regex by avoiding nested quantifiers (.*.*), using specific character classes instead of dots, anchoring patterns when possible (^ $), using non-capturing groups (?:) when you don't need capture, avoiding excessive backtracking with possessive quantifiers, and keeping patterns simple. Test with realistic data to identify performance bottlenecks."
  }
];