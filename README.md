# 🎮 XRPL On-chain Activities API

This repository contains the backend server used to generate, manage, and monitor **on-chain activities** (e.g. \`memo\`, \`trustline\`, \`multisig\`, etc.) on the XRP Ledger for the Serious Game, by XRPL Commons.

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

## 🧪 Core Endpoints (for all activity types)

| Method | Endpoint                  | Description                                  |
|--------|---------------------------|----------------------------------------------|
| GET    | `/[type]/content`         | Returns static instructional content for the front-end (title, body, steps, etc.) |
| GET    | `/[type]/get`             | Returns a summary of all current activities of this type |
| GET    | `/[type]/status?id=`      | Returns user-specific activity progress (optional) |

> 💡 Each activity type should **at minimum** implement these three endpoints.

---

## 📄 Optional Routes (for interactive on-chain activities)

| Method | Endpoint                  | Description                                  |
|--------|---------------------------|----------------------------------------------|
| POST   | `/[type]/generate`        | Generates a new activity and all wallet setup for a list of students |
| POST   | `/[type]/watch`           | Runs the activity watcher to check for task completion |

---

## 📦 Example: \`memo\` Activity

| Endpoint               | Purpose                                |
|------------------------|----------------------------------------|
| `POST /memo/generate`  | Create memo activity for students       |
| `POST /memo/watch`     | Check XRPL transactions for completion  |
| `GET  /memo/content`   | Instructional content (title + steps)   |

---

## 🧑‍🏫 Adding a New Activity Type

1. Create a route file under `routes/` → `src/routes/trustline.route.ts`
2. Implement `content`, `get` and `status` in the controller
3. Register the route in `index.ts`
4. Return content data from `/[type]/content` with the standard format:

```ts
{
  title: 'Activity Title',
  description: 'One-liner description',
  sections: [
    { type: 'title', value: 'Step 1' },
    { type: 'body', value: 'Follow the memo sent to your wallet.' },
    { type: 'link', value: 'https://xrpl.org' }
  ]
}
```

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