---
layout: "post.njk"
title: "Changelog"
tags: "page"
eleventyExcludeFromCollections: true
hideMetadata: true
---

This page documents changes made on this website. It's mostly meant just for my documenting use, but if you've wandered your way here, feel free to read through it!

---

## 2026.8
*2026-09-23*

Features:
 - Implemented the category system for blog posts.
 - Added the [categories](/blog/categories) page, listing all categories used in the blog and their posts.
 - Backfilled categories to all blog posts.
 - Added individual category pages for each blog post category, listing posts in that category (e.g. [/blog/category/art-prompts](/blog/category/art-prompts)).

Minor changes:
 - Removed the rainbow colored text selection blocks.
 - Added a `rel="me"` link to my GitHub profile in the website head.

---

## 2026.7
*2026-09-09*

Minor changes:
- Fixed typo in the English CV (doubled period in the Experiences -- Masaryk University section).

---

## 2026.6
*2026-09-03*

Features:
- Implemented the approximate word count in the blog post metadata section under each post's title.
- Implemented the author block for under blog posts.

Minor changes:
- Moved the `demos` directory from the static `assets` directory to the `src/demos` location.
- Moved the Eledris blog post disclaimer to the `post.njk` template based on frontmatter data instead of manually including it in each article that needs it.
- Removed the `releaseDate` data from the frontmatters of blog posts, now using only ISO 8601 dates.
- Increased the font weight in the CVs, because lighter font weights would clip the edges of some lines in the PDF formats.
- Changed the contact navbar text from "Let's chat" to "Contact".
- Added a horizontal separator under blog posts.

Articles:
- Hidden the metadata in the AI statement post.
- Released *[My to-do system for codebases](/blog/todo-system)*.

---

## 2026.5
*2026-08-25*

Features:
- Implemented the CV pages at `/cv/en` and `/cv/cs`.
- Documented the website in the `README.md` file.
- Added the `LICENSE.md` file.

Minor changes:
- Included `bootstrap` as an `npm` dependency.
- Updated dependencies.
- Moved the Technologies section between the Coding projects and Worldbuilding projects sections on the homepage.
- Exported texts and translations into self-hosted Weblate instance.
- Updated CV to `v2026.2 (2026-08-24)`.
- Changed hover effect for non-detailed technology cards to be grey instead of black, further visually differentiating technologies without a filled in detail page.
- Updated `humans.txt` file.
- Updated `robots.txt` file with new AI bots.

Projects:
- Hidden *Wumpi* and *Palettey* from the Projects list on the homepage.
- Added *BEST website* and *Portfolio website*.

Technologies:
- Hidden *CSS*, *Bootstrap*, *Overleaf*, *Ubuntu*, and *Wordpress* from the Technologies list on the homepage.
- Shown *Eleventy* on the Technologies list on the homepage.
- Updated the *Perl* logo.
- Added the following detail pages:
	- *[Perl](/technologies/perl)*
	- *[Ghost](/technologies/ghost)*
	- *[Next.js](/technologies/nextjs)*
	- *[git](/technologies/git)*
	- *[JavaScript](/technologies/javascript)*
	- *[Discord API](/technologies/discord)*
	- *[Proxmox](/technologies/proxmox)*
	- *[Express.js](/technologies/express)*
	- *[React](/technologies/react)*
	- *[Eleventy](/technologies/eleventy)*

---

## 2026.4
*2026-03-20*

Features:
- Implemented the `order` data element for testimonials.

Minor changes:
- Moved the Testimonial section above the Technologies section on the homepage.

Testimonials:
- Alois Přibyl, Oáza Olomouc

---

## 2026.3
*2026-03-03*

Articles:
- Release *[BLEU score implementation in JavaScript](/blog/bleu-score-implementation-in-javascript)*.
- Fixed slightly incorrect release date in *[Automatic backups on self-hosted Umami analytics via Docker](/blog/selfhosted-umami-docker-backups)*.

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

Technologies:
- Added *[Gatsby.js](/technologies/gatsby)* detail page.

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
