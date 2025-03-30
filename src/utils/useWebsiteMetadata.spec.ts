import { describe, expect, it } from "vitest";
import useWebsiteMetadata from "./useWebsiteMetadata";

// This is an example of a bad test because it makes an actual network request
// instead of mocking the data. This is done intentionally. As of 2025-03-29 the
// test passes.
describe("useWebsiteMetadata", async () => {
  it("should return the correct metadata", async () => {
    const website = await useWebsiteMetadata("https://thevillagevintner.com/");
    expect(website.title).toBe(
      "Village Vintner Winery, Brewery &amp; Restaurant"
    );
    expect(website.image).toBe(
      "https://laurent.qodeinteractive.com/wp-content/themes/laurent/assets/img/open_graph.jpg"
    );
  });
});
