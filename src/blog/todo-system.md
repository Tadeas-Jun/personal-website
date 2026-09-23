---
layout: "post.njk"
title: "My to-do system for codebases"
description: "A small convention I've developed for myself over the years."
date: "2026-09-03"
tags: "article"
categories:
  - software engineering
---

Over the years, I've developed many personal and professional projects on which I was the sole developer. Some of these, such as [Art Prompts](https:/artprompts.app/), are codebases with many tens of thousands lines of code, where project management and organization is very important. Throughout these projects, I've worked out a system of writing to-do comments that helps me stay organized. This blog post briefly outlines this system, just in case anyone was looking for any inspiration.

Besides using actual project management tools, such as [Vikunja](https://github.com/go-vikunja/vikunja), I always write down smaller stuff that needs to be done as comments within the code. All of the comments have the following format: `TODO ({type}): `.

Many IDEs will highlight `TODO` comments, or even provide you with a separate tab listing all of them. Traditionally, these comments are only tagged by those initial 4 capitalized letters. I've additionally come up with a few types that a to-do comment can have; these types go into the parentheses. I use the following types:

- `feature`: Tasks that will take a longer time to implement and will result in a new feature available to the users of the project.
- `refactor`: Tasks that won't change the functionality of the code, but will improve its performance, readability, or security.
- `i18n`: Places in the code where internalization and translation isn't implemented yet.
- `docs`: Documentation tasks.

Whenever I'm working on a big feature that has to get broken down into several tasks, I use a new type for that specific feature. This could be something like `TODO (Twitch)` when I'm working on the Twitch API integration for Art Prompts, or `TODO (publishers)` when I'm working on implementing a complex publisher data system for Trezor Oáza Olomouc.

Finally, I use `TODO (pickup)` when I'm in the middle of working on some code but have to take a break or I'm calling it a day. I always only keep one `pickup` comment per project, and I use it to describe in detail what I've done in the last programming session and what should happen next. This way, when I sit back down to my laptop to continue working, I can quickly get my bearings again.

This is by no means a super robust system, but it's something I've just naturally arrived at while working on projects of all sizes. The main reason why I enjoy sticking to this system is that, since I'm consistent about how I write my comments, I can easily switch projects and quickly get a grasp on what needs doing.
