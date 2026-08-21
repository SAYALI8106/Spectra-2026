const express = require("express");
const router = express.Router();

// Curated cultural reference for visitors. Dates vary each year because many
// festivals follow lunar or regional calendars; `usualPeriod` is deliberately
// a travel-planning guide rather than a fixed date.
const INDIAN_FESTIVALS = [
  {
    id: "diwali", name: "Diwali", alternateName: "Deepavali", usualPeriod: "October–November", regions: ["Across India", "Especially North and West India"], image: "/images/festivals/diwali.png",
    overview: "The five-day Festival of Lights brings families together to illuminate homes with diyas, create rangoli, exchange sweets, and share festive meals.",
    history: "Diwali has several regional origin traditions. In much of North India it marks Rama's return to Ayodhya after exile, as narrated in the Ramayana. It is also associated with Lakshmi Puja, while in parts of South India Deepavali recalls Krishna's victory over Narakasura. Jain communities observe it in connection with Mahavira's nirvana, and Sikh history marks Bandi Chhor Divas at the same time.",
    visitorEtiquette: "Ask before photographing worship or private homes; remove shoes where requested and keep clear of rangoli and oil lamps."
  },
  {
    id: "raksha-bandhan", name: "Raksha Bandhan", alternateName: "Rakhi", usualPeriod: "July–August", regions: ["Across India"], image: "/images/festivals/raksha-bandhan.png",
    overview: "A family festival centred on the bond of care and mutual responsibility between siblings and other loved ones. A rakhi thread is tied on the wrist, followed by gifts and sweets.",
    history: "The festival falls on the full moon of the Hindu month of Shravana. Its meaning of protection is expressed in multiple stories and regional customs, including accounts involving Krishna and Draupadi. Modern celebrations are inclusive: rakhis may be exchanged among sisters, cousins, friends, and people who regard one another as family.",
    visitorEtiquette: "It is primarily a family occasion; accept invitations warmly and avoid treating the ceremony as a staged photo opportunity."
  },
  {
    id: "ganesh-chaturthi", name: "Ganesh Chaturthi", alternateName: "Vinayaka Chaturthi", usualPeriod: "August–September", regions: ["Maharashtra", "Goa", "Karnataka", "Telangana", "Tamil Nadu"], image: "/images/festivals/ganesh-chaturthi.png",
    overview: "This ten-day celebration honours Ganesha, widely revered as the remover of obstacles. Homes and public pandals install idols, offer prayers and modaks, and conclude with visarjan immersion processions.",
    history: "Domestic observances have deep roots in western and southern India. In Maharashtra, public Ganesh festivals were notably promoted in the late nineteenth century by Bal Gangadhar Tilak as a shared civic gathering under colonial rule. Today celebrations range from intimate home pujas to large public installations.",
    visitorEtiquette: "Follow crowd guidance during processions, do not block worshippers, and favour organised or eco-conscious immersion events where possible."
  },
  {
    id: "holi", name: "Holi", alternateName: "Festival of Colours", usualPeriod: "February–March", regions: ["Across North and Central India", "Celebrated nationwide"], image: "/images/festivals/holi.png",
    overview: "Holi welcomes spring with music, sweets, and joyful play with coloured powder and water. Holika Dahan, a bonfire held the preceding evening, is an important part of the observance.",
    history: "A central tradition recalls Prahlada's devotion and the defeat of Holika, expressing the victory of good over harm. In Braj, Holi is also connected to Krishna and Radha, with distinctive local forms such as Lathmar Holi. The festival has ancient literary and artistic references and many regional practices.",
    visitorEtiquette: "Use skin-safe colours, get consent before applying colour or water, protect cameras and valuables, and respect people who choose not to participate."
  },
  {
    id: "eid-al-fitr", name: "Eid al-Fitr", alternateName: "Meethi Eid", usualPeriod: "Varies with the Islamic lunar calendar", regions: ["Across India"], image: "/images/festivals/eid-al-fitr.png",
    overview: "Eid al-Fitr marks the close of Ramadan. Communities gather for Eid prayers, give charitable alms, visit relatives, and share celebratory dishes such as seviyan.",
    history: "The festival originates in the early Islamic community and is observed worldwide after the month of fasting. In India it has developed rich regional food, clothing, and neighbourhood traditions while retaining its core themes of gratitude, prayer, and generosity.",
    visitorEtiquette: "Dress modestly for mosque visits, follow local entry guidance, and wait for an invitation before joining a family meal."
  },
  {
    id: "durga-puja", name: "Durga Puja", alternateName: "Sharodotsav", usualPeriod: "September–October", regions: ["West Bengal", "Assam", "Odisha", "Tripura"], image: "/images/festivals/durga-puja.png",
    overview: "Elaborate pandals, artistry, music, food, and community gatherings honour Goddess Durga during the autumn festival, culminating in immersion ceremonies.",
    history: "Durga Puja is connected to the Devi Mahatmya narrative of Durga's victory over Mahishasura. Historical patronage by Bengali households developed into the large public celebrations familiar today; Kolkata's Durga Puja was inscribed on UNESCO's Representative List of Intangible Cultural Heritage in 2021.",
    visitorEtiquette: "Expect queues at popular pandals, keep moving through crowded viewing areas, and respect restricted worship zones."
  },
  {
    id: "pongal", name: "Pongal", alternateName: "Thai Pongal", usualPeriod: "January", regions: ["Tamil Nadu", "Tamil communities worldwide"], image: "/images/festivals/holi.png",
    overview: "A four-day harvest festival celebrating the sun, cattle, land, and the new harvest. Families cook the overflowing pongal dish in a symbolic expression of abundance.",
    history: "Pongal is rooted in Tamil agricultural life and coincides with the sun's northward movement, observed around the month of Thai. Its ceremonies honour Surya and, on Mattu Pongal, cattle that support farming communities.",
    visitorEtiquette: "Observe home rituals from a respectful distance and do not touch decorated cattle without the owner's permission."
  },
  {
    id: "onam", name: "Onam", alternateName: "Kerala Harvest Festival", usualPeriod: "August–September", regions: ["Kerala"], image: "/images/festivals/onam.png",
    overview: "Kerala celebrates Onam with pookalam flower designs, boat races, cultural performances, and the elaborate vegetarian Onam sadhya feast.",
    history: "The festival is associated with the return of the beloved King Mahabali, whose story appears in the Vamana tradition. It also reflects Kerala's harvest season and is celebrated across communities in the state as a major cultural festival.",
    visitorEtiquette: "For a sadhya, follow hosts' guidance on seating and eating by hand; do not step on pookalam designs."
  }
];

const PUNE_SITES = [
  {
    id: "shaniwar-wada",
    name: "Shaniwar Wada",
    marathiName: "शनिवार वाडा",
    hindiName: "शनिवार वाड़ा",
    category: "Heritage",
    rating: 4.8,
    reviewCount: 14200,
    approxCost: "₹25 (Indian) / ₹300 (Foreigner)",
    costNum: 25,
    visitingHours: "8:00 AM – 6:30 PM",
    bestTimeToVisit: "Morning (8 AM - 10 AM) or Sunset",
    lat: 18.5196,
    lng: 73.8553,
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "7-story seat of the Peshwa rulers of the Maratha Empire built in 1732. Symbolic heart of Pune's imperial history."
  },
  {
    id: "aga-khan-palace",
    name: "Aga Khan Palace",
    marathiName: "आगाखान पॅलेस",
    hindiName: "आगा खान पैलेस",
    category: "History",
    rating: 4.7,
    reviewCount: 9800,
    approxCost: "₹25 (Indian) / ₹300 (Foreigner)",
    costNum: 25,
    visitingHours: "9:00 AM – 5:30 PM",
    bestTimeToVisit: "Afternoon (3 PM - 5 PM)",
    lat: 18.5529,
    lng: 73.9015,
    image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Italian arches, sprawling lawns, and deeply tied to India's Freedom Movement & Mahatma Gandhi's legacy."
  },
  {
    id: "sinhagad-fort",
    name: "Sinhagad Fort",
    marathiName: "सिंहगड किल्ला",
    hindiName: "सिंहगढ़ किला",
    category: "Forts",
    rating: 4.9,
    reviewCount: 22000,
    approxCost: "₹50 (Vehicle Entry Fee)",
    costNum: 50,
    visitingHours: "5:00 AM – 6:00 PM",
    bestTimeToVisit: "Early Morning (6 AM - 9 AM) or Monsoon",
    lat: 18.3663,
    lng: 73.7559,
    image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Majestic hill fortress 4,300 ft above sea level, legendary site of Tanaji Malusare's heroic victory in 1670."
  },
  {
    id: "pataleshwar-cave",
    name: "Pataleshwar Cave Temple",
    marathiName: "पाताळेश्वर गुंफा मंदीर",
    hindiName: "पातालेश्वर गुफा मंदिर",
    category: "Heritage",
    rating: 4.6,
    reviewCount: 6100,
    approxCost: "Free",
    costNum: 0,
    visitingHours: "8:30 AM – 5:30 PM",
    bestTimeToVisit: "Morning or Midday (cool stone interiors)",
    lat: 18.5268,
    lng: 73.8504,
    image: "https://images.unsplash.com/photo-1600100397608-f010e423b971?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "8th-century Rashtrakuta period rock-cut cave temple carved out of a single monolithic basalt rock."
  },
  {
    id: "kelkar-museum",
    name: "Raja Dinkar Kelkar Museum",
    marathiName: "राजा दिनकर केळकर संग्रहालय",
    hindiName: "राजा दिनकर केलकर संग्रहालय",
    category: "Museums",
    rating: 4.7,
    reviewCount: 7500,
    approxCost: "₹100 (Adults) / ₹30 (Children)",
    costNum: 100,
    visitingHours: "10:00 AM – 5:30 PM",
    bestTimeToVisit: "11:00 AM – 2:00 PM",
    lat: 18.5109,
    lng: 73.8542,
    image: "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?q=80&w=1000&auto=format&fit=crop",
    shortDescription: "Mind-boggling collection of 20,000+ Indian everyday antiques, musical instruments, and the reconstructed Mastani Mahal."
  }
];

// Health test endpoint
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "HeritageAI Pune API server is operational 🚀",
  });
});

// GET /api/festivals — Indian festival guide for cultural tourists
router.get("/festivals", (req, res) => {
  const assetHost = `${req.protocol}://${req.get("host")}`;
  const festivals = INDIAN_FESTIVALS.map((festival) => ({
    ...festival,
    image: `${assetHost}${festival.image}`
  }));
  res.json({ success: true, count: festivals.length, festivals });
});

// GET /api/festivals/:id — individual festival detail
router.get("/festivals/:id", (req, res) => {
  const festival = INDIAN_FESTIVALS.find(({ id }) => id === req.params.id.toLowerCase());
  if (!festival) return res.status(404).json({ success: false, error: "Festival not found." });
  res.json({ success: true, festival: { ...festival, image: `${req.protocol}://${req.get("host")}${festival.image}` } });
});

// GET all Pune destinations
router.get("/destinations", (req, res) => {
  res.json({
    success: true,
    destinations: PUNE_SITES,
  });
});

// POST /api/plan-trip — AI Smart Trip Planner Route
router.post("/plan-trip", async (req, res) => {
  const {
    city = "Pune",
    days = 2,
    budget = 5000,
    companions = "Family",
    travelType = "Family",
    interests = ["Heritage", "Food"],
    language = "English"
  } = req.body;

  // Input Validation
  const numDays = parseInt(days, 10);
  const numericBudget = Number(budget);

  if (isNaN(numDays) || numDays < 1 || numDays > 30) {
    return res.status(400).json({
      success: false,
      error: "Number of days must be between 1 and 30."
    });
  }

  if (isNaN(numericBudget) || numericBudget <= 0) {
    return res.status(400).json({
      success: false,
      error: "Budget must be a positive number in INR."
    });
  }

  if (!Array.isArray(interests) || interests.length === 0) {
    return res.status(400).json({
      success: false,
      error: "At least one interest must be selected."
    });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (apiKey) {
    try {
      const promptText = `You are an expert Pune travel planner and cultural tourism guide.
Generate a structured personalized JSON itinerary for a ${numDays}-day trip to ${city}, Maharashtra for a ${companions || travelType} group with a total budget of ₹${numericBudget}.
Selected Interests: ${interests.join(", ")}.
Target Language for text values: ${language}.

IMPORTANT: You MUST generate EXACTLY ${numDays} day objects in the "days" array (Day 1, Day 2, Day 3 ... Day ${numDays}). Do NOT stop at 2 days!

Format your response STRICTLY as valid JSON:
{
  "summary": "High-level summary in ${language}",
  "budget": ${numericBudget},
  "daysCount": ${numDays},
  "days": [
    {
      "day": 1,
      "theme": "Day 1 Theme Title in ${language}",
      "activities": [
        {
          "time": "09:00 AM",
          "place": "Shaniwar Wada",
          "category": "Heritage",
          "activity": "Activity description in ${language}",
          "reason": "Why visit based on user interests in ${language}",
          "duration": "2 hours",
          "estimatedCost": 25,
          "transport": "Auto / Cab / Public Transport",
          "foodSuggestion": "Food suggestion in ${language}",
          "safetyTip": "Safety tip in ${language}"
        }
      ]
    }
  ],
  "budgetBreakdown": {
    "food": 1200,
    "transport": 1000,
    "entryFees": 500,
    "activities": 500,
    "shopping": 300,
    "total": 3500
  },
  "travelTips": [ "Tip 1 in ${language}", "Tip 2 in ${language}" ],
  "safetyTips": [ "Safety tip 1 in ${language}", "Safety tip 2 in ${language}" ]
}`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const text = data.candidates[0].content.parts[0].text;
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          let parsedDays = parsed.days || parsed.itinerary || [];

          // If AI returned fewer days than requested numDays, build exact numDays
          if (parsedDays.length < numDays) {
            const fallback = generateFallbackItinerary({ days: numDays, budget: numericBudget, travelType: companions || travelType, interests, language });
            parsedDays = fallback.days;
          }

          return res.json({
            ...parsed,
            success: true,
            isFallback: false,
            budget: numericBudget,
            daysCount: numDays,
            days: parsedDays,
            itinerary: parsedDays
          });
        }
      }
    } catch (err) {
      console.warn("AI API call failed, using Pune fallback engine:", err.message);
    }
  }

  // Fallback Itinerary
  return res.json(generateFallbackItinerary({ days: numDays, budget: numericBudget, travelType: companions || travelType, interests, language }));
});

// POST /api/ask-ai — Natural Language Assistant
router.post("/ask-ai", async (req, res) => {
  const { prompt, context, language = "English" } = req.body;
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY;

  if (apiKey && prompt) {
    try {
      const promptText = `You are HeritageAI, an expert cultural tourism guide for Pune, Maharashtra, India.
Respond politely and knowledgeably in ${language} to the following question:
"${prompt}"
${context ? `Context destination: ${JSON.stringify(context)}` : ""}
Keep the answer engaging, accurate, and under 120 words.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return res.json({
          success: true,
          answer: data.candidates[0].content.parts[0].text
        });
      }
    } catch (err) {
      console.warn("Ask-AI call exception, using fallback response:", err.message);
    }
  }

  // Fallback response
  let answer = `HeritageAI Pune: Pune is rich in Maratha history, Sahyadri fortresses, and delicious Maharashtrian cuisine! For "${prompt}", we recommend visiting Shaniwar Wada in the morning and tasting authentic Puneri Misal.`;
  
  if (language === "Marathi") {
    answer = `HeritageAI पुणे: पुणे हे मराठा साम्राज्य, छत्रपती शिवाजी महाराज, पेशवेकालीन संस्कृती आणि स्वादिष्ट पुणेरी खाद्यान्नाचे केंद्र आहे! आपल्याला "${prompt}" बद्दल अधिक माहिती हवी असल्यास शनिवार वाडा आणि लाल महाल नक्की पहा.`;
  } else if (language === "Hindi") {
    answer = `HeritageAI पुणे: पुणे भारत की मराठा धरोहर और संस्कृति का केंद्र है। आपके प्रश्न "${prompt}" के लिए, हम शनिवार वाड़ा और सिंहगढ़ किले के भ्रमण की सलाह देते हैं।`;
  }

  return res.json({ success: true, answer });
});

function generateFallbackItinerary({ days = 2, budget = 5000, travelType = "Family", interests = [], language = "English" }) {
  const isMarathi = language === "Marathi";
  const isHindi = language === "Hindi";
  const numDays = Math.max(1, parseInt(days, 10) || 2);
  const numericBudget = Math.max(500, parseInt(budget, 10) || 5000);

  const summary = isMarathi
    ? `पुणे शहरासाठी ${numDays} दिवसांची विशेष सांस्कृतिक व ऐतिहासिक सफर (${travelType} प्रवास). एकूण अंदाजपत्रक ₹${numericBudget.toLocaleString()}.`
    : isHindi
    ? `पुणे शहर के लिए ${numDays} दिवसीय सांस्कृतिक और ऐतिहासिक यात्रा (${travelType} समूह)। कुल बजट ₹${numericBudget.toLocaleString()}।`
    : `Customized ${numDays}-day cultural and heritage itinerary for Pune designed for ${travelType} travelers within a ₹${numericBudget.toLocaleString()} budget.`;

  const sitePool = [
    {
      place: isMarathi ? "शनिवार वाडा" : isHindi ? "शनिवार वाड़ा" : "Shaniwar Wada",
      category: "Heritage",
      activity: isMarathi ? "१७३२ मधील भव्य पेशवेकालीन वाडा व दिल्ली दरवाजाची ऐतिहासिक पाहणी." : "Explore the 1732 Peshwa seat of Maratha power, Dilli Darwaza, and lotus fountains.",
      reason: isMarathi ? "मराठा साम्राज्याची ऐतिहासिक राजधानी पाहणे." : "Matches user interest in heritage and Maratha history.",
      duration: "2 hours",
      estimatedCost: 25,
      transport: "Auto / Cab / Public Transport",
      foodSuggestion: isMarathi ? "बेडेकर मिसळ (शनिवार पेठ)" : "Fiery Puneri Misal Pav at Bedekar Misal",
      safetyTip: isMarathi ? "दगडी पायऱ्यांवर जपून चाला." : "Follow monument guidelines and keep valuables secure."
    },
    {
      place: isMarathi ? "लाल महाल" : isHindi ? "लाल महल" : "Lal Mahal",
      category: "History",
      activity: isMarathi ? "छत्रपती शिवाजी महाराज यांचे बालपण व ऐतिहासिक वास्तू." : "Visit Shivaji Maharaj's boyhood home and view historical Maratha war paintings.",
      reason: isMarathi ? "शिवछत्रपतींच्या पराक्रमाची भूमी." : "Birthplace of Hindavi Swarajya ideology.",
      duration: "1 hour",
      estimatedCost: 20,
      transport: "5 min walk from Shaniwar Wada",
      foodSuggestion: isMarathi ? "सुजाता मस्तानी" : "Cooling Mango Mastani at Sujata Mastani",
      safetyTip: "Keep belongings safe in busy street markets."
    },
    {
      place: isMarathi ? "राजा दिनकर केळकर संग्रहालय" : isHindi ? "राजा दिनकर केलकर संग्रहालय" : "Raja Dinkar Kelkar Museum",
      category: "Museums",
      activity: isMarathi ? "२०,००० दुर्मिळ भारतीय वस्तू आणि मस्तानी महालाचे दृश्य." : "View over 20,000 rare everyday Indian antiques and the reconstructed Mastani Mahal.",
      reason: isMarathi ? "दुर्मिळ भारतीय हस्तकला संग्रह." : "Masterpiece of Indian craftsmanship.",
      duration: "2 hours",
      estimatedCost: 100,
      transport: "Cab / Rickshaw",
      foodSuggestion: isMarathi ? "चितळे बाकरवडी" : "Takeaway Chitale Bakarwadi snacks",
      safetyTip: "Bag storage available at entrance counter."
    },
    {
      place: isMarathi ? "सिंहगड किल्ला" : isHindi ? "सिंहगढ़ किला" : "Sinhagad Fort",
      category: "Forts",
      activity: isMarathi ? "नरवीर तानाजी मालुसरे यांच्या पराक्रमाची भूमी व सह्याद्रीचे दृश्य." : "Trek the historic 1670 Maratha cliff fortress 4,300 ft above sea level.",
      reason: isMarathi ? "मराठा शौर्याचा इतिहास." : "Sahyadri mountain trekking and Maratha history.",
      duration: "3 hours",
      estimatedCost: 50,
      transport: "Shared Taxi / Private Car",
      foodSuggestion: isMarathi ? "गडावरील गरमागरम पिठलं भाकरी" : "Hot mountain Pithla Bhakri & Matka Curd",
      safetyTip: "Stay on designated trails; avoid steep cliff edges."
    },
    {
      place: isMarathi ? "आगाखान पॅलेस" : isHindi ? "आगा खान पैलेस" : "Aga Khan Palace",
      category: "History",
      activity: isMarathi ? "महात्मा गांधींची नजरकैद व स्वातंत्र्यलढ्याचे स्मारक." : "Explore Gandhian Quit India movement history, Italian arches, and quiet gardens.",
      reason: isMarathi ? "भारतीय स्वातंत्र्यलढ्याचा इतिहास." : "National monument of freedom struggle.",
      duration: "2 hours",
      estimatedCost: 25,
      transport: "Cab / Auto",
      foodSuggestion: "Kalyani Nagar local snacks",
      safetyTip: "Remove footwear near Samadhi zone."
    },
    {
      place: isMarathi ? "पाताळेश्वर गुंफा मंदिर" : isHindi ? "पातालेश्वर गुफा मंदिर" : "Pataleshwar Cave Temple",
      category: "Heritage",
      activity: isMarathi ? "८ व्या शतकातील राष्ट्रकूट काळातील कातळात कोरलेले मंदिर." : "8th-century Rashtrakuta period monolithic basalt rock-cut cave temple.",
      reason: "Ancient monolithic rock-cut cave architecture.",
      duration: "1.5 hours",
      estimatedCost: 0,
      transport: "JM Road Pune Metro / Auto",
      foodSuggestion: "Wadeshwar JM Road Sabudana Vada",
      safetyTip: "Remove shoes outside temple cavern."
    }
  ];

  const daysArr = [];

  for (let d = 1; d <= numDays; d++) {
    const act1 = sitePool[(d - 1) % sitePool.length];
    const act2 = sitePool[d % sitePool.length];
    const act3 = sitePool[(d + 1) % sitePool.length];

    const themeTitle = isMarathi
      ? `दिवस ${d}: सांस्कृतिक व ऐतिहासिक सफारी`
      : isHindi
      ? `दिन ${d}: सांस्कृतिक और ऐतिहासिक यात्रा`
      : `Day ${d}: Heritage & Cultural Experience`;

    daysArr.push({
      day: d,
      theme: themeTitle,
      activities: [
        { ...act1, time: "09:00 AM" },
        { ...act2, time: "01:30 PM" },
        { ...act3, time: "04:30 PM" }
      ],
      stops: [
        { ...act1, time: "09:00 AM" },
        { ...act2, time: "01:30 PM" },
        { ...act3, time: "04:30 PM" }
      ]
    });
  }

  const estFood = Math.round(numericBudget * 0.35);
  const estTrans = Math.round(numericBudget * 0.25);
  const estEntry = Math.round(numericBudget * 0.10);
  const estAct = Math.round(numericBudget * 0.15);
  const estShop = Math.round(numericBudget * 0.15);
  const total = estFood + estTrans + estEntry + estAct + estShop;

  return {
    success: true,
    isFallback: true,
    fallbackNotice: "AI is temporarily unavailable. Showing a curated Pune itinerary.",
    summary,
    budget: numericBudget,
    daysCount: numDays,
    days: daysArr,
    itinerary: daysArr,
    budgetBreakdown: {
      food: estFood,
      transport: estTrans,
      entryFees: estEntry,
      activities: estAct,
      shopping: estShop,
      total: total,
      totalCost: total,
      remainingBudget: Math.max(0, numericBudget - total)
    },
    travelTips: [
      isMarathi ? "सकाळी ०८:०० वाजेपूर्वी सिंहगड किल्ल्याची यात्रा सुरू करा." : "Start early in the morning to avoid afternoon heat.",
      isMarathi ? "पुणे मेट्रो आणि ऑटो रिक्षा वापरल्यास वाहतूक कोंडी टाळता येते." : "Use Pune Metro for seamless connection between city centers."
    ],
    safetyTips: [
      isMarathi ? "गर्दीच्या पेठ भागात पाकीट व मोबाईल जपून ठेवा." : "Keep personal belongings secure in crowded market areas.",
      isMarathi ? "गडावर जाताना पुरेसे पिण्याचे पाणी सोबत ठेवा." : "Carry carry-on water bottles while hiking hill forts."
    ]
  };
}

module.exports = router;
