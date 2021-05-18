class FirebaseArticle {
  constructor(id, title, href, topic, stars, note, createdAt) {
    this.id = id;
    this.title = title;
    this.href = href;
    this.topic = topic;
    this.stars = stars;
    this.read = 0;
    this.note = note;
    this.createdAt = createdAt;
    this.deleted = false;
  }
}

class EngramArticle extends FirebaseArticle {
  constructor(id, title, href, stars, note, createdAt) {
    super(id, title, href, 'Engram', stars, note, createdAt);
  }
}

const articles = [
  {
    id: 'initial_article_1',
    title: 'Hello Engram!',
    href: 'https://engram.netlify.app/',
    stars: 4,
    note: 'Engram is a personal tracking system for online learning resources.',
    createdAt: 100,
  },
  {
    id: 'initial_article_2',
    title: 'Rate your article',
    href: 'https://engram.netlify.app/',
    stars: 0,
    note: 'Prioritize your reading list by adding stars!',
    createdAt: 90,
  },
  {
    id: 'initial_article_3',
    title: 'Repetition is the mother of learning',
    href: 'https://engram.netlify.app/',
    stars: 0,
    note: 'Record how many times you visited your learning resource. See unread articles easily to schedule your next reading.',
    createdAt: 80,
  },
  {
    id: 'initial_article_4',
    title: 'Leave a note to keep your thoughts',
    href: 'https://engram.netlify.app/',
    stars: 0,
    note: 'Make a short note to capture your ideas. You can edit them as you revisit the article.',
    createdAt: 70,
  },
  {
    id: 'initial_article_5',
    title: 'Engram keeps them organized',
    href: 'https://engram.netlify.app/',
    stars: 0,
    note: 'All topics are sorted in alphabetical order so that you can easily find them. Articles within topics are sorted in reverse chronological order, placing the recent addition on the top of the list.',
    createdAt: 60,
  },
];

export const getInitialArticlesFirebaseObject = () => {
  const initialArticles = articles.map(
    ({ id, title, href, stars, note, createdAt }) =>
      new EngramArticle(id, title, href, stars, note, createdAt)
  );

  const articlesObject = initialArticles.reduce((obj, article) => {
    const { id, ...rest } = article;

    obj[id] = {
      ...rest,
    };
    return obj;
  }, {});

  return articlesObject;
};
