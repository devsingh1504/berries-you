// ✏️ EDIT HERE — all site content lives in this file.
// To use a real photo: put the image in /public (e.g. /public/very-berry.jpg) and set img: '/very-berry.jpg'
// NOTE: names/prices below are placeholders — replace with your real menu.

export const BRAND = {
  name: "Berries & You",
  city: "Delhi",
  startPrice: 199,
  whatsapp: "919999999999", // ← put your real WhatsApp number (with country code)
};

export const SMOOTHIES = [
  {
    id: 1,
    name: "Very Berry",
    desc: "Mixed berries blended with Greek yogurt. Thick, cold and 100% fresh.",
    price: 199,
    from: "#FF5C8A",
    to: "#B5179E",
    emoji: "🍓",
    tags: ["Bestseller", "No added sugar"],
    img: "https://berry-drive-cloud.lovable.app/assets/smoothie-very-berry-DNR_dbx3.jpg",
  },
  {
    id: 2,
    name: "Cheeky Berry",
    desc: "Chikoo and berries together. Creamy, sweet and a little cheeky.",
    price: 229,
    from: "#FF7A90",
    to: "#C9184A",
    emoji: "🍒",
    tags: ["High protein"],
    img: "https://berry-drive-cloud.lovable.app/assets/smoothie-cheeky-berry-BzUkfTfz.jpg",
  },
  {
    id: 3,
    name: "Guava Berry Pop",
    desc: "Guava meets mixed berries for a fresh, fruity pop.",
    price: 209,
    from: "#7ED957",
    to: "#E0489B",
    emoji: "🍈",
    tags: ["Seasonal"],
    img: "https://berry-drive-cloud.lovable.app/assets/smoothie-guava-berry-pop-BWtkCGC1.jpg",
  },
  {
    id: 4,
    name: "Chikoo Cheeks",
    desc: "Smooth, naturally sweet chikoo blended with Greek yogurt.",
    price: 199,
    from: "#C98F5A",
    to: "#7A4A2B",
    emoji: "🥔",
    tags: ["Creamy"],
    img: "https://berry-drive-cloud.lovable.app/assets/smoothie-chikoo-cheeks-CgZ7hpjK.jpg",
  },
  {
    id: 5,
    name: "Malta Rush",
    desc: "A juicy, citrusy rush to wake you up.",
    price: 219,
    from: "#FFB547",
    to: "#FF6B35",
    emoji: "🍊",
    tags: ["Citrusy"],
    img: "https://berry-drive-cloud.lovable.app/assets/smoothie-malta-rush-CqM3gbvQ.jpg",
  },
  {
    id: 6,
    name: "Sunset Sip",
    desc: "Sunset-coloured and fruity. A new favourite for slow evenings.",
    price: 219,
    from: "#FF8A5C",
    to: "#B5179E",
    emoji: "🌅",
    tags: ["Fresh pick"],
    img: "https://berry-drive-cloud.lovable.app/assets/smoothie-sunset-sip-ClE7IJu1.jpg",
  },
];

export const PLANS = [
  {
    name: "Trial week",
    days: 7,
    per: 229,
    perks: ["Pick any 3 flavours", "Pause anytime", "Free delivery"],
  },
  {
    name: "Berry regular",
    days: 15,
    per: 209,
    perks: [
      "Mix flavours daily",
      "Skip a day, no fee",
      "Free delivery",
      "Priority slots",
    ],
    hot: true,
  },
  {
    name: "Monthly glow",
    days: 30,
    per: 199,
    perks: [
      "Mix flavours daily",
      "Skip days freely",
      "Free delivery",
      "Priority slots",
      "Free protein add-on weekly",
    ],
  },
];

export const STEPS = [
  {
    t: "Pick your plan",
    d: "Choose 7, 15 or 30 days. Change or pause whenever.",
  },
  {
    t: "Choose flavours",
    d: "Stick to your favourite or mix it up every morning.",
  },
  {
    t: "We blend fresh",
    d: "Made the same day with real berries. No added sugar.",
  },
  {
    t: "Delivered daily",
    d: "Cold smoothie at your door across Delhi, every day.",
  },
];

export const WHY = [
  { e: "🚫", t: "No added sugar", d: "Sweetness comes from fruit only." },
  {
    e: "🏋️",
    t: "Post-workout ready",
    d: "Protein-friendly blends to refuel after the gym.",
  },
  {
    e: "🛵",
    t: "Daily Delhi delivery",
    d: "Fresh at your door, morning after morning.",
  },
  { e: "🍓", t: "Real berries", d: "Whole fruit, no syrups, no powders." },
];

export const FAQS = [
  {
    q: "Is there any added sugar?",
    a: "No. Every smoothie gets its sweetness from the fruit itself.",
  },
  {
    q: "Which areas of Delhi do you deliver to?",
    a: "We deliver across Delhi. Message us your pincode and we will confirm within minutes.",
  },
  {
    q: "Can I pause or skip a day?",
    a: "Yes. Pause or skip any day from your plan with a quick message, no charges.",
  },
  {
    q: "How do I pay?",
    a: "UPI, cards or cash on delivery. Subscriptions are billed upfront for the plan length.",
  },
];
