# 🎭 Playwright UI Automation Testing

This repository contains **UI automation tests built using Playwright**. It is designed for beginners and QA interns to understand end‑to‑end UI testing with modern automation tools.

---

## 📌 Tech Stack

* **Playwright**
* **TypeScript / JavaScript**
* **Node.js**
* **VS Code**

---

## 📂 Project Structure

```
playwright-ui-tests/
│── tests/                  # Test cases
│── playwright.config.ts    # Playwright configuration
│── package.json            # Project dependencies
│── package-lock.json
│── .gitignore              # Ignored files
│── README.md               # Project documentation
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* Node.js (v16 or above)
* Git
* VS Code (recommended)

Check versions:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run tests using UI mode:

```bash
npx playwright test --ui
```

---

## 📊 Test Reports

After test execution, generate and view reports:

```bash
npx playwright show-report
```

---

## 🧪 Writing Tests (Example)

```ts
import { test, expect } from '@playwright/test';

test('homepage title test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

---

## 🚫 Ignored Files

The following files are ignored using `.gitignore`:

* node_modules
* playwright-report
* test-results
* .env

---

## 🤝 Contribution

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 👩‍💻 Author

W.P.D.De Silva
IT23272736
Software QA / Playwright Learner

---

## 📄 License

This project is for **learning and practice purposes**.

---

✨ Happy Testing with Playwright ✨
