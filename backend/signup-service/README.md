Signup service

This is a minimal, self-contained signup backend for testing and development.

Quick start

1. Open terminal and change to the service folder:

```powershell
cd 'D:\Sher Khan Lemosine\backend\signup-service'
```

2. Install dependencies:

```powershell
npm install
```

3. Create a `.env` file (copy from `.env.example`) and adjust values if needed.

4. Start the service:

```powershell
npm start
```

The service listens by default on port `5001` and exposes the endpoint:

- POST `/api/auth/signup` — body: `firstName`, `lastName`, `email`, `phone`, `password`, `confirmPassword`.

Use this to verify signup logic without touching the main backend.
