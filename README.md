# VoteWise AI 🗳️
> **AI-powered platform to educate, guide, and empower voters.**

VoteWise AI is an interactive, intelligent companion built to simplify the democratic process. From checking eligibility and locating polling booths to interacting with a virtual voting simulator, we leverage modern AI and cloud technologies to ensure every citizen is prepared and confident to cast their vote.

## 🚀 Live Demo

[**🔗 View Live Application Here**](#) *(https://eduelection-969608625657.us-central1.run.app/)*

## ✨ Features

- **Eligibility Checker**: Instantly verify if you are eligible to vote based on age, citizenship, and residency criteria.
- **Constituency Finder**: Locate your precise election district, current representative, and polling booth securely via **Google Maps API**.
- **AI Assistant**: Get real-time, voice-enabled answers to election queries powered by **Gemini AI**.
- **Election Timeline**: Learn the step-by-step journey of the electoral process from registration to counting day.
- **Fact Checker**: Actively combat misinformation by instantly verifying trending election claims.
- **Voting Simulator**: Experience a secure, mock Electronic Voting Machine (EVM) interface with simulated VVPAT validation.

## 🧠 How It Works

1. **Check Eligibility**: Start by verifying your right to vote through a simple, guided questionnaire.
2. **Find Constituency**: Input your location to instantly receive your customized polling information.
3. **Ask AI for Guidance**: Use our Gemini-powered chatbot or voice commands to clarify any doubts about documents, processes, or candidates.

## 🛠 Tech Stack

- **Frontend**: React + Vite
- **Cloud Infrastructure**: Google Cloud Run
- **Artificial Intelligence**: Gemini AI
- **Location Services**: Google Maps API
- **Testing**: Vitest + React Testing Library

## 🏗 Architecture

**VoteWise AI** is designed for high performance, accessibility, and scalability:
- **Client Layer**: A fast, responsive React Single Page Application (SPA) bundled via Vite. Pages are lazily loaded for optimal performance.
- **Intelligence Layer**: The client securely connects to Google's Gemini AI through stateless API calls to process natural language queries and generate dynamic voter guidance.
- **Cloud Layer**: The application is containerized via Docker and deployed on Google Cloud Run. This serverless approach guarantees high availability, rapid auto-scaling, and secure HTTPS termination.

## 🌍 Impact

- **Improves Voter Awareness**: Breaks down complex electoral procedures into bite-sized, interactive components.
- **Simplifies Election Understanding**: Offers a hands-on EVM simulation, dispelling myths and reducing polling day anxiety.
- **Uses AI for Guidance**: Democratizes access to accurate information through conversational, voice-enabled AI.

## 📸 Screenshots

![Home Page Placeholder](https://via.placeholder.com/800x400?text=Home+Page+Dashboard)
![AI Assistant Placeholder](https://via.placeholder.com/800x400?text=Gemini+AI+Assistant)
![Voting Simulator Placeholder](https://via.placeholder.com/800x400?text=EVM+Voting+Simulator)

## ⚙️ Setup

Clone the repository and run locally:

```bash
npm install
npm run dev
```

To run the test suite:
```bash
npm run test
```

## 🚀 Deployment

Deploy seamlessly to Google Cloud Run:

```bash
gcloud run deploy eduelection --source . --port 8080
```

## 🔮 Future Scope

- **Multilingual Support**: Expanding AI and UI to support native regional languages seamlessly.
- **Mobile App**: Developing a dedicated React Native companion for broader accessibility.
- **Real-time Election Data**: Integrating live APIs to track ongoing polling metrics and candidate backgrounds.

## 👤 Author

**Pavan**
*(Hack2Skill Visual Prompt Wars)*