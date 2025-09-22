# Copilot Instructions for Appointment-Website

## Project Overview
- This is a React single-page application bootstrapped with Create React App.
- The app is structured by feature and UI domain: `src/components/`, `src/pages/`, `src/features/`, and `src/navigation/`.
- State management uses Redux Toolkit (see `src/features/store/store.js` and slices in `src/features/slices/`).
- Firestore integration is configured in `src/config/firestore.js`.

## Key Patterns & Conventions
- **Component Organization:**
  - UI components are grouped by domain in `src/components/` (e.g., `button/`, `footer/`, `header/`).
  - Page-level components live in `src/pages/` (e.g., `home/`, `login/`, `signup/`).
  - Use CSS modules for component and page styling (e.g., `button.module.css`).
- **Routing:**
  - Navigation logic is in `src/navigation/` with `PrivateRouting.js` and `PublicRouting.js` for access control.
- **State Management:**
  - Use Redux Toolkit slices for feature state (see `src/features/slices/`).
  - Store configuration is in `src/features/store/store.js`.
- **Assets:**
  - Images and icons are in `src/assests/` (note the nonstandard spelling).
- **Firestore:**
  - All Firestore config and usage should go through `src/config/firestore.js`.

## Developer Workflows
- **Start Dev Server:** `npm start`
- **Run Tests:** `npm test`
- **Build for Production:** `npm run build`
- **Linting:** No custom lint scripts; rely on Create React App defaults.

## Project-Specific Notes
- Use only CSS modules for styling; do not use global CSS except for `index.css`.
- All navigation should use the React Router setup in `src/navigation/`.
- When adding new features, prefer colocating Redux slices and related logic in `src/features/`.
- For new assets, add to `src/assests/` and reference with relative imports.
- Do not modify files in `public/` except for static assets and `index.html`.

## Examples
- To add a new page, create a folder in `src/pages/`, add a component and a CSS module, and register the route in `src/navigation/PublicRouting.js` or `PrivateRouting.js`.
- To add a new Redux slice, create it in `src/features/slices/` and add it to the store in `src/features/store/store.js`.

---
For more, see `README.md` and the `src/` directory structure.
