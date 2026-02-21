import { Scalekit } from '@scalekit-sdk/node';

// 1. Provide safe fallbacks to prevent Next.js from crashing during build-time module evaluation
const envUrl = process.env.SCALEKIT_ENVIRONMENT_URL || 'https://fallback.scalekit.dev';
const clientId = process.env.SCALEKIT_CLIENT_ID || 'dummy_client_id';
const clientSecret = process.env.SCALEKIT_CLIENT_SECRET || 'dummy_client_secret';

// 2. Initialize the client safely
export const scalekit = new Scalekit(envUrl, clientId, clientSecret);