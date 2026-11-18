// Server-side only: reads today's Daily Manna from dailymanna.app (ported from the original server).
export async function fetchDailyManna() {
  const response = await fetch("https://dailymanna.app/");
  const html = await response.text();

  const titleMatch = html.match(/<h6[^>]*>\s*([^<]+)\s*<\/h6>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";

  const dateMatch = html.match(/((?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday),\s+\w+\s+\d{1,2},\s+\d{4})/i);
  const date = dateMatch ? dateMatch[1].trim() : "";

  const keyVerseBlock = html.match(/<blockquote[^>]*>[\s\S]*?Key\s*Verse[\s\S]*?<p>([^<]+(?:<[^>]*>[^<]*)*)<\/p>[\s\S]*?<cite>([\s\S]*?)<\/cite>[\s\S]*?<\/blockquote>/i);
  let keyVerse = "";
  let bibleText = "";
  if (keyVerseBlock) {
    keyVerse = keyVerseBlock[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const textRef = keyVerseBlock[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    const textMatch = textRef.match(/TEXT\s*(?:—|–|-)\s*(.*)/i);
    bibleText = textMatch ? textMatch[1].trim() : textRef;
  }

  const messageSection = html.match(/<h2[^>]*>\s*Message\s*<\/h2>([\s\S]*?)(?=<(?:h2|blockquote|section|footer))/i);
  let messageExcerpt = "";
  let fullMessage = "";
  if (messageSection) {
    const allParas = messageSection[1].match(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    if (allParas) {
      const paragraphs = allParas.map(p => p.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()).filter(p => p.length > 0);
      fullMessage = paragraphs.join("\n\n");
      messageExcerpt = paragraphs[0] || "";
      if (messageExcerpt.length > 300) {
        messageExcerpt = messageExcerpt.substring(0, 300).replace(/\s+\S*$/, "") + "...";
      }
    }
  }

  const thoughtBlock = html.match(/Thought\s+for\s+the\s+day[\s\S]*?<blockquote[^>]*>\s*(?:<!--[^>]*-->)*\s*<p>([^<]+)<\/p>/i)
    || html.match(/<h2[^>]*>Message<\/h2>[\s\S]*?<blockquote[^>]*>\s*(?:<!--[^>]*-->)*\s*<p>([^<]+)<\/p>/i);
  let thoughtForTheDay = "";
  if (thoughtBlock) {
    thoughtForTheDay = thoughtBlock[1].replace(/\s+/g, " ").trim();
  }

  const result = {
    title: title || "Daily Manna",
    date,
    keyVerse,
    bibleText,
    messageExcerpt,
    fullMessage,
    thoughtForTheDay,
    sourceUrl: "https://dailymanna.app/",
  };

  return result;
}
