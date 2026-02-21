import { Scalekit } from '@scalekit-sdk/node';

// You MUST have these fallbacks here, otherwise the import crashes the build!
const envUrl = process.env.SCALEKIT_ENVIRONMENT_URL! || 'https://fallback.scalekit.dev';
const clientId = process.env.SCALEKIT_CLIENT_ID! || 'dummy_client_id';
const clientSecret = process.env.SCALEKIT_CLIENT_SECRET!|| 'dummy_client_secret';

export const scalekit = new Scalekit(envUrl, clientId, clientSecret);