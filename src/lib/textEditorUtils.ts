export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Copy failed:", error);
    return false;
  }
};

export const toggleBookmark = (path: string): boolean => {
  const bookmarks = JSON.parse(
    localStorage.getItem("text-transformer-bookmarks") || "[]"
  );

  const isCurrentlyBookmarked = bookmarks.includes(path);

  const newBookmarks = isCurrentlyBookmarked
    ? bookmarks.filter((p: string) => p !== path)
    : [...bookmarks, path];

  localStorage.setItem(
    "text-transformer-bookmarks",
    JSON.stringify(newBookmarks)
  );

  return !isCurrentlyBookmarked;
};

export const isBookmarked = (path: string): boolean => {
  const bookmarks = JSON.parse(
    localStorage.getItem("text-transformer-bookmarks") || "[]"
  );
  return bookmarks.includes(path);
};
