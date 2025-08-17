# Environment Variables Setup

## Local Development
The app automatically detects local development and uses `http://localhost:3001`.

## Production Deployment

### For Vercel:
Set these environment variables in your Vercel dashboard:

```
RESEND_API_KEY=re_fUddbhZR_74Y9puqH3iGWepV4uSMw8ied
```

Leave `VITE_API_BASE_URL` empty or unset - it will automatically use relative URLs.

### For Custom Domain:
If deploying to a custom domain, set:

```
VITE_API_BASE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key
```

## How it works:
- **Local Dev**: Uses `http://localhost:3001` automatically
- **Production**: Uses relative URLs (empty base URL) automatically  
- **Custom**: Override with `VITE_API_BASE_URL` environment variable
