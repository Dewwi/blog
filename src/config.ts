// All personal settings live here. Edit this file, nothing else, to rebrand.
export const config = {
  name: 'David Lequin',
  url: 'https://david.lequin.dev',
  title: 'David Lequin',
  tagline: 'Agents are easy. Production is hard.',
  bio: '10+ years wrangling data, now wrangling AI agents. Building cool stuff with Claude and writing up what works, what doesn\'t, and what caught fire. London.',
  location: 'London',
  email: 'hello@lequin.dev', // placeholder: change to your real address
  links: {
    linkedin: 'https://www.linkedin.com/in/david-lequin/',
    github: 'https://github.com/Dewwi',
    hashnode: 'https://hashnode.com/@dle',
  },
  topics: [
    'AI agent infrastructure',
    'Running agents on Kubernetes',
    'Evals and observability',
    'Data engineering for AI',
    'Honest production war stories',
  ],
  buttondown: { username: 'dewwi' }, // placeholder: your Buttondown username
  analytics: {
    goatcounter: { enabled: false, code: 'your-code' }, // https://your-code.goatcounter.com
  },
  postsPerHomePage: 5,
} as const;
