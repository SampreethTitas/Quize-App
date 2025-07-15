# Local Setup Guide - PrepQuiz Pro

## Prerequisites

Before setting up the project locally, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **VS Code** with these recommended extensions:
  - TypeScript and JavaScript Language Features
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Auto Rename Tag

## Setup Steps

### 1. Download the Project Files

Copy all the project files to your local machine. The project structure should look like:

```
quiz-app/
├── client/
│   ├── public/
│   ├── src/
│   └── index.html
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vite.config.ts
└── components.json
```

### 2. Install Dependencies

Open terminal in VS Code and run:

```bash
npm install
```

This will install all required packages including:
- React 18 with TypeScript
- Vite for fast development
- Express.js server
- Tailwind CSS for styling
- All UI components and utilities

### 3. Start Development Server

Run the development command:

```bash
npm run dev
```

This will:
- Start the Express server on port 5000
- Launch Vite dev server with hot reload
- Enable TypeScript compilation
- Serve both frontend and backend

### 4. Open in Browser

Navigate to: `http://localhost:5000`

You should see the quiz application with:
- 6 quiz subjects available
- 10 questions per subject
- PWA features (offline support, installable)
- Admin panel for adding content

## Development Features

### Hot Reload
- Frontend changes reload instantly
- Backend changes restart the server automatically
- TypeScript compilation happens in real-time

### Available Scripts

```bash
# Development server
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm start
```

### VS Code Configuration

Create `.vscode/settings.json` for optimal development:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  }
}
```

## Project Features

### Static Data Storage
- No database required
- Fast in-memory storage
- 60 pre-loaded questions across 6 subjects
- Easy to extend with new content

### PWA Capabilities
- Service worker for offline functionality
- Web app manifest for installation
- Responsive design for all devices
- Caching for better performance

### Admin Features
- Add new quiz subjects
- Create questions with multiple choice options
- Customize colors and emojis
- Real-time updates

## Troubleshooting

### Port Issues
If port 5000 is busy:
1. Kill existing processes: `killall node`
2. Or change port in `server/index.ts`

### Module Resolution
If imports fail:
1. Check `tsconfig.json` paths
2. Restart VS Code TypeScript server
3. Run `npm run check` to verify types

### Build Issues
If build fails:
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Check Node.js version: `node --version`

## Next Steps

1. **Customize Content**: Add your own quiz subjects and questions
2. **Style Changes**: Modify Tailwind classes or add custom CSS
3. **New Features**: Extend the admin panel or add user authentication
4. **Deploy**: Build for production and deploy to your preferred platform

The app is now ready for local development in VS Code!