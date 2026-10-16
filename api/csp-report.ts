export const config = {
  runtime: 'edge',
};

/**
 * CSP Report-Only Ingestion Endpoint
 * Collects CSP violation reports in background without blocking or failing client traffic.
 */
export default async function handler(req: Request) {
  if (req.method === 'POST') {
    try {
      const report = await req.json();
      console.warn('[CSP-Report-Only-Violation]:', JSON.stringify(report));
    } catch {
      // Ignore parse errors from malformed client telemetry
    }
    return new Response(null, { status: 204 });
  }

  return new Response('Method Not Allowed', { status: 405 });
}
