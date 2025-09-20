import { serve } from "bun";
import Redis from "redis";
import html from "./html";
import redirects from "./redirects";

const PORT = Bun.env?.PORT ?? 3000;

const redis = Redis.createClient({
	url: process.env.REDIS_URL ?? "redis://localhost:6379",
});
await redis.connect();

serve({
	port: PORT,
	routes: {
		// count endpoint
		"/count": async () => {
			const counts: Record<string, string> = {};
			for (const path of Object.keys(redirects)) {
				counts[path] = (await redis.get(`counter:${path}`)) ?? "0";
			}
			return new Response(JSON.stringify(counts, null, 2), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		},

		// main page
		"/": new Response(html, {
			status: 200,
			headers: {
				"Content-Type": "text/html",
				"X-Robots-Tag": "index, follow",
			},
		}),

		// dynamic redirect route
		"/:path": async (req: Bun.BunRequest<"/:path">) => {
			const path = `/${req.params.path}`;
			const target = redirects[path];

			if (target) {
				await redis.incr(`counter:${path}`);
				return new Response(null, {
					status: 301,
					headers: { Location: target.url, "Cache-Control": "no-cache" },
				});
			}
			return new Response(null, {
				status: 302,
				headers: { Location: "/" },
			});
		},
	},

	fetch() {
		return new Response(null, {
			status: 302,
			headers: { Location: "/" },
		});
	},
});

console.log(`Social links server running on http://localhost:${PORT}...`);
