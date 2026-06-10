# CLAUDE.md

This is a personal blog built with [Eleventy (11ty)](https://www.11ty.dev/) and deployed to GitHub Pages.

## Build commands

```bash
# Local dev server with live reload
npm run

# Production build (with GitHub Pages path prefix)
npm run build-ghpages
```

Node.js is managed via nvm. Activate before running:
```bash
export PATH="$HOME/.nvm/versions/node/v22.17.0/bin:$PATH"
```

## Project structure

```
src/
├── index.njk                  # Homepage
├── _includes/layouts/         # All layouts (Nunjucks + HTML)
│   ├── base.njk               # Root HTML wrapper
│   ├── post.njk               # Individual post layout (chains to base.njk)
│   ├── home.html              # Homepage listing layout
│   ├── allposts.html          # All-posts chronological listing
│   ├── bookreviews.html       # Book reviews listing
│   ├── technology.html        # Technology posts listing
│   ├── philosophy.html        # Philosophy posts listing
│   ├── default.html           # Generic wrapper (chains to base.njk)
│   └── page.html              # Static page layout
└── posts/
    ├── posts.json             # Directory data: sets layout + tags for all posts
    ├── *.md                   # Root-level posts (tech, philosophy, general)
    ├── book-reviews/          # Book review posts
    ├── code-patterns/         # Coding pattern posts
    └── travel/                # Travel posts
```

## Post frontmatter

All posts use this format:

```yaml
---
title: "Post Title"
date: 2026-01-15T10:00:00+05:30
tags: ["travel", "india"]
summary: "Short description shown in listings"
---
```

- `layout` is **not** needed — `posts.json` sets `layout: layouts/post.njk` for all posts
- `date` must be ISO 8601 with timezone colon (`+05:30` not `+0530`)
- `tags` is a YAML array; merges with the `"post"` tag from `posts.json`
- File extension must be `.md` (not `.markdown`)

## 11ty collections

Tags on posts automatically create collections:

| Tag | Collection | Used in layout |
|-----|-----------|----------------|
| `post` | `collections.post` | all listing layouts |
| `bookreview` | `collections.bookreview` | `bookreviews.html` |
| `technology` | `collections.technology` | `technology.html` |
| `philosophy` | `collections.philosophy` | `philosophy.html` |
| `travel` | `collections.travel` | — |

## Custom filters (eleventy.config.js)

| Filter | Usage | Description |
|--------|-------|-------------|
| `postDate` | `{{ date \| postDate }}` | Human-readable date (`May 20, 2026`) |
| `dateToISO` | `{{ date \| dateToISO }}` | ISO string for `datetime` attributes |
| `limit` | `{{ arr \| limit(5) }}` | Return first N items of an array |

## Adding a new post

1. Create `src/posts/[category]/YYYY-MM-DD-slug.md`
2. Add frontmatter (see format above)
3. Write content in Markdown — Nunjucks templating is available inside posts

## Notes

- Previously a Jekyll site; migrated to 11ty. The `archive/` directory contains the old Jekyll build and is excluded from 11ty via `.eleventyignore`.
- Templates use Nunjucks (`.njk`). Do not use Liquid syntax (`{{ page.title }}`, `assign`, `relative_url`, `site.posts`, etc.) — these are Jekyll-only.
- In Nunjucks layouts, post data is accessed as `post.data.title`, `post.date`, `post.url` (not `post.title`).
