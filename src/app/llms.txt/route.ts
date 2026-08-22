import { renderLlmsTxt } from "@/lib/agent/llms-txt";

export async function GET() {
  return new Response(await renderLlmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
