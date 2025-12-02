# Day 2: Phishing - Merry Clickmas

**Room Link:** [Phishing - Merry Clickmas](https://tryhackme.com/room/phishing-aoc2025-h2tkye9fzU)

## 🎄 Scenario Overview
The Best Festival Company (TBFC) has recently faced multiple security threats. To strengthen defenses, the local red team—Recon McRed, Exploit McRed, and Pivot McRed—has begun a new series of penetration tests.

Today, you join the red team to test employee awareness against **phishing attacks**, one of the most common and successful forms of social engineering. Your goal is to build a trap, deploy it, and observe whether TBFC staff fall for it.

## 🎯 Learning Objectives
By completing this challenge, you will:
*   Understand the fundamentals of **social engineering**
*   Learn different types of **phishing attacks** (email, SMS, voice, QR, etc.)
*   Explore how red teams create **fake login pages** for credential harvesting
*   Use the **Social-Engineer Toolkit (SET)** to craft and send a phishing email

## 🖥️ Machine Setup
Before beginning:
*   **Start the VM (target machine)** – wait ~2 minutes for it to boot.
*   **Start the AttackBox** – this opens in split view.
*   If it doesn’t appear, click **Show Split View** at the top of the page.

You will perform all offensive actions from the AttackBox.

## 🧠 Understanding the Concepts

### Social Engineering
Social engineering manipulates humans into making harmful mistakes—sharing passwords, clicking malicious links, opening attachments, or approving fraudulent actions. Attackers commonly use:
*   **Urgency** (“your account will close immediately!”)
*   **Authority** (“this is your manager”)
*   **Curiosity** (“you won a prize!”)

Because humans—not computers—are the target, social engineering is often called **human hacking**.

### Phishing
Phishing uses messages—email, SMS, voice calls, QR codes, and DMs—to trick users into clicking something or revealing sensitive information.

TBFC trains employees using two S.T.O.P. mnemonics:

**S.T.O.P. (All Things Secured)**
*   **S**uspicious?
*   **T**elling me to click something?
*   **O**ffering me something amazing?
*   **P**ushing me to act now?

**S.T.O.P. (TBFC Internal Training)**
*   **S**low down
*   **T**ype the address yourself
*   **O**pen nothing unexpected
*   **P**rove the sender

Today you test whether TBFC employees *actually* follow that training.

## 🎣 Building the Phishing Trap
Your goal: **capture the target user’s login credentials.**
To do this, TBFC provides a prebuilt fake portal hosted by a simple Python script.

### Step 1: Run the Phishing Server
```bash
cd ~/Rooms/AoC2025/Day02
./server.py
```

This starts a credential-harvesting webserver:
`Starting server on http://0.0.0.0:8000`

*   **0.0.0.0** → the server listens on all network interfaces
*   Victim-accessible URL (example):
    *   `http://10.65.66.227:8000`
    *   or `http://127.0.0.1:8000` (local test)

![Phishing Server](assets/day02/image5.png)

Open Firefox on the AttackBox to preview the fake login page. Note that your IP address will be different given your attackbox.

![Firefox Preview](assets/day02/image6.png)

## ✉️ Sending the Phishing Email with SET
Now you must deliver the trap to a TBFC employee.

### Step 2: Launch SET
Open a new terminal window and type `setoolkit`.
Select:
1.  **Social-Engineering Attacks**
2.  **Mass Mailer Attack**
3.  **E-Mail Attack Single Email Address**

### Email configuration used in this challenge

| Field | Value |
| :--- | :--- |
| Recipient | factory@wareville.thm |
| Delivery method | Use your own server / open relay |
| From address | updates@flyingdeer.thm |
| Display name | Flying Deer |
| SMTP server | 10.65.149.246 (example) |
| Port | 25 |
| High priority? | No |
| Attach file? | No |
| Message format | Plaintext |
| Body includes | URL to fake login page |

Your options should look like this when following the instruction.

![SET Configuration](assets/day02/image3.png)
![SET Configuration 2](assets/day02/image4.png)

### Example Email Body
```text
Dear elves,

Kindly note that there have been significant changes to the shipping schedules due to increased shipping orders.

Please confirm the new schedule by visiting http://10.65.66.227:8000

Best regards,

Flying Deer
END
```

Once sent, return to the terminal running `server.py` and wait 1–2 minutes for credentials to appear.

![Credentials Captured](assets/day02/image1.png)

If credentials appear, congratulations: someone took the bait.

## 🔍 Post-Phish Investigation
The red team receives at least one valid credential set, which is alarming—this means a real attacker might already have access.
To assess potential damage, you must test the stolen password on the TBFC mail portal.

## 📝 Challenge Questions

### 1. What is the password used to access the TBFC portal?
*This comes from the credentials harvested by server.py.*

**Answer:** `_________________________`

![Question 1](assets/day02/image1.png)

### 2. Browse to your IP address of the using the AttackBox. Log in as `factory` using the stolen password. What is the total number of toys expected for delivery?
Once inside the mailbox, locate the delivery report and find the number.

**Answer:** `_______`

![Question 2](assets/day02/image7.png)

### 3. Optional: Explore Further
Try the **Phishing Prevention** room for defensive techniques.
*No answer required.*

## 🧩 Key Takeaways
*   Social engineering targets **people**, not technology.
*   Phishing attacks are increasingly sophisticated and require employee vigilance.
*   Fake login pages + credential harvesting = common real-world attack chain.
*   SET is a powerful red-team tool for testing awareness.
*   Reused passwords significantly increase organizational risk.

## 🎁 Wrap-Up
Day 2 teaches one of the most important principles in cyber security:
**Even the strongest systems fail if the humans operating them are not vigilant.**
You’ve now built a phishing page, delivered it with SET, harvested credentials, and validated their impact—great work!
