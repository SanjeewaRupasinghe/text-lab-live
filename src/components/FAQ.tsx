import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const FAQ = () => {
  const faqs = [
    {
      question: "How is my data handled?",
      answer: "All text processing happens entirely in your browser. No data is sent to our servers, ensuring complete privacy and security of your content."
    },
    {
      question: "Can I use this tool offline?",
      answer: "Yes! Once the page loads, all text transformations work offline. The tool processes everything locally in your browser."
    },
    {
      question: "Is there a limit to text size?",
      answer: "The tool can handle very large texts, but performance may vary based on your device's capabilities. For best performance, we recommend processing texts under 1MB."
    },
    {
      question: "How do I save my work?",
      answer: "Use the Download button to save your transformed text as a .txt file. Your input is also automatically saved in your browser's local storage for 7 days."
    },
    {
      question: "Can I bookmark my favorite tools?",
      answer: "Yes! Click the star icon next to any tool in the sidebar to bookmark it. Bookmarked tools will appear in a separate section for quick access."
    },
    {
      question: "What keyboard shortcuts are available?",
      answer: "Press Ctrl+K (or Cmd+K on Mac) to open the search dialog and quickly navigate to any tool. This works from any page."
    },
    {
      question: "Does the tool work on mobile devices?",
      answer: "Yes! The interface is fully responsive and works on all screen sizes, from phones to desktop computers."
    },
    {
      question: "Can I suggest new features?",
      answer: "We'd love to hear your suggestions! The tool is designed to be extensible, and we're always looking to add useful text transformation features."
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <HelpCircle className="w-5 h-5" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};