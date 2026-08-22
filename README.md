# Atithya AI (आतिथ्य AI) 🚩
### Smart Heritage & Cultural Tourism Platform for Indian Cities
**Spectra 2026 Hackathon Project — Problem Statement #5 Solution**

---

[![Problem Statement](https://img.shields.io/badge/Spectra%202026-Problem%20Statement%20%235-E87516?style=for-the-badge&logo=target)](https://github.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Google Gemini API](https://img.shields.io/badge/AI%20Engine-Google%20Gemini%201.5%2F3.6-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Multilingual](https://img.shields.io/badge/Languages-English%20%7C%20%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%A0%E0%A5%80%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%82%E0%A4%A6%E0%A5%80-741C35?style=for-the-badge)](https://github.com/)

---

## 📌 Executive Summary

**Atithya AI (आतिथ्य AI)** is an end-to-end, AI-powered Smart Heritage Tourism Platform designed to reimagine cultural exploration across Indian cities. Built specifically for **Problem Statement 5 of Spectra 2026**, Atithya AI addresses key challenges in Indian tourism: fragmented information, language barriers, inefficient itinerary planning, safety concerns, and disconnected local commerce.

The initial implementation focuses on **Pune — The Cultural & Historical Capital of Maharashtra**, bringing to life Maratha Peshwa heritage, Sahyadri fortresses, legendary Maharashtrian gastronomy, certified local guides, and traditional artisan guilds.

---

## 🎯 Problem Statement #5 Alignment

> **Problem Statement Title:** *Smart Heritage & Cultural Tourism: Reimagining Indian Cities through Digital Innovation*
>
> **Core Challenge:** Indian cities are rich in heritage, architecture, traditions, cuisine, and crafts. However, tourists face fragmented information, language barriers, inefficient itinerary planning, safety concerns, and disconnected booking systems. Local artisans, guides, and cultural businesses lack digital platforms to reach visitors effectively.

### How Atithya AI Solves This:
- **For Domestic & International Tourists:** Unified AI trip planning, 24/7 multilingual chatbot, interactive GIS heritage maps, audio guides, local food discovery, and instant SOS safety hotlines.
- **For Local Stakeholders & Tourism Economy:** Direct booking request engine for certified local tour guides and a digital commerce hub for local artisans (Paithani weavers, Puneri Pagadi makers, Warli artists).
- **For Government Agencies:** Sustainability tracking, crowd safety advisories, and digital promotion of lesser-known heritage monuments.

---

## ✨ Key Features & Technical Accomplishments

### 1. 🤖 AI-Powered Smart Trip Planner (`/api/plan-trip`)
- **Customizable Inputs:** Travel duration (1–30 days), budget in INR (₹), companion group (Solo, Couple, Family, Friends), interests (Heritage, Forts, Food, Museums, Craft), and target language.
- **Structured Dynamic Output:** Generates day-by-day schedules with specific activity timings, duration, entry costs, travel modes, food suggestions, and safety tips.
- **Financial Breakdown:** Automated breakdown across Food, Transport, Entry Fees, Activities, and Shopping, calculating remaining budget and trip sustainability score.
- **Resilient AI Pipeline:** Powered by Google Gemini API with an automated fallback itinerary engine in Node.js to ensure zero downtime.

### 2. 💬 Multilingual AI Tourism Assistant (`/api/ask-ai`)
- **Real-Time Conversational AI:** Integrated floating chatbot fluent in **English**, **Marathi (मराठी)**, and **Hindi (हिंदी)**.
- **Domain-Specific Knowledge:** Answers instant queries about monument history, visiting hours, ticket prices (Indian vs. Foreigner rates), dress codes, and local travel directions.
- **Context-Aware Follow-ups:** Retains conversation history for seamless multi-turn Q&A.

### 3. 🏰 Interactive Heritage & Monument Explorer
- **Curated Monument Directory:** Detailed profiles for Shaniwar Wada, Aga Khan Palace, Sinhagad Fort, Pataleshwar Cave Temple, Raja Dinkar Kelkar Museum, Lal Mahal, and more.
- **Rich Media & Audio Guides:** 360° virtual view triggers, historical significance highlights, exact GPS coordinates, best visiting times, and crowd density indicators.
- **Interactive Map Integration:** Powered by Leaflet maps with custom marker pins and category filters.

### 4. 🗣️ Local Tour Guide Booking Ecosystem
- **Verified Guide Directory:** Lists licensed local tour guides with rating scores, review counts, spoken languages, specializations (Peshwa History, Fort Treks, Food Walks), and daily rates.
- **Direct WhatsApp / Request Modal (`GuideModal.jsx`):** Allows tourists to instantly book or request a guide via direct messaging integration.

### 5. 🍛 Gastronomy & Food Trail Discovery (`FoodDiscovery.jsx`)
- **Authentic Culinary Showcase:** Promotes iconic local delicacies such as Puneri Misal Pav, Mango Mastani, Pithla Bhakri, Chitale Bakarwadi, Thalipeeth, and Ukadiche Modak.
- **Dietary Preferences:** Filters by Pure Veg, Vegan, and Authentic Maharashtrian eateries with location tips and price ranges.

### 6. 🛍️ Local Artisans & Indigenous Commerce (`LocalCommerce.jsx`)
- **Artisan Empowerment:** Direct digital storefront for local craftspeople selling Puneri Pagadi, Paithani Sarees, Brassware antiques, and Warli Paintings.
- **Cultural Preservation:** Educates visitors on the history of artisan peths (Kasba Peth, Raviwar Peth) and connects buyers directly to makers.

### 7. 🛡️ Integrated Tourist Safety & Emergency Hub (`SafetySection.jsx`)
- **Instant SOS Hotlines:** One-tap dialing for National Emergency (112), Tourist Helpline (1363), Women Safety (1091), and Ambulance (102).
- **Localized Safety Infrastructure:** Information on nearby police stations, major hospitals, night travel advisories, and crowd safety tips.

### 8. 👤 User Authentication & Saved Itineraries (`AuthModal.jsx`)
- **Personalized Dashboard:** Firebase and LocalStorage authentication letting users sign in, bookmark favorite heritage destinations, and save custom AI-generated itineraries.

### 9. 🎨 Traditional Indian UI/UX Design System
- **Aesthetic Excellence:** Designed with a curated Indian color palette — Royal Maroon (`#741C35`), Deep Saffron (`#E87516`), Warm Sand (`#FAF1E4`), and Soft Cream (`#F8D8AD`).
- **Cultural Art Motifs:** SVG Mandala art (`MandalaArt.jsx`) and Warli tribal art (`WarliArt.jsx`) elements paired with smooth micro-animations and an authentic splash screen (`SplashScreen.jsx`).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | React.js (v19) + Vite |
| **Styling & Design** | Tailwind CSS (v4), Vanilla CSS Tokens, Lucide Icons |
| **Interactive Maps** | Leaflet.js / React-Leaflet |
| **Authentication** | Firebase Auth + LocalStorage User State |
| **Backend Runtime** | Node.js + Express.js |
| **Artificial Intelligence** | Google Gemini API (`gemini-1.5-flash`, `gemini-3.6-flash`, `gemini-3.7-flash`) |
| **API Protocol** | RESTful JSON APIs (CORS Enabled) |

---

## 📂 Project Architecture

```
Spectra2026/
├── backend/
│   ├── controllers/
│   │   └── controller.js          # Controller logic handlers
│   ├── routes/
│   │   └── routes.js              # Express endpoints (/plan-trip, /ask-ai, /destinations)
│   ├── .env                       # Environment configuration (GEMINI_API_KEY, PORT)
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Express server entry point
│
├── frontend/
│   ├── public/                    # Static assets & icons
│   ├── src/
│   │   ├── assets/                # Images & media
│   │   ├── components/            # UI Components
│   │   │   ├── AiChatAssistant.jsx # Floating Multilingual Chatbot
│   │   │   ├── AuthModal.jsx      # Login / Signup Modal
│   │   │   ├── DestinationCard.jsx# Heritage card component
│   │   │   ├── DestinationModal.jsx# Monument detailed modal & audio guide
│   │   │   ├── FoodDiscovery.jsx  # Maharashtrian food trail module
│   │   │   ├── GuideCard.jsx      # Tour guide card component
│   │   │   ├── GuideModal.jsx     # Tour guide WhatsApp booking modal
│   │   │   ├── Hero.jsx           # Hero banner & instant prompt bar
│   │   │   ├── ItineraryView.jsx  # AI Itinerary timeline & budget UI
│   │   │   ├── LocalCommerce.jsx  # Local artisans & craft store
│   │   │   ├── MandalaArt.jsx     # Cultural SVG Mandala component
│   │   │   ├── MapComponent.jsx   # Interactive Leaflet map
│   │   │   ├── Navbar.jsx         # Header & language switcher
│   │   │   ├── SafetySection.jsx  # SOS emergency & tourist safety hub
│   │   │   ├── SplashScreen.jsx   # Cultural Indian animated splash screen
│   │   │   └── WarliArt.jsx       # Cultural SVG Warli art component
│   │   ├── data/
│   │   │   ├── puneData.js        # Detailed Pune heritage & guide dataset
│   │   │   └── translations.js    # Multilingual translation dictionary (EN/MR/HI)
│   │   ├── pages/
│   │   │   ├── Explore.jsx        # Destination catalog & filters
│   │   │   ├── LocalGuidesPage.jsx# Guide search & filter page
│   │   │   └── Planner.jsx        # AI trip planner form & result page
│   │   ├── services/
│   │   │   ├── api.js             # API request wrappers for backend
│   │   │   ├── firebase.js        # Firebase configuration
│   │   │   └── guideService.js    # Guide booking service API
│   │   ├── App.jsx                # Main application state & router
│   │   ├── index.css              # Global styles & design system tokens
│   │   └── main.jsx               # React DOM root entry
│   ├── .env                       # Frontend environment file
│   ├── package.json               # Frontend dependencies
│   └── vite.config.js             # Vite configuration
└── README.md                      # Comprehensive Project Documentation
```

---

## ⚡ Quick Start & Installation Guide

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **Google Gemini API Key** (Get one at [Google AI Studio](https://aistudio.google.com/))

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create or verify .env file
# Add your Gemini API key:
# GEMINI_API_KEY=your_gemini_api_key_here
# PORT=5000

# Start backend server
npm start
```
*Backend server will run at `http://localhost:5000`.*

---

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
*Frontend app will be available at `http://localhost:5173`.*

---

## 🌐 API Reference

### 1. Health Check
- **`GET /api/test`**
  - **Response:** `{ "success": true, "message": "Atithya AI API server is operational 🚀" }`

### 2. Get Destinations Directory
- **`GET /api/destinations`**
  - **Response:** List of heritage sites in Pune with coordinates, ratings, and descriptions.

### 3. Generate AI Trip Itinerary
- **`POST /api/plan-trip`**
  - **Payload:**
    ```json
    {
      "city": "Pune",
      "days": 3,
      "budget": 6000,
      "companions": "Family",
      "interests": ["Heritage", "Food", "Forts"],
      "language": "English"
    }
    ```
  - **Response:** Returns structured JSON containing day-wise activity schedules, budget breakdown, transport suggestions, travel tips, and safety advisories.

### 4. Natural Language AI Assistant
- **`POST /api/ask-ai`**
  - **Payload:**
    ```json
    {
      "prompt": "What are the ticket prices and visiting hours for Shaniwar Wada?",
      "language": "English",
      "history": []
    }
    ```
  - **Response:** Returns conversational response tailored to user language and context.

---

## 🚀 Scalability & Future Roadmap

While current demonstration showcases **Pune**, the Atithya AI platform is architected to seamlessly expand to India's top heritage cities:

- 🕌 **Jaipur (Pink City):** Hawa Mahal, Amer Fort, Johari Bazaar artisans.
- 🕉️ **Varanasi (Kashi):** Kashi Vishwanath, Ganga Ghats, Banarasi Silk weavers.
- 🏛️ **Delhi:** Red Fort, Qutub Minar, Chandni Chowk food walk.
- 🏰 **Mysuru:** Mysuru Palace, Chamundi Hill, Mysore Silk & Sandalwood crafts.

### Technical Next Steps:
1. **AR/VR 3D Monument Reconstruction:** Immersive 360° AR overlays for destroyed historical fort structures.
2. **Offline Progressive Web App (PWA):** Offline map tile caching for remote Sahyadri fort trekking routes.
3. **Government Tourism Analytics Dashboard:** Anonymized crowd density heatmaps for municipal authorities.

---

## 👥 Team & Acknowledgments

Developed with ❤️ for **Spectra 2026 Hackathon**.
Special thanks to local historians, cultural enthusiasts, and open-source contributors supporting Indian Heritage preservation.
