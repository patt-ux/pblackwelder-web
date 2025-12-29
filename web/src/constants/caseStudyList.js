import architectureDiagram from '../assets/mgl-cms-1.webp';
import architectureDiagram2 from '../assets/mgl-cms-1.webp';
import architectureDiagram3 from '../assets/mgl-cms-1.webp';
import architectureDiagram4 from '../assets/mgl-cms-1.webp';

export const caseStudyList = [
  {
    id: 'custom-cms-with-react-firebase',
    title: 'Custom Serverless CMS with React & Firebase',
    iconClass: 'faCode',
    teaser: 'A lightweight, low-ops content management system built with React and Firebase. Designed to deliver dynamic content without traditional servers, while remaining scalable, secure, and cost-efficient.',
    problem: 'Traditional CMS platforms introduce unnecessary hosting, maintenance, and performance overhead for small to mid-sized projects. I needed a flexible content management system that could scale, remain cost-efficient, and integrate cleanly with a modern React frontend—without maintaining servers.',
    constraints: [
        'Serverless, low-operations architecture',
        'Predictable costs (free-tier friendly where possible)',
        'Secure authentication for content editors',
        'Fast content delivery to end users',
        'Reusable foundation for future sites'
    ],
    solution: 'I designed and built a custom CMS using Firebase as the backend platform and React for the frontend. All CMS logic runs in Firebase Functions, Google Authentication handles secure user access, and Firestore stores structured website content. The frontend is deployed via Firebase Hosting for fast global delivery.',
    architectureDiagram: architectureDiagram,
    architecture: 'The React application is served from Firebase Hosting. Authenticated users interact with Firebase Functions, which act as the CMS backend and perform all content operations against Firestore. Static assets are delivered through Firebase Hosting or Cloud Storage as needed.',
    keyDecisions: [
        'Serverless backend using Firebase Functions to eliminate server management',
        'Firestore for flexible content schemas and fast reads',
        'Google Authentication for secure, low-friction access control',
        'Decoupled frontend and backend, enabling independent iteration and reuse'
    ],
    outcome: [
        'Zero server maintenance',
        'Fast content updates without redeploying the site',
        'Predictable infrastructure costs',
        'A reusable CMS architecture later extended for additional features and projects'
    ],
    techStack: ['React', 'Firebase', 'Firestore', 'Google Cloud Functions', 'GCP Hosting'],
    techBadges: ['React', 'Firebase', 'Firestore', 'Google Cloud Functions', 'GCP Hosting']
  },
  {
    id: 'gamer-streamer-integration-with-react-firebase',
    title: 'Gamer Streamer Data Caching & API Optimization',
    iconClass: 'faCode',
    teaser: 'A serverless integration that caches YouTube and Twitch stream data to avoid per-visitor API calls. Improves performance, controls costs, and stays within free-tier limits using scheduled jobs and Firestore.',
    problem: 'A gamer-focused website needed to display up-to-date YouTube and Twitch stream thumbnails and video links. Fetching data directly from third-party APIs on every site visit risked exceeding free-tier API quotas, increased latency, and introduced unnecessary bandwidth usage.',
    constraints: [
        'Avoid per-visitor API calls',
        'Stay within free-tier API limits',
        'Reuse the existing CMS infrastructure',
        'Ensure stream data stays reasonably fresh',
        'Keep frontend logic simple and fast',
        'Reuse the existing CMS infrastructure'
    ],
    solution: `<p>I extended the existing CMS architecture by adding a scheduled Firebase Function that periodically fetches stream data from YouTube and Twitch APIs. The results are cached in Firestore and served directly to the React frontend, eliminating the need for live API calls during page visits.</p>`,
    architectureDiagram: architectureDiagram2,
    architecture: 'A scheduled serverless function runs on a defined interval to fetch the latest stream metadata by channel ID. The data is stored in Firestore alongside CMS content. The React frontend reads cached data directly, avoiding real-time API requests.',
    keyDecisions: [
        'Scheduled serverless job to control API usage and cost',
        'Firestore caching to serve data efficiently to all users',
        'Reuse of existing CMS architecture, minimizing new infrastructure',
        'Read-only frontend access for fast, low-latency rendering'
    ],
    outcome: [
        'Zero third-party API calls during normal page visits',
        'Improved page load performance',
        'Controlled and predictable API usage',
        'Demonstrated architectural reuse and extensibility'
    ],
    techStack: ['React', 'Firebase', 'Firestore', 'Google Cloud Functions', 'GCP Hosting'],
    techBadges: ['React', 'Firebase', 'Firestore', 'Google Cloud Functions', 'GCP Hosting']
  },
  {
    id: 'minecraft-server-manager',
    title: 'Cost-Optimized Minecraft Server on Google Cloud Spot VM',
    iconClass: 'faMinecraft',
    teaser: 'A mod-capable Minecraft server running on a Google Cloud Spot VM with persistent storage. Includes a secure React-based admin UI for monitoring, restarts, and connection management—built with cost control in mind.',
    problem: 'My sons wanted a shared Minecraft server they could access with their friends. The server needed to support mods, be publicly accessible, and remain online reliably—without incurring the ongoing costs of a full-priced virtual machine. Additionally, the server required basic safeguards against unauthorized access and griefing.',
    constraints: [
        'Support modded Minecraft',
        'Publicly accessible for friends',
        'Minimize infrastructure cost',
        'Preserve world data even if the VM is terminated',
        'Provide simple administrative controls',
        'Reduce attack surface from random internet scanning'
    ],
    solution: `
    <p>I deployed the Minecraft server on a Google Cloud Spot VM backed by a persistent disk, allowing the instance to be terminated and restarted without data loss. To manage the server, I built a lightweight React-based admin UI hosted on Firebase with Google Authentication.</p>
<p>The admin interface allows authorized users to:</p>
<ul>
<li>Monitor the VM status</li>
<li>Restart the VM if it is preempted</li>
<li>Retrieve the current public IP address for client connections</li>
</ul>
<p>To reduce unwanted access attempts, the Minecraft server runs on a non-standard port, rotated periodically to avoid automated scanning and casual intrusion.</p>
    `,
    architectureDiagram: architectureDiagram3,
    architecture: 'The Minecraft server runs on a Spot VM in Google Cloud. World data and configuration are stored on a persistent disk, ensuring continuity across VM restarts. A React admin site hosted on Firebase provides authenticated access to VM controls and connection details.',
    keyDecisions: [
        'Spot VM to significantly reduce compute costs',
        'Persistent disk to retain world data across VM termination events',
        'Firebase Hosting + React for a simple, fast admin interface',
        'Google Authentication to restrict administrative access',
        'Non-standard, rotating port to limit exposure to automated attacks'
    ],
    outcome: [
        'Fully functional, mod-capable Minecraft server',
        'Reliable data persistence despite Spot VM preemption',
        'Significantly reduced monthly infrastructure cost',
        'Simple, secure admin experience without exposing cloud credentials',
        'A practical example of cost-aware infrastructure design'
    ],
    techStack: ['Firebase Hosting', 'React', 'Google Cloud Spot VMs', 'Cloud Functions (Node.js)', 'Firestore', 'Minecraft'],
    techBadges: ['Firebase Hosting', 'React', 'Google Cloud Spot VMs', 'Cloud Functions (Node.js)', 'Firestore', 'Minecraft']
  },
  {
    id: 'lava-addons-subscription-management',
    title: 'Lava Addons – Subscription & Licensing Platform for WordPress Plugins',
    iconClass: 'faWordpress',
    teaser: 'A serverless subscription and licensing system for WordPress Elementor plugins. Built with React, Firebase, and Stripe to manage users, payments, and license validation across platforms.',
    problem: `<p>Distributing and monetizing WordPress plugins requires more than file downloads. Users need account management, subscriptions, licensing, and a secure way to validate access inside WordPress—without building and maintaining a traditional backend infrastructure.</p>
<p>The goal was to create a lightweight, scalable e-commerce platform that could manage subscriptions and licensing for Lava Addons, a suite of Elementor widgets for WordPress.</p>`,
    constraints: [
      'Serverless, low-maintenance infrastructure',
        'Secure user authentication',
        'Subscription-based monetization',
        'License validation from WordPress plugins',
        'Scalable delivery without managing servers',
        'Clean integration with Stripe'
    ],
    solution: `
    <p>I built a custom e-commerce and licensing platform using React and Firebase. The frontend runs on Firebase Hosting, authentication is handled through Google Auth, and Stripe manages subscriptions and payments.</p>
<p>Firebase Functions serve as the backend API, handling:</p>
<ul>
<li>Subscription lifecycle events (via Stripe webhooks)</li>
<li>License creation, validation, and revocation</li>
<li>Secure communication with WordPress plugins</li>
</ul>
<p>WordPress Elementor plugins authenticate against the licensing API to confirm active subscriptions before enabling premium functionality.</p>`,
    architectureDiagram: architectureDiagram4,
    architecture: 'The React storefront and user dashboard communicate with Firebase Functions, which manage licensing logic and subscription state. Stripe handles payments and sends webhook events back to Firebase Functions. WordPress plugins validate licenses through secured API endpoints.',
    keyDecisions: [
        'Firebase Hosting + React for fast global delivery',
        'Google Authentication for secure user accounts',
        'Stripe subscriptions to manage billing and renewals',
        'Serverless licensing API to validate plugin usage',
        'Decoupled WordPress integration, allowing plugins to remain lightweight'
    ],
    outcome: [
        'Fully serverless e-commerce and licensing platform',
        'Predictable infrastructure costs',
        'Automated subscription management',
        'Secure license enforcement within WordPress',
        'Scalable foundation for additional plugins or products'
    ],
    techStack: ['Firebase Hosting', 'React', 'Google Cloud Functions', 'Firestore', 'Stripe', 'WordPress'],
    techBadges: ['Firebase Hosting', 'React', 'Google Cloud Functions', 'Firestore', 'Stripe', 'WordPress']
  }
];