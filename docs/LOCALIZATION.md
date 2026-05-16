# 🌍 Mezan Localization Guide

This project uses **Next-Intl** for a professional, URL-based localization system (`/en`, `/ar`). This approach is SEO-friendly and ensures the correct language is always preserved in the URL.

📚 **Official Documentation:** [https://next-intl.dev/](https://next-intl.dev/)

---

## 📁 Key Files & Folders

| Path                 | Purpose                                                                   |
| :------------------- | :------------------------------------------------------------------------ |
| `app/[locale]/`      | All pages must live inside this folder to be localized.                   |
| `messages/`          | Contains the translation files (`en.json`, `ar.json`).                    |
| `middleware.ts`      | The "Traffic Controller" that handles redirects and prefixes.             |
| `i18n/navigation.ts` | Shared utilities (`Link`, `useRouter`) that add the locale automatically. |
| `i18n/request.ts`    | Configures the server to load the correct JSON messages.                  |

---

## 🚀 How to use in Development

### 1. Translating Text

Always use the `useTranslations` hook. Avoid hardcoding strings.

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("HomePage"); // Namespace from JSON
  return <h1>{t("title")}</h1>;
}
```

### 2. Navigating Between Pages

**Never** use the standard `next/link`. Use the localized `Link` from our navigation file. This ensures the user stays in the same language when they click.

```tsx
import { Link } from "@/i18n/navigation";

// ✅ This will automatically go to /en/calculator or /ar/calculator
<Link href="/calculator">Open Calculator</Link>;
```

### 3. Automatic Redirects

Our `middleware.ts` is configured with a **Universal Matcher**. This means that if a user types a path without a language (like `/calculator`), the system will automatically redirect them to the default language version (`/en/calculator`).

---

## 🔗 URL Structure & Slugs

We use **consistent English slugs** for all languages.

- **English:** `/en/calculator`
- **Arabic:** `/ar/calculator`

**Why we made this choice:**

1.  **Simplicity:** It keeps the folder structure cleaner and easier to manage.
2.  **Consistency:** Sharing links between users of different languages is more reliable.
3.  **Maintenance:** We don't need to map complex `pathnames` in the `routing.ts` configuration.

---

## 🛠️ RTL (Right-to-Left) Support

The layout automatically detects the language and applies `dir="rtl"` for Arabic.

In `app/[locale]/layout.tsx`:

```tsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

## ⚠️ Important Rules

1. **No Root Files**: Never put a `layout.tsx` or `page.tsx` directly in the `app/` folder. They MUST be inside `[locale]/`.
2. **Smart Switcher**: When building a language switcher, use `router.replace(pathname, { locale: 'ar' })` from `@/i18n/navigation` to ensure the user stays on the same page.
3. **Manual Message Loading**: We use a manual `import()` in the layout to ensure that translations are always 100% fresh and accurate during development.
