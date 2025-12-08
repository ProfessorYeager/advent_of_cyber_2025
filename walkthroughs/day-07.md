# Day 7: Finding Hidden Services with Nmap

**Room Link:** [Advent of Cyber 2025](https://tryhackme.com/room/adventofcyber2025)

## 🎄 Scenario Overview
Today’s challenge is all about **network service discovery** and using that information to regain access to a compromised QA server: **tbfc-devqa01**. HopSec has locked you out, defaced the web page, and hidden multiple “keys” across different services. Your job is to:
1.  Discover exposed services.
2.  Extract three key fragments.
3.  Use them to unlock the admin console.
4.  Pivot to on-host enumeration and retrieve the final flag from the database.

Along the way, this room reinforces core concepts in **ports**, **TCP vs UDP**, **banner grabbing**, **FTP**, **custom services**, **DNS TXT records**, and **local-only services**.

## 1. Environment Setup
*   Start the **Target Machine** (`tbfc-devqa01`).
*   Start the **AttackBox** (or use your own machine via VPN).
*   Note the `MACHINE_IP` of the target; all commands below use that.

You can verify connectivity with a simple ping or just move straight to Nmap.

## 2. First Look – Basic TCP Port Scan
We begin with the default top 1,000 TCP ports:
```bash
nmap MACHINE_IP
```

You should see something like:
*   `22/tcp` open – SSH
*   `80/tcp` open – HTTP

When you open `http://MACHINE_IP` in a browser, you’ll see the defaced QA site and an evil message at the top:
**Pwned by HopSec**

✅ **Answer:** `Pwned by HopSec`

This is a good reminder: just because a website is “up” doesn’t mean it’s safe or under your control.

## 3. Expanding the Search – Full TCP Scan & Banner Grabbing
The top 1,000 ports aren’t the whole story. Services can hide on any of the 65,535 ports. Let’s scan **all ports** and grab basic banners:
```bash
nmap -p- --script=banner MACHINE_IP
```

You’ll now see additional open ports, for example:
*   `21212/tcp` – vsFTPd banner (FTP service)
*   `25251/tcp` – “TBFC maintd v0.2” (custom app)

This is a classic “security by obscurity” mistake: moving a service to a non-standard port doesn’t secure it.

## 4. Anonymous FTP – Finding Key 1
We see FTP running on port `21212`, so we try connecting anonymously:
```bash
ftp MACHINE_IP 21212
```

When prompted for a username, use:
*   **Username:** `anonymous`
*   **Password:** just press Enter

List files:
```bash
ls
```

You should see a file like `tbfc_qa_key1`. Download it:
```bash
get tbfc_qa_key1 -
```

The content is your first key fragment:
`3aster_`

✅ **Answer:** `3aster_`

This reinforces a simple lesson: **misconfigured FTP (especially with anonymous access) is a goldmine.**
Type `!` or `bye`/`quit` to exit.

## 5. Talking to a Custom Service – Netcat & Key 2
Next, we inspect the custom TBFC service on port `25251`. Because it’s not HTTP/FTP/SSH, we use a generic TCP client: **netcat**.

```bash
nc -v MACHINE_IP 25251
```

You’ll see a banner like:
```text
TBFC maintd v0.2
Type HELP for commands.
```

Type `HELP`. You’ll see available commands, including `GET KEY`.
Run the command to retrieve the second key fragment:
```text
GET KEY
```
You’ll receive:
`15_th3_`

✅ **Answer:** `15_th3_`

Press `CTRL + C` to exit Netcat.
Key takeaway: tools like `nc` are invaluable when dealing with unknown services.

## 6. Don’t Forget UDP – Scanning for Hidden Services & Key 3
So far, we’ve only looked at **TCP**. But many critical services (DNS, some VPNs, etc.) run over **UDP**. We run a UDP scan:
```bash
nmap -sU MACHINE_IP
```

You’ll see:
*   `53/udp` open – DNS (domain)

We can query this DNS server directly using `dig`, asking specifically for a TXT record:
```bash
dig @MACHINE_IP TXT key3.tbfc.local +short
```

The TXT record returned contains the third key fragment:
`n3w_xm45`

✅ **Answer:** `n3w_xm45`

This is a great example of hiding data in DNS, a trick real attackers (and defenders) sometimes use.

## 7. Using the Keys – Unlocking the Admin Console
We now have three key fragments:
1.  `3aster_`
2.  `15_th3_`
3.  `n3w_xm45`

Combined, they form the full key:
`3aster_15_th3_n3w_xm45`

Navigate again to the web app at:
`http://MACHINE_IP`

Use the combined key to unlock the **secret admin console**.
Once inside, you get an interactive terminal-like interface as user `tbfcapp`.

## 8. On-Host Service Discovery – ss and Local Services
Now that you’re on the box itself, you don’t need remote scans to see open ports—you can ask the OS directly.
Run:
```bash
ss -tunlp
```

You’ll see:
*   Known services on `0.0.0.0` (globally accessible): `22`, `80`, `21212`, `25251`, `53`.
*   **Local-only** services on `127.0.0.1`:
    *   `127.0.0.1:3306` – MySQL
    *   and others

The key idea: **some services are accessible only from localhost**, so you’d never see them directly over the network unless you compromise the host first.

✅ **Answer (MySQL port):** `3306`

## 9. Pivoting to the Database – Getting the Final Flag
From the admin console, we can talk directly to the local MySQL instance. Often, local database access does not require a password when connecting from localhost (bad practice, but common in labs and misconfigurations).

Use:
```bash
mysql -D tbfcqa01 -e "show tables;"
```

You’ll see the `flags` table. Now query it:
```bash
mysql -D tbfcqa01 -e "select * from flags;"
```

You’ll get the final flag:
`THM{4ll_s3rvice5_d1sc0vered}`

✅ **Answer:** `THM{4ll_s3rvice5_d1sc0vered}`

## Challenge Answers Summary
| Question | Answer |
| :--- | :--- |
| **Website deface message** | `Pwned by HopSec` |
| **Key 1 (FTP)** | `3aster_` |
| **Key 2 (TBFC app)** | `15_th3_` |
| **Key 3 (DNS TXT)** | `n3w_xm45` |
| **MySQL port** | `3306` |
| **Final flag (database)** | `THM{4ll_s3rvice5_d1sc0vered}` |

## Takeaways & Teaching Notes
Day 7 nicely ties together several important concepts:
*   Why you should **scan both TCP and UDP**.
*   Why **non-standard ports** don’t equal security.
*   How to interact with **custom services** (Netcat).
*   How **DNS can hide data** via TXT records.
*   The difference between **externally exposed** services and **local-only** services.
*   How good external enumeration can lead to **on-host pivoting**, then to **data exfiltration**.

It’s an excellent exercise in thinking beyond “just port 80 and 22” and treating the target as an ecosystem of services and paths.
