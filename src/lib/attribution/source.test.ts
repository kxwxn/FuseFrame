import { describe, expect, it } from "vitest";

import { parseAttribution, preserveFirstTouch } from "@/lib/attribution/source";

describe("parseAttribution", () => {
  it("uses explicit UTM source first", () => {
    const source = parseAttribution({
      anonymousId: "anon_1",
      eventType: "visit",
      url: "https://source.launch/?utm_source=x&utm_medium=social&utm_campaign=launch&utm_content=bio",
      referrer: "https://google.com/search",
    });

    expect(source).toEqual({
      source: "x",
      utm_source: "x",
      utm_medium: "social",
      utm_campaign: "launch",
      utm_content: "bio",
      referrer: "https://google.com/search",
      landing_page: "https://source.launch/?utm_source=x&utm_medium=social&utm_campaign=launch&utm_content=bio",
    });
  });

  it("falls back to referrer host", () => {
    const source = parseAttribution({
      anonymousId: "anon_1",
      eventType: "visit",
      url: "https://source.launch/",
      referrer: "https://www.producthunt.com/posts/source-launch",
    });

    expect(source.source).toBe("producthunt.com");
    expect(source.utm_source).toBeNull();
  });

  it("falls back to direct", () => {
    const source = parseAttribution({
      anonymousId: "anon_1",
      eventType: "visit",
      url: "https://source.launch/",
      referrer: "",
    });

    expect(source.source).toBe("direct");
  });
});

describe("preserveFirstTouch", () => {
  it("keeps the first source even when a later source arrives", () => {
    const first = parseAttribution({
      anonymousId: "anon_1",
      eventType: "visit",
      url: "https://source.launch/?utm_source=indiehackers",
      referrer: null,
    });
    const later = parseAttribution({
      anonymousId: "anon_1",
      eventType: "visit",
      url: "https://source.launch/?utm_source=twitter",
      referrer: null,
    });

    expect(preserveFirstTouch(first, later).source).toBe("indiehackers");
  });
});
