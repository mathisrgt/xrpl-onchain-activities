# 🎮 XRPL On-chain Content API

This repository contains the backend server used to generate and monitor **on-chain content** (e.g. \`memo\`, \`trustline\`, \`multisig\`, etc.) on the XRP Ledger for the Serious Game, by XRPL Commons.

---

## 📁 Folder Structure

```
src/
├── controllers/         # Per-activity logic (e.g., memo.controller.ts)
├── routes/              # Express route definitions per activity type
├── services/            # Activity-specific services (wallet, XRPL, etc.)
├── types/               # Shared types and interfaces
└── index.ts             # App entry point
```

---

## 🧩 API Design Pattern

All interactive activities follow this standard routing structure:

### Base Path

```
/[type]/[action]
```

Where:
- `type` = activity type (e.g. `memo`, `trustline`, `multisig`)
- `action` = specific API endpoint

---

## 🧪 Core Endpoints

| Method | Endpoint                  | Description                                  |
|--------|---------------------------|----------------------------------------------|
| POST   | `/[type]/generate`        | Generates a new instance for a user |
| POST   | `/[type]/watch`           | Runs the watcher to check for task completion |

---

## 📦 Example: \`memo\` Activity

| Endpoint               | Purpose                                |
|------------------------|----------------------------------------|
| `POST /memo/generate`  | Create memo activity for students       |
| `POST /memo/watch`     | Check XRPL transactions for completion  |

---

## 🧑‍🏫 Adding a New Onchain Content Type

1. Create a route file under `routes/` → `src/routes/trustline.route.ts`
2. Implement `generate` and `watch` in the controller and the logic in services
3. Register the route in `index.ts`

---

## 🛠 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **xrpl.js** (XRP Ledger SDK)
- MongoDB for persistence

---

## 🧪 Development

```bash
npm install
npm start
```

Hit the API:

```bash
curl -X POST http://localhost:3000/memo/generate \
  -H "Content-Type: application/json" \
  -d '{"username":"user1"}'
```
