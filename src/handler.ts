import { run } from "./betteruptime"

export async function handleRequest(request: Request): Promise<Response> {
  return new Response(await run())
}
