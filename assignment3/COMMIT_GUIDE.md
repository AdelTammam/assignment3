# GitHub Commit Guide

Follow these steps **after** creating your Expo project and copying in the source files.
Each commit represents a logical development stage — this gives you a clean, reviewable history.

---

## Initial Setup (do this once)

```bash
# Inside your project folder
git init
git remote add origin https://github.com/YOUR_USERNAME/sait-forms-app.git
```

---

## Commit 1 — Project Setup & Navigation

**What to stage:**
```bash
git add .gitignore
git add README.md
git add app/_layout.tsx
git add app/index.tsx
```

**Commit:**
```bash
git commit -m "feat: initial project setup with Stack navigation and home screen"
```

**What this covers:**
- Expo project initialized with TypeScript
- `.gitignore` configured for Expo/React Native
- Stack navigator root layout with consistent header styling
- Home screen with navigation cards to all three forms

---

## Commit 2 — Zod Schemas & Reusable FormInput Component

**What to stage:**
```bash
git add schemas/employeeSchema.ts
git add schemas/authSchemas.ts
git add components/FormInput.tsx
```

**Commit:**
```bash
git commit -m "feat: add Zod validation schemas and reusable FormInput component"
```

**What this covers:**
- `employeeSchema.ts` — 6-field schema with `.trim()`, `.refine()` for phone, regex for postal code
- `authSchemas.ts` — sign-in and sign-up schemas; sign-up uses `.refine()` for password match
- `FormInput.tsx` — reusable component with focus styling, error borders, password toggle, Ionicons

---

## Commit 3 — All Form Screens

**What to stage:**
```bash
git add app/employee-form.tsx
git add app/sign-in.tsx
git add app/sign-up.tsx
```

**Commit:**
```bash
git commit -m "feat: implement Employee, Sign-In, and Sign-Up form screens"
```

**What this covers:**
- Employee form — 6 fields, `mode: "onSubmit"`, disabled submit until valid
- Sign-In form — `mode: "onBlur"`, navigate to Sign-Up footer link
- Sign-Up form — password strength meter via `useWatch`, confirm password validation, navigate to Sign-In

---

## Push to GitHub

```bash
git push -u origin main
```

> If your default branch is `master`, replace `main` with `master`.

---

## Final Checklist Before Submitting

- [ ] All 3 commits are visible in your GitHub repository
- [ ] Repository is set to **Public** (or instructor added as collaborator)
- [ ] App runs on Android via `npx expo start`
- [ ] Submit the GitHub repository link on Brightspace (D2L)
