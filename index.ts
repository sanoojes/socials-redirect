import { serve } from "bun";
import Redis from "redis";

import redirects from "./redirects";
import html from "./html";

const redis = Redis.createClient({
  url: process.env.REDIS_URL ?? "redis://localhost:6379",
});
await redis.connect();

serve({
  port: Bun.env?.PORT ?? 3001,
  async fetch(req) {
    const url = new URL(req.url);

    // robots.txt
    if (url.pathname === "/robots.txt") {
      return new Response("User-agent: *\nDisallow:", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    // count endpoint for analytics
    if (url.pathname === "/count") {
      const counts: Record<string, string> = {};
      for (const path of Object.keys(redirects)) {
        counts[path] = (await redis.get(`counter:${path}`)) ?? "0";
      }
      return new Response(JSON.stringify(counts, null, 2), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // redirect links
    const target = redirects[url.pathname];
    if (target) {
      await redis.incr(`counter:${url.pathname}`);
      return new Response(null, {
        status: 301,
        headers: { Location: target, "Cache-Control": "no-cache" },
      });
    }

    // main page 
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
        "X-Robots-Tag": "index, follow",
      },
    });
  },
});

console.log("Social links server running...");
