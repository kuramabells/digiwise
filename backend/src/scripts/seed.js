require('dotenv').config();
const { sequelize, Admin, Question } = require('../models');
const bcrypt = require('bcryptjs');

const questions = [
  // Screen Time Category
  {
    text: "Social media use negatively affects my academic performance.",
    category: "Screen Time",
    category_id: 1,
    order_number: 1
  },
  {
    text: "People close to me have expressed concern about my social media use.",
    category: "Screen Time",
    category_id: 1,
    order_number: 2
  },
  {
    text: "I spend more time on social media than I intend to.",
    category: "Screen Time",
    category_id: 1,
    order_number: 3
  },
  {
    text: "I often lose track of time when using social media.",
    category: "Screen Time",
    category_id: 1,
    order_number: 4
  },
  {
    text: "I feel stressed when I am not able to check my social media accounts.",
    category: "Screen Time",
    category_id: 1,
    order_number: 5
  },
  {
    text: "I find it difficult to limit my social media usage even when I try.",
    category: "Screen Time",
    category_id: 1,
    order_number: 6
  },
  {
    text: "I feel left out when I'm not up-to-date with social media posts.",
    category: "Screen Time",
    category_id: 1,
    order_number: 7
  },
  {
    text: "My tendency to prioritize social media over task completion adversely affects my productivity.",
    category: "Screen Time",
    category_id: 1,
    order_number: 8
  },
  {
    text: "Facebook is the main reason why I stay up late at night.",
    category: "Screen Time",
    category_id: 1,
    order_number: 9
  },
  {
    text: "When I spend too much time on screens, I find it hard to get things done during the day.",
    category: "Screen Time",
    category_id: 1,
    order_number: 10
  },
  // Mental Health Effects Category
  {
    text: "I feel more anxious after spending time on social media.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 11
  },
  {
    text: "Social media often makes me feel like my life is inadequate compared to others.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 12
  },
  {
    text: "I feel lonely even when I'm interacting with others online.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 13
  },
  {
    text: "Checking social media is one of the first things I do most mornings.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 14
  },
  {
    text: "I use social media to relieve of stress.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 15
  },
  {
    text: "Seeing others' posts on social media impacts my self-esteem.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 16
  },
  {
    text: "I feel emotionally drained after scrolling through social media.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 17
  },
  {
    text: "My mood is often affected by the content I see on social media.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 18
  },
  {
    text: "I am hooked to social media, even when I know it worsens my mental health.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 19
  },
  {
    text: "Taking breaks from social media improves my emotional well-being.",
    category: "Mental Health Effects",
    category_id: 2,
    order_number: 20
  },
  // Digital Well-being Category
  {
    text: "My sleep schedule is affected by late-night social media use.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 21
  },
  {
    text: "I want to develop healthy habits for responsible social media use.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 22
  },
  {
    text: "I am aware of how much time I spend on social media.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 23
  },
  {
    text: "I feel in control of how I use social media.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 24
  },
  {
    text: "I set limits for my social media use to maintain a healthy balance.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 25
  },
  {
    text: "I take regular breaks from social media to maintain my well-being.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 26
  },
  {
    text: "I use social media intentionally rather than out of habit.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 27
  },
  {
    text: "I use social media to support my emotional well-being.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 28
  },
  {
    text: "I reflect on how social media affects my mood.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 29
  },
  {
    text: "I minimize my social media usage when I notice negative effects on my well-being.",
    category: "Digital Well-being",
    category_id: 3,
    order_number: 30
  }
];

async function seed() {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced');

    // Create admin user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', salt);
    
    await Admin.create({
      email: process.env.ADMIN_EMAIL || 'admin@digiwise.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User'
    });
    console.log('Admin user created');

    // Create questions
    await Question.bulkCreate(questions);
    console.log('Questions created');

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed(); 