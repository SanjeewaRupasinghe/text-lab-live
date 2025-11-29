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
import Uppercase from "./pages/functions/Uppercase";
import Lowercase from "./pages/functions/Lowercase";
import TitleCase from "./pages/functions/TitleCase";
import CamelCase from "./pages/functions/CamelCase";
import SnakeCase from "./pages/functions/SnakeCase";
import KebabCase from "./pages/functions/KebabCase";
import Trim from "./pages/functions/Trim";
import RemoveSpaces from "./pages/functions/RemoveSpaces";
import RemoveBlankLines from "./pages/functions/RemoveBlankLines";
import SortLines from "./pages/functions/SortLines";
import NumberLines from "./pages/functions/NumberLines";
import FindReplace from "./pages/functions/FindReplace";
import Statistics from "./pages/functions/Statistics";

// Conversion tools
import JsonFormatter from "./pages/functions/JsonFormatter";
import XmlFormatter from "./pages/functions/XmlFormatter";
import HtmlEntities from "./pages/functions/HtmlEntities";
import TabsSpaces from "./pages/functions/TabsSpaces";
import NewlineConverter from "./pages/functions/NewlineConverter";

// Encoding, Decoding & Encryption
import Base64 from "./pages/functions/Base64";
import UrlEncoder from "./pages/functions/UrlEncoder";
import CaesarCipher from "./pages/functions/CaesarCipher";
import MorseCode from "./pages/functions/MorseCode";
import ROT13 from "./pages/functions/ROT13";

// Generators
import LoremGenerator from "./pages/functions/LoremGenerator";
import PasswordGenerator from "./pages/functions/PasswordGenerator";
import AsciiGenerator from "./pages/functions/AsciiGenerator";
import QrGenerator from "./pages/functions/QrGenerator";

// Additional Transformations
import ReverseText from "./pages/functions/ReverseText";
import MirrorText from "./pages/functions/MirrorText";
import UpsideDown from "./pages/functions/UpsideDown";
import LeetSpeak from "./pages/functions/LeetSpeak";
import Slugify from "./pages/functions/Slugify";
import UnicodeNormalizer from "./pages/functions/UnicodeNormalizer";
import EmojiPicker from "./pages/functions/EmojiPicker";
import SampleDataGenerator from "./pages/functions/SampleDataGenerator";
import MarkdownEditor from "./pages/functions/MarkdownEditor";
import DiffChecker from "./pages/functions/DiffChecker";
import RegexTester from "./pages/functions/RegexTester";
import WordCloudGenerator from "./pages/functions/WordCloudGenerator";
import CsvJsonConverter from "./pages/functions/CsvJsonConverter";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <AppSidebar />
                
                {/* Main Content */}
                <div className="flex-1 flex flex-col">
                  {/* Global Header with Sidebar Trigger */}
                  <header className="h-12 flex items-center border-b bg-background px-4">
                    <SidebarTrigger />
                  </header>
                
                <main className="flex-1">
                  <Routes>
                    {/* Auth Routes */}
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
                    
                    {/* Public Blog Routes */}
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/blog/:slug" element={<BlogView />} />
                    
                    {/* Admin Blog Routes */}
                    <Route path="/admin/blogs" element={<ProtectedRoute><BlogDashboard /></ProtectedRoute>} />
                    <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
                    <Route path="/admin/blogs/edit/:id" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
                    <Route path="/admin/sitemap" element={<ProtectedRoute><Sitemap /></ProtectedRoute>} />
                    <Route path="/admin/robots" element={<ProtectedRoute><RobotsTxt /></ProtectedRoute>} />
                    
                    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/uppercase" element={<ProtectedRoute><Uppercase /></ProtectedRoute>} />
                    <Route path="/lowercase" element={<ProtectedRoute><Lowercase /></ProtectedRoute>} />
                    <Route path="/title-case" element={<ProtectedRoute><TitleCase /></ProtectedRoute>} />
                    <Route path="/camel-case" element={<ProtectedRoute><CamelCase /></ProtectedRoute>} />
                    <Route path="/snake-case" element={<ProtectedRoute><SnakeCase /></ProtectedRoute>} />
                    <Route path="/kebab-case" element={<ProtectedRoute><KebabCase /></ProtectedRoute>} />
                    <Route path="/trim" element={<ProtectedRoute><Trim /></ProtectedRoute>} />
                    <Route path="/remove-spaces" element={<ProtectedRoute><RemoveSpaces /></ProtectedRoute>} />
                    <Route path="/remove-blank-lines" element={<ProtectedRoute><RemoveBlankLines /></ProtectedRoute>} />
                    <Route path="/sort-lines" element={<ProtectedRoute><SortLines /></ProtectedRoute>} />
                    <Route path="/number-lines" element={<ProtectedRoute><NumberLines /></ProtectedRoute>} />
                    <Route path="/find-replace" element={<ProtectedRoute><FindReplace /></ProtectedRoute>} />
                    <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
                    <Route path="/json-formatter" element={<ProtectedRoute><JsonFormatter /></ProtectedRoute>} />
                    <Route path="/xml-formatter" element={<ProtectedRoute><XmlFormatter /></ProtectedRoute>} />
                    <Route path="/html-entities" element={<ProtectedRoute><HtmlEntities /></ProtectedRoute>} />
                    <Route path="/tabs-spaces" element={<ProtectedRoute><TabsSpaces /></ProtectedRoute>} />
                    <Route path="/newline-converter" element={<ProtectedRoute><NewlineConverter /></ProtectedRoute>} />
                    <Route path="/base64" element={<ProtectedRoute><Base64 /></ProtectedRoute>} />
                    <Route path="/url-encoder" element={<ProtectedRoute><UrlEncoder /></ProtectedRoute>} />
                    <Route path="/caesar-cipher" element={<ProtectedRoute><CaesarCipher /></ProtectedRoute>} />
                    <Route path="/morse-code" element={<ProtectedRoute><MorseCode /></ProtectedRoute>} />
                    <Route path="/rot13" element={<ProtectedRoute><ROT13 /></ProtectedRoute>} />
                    <Route path="/lorem-generator" element={<ProtectedRoute><LoremGenerator /></ProtectedRoute>} />
                    <Route path="/password-generator" element={<ProtectedRoute><PasswordGenerator /></ProtectedRoute>} />
                    <Route path="/ascii-generator" element={<ProtectedRoute><AsciiGenerator /></ProtectedRoute>} />
                    <Route path="/qr-generator" element={<ProtectedRoute><QrGenerator /></ProtectedRoute>} />
                    <Route path="/reverse-text" element={<ProtectedRoute><ReverseText /></ProtectedRoute>} />
                    <Route path="/mirror-text" element={<ProtectedRoute><MirrorText /></ProtectedRoute>} />
                    <Route path="/upside-down" element={<ProtectedRoute><UpsideDown /></ProtectedRoute>} />
                    <Route path="/leet-speak" element={<ProtectedRoute><LeetSpeak /></ProtectedRoute>} />
                    <Route path="/slugify" element={<ProtectedRoute><Slugify /></ProtectedRoute>} />
                    <Route path="/unicode-normalizer" element={<ProtectedRoute><UnicodeNormalizer /></ProtectedRoute>} />
                    <Route path="/emoji-picker" element={<ProtectedRoute><EmojiPicker /></ProtectedRoute>} />
                    <Route path="/sample-data-generator" element={<ProtectedRoute><SampleDataGenerator /></ProtectedRoute>} />
                    <Route path="/markdown-editor" element={<ProtectedRoute><MarkdownEditor /></ProtectedRoute>} />
                    <Route path="/diff-checker" element={<ProtectedRoute><DiffChecker /></ProtectedRoute>} />
                    <Route path="/regex-tester" element={<ProtectedRoute><RegexTester /></ProtectedRoute>} />
                    <Route path="/word-cloud-generator" element={<ProtectedRoute><WordCloudGenerator /></ProtectedRoute>} />
                    <Route path="/csv-json-converter" element={<ProtectedRoute><CsvJsonConverter /></ProtectedRoute>} />
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
