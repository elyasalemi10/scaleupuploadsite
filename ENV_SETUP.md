# Environment Variables Setup

## Local Development
The app automatically detects local development and uses `http://localhost:3001`.

For the local Express server, set these in your shell environment before
running `npm run server`:

```
RESEND_API_KEY=your_resend_api_key
SEND_FROM=Admin <admin@scaleupwithai.ai>
```

## Production Deployment

### For Vercel:
Set these environment variables in your Vercel dashboard:

```
RESEND_API_KEY=your_resend_api_key
SEND_FROM=Admin <admin@scaleupwithai.ai>

# /admin page credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

`SEND_FROM` is the address used by the contact form. It must follow the
`Display Name <local@domain>` format and the domain must be verified in Resend.

Leave `VITE_API_BASE_URL` empty or unset — it will automatically use relative URLs.

### For Custom Domain:
If deploying to a custom domain, set:

```
VITE_API_BASE_URL=https://your-domain.com
RESEND_API_KEY=your_resend_api_key
SEND_FROM=Admin <admin@scaleupwithai.ai>
```

## How it works:
- **Local Dev**: Uses `http://localhost:3001` automatically
- **Production**: Uses relative URLs (empty base URL) automatically
- **Custom**: Override with `VITE_API_BASE_URL` environment variable
