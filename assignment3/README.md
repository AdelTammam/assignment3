# SAIT Forms App

**Course:** Campus Hub — SAIT | Winter 2026  
**Assignment:** Advanced Form Development and Validation with React Hook Form & Zod (Expo)  
**Weight:** 10% | **Marks:** /60

---

## Overview

A React Native (Expo) mobile application demonstrating professional form development using **React Hook Form** for state management and **Zod** for schema-based validation.

## Features

- **Employee Information Form** — 6 fields with format, length, and regex validation
- **Sign-In Form** — Email + password authentication form
- **Sign-Up Form** — Registration with password strength meter and confirm-password matching
- **Reusable `FormInput` component** — Focus styling, error borders, password toggle, icons
- **Stack Navigation** — Smooth navigation between all screens

## Tech Stack

| Library | Purpose |
|---|---|
| `react-native` + `expo` | Mobile app framework |
| `react-hook-form` | Form state management |
| `zod` | Schema-based validation |
| `@hookform/resolvers` | Connects Zod to React Hook Form |
| `@expo/vector-icons` | Icons (Ionicons) |

## Getting Started

### 1. Create the Expo project

```bash
npx create-expo-app@latest sait-forms-app
cd sait-forms-app
```

### 2. Install dependencies

```bash
npx expo install react-hook-form zod @hookform/resolvers @expo/vector-icons
```

### 3. Replace generated files

Copy the following folders from this repo into your project root, replacing any existing files:

```
app/
components/
schemas/
```

### 4. Run the app

```bash
npx expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS).

---

## Project Structure

```
sait-forms-app/
├── app/
│   ├── _layout.tsx          # Stack navigation root
│   ├── index.tsx            # Home screen with nav cards
│   ├── employee-form.tsx    # Employee Information Form
│   ├── sign-in.tsx          # Sign-In Form
│   └── sign-up.tsx          # Sign-Up Form
├── components/
│   └── FormInput.tsx        # Reusable input with error + focus styling
├── schemas/
│   ├── employeeSchema.ts    # Zod schema for employee form
│   └── authSchemas.ts       # Zod schemas for sign-in and sign-up
├── .gitignore
└── README.md
```

## Validation Highlights

- `.trim()` on all string fields before validation
- `.refine()` for phone number (strips non-digits, checks ≥ 10 digits)
- `.email()` for built-in email format checking
- `.regex()` for Canadian postal code format
- `.refine()` with cross-field check for confirm password match
- Password strength rules: uppercase, number, special character
- `mode: "onSubmit"` — validates on submit press (instructor recommended)
- `mode: "onBlur"` on auth forms — validates when leaving a field
