export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  widgetId: string;
  nationality: string;
  skills: string[];
  relationshipStats: {
    trustLevel: number;
    yearsKnown: number;
    meetingsPerMonth: number;
  };
  conversationTopics: string[];
  gallery?: {
    videos?: string[];
    images?: string[];
  };
}

export const characters: Character[] = [
  {
    id: "atlas",
    name: "Pastor Atlas",
    role: "Senior Pastor",
    description: "A compassionate spiritual leader with decades of experience in ministry and Biblical teaching. Pastor Atlas specializes in making Scripture accessible and relevant to modern life while maintaining deep theological understanding.",
    image: "/lovable-uploads/545221c7-1d0e-41c8-bda0-235b932c3a9f.png",
    widgetId: "8gJ0dMHzPVXRpxVpWpnj",
    nationality: "American",
    skills: [
      "Biblical Teaching",
      "Pastoral Care",
      "Prayer Ministry",
      "Spiritual Guidance",
      "Biblical Interpretation",
      "Community Building"
    ],
    relationshipStats: {
      trustLevel: 95,
      yearsKnown: 15,
      meetingsPerMonth: 12
    },
    conversationTopics: [
      "Biblical Studies",
      "Prayer and Devotion",
      "Faith Journey",
      "Christian Living",
      "Spiritual Growth",
      "Church Community"
    ],
    gallery: {
      videos: ["https://youtube.com/shorts/wgS9VEhg8nA"]
    }
  },
  {
    id: "echo",
    name: "Echo",
    role: "Prayer Warrior",
    description: "Echo is a dedicated prayer warrior with a heart for intercessory prayer and spiritual warfare. They help believers strengthen their prayer life and understand the power of consistent, faithful prayer in their spiritual journey.",
    image: "/lovable-uploads/3ed1979a-c47e-4d48-b773-ead55dd2ed84.png",
    widgetId: "6uUzWns28me6nq7WB2Ch",
    nationality: "Brazilian",
    skills: [
      "Intercessory Prayer",
      "Spiritual Warfare",
      "Prayer Guidance",
      "Biblical Prayer Studies",
      "Faith Building",
      "Prayer Journaling"
    ],
    relationshipStats: {
      trustLevel: 88,
      yearsKnown: 4,
      meetingsPerMonth: 6
    },
    conversationTopics: [
      "Prayer Strategies",
      "Spiritual Warfare",
      "Faith Development",
      "Divine Intervention",
      "Prayer in Scripture",
      "Building Prayer Habits"
    ]
  },
  {
    id: "pace",
    name: "Pace",
    role: "Youth Minister",
    description: "Pace specializes in connecting with young believers, making Scripture relevant to modern youth while staying true to biblical principles. They excel at bridging generational gaps in faith and fostering spiritual growth in young people.",
    image: "/lovable-uploads/ba86daaf-2e7c-4615-9b24-5cdfb9adfdda.png",
    widgetId: "WO8DnLMvodLhjPDCkk24",
    nationality: "Japanese",
    skills: [
      "Youth Ministry",
      "Modern Worship",
      "Biblical Application",
      "Mentorship",
      "Scripture Study",
      "Youth Engagement"
    ],
    relationshipStats: {
      trustLevel: 95,
      yearsKnown: 3,
      meetingsPerMonth: 12
    },
    conversationTopics: [
      "Youth Faith",
      "Modern Christianity",
      "Biblical Wisdom",
      "Life Application",
      "Scripture Study",
      "Faith Questions"
    ]
  },
  {
    id: "aria",
    name: "Aria",
    role: "Bible Scholar",
    description: "A dedicated Bible scholar with expertise in original languages and historical context. Aria helps believers dive deep into Scripture, understanding its original meaning and modern application through careful study and interpretation.",
    image: "/lovable-uploads/d13f4738-2c22-4587-a616-b0cee2931b0b.png",
    widgetId: "RFVLgNGutYmjTtsIGNX1",
    nationality: "Russian",
    skills: [
      "Biblical Languages",
      "Hermeneutics",
      "Historical Context",
      "Theological Studies",
      "Scripture Analysis",
      "Biblical Research"
    ],
    relationshipStats: {
      trustLevel: 85,
      yearsKnown: 1.5,
      meetingsPerMonth: 4
    },
    conversationTopics: [
      "Biblical Languages",
      "Scripture Study",
      "Historical Context",
      "Theological Insights",
      "Bible Translation",
      "Ancient Manuscripts"
    ]
  },
  {
    id: "cipher",
    name: "Cipher",
    role: "Apologetics Expert",
    description: "Cipher specializes in Christian apologetics, helping believers understand and defend their faith through Scripture. They provide thoughtful, Bible-based answers to challenging questions about Christianity and faith.",
    image: "/lovable-uploads/761f3623-3775-4357-be2c-383985df2544.png",
    widgetId: "2TrHp4U7CtvKYhNlPx6U",
    nationality: "American",
    skills: [
      "Biblical Apologetics",
      "Theological Defense",
      "Scripture Analysis",
      "Faith Defense",
      "Biblical Reasoning",
      "Doctrinal Studies"
    ],
    relationshipStats: {
      trustLevel: 97,
      yearsKnown: 2,
      meetingsPerMonth: 10
    },
    conversationTopics: [
      "Christian Defense",
      "Faith Questions",
      "Biblical Truth",
      "Doctrinal Studies",
      "Scripture Evidence",
      "Theological Reasoning"
    ]
  },
  {
    id: "nova",
    name: "Nova",
    role: "Missions Coordinator",
    description: "Nova focuses on global missions and cross-cultural ministry through a Biblical lens. They help believers understand God's heart for missions and engage with Scripture's call to spread the Gospel worldwide.",
    image: "/lovable-uploads/13d26c54-f985-4e90-92f2-dca91eca7a1b.png",
    widgetId: "cJZziDTpqaTCZzKseAKK",
    nationality: "Korean",
    skills: [
      "Biblical Missions",
      "Cross-Cultural Ministry",
      "Gospel Strategy",
      "Cultural Integration",
      "Scripture Teaching",
      "Global Outreach"
    ],
    relationshipStats: {
      trustLevel: 90,
      yearsKnown: 2,
      meetingsPerMonth: 7
    },
    conversationTopics: [
      "Biblical Missions",
      "Great Commission",
      "Cultural Ministry",
      "Gospel Sharing",
      "Mission Strategy",
      "Scripture Application"
    ]
  }
];