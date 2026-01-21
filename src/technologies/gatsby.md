---
tags: technology
title: Gatsby.js

layout: technology.njk
shown: true

image: /assets/img/technologies/gatsby.svg
imageAlt: Gatsby.js logo

externalLink: https://www.gatsbyjs.com/

i18nTitle: home.technologies.technology.gatsby.title

---

[Gatsby.js](https://www.gatsbyjs.com/) is a a static site generator built on React. It's one of my current favorite frameworks, as it's fairly fast, easy to use, and I haven't ran into any major limitations in using it. It has a plugin ecosystem, but I have found that most of the plugins aren't updated very frequently anymore -- nevertheless, everything I need to do is doable without a plugin (some details below). Below are some project that I've used Gatsby with.

## Art Prompts
[Art Prompts](https://artprompts.app/) is the biggest project I've used Gatsby in. The entire front-end for the project is built upon it, working alongside a backend API written in Express.js. The plugins that I use without any issues are `sass`, `sitemap`, and `manifest`. I've also tried using the `offline` plugin to implement PWA functionality into Art Prompts, but I couldn't get it to work well with my fairly extensive needs. I could imagine it working well for simple website, but for AP, I had to code my own service worker (which is possible and explicitly supported in Gatsby).

![A screenshot of the homepage of Art Prompts, containing a large text saying 'Draw a four-leaf clover with raindrops on it.' Below the text is a 'New prompt' button and several illustrated buttons standing for various categories of prompts.](/assets/img/screenshots/screenshot-artprompts.png)

## HKSkins
I've created [HKSkins](https://hkskins.art/) as I was in the middle of coding the revamped Art Prompts website, so I used it as an excuse to further familiarize myself with Gatsby. The website runs on it without any problems, using the filesystem combined with GraphQL to load all of the skins on the website. Furthermore, it uses the `feed` plugin to automatically create an RSS feed for the website.

![A screenshot of the HKSkins website, showcasing a grid of skins for the game Hollow Knight.](/assets/img/blog/hkskins-screenshot1.png)
