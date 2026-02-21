---
layout: "post.njk"
title: "Changelog"
tags: "page"
eleventyExcludeFromCollections: true
hideMetadata: true
---

This page documents changes made on this website. It's mostly meant just for my documenting use, but if you've wandered your way here, feel free to read through it!

---

## 2026.2
*2026-02-21*

Articles:
- Released *[Automatic backups on self-hosted Umami analytics via Docker](/blog/selfhosted-umami-docker-backups)*.

---

## 2026.1
*2026-01-21*

Features:
- Added the [sitemap](/sitemap.xml).
- Added this changelog.
- Added a `robots.txt` file.
- Added the version number and release date to the footer.
- Added the technology page feature along with the `technology.njk` page template.
- Reworked the Project sections on the homepage by splitting it into a coding and others sections, keeping only 3 projects per section in the card format with an image, and the rest in the new imageless format inspired by the blog post blurb format.
- Moved all Projects to individual `.md` files.
- Moved all Testimonials to individual `.md` files.
- Added the RSS feed using the `@11ty/eleventy-plugin-rss` plugin. Added a link to it to the [Blog](/blog) page.
- Revamped the localization system to support Markdown formatting and work with all the other changes from this version.

Minor changes:
- Changed versioning schema to calendar versioning.
- Updated dependencies.
- Updated CV to v1.4.0 (2026-01-19).
- Updated footer year.
- Added subtle box shadow to images in blog posts and technology pages.
- Added the `Terapie Lang website`, `Homelab`, `Trezor`, and `HKSkins` projects, hidden the `Jots` project, removed the `Coming soon` placeholder project.
- Rephrased the `Art Prompts` project description, added secondary button linking to case study.
- Moved all sections from the `index.html` file to individual `_includes` files.
- Added the `Next.js` technology.
- Organized the front matter format for technologies and projects.

Articles:
- Released *[Designing for long-term sustainability: Art Prompts revamp post-mortem](/blog/art-prompts-revamp)*.

Technology details:
- Added *[Gatsby.js](/technologies/gatsby)* page.

---

## 1.2.8
*2025-11-24*

Features:
- Added front matter `shown` data to hide un-used technologies from the homepage without having to delete the `.md` files.

Minor changes:
- Updated CV to v1.3.5 (2025-11-09).
- Major update to `eleventy` (`^2.0.1` -> `^3.1.2`).
- Hidden the `Android`, `Docker`, `Eleventy`, `Java`, and `Unity` technologies.

Articles:
- Updated *[Collecting Hollow Knight skins](/blog/hollow-knight-skins)* with the 'Update: A year later' section.

---

## 1.2.7c
*2025-04-12*

Articles:
- Updated *[Tinting a background image with transparency in CSS](/blog/transparent-background-tint-css)* with a live link to the website.

---

## 1.2.7b
*2025-03-24*

Articles:
- Released *[Tinting a background image with transparency in CSS](/blog/transparent-background-tint-css)*.

---

## 1.2.7
*2025-01-26*

Features:
- Updated the homepage to take the technologies from `.md` files dynamically, instead of having each technology be hardcoded in.

Minor changes:
- Added the `CSS`, `Debian`, `Docker`, `Eleventy`, `Express`, `Gatsby`, `MySQL`, `PostgreSQL`, `Proxmox`, `Ubuntu`, and `WordPress` technologies, removed the `Oracle SQL` technology.

---

## 1.2.6c
*2024-12-26*

Articles:
- Released *[Collecting Hollow Knight skins](/blog/hollow-knight-skins)*.

---

## 1.2.6b
*2024-12-02*

Features:
- Added a `humans.txt` file.

---

This website was not versioned controlled or documented before this point.
