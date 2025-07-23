# 🏎️ WLD Wacky Racers

A **GameFi miniapp** built for the **Worldcoin ecosystem** where users stake WLD tokens to adopt digital racing creatures that automatically participate in races to earn rewards.

![Next.js](https://img.shields.io/badge/Next.js-15.4.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000?style=for-the-badge)

## ✨ Features

### 🎮 Core GameFi Mechanics
- **Racer Adoption** - Stake 10-1000 WLD to adopt unique racing creatures
- **Automatic Racing** - Races run every minute with 2+ participants
- **Performance Stats** - Speed, Agility, Endurance affect race outcomes
- **Boost System** - Enhance racers with additional 5-500 WLD stakes
- **Reward Distribution** - Winners earn 50%/30%/20% of total race pool

### 🏁 Racing System
- **Smart Algorithm** - Performance = (stats × 0.7) + random + stake bonus
- **Real-time Updates** - Live race countdown and status tracking
- **Fair Competition** - Balanced randomness with skill-based outcomes
- **Retirement Option** - Recover 90% of investment anytime

### 💎 Modern UI/UX
- **shadcn/ui Components** - Professional, accessible component library
- **Glass Morphism Design** - Modern gradient and blur effects
- **Responsive Layout** - Optimized for all devices and screen sizes
- **Micro-interactions** - Smooth animations and state transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wld-wacky-racers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   just dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.4.2** - React framework with App Router
- **TypeScript** - Type-safe JavaScript development
- **React 19** - Latest React with concurrent features

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library built on Radix UI
- **Lucide React** - Beautiful icon library
- **CSS Variables** - Dynamic theming support

### State Management
- **React Context** - Global application state
- **React Hooks** - Local component state management
- **Custom Hooks** - Reusable stateful logic

### Development Tools
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting (configured)
- **TypeScript Config** - Strict type checking

## 📁 Project Structure

```
wld-wacky-racers/
├── app/                    # Next.js App Router pages
│   ├── adopt/             # Racer adoption page
│   ├── api/               # API routes
│   ├── history/           # Race history page
│   ├── racer/[id]/        # Individual racer page
│   └── transactions/      # Transaction history
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Dashboard.tsx     # Main dashboard
│   ├── RacerCard.tsx     # Racer display card
│   └── ...
├── contexts/             # React Context providers
│   └── MiniappSDKContext.tsx
├── lib/                  # Utility libraries
│   ├── MiniappSDK.ts     # Mock SDK implementation
│   └── utils.ts          # Helper functions
└── styles/              # CSS and styling
    └── globals.css       # Global styles and design system
```

## 🎯 Game Mechanics

### Racer Adoption
- **Stake Range**: 10-1000 WLD tokens
- **Random Generation**: Unique stats for Speed, Agility, Endurance
- **Visual Identity**: Auto-generated avatars with distinct personalities

### Racing Algorithm
```typescript
performance = Math.min(100, 
  (statsAverage * 0.7) +     // 70% skill-based
  random(0, 50) +            // 30% randomness  
  Math.min(stake/10, 20)     // Stake bonus (max 20)
);
```

### Reward System
- **1st Place**: 50% of total race pool
- **2nd Place**: 30% of total race pool  
- **3rd Place**: 20% of total race pool
- **Entry Fee**: 10% of racer stake per race

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types

# Convenience
just dev            # Quick development start
```

### Adding New Components

1. **shadcn/ui Components**
   ```bash
   npx shadcn@latest add [component-name]
   ```

2. **Custom Components**
   - Create in `/components` directory
   - Follow existing naming conventions
   - Include TypeScript interfaces
   - Add to component exports

### Environment Variables

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="WLD Wacky Racers"
NEXT_PUBLIC_APP_DESCRIPTION="GameFi racing experience on Worldcoin"
NODE_ENV=development
```

## 🚀 Deployment

### Vercel (Recommended)

1. **One-Click Deploy**
   
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/wld-wacky-racers)

2. **Manual Deploy**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

3. **Environment Setup**
   - Set `NEXT_PUBLIC_APP_URL` to your domain
   - Configure any additional environment variables

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🎨 Design System

### Color Palette
- **Primary**: Purple to blue gradients
- **Secondary**: Yellow to orange accents  
- **Success**: Green variants
- **Warning**: Orange variants
- **Error**: Red variants

### Components
- **Glass Cards**: Backdrop blur with transparency
- **Gradient Buttons**: Multi-color smooth transitions
- **Status Badges**: Color-coded racer states
- **Progress Bars**: Animated stat displays

## 🔒 Security

### Implemented Features
- **Content Security Policy** - XSS protection
- **HSTS Headers** - Force HTTPS connections
- **Input Validation** - Sanitized user inputs
- **Mock SDK Pattern** - Safe blockchain simulation

### Best Practices
- No secrets in client-side code
- Environment variable validation
- Type-safe API interactions
- Secure headers configuration

## 🔮 Future Enhancements

### Blockchain Integration
- [ ] Real Worldcoin Miniapp SDK integration
- [ ] Smart contract deployment for races
- [ ] NFT minting for racers
- [ ] Cross-chain compatibility

### Advanced Features  
- [ ] Tournament brackets
- [ ] Racer breeding system
- [ ] Achievement system
- [ ] Leaderboards and rankings

### Technical Improvements
- [ ] Real-time WebSocket race updates
- [ ] Database persistence layer
- [ ] Advanced analytics dashboard
- [ ] Mobile app version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Worldcoin** - Blockchain infrastructure inspiration
- **shadcn** - Exceptional UI component library
- **Vercel** - Seamless deployment platform
- **Next.js Team** - Outstanding React framework

---

**🎮 Built with ❤️ for the GameFi community**