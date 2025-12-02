# Day 1: Linux CLI - Shells Bells

## Introduction
Day 1 of Advent of Cyber introduces you to the Linux command line. This challenge is entirely tutorial-driven and perfect for anyone brand new to Linux. Take your time, experiment with the commands, and build confidence—you’ll use these constantly throughout cybersecurity.

## Launching the Machine
Once the room loads, start the attached machine. You’ll be interacting with it directly through the Linux terminal instead of a graphical interface. While this may feel intimidating at first, the CLI gives you more precision, speed, and control.

In Linux, folders are called **directories**. The terminal allows you to navigate these directories, read files, search through the system, and investigate logs—exactly the type of work security professionals do every day.

## Essential Commands Used in This Challenge
These are the primary commands you’ll practice:

### Navigation & Listing
*   **ls** – List the contents of a directory
*   **ls -a** – List all files, including hidden ones
*   **ls -la** – List all files with full details
*   **cd <directory>** – Change directory
*   **pwd** – Show your current directory path

### Reading & Viewing
*   **cat <file>** – Display the contents of a file
*   **echo <text>** – Output text to the terminal

### Searching
*   **grep <pattern> <file>** – Search for text inside files
*   **find <path> -name <filename>** – Locate files by name

### Users & Permissions
*   **su <user>** – Switch user accounts
    *   When typing a password in the terminal, nothing appears—this is normal.
*   **sudo <command>** – Run as a privileged (administrator) user

### Other Useful Commands
*   **clear** – Clear the terminal
*   **history** – View previously run commands

### Root
Not a command, but a concept.
**Root** is the highest-privileged user on the system—full control, no restrictions.

## Walkthrough

### Objective 1: Which CLI command lists a directory?
This one should be familiar now:
**ls**

### Objective 2: Navigate the Machine to Find the First Flag
By following the room instructions, you’ll move through directories, list files, and eventually uncover the first hidden flag. Your terminal should resemble this (flag hidden by a red box in the original document):

![Terminal Output](assets/day01/image1.png)

### Objective 3: View Log Files
Next, you’ll review log entries—records of system activity. Running the suggested commands will output a large amount of text. Don’t worry—this is normal.

![Log Output](assets/day01/image2.png)

### Objective 4: Dig Deeper to Find the Next Flag
Using **find**, you locate a suspicious shell script.
After navigating to its directory and reading it with **cat**, you’ll discover the next flag.

![Find Command](assets/day01/image3.png)

### Objective 5: Which command filtered the logs for failed logins?
This answer appears once you understand how searching works in Linux:
**grep**

### Objective 6: Switch Users to Continue Investigating
To access certain files, you elevated privileges using **sudo** and switched to a different user with **su**.

**Which command switches to the root user?**
**su root**

### Objective 7: Find the Final Flag in the Root User’s History
Once you become the root user, run the history-viewing commands to inspect previously executed actions. Sir Carrotbane left a clue in the root user’s **bash history**.

Reviewing the history reveals the final flag.

![Root History](assets/day01/image4.png)

## Wrap-Up
Congratulations on finishing Day 1 of Advent of Cyber!
You’ve learned foundational Linux commands, navigated the terminal, searched logs, switched users, and extracted multiple flags. These skills will appear again throughout the event—make sure to practice them.

Try the bonus challenge if you want an additional stretch task!
