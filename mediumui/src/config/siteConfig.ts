// Centralized website configuration
// Update values here to automatically update across the entire website

export const siteConfig = {
  // Website Identity
  website: {
    name: "Webemalu",
    domain: "webemalu.com",
    tagline: "Where thoughtful voices share ideas that matter",
    description: "Webemalu is where thoughtful voices share ideas, stories, and perspectives that matter. We're building a platform that rewards quality thinking and meaningful connections.",
  },

  // Footer Configuration
  footer: {
    copyright: `© ${new Date().getFullYear()} Webemalu. All rights reserved.`,
    links: [
      { label: "About", href: "/about" },
      { label: "Help", href: "/help" },
      { label: "Careers", href: "/careers" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },

  // Navigation Configuration
  navigation: {
    main: [
      { to: "/", label: "Home", icon: "Home" },
      { to: "/write", label: "Write", icon: "Edit" },
      { to: "/topics", label: "Topics", icon: "Hash" },
      { to: "/bookmarks", label: "Bookmarks", icon: "Bookmark" },
      { to: "/notifications", label: "Notifications", icon: "Bell" },
    ],
  },

  // Hero Sections
  heroes: {
    home: {
      title: "Stay curious.",
      subtitle: "Discover stories, thinking, and expertise from writers on any topic.",
    },
    about: {
      title: "About Webemalu",
      subtitle: "Webemalu is where thoughtful voices share ideas, stories, and perspectives that matter. We're building a platform that rewards quality thinking and meaningful connections.",
      cta: "Start Writing",
    },
    careers: {
      title: "Careers at Webemalu",
      subtitle: "Join us in building the best place for ideas to take shape",
      description: "We're a team of writers, thinkers, and builders passionate about creating meaningful connections through great stories.",
    },
    help: {
      title: "How can we help you?",
      subtitle: "Find answers to common questions and get support",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Get in touch with our team",
    },
  },

  // Button Labels
  buttons: {
    common: {
      readMore: "Read More",
      showLess: "Show Less",
      learnMore: "Learn More",
      getStarted: "Get Started",
      startWriting: "Start Writing",
      browseAll: "Browse All",
      applyNow: "Apply Now",
      contactUs: "Contact Us",
      back: "Back",
      next: "Next",
      previous: "Previous",
      save: "Save",
      cancel: "Cancel",
      submit: "Submit",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
    },
    auth: {
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign Out",
      createAccount: "Create Account",
      welcome: "Welcome back!",
      welcomeNew: "Welcome to Webemalu!",
    },
    social: {
      follow: "Follow",
      following: "Following",
      unfollow: "Unfollow",
      mute: "Mute",
      unmute: "Unmute",
      share: "Share",
      bookmark: "Bookmark",
      bookmarked: "Bookmarked",
    },
    article: {
      publish: "Publish",
      update: "Update",
      delete: "Delete",
      edit: "Edit",
      clap: "Clap",
      readTime: "min read",
      views: "views",
      responses: "Responses",
    },
  },

  // Common UI Text
  ui: {
    loading: "Loading...",
    error: {
      generic: "Something went wrong",
      network: "Network error",
      notFound: "Page not found",
      unauthorized: "Please sign in",
    },
    success: {
      saved: "Saved successfully",
      updated: "Updated successfully",
      deleted: "Deleted successfully",
      sent: "Message sent successfully",
    },
    empty: {
      articles: "No articles found",
      bookmarks: "No saved articles yet",
      notifications: "No new notifications",
      search: "No results found",
    },
    placeholders: {
      email: "you@example.com",
      password: "•••••••",
      name: "Your name",
      search: "Search articles, topics, and writers...",
      message: "Type your message here...",
    },
  },

  // Contact Information
  contact: {
    email: "support@webemalu.com",
    phone: "1-800-WEBEMAL",
    office: "San Francisco, CA",
  },

  // Social Media
  social: {
    twitter: "https://twitter.com/webemalu",
    linkedin: "https://linkedin.com/company/webemalu",
    github: "https://github.com/webemalu",
  },

  // SEO Configuration
  seo: {
    defaultTitle: "Webemalu - Where thoughtful voices share ideas",
    defaultDescription: "Webemalu is where thoughtful voices share ideas, stories, and perspectives that matter.",
    keywords: ["Webemalu", "blogging", "writing", "articles", "stories", "ideas"],
    author: "Webemalu Team",
  },

  // Theme Configuration
  theme: {
    primary: "#000000",
    secondary: "#f7f7f7",
    accent: "#1a8917",
  },
};

// Export individual sections for easier imports
export const {
  website,
  footer,
  navigation,
  heroes,
  buttons,
  ui,
  contact,
  social,
  seo,
  theme,
} = siteConfig;

// Type definitions for better TypeScript support
export type SiteConfig = typeof siteConfig;
export type WebsiteConfig = typeof siteConfig.website;
export type FooterConfig = typeof siteConfig.footer;
export type NavigationConfig = typeof siteConfig.navigation;
export type HeroesConfig = typeof siteConfig.heroes;
export type ButtonsConfig = typeof siteConfig.buttons;
export type UIConfig = typeof siteConfig.ui;
export type ContactConfig = typeof siteConfig.contact;
export type SocialConfig = typeof siteConfig.social;
export type SEOConfig = typeof siteConfig.seo;
export type ThemeConfig = typeof siteConfig.theme;
