export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  authorId: string;
  publishedAt: string;
  readingTime: number;
  claps: number;
  tags: string[];
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "The Art of Slow Productivity in a Fast World",
    subtitle: "Why doing less, better, is the secret to meaningful work",
    content: `<p>In an age defined by constant connectivity and the relentless pursuit of efficiency, there's a growing movement that challenges everything we thought we knew about productivity. It's not about doing more — it's about doing less, with intention.</p>

<h2>The Myth of Busyness</h2>
<p>We've been conditioned to equate busyness with importance. Our calendars are packed, our inboxes overflowing, and our to-do lists seem to grow by the hour. But research consistently shows that this approach leads to burnout, not breakthrough.</p>

<p>Cal Newport, in his recent work, argues for what he calls "slow productivity" — a philosophy that emphasizes working at a natural pace, focusing on fewer things, and obsessing over quality. It's a radical departure from the hustle culture that has dominated the past decade.</p>

<blockquote>The most productive people I know don't try to do everything. They try to do the right things, with full attention and care.</blockquote>

<h2>Three Principles of Slow Productivity</h2>
<p>The framework rests on three interconnected principles that, when practiced together, create a sustainable approach to meaningful work:</p>

<h3>1. Do Fewer Things</h3>
<p>This isn't about being lazy. It's about being strategic. When you reduce the number of projects and commitments competing for your attention, you create space for deep work — the kind of focused, uninterrupted thinking that produces your best output.</p>

<h3>2. Work at a Natural Pace</h3>
<p>Throughout most of human history, work followed seasonal and natural rhythms. The industrial revolution changed that, and the digital revolution accelerated it further. Slow productivity means allowing some seasons to be more intense than others, and accepting that not every week needs to be equally productive.</p>

<h3>3. Obsess Over Quality</h3>
<p>When you do fewer things and work at a sustainable pace, you can invest more attention in making each thing exceptional. Quality becomes your competitive advantage.</p>

<h2>Putting It Into Practice</h2>
<p>Start small. Pick one project that matters most. Block time for it. Protect that time ruthlessly. Notice what happens to the quality of your work — and the quality of your life.</p>

<p>The irony of slow productivity is that by doing less, you often end up accomplishing more of what truly matters. And isn't that the whole point?</p>`,
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=450&fit=crop",
    authorId: "1",
    publishedAt: "2026-03-01",
    readingTime: 8,
    claps: 4520,
    tags: ["Productivity", "Work", "Self Improvement"],
    featured: true,
  },
  {
    id: "2",
    title: "Why Every Developer Should Learn Systems Thinking",
    subtitle: "Moving beyond code to understand complex systems",
    content: `<p>Software development is about more than writing code. It's about understanding how complex systems interact, fail, and evolve. Systems thinking — the practice of viewing problems as parts of an overall system — is perhaps the most underrated skill a developer can cultivate.</p>

<h2>What Is Systems Thinking?</h2>
<p>At its core, systems thinking is about seeing the forest, not just the trees. It's about understanding feedback loops, emergent behavior, and unintended consequences. In software, this translates to better architecture, fewer bugs, and more resilient applications.</p>

<p>Consider a simple example: you're building a feature that sends email notifications. A traditional approach focuses on the feature itself. A systems thinker asks: What happens when the email service goes down? What if a user gets 100 notifications in an hour? How does this affect server load during peak times?</p>

<h2>The Feedback Loop</h2>
<p>Every system has feedback loops — mechanisms by which the output of a system influences its input. In software, these are everywhere: user behavior changes based on UI design, which changes metrics, which changes product decisions, which changes UI design.</p>

<p>Understanding these loops helps you anticipate problems before they occur and design systems that are self-correcting rather than self-destructive.</p>`,
    coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop",
    authorId: "2",
    publishedAt: "2026-02-28",
    readingTime: 12,
    claps: 3210,
    tags: ["Programming", "Software Development", "Technology"],
  },
  {
    id: "3",
    title: "Designing for Emotion: Beyond Usability",
    subtitle: "How the best products make people feel, not just function",
    content: `<p>We've spent decades perfecting usability. We know how to make interfaces intuitive, efficient, and accessible. But the products that truly resonate — the ones people love, recommend, and can't imagine living without — go beyond usability. They design for emotion.</p>

<h2>The Emotional Layer</h2>
<p>Don Norman introduced the concept of emotional design over two decades ago, identifying three levels: visceral (immediate reaction), behavioral (experience of use), and reflective (long-term impact). Yet most design processes still focus primarily on the behavioral level.</p>

<p>Think about the last time a product made you smile. Not because it worked correctly — that's table stakes. But because it surprised you, delighted you, or made you feel understood. That's emotional design.</p>`,
    coverImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=450&fit=crop",
    authorId: "3",
    publishedAt: "2026-02-25",
    readingTime: 6,
    claps: 2890,
    tags: ["Design", "UX", "Product"],
  },
  {
    id: "4",
    title: "The Quiet Revolution in Climate Technology",
    subtitle: "How a new generation of startups is tackling the climate crisis",
    content: `<p>While headlines focus on political debates about climate change, a quiet revolution is happening in labs, garages, and offices around the world. A new generation of climate technology startups is developing solutions that could fundamentally alter our relationship with carbon emissions.</p>

<h2>Beyond Solar and Wind</h2>
<p>Renewable energy has been the poster child of climate tech, and for good reason. But the next wave of innovation goes much further: direct air capture, enhanced weathering, green hydrogen, sustainable aviation fuel, and carbon-negative building materials.</p>`,
    coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=450&fit=crop",
    authorId: "5",
    publishedAt: "2026-02-22",
    readingTime: 10,
    claps: 5670,
    tags: ["Climate", "Technology", "Science"],
    featured: true,
  },
  {
    id: "5",
    title: "What I Learned Building a Company from Zero to IPO",
    subtitle: "Lessons from a decade of building, breaking, and rebuilding",
    content: `<p>Ten years ago, I started a company in a coffee shop with a laptop and an idea. Last month, we rang the opening bell. Here are the honest lessons — the ones nobody puts in their LinkedIn posts.</p>

<h2>Year One: The Delusion of the Idea</h2>
<p>Your idea doesn't matter as much as you think. Execution matters more, and the ability to adapt matters most. We pivoted three times in our first year. Each pivot felt like failure. In retrospect, each was a step closer to product-market fit.</p>`,
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=450&fit=crop",
    authorId: "4",
    publishedAt: "2026-02-20",
    readingTime: 15,
    claps: 8930,
    tags: ["Startup", "Entrepreneurship", "Business"],
  },
  {
    id: "6",
    title: "The Case for Digital Minimalism in 2026",
    subtitle: "Reclaiming your attention in the age of infinite scroll",
    content: `<p>The average person checks their phone 96 times a day. We spend nearly 7 hours daily looking at screens. And yet, when asked, most people say technology isn't making them happier. Something has gone wrong.</p>`,
    coverImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    authorId: "1",
    publishedAt: "2026-02-18",
    readingTime: 7,
    claps: 6120,
    tags: ["Technology", "Self Improvement", "Mindfulness"],
  },
  {
    id: "7",
    title: "Understanding React Server Components",
    subtitle: "A practical guide to the future of React rendering",
    content: `<p>React Server Components represent the most significant architectural shift in React since hooks. They fundamentally change how we think about rendering, data fetching, and the boundary between client and server.</p>`,
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=450&fit=crop",
    authorId: "2",
    publishedAt: "2026-02-15",
    readingTime: 14,
    claps: 4780,
    tags: ["React", "Programming", "JavaScript"],
  },
  {
    id: "8",
    title: "Why Accessibility Is a Design Superpower",
    subtitle: "Building inclusive products creates better experiences for everyone",
    content: `<p>Accessibility isn't a checklist. It's not something you tack on at the end of a project. It's a design philosophy that, when embraced fully, makes every product better for every user.</p>`,
    coverImage: "https://images.unsplash.com/photo-1586953208270-767889fa9b0e?w=800&h=450&fit=crop",
    authorId: "3",
    publishedAt: "2026-02-12",
    readingTime: 9,
    claps: 3450,
    tags: ["Accessibility", "Design", "UX"],
  },
  {
    id: "9",
    title: "The Rise of Decentralized Finance",
    subtitle: "How crypto is reshaping the global economy",
    content: `<p>Decentralized finance (DeFi) is more than just a buzzword; it's a fundamental shift in how people interact with money. By eliminating intermediaries and leveraging smart contracts, DeFi promises access, transparency, and immutability—but it also introduces new risks.</p>`,
    coverImage: "https://images.unsplash.com/photo-1620844445122-702d4fa431de?w=800&h=450&fit=crop",
    authorId: "2",
    publishedAt: "2026-02-10",
    readingTime: 11,
    claps: 4020,
    tags: ["Finance", "Crypto", "Technology"],
  },
  {
    id: "10",
    title: "Mindful Eating: A Beginner's Guide",
    subtitle: "Slow down, savor your food, and transform your relationship with eating",
    content: `<p>Mindful eating is about paying full attention to the experience of food. It encourages awareness of hunger, taste, and satiety, which can lead to healthier choices and a more peaceful relationship with food.</p>`,
    coverImage: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=450&fit=crop",
    authorId: "1",
    publishedAt: "2026-02-08",
    readingTime: 7,
    claps: 2890,
    tags: ["Health", "Wellness", "Mindfulness"],
  },
  {
    id: "11",
    title: "Edge AI: Bringing Intelligence to Devices",
    subtitle: "Why processing data on the edge matters for speed and privacy",
    content: `<p>Edge AI refers to running artificial intelligence algorithms directly on devices rather than in the cloud. This reduces latency, saves bandwidth, and protects user data—but it also demands efficient models and hardware.</p>`,
    coverImage: "https://images.unsplash.com/photo-1553532075-1dd21b8763f1?w=800&h=450&fit=crop",
    authorId: "2",
    publishedAt: "2026-02-05",
    readingTime: 13,
    claps: 2340,
    tags: ["AI", "Tech", "Innovation"],
  },
  {
    id: "12",
    title: "Urban Gardening for Small Spaces",
    subtitle: "Transform your balcony into a green oasis",
    content: `<p>Urban gardening isn't just a trend—it's a necessity for millions living without yards. With creativity and container plants, even the smallest balcony can yield herbs, vegetables, and joy.</p>`,
    coverImage: "https://images.unsplash.com/photo-1506015391300-4802dc4c2bdb?w=800&h=450&fit=crop",
    authorId: "3",
    publishedAt: "2026-02-02",
    readingTime: 5,
    claps: 1760,
    tags: ["Gardening", "Lifestyle", "Sustainability"],
  },
];

export const topics = [
  "Programming", "Data Science", "Technology", "Self Improvement",
  "Writing", "Relationships", "Machine Learning", "Productivity",
  "Politics", "Health", "Science", "Design", "UX", "Startup",
  "Business", "Climate", "JavaScript", "React", "Accessibility",
  "Mindfulness",
];
