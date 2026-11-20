// FAKE DATA for the demo. Every name, ticket and room here is made up.
// Nothing in the demo is saved: it all lives in the browser's memory and
// resets when the page is refreshed.

// ---------- Types: the "shape" of our data ----------

export type Status = "open" | "in-progress" | "solved";
export type Urgency = "low" | "normal" | "high";

// The problem categories a teacher can pick from.
// `as const` lets TypeScript know the exact ids, so a typo like "wfi" is an error.
export const CATEGORIES = [
  { id: "display", label: "Projector / display" },
  { id: "wifi", label: "Wi-Fi / internet" },
  { id: "account", label: "Account / password" },
  { id: "computer", label: "Laptop / computer" },
  { id: "printer", label: "Printer" },
  { id: "software", label: "Software / apps" },
  { id: "other", label: "Something else" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export const STATUS_LABELS: Record<Status, string> = {
  open: "Open",
  "in-progress": "In progress",
  solved: "Solved",
};

export const URGENCY_LABELS: Record<Urgency, string> = {
  low: "Low: whenever you can",
  normal: "Normal: today or tomorrow",
  high: "High: I can't teach without it",
};

/** One message in a ticket's conversation. */
export type Reply = {
  from: "it" | "teacher";
  author: string;
  text: string;
  when: string; // a ready-to-show label like "Yesterday, 2:10 PM"
};

/** A help ticket. */
export type Ticket = {
  id: number;
  title: string;
  category: CategoryId;
  room: string;
  urgency: Urgency;
  description: string;
  status: Status;
  teacher: string;
  ageDays: number;      // how many days ago it was submitted (0 = today)
  time: string;         // time of day it was submitted, e.g. "8:05 AM"
  activityDays: number; // days since the last change (a reply or status update)
  replies: Reply[];
};

// The pretend teacher you "are" in the teacher view.
export const DEMO_TEACHER = { name: "Ms. Rivera", department: "Science", room: "214" };
// The pretend IT admin in the admin view.
export const DEMO_ADMIN = { name: "Mr. Okafor", role: "IT Coordinator" };

// ---------- Sample tickets ----------

export const SAMPLE_TICKETS: Ticket[] = [
  {
    id: 1042, title: "Projector won't turn on", category: "display", room: "214", urgency: "high",
    description: "The projector in my classroom shows no picture. The power light blinks orange. I have 3rd period at 10:15.",
    status: "in-progress", teacher: "Ms. Rivera", ageDays: 0, time: "8:05 AM", activityDays: 0,
    replies: [
      { from: "it", author: "Mr. Okafor", text: "On my way with a spare lamp. Should be fixed before 10.", when: "Today, 8:20 AM" },
    ],
  },
  {
    id: 1041, title: "Can't log in to the gradebook", category: "account", room: "108", urgency: "normal",
    description: "It says my password expired. I tried resetting but never got the email.",
    status: "open", teacher: "Mr. Chen", ageDays: 0, time: "7:48 AM", activityDays: 0, replies: [],
  },
  {
    id: 1039, title: "Wi-Fi keeps dropping in the library", category: "wifi", room: "Library", urgency: "normal",
    description: "Student Chromebooks disconnect every few minutes, mostly near the back tables.",
    status: "open", teacher: "Mrs. Patel", ageDays: 1, time: "1:30 PM", activityDays: 1, replies: [],
  },
  {
    id: 1036, title: "Printer is jamming", category: "printer", room: "Workroom", urgency: "low",
    description: "The workroom printer jams on every double-sided print job.",
    status: "open", teacher: "Ms. Rivera", ageDays: 1, time: "9:12 AM", activityDays: 1, replies: [],
  },
  {
    id: 1033, title: "Need the science simulation app installed", category: "software", room: "214", urgency: "low",
    description: "Could the physics simulation app be installed on the cart of 30 laptops before next week's unit?",
    status: "solved", teacher: "Ms. Rivera", ageDays: 3, time: "3:40 PM", activityDays: 2,
    replies: [
      { from: "it", author: "Mr. Okafor", text: "Installed on all 30 laptops in cart B. Let me know if any are missing it.", when: "2 days ago" },
      { from: "teacher", author: "Ms. Rivera", text: "Works great, thank you!", when: "2 days ago" },
    ],
  },
  {
    id: 1030, title: "Laptop battery won't charge", category: "computer", room: "302", urgency: "normal",
    description: "My teacher laptop shows 'plugged in, not charging'. I tried another charger.",
    status: "solved", teacher: "Mr. Davis", ageDays: 8, time: "10:30 AM", activityDays: 7,
    replies: [{ from: "it", author: "Mr. Okafor", text: "Swapped the battery. You're all set.", when: "1 week ago" }],
  },
  {
    // An OLD ticket that's still open: it shows no matter which time range is picked.
    id: 1015, title: "Gym sound system needs repair", category: "other", room: "Gym", urgency: "low",
    description: "The left speaker in the gym cuts out during assemblies. Not urgent, but needed before graduation.",
    status: "open", teacher: "Mrs. Patel", ageDays: 95, time: "2:15 PM", activityDays: 60,
    replies: [{ from: "it", author: "Mr. Okafor", text: "Replacement part is on order.", when: "2 months ago" }],
  },
  // ---- Older solved tickets (hidden by shorter time ranges) ----
  {
    id: 1024, title: "Document camera is blurry", category: "display", room: "214", urgency: "normal",
    description: "The document camera image is blurry even after pressing auto-focus.",
    status: "solved", teacher: "Ms. Rivera", ageDays: 40, time: "11:05 AM", activityDays: 38,
    replies: [{ from: "it", author: "Mr. Okafor", text: "Cleaned the lens and updated the driver. Looks sharp now.", when: "1 month ago" }],
  },
  {
    id: 1018, title: "School email not syncing on phone", category: "account", room: "108", urgency: "low",
    description: "My school email stopped showing new messages on my phone.",
    status: "solved", teacher: "Mr. Chen", ageDays: 75, time: "4:20 PM", activityDays: 74,
    replies: [{ from: "it", author: "Mr. Okafor", text: "Removed and re-added the account. Syncing again.", when: "2 months ago" }],
  },
  {
    id: 1011, title: "Classroom speaker crackling", category: "other", room: "214", urgency: "low",
    description: "The ceiling speaker crackles whenever I play videos.",
    status: "solved", teacher: "Ms. Rivera", ageDays: 130, time: "9:40 AM", activityDays: 126,
    replies: [{ from: "it", author: "Mr. Okafor", text: "Replaced a loose cable in the ceiling.", when: "4 months ago" }],
  },
  {
    id: 1005, title: "Library barcode scanner offline", category: "computer", room: "Library", urgency: "normal",
    description: "The checkout scanner isn't reading barcodes.",
    status: "solved", teacher: "Mrs. Patel", ageDays: 210, time: "8:30 AM", activityDays: 205,
    replies: [{ from: "it", author: "Mr. Okafor", text: "New USB cable fixed it.", when: "6 months ago" }],
  },
  {
    id: 998, title: "New laptop setup", category: "computer", room: "214", urgency: "normal",
    description: "I received a new laptop and need my apps and printers set up.",
    status: "solved", teacher: "Ms. Rivera", ageDays: 300, time: "1:00 PM", activityDays: 299,
    replies: [{ from: "it", author: "Mr. Okafor", text: "All set up and ready to go.", when: "9 months ago" }],
  },
  {
    id: 985, title: "Projector bulb replacement", category: "display", room: "302", urgency: "normal",
    description: "The projector warns that the bulb is near the end of its life.",
    status: "solved", teacher: "Mr. Davis", ageDays: 420, time: "10:10 AM", activityDays: 415,
    replies: [{ from: "it", author: "Mr. Okafor", text: "Bulb replaced.", when: "1 year ago" }],
  },
];

// ---------- FAQ: quick fixes teachers can try before submitting a ticket ----------

export type Faq = {
  id: string;
  category: CategoryId;
  question: string;
  steps: string[];
};

export const FAQS: Faq[] = [
  {
    id: "projector-no-picture",
    category: "display",
    question: "The projector is on but shows no picture",
    steps: [
      "Check the cable is firmly plugged into both the laptop and the wall/projector port.",
      "On Windows press Windows + P and choose \"Duplicate\". On a Mac, open Displays settings.",
      "Use the projector remote's Source/Input button to pick the right input (usually HDMI).",
      "Still nothing? Submit a ticket and include the projector's light color.",
    ],
  },
  {
    id: "projector-blinking",
    category: "display",
    question: "The projector's power light is blinking",
    steps: [
      "A blinking light usually means it's cooling down or the lamp needs replacing.",
      "Wait 2 minutes, then press power once.",
      "If it blinks orange or red again, submit a ticket. Don't keep restarting it.",
    ],
  },
  {
    id: "wifi-disconnects",
    category: "wifi",
    question: "My device won't connect to Wi-Fi",
    steps: [
      "Turn Wi-Fi off and on again, or restart the device.",
      "Make sure you're joining the school network, not a guest or phone hotspot.",
      "\"Forget\" the network and reconnect with your school login.",
      "If several devices in one room drop at once, submit a ticket with the room number.",
    ],
  },
  {
    id: "password-reset",
    category: "account",
    question: "I forgot my password or it expired",
    steps: [
      "Use the \"Forgot password\" link on the school login page.",
      "Check your spam/junk folder for the reset email.",
      "SECURITY TIP: IT will never ask for your password by email or phone. Don't share it.",
      "No email after 10 minutes? Submit a ticket.",
    ],
  },
  {
    id: "account-locked",
    category: "account",
    question: "My account says it's locked",
    steps: [
      "Accounts lock after too many wrong passwords. This protects you from people guessing it.",
      "Wait 15 minutes, then try again carefully.",
      "Still locked? Submit a ticket and IT can unlock it after confirming it's you.",
    ],
  },
  {
    id: "laptop-slow",
    category: "computer",
    question: "My laptop is very slow",
    steps: [
      "Restart it. This fixes more problems than anything else!",
      "Close browser tabs and programs you aren't using.",
      "Make sure it's plugged in. Some laptops slow down on low battery.",
      "If it's still slow after a restart, submit a ticket.",
    ],
  },
  {
    id: "printer-jam",
    category: "printer",
    question: "The printer is jammed or won't print",
    steps: [
      "Open the paper trays and doors and gently remove any stuck paper.",
      "Check the printer screen for an error message.",
      "On your computer, make sure you picked the right printer name.",
      "Still stuck? Submit a ticket with the printer's location.",
    ],
  },
  {
    id: "software-install",
    category: "software",
    question: "How do I get new software installed?",
    steps: [
      "Teachers can't install software themselves. This keeps school devices safe from malware.",
      "Submit a ticket with the app name, which devices need it, and by when.",
      "IT checks the app is safe and approved for student privacy before installing.",
    ],
  },
  {
    id: "phishing",
    category: "other",
    question: "I got a suspicious email. What should I do?",
    steps: [
      "Don't click links, open attachments, or reply.",
      "Watch for warning signs: urgency, spelling mistakes, odd sender addresses, requests for passwords.",
      "Report it to IT (submit a ticket), then delete it.",
      "Clicked something already? Tell IT right away. Acting fast limits the damage.",
    ],
  },
];
