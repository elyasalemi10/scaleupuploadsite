import { createClient } from '@base44/sdk';
// import { getAccessToken } from '@base44/sdk/utils/auth-utils';

// Create a client with conditional authentication
export const base44 = createClient({
  appId: "688441ccb1d276a254883907", 
  requiresAuth: import.meta.env.PROD // Only require auth in production
});
