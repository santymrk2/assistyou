import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params, request }) => {
    return new Response("Hello world", {status: 200})
}  