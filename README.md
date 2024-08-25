# Tapnet - Authoritative DNS Server in Node.js

Tapnet contains the code for the implementation of a basic authoritative DNS server in Node.js (JavaScript). The server allows you to query DNS records and understand the underlying workings of DNS.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [How DNS Works](#how-dns-works)
- [Resources](#resources)

## Introduction

DNS (Domain Name Service) is like the phone book of the Internet. Users access websites through domain names, while web browsers use IP addresses. DNS translates domain names into numerical IP addresses, allowing users to reach websites easily. For example, when a user types `example.com` in a web browser, DNS resolves that human-readable name to the corresponding IP address (e.g., `93.184.216.34`).

Before the advent of DNS, the Stanford Research Institute maintained a file named `HOSTS.TXT`, which contained hostnames and their corresponding numerical addresses. However, as the Internet grew, maintaining a single centralized host file became cumbersome. In 1983, Paul Mockapetris created the Domain Name System, which has evolved over time [\[1\]](https://en.wikipedia.org/wiki/Domain_Name_System#History).

This project aims to utilize free time to deepen the understanding of DNS and to create a toy DNS server in multiple programming languages, starting with JavaScript (Node.js).

## Getting Started

To run the DNS server, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kota-Karthik/tapnet
   cd tapnet
   ```
2. **Run the DNS server**:
    ```bash
    node index.js
    ```
3. **Query the server**:
    ```bash
    dig example.com @127.0.0.1 
    ```
    
## How DNS Works
DNS mapping is distributed in a hierarchy of authorities/zones. This structure allows for efficient management of DNS records and helps to reduce the load on individual servers. A recursive DNS resolver queries multiple authoritative DNS servers to resolve a domain name into an IP address.

The server implementation provided in this project is primarily for educational purposes, helping users understand how DNS operates at a basic level.

## Resources
The following resources were helpful in developing this project:
 - [howDns](https://github.com/howCodeORG/howDNS)
 - [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035)
 - [RFC 1034](https://datatracker.ietf.org/doc/html/rfc1034)
 - [Wireshark](http://wireshark.org)