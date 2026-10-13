import type { IncomingMessage, ServerResponse } from 'http';
import {
  notifyCountryRuleUpdated,
  requestUrlCrawl,
  notifyBatchUrls,
  getServiceAccountCredentials
} from '../src/lib/googleIndexing';

export interface VercelServerlessRequest extends IncomingMessage {
  query?: Record<string, string | string[]>;
  body?: any;
  method?: string;
}

export interface VercelServerlessResponse extends ServerResponse {
  status: (code: number) => VercelServerlessResponse;
  send: (body: any) => void;
  json: (body: any) => void;
}

/**
 * Asynchronous Webhook Routine for Instant Google Crawler Triggers
 * Triggered whenever a country rule node is edited or a dynamic path updates.
 * Protected via `x-webhook-secret` or `Authorization: Bearer <secret>`.
 */
export default async function handler(req: VercelServerlessRequest, res: VercelServerlessResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  // 1. Authorize via Webhook Secret
  const configuredSecret = process.env.INDEXING_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET;
  if (configuredSecret) {
    const authHeader = req.headers['authorization'];
    const authString = typeof authHeader === 'string' ? authHeader : Array.isArray(authHeader) ? authHeader[0] : '';
    const secretHeader = req.headers['x-webhook-secret'];
    const secretString = typeof secretHeader === 'string' ? secretHeader : Array.isArray(secretHeader) ? secretHeader[0] : '';

    const providedSecret = secretString || authString.replace(/^Bearer\s+/i, '');

    if (providedSecret !== configuredSecret) {
      return res.status(401).json({ error: 'Unauthorized webhook secret' });
    }
  }

  // 2. Validate Google Service Account credentials presence
  const creds = getServiceAccountCredentials();
  if (!creds) {
    return res.status(503).json({
      error: 'Google Service Account credentials not configured in environment',
      hint: 'Set GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY'
    });
  }

  try {
    const body = req.body || {};
    const { action, countryCode, url, urls, type = 'URL_UPDATED' } = body;

    // Action A: Single country rule update (triggers all 5 localized URLs: TR, EN, DE, RU, ES)
    if (action === 'country_updated' || countryCode) {
      const code = String(countryCode || '').toUpperCase();
      if (!code || !/^[A-Z]{2}$/.test(code)) {
        return res.status(400).json({ error: 'Valid ISO-2 countryCode is required' });
      }

      console.log(`[Webhook Index] Dispatching crawl notifications for country ${code}...`);
      const report = await notifyCountryRuleUpdated(code);
      return res.status(200).json({
        message: `Successfully notified Google Indexing API for country ${code}`,
        report
      });
    }

    // Action B: Single explicit URL
    if (url && typeof url === 'string') {
      console.log(`[Webhook Index] Dispatching crawl notification for single URL: ${url}`);
      const result = await requestUrlCrawl(url, type);
      return res.status(200).json({
        message: `Notification sent to Google for ${url}`,
        result
      });
    }

    // Action C: Batch of URLs
    if (Array.isArray(urls) && urls.length > 0) {
      console.log(`[Webhook Index] Dispatching crawl notification for ${urls.length} URLs`);
      const report = await notifyBatchUrls(urls, type);
      return res.status(200).json({
        message: `Batch notifications processed`,
        report
      });
    }

    return res.status(400).json({
      error: 'Invalid webhook payload',
      acceptedPayloads: [
        { action: 'country_updated', countryCode: 'TH' },
        { url: 'https://vizamigo.com/tr/arnavutluk', type: 'URL_UPDATED' },
        { urls: ['https://vizamigo.com/tr/arnavutluk', 'https://vizamigo.com/en/albania'] }
      ]
    });
  } catch (error: any) {
    console.error('[Webhook Index Error]', error);
    return res.status(500).json({
      error: 'Internal error processing indexing notification',
      details: error?.message || String(error)
    });
  }
}
