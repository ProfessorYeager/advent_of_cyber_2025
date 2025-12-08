const journalEntries = [
    {
        id: 'day-01',
        title: 'Day 1: Linux CLI - Shells Bells',
        date: '2025-12-01T12:00:00',
        excerpt: 'Walkthrough for Day 1: Linux CLI - Shells Bells.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Linux', 'CLI'],
        file: 'walkthroughs/day-01.md',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop' // Linux terminal/code
    },
    {
        id: 'day-02',
        title: 'Day 2: Phishing - Merry Clickmas',
        date: '2025-12-02T12:00:00',
        excerpt: 'Walkthrough for Day 2: Phishing - Merry Clickmas. Learn about social engineering and phishing attacks.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Phishing'],
        file: 'walkthroughs/day-02.md',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop' // Phishing/Email
    },
    {
        id: 'day-03',
        title: 'Day 3: Splunk Basics - Did you SIEM?',
        date: '2025-12-03T12:00:00',
        excerpt: 'Walkthrough for Day 3: Splunk Basics. Investigate a ransomware attack using Splunk.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Splunk', 'SIEM'],
        file: 'walkthroughs/day-03.md',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop' // Data/Analytics
    },
    {
        id: 'day-04',
        title: 'Day 4: AI in Security - old sAInt nick',
        date: '2025-12-04T12:00:00',
        excerpt: 'Walkthrough for Day 4: AI in Security. Use AI to generate exploits, analyze logs, and review code.',
        tags: ['TryHackMe', 'AdventOfCyber', 'AI', 'Security'],
        file: 'walkthroughs/day-04.md',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop' // AI/Robot
    },
    {
        id: 'day-05',
        title: 'Day 5: IDOR - Santa\'s Little IDOR',
        date: '2025-12-05T12:00:00',
        excerpt: 'Walkthrough for Day 5: IDOR. Learn to spot and exploit Insecure Direct Object References to access unauthorized data.',
        tags: ['TryHackMe', 'AdventOfCyber', 'IDOR', 'Web'],
        file: 'walkthroughs/day-05.md',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop' // Web/Code
    },
    {
        id: 'day-06',
        title: 'Day 6: Malware Analysis - Egg-xecutable',
        date: '2025-12-06T12:00:00',
        excerpt: 'Walkthrough for Day 6: Malware Analysis. Learn static and dynamic analysis with PeStudio, Regshot, and ProcMon.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Malware', 'Analysis'],
        file: 'walkthroughs/day-06.md',
        image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?q=80&w=1000&auto=format&fit=crop' // Malware/Virus
    },
    {
        id: 'day-07',
        title: 'Day 7: Network Discovery - Scan-ta Clause',
        date: '2025-12-07T12:00:00',
        excerpt: 'Walkthrough for Day 7: Network Scanning. Discover hidden services using Nmap, Netcat, and Dig.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Network', 'Nmap'],
        file: 'walkthroughs/day-07.md',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=1000&auto=format&fit=crop' // Network/Server
    },
    {
        id: 'day-08',
        title: 'Day 8: AI Injection - Exploiting an AI Agent',
        date: '2025-12-08T12:00:00',
        excerpt: 'Walkthrough for Day 8: Exploiting an AI Agent. Learn how to perform prompt injection against LLMs.',
        tags: ['TryHackMe', 'AdventOfCyber', 'AI', 'PromptInjection'],
        file: 'walkthroughs/day-08.md',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop' // AI/Brain
    },
    {
        id: 'day-09',
        title: 'Day 9: Passwords - A Cracking Christmas',
        date: '2025-12-09T12:00:00',
        excerpt: 'Walkthrough for Day 9: Passwords. Introduction to password cracking.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Passwords', 'Cracking'],
        file: 'walkthroughs/day-09.md',
        image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1000&auto=format&fit=crop' // Matrix/Security
    },
    {
        id: 'day-10',
        title: 'Day 10: SOC Alert Triaging - Tinsel Triage',
        date: '2025-12-10T12:00:00',
        excerpt: 'Walkthrough for Day 10: SOC Alert Triaging. Learn how to investigate and classify security alerts.',
        tags: ['TryHackMe', 'AdventOfCyber', 'SOC', 'Triage'],
        file: 'walkthroughs/day-10.md',
        image: 'https://images.unsplash.com/photo-1563206767-5b1d972d9fc5?q=80&w=1000&auto=format&fit=crop' // Monitor/Screen
    },
    {
        id: 'day-11',
        title: 'Day 11: XSS - Merry XSSMas',
        date: '2025-12-11T12:00:00',
        excerpt: 'Walkthrough for Day 11: XSS. Understanding Cross-Site Scripting vulnerabilities.',
        tags: ['TryHackMe', 'AdventOfCyber', 'XSS', 'Web'],
        file: 'walkthroughs/day-11.md',
        image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=1000&auto=format&fit=crop' // Code/Script
    },
    {
        id: 'day-12',
        title: 'Day 12: Phishing - Phishmas Greetings',
        date: '2025-12-12T12:00:00',
        excerpt: 'Walkthrough for Day 12: Phishing. Analyzing advanced phishing techniques.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Phishing', 'Email'],
        file: 'walkthroughs/day-12.md',
        image: 'https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=1000&auto=format&fit=crop' // Hack/Lock
    },
    {
        id: 'day-13',
        title: 'Day 13: YARA Rules - YARA mean one!',
        date: '2025-12-13T12:00:00',
        excerpt: 'Walkthrough for Day 13: YARA Rules. Writing rules to detect malware patterns.',
        tags: ['TryHackMe', 'AdventOfCyber', 'YARA', 'Malware'],
        file: 'walkthroughs/day-13.md',
        image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=1000&auto=format&fit=crop' // Magnifying Glass/Code
    },
    {
        id: 'day-14',
        title: 'Day 14: Containers - DoorDasher\'s Demise',
        date: '2025-12-14T12:00:00',
        excerpt: 'Walkthrough for Day 14: Containers. Exploiting container vulnerabilities.',
        tags: ['TryHackMe', 'AdventOfCyber', 'Containers', 'Docker'],
        file: 'walkthroughs/day-14.md',
        image: 'https://images.unsplash.com/photo-1605745341117-9583c1f90dc5?q=80&w=1000&auto=format&fit=crop' // Containers
    }
];
