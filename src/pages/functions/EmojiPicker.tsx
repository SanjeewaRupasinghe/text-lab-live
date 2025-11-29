import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Search, Clock, Smile, Users, Heart, Hand, Eye, Glasses, Activity, Star, Flag, Car, Sword, PawPrint, Hash, TreePine, Apple, Coffee, MapPin, Home, Hash as SymbolIcon, Settings, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface Emoji {
  emoji: string;
  name: string;
  category: string;
  keywords: string[];
}

const emojiData: Emoji[] = [
  // Smileys & Emotion
  { emoji: "😀", name: "Grinning Face", category: "smileys", keywords: ["happy", "smile", "grin"] },
  { emoji: "😃", name: "Grinning Face with Big Eyes", category: "smileys", keywords: ["happy", "smile", "joy"] },
  { emoji: "😄", name: "Grinning Face with Smiling Eyes", category: "smileys", keywords: ["happy", "smile", "joy"] },
  { emoji: "😁", name: "Beaming Face with Smiling Eyes", category: "smileys", keywords: ["happy", "smile", "grin"] },
  { emoji: "😆", name: "Grinning Squinting Face", category: "smileys", keywords: ["happy", "laugh", "haha"] },
  { emoji: "😅", name: "Grinning Face with Sweat", category: "smileys", keywords: ["happy", "sweat", "relief"] },
  { emoji: "🤣", name: "Rolling on the Floor Laughing", category: "smileys", keywords: ["laugh", "lol", "funny"] },
  { emoji: "😂", name: "Face with Tears of Joy", category: "smileys", keywords: ["laugh", "cry", "tears"] },
  { emoji: "🙂", name: "Slightly Smiling Face", category: "smileys", keywords: ["smile", "happy"] },
  { emoji: "🙃", name: "Upside-Down Face", category: "smileys", keywords: ["silly", "funny", "sarcasm"] },
  { emoji: "😉", name: "Winking Face", category: "smileys", keywords: ["wink", "flirt"] },
  { emoji: "😊", name: "Smiling Face with Smiling Eyes", category: "smileys", keywords: ["happy", "smile", "blush"] },
  { emoji: "😇", name: "Smiling Face with Halo", category: "smileys", keywords: ["angel", "innocent"] },
  
  // Affectionate
  { emoji: "🥰", name: "Smiling Face with Hearts", category: "affectionate", keywords: ["love", "adore", "hearts"] },
  { emoji: "😍", name: "Smiling Face with Heart-Eyes", category: "affectionate", keywords: ["love", "crush", "heart"] },
  { emoji: "🤩", name: "Star-Struck", category: "affectionate", keywords: ["amazing", "star", "eyes"] },
  { emoji: "😘", name: "Face Blowing a Kiss", category: "affectionate", keywords: ["kiss", "love"] },
  { emoji: "😗", name: "Kissing Face", category: "affectionate", keywords: ["kiss", "love"] },
  { emoji: "☺️", name: "Smiling Face", category: "affectionate", keywords: ["happy", "smile"] },
  { emoji: "😚", name: "Kissing Face with Closed Eyes", category: "affectionate", keywords: ["kiss", "love"] },
  { emoji: "😙", name: "Kissing Face with Smiling Eyes", category: "affectionate", keywords: ["kiss", "love"] },
  { emoji: "🥲", name: "Smiling Face with Tear", category: "affectionate", keywords: ["happy", "cry", "proud"] },
  
  // Face with Tongue
  { emoji: "😋", name: "Face Savoring Food", category: "tongue", keywords: ["yum", "tasty", "delicious"] },
  { emoji: "😛", name: "Face with Tongue", category: "tongue", keywords: ["tongue", "silly"] },
  { emoji: "😜", name: "Winking Face with Tongue", category: "tongue", keywords: ["wink", "tongue", "silly"] },
  { emoji: "🤪", name: "Zany Face", category: "tongue", keywords: ["crazy", "wild", "silly"] },
  { emoji: "😝", name: "Squinting Face with Tongue", category: "tongue", keywords: ["tongue", "silly", "playful"] },
  
  // Neutral & Skeptical
  { emoji: "😐", name: "Neutral Face", category: "neutral", keywords: ["neutral", "meh"] },
  { emoji: "😑", name: "Expressionless Face", category: "neutral", keywords: ["blank", "meh"] },
  { emoji: "😶", name: "Face Without Mouth", category: "neutral", keywords: ["quiet", "silent"] },
  { emoji: "😏", name: "Smirking Face", category: "neutral", keywords: ["smug", "smirk"] },
  { emoji: "😒", name: "Unamused Face", category: "neutral", keywords: ["unimpressed", "meh"] },
  { emoji: "🙄", name: "Face with Rolling Eyes", category: "neutral", keywords: ["eye roll", "annoyed"] },
  { emoji: "😬", name: "Grimacing Face", category: "neutral", keywords: ["awkward", "yikes"] },
  { emoji: "🤥", name: "Lying Face", category: "neutral", keywords: ["lie", "pinocchio"] },
  
  // People & Body
  { emoji: "👋", name: "Waving Hand", category: "people", keywords: ["wave", "hello", "goodbye"] },
  { emoji: "🤚", name: "Raised Back of Hand", category: "people", keywords: ["hand", "stop"] },
  { emoji: "🖐️", name: "Hand with Fingers Splayed", category: "people", keywords: ["hand", "five"] },
  { emoji: "✋", name: "Raised Hand", category: "people", keywords: ["hand", "stop", "high five"] },
  { emoji: "🖖", name: "Vulcan Salute", category: "people", keywords: ["spock", "star trek"] },
  { emoji: "👌", name: "OK Hand", category: "people", keywords: ["ok", "perfect"] },
  { emoji: "🤌", name: "Pinched Fingers", category: "people", keywords: ["chef kiss", "italian"] },
  { emoji: "🤏", name: "Pinching Hand", category: "people", keywords: ["small", "tiny"] },
  { emoji: "✌️", name: "Victory Hand", category: "people", keywords: ["peace", "victory"] },
  { emoji: "🤞", name: "Crossed Fingers", category: "people", keywords: ["luck", "hope"] },
  { emoji: "🤟", name: "Love-You Gesture", category: "people", keywords: ["love", "you", "sign"] },
  { emoji: "🤘", name: "Sign of the Horns", category: "people", keywords: ["rock", "metal"] },
  { emoji: "🤙", name: "Call Me Hand", category: "people", keywords: ["call", "phone", "hang loose"] },
  { emoji: "👈", name: "Backhand Index Pointing Left", category: "people", keywords: ["point", "left"] },
  { emoji: "👉", name: "Backhand Index Pointing Right", category: "people", keywords: ["point", "right"] },
  { emoji: "👆", name: "Backhand Index Pointing Up", category: "people", keywords: ["point", "up"] },
  { emoji: "🖕", name: "Middle Finger", category: "people", keywords: ["middle finger", "rude"] },
  { emoji: "👇", name: "Backhand Index Pointing Down", category: "people", keywords: ["point", "down"] },
  { emoji: "☝️", name: "Index Pointing Up", category: "people", keywords: ["point", "up", "one"] },
  { emoji: "👍", name: "Thumbs Up", category: "people", keywords: ["good", "yes", "like"] },
  { emoji: "👎", name: "Thumbs Down", category: "people", keywords: ["bad", "no", "dislike"] },
  { emoji: "✊", name: "Raised Fist", category: "people", keywords: ["fist", "power"] },
  { emoji: "👊", name: "Oncoming Fist", category: "people", keywords: ["punch", "fist bump"] },
  { emoji: "🤛", name: "Left-Facing Fist", category: "people", keywords: ["fist bump", "left"] },
  { emoji: "🤜", name: "Right-Facing Fist", category: "people", keywords: ["fist bump", "right"] },
  { emoji: "👏", name: "Clapping Hands", category: "people", keywords: ["clap", "applause"] },
  { emoji: "🙌", name: "Raising Hands", category: "people", keywords: ["praise", "celebrate"] },
  { emoji: "👐", name: "Open Hands", category: "people", keywords: ["open", "hug"] },
  { emoji: "🤲", name: "Palms Up Together", category: "people", keywords: ["pray", "please"] },
  { emoji: "🤝", name: "Handshake", category: "people", keywords: ["deal", "agreement"] },
  { emoji: "🙏", name: "Folded Hands", category: "people", keywords: ["pray", "please", "thanks"] },
  
  // Hearts & Emotion
  { emoji: "❤️", name: "Red Heart", category: "hearts", keywords: ["love", "heart", "red"] },
  { emoji: "🧡", name: "Orange Heart", category: "hearts", keywords: ["love", "heart", "orange"] },
  { emoji: "💛", name: "Yellow Heart", category: "hearts", keywords: ["love", "heart", "yellow"] },
  { emoji: "💚", name: "Green Heart", category: "hearts", keywords: ["love", "heart", "green"] },
  { emoji: "💙", name: "Blue Heart", category: "hearts", keywords: ["love", "heart", "blue"] },
  { emoji: "💜", name: "Purple Heart", category: "hearts", keywords: ["love", "heart", "purple"] },
  { emoji: "🖤", name: "Black Heart", category: "hearts", keywords: ["love", "heart", "black"] },
  { emoji: "🤍", name: "White Heart", category: "hearts", keywords: ["love", "heart", "white"] },
  { emoji: "🤎", name: "Brown Heart", category: "hearts", keywords: ["love", "heart", "brown"] },
  { emoji: "💔", name: "Broken Heart", category: "hearts", keywords: ["broken", "heart", "sad"] },
  { emoji: "❣️", name: "Heart Exclamation", category: "hearts", keywords: ["heart", "exclamation"] },
  { emoji: "💕", name: "Two Hearts", category: "hearts", keywords: ["love", "hearts", "pink"] },
  { emoji: "💞", name: "Revolving Hearts", category: "hearts", keywords: ["love", "hearts"] },
  { emoji: "💓", name: "Beating Heart", category: "hearts", keywords: ["love", "heart", "beat"] },
  { emoji: "💗", name: "Growing Heart", category: "hearts", keywords: ["love", "heart", "grow"] },
  { emoji: "💖", name: "Sparkling Heart", category: "hearts", keywords: ["love", "heart", "sparkle"] },
  { emoji: "💘", name: "Heart with Arrow", category: "hearts", keywords: ["love", "cupid", "arrow"] },
  { emoji: "💝", name: "Heart with Ribbon", category: "hearts", keywords: ["love", "gift", "ribbon"] },
  { emoji: "💟", name: "Heart Decoration", category: "hearts", keywords: ["love", "heart", "purple"] },
  
  // Activity & Sports
  { emoji: "⚽", name: "Soccer Ball", category: "activity", keywords: ["soccer", "football", "ball"] },
  { emoji: "🏀", name: "Basketball", category: "activity", keywords: ["basketball", "ball", "sport"] },
  { emoji: "🏈", name: "American Football", category: "activity", keywords: ["football", "american", "ball"] },
  { emoji: "⚾", name: "Baseball", category: "activity", keywords: ["baseball", "ball", "sport"] },
  { emoji: "🥎", name: "Softball", category: "activity", keywords: ["softball", "ball", "sport"] },
  { emoji: "🎾", name: "Tennis", category: "activity", keywords: ["tennis", "ball", "sport"] },
  { emoji: "🏐", name: "Volleyball", category: "activity", keywords: ["volleyball", "ball", "sport"] },
  { emoji: "🏉", name: "Rugby Football", category: "activity", keywords: ["rugby", "football", "ball"] },
  { emoji: "🥏", name: "Flying Disc", category: "activity", keywords: ["frisbee", "disc", "sport"] },
  { emoji: "🎱", name: "Pool 8 Ball", category: "activity", keywords: ["pool", "billiards", "8ball"] },
  { emoji: "🪀", name: "Yo-Yo", category: "activity", keywords: ["yoyo", "toy", "play"] },
  { emoji: "🏓", name: "Ping Pong", category: "activity", keywords: ["ping pong", "table tennis", "sport"] },
  { emoji: "🏸", name: "Badminton", category: "activity", keywords: ["badminton", "sport", "racket"] },
  { emoji: "🥅", name: "Goal Net", category: "activity", keywords: ["goal", "net", "sport"] },
  { emoji: "⛳", name: "Flag in Hole", category: "activity", keywords: ["golf", "flag", "hole"] },
  { emoji: "🪁", name: "Kite", category: "activity", keywords: ["kite", "fly", "wind"] },
  { emoji: "🏹", name: "Bow and Arrow", category: "activity", keywords: ["bow", "arrow", "archery"] },
  { emoji: "🎣", name: "Fishing Pole", category: "activity", keywords: ["fishing", "pole", "fish"] },
  { emoji: "🤿", name: "Diving Mask", category: "activity", keywords: ["diving", "mask", "underwater"] },
  { emoji: "🥊", name: "Boxing Glove", category: "activity", keywords: ["boxing", "glove", "fight"] },
  { emoji: "🥋", name: "Martial Arts Uniform", category: "activity", keywords: ["martial arts", "karate", "uniform"] },
  
  // Flags
  { emoji: "🏁", name: "Chequered Flag", category: "flags", keywords: ["racing", "finish", "checkered"] },
  { emoji: "🚩", name: "Triangular Flag", category: "flags", keywords: ["flag", "red", "warning"] },
  { emoji: "🎌", name: "Crossed Flags", category: "flags", keywords: ["japan", "flags", "crossed"] },
  { emoji: "🏴", name: "Black Flag", category: "flags", keywords: ["black", "flag", "pirate"] },
  { emoji: "🏳️", name: "White Flag", category: "flags", keywords: ["white", "surrender", "peace"] },
  { emoji: "🏳️‍🌈", name: "Rainbow Flag", category: "flags", keywords: ["pride", "lgbt", "rainbow"] },
  { emoji: "🏳️‍⚧️", name: "Transgender Flag", category: "flags", keywords: ["transgender", "pride", "flag"] },
  { emoji: "🏴‍☠️", name: "Pirate Flag", category: "flags", keywords: ["pirate", "skull", "bones"] },
  { emoji: "🇺🇸", name: "United States Flag", category: "flags", keywords: ["usa", "america", "stars"] },
  { emoji: "🇬🇧", name: "United Kingdom Flag", category: "flags", keywords: ["uk", "britain", "union jack"] },
  { emoji: "🇫🇷", name: "France Flag", category: "flags", keywords: ["france", "french", "tricolor"] },
  { emoji: "🇩🇪", name: "Germany Flag", category: "flags", keywords: ["germany", "german", "deutschland"] },
  { emoji: "🇯🇵", name: "Japan Flag", category: "flags", keywords: ["japan", "japanese", "rising sun"] },
  { emoji: "🇨🇳", name: "China Flag", category: "flags", keywords: ["china", "chinese", "red"] },
  { emoji: "🇮🇳", name: "India Flag", category: "flags", keywords: ["india", "indian", "tricolor"] },
  { emoji: "🇧🇷", name: "Brazil Flag", category: "flags", keywords: ["brazil", "brazilian", "green"] },
  { emoji: "🇨🇦", name: "Canada Flag", category: "flags", keywords: ["canada", "canadian", "maple leaf"] },
  { emoji: "🇦🇺", name: "Australia Flag", category: "flags", keywords: ["australia", "australian", "southern cross"] },
  { emoji: "🇷🇺", name: "Russia Flag", category: "flags", keywords: ["russia", "russian", "tricolor"] },
  { emoji: "🇮🇹", name: "Italy Flag", category: "flags", keywords: ["italy", "italian", "tricolor"] },
  { emoji: "🇪🇸", name: "Spain Flag", category: "flags", keywords: ["spain", "spanish", "red yellow"] },
  { emoji: "🇲🇽", name: "Mexico Flag", category: "flags", keywords: ["mexico", "mexican", "eagle"] },
  { emoji: "🇰🇷", name: "South Korea Flag", category: "flags", keywords: ["korea", "korean", "taeguk"] },
  
  // Vehicles
  { emoji: "🚗", name: "Car", category: "vehicles", keywords: ["car", "automobile", "vehicle"] },
  { emoji: "🚕", name: "Taxi", category: "vehicles", keywords: ["taxi", "cab", "yellow"] },
  { emoji: "🚙", name: "SUV", category: "vehicles", keywords: ["suv", "car", "utility"] },
  { emoji: "🚌", name: "Bus", category: "vehicles", keywords: ["bus", "public", "transport"] },
  { emoji: "🚎", name: "Trolleybus", category: "vehicles", keywords: ["trolley", "bus", "electric"] },
  { emoji: "🏎️", name: "Racing Car", category: "vehicles", keywords: ["racing", "formula", "speed"] },
  { emoji: "🚓", name: "Police Car", category: "vehicles", keywords: ["police", "cop", "emergency"] },
  { emoji: "🚑", name: "Ambulance", category: "vehicles", keywords: ["ambulance", "emergency", "medical"] },
  { emoji: "🚒", name: "Fire Engine", category: "vehicles", keywords: ["fire", "truck", "emergency"] },
  { emoji: "🚐", name: "Minibus", category: "vehicles", keywords: ["minibus", "van", "transport"] },
  { emoji: "🛻", name: "Pickup Truck", category: "vehicles", keywords: ["truck", "pickup", "vehicle"] },
  { emoji: "🚚", name: "Delivery Truck", category: "vehicles", keywords: ["truck", "delivery", "cargo"] },
  { emoji: "🚛", name: "Semi Truck", category: "vehicles", keywords: ["truck", "semi", "big rig"] },
  { emoji: "🚜", name: "Tractor", category: "vehicles", keywords: ["tractor", "farm", "agriculture"] },
  { emoji: "🏍️", name: "Motorcycle", category: "vehicles", keywords: ["motorcycle", "bike", "motor"] },
  { emoji: "🛵", name: "Scooter", category: "vehicles", keywords: ["scooter", "moped", "motor"] },
  { emoji: "🚲", name: "Bicycle", category: "vehicles", keywords: ["bicycle", "bike", "cycle"] },
  { emoji: "🛴", name: "Kick Scooter", category: "vehicles", keywords: ["scooter", "kick", "ride"] },
  { emoji: "🚁", name: "Helicopter", category: "vehicles", keywords: ["helicopter", "chopper", "aircraft"] },
  { emoji: "✈️", name: "Airplane", category: "vehicles", keywords: ["airplane", "plane", "aircraft"] },
  { emoji: "🛩️", name: "Small Airplane", category: "vehicles", keywords: ["plane", "small", "aircraft"] },
  { emoji: "🚀", name: "Rocket", category: "vehicles", keywords: ["rocket", "space", "launch"] },
  { emoji: "🚂", name: "Locomotive", category: "vehicles", keywords: ["train", "locomotive", "railway"] },
  { emoji: "🚃", name: "Railway Car", category: "vehicles", keywords: ["train", "car", "railway"] },
  { emoji: "🚄", name: "High-Speed Train", category: "vehicles", keywords: ["train", "bullet", "speed"] },
  { emoji: "🚅", name: "Bullet Train", category: "vehicles", keywords: ["train", "bullet", "shinkansen"] },
  { emoji: "🚆", name: "Train", category: "vehicles", keywords: ["train", "railway", "transport"] },
  { emoji: "🚇", name: "Metro", category: "vehicles", keywords: ["metro", "subway", "underground"] },
  { emoji: "🚈", name: "Light Rail", category: "vehicles", keywords: ["light rail", "tram", "transport"] },
  { emoji: "🚉", name: "Station", category: "vehicles", keywords: ["station", "train", "platform"] },
  { emoji: "🚊", name: "Tram", category: "vehicles", keywords: ["tram", "streetcar", "trolley"] },
  { emoji: "🚝", name: "Monorail", category: "vehicles", keywords: ["monorail", "train", "single track"] },
  { emoji: "🚞", name: "Mountain Railway", category: "vehicles", keywords: ["mountain", "railway", "train"] },
  { emoji: "🚟", name: "Suspension Railway", category: "vehicles", keywords: ["suspension", "railway", "hanging"] },
  { emoji: "🚠", name: "Mountain Cableway", category: "vehicles", keywords: ["cable", "car", "mountain"] },
  { emoji: "🚡", name: "Aerial Tramway", category: "vehicles", keywords: ["tramway", "cable", "aerial"] },
  { emoji: "🛥️", name: "Motor Boat", category: "vehicles", keywords: ["boat", "motor", "water"] },
  { emoji: "🚤", name: "Speedboat", category: "vehicles", keywords: ["speedboat", "fast", "water"] },
  { emoji: "⛵", name: "Sailboat", category: "vehicles", keywords: ["sail", "boat", "wind"] },
  { emoji: "🛶", name: "Canoe", category: "vehicles", keywords: ["canoe", "paddle", "water"] },
  { emoji: "🚢", name: "Ship", category: "vehicles", keywords: ["ship", "cruise", "ocean"] },
  
  // Weapons
  { emoji: "⚔️", name: "Crossed Swords", category: "weapons", keywords: ["sword", "battle", "fight"] },
  { emoji: "🗡️", name: "Dagger", category: "weapons", keywords: ["dagger", "knife", "blade"] },
  { emoji: "🔫", name: "Water Gun", category: "weapons", keywords: ["water gun", "pistol", "toy"] },
  { emoji: "🏹", name: "Bow and Arrow", category: "weapons", keywords: ["bow", "arrow", "archery"] },
  { emoji: "🛡️", name: "Shield", category: "weapons", keywords: ["shield", "defense", "protection"] },
  { emoji: "🪃", name: "Boomerang", category: "weapons", keywords: ["boomerang", "throw", "return"] },
  { emoji: "🔪", name: "Kitchen Knife", category: "weapons", keywords: ["knife", "kitchen", "blade"] },
  { emoji: "⚡", name: "Lightning Bolt", category: "weapons", keywords: ["lightning", "bolt", "power"] },
  { emoji: "💣", name: "Bomb", category: "weapons", keywords: ["bomb", "explosive", "danger"] },
  { emoji: "🧨", name: "Firecracker", category: "weapons", keywords: ["firecracker", "explosive", "dynamite"] },
  { emoji: "🔥", name: "Fire", category: "weapons", keywords: ["fire", "flame", "burn"] },
  { emoji: "⚒️", name: "Hammer and Pick", category: "weapons", keywords: ["hammer", "pick", "tools"] },
  { emoji: "🔨", name: "Hammer", category: "weapons", keywords: ["hammer", "tool", "build"] },
  { emoji: "⛏️", name: "Pick", category: "weapons", keywords: ["pick", "mining", "tool"] },
  { emoji: "🪓", name: "Axe", category: "weapons", keywords: ["axe", "chop", "wood"] },
  { emoji: "🔱", name: "Trident", category: "weapons", keywords: ["trident", "poseidon", "fork"] },

  // Animals
  { emoji: "🐶", name: "Dog Face", category: "animals", keywords: ["dog", "puppy", "pet"] },
  { emoji: "🐱", name: "Cat Face", category: "animals", keywords: ["cat", "kitten", "pet"] },
  { emoji: "🐭", name: "Mouse Face", category: "animals", keywords: ["mouse", "rodent"] },
  { emoji: "🐹", name: "Hamster", category: "animals", keywords: ["hamster", "pet", "rodent"] },
  { emoji: "🐰", name: "Rabbit Face", category: "animals", keywords: ["rabbit", "bunny"] },
  { emoji: "🦊", name: "Fox", category: "animals", keywords: ["fox", "cunning"] },
  { emoji: "🐻", name: "Bear", category: "animals", keywords: ["bear", "teddy"] },
  { emoji: "🐼", name: "Panda", category: "animals", keywords: ["panda", "china", "bamboo"] },
  { emoji: "🐨", name: "Koala", category: "animals", keywords: ["koala", "australia"] },
  { emoji: "🐯", name: "Tiger Face", category: "animals", keywords: ["tiger", "big cat"] },
  { emoji: "🦁", name: "Lion", category: "animals", keywords: ["lion", "king", "mane"] },
  { emoji: "🐮", name: "Cow Face", category: "animals", keywords: ["cow", "moo", "farm"] },
  { emoji: "🐷", name: "Pig Face", category: "animals", keywords: ["pig", "oink", "farm"] },
  { emoji: "🐸", name: "Frog", category: "animals", keywords: ["frog", "ribbit", "green"] },
  { emoji: "🐵", name: "Monkey Face", category: "animals", keywords: ["monkey", "primate"] },
  { emoji: "🙈", name: "See-No-Evil Monkey", category: "animals", keywords: ["monkey", "see no evil"] },
  { emoji: "🙉", name: "Hear-No-Evil Monkey", category: "animals", keywords: ["monkey", "hear no evil"] },
  { emoji: "🙊", name: "Speak-No-Evil Monkey", category: "animals", keywords: ["monkey", "speak no evil"] },
  { emoji: "🐒", name: "Monkey", category: "animals", keywords: ["monkey", "primate", "banana"] },
  { emoji: "🐔", name: "Chicken", category: "animals", keywords: ["chicken", "rooster", "farm"] },
  { emoji: "🐧", name: "Penguin", category: "animals", keywords: ["penguin", "antarctica", "ice"] },
  { emoji: "🐦", name: "Bird", category: "animals", keywords: ["bird", "tweet", "fly"] },
  { emoji: "🐤", name: "Baby Chick", category: "animals", keywords: ["chick", "baby", "yellow"] },
  { emoji: "🐣", name: "Hatching Chick", category: "animals", keywords: ["chick", "hatching", "egg"] },
  { emoji: "🐥", name: "Front-Facing Baby Chick", category: "animals", keywords: ["chick", "baby", "cute"] },
  { emoji: "🦆", name: "Duck", category: "animals", keywords: ["duck", "quack", "water"] },
  { emoji: "🦅", name: "Eagle", category: "animals", keywords: ["eagle", "bird", "prey"] },
  { emoji: "🦉", name: "Owl", category: "animals", keywords: ["owl", "night", "wise"] },
  { emoji: "🦇", name: "Bat", category: "animals", keywords: ["bat", "vampire", "night"] },
  { emoji: "🐺", name: "Wolf", category: "animals", keywords: ["wolf", "howl", "pack"] },
  { emoji: "🐗", name: "Boar", category: "animals", keywords: ["boar", "pig", "wild"] },
  { emoji: "🐴", name: "Horse Face", category: "animals", keywords: ["horse", "neigh", "stallion"] },
  { emoji: "🦄", name: "Unicorn", category: "animals", keywords: ["unicorn", "magic", "horn"] },
  { emoji: "🐝", name: "Honeybee", category: "animals", keywords: ["bee", "honey", "buzz"] },
  { emoji: "🐛", name: "Bug", category: "animals", keywords: ["bug", "insect", "creepy"] },
  { emoji: "🦋", name: "Butterfly", category: "animals", keywords: ["butterfly", "beautiful", "wings"] },
  { emoji: "🐌", name: "Snail", category: "animals", keywords: ["snail", "slow", "shell"] },
  { emoji: "🐞", name: "Lady Beetle", category: "animals", keywords: ["ladybug", "beetle", "red"] },
  { emoji: "🐜", name: "Ant", category: "animals", keywords: ["ant", "insect", "work"] },
  { emoji: "🕷️", name: "Spider", category: "animals", keywords: ["spider", "web", "scary"] },
  { emoji: "🦂", name: "Scorpion", category: "animals", keywords: ["scorpion", "sting", "desert"] },
  { emoji: "🐢", name: "Turtle", category: "animals", keywords: ["turtle", "slow", "shell"] },
  { emoji: "🐍", name: "Snake", category: "animals", keywords: ["snake", "slither", "serpent"] },
  { emoji: "🦎", name: "Lizard", category: "animals", keywords: ["lizard", "gecko", "reptile"] },
  { emoji: "🐙", name: "Octopus", category: "animals", keywords: ["octopus", "tentacles", "sea"] },
  { emoji: "🦑", name: "Squid", category: "animals", keywords: ["squid", "tentacles", "sea"] },
  { emoji: "🦐", name: "Shrimp", category: "animals", keywords: ["shrimp", "prawn", "seafood"] },
  { emoji: "🦞", name: "Lobster", category: "animals", keywords: ["lobster", "claws", "seafood"] },
  { emoji: "🦀", name: "Crab", category: "animals", keywords: ["crab", "claws", "beach"] },
  { emoji: "🐡", name: "Blowfish", category: "animals", keywords: ["blowfish", "puffer", "spiky"] },
  { emoji: "🐠", name: "Tropical Fish", category: "animals", keywords: ["fish", "tropical", "colorful"] },
  { emoji: "🐟", name: "Fish", category: "animals", keywords: ["fish", "swim", "water"] },
  { emoji: "🐬", name: "Dolphin", category: "animals", keywords: ["dolphin", "smart", "ocean"] },
  { emoji: "🐳", name: "Spouting Whale", category: "animals", keywords: ["whale", "big", "ocean"] },
  { emoji: "🐋", name: "Whale", category: "animals", keywords: ["whale", "ocean", "mammal"] },
  { emoji: "🦈", name: "Shark", category: "animals", keywords: ["shark", "dangerous", "teeth"] },

  // Numbers
  { emoji: "0️⃣", name: "Keycap Digit Zero", category: "numbers", keywords: ["zero", "0", "number"] },
  { emoji: "1️⃣", name: "Keycap Digit One", category: "numbers", keywords: ["one", "1", "number"] },
  { emoji: "2️⃣", name: "Keycap Digit Two", category: "numbers", keywords: ["two", "2", "number"] },
  { emoji: "3️⃣", name: "Keycap Digit Three", category: "numbers", keywords: ["three", "3", "number"] },
  { emoji: "4️⃣", name: "Keycap Digit Four", category: "numbers", keywords: ["four", "4", "number"] },
  { emoji: "5️⃣", name: "Keycap Digit Five", category: "numbers", keywords: ["five", "5", "number"] },
  { emoji: "6️⃣", name: "Keycap Digit Six", category: "numbers", keywords: ["six", "6", "number"] },
  { emoji: "7️⃣", name: "Keycap Digit Seven", category: "numbers", keywords: ["seven", "7", "number"] },
  { emoji: "8️⃣", name: "Keycap Digit Eight", category: "numbers", keywords: ["eight", "8", "number"] },
  { emoji: "9️⃣", name: "Keycap Digit Nine", category: "numbers", keywords: ["nine", "9", "number"] },
  { emoji: "🔟", name: "Keycap Ten", category: "numbers", keywords: ["ten", "10", "number"] },
  { emoji: "#️⃣", name: "Keycap Number Sign", category: "numbers", keywords: ["hashtag", "hash", "pound"] },
  { emoji: "*️⃣", name: "Keycap Asterisk", category: "numbers", keywords: ["asterisk", "star", "multiply"] },

  // Nature
  { emoji: "🌱", name: "Seedling", category: "nature", keywords: ["plant", "grow", "green"] },
  { emoji: "🌿", name: "Herb", category: "nature", keywords: ["herb", "leaf", "green"] },
  { emoji: "☘️", name: "Shamrock", category: "nature", keywords: ["shamrock", "clover", "luck"] },
  { emoji: "🍀", name: "Four Leaf Clover", category: "nature", keywords: ["clover", "lucky", "rare"] },
  { emoji: "🌾", name: "Sheaf of Rice", category: "nature", keywords: ["rice", "grain", "wheat"] },
  { emoji: "🌵", name: "Cactus", category: "nature", keywords: ["cactus", "desert", "spiky"] },
  { emoji: "🌲", name: "Evergreen Tree", category: "nature", keywords: ["tree", "pine", "christmas"] },
  { emoji: "🌳", name: "Deciduous Tree", category: "nature", keywords: ["tree", "leaves", "oak"] },
  { emoji: "🌴", name: "Palm Tree", category: "nature", keywords: ["palm", "tropical", "beach"] },
  { emoji: "🌸", name: "Cherry Blossom", category: "nature", keywords: ["cherry", "blossom", "pink"] },
  { emoji: "🌺", name: "Hibiscus", category: "nature", keywords: ["hibiscus", "flower", "tropical"] },
  { emoji: "🌻", name: "Sunflower", category: "nature", keywords: ["sunflower", "yellow", "big"] },
  { emoji: "🌹", name: "Rose", category: "nature", keywords: ["rose", "red", "love"] },
  { emoji: "🌷", name: "Tulip", category: "nature", keywords: ["tulip", "flower", "spring"] },
  { emoji: "🌼", name: "Daisy", category: "nature", keywords: ["daisy", "flower", "white"] },
  { emoji: "🌽", name: "Corn", category: "nature", keywords: ["corn", "maize", "yellow"] },
  { emoji: "🥕", name: "Carrot", category: "nature", keywords: ["carrot", "orange", "vegetable"] },
  { emoji: "🌶️", name: "Hot Pepper", category: "nature", keywords: ["pepper", "hot", "spicy"] },
  { emoji: "🍄", name: "Mushroom", category: "nature", keywords: ["mushroom", "fungi", "red"] },
  { emoji: "🌰", name: "Chestnut", category: "nature", keywords: ["chestnut", "nut", "brown"] },
  { emoji: "🌊", name: "Water Wave", category: "nature", keywords: ["wave", "ocean", "water"] },
  { emoji: "💧", name: "Droplet", category: "nature", keywords: ["water", "drop", "blue"] },
  { emoji: "☔", name: "Umbrella with Rain Drops", category: "nature", keywords: ["rain", "umbrella", "weather"] },
  { emoji: "⚡", name: "High Voltage", category: "nature", keywords: ["lightning", "electric", "power"] },
  { emoji: "❄️", name: "Snowflake", category: "nature", keywords: ["snow", "cold", "winter"] },
  { emoji: "☃️", name: "Snowman", category: "nature", keywords: ["snowman", "winter", "cold"] },
  { emoji: "⛄", name: "Snowman Without Snow", category: "nature", keywords: ["snowman", "winter", "olaf"] },
  { emoji: "🌈", name: "Rainbow", category: "nature", keywords: ["rainbow", "colors", "pride"] },
  { emoji: "🌤️", name: "Sun Behind Small Cloud", category: "nature", keywords: ["sun", "cloud", "partly cloudy"] },
  { emoji: "⛅", name: "Sun Behind Cloud", category: "nature", keywords: ["sun", "cloud", "weather"] },
  { emoji: "⛈️", name: "Cloud with Lightning and Rain", category: "nature", keywords: ["storm", "thunder", "rain"] },
  { emoji: "🌩️", name: "Cloud with Lightning", category: "nature", keywords: ["lightning", "storm", "thunder"] },
  { emoji: "🌨️", name: "Cloud with Snow", category: "nature", keywords: ["snow", "cloud", "winter"] },
  { emoji: "☁️", name: "Cloud", category: "nature", keywords: ["cloud", "weather", "sky"] },
  { emoji: "🌪️", name: "Tornado", category: "nature", keywords: ["tornado", "cyclone", "weather"] },
  { emoji: "🌫️", name: "Fog", category: "nature", keywords: ["fog", "mist", "weather"] },
  { emoji: "🌊", name: "Water Wave", category: "nature", keywords: ["wave", "ocean", "tsunami"] },

  // Food
  { emoji: "🍎", name: "Red Apple", category: "food", keywords: ["apple", "red", "fruit"] },
  { emoji: "🍏", name: "Green Apple", category: "food", keywords: ["apple", "green", "fruit"] },
  { emoji: "🍊", name: "Tangerine", category: "food", keywords: ["orange", "tangerine", "citrus"] },
  { emoji: "🍋", name: "Lemon", category: "food", keywords: ["lemon", "sour", "yellow"] },
  { emoji: "🍌", name: "Banana", category: "food", keywords: ["banana", "yellow", "potassium"] },
  { emoji: "🍉", name: "Watermelon", category: "food", keywords: ["watermelon", "summer", "red"] },
  { emoji: "🍇", name: "Grapes", category: "food", keywords: ["grapes", "purple", "wine"] },
  { emoji: "🍓", name: "Strawberry", category: "food", keywords: ["strawberry", "red", "berry"] },
  { emoji: "🫐", name: "Blueberries", category: "food", keywords: ["blueberry", "blue", "berry"] },
  { emoji: "🍈", name: "Melon", category: "food", keywords: ["melon", "cantaloupe", "green"] },
  { emoji: "🍒", name: "Cherries", category: "food", keywords: ["cherry", "red", "pair"] },
  { emoji: "🍑", name: "Peach", category: "food", keywords: ["peach", "fuzzy", "orange"] },
  { emoji: "🥭", name: "Mango", category: "food", keywords: ["mango", "tropical", "yellow"] },
  { emoji: "🍍", name: "Pineapple", category: "food", keywords: ["pineapple", "tropical", "spiky"] },
  { emoji: "🥥", name: "Coconut", category: "food", keywords: ["coconut", "tropical", "brown"] },
  { emoji: "🥝", name: "Kiwi Fruit", category: "food", keywords: ["kiwi", "green", "fuzzy"] },
  { emoji: "🍅", name: "Tomato", category: "food", keywords: ["tomato", "red", "vegetable"] },
  { emoji: "🍆", name: "Eggplant", category: "food", keywords: ["eggplant", "purple", "vegetable"] },
  { emoji: "🥑", name: "Avocado", category: "food", keywords: ["avocado", "green", "healthy"] },
  { emoji: "🥦", name: "Broccoli", category: "food", keywords: ["broccoli", "green", "healthy"] },
  { emoji: "🥬", name: "Leafy Greens", category: "food", keywords: ["lettuce", "greens", "salad"] },
  { emoji: "🥒", name: "Cucumber", category: "food", keywords: ["cucumber", "green", "fresh"] },
  { emoji: "🌶️", name: "Hot Pepper", category: "food", keywords: ["pepper", "spicy", "hot"] },
  { emoji: "🫑", name: "Bell Pepper", category: "food", keywords: ["pepper", "bell", "capsicum"] },
  { emoji: "🧄", name: "Garlic", category: "food", keywords: ["garlic", "spice", "flavor"] },
  { emoji: "🧅", name: "Onion", category: "food", keywords: ["onion", "cry", "layers"] },
  { emoji: "🥔", name: "Potato", category: "food", keywords: ["potato", "brown", "starch"] },
  { emoji: "🍠", name: "Roasted Sweet Potato", category: "food", keywords: ["sweet potato", "orange", "roasted"] },
  { emoji: "🥐", name: "Croissant", category: "food", keywords: ["croissant", "french", "pastry"] },
  { emoji: "🥖", name: "Baguette Bread", category: "food", keywords: ["baguette", "bread", "french"] },
  { emoji: "🍞", name: "Bread", category: "food", keywords: ["bread", "loaf", "slice"] },
  { emoji: "🥨", name: "Pretzel", category: "food", keywords: ["pretzel", "twisted", "salty"] },
  { emoji: "🥯", name: "Bagel", category: "food", keywords: ["bagel", "round", "bread"] },
  { emoji: "🥞", name: "Pancakes", category: "food", keywords: ["pancakes", "stack", "syrup"] },
  { emoji: "🧇", name: "Waffle", category: "food", keywords: ["waffle", "square", "syrup"] },
  { emoji: "🧀", name: "Cheese Wedge", category: "food", keywords: ["cheese", "yellow", "dairy"] },
  { emoji: "🍖", name: "Meat on Bone", category: "food", keywords: ["meat", "bone", "carnivore"] },
  { emoji: "🍗", name: "Poultry Leg", category: "food", keywords: ["chicken", "drumstick", "meat"] },
  { emoji: "🥩", name: "Cut of Meat", category: "food", keywords: ["steak", "meat", "beef"] },
  { emoji: "🥓", name: "Bacon", category: "food", keywords: ["bacon", "pork", "strips"] },
  { emoji: "🍔", name: "Hamburger", category: "food", keywords: ["burger", "hamburger", "fast food"] },
  { emoji: "🍟", name: "French Fries", category: "food", keywords: ["fries", "potato", "fast food"] },
  { emoji: "🍕", name: "Pizza", category: "food", keywords: ["pizza", "slice", "italian"] },
  { emoji: "🌭", name: "Hot Dog", category: "food", keywords: ["hot dog", "sausage", "bun"] },
  { emoji: "🥪", name: "Sandwich", category: "food", keywords: ["sandwich", "bread", "lunch"] },
  { emoji: "🌮", name: "Taco", category: "food", keywords: ["taco", "mexican", "shell"] },
  { emoji: "🌯", name: "Burrito", category: "food", keywords: ["burrito", "wrap", "mexican"] },
  { emoji: "🫔", name: "Tamale", category: "food", keywords: ["tamale", "corn", "mexican"] },
  { emoji: "🥙", name: "Stuffed Flatbread", category: "food", keywords: ["pita", "falafel", "stuffed"] },
  { emoji: "🧆", name: "Falafel", category: "food", keywords: ["falafel", "chickpea", "middle eastern"] },
  { emoji: "🥚", name: "Egg", category: "food", keywords: ["egg", "protein", "white"] },
  { emoji: "🍳", name: "Cooking", category: "food", keywords: ["fried egg", "cooking", "pan"] },
  { emoji: "🥘", name: "Shallow Pan of Food", category: "food", keywords: ["paella", "pan", "spanish"] },
  { emoji: "🍲", name: "Pot of Food", category: "food", keywords: ["stew", "pot", "soup"] },
  { emoji: "🫕", name: "Fondue", category: "food", keywords: ["fondue", "cheese", "pot"] },
  { emoji: "🥗", name: "Green Salad", category: "food", keywords: ["salad", "healthy", "greens"] },
  { emoji: "🍿", name: "Popcorn", category: "food", keywords: ["popcorn", "movie", "snack"] },
  { emoji: "🧈", name: "Butter", category: "food", keywords: ["butter", "dairy", "yellow"] },
  { emoji: "🧂", name: "Salt", category: "food", keywords: ["salt", "seasoning", "shaker"] },
  { emoji: "🥫", name: "Canned Food", category: "food", keywords: ["can", "canned", "preserved"] },

  // Drink
  { emoji: "🍼", name: "Baby Bottle", category: "drink", keywords: ["bottle", "baby", "milk"] },
  { emoji: "🥛", name: "Glass of Milk", category: "drink", keywords: ["milk", "glass", "dairy"] },
  { emoji: "☕", name: "Hot Beverage", category: "drink", keywords: ["coffee", "hot", "steam"] },
  { emoji: "🫖", name: "Teapot", category: "drink", keywords: ["teapot", "tea", "brew"] },
  { emoji: "🍵", name: "Teacup Without Handle", category: "drink", keywords: ["tea", "green tea", "cup"] },
  { emoji: "🍶", name: "Sake", category: "drink", keywords: ["sake", "japanese", "rice wine"] },
  { emoji: "🍾", name: "Bottle with Popping Cork", category: "drink", keywords: ["champagne", "celebration", "cork"] },
  { emoji: "🍷", name: "Wine Glass", category: "drink", keywords: ["wine", "red wine", "glass"] },
  { emoji: "🍸", name: "Cocktail Glass", category: "drink", keywords: ["martini", "cocktail", "drink"] },
  { emoji: "🍹", name: "Tropical Drink", category: "drink", keywords: ["tropical", "cocktail", "umbrella"] },
  { emoji: "🍺", name: "Beer Mug", category: "drink", keywords: ["beer", "mug", "foam"] },
  { emoji: "🍻", name: "Clinking Beer Mugs", category: "drink", keywords: ["cheers", "beer", "toast"] },
  { emoji: "🥂", name: "Clinking Glasses", category: "drink", keywords: ["cheers", "champagne", "celebration"] },
  { emoji: "🥃", name: "Tumbler Glass", category: "drink", keywords: ["whiskey", "bourbon", "rocks"] },
  { emoji: "🫗", name: "Pouring Liquid", category: "drink", keywords: ["pour", "liquid", "drink"] },
  { emoji: "🥤", name: "Cup with Straw", category: "drink", keywords: ["soda", "soft drink", "straw"] },
  { emoji: "🧋", name: "Bubble Tea", category: "drink", keywords: ["bubble tea", "boba", "taiwan"] },
  { emoji: "🧃", name: "Beverage Box", category: "drink", keywords: ["juice box", "drink", "straw"] },
  { emoji: "🧉", name: "Mate", category: "drink", keywords: ["mate", "yerba", "south american"] },
  { emoji: "🧊", name: "Ice", category: "drink", keywords: ["ice", "cube", "cold"] },

  // Travel
  { emoji: "🚗", name: "Car", category: "travel", keywords: ["car", "automobile", "drive"] },
  { emoji: "🚕", name: "Taxi", category: "travel", keywords: ["taxi", "cab", "ride"] },
  { emoji: "🚌", name: "Bus", category: "travel", keywords: ["bus", "public transport", "travel"] },
  { emoji: "🚎", name: "Trolleybus", category: "travel", keywords: ["trolley", "bus", "electric"] },
  { emoji: "🏎️", name: "Racing Car", category: "travel", keywords: ["race car", "speed", "f1"] },
  { emoji: "🚓", name: "Police Car", category: "travel", keywords: ["police", "emergency", "law"] },
  { emoji: "🚑", name: "Ambulance", category: "travel", keywords: ["ambulance", "emergency", "medical"] },
  { emoji: "🚒", name: "Fire Engine", category: "travel", keywords: ["fire truck", "emergency", "red"] },
  { emoji: "🚐", name: "Minibus", category: "travel", keywords: ["van", "minibus", "transport"] },
  { emoji: "🛻", name: "Pickup Truck", category: "travel", keywords: ["pickup", "truck", "utility"] },
  { emoji: "🚚", name: "Delivery Truck", category: "travel", keywords: ["truck", "delivery", "cargo"] },
  { emoji: "🚛", name: "Articulated Lorry", category: "travel", keywords: ["semi truck", "lorry", "big rig"] },
  { emoji: "🚜", name: "Tractor", category: "travel", keywords: ["tractor", "farm", "agriculture"] },
  { emoji: "🏍️", name: "Motorcycle", category: "travel", keywords: ["motorcycle", "bike", "ride"] },
  { emoji: "🛵", name: "Motor Scooter", category: "travel", keywords: ["scooter", "moped", "vespa"] },
  { emoji: "🚲", name: "Bicycle", category: "travel", keywords: ["bike", "bicycle", "pedal"] },
  { emoji: "🛴", name: "Kick Scooter", category: "travel", keywords: ["scooter", "kick", "ride"] },
  { emoji: "🛹", name: "Skateboard", category: "travel", keywords: ["skateboard", "skate", "wheels"] },
  { emoji: "🛼", name: "Roller Skate", category: "travel", keywords: ["roller skate", "wheels", "retro"] },
  { emoji: "🚁", name: "Helicopter", category: "travel", keywords: ["helicopter", "aircraft", "rotor"] },
  { emoji: "✈️", name: "Airplane", category: "travel", keywords: ["airplane", "plane", "flight"] },
  { emoji: "🛩️", name: "Small Airplane", category: "travel", keywords: ["small plane", "aircraft", "propeller"] },
  { emoji: "🛫", name: "Airplane Departure", category: "travel", keywords: ["takeoff", "departure", "flight"] },
  { emoji: "🛬", name: "Airplane Arrival", category: "travel", keywords: ["landing", "arrival", "flight"] },
  { emoji: "🪂", name: "Parachute", category: "travel", keywords: ["parachute", "skydiving", "fall"] },
  { emoji: "💺", name: "Seat", category: "travel", keywords: ["seat", "chair", "airplane"] },
  { emoji: "🚀", name: "Rocket", category: "travel", keywords: ["rocket", "space", "launch"] },
  { emoji: "🛸", name: "Flying Saucer", category: "travel", keywords: ["ufo", "alien", "spaceship"] },
  { emoji: "🚂", name: "Locomotive", category: "travel", keywords: ["train", "locomotive", "steam"] },
  { emoji: "🚃", name: "Railway Car", category: "travel", keywords: ["train car", "railway", "carriage"] },
  { emoji: "🚄", name: "High-Speed Train", category: "travel", keywords: ["bullet train", "fast", "japan"] },
  { emoji: "🚅", name: "Bullet Train", category: "travel", keywords: ["shinkansen", "bullet", "speed"] },
  { emoji: "🚆", name: "Train", category: "travel", keywords: ["train", "railway", "commuter"] },
  { emoji: "🚇", name: "Metro", category: "travel", keywords: ["subway", "underground", "metro"] },
  { emoji: "🚈", name: "Light Rail", category: "travel", keywords: ["light rail", "tram", "urban"] },
  { emoji: "🚉", name: "Station", category: "travel", keywords: ["train station", "platform", "depot"] },
  { emoji: "🚊", name: "Tram", category: "travel", keywords: ["tram", "streetcar", "trolley"] },
  { emoji: "🚝", name: "Monorail", category: "travel", keywords: ["monorail", "single rail", "disney"] },
  { emoji: "🚞", name: "Mountain Railway", category: "travel", keywords: ["mountain train", "cog railway", "steep"] },
  { emoji: "🚟", name: "Suspension Railway", category: "travel", keywords: ["suspension", "hanging", "railway"] },
  { emoji: "🚠", name: "Mountain Cableway", category: "travel", keywords: ["cable car", "gondola", "mountain"] },
  { emoji: "🚡", name: "Aerial Tramway", category: "travel", keywords: ["tramway", "cable", "aerial"] },
  { emoji: "🛥️", name: "Motor Boat", category: "travel", keywords: ["boat", "speedboat", "water"] },
  { emoji: "🚤", name: "Speedboat", category: "travel", keywords: ["speedboat", "fast boat", "racing"] },
  { emoji: "⛵", name: "Sailboat", category: "travel", keywords: ["sailboat", "sailing", "wind"] },
  { emoji: "🛶", name: "Canoe", category: "travel", keywords: ["canoe", "paddle", "river"] },
  { emoji: "🚢", name: "Ship", category: "travel", keywords: ["ship", "cruise", "ocean"] },
  { emoji: "⛴️", name: "Ferry", category: "travel", keywords: ["ferry", "passenger", "water"] },
  { emoji: "🛳️", name: "Passenger Ship", category: "travel", keywords: ["cruise ship", "liner", "vacation"] },
  { emoji: "⚓", name: "Anchor", category: "travel", keywords: ["anchor", "ship", "harbor"] },
  { emoji: "🪝", name: "Hook", category: "travel", keywords: ["hook", "fishing", "catch"] },
  { emoji: "⛽", name: "Fuel Pump", category: "travel", keywords: ["gas station", "fuel", "petrol"] },
  { emoji: "🚨", name: "Police Car Light", category: "travel", keywords: ["siren", "emergency", "police"] },
  { emoji: "🚥", name: "Horizontal Traffic Light", category: "travel", keywords: ["traffic light", "stop", "go"] },
  { emoji: "🚦", name: "Vertical Traffic Light", category: "travel", keywords: ["traffic light", "red", "green"] },
  { emoji: "🛑", name: "Stop Sign", category: "travel", keywords: ["stop", "sign", "octagon"] },
  { emoji: "🚧", name: "Construction", category: "travel", keywords: ["construction", "work", "barrier"] },

  // Places
  { emoji: "🏠", name: "House", category: "places", keywords: ["house", "home", "building"] },
  { emoji: "🏡", name: "House with Garden", category: "places", keywords: ["house", "garden", "suburban"] },
  { emoji: "🏘️", name: "Houses", category: "places", keywords: ["neighborhood", "houses", "residential"] },
  { emoji: "🏚️", name: "Derelict House", category: "places", keywords: ["abandoned", "old", "broken"] },
  { emoji: "🏗️", name: "Building Construction", category: "places", keywords: ["construction", "crane", "building"] },
  { emoji: "🏭", name: "Factory", category: "places", keywords: ["factory", "industry", "smoke"] },
  { emoji: "🏢", name: "Office Building", category: "places", keywords: ["office", "business", "skyscraper"] },
  { emoji: "🏬", name: "Department Store", category: "places", keywords: ["store", "shopping", "mall"] },
  { emoji: "🏣", name: "Japanese Post Office", category: "places", keywords: ["post office", "mail", "japan"] },
  { emoji: "🏤", name: "Post Office", category: "places", keywords: ["post office", "mail", "letters"] },
  { emoji: "🏥", name: "Hospital", category: "places", keywords: ["hospital", "medical", "health"] },
  { emoji: "🏦", name: "Bank", category: "places", keywords: ["bank", "money", "financial"] },
  { emoji: "🏨", name: "Hotel", category: "places", keywords: ["hotel", "accommodation", "travel"] },
  { emoji: "🏩", name: "Love Hotel", category: "places", keywords: ["love hotel", "heart", "japan"] },
  { emoji: "🏪", name: "Convenience Store", category: "places", keywords: ["store", "shop", "24/7"] },
  { emoji: "🏫", name: "School", category: "places", keywords: ["school", "education", "learning"] },
  { emoji: "🏬", name: "Department Store", category: "places", keywords: ["department store", "shopping", "retail"] },
  { emoji: "🏯", name: "Japanese Castle", category: "places", keywords: ["castle", "japan", "traditional"] },
  { emoji: "🏰", name: "Castle", category: "places", keywords: ["castle", "fortress", "medieval"] },
  { emoji: "💒", name: "Wedding", category: "places", keywords: ["wedding", "church", "marriage"] },
  { emoji: "🗼", name: "Tokyo Tower", category: "places", keywords: ["tokyo tower", "landmark", "japan"] },
  { emoji: "🗽", name: "Statue of Liberty", category: "places", keywords: ["statue of liberty", "new york", "america"] },
  { emoji: "⛪", name: "Church", category: "places", keywords: ["church", "religion", "christian"] },
  { emoji: "🕌", name: "Mosque", category: "places", keywords: ["mosque", "islam", "religion"] },
  { emoji: "🛕", name: "Hindu Temple", category: "places", keywords: ["temple", "hindu", "religion"] },
  { emoji: "🕍", name: "Synagogue", category: "places", keywords: ["synagogue", "jewish", "religion"] },
  { emoji: "⛩️", name: "Shinto Shrine", category: "places", keywords: ["shrine", "shinto", "japan"] },
  { emoji: "🕋", name: "Kaaba", category: "places", keywords: ["kaaba", "mecca", "islam"] },
  { emoji: "⛲", name: "Fountain", category: "places", keywords: ["fountain", "water", "park"] },
  { emoji: "⛺", name: "Tent", category: "places", keywords: ["tent", "camping", "outdoor"] },
  { emoji: "🌁", name: "Foggy", category: "places", keywords: ["fog", "city", "skyline"] },
  { emoji: "🌃", name: "Night with Stars", category: "places", keywords: ["night", "city", "stars"] },
  { emoji: "🏙️", name: "Cityscape", category: "places", keywords: ["city", "buildings", "urban"] },
  { emoji: "🌄", name: "Sunrise Over Mountains", category: "places", keywords: ["sunrise", "mountains", "dawn"] },
  { emoji: "🌅", name: "Sunrise", category: "places", keywords: ["sunrise", "morning", "sun"] },
  { emoji: "🌆", name: "Cityscape at Dusk", category: "places", keywords: ["dusk", "city", "evening"] },
  { emoji: "🌇", name: "Sunset", category: "places", keywords: ["sunset", "evening", "sun"] },
  { emoji: "🌉", name: "Bridge at Night", category: "places", keywords: ["bridge", "night", "lights"] },
  { emoji: "🎡", name: "Ferris Wheel", category: "places", keywords: ["ferris wheel", "amusement", "carnival"] },
  { emoji: "🎢", name: "Roller Coaster", category: "places", keywords: ["roller coaster", "thrill", "amusement"] },
  { emoji: "🎠", name: "Carousel Horse", category: "places", keywords: ["carousel", "merry-go-round", "horse"] },

  // Symbols
  { emoji: "❤️", name: "Red Heart", category: "symbols", keywords: ["love", "heart", "red"] },
  { emoji: "💛", name: "Yellow Heart", category: "symbols", keywords: ["love", "heart", "yellow"] },
  { emoji: "💚", name: "Green Heart", category: "symbols", keywords: ["love", "heart", "green"] },
  { emoji: "💙", name: "Blue Heart", category: "symbols", keywords: ["love", "heart", "blue"] },
  { emoji: "💜", name: "Purple Heart", category: "symbols", keywords: ["love", "heart", "purple"] },
  { emoji: "🖤", name: "Black Heart", category: "symbols", keywords: ["love", "heart", "black"] },
  { emoji: "🤍", name: "White Heart", category: "symbols", keywords: ["love", "heart", "white"] },
  { emoji: "🤎", name: "Brown Heart", category: "symbols", keywords: ["love", "heart", "brown"] },
  { emoji: "❣️", name: "Heart Exclamation", category: "symbols", keywords: ["heart", "exclamation", "love"] },
  { emoji: "💕", name: "Two Hearts", category: "symbols", keywords: ["hearts", "love", "pink"] },
  { emoji: "💖", name: "Sparkling Heart", category: "symbols", keywords: ["heart", "sparkle", "love"] },
  { emoji: "💗", name: "Growing Heart", category: "symbols", keywords: ["heart", "growing", "love"] },
  { emoji: "💘", name: "Heart with Arrow", category: "symbols", keywords: ["heart", "arrow", "cupid"] },
  { emoji: "💝", name: "Heart with Ribbon", category: "symbols", keywords: ["heart", "gift", "ribbon"] },
  { emoji: "💞", name: "Revolving Hearts", category: "symbols", keywords: ["hearts", "revolving", "love"] },
  { emoji: "💟", name: "Heart Decoration", category: "symbols", keywords: ["heart", "decoration", "purple"] },
  { emoji: "☮️", name: "Peace Symbol", category: "symbols", keywords: ["peace", "hippie", "symbol"] },
  { emoji: "✝️", name: "Latin Cross", category: "symbols", keywords: ["cross", "christian", "religion"] },
  { emoji: "☪️", name: "Star and Crescent", category: "symbols", keywords: ["islam", "muslim", "crescent"] },
  { emoji: "🕉️", name: "Om", category: "symbols", keywords: ["om", "hindu", "meditation"] },
  { emoji: "☸️", name: "Wheel of Dharma", category: "symbols", keywords: ["dharma", "buddhist", "wheel"] },
  { emoji: "✡️", name: "Star of David", category: "symbols", keywords: ["star", "david", "jewish"] },
  { emoji: "🔯", name: "Dotted Six-Pointed Star", category: "symbols", keywords: ["star", "six pointed", "dotted"] },
  { emoji: "🕎", name: "Menorah", category: "symbols", keywords: ["menorah", "jewish", "candles"] },
  { emoji: "☯️", name: "Yin Yang", category: "symbols", keywords: ["yin yang", "balance", "tao"] },
  { emoji: "☦️", name: "Orthodox Cross", category: "symbols", keywords: ["orthodox", "cross", "christian"] },
  { emoji: "🛐", name: "Place of Worship", category: "symbols", keywords: ["worship", "religion", "pray"] },
  { emoji: "⛎", name: "Ophiuchus", category: "symbols", keywords: ["ophiuchus", "zodiac", "serpent"] },
  { emoji: "♈", name: "Aries", category: "symbols", keywords: ["aries", "zodiac", "ram"] },
  { emoji: "♉", name: "Taurus", category: "symbols", keywords: ["taurus", "zodiac", "bull"] },
  { emoji: "♊", name: "Gemini", category: "symbols", keywords: ["gemini", "zodiac", "twins"] },
  { emoji: "♋", name: "Cancer", category: "symbols", keywords: ["cancer", "zodiac", "crab"] },
  { emoji: "♌", name: "Leo", category: "symbols", keywords: ["leo", "zodiac", "lion"] },
  { emoji: "♍", name: "Virgo", category: "symbols", keywords: ["virgo", "zodiac", "maiden"] },
  { emoji: "♎", name: "Libra", category: "symbols", keywords: ["libra", "zodiac", "scales"] },
  { emoji: "♏", name: "Scorpio", category: "symbols", keywords: ["scorpio", "zodiac", "scorpion"] },
  { emoji: "♐", name: "Sagittarius", category: "symbols", keywords: ["sagittarius", "zodiac", "archer"] },
  { emoji: "♑", name: "Capricorn", category: "symbols", keywords: ["capricorn", "zodiac", "goat"] },
  { emoji: "♒", name: "Aquarius", category: "symbols", keywords: ["aquarius", "zodiac", "water"] },
  { emoji: "♓", name: "Pisces", category: "symbols", keywords: ["pisces", "zodiac", "fish"] },
  { emoji: "🆔", name: "ID Button", category: "symbols", keywords: ["id", "identification", "button"] },
  { emoji: "⚛️", name: "Atom Symbol", category: "symbols", keywords: ["atom", "science", "nuclear"] },
  { emoji: "🉑", name: "Japanese Acceptable Button", category: "symbols", keywords: ["acceptable", "japanese", "ok"] },
  { emoji: "☢️", name: "Radioactive", category: "symbols", keywords: ["radioactive", "nuclear", "danger"] },
  { emoji: "☣️", name: "Biohazard", category: "symbols", keywords: ["biohazard", "danger", "toxic"] },
  { emoji: "📴", name: "Mobile Phone Off", category: "symbols", keywords: ["phone off", "no phone", "quiet"] },
  { emoji: "📳", name: "Vibration Mode", category: "symbols", keywords: ["vibrate", "phone", "silent"] },
  { emoji: "🈶", name: "Japanese Not Free of Charge Button", category: "symbols", keywords: ["not free", "japanese", "charge"] },
  { emoji: "🈚", name: "Japanese Free of Charge Button", category: "symbols", keywords: ["free", "japanese", "no charge"] },
  { emoji: "🈸", name: "Japanese Application Button", category: "symbols", keywords: ["application", "japanese", "apply"] },
  { emoji: "🈺", name: "Japanese Open for Business Button", category: "symbols", keywords: ["open", "business", "japanese"] },
  { emoji: "🈷️", name: "Japanese Monthly Amount Button", category: "symbols", keywords: ["monthly", "japanese", "amount"] },
  { emoji: "✴️", name: "Eight-Pointed Star", category: "symbols", keywords: ["star", "eight pointed", "sparkle"] },
  { emoji: "🆚", name: "VS Button", category: "symbols", keywords: ["vs", "versus", "competition"] },
  { emoji: "💮", name: "White Flower", category: "symbols", keywords: ["flower", "white", "japanese"] },
  { emoji: "🉐", name: "Japanese Bargain Button", category: "symbols", keywords: ["bargain", "deal", "japanese"] },
  { emoji: "㊙️", name: "Japanese Secret Button", category: "symbols", keywords: ["secret", "japanese", "hidden"] },
  { emoji: "㊗️", name: "Japanese Congratulations Button", category: "symbols", keywords: ["congratulations", "japanese", "celebration"] },
  { emoji: "🈴", name: "Japanese Passing Grade Button", category: "symbols", keywords: ["passing", "grade", "japanese"] },
  { emoji: "🈵", name: "Japanese No Vacancy Button", category: "symbols", keywords: ["no vacancy", "full", "japanese"] },
  { emoji: "🈹", name: "Japanese Discount Button", category: "symbols", keywords: ["discount", "sale", "japanese"] },
  { emoji: "🈲", name: "Japanese Prohibited Button", category: "symbols", keywords: ["prohibited", "forbidden", "japanese"] },
  { emoji: "🅰️", name: "A Button (Blood Type)", category: "symbols", keywords: ["A", "blood type", "button"] },
  { emoji: "🅱️", name: "B Button (Blood Type)", category: "symbols", keywords: ["B", "blood type", "button"] },
  { emoji: "🆎", name: "AB Button (Blood Type)", category: "symbols", keywords: ["AB", "blood type", "button"] },
  { emoji: "🅾️", name: "O Button (Blood Type)", category: "symbols", keywords: ["O", "blood type", "button"] },
  { emoji: "🆑", name: "CL Button", category: "symbols", keywords: ["CL", "clear", "button"] },
  { emoji: "🆘", name: "SOS Button", category: "symbols", keywords: ["SOS", "emergency", "help"] },
  { emoji: "❌", name: "Cross Mark", category: "symbols", keywords: ["x", "cross", "wrong"] },
  { emoji: "⭕", name: "Hollow Red Circle", category: "symbols", keywords: ["circle", "correct", "o"] },
  { emoji: "🛑", name: "Stop Sign", category: "symbols", keywords: ["stop", "sign", "red"] },
  { emoji: "⛔", name: "No Entry", category: "symbols", keywords: ["no entry", "forbidden", "stop"] },
  { emoji: "📛", name: "Name Badge", category: "symbols", keywords: ["name", "badge", "hello"] },
  { emoji: "🚫", name: "Prohibited", category: "symbols", keywords: ["prohibited", "no", "forbidden"] },
  { emoji: "💯", name: "Hundred Points", category: "symbols", keywords: ["100", "perfect", "score"] },
  { emoji: "💢", name: "Anger Symbol", category: "symbols", keywords: ["anger", "mad", "symbol"] },
  { emoji: "♨️", name: "Hot Springs", category: "symbols", keywords: ["hot springs", "steam", "onsen"] },
  { emoji: "🚷", name: "No Pedestrians", category: "symbols", keywords: ["no pedestrians", "forbidden", "walk"] },
  { emoji: "🚯", name: "No Littering", category: "symbols", keywords: ["no littering", "trash", "clean"] },
  { emoji: "🚳", name: "No Bicycles", category: "symbols", keywords: ["no bicycles", "bike", "forbidden"] },
  { emoji: "🚱", name: "Non-Potable Water", category: "symbols", keywords: ["no water", "not drinkable", "forbidden"] },
  { emoji: "🔞", name: "No One Under Eighteen", category: "symbols", keywords: ["18+", "adult", "age restriction"] },
  { emoji: "📵", name: "No Mobile Phones", category: "symbols", keywords: ["no phones", "quiet", "forbidden"] },
  { emoji: "🚭", name: "No Smoking", category: "symbols", keywords: ["no smoking", "cigarette", "forbidden"] },
  { emoji: "❗", name: "Exclamation Mark", category: "symbols", keywords: ["exclamation", "warning", "important"] },
  { emoji: "❕", name: "White Exclamation Mark", category: "symbols", keywords: ["exclamation", "white", "alert"] },
  { emoji: "❓", name: "Question Mark", category: "symbols", keywords: ["question", "ask", "wonder"] },
  { emoji: "❔", name: "White Question Mark", category: "symbols", keywords: ["question", "white", "wonder"] },
  { emoji: "‼️", name: "Double Exclamation Mark", category: "symbols", keywords: ["double", "exclamation", "urgent"] },
  { emoji: "⁉️", name: "Exclamation Question Mark", category: "symbols", keywords: ["exclamation", "question", "confused"] },
  { emoji: "🔅", name: "Low Brightness", category: "symbols", keywords: ["dim", "low", "brightness"] },
  { emoji: "🔆", name: "High Brightness", category: "symbols", keywords: ["bright", "high", "brightness"] },
  { emoji: "〽️", name: "Part Alternation Mark", category: "symbols", keywords: ["part", "alternation", "japanese"] },
  { emoji: "⚠️", name: "Warning", category: "symbols", keywords: ["warning", "caution", "danger"] },
  { emoji: "🚸", name: "Children Crossing", category: "symbols", keywords: ["children", "crossing", "school"] },
  { emoji: "🔱", name: "Trident Emblem", category: "symbols", keywords: ["trident", "emblem", "symbol"] },
  { emoji: "⚜️", name: "Fleur-de-lis", category: "symbols", keywords: ["fleur de lis", "french", "royal"] },
  { emoji: "🔰", name: "Japanese Symbol for Beginner", category: "symbols", keywords: ["beginner", "leaf", "japanese"] },
  { emoji: "♻️", name: "Recycling Symbol", category: "symbols", keywords: ["recycle", "green", "environment"] },
  { emoji: "✅", name: "Check Mark Button", category: "symbols", keywords: ["check", "correct", "done"] },
  { emoji: "🈯", name: "Japanese Reserved Button", category: "symbols", keywords: ["reserved", "japanese", "finger"] },
  { emoji: "💹", name: "Chart Increasing with Yen", category: "symbols", keywords: ["chart", "yen", "money"] },
  { emoji: "❇️", name: "Sparkle", category: "symbols", keywords: ["sparkle", "star", "shine"] },
  { emoji: "✳️", name: "Eight-Spoked Asterisk", category: "symbols", keywords: ["asterisk", "star", "symbol"] },
  { emoji: "❎", name: "Cross Mark Button", category: "symbols", keywords: ["x", "cross", "button"] },
  { emoji: "🌐", name: "Globe with Meridians", category: "symbols", keywords: ["globe", "world", "internet"] },
  { emoji: "💠", name: "Diamond with a Dot", category: "symbols", keywords: ["diamond", "dot", "blue"] },
  { emoji: "Ⓜ️", name: "Circled M", category: "symbols", keywords: ["M", "metro", "circle"] },
  { emoji: "🌀", name: "Cyclone", category: "symbols", keywords: ["cyclone", "hurricane", "spiral"] },
  { emoji: "💤", name: "Zzz", category: "symbols", keywords: ["sleep", "zzz", "tired"] },
  { emoji: "🏧", name: "ATM Sign", category: "symbols", keywords: ["ATM", "bank", "money"] },
  { emoji: "🚾", name: "Water Closet", category: "symbols", keywords: ["WC", "toilet", "restroom"] },
  { emoji: "♿", name: "Wheelchair Symbol", category: "symbols", keywords: ["wheelchair", "disabled", "accessibility"] },
  { emoji: "🅿️", name: "P Button", category: "symbols", keywords: ["P", "parking", "button"] },
  { emoji: "🈳", name: "Japanese Vacancy Button", category: "symbols", keywords: ["vacancy", "empty", "japanese"] },
  { emoji: "🈂️", name: "Japanese Service Charge Button", category: "symbols", keywords: ["service", "charge", "japanese"] },
  { emoji: "🛂", name: "Passport Control", category: "symbols", keywords: ["passport", "control", "immigration"] },
  { emoji: "🛃", name: "Customs", category: "symbols", keywords: ["customs", "baggage", "airport"] },
  { emoji: "🛄", name: "Baggage Claim", category: "symbols", keywords: ["baggage", "claim", "airport"] },
  { emoji: "🛅", name: "Left Luggage", category: "symbols", keywords: ["luggage", "storage", "airport"] },
];

const categories = [
  { id: "all", name: "All", icon: Star },
  { id: "smileys", name: "Smileys", icon: Smile },
  { id: "affectionate", name: "Affectionate", icon: Heart },
  { id: "tongue", name: "Tongue", icon: Eye },
  { id: "neutral", name: "Neutral", icon: Glasses },
  { id: "people", name: "People & Body", icon: Users },
  { id: "hearts", name: "Hearts", icon: Heart },
  { id: "activity", name: "Activity", icon: Activity },
  { id: "flags", name: "Flags", icon: Flag },
  { id: "vehicles", name: "Vehicles", icon: Car },
  { id: "weapons", name: "Weapons", icon: Sword },
  { id: "animals", name: "Animals", icon: PawPrint },
  { id: "numbers", name: "Numbers", icon: Hash },
  { id: "nature", name: "Nature", icon: TreePine },
  { id: "food", name: "Food", icon: Apple },
  { id: "drink", name: "Drink", icon: Coffee },
  { id: "travel", name: "Travel", icon: MapPin },
  { id: "places", name: "Places", icon: Home },
  { id: "symbols", name: "Symbols", icon: SymbolIcon },
];

const EmojiPicker = () => {
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
      ? hiddenCategories.filter(id => id !== categoryId)
      : [...hiddenCategories, categoryId];
    setHiddenCategories(newHidden);
    localStorage.setItem("hiddenEmojiCategories", JSON.stringify(newHidden));
  };

  const visibleCategories = categories.filter(cat => !hiddenCategories.includes(cat.id));

  // Filter emojis based on search and category
  const filteredEmojis = emojiData.filter((emoji) => {
    const matchesCategory = selectedCategory === "all" || emoji.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      emoji.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emoji.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Copy emoji to clipboard and add to recent
  const copyEmoji = (emojiChar: string) => {
    navigator.clipboard.writeText(emojiChar);
    toast.success(`Copied ${emojiChar} to clipboard!`);
    
    // Update recent emojis (keep last 10, remove duplicates)
    const newRecent = [emojiChar, ...recentEmojis.filter(e => e !== emojiChar)].slice(0, 10);
    setRecentEmojis(newRecent);
    saveRecentEmojis(newRecent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
            Emoji Picker
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse, search, and copy emojis. Your recently used emojis are saved for quick access.
          </p>
        </div>

        <Card className="p-6">
          {/* Search Bar and Settings */}
          <div className="flex gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search emojis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Show/Hide Categories</h3>
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-2">
                        {categories.filter(cat => cat.id !== "all").map((category) => {
                          const IconComponent = category.icon;
                          return (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={category.id}
                                checked={!hiddenCategories.includes(category.id)}
                                onCheckedChange={() => toggleCategoryVisibility(category.id)}
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
              </PopoverContent>
            </Popover>
          </div>

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

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 mb-6 gap-1 h-auto p-1" style={{ gridTemplateColumns: `repeat(${Math.min(visibleCategories.length, 11)}, minmax(0, 1fr))` }}>
              {visibleCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1">
                    <IconComponent className="h-3 w-3" />
                    <span className="hidden sm:inline text-xs">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {/* Emoji Grid */}
            <TabsContent value={selectedCategory}>
              <ScrollArea className="h-[500px]">
                {filteredEmojis.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No emojis found matching your search.</p>
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
          </Tabs>

          {/* Statistics */}
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>{filteredEmojis.length} emojis found</span>
              <span>{emojiData.length} total emojis</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmojiPicker;
