# Portfolio website & blog (tadeasjun.com)
🪐 The *tadeasjun.com* website contains Tadeas Jun's portfolio and personal blog.

The website was originally created in 2023 and went through many changes since then. This README documents the website. It is coded using the 11ty static site generator, using the Nunjucks templating engine. The stylesheets are mostly written in SCSS and uses Bootstrap. The website is localized into English and Czech using `i18next`. Changes are documented on the `/changelog` page.

![A screenshot of the homepage of this website.](/assets/img/screenshots/screenshot-portfolio.png)

## Homepage sections
The primary purpose of the website is to serve as my portfolio, which is mostly contained to the single page. The homepage contains information about me, followed by a dynamic list of my projects, technologies I use, and testimonials about me.

### Projects
All of the projects displayed on the website are stored in `.md` files. Each project's frontmatter contains the project's title, description, image, and button information. Projects can either be of type `card` or `link`. The website shows 3 `card` coding projects and 3 `card` writing and worldbuilding projects; these projects are shown with a thumbnail image and a longer description. The other projects, `link`-type, are shown in a smaller format, without a thumbnail image.

### Technologies
Technology files work similarly to project files. They are stored in `.md` files, always containing frontmatter with information about the technology. Technology Markdown files can also contain content, which will then lead to a separate page documenting my thoughts on the technology, and the projects I've worked on using it.

## Blog
The website also hosts my personal blog, where I write articles on programming. Blog posts are written in Markdown files and displayed on the `/blog` page in reverse chronological order. At the moment, blog posts are not localized. Sometimes I write a longer post that I was planning for months, but oftentimes blog posts are just quick write-ups on a thing I just learned!

Some blog posts I'd like to write in the future include:
- Write-up of my homelab setup
- Series on advanced topics when coding Discord bots
- Documenting a color design system

## Planned features
I think personal websites should be a constant work-in-progress. Here are some things I'd like to do when I'm bored on a spare weekend:
- Translation system for technology detail pages and blog posts
- Copy button for code blocks in blog posts
- French translation

## Contributing
There isn't much to do on the website, but if you find any typos or think of a feature that could improve the user experience, feel free to open a PR! Please don't use AI to generate code for this website.
