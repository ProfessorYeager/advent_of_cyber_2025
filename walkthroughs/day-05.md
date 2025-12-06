# Day 5: IDOR - Insecure Direct Object Reference

**Room Link:** [Advent of Cyber 2025](https://tryhackme.com/room/adventofcyber2025)

## 🎄 Scenario Overview
The elves at TBFC notice something suspicious:
*   Parents cannot activate vouchers.
*   Targeted phishing emails are arriving with non-public data.
*   A strange account named **Sir Carrotbane** appears with many voucher assignments.

The account is deleted, the vouchers are retrieved, but the root problem remains. Your mission is to investigate the TryPresentMe application, uncover vulnerabilities, and understand how these issues were exploited.

## 🎯 Learning Objectives
In this room, you will:
*   Understand **IDOR** (Insecure Direct Object Reference).
*   Identify IDOR in user IDs, encoded values, and hashes.
*   Exploit these vulnerabilities to access unauthorized data.

## 🖥️ Machine Setup
Access the app from the AttackBox or VPN at:
`http://MACHINE_IP`

**Credentials:**
*   Username: `niels`
*   Password: `TryHackMe#2025`

## 1. What Is IDOR?
**IDOR** stands for **Insecure Direct Object Reference**. It occurs when an application exposes a reference to an object (like a user ID, invoice number, etc.) and fails to verify if the user is authorized to access it.

**Example:**
`https://awesome.website.thm/profile?id=1001`
If changing `1001` to `1002` gives you someone else's profile, that's IDOR.

IDOR is common because developers:
*   Assume users won't change values.
*   Trust client-side identifiers.
*   Skip server-side authorization checks.

## 2. Exploiting the First IDOR: user_id
1.  Log in to the application.
2.  Open **Developer Tools** -> **Network** tab.
3.  Refresh the page and look for the request `view_accountinfo`.
4.  In the request body (or response), note the `user_id`. (e.g., `user_id=10`)
5.  **Exploit:**
    *   Go to **Developer Tools** -> **Application/Storage** -> **Local Storage**.
    *   Find the `auth_user` entry.
    *   Change `"user_id":10` to another value (e.g., `11`).
    *   Refresh the page.

You are now impersonating another user!

**Challenge Answer:**
*   The user with **10 children** has ID **15**.

## 3. IDOR Hidden Behind Encoding (Base64)
1.  Click the **eye icon** beside a child entry.
2.  Capture the request using **Developer Tools** or **Burp Suite**.
3.  You will see a request like: `children/view/Mg==`.
4.  `Mg==` is Base64 for `2`.
5.  Change this encoded value to access other children's data.

**Key Takeaway:** Encoding is NOT security.

## 4. IDOR Hidden Behind Hashes (MD5)
1.  Click the **edit icon** next to a child.
2.  Observe the request: `children/edit/7b8f2cd47ba0fbb6a6a601d4f2c5acdd`.
3.  This is an **MD5 hash** of the ID.
4.  Since MD5 is deterministic, if you know the ID is `1`, `2`, etc., you can generate the hash yourself to access other records.

## 5. IDOR Hidden Behind Algorithms: UUID v1
Voucher codes might look like random UUIDs, but:
*   They are **UUIDv1**, which encodes timestamps.
*   Attackers can brute-force these by generating UUIDs for a specific time window.
*   **Never use UUIDv1 for sensitive identifiers.**

## 🛡️ How to Fix IDOR
To fix IDOR, you must implement **server-side authorization checks**.
*   **Validate permissions:** Ensure the logged-in user owns the requested object.
*   **Don't rely on hiding IDs:** Obscurity is not security.
*   **Log failed access attempts.**

## Challenge Answers
*   **What does IDOR stand for?** `Insecure Direct Object Reference`
*   **What type of privilege escalation are most IDOR cases?** `Horizontal`
*   **Exploiting the IDOR found in view_accounts, what is the user_id of the parent with 10 children?** `15`
