import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import ChangePassword from "./pages/auth/ChangePassword";
import ProtectedRoute from "./components/ProtectedRoute";
import BlogDashboard from "./pages/admin/BlogDashboard";
import BlogEditor from "./pages/admin/BlogEditor";
import BlogView from "./pages/BlogView";
import BlogList from "./pages/BlogList";
import Sitemap from "./pages/Sitemap";
import RobotsTxt from "./pages/RobotsTxt";

// Text transformation functions
import Uppercase from "./pages/functions/case-conversion/Uppercase";
import Lowercase from "./pages/functions/case-conversion/Lowercase";
import TitleCase from "./pages/functions/case-conversion/TitleCase";
import CamelCase from "./pages/functions/case-conversion/CamelCase";
import SnakeCase from "./pages/functions/case-conversion/SnakeCase";
import KebabCase from "./pages/functions/case-conversion/KebabCase";
import Trim from "./pages/functions/text-formatting/Trim";
import RemoveSpaces from "./pages/functions/text-formatting/RemoveSpaces";
import RemoveBlankLines from "./pages/functions/text-formatting/RemoveBlankLines";
import SortLines from "./pages/functions/text-formatting/SortLines";
import NumberLines from "./pages/functions/text-formatting/NumberLines";
import FindReplace from "./pages/functions/text-formatting/FindReplace";
import Statistics from "./pages/functions/statistics/Statistics";

// Conversion tools
import JsonFormatter from "./pages/functions/conversion-tools/JsonFormatter";
import XmlFormatter from "./pages/functions/conversion-tools/XmlFormatter";
import HtmlEntities from "./pages/functions/conversion-tools/HtmlEntities";
import TabsSpaces from "./pages/functions/conversion-tools/TabsSpaces";
import NewlineConverter from "./pages/functions/text-transformation/NewlineConverter";

// Encoding, Decoding & Encryption
import Base64 from "./pages/functions/encoding-encryption/Base64";
import UrlEncoder from "./pages/functions/encoding-encryption/UrlEncoder";
import CaesarCipher from "./pages/functions/encoding-encryption/CaesarCipher";
import MorseCode from "./pages/functions/encoding-encryption/MorseCode";
import ROT13 from "./pages/functions/encoding-encryption/ROT13";

// Generators
import LoremGenerator from "./pages/functions/generators/LoremGenerator";
import PasswordGenerator from "./pages/functions/generators/PasswordGenerator";
import AsciiGenerator from "./pages/functions/generators/AsciiGenerator";
import QrGenerator from "./pages/functions/generators/QrGenerator";

// Additional Transformations
import ReverseText from "./pages/functions/text-transformation/ReverseText";
import MirrorText from "./pages/functions/text-transformation/MirrorText";
import UpsideDown from "./pages/functions/text-transformation/UpsideDown";
import LeetSpeak from "./pages/functions/text-transformation/LeetSpeak";
import Slugify from "./pages/functions/text-transformation/Slugify";
import UnicodeNormalizer from "./pages/functions/text-transformation/UnicodeNormalizer";
import EmojiPicker from "./pages/functions/fun-creative/EmojiPicker";
import SampleDataGenerator from "./pages/functions/generators/SampleDataGenerator";
import MarkdownEditor from "./pages/functions/conversion-tools/MarkdownEditor";
import DiffChecker from "./pages/functions/conversion-tools/DiffChecker";
import RegexTester from "./pages/functions/conversion-tools/RegexTester";
import WordCloudGenerator from "./pages/functions/generators/WordCloudGenerator";
import CsvJsonConverter from "./pages/functions/conversion-tools/CsvJsonConverter";
import ScrollToTop from "./components/helper/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />

              {/* Main Content */}
              <div className="ms-3 flex-1 flex flex-col">
                {/* Global Header with Sidebar Trigger */}
                <header className="h-12 flex items-center border-b bg-background px-4">
                  <SidebarTrigger />
                </header>

                <main className="flex-1">
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route
                      path="/auth/change-password"
                      element={
                        <ProtectedRoute>
                          <ChangePassword />
                        </ProtectedRoute>
                      }
                    />

                    {/* Public Blog Routes */}
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogView />} />

                    {/* Admin Blog Routes */}
                    <Route
                      path="/admin/blogs"
                      element={
                        <ProtectedRoute>
                          <BlogDashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/blogs/new"
                      element={
                        <ProtectedRoute>
                          <BlogEditor />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/blogs/edit/:id"
                      element={
                        <ProtectedRoute>
                          <BlogEditor />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/sitemap"
                      element={
                        <ProtectedRoute>
                          <Sitemap />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/admin/robots"
                      element={
                        <ProtectedRoute>
                          <RobotsTxt />
                        </ProtectedRoute>
                      }
                    />

                    <Route path="/" element={<Home />} />

                    {/* Case conversion */}
                    <Route path="/uppercase" element={<Uppercase />} />
                    <Route path="/lowercase" element={<Lowercase />} />
                    <Route path="/title-case" element={<TitleCase />} />
                    <Route path="/camel-case" element={<CamelCase />} />
                    <Route path="/snake-case" element={<SnakeCase />} />
                    <Route path="/kebab-case" element={<KebabCase />} />
                    {/* END Case conversion */}

                    {/* Text formatting */}
                    <Route path="/trim" element={<Trim />} />
                    <Route path="/remove-spaces" element={<RemoveSpaces />} />
                    <Route
                      path="/remove-blank-lines"
                      element={<RemoveBlankLines />}
                    />
                    <Route path="/sort-lines" element={<SortLines />} />
                    <Route path="/number-lines" element={<NumberLines />} />
                    <Route path="/find-replace" element={<FindReplace />} />
                    {/* END Text formatting */}

                    {/* Conversion tools */}
                    <Route
                      path="/markdown-editor"
                      element={<MarkdownEditor />}
                    />
                    <Route path="/tabs-spaces" element={<TabsSpaces />} />

                    <Route path="/json-formatter" element={<JsonFormatter />} />
                    <Route path="/xml-formatter" element={<XmlFormatter />} />
                    <Route path="/html-entities" element={<HtmlEntities />} />
                    <Route
                      path="/newline-converter"
                      element={<NewlineConverter />}
                    />
                    <Route
                      path="/csv-json-converter"
                      element={<CsvJsonConverter />}
                    />
                    <Route path="/diff-checker" element={<DiffChecker />} />
                    <Route path="/regex-tester" element={<RegexTester />} />
                    {/* END Conversion tools */}

                    {/* Encoding and Encryption tools */}
                    <Route path="/base64" element={<Base64 />} />
                    <Route path="/url-encoder" element={<UrlEncoder />} />
                    <Route path="/caesar-cipher" element={<CaesarCipher />} />
                    <Route path="/rot13" element={<ROT13 />} />
                    <Route path="/morse-code" element={<MorseCode />} />
                    {/* Encoding and Encryption tools */}

                    {/* Statistics */}
                    <Route path="/statistics" element={<Statistics />} />
                    {/* END Statistics */}

                    {/* Generators */}
                    <Route
                      path="/lorem-generator"
                      element={<LoremGenerator />}
                    />
                    <Route
                      path="/password-generator"
                      element={<PasswordGenerator />}
                    />
                    <Route
                      path="/ascii-generator"
                      element={<AsciiGenerator />}
                    />
                    <Route path="/qr-generator" element={<QrGenerator />} />
                    <Route
                      path="/sample-data-generator"
                      element={<SampleDataGenerator />}
                    />

                    <Route path="/reverse-text" element={<ReverseText />} />
                    <Route path="/mirror-text" element={<MirrorText />} />
                    <Route path="/upside-down" element={<UpsideDown />} />
                    <Route path="/leet-speak" element={<LeetSpeak />} />
                    <Route path="/slugify" element={<Slugify />} />
                    <Route
                      path="/unicode-normalizer"
                      element={<UnicodeNormalizer />}
                    />
                    <Route path="/emoji-picker" element={<EmojiPicker />} />

                    <Route
                      path="/word-cloud-generator"
                      element={<WordCloudGenerator />}
                    />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
