# Day 6: Malware Analysis - HopHelper.exe

**Room Link:** [Advent of Cyber 2025](https://tryhackme.com/room/adventofcyber2025)

## 🎄 Scenario Overview
Today’s challenge puts you in the role of **Elf McBlue**, a malware analyst responding to a suspicious email containing an unsolicited executable: **HopHelper.exe**. This challenge introduc es the foundations of malware analysis: static analysis, dynamic analysis, and the use of sandbox tools.

## 🎯 Learning Objectives
In this room, you will:
*   Understand the difference between **static** and **dynamic** malware analysis.
*   Use analysis tools safely in a virtual machine sandbox.
*   Extract strings, hashes, indicators, and behavioral artifacts.
*   Identify persistence mechanisms.
*   Observe malicious network communication.

## 🖥️ Machine Setup
**The Golden Rule:** Never run untrusted executables on a machine you care about.
This room provides a safe, isolated VM. `HopHelper.exe` is located on the Desktop in the `HopHelper` folder.

## 2. Static Analysis – Investigating Without Running
Static analysis gives early indicators without executing the file.

### 2.1 Using PeStudio
Open **PeStudio** from the desktop shortcut and load `HopHelper.exe`.

**What To Look For:**
*   File metadata
*   Imports (capabilities like networking)
*   Indicators
*   Strings (IPs, URLs, commands)
*   Checksums

### ✅ Your Answers
**SHA256 hash:**
`F29C270068F865EF4A747E2683BFA07667BF64E768B38FBB9A2750A3D879CA33`

**Flag found in strings:**
`THM{STRINGS_FOUND}`

## 3. Dynamic Analysis – Executing Safely
Dynamic analysis examines **behavior**. We allow the malware to run inside the isolated VM and observe what it touches using **Regshot** and **ProcMon**.

### 3.1 Persistence Check with Regshot
1.  Open **Regshot**.
2.  Set output folder to Desktop.
3.  Take **1st shot** (baseline).
4.  Run `HopHelper.exe`.
5.  Take **2nd shot**.
6.  Click **Compare**.

### ✅ Your Answer
**Registry persistence key created:**
`HKU\S-1-5-21-1966530601-3185510712-10604624-1008\Software\Microsoft\Windows\CurrentVersion\Run\HopHelper`

*This indicates the malware is configured to automatically execute every time the user logs in.*

### 3.2 Behavioral Monitoring with Process Monitor (ProcMon)
1.  Start **ProcMon**.
2.  Execute `HopHelper.exe`.
3.  Allow ~1 minute to gather data.
4.  Stop capture.
5.  Add filters:
    *   Process Name: `HopHelper.exe`
    *   Operations containing: `TCP`

### ✅ Your Answer
**Network protocol used:**
`http`

*The malware communicates over plain HTTP, which is typical for simple malware beacons.*

## Challenge Answers Summary
| Question | Answer |
| :--- | :--- |
| **SHA256 of HopHelper.exe** | `F29C270068F865EF4A747E2683BFA07667BF64E768B38FBB9A2750A3D879CA33` |
| **Flag inside strings** | `THM{STRINGS_FOUND}` |
| **Registry persistence key** | `HKU\...\Software\Microsoft\Windows\CurrentVersion\Run\HopHelper` |
| **Network protocol used** | `http` |

## Final Thoughts
Day 6 introduces realistic malware investigation techniques: hashing, strings analysis, registry monitoring, and network detection. This is foundational knowledge for real-world SOC workflows.
