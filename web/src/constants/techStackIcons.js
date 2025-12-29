export const getTechBadge = (tech) => {
    switch (tech) {
      case 'React':
        return <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React" />;
      case 'Node.js':
        return <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white" alt="Node.js" />;
      case 'Firebase':
        return <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=flat&logo=firebase" alt="Firebase" />;
      case 'Firestore':
        return <img src="https://img.shields.io/badge/Firestore-4285F4?style=flat&logo=firebase&logoColor=white" alt="Firestore" />;
      case 'Firebase Hosting':
        return <img src="https://img.shields.io/badge/Firebase%20Hosting-4285F4?style=flat&logo=firebase&logoColor=white" alt="Firebase Hosting" />;
      case 'Cloud Functions (Node.js)':
        return <img src="https://img.shields.io/badge/Cloud%20Functions%20(Node.js)-43853D?style=flat&logo=node.js&logoColor=white" alt="Cloud Functions (Node.js)" />;
      case 'Google Cloud Spot VMs':
        return <img src="https://img.shields.io/badge/Google%20Cloud%20Spot%20VMs-4285F4?style=flat&logo=google-cloud&logoColor=white" alt="Google Cloud Spot VMs" />;
      case 'Google Cloud':
        return <img src="https://chatgpt.com/c/6951a3d0-2094-8325-a01d-c9bf721524d7#:~:text=shields.io/badge/-,Google,-%2520Cloud%2D4285F4%3Fstyle" alt="Google Cloud" />;
      case 'Google Cloud Functions':
        return <img src="https://img.shields.io/badge/Google%20Cloud%20Functions-4285F4?style=flat&logo=google-cloud&logoColor=white" alt="Google Cloud Functions" />;
      case 'GCP Hosting':
        return <img src="https://img.shields.io/badge/GCP%20Hosting-4285F4?style=flat&logo=google-cloud&logoColor=white" alt="GCP Hosting" />;
        case 'WordPress':
        return <img src="https://img.shields.io/badge/WordPress-21759B?style=flat&logo=wordpress&logoColor=white" alt="WordPress" />;
      case 'Minecraft':
        return <img src="https://img.shields.io/badge/Minecraft-62B47A?style=flat&logo=minecraft&logoColor=white" alt="Minecraft" />;
      case 'Stripe':
        return <img src="https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white" alt="Stripe" />;
      case 'YouTube API':
        return <img src='https://img.shields.io/badge/YouTube-FF0000?style=flat&logo=youtube&logoColor=white' alt="YouTube API" />;
      case 'Twitch API':
        return <img src='https://img.shields.io/badge/Twitch-9146FF?style=flat&logo=twitch&logoColor=white' alt="Twitch API" />;
      default:
        return tech;
    }
  }