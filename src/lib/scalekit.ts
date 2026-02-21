import { Scalekit } from '@scalekit-sdk/node';

// Hardcoding the URL so Vercel cannot possibly read it as 'undefined'
const envUrl = 'https://supportemailassistant.scalekit.dev';
const clientId = process.env.SCALEKIT_CLIENT_ID || 'skc_111578986135487508';
const clientSecret = process.env.SCALEKIT_CLIENT_SECRET || 'dummy_client_secret';

export const scalekit = new Scalekit(envUrl, clientId, clientSecret);