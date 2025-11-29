import { useState } from "react";
import { Mail, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";

/**
 * Newsletter Subscription Component
 * 
 * MOCK IMPLEMENTATION: Currently stores subscriptions in localStorage
 * 
 * TODO: Production Migration
 * 1. Create a 'newsletter_subscribers' table in your database
 * 2. Replace localStorage with API call to save subscriber
 * 3. Integrate with email service (Resend, Mailchimp, etc.)
 * 4. Add double opt-in confirmation flow
 * 5. Add GDPR compliance checkboxes if needed
 */

// Email validation schema
const emailSchema = z.string().email("Please enter a valid email address");

interface NewsletterSubscribeProps {
  variant?: "inline" | "card" | "floating";
  className?: string;
}

export function NewsletterSubscribe({ variant = "card", className = "" }: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      // MOCK: Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // MOCK: Store in localStorage
      // TODO: Replace with actual API call
      // Example: await axios.post('/api/newsletter/subscribe', { email });
      const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        toast.info("You're already subscribed!");
        setIsLoading(false);
        return;
      }

      subscribers.push(email);
      localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers));

      setIsSubscribed(true);
      toast.success("Successfully subscribed to newsletter!");
      
      // Log for development
      console.log('[DEV] Newsletter subscription:', email);
    } catch (err) {
      toast.error("Failed to subscribe. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <Card className={`bg-primary/5 border-primary/20 ${className}`}>
        <CardContent className="flex items-center justify-center gap-3 py-6">
          <CheckCircle className="w-6 h-6 text-primary" />
          <div>
            <p className="font-medium text-foreground">You're subscribed!</p>
            <p className="text-sm text-muted-foreground">Thank you for joining our newsletter.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubscribe} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
        <div className="flex-1">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error ? "border-destructive" : ""}
            disabled={isLoading}
          />
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>
      </form>
    );
  }

  if (variant === "floating") {
    return (
      <div className={`fixed bottom-4 right-4 z-40 max-w-sm ${className}`}>
        <Card className="shadow-lg border-primary/20 bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Stay Updated</CardTitle>
                <CardDescription className="text-xs">Get the latest articles in your inbox</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "border-destructive" : ""}
                disabled={isLoading}
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Subscribe Now
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default: card variant
  return (
    <Card className={`bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 ${className}`}>
      <CardHeader className="text-center pb-2">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-xl">Subscribe to Our Newsletter</CardTitle>
        <CardDescription>
          Get the latest articles, tips, and insights delivered straight to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`h-11 ${error ? "border-destructive" : ""}`}
              disabled={isLoading}
            />
            {error && <p className="text-xs text-destructive mt-1">{error}</p>}
          </div>
          <Button type="submit" className="w-full h-11" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Subscribe to Newsletter
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
