# VoteWise AI 🗳️

An interactive and intelligent assistant designed to help users understand the election process, verify eligibility, and experience a simulated voting journey.

**Hack2Skill Visual Prompt Wars Challenge**

## 🌟 Problem Statement
Create an assistant that helps users understand the election process, timelines, voter registration steps, and voting procedure in an interactive and easy-to-follow way.

## ✨ Features

1. **AI Election Assistant**: Powered by Google Gemini API, get instant answers to election-related queries. Includes **Voice Input/Output** using Web Speech API for enhanced accessibility.
2. **Interactive Election Timeline**: A visual step-by-step journey from registration to result declarations.
3. **Voting Simulator**: Experience the EVM and VVPAT process securely and intuitively.
4. **Eligibility Checker**: Find out if you meet the criteria to vote.
5. **Know Your Election Journey**: A personalized guide based on your voter profile.
6. **Fact Checker Module (Bonus)**: Analyze viral claims and WhatsApp forwards for misinformation instantly using Gemini's logic.
7. **Constituency & Booth Finder (Bonus)**: Search your area using a Pincode to view mock representative details and a Google Maps embed.
8. **Accessibility**: Dark mode, font-size adjustments, visible focus rings, and semantic UI.
9. **Multilingual Support**: Real-time translation via Google Translate (English, Hindi, Telugu).

## 🏆 Optimizations for Judging
- **Security**: Hardened `nginx.conf` with Content-Security-Policy, X-Frame-Options, and X-XSS-Protection headers. 
- **Efficiency**: Implemented `React.lazy()` and `Suspense` for aggressive code splitting, significantly reducing the initial bundle size and speeding up rendering.
- **Code Quality**: Abstracted Mock/Live APIs to robust independent services (`geminiService.js`) and isolated hardcoded logic to `data/` directories.
- **Minimal Dependencies**: Strictly scoped packages to only absolute necessities, removing un-used SDKs.
- **Unit Testing**: Included component coverage tests running with `vitest` and `jsdom`.

## 🏗️ Architecture

- **Frontend**: React.js with Vite for fast builds and HMR.
- **Styling**: Vanilla CSS with modern custom properties (CSS variables) for a robust and dynamic theming system.
- **Icons**: Lucide React.
- **AI Integration**: Google Generative AI (`@google/generative-ai`) for the Gemini Pro model.
- **Deployment**: Docker containerization & Firebase Hosting ready.

## 🚀 Setup Steps

1. **Clone the repository** (or download files):
   ```bash
   git clone <repo-url>
   cd eduelection
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run Locally**:
   ```bash
   npm run dev
   ```

## 🌐 Deployment Steps

### Option A: Google Cloud Run (Docker)
1. Build the Docker image:
   ```bash
   docker build -t votewise-ai .
   ```
2. Tag the image for GCR:
   ```bash
   docker tag votewise-ai gcr.io/[PROJECT-ID]/votewise-ai
   ```
3. Push to GCR:
   ```bash
   docker push gcr.io/[PROJECT-ID]/votewise-ai
   ```
4. Deploy to Cloud Run via Google Cloud Console or CLI.

### Option B: Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize project: `firebase init hosting`
   - Select your project
   - Public directory: `dist`
   - Configure as single-page app: `Yes`
4. Build the app: `npm run build`
5. Deploy: `firebase deploy --only hosting`

## 🔗 Demo
[Demo Link Placeholder - Insert Vercel/Firebase/GCP URL here]
