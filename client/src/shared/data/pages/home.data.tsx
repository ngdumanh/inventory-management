import {
  IconArrowDown,
  IconArrowsRightLeft,
  IconBrandLinkedin,
  IconBrandTailwind,
  IconBrandTwitter,
  IconBulb,
  IconCheck,
  IconClock,
  IconComponents,
  IconDownload,
  IconListCheck,
  IconMail,
  IconMapPin,
  IconPhoneCall,
  IconRocket,
} from '@tabler/icons-react';
import {
  CallToActionProps,
  ContactProps,
  ContentProps,
  FAQsProps,
  FeaturesProps,
  HeroProps,
  PricingProps,
  SocialProofProps,
  StepsProps,
  TeamProps,
  TestimonialsProps,
} from '../../types';
import heroImg from '~/assets/images/hero.jpg';
import printifyLogo from '~/assets/images/printify.png';
import spredShirtLogo from '~/assets/images/spreadshirt.png';
import printfulLogo from '~/assets/images/printful.png';
import gearmentLogo from '~/assets/images/gearment.png';
import cameraFrontImg from '~/assets/images/camera-front.jpg';
import cameraBackImg from '~/assets/images/camera-back.jpg';
import gasImg from '~/assets/images/gas.jpg';

// Hero data on Home page *******************
export const heroHome: HeroProps = {
  title: <>Say Goodbye to Manual Work - Automate Your TikTok Shop for Maximum Efficiency!</>,
  subtitle: (
    <>
      <span className="hidden md:inline">
        <span className="font-semibold underline decoration-primary-600 decoration-wavy decoration-1 underline-offset-2">
          SyncLista
        </span>{' '}
        simplifies TikTok Shop management by automating product listings and scheduling posts with ease. Boost your
        sales and streamline your workflow with this all-in-one tool designed to help sellers optimize their business
        effortlessly.
      </span>{' '}
    </>
  ),
  callToAction: {
    text: 'Sign up for free',
    href: 'https://www.synclista.com/signup',
    icon: IconDownload,
    targetBlank: true,
  },
  callToAction2: {
    text: 'Learn more',
    href: '/',
  },
  image: {
    src: heroImg,
    alt: 'SyncLista',
  },
};

// SocialProof data on Home page *******************
export const socialProofHome: SocialProofProps = {
  id: 'socialProof-on-home',
  hasBackground: false,
  images: [
    {
      link: 'https://nextjs.org/',
      src: printifyLogo,
      alt: 'NextJs Logo',
    },
    {
      link: 'https://react.dev/',
      src: spredShirtLogo,
      alt: 'React Logo',
    },
    {
      link: 'https://tailwindcss.com/',
      src: printfulLogo,
      alt: 'Tailwind CSS Logo',
    },
    {
      link: 'https://www.typescriptlang.org/',
      src: gearmentLogo,
      alt: 'Typescript Logo',
    },
  ],
};

// Features data on Home page *******************
export const featuresHome: FeaturesProps = {
  id: 'features-on-home',
  hasBackground: false,
  columns: 3,
  header: {
    title: (
      <>
        What you get with <span className="whitespace-nowrap">SyncLista</span>
      </>
    ),
    subtitle:
      "Elevating Your E-commerce Experience: Unlock the Power of Our Platform's Core Features, from Effortless Product Management to Advanced Automation.",
    tagline: 'Features',
  },
  items: [
    {
      title: 'Automated Product Listings',
      description:
        'Streamline your workflow with automated product listings that save time and ensure consistency, allowing you to focus on growing your business.',
      icon: IconBrandTailwind,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Product Design Integration',
      description:
        'Easily manage and upload your print-on-demand designs for custom products, making it simple to create unique, high-quality items.',
      icon: IconComponents,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Scheduled Posting',
      description:
        'Effortlessly schedule your product posts in advance to keep your shop active and engaging without manual intervention.',
      icon: IconListCheck,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Optimized for Sales Growth',
      description:
        'Our platform is designed to optimize your product visibility, ensuring maximum exposure and sales potential through smart features.',
      icon: IconRocket,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'SEO-Enhanced Listings',
      description:
        "Improve your shop's discoverability with SEO-friendly product listings that help you rank higher and attract more customers.",
      icon: IconArrowsRightLeft,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
    {
      title: 'Open to Feedback and Collaboration',
      description:
        'We value your input! Share your ideas, suggestions, or contributions to help us continuously improve our platform.',
      icon: IconBulb,
      callToAction: {
        text: 'Discover now',
        href: '/',
      },
    },
  ],
};

// Content data on Home page *******************
export const contentHomeOne: ContentProps = {
  id: 'contentOne-on-home-one',
  hasBackground: true,
  header: {
    title: 'Aliquip definiebas ad est',
    subtitle: 'Quando cetero his ne, eum admodum sapientem ut',
    tagline: 'Content',
  },
  content:
    'Ne dicta praesent ocurreret has, diam theophrastus at pro. Eos etiam regione ut, persius eripuit quo id. Sit te euismod tacimates.',
  items: [
    {
      title: 'Automated Product Listings',
      description:
        "Automatically upload and list your products on TikTok Shop with ease, eliminating manual work and ensuring consistency in your store's appearance.",
    },
    {
      title: 'Scheduled Posting',
      description:
        'Schedule your product posts in advance, allowing you to plan and maintain a steady stream of content to engage your audience at optimal times.',
    },
    {
      title: 'Sales Insights and Analytics',
      description:
        'Access detailed analytics on product performance, sales trends, and customer engagement to help you make informed decisions and optimize your sales strategy.',
    },
  ],
  image: {
    src: cameraFrontImg,
    alt: 'Colorful Image',
  },
  isReversed: false,
  isAfterContent: false,
};

// Content data on Home page *******************
export const contentHomeTwo: ContentProps = {
  id: 'contentOne-on-home-two',
  hasBackground: true,
  content:
    'Manage your promotional campaigns, including flash sales, directly from the platform. Highlight special deals and boost product visibility during high-traffic times.',
  items: [
    {
      title: 'Promotion and Flash Sale Management',
    },
    {
      title: 'Order Management',
    },
    {
      title: 'Product Design Integration',
    },
    {
      title: 'Bulk Product Import',
    },
    {
      title: 'Real-Time Inventory Sync',
    },
    {
      title: 'Affordable Pricing Plans',
    },
  ],
  image: {
    src: cameraBackImg,
    alt: 'Colorful Image',
  },
  isReversed: true,
  isAfterContent: true,
};

// Steps data on Home page *******************
export const stepsHome: StepsProps = {
  id: 'steps-on-home',
  hasBackground: false,
  isReversed: false,
  isImageDisplayed: true,
  image: {
    src: gasImg,
    alt: 'Steps image',
  },
  header: {
    title: '3 Simple Steps to Use SyncLista',
  },
  items: [
    {
      title: 'Connect Your TikTok Shop',
      description:
        'Begin by linking your TikTok Shop to SyncLista with just a few clicks. This will allow the platform to access your store and sync products automatically.',
      icon: IconArrowDown,
    },
    {
      title: 'Upload or Select Products',
      description:
        'Upload your print-on-demand designs or select existing products from your catalog. SyncLista also supports bulk import to make the process faster and more efficient.',
      icon: IconArrowDown,
    },
    {
      title: 'Schedule and Automate',
      description:
        'Set your posting schedule or let SyncLista automatically post your products at the best times. You can also monitor your sales and performance through the dashboard.',
      icon: IconArrowDown,
    },
    {
      title: 'Ready!',
    },
  ],
};

// Testimonials data on Home page *******************
export const testimonialsHome: TestimonialsProps = {
  id: 'testimonials-on-home',
  hasBackground: true,
  header: {
    title: 'What our customers say about us',
    subtitle: 'Real feedback from business owners who trust our platform',
  },
  testimonials: [
    {
      name: 'Tayla Kirsten',
      job: 'Online Store Owner',
      testimonial: `This tool has completely transformed the way I manage my TikTok Shop! Scheduling posts has never been easier, and my sales have noticeably increased. Highly recommended!`,
      image: {
        src: 'https://images.unsplash.com/photo-1619734086067-24bf8889ea7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Tayla Kirsten',
      },
      href: '/',
    },
    {
      name: 'Silver Jordan',
      job: 'Print-on-Demand Seller',
      testimonial: `I love how easy it is to upload my print-on-demand designs. SyncLista has saved me so much time, and my business is growing faster than ever!`,
      image: {
        src: 'https://images.unsplash.com/photo-1565049786474-1dea82a8b995?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Silver Jordan',
      },
      href: '/',
    },
    {
      name: 'Kelsey Arden',
      job: 'E-commerce Shop Manager',
      testimonial: `Using this platform has been a game-changer for my TikTok Shop. The automated listings and SEO features are a huge plus for my store's visibility!`,
      image: {
        src: 'https://images.unsplash.com/photo-1659057106920-da022cfbc0cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Kelsey Arden',
      },
      href: '/',
    },
    {
      name: 'Sarah Johnson',
      job: 'Dropshipping Specialist',
      testimonial: `SyncLista's automated features make managing my shop so much easier. I no longer have to spend hours manually posting products.`,
      image: {
        src: 'https://images.unsplash.com/photo-1572417884940-c24659be6068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Sarah Johnson',
      },
      href: '/',
    },
    {
      name: 'Keith Young',
      job: 'Beauty Products Reseller',
      testimonial: `The SEO enhancements have really boosted my shop's visibility, and I've noticed more organic traffic coming in. Excellent platform!`,
      image: {
        src: 'https://images.unsplash.com/photo-1694287877106-ee22f764aef1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Keith Young',
      },
      href: '/',
    },
    {
      name: 'Lisa Gordon',
      job: 'Digital Product Seller',
      testimonial: `The product listing automation is incredibly efficient, and the support team is always open to feedback and ideas. Couldn't ask for more!`,
      image: {
        src: 'https://images.unsplash.com/photo-1665984867752-6370ab5ae35e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Lisa Gordon',
      },
      href: '/',
    },
  ],
};

// FAQS data on Home page *******************
export const faqs2Home: FAQsProps = {
  id: 'faqsTwo-on-home',
  hasBackground: false,
  header: {
    title: 'Frequently Asked Questions',
    subtitle: 'Your Top Questions Answered for a Seamless Experience',
    tagline: 'FAQS',
  },
  items: [
    {
      title: 'How do I get started with SyncLista?',
      description: `To get started, simply sign up for an account, link your TikTok Shop, and follow the guided setup to start listing your products automatically.`,
    },
    {
      title: 'Is SyncLista compatible with print-on-demand products?',
      description: `Yes, SyncLista supports both physical and print-on-demand products, allowing you to upload design files and manage product listings with ease.`,
    },
    {
      title: 'Can I schedule product posts in advance?',
      description: `Absolutely! SyncLista lets you schedule product posts to go live at specific times, so you can plan ahead and keep your shop active.`,
    },
    {
      title: 'How does SyncLista help improve my sales?',
      description: `SyncLista optimizes your product listings for better visibility, automates tasks like scheduling posts, and ensures your shop stays active, which helps drive more sales.`,
    },
    {
      title: 'Is there a limit to how many products I can list?',
      description: `There is no limit to the number of products you can list. SyncLista is designed to scale with your business, whether you're managing a few products or hundreds.`,
    },
    {
      title: 'Does SyncLista offer SEO optimization for product listings?',
      description: `Yes, SyncLista helps improve your shop’s search engine ranking by optimizing your product listings with SEO-friendly strategies, boosting your visibility.`,
    },
  ],
};

// Pricing data on Home page *******************
export const pricingHome: PricingProps = {
  id: 'pricing-on-home',
  hasBackground: true,
  header: {
    title: 'Prices for each plan',
    subtitle: 'Affordable Plans Tailored to Your Business Needs',
    // tagline: 'Pricing',
  },
  prices: [
    {
      title: 'basic',
      price: 5,
      period: 'per month',
      items: [
        {
          description: 'Automated product listing',
        },
        {
          description: 'Schedule posts in advance',
        },
        {
          description: 'Basic product listing management',
        },
        {
          description: 'Email support for troubleshooting',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 7-day trial',
        href: '/',
      },
      hasRibbon: false,
    },
    {
      title: 'standard',
      price: 10,
      period: 'per month',
      items: [
        {
          description: 'All features from the $5 Plan',
        },
        {
          description: 'Advanced SEO optimization for listings',
        },
        {
          description: 'Detailed product analytics',
        },
        {
          description: 'Priority email support with limited phone support',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 7-day trial',
        href: '/',
      },
      hasRibbon: true,
      ribbonTitle: 'Popular',
    },
    {
      title: 'premium',
      price: 15,
      period: 'per month',
      items: [
        {
          description: 'All features from the $10 Plan',
        },
        {
          description: 'Personal account manager',
        },
        {
          description: 'Full phone and remote support',
        },
        {
          description: 'Customized reporting and sales insights',
        },
      ],
      callToAction: {
        targetBlank: true,
        text: 'Free 7-day trial',
        href: '/',
      },
      hasRibbon: false,
    },
  ],
};

// Team data on Home page *******************
export const teamHome: TeamProps = {
  id: 'team-on-home',
  hasBackground: false,
  header: {
    title: 'Team Members',
    subtitle: "Meet the Experts Behind Our Platform's Success",
    // tagline: 'Team',
  },
  teams: [
    {
      name: 'Toni Pham LX',
      occupation: 'SEO Consultant',
      image: {
        src: 'https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
        alt: 'Cindy Belcher',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Jose Martin',
      occupation: 'Marketing Tech',
      image: {
        src: 'https://images.unsplash.com/photo-1614583224978-f05ce51ef5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2172&q=80',
        alt: 'Jose Martin',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Clark Bourne',
      occupation: 'Content Manager',
      image: {
        src: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        alt: 'Clark Bourne',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
    {
      name: 'Bella Chase',
      occupation: 'UX Designer',
      image: {
        src: 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80',
        alt: 'Bella Chase',
      },
      items: [
        {
          title: 'Know more on Twitter',
          icon: IconBrandTwitter,
          href: '#',
        },
        {
          title: 'Know more on Linkedin',
          icon: IconBrandLinkedin,
          href: '#',
        },
        {
          title: 'Contact by email',
          icon: IconMail,
          href: '#',
        },
      ],
    },
  ],
};

// Contact data on Home page *******************
export const contactHome: ContactProps = {
  hasBackground: true,
  header: {
    title: 'Get in Touch',
    subtitle: "We're Here to Help – Reach Out Anytime!",
    tagline: 'Contact',
  },
  content: 'Our team is ready to assist you with any questions or support. Feel free to contact us anytime for help!',
  items: [
    {
      title: 'Our Address',
      description: ['25275 Potrero Valley Rd #82', 'Potrero, CA 91963, USA'],
      icon: IconMapPin,
    },
    {
      title: 'Contact',
      description: ['Mobile: +1 (564) 201-8560', 'Mail: admin@synclista.com'],
      icon: IconPhoneCall,
    },
    {
      title: 'Working hours',
      description: ['Monday - Friday: 08:00 - 17:00', 'Saturday & Sunday: 08:00 - 12:00'],
      icon: IconClock,
    },
  ],
  form: {
    title: 'Ready to Get Started?',
    inputs: [
      {
        type: 'text',
        name: 'name',
        autocomplete: 'off',
        placeholder: 'Your name',
      },
      {
        type: 'email',
        name: 'email',
        autocomplete: 'on',
        placeholder: 'Your email address',
      },
    ],
    textarea: {
      cols: 30,
      rows: 5,
      name: 'textarea',
      placeholder: 'Write your message...',
    },
    btn: {
      title: 'Send Message',
      type: 'submit',
    },
  },
};

// CallToAction data *******************
export const callToAction2Home: CallToActionProps = {
  title: 'SyncLista',
  subtitle: 'The Ultimate Tool to Simplify and Automate Your TikTok Shop Management',
  callToAction: {
    text: 'Sign up for free',
    href: '/',
    icon: IconDownload,
  },
  items: [
    {
      title: 'Sign up for free',
      description: 'Join Us Today and Start Boosting Your Business – No Costs, No Commitments!',
      href: '/',
    },
    {
      title: 'Learn more',
      description:
        'Discover How Our Platform Can Help Elevate Your Business – Explore More Features and Benefits Today!',
      href: '/',
    },
    {
      title: 'Subscribe',
      description: 'Stay Updated with the Latest Tips, Offers, and Updates – Direct to Your Inbox!',
      form: {
        icon: IconMail,
        input: {
          type: 'email',
          name: 'email',
          autocomplete: 'email',
          placeholder: 'Enter your email address',
        },
        btn: {
          title: 'Subscribe',
          type: 'submit',
        },
      },
    },
  ],
};
