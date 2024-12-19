import { Character } from "./types/character";

export const characters: Character[] = [
  {
    id: "pastor-andrew",
    name: "Pastor Andrew",
    title: "Senior Pastor & Biblical Scholar",
    role: "Senior Pastor",
    image: "/lovable-uploads/5a6cb8cd-ee6e-4891-acf1-14140317ae0c.png", // Chat avatar
    profileImage: "/lovable-uploads/c24ebe39-b567-489e-90f8-b11bb4742f8b.png", // Profile image
    description: "A compassionate spiritual leader dedicated to teaching God's Word and guiding believers in their faith journey.",
    widgetId: "d1CQmaU4op8GfEiw8o6k",
    nationality: "American",
    skills: [
      "Biblical Teaching",
      "Pastoral Care",
      "Prayer Ministry",
      "Spiritual Guidance",
      "Biblical Interpretation"
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
      "Spiritual Growth"
    ]
  },
  {
    id: "grace",
    name: "Grace",
    title: "Youth Minister & Worship Leader",
    role: "Youth Minister",
    image: "/lovable-uploads/756470b0-e27a-421d-82be-ce30935f8271.png", // Chat avatar
    profileImage: "/lovable-uploads/ba86daaf-2e7c-4615-9b24-5cdfb9adfdda.png", // Profile image
    description: "A dynamic youth minister passionate about connecting young believers with God's Word.",
    widgetId: "xijflrZuOlQ7ym3luVwv",
    nationality: "American",
    skills: [
      "Youth Ministry",
      "Worship Leading",
      "Biblical Teaching",
      "Mentorship",
      "Youth Engagement"
    ],
    relationshipStats: {
      trustLevel: 88,
      yearsKnown: 4,
      meetingsPerMonth: 8
    },
    conversationTopics: [
      "Youth Faith",
      "Modern Christianity",
      "Worship",
      "Biblical Application",
      "Life Challenges"
    ]
  },
  {
    id: "jacob",
    name: "Jacob",
    title: "Bible Study Leader & Mentor",
    role: "Bible Study Leader",
    image: "/lovable-uploads/4cdf7c12-18d5-469c-b309-5b83c71ed39d.png", // Chat avatar
    profileImage: "/lovable-uploads/dfd211f2-2e1a-4962-a2f2-1f4923d14669.png", // Profile image
    description: "An experienced Bible study leader with a gift for making Scripture accessible and relevant.",
    widgetId: "jjpaBiJA68inWAqkHX63",
    nationality: "American",
    skills: [
      "Biblical Teaching",
      "Mentorship",
      "Scripture Study",
      "Youth Engagement",
      "Discipleship"
    ],
    relationshipStats: {
      trustLevel: 92,
      yearsKnown: 3,
      meetingsPerMonth: 12
    },
    conversationTopics: [
      "Biblical Studies",
      "Life Application",
      "Faith Journey",
      "Spiritual Growth",
      "Christian Leadership"
    ]
  },
  {
    id: "hope",
    name: "Hope",
    title: "Prayer Warrior & Counselor",
    role: "Prayer Warrior",
    image: "/lovable-uploads/ef5e48fd-66e4-4b9c-8ee3-6c5141d0f60c.png", // Chat avatar
    profileImage: "/lovable-uploads/ebecd4f4-59bc-4a68-80a5-2873d26be8bf.png", // Profile image
    description: "A dedicated prayer warrior with a heart for intercession and spiritual guidance.",
    widgetId: "WonF9al5fqU76zwkIW6H",
    nationality: "American",
    skills: [
      "Intercessory Prayer",
      "Biblical Counseling",
      "Spiritual Warfare",
      "Faith Building",
      "Prayer Guidance"
    ],
    relationshipStats: {
      trustLevel: 85,
      yearsKnown: 1.5,
      meetingsPerMonth: 4
    },
    conversationTopics: [
      "Prayer Life",
      "Spiritual Warfare",
      "Faith Challenges",
      "Biblical Promises",
      "Personal Growth"
    ]
  },
  {
    id: "mary",
    name: "Mary",
    title: "Women's Ministry Leader & Biblical Counselor",
    role: "Women's Ministry Leader",
    image: "/lovable-uploads/f82efed5-4886-433d-9d0b-24c7dd96c12f.png", // Chat avatar
    profileImage: "/lovable-uploads/c5dfc262-4e33-44a9-9ded-4ede0b241e17.png", // Profile image
    description: "A compassionate women's ministry leader with a heart for biblical counseling and discipleship.",
    widgetId: "UIJhhZRn6elHY8hwIc8H",
    nationality: "American",
    skills: [
      "Women's Ministry",
      "Biblical Counseling",
      "Discipleship",
      "Prayer Ministry",
      "Spiritual Mentoring"
    ],
    relationshipStats: {
      trustLevel: 92,
      yearsKnown: 6,
      meetingsPerMonth: 8
    },
    conversationTopics: [
      "Women's Faith",
      "Biblical Womanhood",
      "Prayer Life",
      "Spiritual Growth",
      "Christian Living"
    ]
  }
];

export type { Character };