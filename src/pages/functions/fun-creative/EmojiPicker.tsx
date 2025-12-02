import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Search, Clock, Settings } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { FAQ } from "@/components/FAQ";
import { FaqType } from "@/types/faq.type";
import { emojiPickerFaqs } from "@/data/faq/fun-creative-faqs";
import { categories, emojiData } from "@/data/EmojiData";

const EmojiPicker = () => {
  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [hiddenCategories, setHiddenCategories] = useState<string[]>([]);

  // Load recent emojis and hidden categories from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("recentEmojis");
    if (saved) {
      setRecentEmojis(JSON.parse(saved));
    }
    const savedHidden = localStorage.getItem("hiddenEmojiCategories");
    if (savedHidden) {
      setHiddenCategories(JSON.parse(savedHidden));
    }
  }, []);

  // Save recent emojis to localStorage
  const saveRecentEmojis = (emojis: string[]) => {
    localStorage.setItem("recentEmojis", JSON.stringify(emojis));
  };

  const toggleCategoryVisibility = (categoryId: string) => {
    const newHidden = hiddenCategories.includes(categoryId)
      ? hiddenCategories.filter((id) => id !== categoryId)
      : [...hiddenCategories, categoryId];
    setHiddenCategories(newHidden);
    localStorage.setItem("hiddenEmojiCategories", JSON.stringify(newHidden));
  };

  // Get visible categories
  const visibleCategories = categories.filter(
    (cat) => !hiddenCategories.includes(cat.id)
  );

  // Filter emojis based on search and category
  const filteredEmojis = emojiData.filter((emoji) => {
    const matchesCategory =
      selectedCategory === "all" || emoji.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      emoji.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emoji.keywords.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  // Copy emoji to clipboard and add to recent
  const copyEmoji = (emojiChar: string) => {
    navigator.clipboard.writeText(emojiChar);
    toast.success(`Copied ${emojiChar} to clipboard!`);

    // Update recent emojis (keep last 10, remove duplicates)
    const newRecent = [
      emojiChar,
      ...recentEmojis.filter((e) => e !== emojiChar),
    ].slice(0, 10);
    setRecentEmojis(newRecent);
    saveRecentEmojis(newRecent);
  };

  // FAQs
  const faqs: FaqType[] = emojiPickerFaqs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Emoji Picker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse, search, and copy emojis. Your recently used emojis are saved
            for quick access.
          </p>
        </div>

        <Card className="p-6">
          {/* Search Bar and Settings */}
          <div className="flex gap-2 mb-6">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search emojis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* END Search Bar */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white" align="end">
                {/* Dropdown area */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Show/Hide Categories</h3>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-2">
                        {categories
                          .filter((cat) => cat.id !== "all")
                          .map((category) => {
                            const IconComponent = category.icon;
                            return (
                              <div
                                key={category.id}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={category.id}
                                  checked={
                                    !hiddenCategories.includes(category.id)
                                  }
                                  onCheckedChange={() =>
                                    toggleCategoryVisibility(category.id)
                                  }
                                />
                                <label
                                  htmlFor={category.id}
                                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                  <IconComponent className="h-3 w-3" />
                                  {category.name}
                                </label>
                              </div>
                            );
                          })}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
                {/* END Dropdown area */}
              </PopoverContent>
            </Popover>
          </div>
          {/* END Search Bar and Settings */}

          {/* Recent Emojis */}
          {recentEmojis.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-medium">Recently Used</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentEmojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-2xl p-3 h-auto hover:bg-muted/50"
                    onClick={() => copyEmoji(emoji)}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {/* END Recent Emojis */}

          {/* Category Tabs */}
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full"
          >
            {/* Tab list */}
            <TabsList
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 mb-6 gap-1 h-auto p-1"
              style={{
                gridTemplateColumns: `repeat(${Math.min(
                  visibleCategories.length,
                  11
                )}, minmax(0, 1fr))`,
              }}
            >
              {visibleCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-1"
                  >
                    <IconComponent className="h-3 w-3" />
                    <span className="hidden sm:inline text-xs">
                      {category.name}
                    </span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {/* END Tab list */}

            {/* Emoji Grid */}
            <TabsContent value={selectedCategory}>
              <ScrollArea className="h-[500px]">
                {filteredEmojis.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No emojis found matching your search.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-15 gap-2">
                    {filteredEmojis.map((emoji, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="text-2xl p-3 h-12 w-12 hover:bg-muted/50 group relative"
                        onClick={() => copyEmoji(emoji.emoji)}
                        title={emoji.name}
                      >
                        {emoji.emoji}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 rounded">
                          <Copy className="h-3 w-3" />
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            {/* END Emoji Grid */}
          </Tabs>
          {/* END Category Tabs */}

          {/* Statistics */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{filteredEmojis.length} emojis found</span>
              <span>{emojiData.length} total emojis</span>
            </div>
          </div>
          {/* END Statistics */}
        </Card>
      </div>

      {/* FAQ */}
      <FAQ faqs={faqs} />
      {/* END FAQ */}
    </div>
  );
};

export default EmojiPicker;
