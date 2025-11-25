Overview of style organization
===============================

This folder organizes styles for the Happy Cart application.

Structure
---------
- `src/styles/global.css` - CSS variables, resets, and global rules
- `src/styles/pages/` - page-specific styles (e.g., `Home.css`, `Cart.css`)
- `src/styles/auths/` - authentication page styles (login, signup, reset)
- `src/styles/admins/` - admin page styles
- `src/styles/components/` - small UI component styles such as `Navbar.css`, `Footer.css`, `ShopNow.css`, `Sidebar.css`

Guidelines
----------
- Use `pages/` for layout-specific styles only; components should import component styles.
- Import page styles from page components (e.g., `src/pages/home/Home.js` imports `../../styles/pages/Home.css`).
- Keep tokens and utility classes inside `global.css` to promote re-use.
- Prefer small, focused CSS files per component for maintainability.

Migration notes
---------------
The previous folder `src/styles/component` has been renamed to `src/styles/components/` and imports updated.
