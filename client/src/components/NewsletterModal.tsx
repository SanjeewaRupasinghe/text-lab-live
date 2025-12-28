import { useState, useEffect } from "react";
import { Mail, Send, CheckCircle, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { z } from "zod";

/**
 * Newsletter Modal Component
 * 
 * Appears while reading blog posts to encourage newsletter subscription.
 * 
 * MOCK IMPLEMENTATION: Currently stores subscriptions in localStorage
 * 
 * TODO: Production Migration
 * 1. Create a 'newsletter_subscribers' table in your database
 * 2. Replace localStorage with API call to save subscriber
 * 3. Integrate with email service (Resend, Mailchimp, etc.)
 * 4. Add double opt-in confirmation flow
 */

const emailSchema = z.string().email("Please enter a valid email address");

interface NewsletterModalProps {
  /** Delay in milliseconds before showing the modal */
  delay?: number;
  /** Whether to trigger on scroll percentage (0-100) */
  scrollTrigger?: number;
}

export function NewsletterModal({ delay = 5000, scrollTrigger = 50 }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session or already subscribed
    const dismissed = sessionStorage.getItem('newsletter-modal-dismissed');
    const subscribed = localStorage.getItem('newsletter-subscribed');
    
    if (dismissed || subscribed) {
      return;
    }

    // Timer-based trigger
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, delay);

    // Scroll-based trigger
    const handleScroll = () => {
      if (hasShown) return;
      
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (window.scrollY / scrollHeight) * 100;
      
      if (scrollPercent >= scrollTrigger) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, scrollTrigger, hasShown]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletter-modal-dismissed', 'true');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      // MOCK: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // MOCK: Store in localStorage
      // TODO: Replace with actual API call
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast.info("You're already subscribed!");
        setIsLoading(false);
        return;
      }

      subscribers.push(email);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));
      localStorage.setItem('newsletter-subscribed', 'true');

      setIsSubscribed(true);
      toast.success("Successfully subscribed to newsletter!");
      
      // Auto close after success
      setTimeout(() => {
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            {isSubscribed ? (
              <CheckCircle className="w-8 h-8 text-primary" />
            ) : (
              <Mail className="w-8 h-8 text-primary" />
            )}
          </div>
          <DialogTitle className="text-2xl">
            {isSubscribed ? "You're Subscribed!" : "Stay Updated"}
          </DialogTitle>
          <DialogDescription className="text-base">
            {isSubscribed 
              ? "Thank you for subscribing. You'll receive our latest articles in your inbox."
              : "Subscribe to our newsletter and never miss a new article. Get the latest tips and insights delivered straight to your inbox."
            }
          </DialogDescription>
        </DialogHeader>

        {!isSubscribed && (
          <form onSubmit={handleSubscribe} className="space-y-4 mt-4">
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-12 text-base ${error ? "border-destructive" : ""}`}
                disabled={isLoading}
                autoFocus
              />
              {error && <p className="text-sm text-destructive mt-2">{error}</p>}
            </div>
            
            <div className="flex flex-col gap-2">
              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Subscribe Now
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={handleClose}
              >
                Maybe Later
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
