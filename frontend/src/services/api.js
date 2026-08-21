import axios from 'axios';
import { PUNE_DESTINATIONS } from '../data/puneData';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
});

export const planTrip = async (params) => {
  try {
    const response = await api.post('/plan-trip', params);
    if (response.data && response.data.success) {
      // Ensure budget property is set to user requested budget if missing
      return {
        ...response.data,
        budget: response.data.budget || params.budget || 5000
      };
    }
    throw new Error('API request succeeded but returned non-success payload');
  } catch (error) {
    console.warn('Backend API unavailable or error occurred, using client-side fallback generator:', error.message);
    return generateFallbackItinerary(params);
  }
};

export const askAi = async (prompt, destinationContext = null, language = 'English') => {
  try {
    const response = await api.post('/ask-ai', { prompt, context: destinationContext, language });
    if (response.data && response.data.answer) {
      return response.data.answer;
    }
    throw new Error('No answer returned from AI API');
  } catch (error) {
    console.warn('AI Assistant API call failed, using smart fallback response:', error.message);
    return generateFallbackAiAnswer(prompt, destinationContext, language);
  }
};

export const getDestinations = async () => {
  try {
    const response = await api.get('/destinations');
    if (response.data && response.data.destinations) {
      return response.data.destinations;
    }
    return PUNE_DESTINATIONS;
  } catch (error) {
    return PUNE_DESTINATIONS;
  }
};

export const getFestivals = async () => {
  const response = await api.get('/festivals');
  if (response.data?.success && Array.isArray(response.data.festivals)) {
    return response.data.festivals;
  }
  throw new Error('Festival guide is unavailable');
};

// Client-side fallback generator for 100% reliable demo execution
function generateFallbackItinerary(params) {
  const { days = 2, budget = 5000, travelType = 'Family', interests = ['Heritage', 'Food'], language = 'English' } = params;
  const numDays = parseInt(days, 10) || 2;
  const numericBudget = parseInt(budget, 10) || 5000;
  
  // Select matching sites based on interests
  const selectedSites = PUNE_DESTINATIONS.filter(site => {
    if (interests.length === 0) return true;
    return interests.some(interest => 
      site.category.toLowerCase().includes(interest.toLowerCase()) || 
      interest.toLowerCase().includes(site.category.toLowerCase())
    );
  });

  const pool = selectedSites.length >= 4 ? selectedSites : PUNE_DESTINATIONS;

  const itineraryDays = [];
  const itemsPerDay = 3;

  for (let d = 1; d <= numDays; d++) {
    const dayActivities = [];
    const startIndex = ((d - 1) * itemsPerDay) % pool.length;
    
    // Morning activity
    const morningSite = pool[startIndex] || PUNE_DESTINATIONS[0];
    dayActivities.push({
      time: "09:00 AM",
      place: language === 'Marathi' ? morningSite.marathiName : language === 'Hindi' ? morningSite.hindiName : morningSite.name,
      category: morningSite.category,
      lat: morningSite.lat,
      lng: morningSite.lng,
      activity: language === 'Marathi' 
        ? `सकाळी ${morningSite.marathiName} ची ऐतिहासिक सफर आणि मराठाकालीन वास्तुकला दर्शन.` 
        : language === 'Hindi'
        ? `सुबह ${morningSite.hindiName} का भ्रमण और मराठा स्थापत्य कला का अवलोकन।`
        : `Explore the historic ${morningSite.name} and admire Peshwa era architecture.`,
      reason: language === 'Marathi' ? "मराठा साम्राज्याचा वारसा पाहणे." : "Matches user interest in heritage and Maratha history.",
      duration: "2 hours",
      estimatedCost: morningSite.costNum || 25,
      transport: "Auto / Cab / Public Transport",
      foodSuggestion: language === 'Marathi' ? "बेडेकर मिसळ (शनिवार पेठ)" : "Bedekar Puneri Misal Pav",
      safetyTip: language === 'Marathi' ? "दगडी पायऱ्यांवर जपून चाला." : "Follow monument guidelines and keep valuables secure."
    });

    // Afternoon lunch activity
    dayActivities.push({
      time: "01:00 PM",
      place: language === 'Marathi' ? "पारंपारिक पुणेरी मिसळ व भोजनास्वाद" : language === 'Hindi' ? "पारंपरिक पुणेरी थाली और मिसळ" : "Authentic Maharashtrian Lunch & Misal",
      category: "Food",
      lat: morningSite.lat + 0.005,
      lng: morningSite.lng + 0.005,
      activity: language === 'Marathi'
        ? "प्रसिद्ध बेडेकर किंवा कट्टाकिर्र मिसळ पावाचा आस्वाद आणि सुजाता मस्तानी डेझर्ट."
        : language === 'Hindi'
        ? "प्रसिद्ध बेडेकर मिसळ और पारंपरिक पुणेरी मस्तानी का आनंद।"
        : "Enjoy iconic Puneri Misal Pav at Bedekar / Kattakirrr followed by Sujata Mastani.",
      reason: "Authentic local gastronomy experience.",
      duration: "1 hour",
      estimatedCost: 180,
      transport: "Walkable in Sadashiv Peth",
      foodSuggestion: "Sujata Mango Mastani",
      safetyTip: "Hydrate well after spicy condiments."
    });

    // Afternoon heritage museum activity
    const afternoonSite = pool[(startIndex + 1) % pool.length] || PUNE_DESTINATIONS[1];
    dayActivities.push({
      time: "03:30 PM",
      place: language === 'Marathi' ? afternoonSite.marathiName : language === 'Hindi' ? afternoonSite.hindiName : afternoonSite.name,
      category: afternoonSite.category,
      lat: afternoonSite.lat,
      lng: afternoonSite.lng,
      activity: language === 'Marathi'
        ? `${afternoonSite.marathiName} मधील दुर्मिळ कलाकुसर आणि ऐतिहासिक वस्तूंचे प्रदर्शन.`
        : language === 'Hindi'
        ? `${afternoonSite.hindiName} में दुर्लभ हस्तशिल्प और ऐतिहासिक दीर्घाओं का अवलोकन।`
        : `Explore rare collections and heritage galleries at ${afternoonSite.name}.`,
      reason: "Masterpiece of Indian craftsmanship.",
      duration: "2 hours",
      estimatedCost: afternoonSite.costNum || 50,
      transport: "Cab / Rickshaw",
      foodSuggestion: "Chitale Bakarwadi snacks",
      safetyTip: "Bag storage available at entrance counter."
    });

    itineraryDays.push({
      day: d,
      theme: d === 1 ? "Imperial Peshwa Heritage & Classic Flavors" : `Day ${d}: Heritage, Fortresses & Local Culture`,
      activities: dayActivities,
      stops: dayActivities
    });
  }

  const estFood = Math.round(numericBudget * 0.35);
  const estTransport = Math.round(numericBudget * 0.25);
  const estEntry = Math.round(numericBudget * 0.10);
  const estActivities = Math.round(numericBudget * 0.15);
  const estShopping = Math.round(numericBudget * 0.15);
  const totalCost = estFood + estTransport + estEntry + estActivities + estShopping;

  return {
    success: true,
    isFallback: true,
    fallbackNotice: "AI is temporarily unavailable. Showing a curated Pune itinerary.",
    summary: `Customized ${numDays}-day cultural and heritage itinerary for Pune for ${travelType} group within a ₹${numericBudget.toLocaleString()} budget.`,
    budget: numericBudget,
    daysCount: numDays,
    days: itineraryDays,
    itinerary: itineraryDays,
    budgetBreakdown: {
      food: estFood,
      transport: estTransport,
      entryFees: estEntry,
      activities: estActivities,
      shopping: estShopping,
      total: totalCost,
      totalCost: totalCost,
      remainingBudget: Math.max(0, numericBudget - totalCost)
    },
    travelTips: [
      "Start early in the morning to avoid afternoon heat.",
      "Use Pune Metro for seamless connection between city centers."
    ],
    safetyTips: [
      "Keep personal belongings secure in crowded market areas.",
      "Carry water bottles while visiting heritage monuments."
    ]
  };
}

function generateFallbackAiAnswer(prompt, context, language) {
  const query = prompt.toLowerCase();
  
  if (language === 'Marathi') {
    if (query.includes('shaniwar') || query.includes('शनिवार')) {
      return "शनिवार वाडा हा १७३२ मध्ये पेशवे प्रथम बाजीराव यांनी बांधलेला मराठा साम्राज्याचा मुख्य किल्ला आहे. येथे दिल्ली दरवाजा आणि संध्याकाळचा लाईट अँड साऊंड शो अवश्य पाहावा!";
    }
    if (query.includes('sinhagad') || query.includes('सिंहगड')) {
      return "सिंहगड किल्ला हा तानाजी मालुसरे यांच्या पराक्रमाची भूमी आहे. गडावर गरमागरम पिठलं भाकरी आणि कांदा भजी नक्की चाखा!";
    }
    return "पुण्यामध्ये शनिवार वाडा, लाल महाल, दगडूशेठ गणपती आणि आगाखान पॅलेस ही प्रमुख ऐतिहासिक स्थळे आहेत. आपण कोणत्या विशिष्ट ठिकाणाबद्दल जाणून घेऊ इच्छिता?";
  }

  if (language === 'Hindi') {
    if (query.includes('shaniwar') || query.includes('शनिवार')) {
      return "शनिवार वाड़ा 1732 में निर्मित पेशवाओं का ऐतिहासिक मुख्यालय है। इसका दिल्ली दरवाजा और नक्काशीदार प्रांगण मराठा साम्राज्य के गौरव की गाथा गाते हैं।";
    }
    return "पुणे भारत की सांस्कृतिक और ऐतिहासिक राजधानी है। यहाँ शनिवार वाड़ा, सिंहगढ़ किला, और केलकर संग्रहालय प्रमुख आकर्षण हैं।";
  }

  // Default English
  if (query.includes('history') || query.includes('heritage')) {
    return "Pune is the historic heart of the Maratha Empire. Key highlights include Shaniwar Wada (Peshwa seat), Lal Mahal (Shivaji Maharaj's childhood home), and Pataleshwar Cave Temple (8th century rock-cut caves).";
  }
  if (query.includes('food') || query.includes('eat')) {
    return "Must-try Pune foods include fiery Puneri Misal Pav at Bedekar, Sujata Mango Mastani dessert, Sinhagad Pithla Bhakri, and crispy Chitale Bakarwadi!";
  }
  if (query.includes('sinhagad') || query.includes('child') || query.includes('family')) {
    return "Sinhagad Fort is fantastic for families with moderate fitness. There is a vehicle road all the way to the top parking lot, followed by a gentle 15-minute stone staircase walk.";
  }

  return `HeritageAI Pune Assistant: Pune offers a vibrant blend of Peshwa heritage, Sahyadri forts, rich museums, and authentic Maharashtrian cuisine. For your query: "${prompt}", we recommend exploring the historical Peth area and savoring local delicacies!`;
}
