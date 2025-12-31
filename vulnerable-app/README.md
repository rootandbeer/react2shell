# React2Shell Vulnerable Application

This is an intentionally vulnerable Next.js application designed for educational purposes to demonstrate the React2Shell vulnerability (CVE-2025-55182 / CVE-2025-66478).

## ⚠️ WARNING

**This application contains a critical security vulnerability. DO NOT deploy this to production or expose it to the internet. Use only in isolated lab environments.**

## Vulnerability Details

- **CVE**: CVE-2025-55182 / CVE-2025-66478
- **Affected Versions**:
  - React: 19.0.0, 19.1.0, 19.1.1, 19.2.0
  - Next.js: 15.x, 16.x (with App Router)
- **Type**: Remote Code Execution (RCE) via unsafe deserialization in React Server Components

## Prerequisites

- Docker and Docker Compose installed

## Quick Start

```bash
# Build and run the vulnerable application
docker-compose up --build

# The application will be available at http://localhost:8443
# (Port 8443 matches the scanner's default port)
```

## Testing the Vulnerability

Use the included `react2scan.sh` script to test for the vulnerability:

```bash
# From the parent directory
# The scanner defaults to port 8443, which matches the docker-compose setup
./react2scan.sh localhost

# Or if running on a different host/port
./react2scan.sh <hostname-or-ip> -p <port>
```

The scanner will send a POST request with:
- `Next-Action: x` header
- `Content-Type: multipart/form-data` with specific boundary
- Form data fields matching the vulnerable pattern

A vulnerable application will respond with HTTP 500 and contain `E{"digest"` in the response body.

**Note**: The vulnerability is triggered when Next.js processes server actions via the `Next-Action` header. The scanner sends a crafted multipart form that exploits the unsafe deserialization in React Server Components.

## Application Structure

- `app/page.tsx` - Main page with form
- `app/actions.ts` - Server action vulnerable to React2Shell
- `app/layout.tsx` - Root layout
- `Dockerfile` - Docker image configuration

## How It Works

The vulnerability exists in React Server Components' deserialization mechanism. When Next.js processes server actions with the `Next-Action` header, it deserializes form data in a way that can lead to code execution if the input is not properly validated.

The vulnerable code in `app/actions.ts` directly processes form data without validation, which combined with the vulnerable React/Next.js versions, allows for exploitation.

## Mitigation

To fix this vulnerability:

1. **Update React** to version 19.2.1 or later
2. **Update Next.js** to version 15.1.1 or later (for Next.js 15.x) or 16.1.1 or later (for Next.js 16.x)
3. **Validate all inputs** in server actions before processing
4. **Implement proper input sanitization** for all user-provided data

## References

- CVE-2025-55182
- CVE-2025-66478
- [Microsoft Security Blog - React2Shell](https://www.microsoft.com/en-us/security/blog/2025/12/15/defending-against-the-cve-2025-55182-react2shell-vulnerability-in-react-server-components/)

## License

This is for educational purposes only. Use responsibly and only in isolated environments.

