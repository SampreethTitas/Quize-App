# PrepQuiz Pro - PWA Setup Guide

A professional offline-first Progressive Web App for technical interview preparation.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your laptop
- Git installed
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   # If you have git
   git clone <your-repo-url>
   cd prepquiz-pro

   # Or download and extract the project folder
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Open `http://localhost:5000` in your browser
   - The app will start automatically

## 📱 PWA Features

### Installing the App
- **Desktop**: Click the install button in your browser's address bar
- **Mobile**: Use "Add to Home Screen" from your browser menu
- **Chrome**: Look for the install prompt at the bottom of the screen

### Offline Functionality
- Works without internet connection
- Quiz data is cached automatically
- Results are stored locally when offline
- Sync happens when you go back online

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking

### Project Structure
```
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and data
│   │   ├── pages/         # Page components
│   │   └── types/         # TypeScript types
│   └── public/
│       ├── manifest.json  # PWA manifest
│       └── sw.js         # Service worker
├── server/                # Backend Express server
├── shared/                # Shared types and schemas
└── README.md
```

## 🎯 How to Use

1. **Home Page**: Browse quiz subjects
2. **Take Quiz**: Click any subject to start
3. **Answer Questions**: Select answers and navigate with Previous/Next
4. **Submit**: Complete all questions and submit
5. **View Results**: See score breakdown and statistics

## 🔧 Troubleshooting

### Common Issues
- **Port 5000 in use**: Change port in `server/index.ts`
- **Install fails**: Run `npm install` again
- **App won't start**: Check Node.js version (need 18+)

### PWA Issues
- **Won't install**: Check browser supports PWA
- **Offline not working**: Clear browser cache and reload
- **Service worker errors**: Check browser developer tools

## 📦 Production Deployment

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Deploy to hosting service** (Vercel, Netlify, etc.)

## 🎨 Features

- ✅ Progressive Web App (PWA)
- ✅ Offline functionality
- ✅ Installable on desktop and mobile
- ✅ Responsive design
- ✅ Real-time progress tracking
- ✅ Multiple quiz subjects
- ✅ Score tracking and statistics
- ✅ Modern glassmorphism UI
- ✅ TypeScript support
- ✅ Service worker caching

## 📱 Mobile Experience

The app is optimized for mobile devices:
- Touch-friendly interface
- Responsive layout
- Works offline
- Installable as native app
- Fast loading with caching

## 🔒 Data Storage

- **Online**: Data fetched from server
- **Offline**: Cached in IndexedDB
- **Local**: Quiz progress stored locally
- **Sync**: Automatic when connection restored

## 🌐 Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13+
- Mobile browsers with PWA support

---

Ready to start coding interviews preparation! 🎯