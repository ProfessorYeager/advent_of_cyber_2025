# Day 4: AI in Security - old sAInt nick

**Room Link:** [AI in Security - old sAInt nick](https://tryhackme.com/room/AIforcyber-aoc2025-y9wWQ1zRgB)

## 🎄 Scenario Overview
Day 4 introduces **Van SolveIT**, TBFC’s new cyber security AI assistant. Unlike most challenges, this room focuses less on commands and more on understanding how AI can support offensive security, defensive analysis, and software security reviews.

## 🎯 Learning Objectives
In this room, you will:
*   Use an AI assistant to generate and execute a security exploit
*   Use AI as a helper during log analysis
*   Use AI to analyze source code for vulnerabilities
*   Reflect on the real-world strengths and weaknesses of AI in cyber security

## 🖥️ Machine Setup
Before starting, deploy both the target VM and the AttackBox. Access Van SolveIT from the AttackBox (or your VPN-connected device) at:
`http://MACHINE_IP`

> **Note:** Expect delays. The model running this room is very slow, and that is normal.

## Stage 1 – Red Team (Exploit Generation)
Van SolveIT provides a Python script designed to exploit a vulnerable web application running on port 5000.

There is one critical step:
**You must update the exploit script with your actual machine’s IP address.**

Inside the script, change:
`TARGET = "http://MACHINE_IP:5000"`
to the real IP.

If this is not corrected, the exploit will fail regardless of what you do next.

Once updated, run the script. It performs a SQL injection attack and prints out a flag.

**Flag:** `THM{SQLI_EXPLOIT}`

### Key Takeaways
*   AI-generated scripts should always be reviewed before execution
*   AI is helpful, but should not be treated as a source of unquestionable truth
*   Understanding what a script does matters more than running it blindly

## Stage 2 – Blue Team (Log Analysis)
In this stage, Van SolveIT guides you through analyzing logs from a previous attack.

The AI does a reasonable job summarizing what happened, but the key learning here is:
**AI helps, but humans must verify.**

Encourage students to compare the AI’s summary with the actual log content:
*   Look for unusual user agents
*   Review suspicious paths (like `shell.php` command execution)
*   Identify repeated or abnormal requests
*   Observe timestamps and activity spikes

Completing all parts of the showcase unlocks the main room flag.

**Flag:** `THM{AI_MANIA}`

## Stage 3 – Software Security (Code Review)
The final stage shows how Van SolveIT can analyze source code and highlight potential vulnerabilities.

AI will correctly identify obvious issues (like SQL injection opportunities or unsafe input handling), but this stage is valuable because it shows:
*   AI is helpful for spotting patterns
*   AI is less reliable for framework-specific issues
*   AI often uses generic advice
*   Developers must confirm everything manually

## Instructor Notes and Tips
Here are the practical insights that make this room easier for students:

1.  **The AI model responds slowly.**
    Don’t be surprised if it hangs for a minute or more before showing an answer. This is normal for this room’s setup.

2.  **The biggest student mistake is forgetting to update the script’s IP address.**
    If the exploit script fails, this is almost always the reason.

3.  **This is a gentle introduction to AI-assisted security work.**
    Today isn’t meant to be technically difficult. Instead, it's teaching the concept of **AI-augmented workflows**, not AI automation.

4.  **Focus on usable skills.**
    This room provides a good moment to teach students:
    *   how to verify AI output
    *   how to reason about AI-assisted results
    *   why human oversight is essential

## Challenge Answers
*   Final showcase flag: `THM{AI_MANIA}`
*   Exploit script flag: `THM{SQLI_EXPLOIT}`
