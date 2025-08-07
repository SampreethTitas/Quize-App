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
```
ProgressivePocketTool
├─ .env
├─ .replit
├─ attached_assets
│  ├─ image_1752521109821.png
│  └─ Pasted--DOCTYPE-html-html-lang-en-head-meta-charset-UTF-8-meta-name-viewport-con-1752519481650_1752519481651.txt
├─ client
│  ├─ index.html
│  ├─ public
│  │  ├─ manifest.json
│  │  └─ sw.js
│  └─ src
│     ├─ App.tsx
│     ├─ components
│     │  ├─ quiz
│     │  │  ├─ add-question-form.tsx
│     │  │  ├─ add-subject-form.tsx
│     │  │  ├─ app-header.tsx
│     │  │  ├─ install-prompt.tsx
│     │  │  ├─ offline-indicator.tsx
│     │  │  ├─ option-button.tsx
│     │  │  ├─ progress-bar.tsx
│     │  │  ├─ question-display.tsx
│     │  │  └─ subject-card.tsx
│     │  └─ ui
│     │     ├─ accordion.tsx
│     │     ├─ alert-dialog.tsx
│     │     ├─ alert.tsx
│     │     ├─ aspect-ratio.tsx
│     │     ├─ avatar.tsx
│     │     ├─ badge.tsx
│     │     ├─ breadcrumb.tsx
│     │     ├─ button.tsx
│     │     ├─ calendar.tsx
│     │     ├─ card.tsx
│     │     ├─ carousel.tsx
│     │     ├─ chart.tsx
│     │     ├─ checkbox.tsx
│     │     ├─ collapsible.tsx
│     │     ├─ command.tsx
│     │     ├─ context-menu.tsx
│     │     ├─ dialog.tsx
│     │     ├─ drawer.tsx
│     │     ├─ dropdown-menu.tsx
│     │     ├─ form.tsx
│     │     ├─ hover-card.tsx
│     │     ├─ input-otp.tsx
│     │     ├─ input.tsx
│     │     ├─ label.tsx
│     │     ├─ menubar.tsx
│     │     ├─ navigation-menu.tsx
│     │     ├─ pagination.tsx
│     │     ├─ popover.tsx
│     │     ├─ progress.tsx
│     │     ├─ radio-group.tsx
│     │     ├─ resizable.tsx
│     │     ├─ scroll-area.tsx
│     │     ├─ select.tsx
│     │     ├─ separator.tsx
│     │     ├─ sheet.tsx
│     │     ├─ sidebar.tsx
│     │     ├─ skeleton.tsx
│     │     ├─ slider.tsx
│     │     ├─ switch.tsx
│     │     ├─ table.tsx
│     │     ├─ tabs.tsx
│     │     ├─ textarea.tsx
│     │     ├─ toast.tsx
│     │     ├─ toaster.tsx
│     │     ├─ toggle-group.tsx
│     │     ├─ toggle.tsx
│     │     └─ tooltip.tsx
│     ├─ hooks
│     │  ├─ use-mobile.tsx
│     │  ├─ use-offline-storage.ts
│     │  ├─ use-pwa.ts
│     │  ├─ use-quiz-state.ts
│     │  └─ use-toast.ts
│     ├─ index.css
│     ├─ lib
│     │  ├─ offline-storage.ts
│     │  ├─ queryClient.ts
│     │  ├─ quiz-data.ts
│     │  └─ utils.ts
│     ├─ main.tsx
│     ├─ pages
│     │  ├─ admin.tsx
│     │  ├─ home.tsx
│     │  ├─ not-found.tsx
│     │  ├─ quiz.tsx
│     │  └─ results.tsx
│     └─ types
│        └─ quiz.ts
├─ components.json
├─ drizzle.config.ts
├─ LOCAL_SETUP.md
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ README.md
├─ replit.md
├─ server
│  ├─ .env
│  ├─ db.ts
│  ├─ index.ts
│  ├─ routes.ts
│  ├─ seeds.ts
│  ├─ storage.ts
│  └─ vite.ts
├─ shared
│  └─ schema.ts
├─ tailwind.config.ts
├─ test.ts
├─ tsconfig.json
└─ vite.config.ts

```