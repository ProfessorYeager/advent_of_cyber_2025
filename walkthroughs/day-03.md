# Day 3: Splunk Basics - Did you SIEM?

**Room Link:** [Advent of Cyber 2025](https://tryhackme.com/r/room/adventofcyber2025)

## 🎄 Scenario Overview
Christmas preparations are underway in Wareville, but chaos strikes when the SOC dashboard flashes red and a **ransom note** appears across TBFC systems.

The culprit is **King Malhare**, ruler of HopSec Island, who seeks to replace Christmas with his new holiday, *EAST-mas*. His Bandit Bunnies have launched a full-scale attack, compromising TBFC servers and deploying ransomware.

With McSkidy missing, you step in to assist the SOC team by using **Splunk** to investigate the intrusion, track the attacker, and uncover how the compromise took place.

> **Note:** For this room, THM has provided an abundance of useful screenshots. I’m not going to repeat those here, and instead, simply provide you with the proper searching tools.

## 🎯 Learning Objectives
By completing this challenge, you will learn how to:
*   Ingest and analyze **custom log data** within Splunk
*   Create and apply **custom field extractions**
*   Use SPL (**Search Processing Language**) to filter, refine, and visualize data
*   Conduct an end-to-end **security investigation** inside Splunk

## 🖥️ Machine Setup
Before beginning:
*   Click **Start Machine** and wait 2–3 minutes for Splunk to fully boot.
*   When ready, access Splunk through the provided URL: `https://10-65-157-41.reverse-proxy.cell-prod-us-east-1b.vm.tryhackme.com`
*   If you receive a 502 error, the instance may still be loading.
*   Once inside, navigate to: **Search & Reporting** (left panel)

You are now ready to begin the investigation.

## Exploring Logs in Splunk

### Step 1: Load All Ingested Logs
Run the following SPL query:
```splunk
index=main
```
Set the **time range to All time**.

You will see two sourcetypes:

| Sourcetype | Meaning |
| :--- | :--- |
| `web_traffic` | Web server logs and connections |
| `firewall_logs` | Allowed and blocked traffic from the firewall |

These will be your primary data sources for the investigation.

## Initial Triage of the Attack

### Step 2: Focus on Web Traffic Logs
Run:
```splunk
index=main sourcetype=web_traffic
```
This loads all 17,000+ web events.

Explore the Splunk UI:
*   **Timeline graph** to identify spikes
*   **Interesting fields** such as `user_agent`, `client_ip`, `path`, and `status`
*   **Event details** for parsed log fields

## Visualizing Activity Over Time

### Step 3: Generate Daily Event Counts
Use:
```splunk
index=main sourcetype=web_traffic | timechart span=1d count
```
This reveals patterns and highlights the day the attack peaked.

Optionally, reverse-sort:
```splunk
index=main sourcetype=web_traffic | timechart span=1d count | sort by count | reverse
```

## Detecting Anomalies
Investigate the following fields:

**user_agent**
Suspicious automation tools begin to stand out.

**client_ip**
One IP becomes responsible for nearly all malicious traffic.

**path**
Paths show exploitation attempts, probes, and payload execution.

## Filtering Out Benign Traffic
Run:
```splunk
index=main sourcetype=web_traffic user_agent!=*Mozilla* user_agent!=*Chrome* user_agent!=*Safari* user_agent!=*Firefox*
```
This isolates **non-browser traffic**, making malicious activity obvious.
Identify the attacker IP and record it for future queries.

## Narrowing to the Attack Source
Use stats to confirm the top offending IP:
```splunk
sourcetype=web_traffic user_agent!=*Mozilla* user_agent!=*Chrome* user_agent!=*Safari* user_agent!=*Firefox* 
| stats count by client_ip 
| sort -count 
| head 5
```
This IP is used as `<REDACTED>` in the next sections.

## Tracing the Attack Chain

### 1. Reconnaissance
```splunk
sourcetype=web_traffic client_ip="<REDACTED>" AND path IN ("/.env", "/*phpinfo*", "/.git*") 
| table _time, path, user_agent, status
```

### 2. Enumeration Attempts
Path traversal and redirect tests:
```splunk
sourcetype=web_traffic client_ip="<REDACTED>" AND path="*..\/..\/*" OR path="*redirect*" 
| stats count by path
```

### 3. SQL Injection
```splunk
sourcetype=web_traffic client_ip="<REDACTED>" AND user_agent IN ("*sqlmap*", "*Havij*") 
| table _time, path, status
```

### 4. Exfiltration Attempts
```splunk
sourcetype=web_traffic client_ip="<REDACTED>" AND path IN ("*backup.zip*", "*logs.tar.gz*") 
| table _time, path, user_agent
```

### 5. Ransomware Deployment
Look for webshell execution and ransomware staging:
```splunk
sourcetype=web_traffic client_ip="<REDACTED>" AND path IN ("*bunnylock.bin*", "*shell.php?cmd=*") 
| table _time, path, user_agent, status
```

## Correlating Firewall Logs
Use Splunk to confirm outbound C2 traffic from the compromised server (10.10.1.5):
```splunk
sourcetype=firewall_logs src_ip="10.10.1.5" AND dest_ip="<REDACTED>" AND action="ALLOWED" 
| table _time, action, protocol, src_ip, dest_ip, dest_port, reason
```

Calculate total data exfiltrated:
```splunk
sourcetype=firewall_logs src_ip="10.10.1.5" AND dest_ip="<REDACTED>" AND action="ALLOWED"
| stats sum(bytes_transferred) by src_ip
```

## Conclusion
*   **Attacker Identification:** Single external IP responsible for all malicious traffic.
*   **Intrusion Vector:** Web server compromise through reconnaissance, enumeration, SQLi, and payload delivery.
*   **Post-Exploitation:** Webshell execution and ransomware deployment.
*   **C2 Communication:** Confirmed by outbound firewall logs.
