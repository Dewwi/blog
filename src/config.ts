// All personal settings live here. Edit this file, nothing else, to rebrand.
export const config = {
  name: 'David Lequin',
  url: 'https://david.lequin.dev',
  title: 'David Lequin',
  role: 'Data and AI engineer in London',
  bio: 'Data engineer, then AI engineer in London. I build stuff with Claude and run agents on Kubernetes for a living.',
  location: 'London',
  email: 'david@lequin.dev',
  links: {
    linkedin: 'https://www.linkedin.com/in/david-lequin/',
    github: 'https://github.com/Dewwi',
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
