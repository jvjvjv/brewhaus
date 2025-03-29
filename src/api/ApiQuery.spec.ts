import { describe, expect, it } from "vitest";
import { getApiQueryString } from "./ApiQuery";

describe("getApiQueryString", () => {
  it("should return an empty string when no queries are provided", () => {
    expect(getApiQueryString({})).toBe("");
    let x: string;
    expect(getApiQueryString(x)).toBe("");
  });

  it("should URL-encode a single query value", () => {
    expect(getApiQueryString({ by_city: "San Francisco" })).toBe(
      "?by_city=san%20francisco"
    );
  });

  it("should handle multiple query values", () => {
    expect(
      getApiQueryString({
        by_city: "San Francisco",
        by_state: "CA",
        by_dist: { latitude: 37.7749, longitude: -122.4194 },
      })
    ).toBe("?by_city=san%20francisco&by_state=ca&by_dist=37.7749,-122.4194");
  });
});
