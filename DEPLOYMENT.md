# 🚀 Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/wld-wacky-racers)

## Prerequisites

- Node.js 18+ installed locally
- Vercel account (free tier works)
- Git repository hosted on GitHub/GitLab/Bitbucket

## Local Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd wld-wacky-racers
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your local settings
   ```

3. **Test Locally**
   ```bash
   npm run dev
   # Visit http://localhost:3000
   ```

4. **Build Test**
   ```bash
   npm run build
   npm start
   ```

## Vercel Deployment

### Method 1: Dashboard Deploy (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Select your Git repository

2. **Configure Project**
   - Framework: **Next.js** (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

3. **Environment Variables**
   ```
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build completion
   - Your app is live! 🎉

### Method 2: CLI Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

## Project Configuration

### ✅ Optimizations Included

- **Standalone Output** - Optimized for serverless deployment
- **Image Optimization** - WebP/AVIF formats with size optimization
- **Security Headers** - HSTS, CSP, and security best practices
- **Bundle Optimization** - Tree-shaking and package optimization
- **Static Optimization** - Automatic static page generation
- **Health Check** - `/api/health` endpoint for monitoring

### 📦 Build Output

```
.next/
├── static/           # Static assets
├── server/           # Server-side code
└── standalone/       # Optimized runtime (Vercel uses this)
```

## Performance Features

### 🚀 Core Web Vitals Optimized

- **LCP < 2.5s** - Image optimization + preloading
- **FID < 100ms** - Code splitting + lazy loading
- **CLS < 0.1** - Fixed layouts + proper sizing

### 🎯 Bundle Optimization

- **Dynamic Imports** - Components loaded on demand
- **Tree Shaking** - Unused code eliminated
- **Package Optimization** - Icons and UI components optimized

## Monitoring & Health

### Health Check Endpoint

```bash
curl https://your-domain.vercel.app/api/health
```

Response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "uptime": 1234.56,
  "version": "1.0.0",
  "environment": "production",
  "memory": {
    "used": 45.2,
    "total": 128.0
  },
  "services": {
    "miniappSDK": "operational",
    "database": "mock",
    "blockchain": "mock"
  }
}
```

### Analytics Integration

Add to environment variables:
```
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
SENTRY_DSN=your_sentry_dsn
```

## Custom Domain

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as shown

2. **Update Environment**
   ```
   NEXT_PUBLIC_APP_URL=https://your-custom-domain.com
   ```

## Scaling & Performance

### Automatic Scaling
- **Serverless Functions** - Auto-scale to zero
- **Edge Network** - Global CDN distribution
- **Smart Caching** - Static assets cached globally

### Performance Monitoring
- **Core Web Vitals** - Built-in monitoring
- **Analytics** - Traffic and performance insights
- **Function Logs** - Real-time debugging

## Troubleshooting

### Build Issues

1. **Dependencies**
   ```bash
   npm ci  # Clean install
   npm run build  # Test build locally
   ```

2. **TypeScript Errors**
   ```bash
   npm run type-check
   ```

3. **Linting Issues**
   ```bash
   npm run lint
   ```

### Runtime Issues

1. **Check Health Endpoint**
   ```bash
   curl https://your-domain.vercel.app/api/health
   ```

2. **View Function Logs**
   - Vercel Dashboard → Functions → View Logs

3. **Performance Issues**
   - Vercel Analytics → Core Web Vitals

## Security

### Implemented Security Headers

- **HSTS** - Force HTTPS connections
- **CSP** - Content Security Policy for XSS protection
- **X-Frame-Options** - Clickjacking protection
- **X-Content-Type-Options** - MIME type sniffing protection

### Best Practices

- Environment variables for sensitive data
- No secrets in client-side code
- CORS properly configured for API routes
- Input validation and sanitization

## Production Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Custom domain configured (optional)
- [ ] Health check endpoint working
- [ ] Analytics/monitoring setup (optional)
- [ ] Performance metrics green
- [ ] Security headers verified
- [ ] Mobile responsiveness tested
- [ ] Cross-browser compatibility verified

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Project Issues**: [Create an issue](https://github.com/yourusername/wld-wacky-racers/issues)

---

**🎮 Your WLD Wacky Racers GameFi app is now production-ready!**