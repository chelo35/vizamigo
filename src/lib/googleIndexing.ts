/**
 * Vizamigo Master Google Indexing API Integration
 * 
 * Provides automated, instant Google Mobilebot crawler triggers via the official
 * Google Webmasters / Indexing API (https://indexing.googleapis.com/v1/urlNotifications:publish).
 * Authorized securely via Google Cloud Service Account credentials with zero runtime bloat.
 */

import crypto from 'crypto';
import { CORE_SEO_LANGUAGES, buildAbsoluteLocalizedUrl } from '../utils/seoRouter';

export interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
  token_uri?: string;
}

export interface IndexingNotificationResponse {
  urlNotificationMetadata?: {
    url: string;
    latestUpdate?: {
      url: string;
      type: 'URL_UPDATED' | 'URL_DELETED';
      notifyTime: string;
    };
    latestRemove?: {
      url: string;
      type: 'URL_UPDATED' | 'URL_DELETED';
      notifyTime: string;
    };
  };
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

export interface BatchNotificationReport {
  successCount: number;
  failureCount: number;
  results: Array<{
    url: string;
    status: 'success' | 'skipped' | 'failed';
    notifyTime?: string;
    error?: string;
  }>;
}

// In-memory token cache to prevent redundant OAuth token exchanges
let cachedAccessToken: string | null = null;
let tokenExpiresAt = 0;

/**
 * Resolves Google Cloud Service Account credentials from environment variables.
 * Supports:
 *   1. `GOOGLE_SERVICE_ACCOUNT_KEY`: raw JSON or base64 encoded JSON
 *   2. `GOOGLE_CLIENT_EMAIL` & `GOOGLE_PRIVATE_KEY`
 */
export function getServiceAccountCredentials(): ServiceAccountCredentials | null {
  // Option 1: Full JSON credential in GOOGLE_SERVICE_ACCOUNT_KEY
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  if (rawKey) {
    try {
      let jsonStr = rawKey.trim();
      if (!jsonStr.startsWith('{')) {
        // Attempt base64 decoding
        jsonStr = Buffer.from(jsonStr, 'base64').toString('utf-8');
      }
      const parsed = JSON.parse(jsonStr);
      if (parsed.client_email && parsed.private_key) {
        return {
          client_email: parsed.client_email,
          private_key: parsed.private_key,
          token_uri: parsed.token_uri || 'https://oauth2.googleapis.com/token'
        };
      }
    } catch (e) {
      console.error('[GoogleIndexing] Failed to parse GOOGLE_SERVICE_ACCOUNT_KEY JSON:', e);
    }
  }

  // Option 2: Split environment variables
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (clientEmail && privateKey) {
    // Unescape newlines if stored as single-line string with \n
    privateKey = privateKey.replace(/\\n/g, '\n');
    return {
      client_email: clientEmail,
      private_key: privateKey,
      token_uri: 'https://oauth2.googleapis.com/token'
    };
  }

  return null;
}

/**
 * Encodes an object or string into URL-safe base64.
 */
function base64UrlEncode(input: string | Buffer): string {
  const buf = typeof input === 'string' ? Buffer.from(input, 'utf-8') : input;
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Generates an RS256 signed JWT and exchanges it for an OAuth2 Bearer Access Token
 * scoped to `https://www.googleapis.com/auth/indexing`.
 */
export async function getGoogleIndexingAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);

  // Return cached token if valid for at least 5 more minutes
  if (cachedAccessToken && tokenExpiresAt > now + 300) {
    return cachedAccessToken;
  }

  const creds = getServiceAccountCredentials();
  if (!creds) {
    throw new Error(
      '[GoogleIndexing] No Google Service Account credentials found. Set GOOGLE_SERVICE_ACCOUNT_KEY or GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY in your environment.'
    );
  }

  // 1. Construct JWT Header & Claims
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const payload = {
    iss: creds.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: creds.token_uri || 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signatureInput = `${encodedHeader}.${encodedPayload}`;

  // 2. Sign JWT with RSA-SHA256
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  sign.end();
  const signature = sign.sign(creds.private_key);
  const encodedSignature = base64UrlEncode(signature);

  const signedJwt = `${signatureInput}.${encodedSignature}`;

  // 3. Exchange JWT for Access Token via OAuth2 Token Endpoint
  const tokenEndpoint = creds.token_uri || 'https://oauth2.googleapis.com/token';
  const bodyParams = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: signedJwt
  });

  const tokenRes = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams.toString()
  });

  if (!tokenRes.ok) {
    const errorText = await tokenRes.text();
    throw new Error(`[GoogleIndexing] OAuth2 token exchange failed (${tokenRes.status}): ${errorText}`);
  }

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error('[GoogleIndexing] Token response did not include access_token');
  }

  cachedAccessToken = tokenData.access_token as string;
  tokenExpiresAt = now + (Number(tokenData.expires_in) || 3600);

  return cachedAccessToken;
}

/**
 * Publishes an authorized indexing notification to Google Webmasters Indexing API.
 * Pulls Google Mobilebot to crawl the specified URL within minutes.
 */
export async function requestUrlCrawl(
  url: string,
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingNotificationResponse> {
  const token = await getGoogleIndexingAccessToken();

  const endpoint = 'https://indexing.googleapis.com/v1/urlNotifications:publish';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      url,
      type
    })
  });

  const responseJson: IndexingNotificationResponse = await res.json();

  if (!res.ok) {
    console.error(`[GoogleIndexing] Error publishing crawl request for ${url}:`, responseJson);
  } else {
    console.log(`[GoogleIndexing] Successfully queued crawl request for ${url} (type: ${type})`);
  }

  return responseJson;
}

/**
 * Dispatches crawl requests for all 5 localized URLs (TR, EN, DE, RU, ES) whenever
 * a country rule node or metadata entry is updated in the database.
 */
export async function notifyCountryRuleUpdated(countryCode: string): Promise<BatchNotificationReport> {
  const upper = countryCode.toUpperCase();
  const urlsToNotify = CORE_SEO_LANGUAGES.map((lang) =>
    buildAbsoluteLocalizedUrl(lang, 'explore', upper)
  );

  return notifyBatchUrls(urlsToNotify, 'URL_UPDATED');
}

/**
 * Queries Google Indexing API metadata to inspect Google's crawl notification history for a URL.
 */
export async function getUrlNotificationMetadata(url: string): Promise<IndexingNotificationResponse> {
  const token = await getGoogleIndexingAccessToken();
  const endpoint = `https://indexing.googleapis.com/v1/urlNotifications/metadata?url=${encodeURIComponent(url)}`;

  const res = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return (await res.json()) as IndexingNotificationResponse;
}

/**
 * Sends notifications for a list of URLs with rate limiting (100ms interval) to respect Google quotas.
 */
export async function notifyBatchUrls(
  urls: string[],
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<BatchNotificationReport> {
  const results: BatchNotificationReport['results'] = [];
  let successCount = 0;
  let failureCount = 0;

  for (const url of urls) {
    try {
      const res = await requestUrlCrawl(url, type);
      if (res.error) {
        failureCount++;
        results.push({
          url,
          status: 'failed',
          error: res.error.message
        });
      } else {
        successCount++;
        results.push({
          url,
          status: 'success',
          notifyTime: res.urlNotificationMetadata?.latestUpdate?.notifyTime
        });
      }
    } catch (err: any) {
      failureCount++;
      results.push({
        url,
        status: 'failed',
        error: err?.message || String(err)
      });
    }

    // Rate-limit throttle between requests
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return {
    successCount,
    failureCount,
    results
  };
}
