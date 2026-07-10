// @ts-check

import fs from 'node:fs';
import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import rehypeMathjax from 'rehype-mathjax';
import remarkMath from 'remark-math';
import { parse } from 'smol-toml';

import tailwindcss from '@tailwindcss/vite';

import expressiveCode from 'astro-expressive-code';

const siteToml = parse(fs.readFileSync(new URL('./src/config/site.toml', import.meta.url), 'utf8'));
const configuredMathRenderer =
  typeof siteToml === 'object' &&
  siteToml !== null &&
  'config' in siteToml &&
  typeof siteToml.config === 'object' &&
  siteToml.config !== null &&
  'math' in siteToml.config &&
  typeof siteToml.config.math === 'object' &&
  siteToml.config.math !== null &&
  'render' in siteToml.config.math
    ? siteToml.config.math.render
    : undefined;
const mathRenderer = configuredMathRenderer === 'mathjax' ? 'mathjax' : 'katex';
const configuredWebsite =
  typeof siteToml === 'object' &&
  siteToml !== null &&
  'config' in siteToml &&
  typeof siteToml.config === 'object' &&
  siteToml.config !== null &&
  'profile' in siteToml.config &&
  typeof siteToml.config.profile === 'object' &&
  siteToml.config.profile !== null &&
  'website' in siteToml.config.profile &&
  typeof siteToml.config.profile.website === 'string' &&
  siteToml.config.profile.website.length > 0
    ? siteToml.config.profile.website
    : undefined;

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const customSite = process.env.SITE_URL;
const customBase = process.env.SITE_BASE;
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isProjectPage =
  Boolean(repositoryOwner) &&
  Boolean(repositoryName) &&
  repositoryName !== `${repositoryOwner}.github.io`;

const githubPagesSite =
  repositoryOwner && repositoryName
    ? `https://${repositoryOwner}.github.io${isProjectPage ? `/${repositoryName}` : ''}`
    : undefined;

const resolvedSite =
  customSite ||
  configuredWebsite ||
  (isGitHubActions && githubPagesSite ? githubPagesSite : 'https://example.com');

const resolvedBase =
  customBase || (isGitHubActions && isProjectPage && repositoryName ? `/${repositoryName}` : '/');

// https://astro.build/config
export default defineConfig({
  site: resolvedSite,
  base: resolvedBase,
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [mathRenderer === 'mathjax' ? rehypeMathjax : rehypeKatex],
    }),
  },
  integrations: [expressiveCode(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
