<p align="center">
  <img src="./public/images/wenfeng-logo.png" alt="Wenfeng logo" width="220" />
</p>

<p align="center">
  Repository for Wenfeng Xing's personal website.
  <br />
  <sub>A home for projects, writing, experiments, and public notes about software, finance, and long-term thinking.</sub>
</p>

<p align="center">
  <a href="./README.en.md">English</a>
  ·
  <a href="./README.md">简体中文</a>
  ·
  <a href="https://github.com/bearfighting/wenfeng-xing-site">GitHub</a>
</p>

## What This Repository Is

This is the codebase for my personal website, built with Astro and organized around content first.

The site currently includes these sections:

- Home: positioning, current focus, and entry points.
- Blog: writing on software, finance, learning, and product thinking.
- Projects: product notes and long-term work in progress.
- Vibe: lighter short-form notes and development fragments.
- About: personal introduction and site context.

It is not a generic starter and not a resume template. It is meant to be a long-lived personal workspace on the web.

## Stack

- Astro
- TypeScript
- MDX
- Pagefind
- Bun
- Sharp

## Development

Install dependencies:

```sh
bun install
```

Start the dev server:

```sh
bun run dev
```

Build for production:

```sh
bun run build
```

Preview the production build:

```sh
bun run preview
```

Run type checks:

```sh
bun run lint
```

## Main Content Entry Points

These are the files and directories I update most often:

```text
src/config/site.toml        Site title, navigation, homepage content, profile, search, comments
src/content/about.mdx       About page content
src/content/blog/           Blog posts
src/content/projects/       Project pages
src/content/vibe/           Short notes
public/images/              Image assets used by the site
```

At the moment, the repository already contains:

- `src/content/about.mdx`
- `src/content/projects/index.mdx`

Blog and Vibe content will continue to grow over time.

## Creating New Content

Create a blog post:

```sh
bun run post:new my-first-post
```

Create an MDX blog post:

```sh
bun run post:new my-interactive-post --mdx
```

Create a Vibe note:

```sh
bun run vibe:new today-note
```

## Routes

```text
/                 Homepage
/blog             Blog index
/blog/[slug]      Blog post
/projects         Project index
/projects/[slug]  Project detail
/vibe             Short-note timeline
/about            About page
/rss.xml          RSS feed
```

## Site Configuration

Site-level configuration lives in `src/config/site.toml`:

- `[config.site]`: title, descriptions, repository URL, footer note
- `[config.profile]`: name, role, location, email, GitHub, website, avatar
- `[[config.topNav.links]]`: top navigation links
- `[config.home]`: homepage hero, current work, nav cards, contact links
- `[config.search]`: search behavior
- `[config.comments]`: comment provider settings
- `[config.theme]`: palette selection

The shape of the config is validated in `src/content.config.ts`, so invalid fields fail during build.

## Deployment

This is a static site. Production output is generated into `dist/` and can be deployed to:

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

To override the public site URL during build:

```sh
SITE_URL=https://example.com bun run build
```

## Project Structure

```text
public/
  favicon*                Site icons
  images/                 Active image assets
src/
  components/             UI components
  config/                 Site configuration
  content/                Markdown / MDX content
  layouts/                Page layouts
  pages/                  Routes
  styles/                 Global styles
scripts/                  Content and font utilities
```

## Note

This repository started from an Astro content-site starter, but it is being steadily reshaped into my own long-term personal website.
