import { useState } from 'react';
import { FAQ } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface FAQManagerProps {
  faqs: FAQ[];
  onChange: (faqs: FAQ[]) => void;
}

export const FAQManager = ({ faqs, onChange }: FAQManagerProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: `faq-${Date.now()}`,
      question: '',
      answer: ''
    };
    onChange([...faqs, newFAQ]);
    setEditingId(newFAQ.id);
  };

  const updateFAQ = (id: string, field: 'question' | 'answer', value: string) => {
    onChange(
      faqs.map(faq =>
        faq.id === id ? { ...faq, [field]: value } : faq
      )
    );
  };

  const removeFAQ = (id: string) => {
    onChange(faqs.filter(faq => faq.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>FAQs</Label>
        <Button type="button" variant="outline" size="sm" onClick={addFAQ}>
          <Plus className="w-4 h-4 mr-1" />
          Add FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border border-dashed rounded-lg">
          No FAQs added yet. Click "Add FAQ" to get started.
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card key={faq.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">
                    FAQ #{index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFAQ(faq.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor={`question-${faq.id}`}>Question</Label>
                    <Input
                      id={`question-${faq.id}`}
                      value={faq.question}
                      onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                      placeholder="Enter question"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`answer-${faq.id}`}>Answer</Label>
                    <Textarea
                      id={`answer-${faq.id}`}
                      value={faq.answer}
                      onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                      placeholder="Enter answer"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
