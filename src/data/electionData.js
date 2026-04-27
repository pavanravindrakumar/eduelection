export const candidates = [
  { id: 1, name: "Rahul Sharma", party: "Progressive Party", symbol: "🌟" },
  { id: 2, name: "Priya Patel", party: "Development Front", symbol: "🌳" },
  { id: 3, name: "Amit Kumar", party: "United Citizens", symbol: "🕊️" },
  { id: 4, name: "NOTA", party: "None of the Above", symbol: "❌" }
];

export const journeySteps = [
  {
    id: 'start',
    title: 'Welcome to Your Journey',
    description: 'Let us guide you through the election process tailored to your current status.',
    options: [
      { text: 'I am a new voter', next: 'new_voter' },
      { text: 'I have voted before', next: 'experienced_voter' }
    ]
  },
  {
    id: 'new_voter',
    title: 'First Time Voter',
    description: 'Welcome! Your first step is to ensure you are registered.',
    options: [
      { text: 'How do I check if I am registered?', next: 'check_registration' },
      { text: 'I know I am not registered yet.', next: 'how_to_register' }
    ]
  },
  {
    id: 'experienced_voter',
    title: 'Welcome Back',
    description: 'As an experienced voter, what would you like to do today?',
    options: [
      { text: 'Check my polling booth', next: 'check_booth' },
      { text: 'Learn about candidates', next: 'learn_candidates' },
      { text: 'Refresh my memory on voting process', next: 'refresh_voting' }
    ]
  },
  {
    id: 'how_to_register',
    title: 'Registration Process',
    description: 'To register, you need to fill out Form 6. You can do this online on the NVSP portal.',
    action: { text: 'Check if you are eligible first', link: '/eligibility' },
    options: [
      { text: 'What documents do I need?', next: 'documents' },
      { text: 'Start over', next: 'start' }
    ]
  },
  {
    id: 'documents',
    title: 'Required Documents',
    description: 'You will need proof of age (e.g., Birth Certificate, 10th mark sheet) and proof of residence (e.g., Aadhar, Passport, Utility Bill).',
    action: { text: 'Ask Assistant for more details', link: '/assistant' },
    options: [
      { text: 'Start over', next: 'start' }
    ]
  },
  {
    id: 'check_registration',
    title: 'Check Electoral Roll',
    description: 'You can search your name on the Electoral Roll via the National Voters Services Portal using your EPIC number or basic details.',
    options: [
      { text: 'Start over', next: 'start' }
    ]
  },
  {
    id: 'refresh_voting',
    title: 'The Voting Process',
    description: 'Familiarize yourself with the Electronic Voting Machine (EVM) and the VVPAT system.',
    action: { text: 'Try the Simulator', link: '/simulator' },
    options: [
      { text: 'Start over', next: 'start' }
    ]
  },
  {
    id: 'check_booth',
    title: 'Find Polling Booth',
    description: 'You can find your polling booth details on the Voter Helpline App or the ECI website using your EPIC number.',
    options: [
      { text: 'Start over', next: 'start' }
    ]
  },
  {
    id: 'learn_candidates',
    title: 'Know Your Candidates',
    description: 'The Election Commission publishes affidavits of all candidates. You can view their educational, financial, and criminal backgrounds.',
    action: { text: 'View Timeline of events', link: '/timeline' },
    options: [
      { text: 'Start over', next: 'start' }
    ]
  }
];
