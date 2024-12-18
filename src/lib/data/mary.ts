import { Character } from "../types/character";

export const mary: Character = {
  id: "mary",
  name: "Mary",
  role: "Bible Study Leader",
  description: "Mary is passionate about helping believers dive deep into God's Word. With her gentle approach and profound understanding of Scripture, she guides others in discovering the transformative power of biblical truth.",
  image: "/lovable-uploads/9bc5e391-7fcf-4497-9e5f-07ea2ef4a837.png",
  widgetId: "YourWidgetIdHere", // Replace with actual widget ID
  nationality: "American",
  skills: [
    "Biblical Teaching",
    "Scripture Study",
    "Theological Insight",
    "Discipleship",
    "Biblical Languages",
    "Spiritual Mentoring"
  ],
  relationshipStats: {
    trustLevel: 92,
    yearsKnown: 6,
    meetingsPerMonth: 8
  },
  conversationTopics: [
    "Bible Study Methods",
    "Biblical Interpretation",
    "Character Studies",
    "Biblical History",
    "Spiritual Formation",
    "Christian Living"
  ]
};