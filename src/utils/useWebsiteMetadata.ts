import { getWebsite } from "@/api";

interface IWebsiteMetadata {
  status?: "success" | "empty" | "error";
  title?: string;
  description?: string;
  image?: string;
}

export async function useWebsiteMetadata(
  url: string
): Promise<IWebsiteMetadata> {
  const result: IWebsiteMetadata = {};
  let response;
  try {
    response = await getWebsite(url);
  } catch (error) {
    console.error("Error fetching website metadata:", error);
    result.status = "error";
    return result;
  }
  const allMeta =
    /<meta (?:http-equiv|itemprop|property|name)="(?<prop>(?:og|twitter)?[^"]+?)" content="(?<content>[^"]+)(?!\\)"[^>]*?>/g;
  const matches = response.matchAll(allMeta);
  console.log(response, matches);
  if (!matches) {
    result.status = "empty";
    return result;
  }

  // Prefer OG tags over Twitter tags
  for (const match of matches) {
    if (!match.groups) continue;
    const { prop, content } = match.groups;
    switch (prop) {
      case "title":
      case "og:title":
      case "twitter:title":
        result.title = content;
        break;
      case "description":
      case "og:description":
      case "twitter:description":
        result.description = content;
        break;
      case "og:image":
      case "twitter:image":
        result.image = content;
        break;
    }
  }
  result.status = "success";
  return result;
}
