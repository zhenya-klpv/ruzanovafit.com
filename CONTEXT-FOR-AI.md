# Ruzanova Fitness — Context for AI

**При перезагрузке: загрузи этот файл (@CONTEXT-FOR-AI.md), чтобы продолжить без потери контекста.**

---

## Что это за проект

- **Сайт**: [ruzanovafit.com](https://ruzanovafit.com) — персональный тренер и нутрициолог Alena Ruzanova, Калифорния.
- **Репозиторий (источник правды)**: [github.com/zhenya-klpv/ruzanovafit.com](https://github.com/zhenya-klpv/ruzanovafit.com). Локальная версия должна совпадать с этим репо.
- **Стек**: Next.js 14 (App Router) в **корне** проекта — не в подпапке `frontend/`. Tailwind, TypeScript. Статический экспорт (`output: 'export'`), деплой на Netlify из папки `out/`.
- **Backend**: FastAPI в `backend/`. Netlify: `netlify/functions/yelp-reviews.js` для `/api/yelp-reviews`.

---

## Структура (как на GitHub)

| Путь | Назначение |
|------|------------|
| **app/** | Next.js App Router: layout.tsx, page.tsx, globals.css, security/page.tsx. |
| **components/** | Hero, Philosophy, ProblemSolution, InputTypes, UseCases, Testimonials, Security, TrustAnchors, CTABlock, Header, Footer, Section, CTA, BoundedShape, HowItWorksSteps, TrustBadge и др. |
| **public/** | Статика, изображения (public/images). |
| **package.json** (в корне) | next 14, react 18, scripts: `dev` (port 3001), `build`, `start`, `lint`. |
| **next.config.mjs** | output: 'export', trailingSlash: true, images.unoptimized: true. |
| **netlify.toml** | publish = "out", command = "npm run build", functions = "netlify/functions". |
| **netlify/functions/** | yelp-reviews.js (YELP_API_KEY в Netlify). |
| **backend/** | FastAPI (contact, booking, Yelp proxy). |
| **setup-node-path.ps1**, **setup-node-path.cmd** | Один раз добавить Node в PATH. |
| **start-dev.ps1**, **start-dev.cmd** | Запуск dev-сервера из корня (port 3001). |

Удалено: старая папка frontend/, docs/, scripts/, лишние .md и утилиты (find-node, build-optimize, generate_favicons и т.п.).

---

## Как запустить локально

Из **корня** проекта (`H:\_ws`):

```powershell
npm install
npm run dev
```

Открыть **http://localhost:3001** (порт 3001, не 3000).

Или: двойной клик по `start-dev.cmd` или в PowerShell `.\start-dev.ps1`.

---

## Синхронизация с GitHub

Чтобы сбросить локальную копию до версии с GitHub:

```powershell
cd H:\_ws
git fetch origin
git reset --hard origin/main
```

После этого выполнить `npm install` и `npm run dev`.

---

## Ключевые файлы

- **app/layout.tsx** — корневой layout, метаданные.
- **app/page.tsx** — главная: Header, Hero, Philosophy, ProblemSolution, InputTypes, Testimonials, Security, TrustAnchors, CTABlock, Footer.
- **app/globals.css** — глобальные стили, переменные (--color-surface, --color-ink, --color-accent).
- **components/Hero.tsx**, **CTABlock.tsx**, **Header.tsx**, **Footer.tsx** — основные блоки.
- **next.config.mjs** — экспорт и изображения.

---

*Обновлено после приведения локальной версии к [GitHub](https://github.com/zhenya-klpv/ruzanovafit.com).*
