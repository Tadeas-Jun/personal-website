---
layout: "post.njk"
title: "Collecting Hollow Knight skins"
description: "A reflection on a decentralized internet through the lens of a silly 10 GB collection and a month of my free time."
date: "2024-12-25"
tags: "article"
categories:
  - case study
  - philosophy
---

I have been spending a lot of my free time building up my home lab. I'm running Proxmox on a second-hand desktop computer, as well as some extras with Raspberry Pis. I'm planning on writing a larger article on some homelabbing topics in the future, but before that, I wanted to take a second to reflect on the results of a month of my free time -- an approximately 10 GB large collection of user-created skins for the 2017 game, Hollow Knight.

The internet has been in a weird place for the past couple of years. It has been trending towards centralization: most of the time spent on the internet is spent around a dozen or so websites. Individual forums gave way to Reddit, blogs gave way to posts on social media, and even the way most people consume most media changed from owning to streaming. This has many advantages, perhaps most importantly comfort and ease of access. However, as recent incidents have shown, letting big corporations control most of the internet perhaps isn't the best of ideas, if we are to strive for a free and open internet. Such incidents include:

- Reddit essentially banning 3rd party apps \[[^](https://www.bbc.com/news/technology-65855608)\],
- streaming services removing shows from existence \[[^](https://www.youtube.com/watch?v=zIOsiOHj9fs)\],
- many new popular streaming services popping up, thus requiring more subscriptions to watch popular media,
- AI scraping,
- rising prices of subscription services \[[^](https://financebuzz.com/how-streaming-prices-have-changed)\],
- the handling of the Twitter purchase situation \[[^](https://edition.cnn.com/2022/11/03/tech/twitter-layoffs/index.html)\],
- Google removing Terraria devs' access to a large amount of development data \[[^](https://arstechnica.com/gadgets/2021/02/terraria-developer-cancels-google-stadia-port-after-youtube-account-ban/)\],
- ... and more.

As a reaction to these events, I have been trying to move towards a more decentralized internet. I'm substituting social media with RSS feeds of blogs I enjoy reading, I purchase physical media, and I started my home lab to avoid relying on services such as Google Photos or Drive (this also has privacy benefits, the discussion of which is definitely important but out of scope of this article). I have automatic backups set up for most of my data, and I share the storage capabilities with my friends. As a side effect of now owning about 4 TB of extra storage, I started collecting digital things that I care about.

Hollow Knight is a metroidvania created by Team Cherry and released in 2017. Even 7 years after its release, the game has a very vibrant and active community. Some of its members create custom skins, which allow players to change how certain aspects of the game (most importantly the player character) look. There are over a two hundred of these skins publically floating around the internet, but most of them are available via sources that I wouldn't consider reliable in the longterm. Some of them are on community-maintained Google Drives, many of them are also shared via the biggest community Discord servers, etc. There is a fairly [comprehensive list](https://docs.google.com/document/d/1qKfOtOXpYormusD05I700P8d79E74R1bTb3MP4vum-E/) that [ColetteMSLP](https://www.twitch.tv/ColetteMSLP/) maintains, which links to where many of the skins can be obtained, and the community at large is very willing and capable of helping individuals find skins that aren't on the list. Despite this, one has to think what happens to these skins years down the line? If (/ when) Silksong, the sequel to Hollow Knight releases, the community will presumably largely move on to that game. Community-mainted lists, Discord servers, and Google Drives might die in a manner of years.

Because of this, I've decided to create a small collection of Hollow Knight skins, functioning as a personal archive, which, copyright allow and circumstances require, can be shared with other people who might be looking for lost art. The skins are usually very small (around 20 MB per one), so they are very low-cost to keep. Obviously, as other sources, this will never be a fully comprehensive list, but my hope is that, should some of these skins get lost to the general entropy of the internet, my collection can serve as one node in the large scale archiving effort. And as a fan of the game who regularly replays it, I will actually find use for many of these skins!

Now about the actual collection. I began by going through the aforementioned list by Colette and downloading every skin listed. The difference between collecting and hoarding is organization, so I also added a `metadata.json` file to every skin, in the following format:

```
{
	"name": "Baby Mantis",
	"author": "Northflowo",
	"desc": "Birthplace, Cloak, Compass, DreamArrival, Dreamnail, Hatchling, Hornet, HUD, Knight, OrbFull, Quirrel, Shade, Shriek, Sprint, Unn, Webbed,  Wings",
	"source": "https://drive.google.com/file/d/1vxfBOZ0swd0RSvw7075lvHotN8bkKQGq/view",
	"dateAdded": "2024-11-18"
}
```

This was the majority of the work, and, much like when [drawing pixel art using CSS](/blog/css-art), I did quite enjoy the mindlessness of it for some time. After going through Colette's list, there were a few other skins that the Discord communities put together that I also added. With some skins, I managed to get multiple versions, and I saved all of them. During this process, I normalized the names of the skins to include the version number in parentheses, if necessary. For example, I changed the name of `Chara 3.0` to `Chara (3.0)`. Otherwise, I kept everything in the original format. I always kept all of the files in the downloaded directories, in order to present the original skin as closely as possible. Doing this, I noticed that downloading from Google Drive breaks Chinese characters in text files (at least for me, I suspect this has something to do with how one of the many nodes in the download process encodes characters?), so when applicable, I had to copy-paste Chinese text into README files manually.

About 20 hours into this process, I realized something. Each of the skins has a standardized spritesheet of the various artworks. Each of them also has a standardized metadata file, created by me. If that's the case, it would be *really* simple to code a small one-page website that showcases all of the skins, along with their metadata, and links to the original source. [So I did that](https://hkskins.art/).

I spun up the website using [Gatsby](https://www.gatsbyjs.com/), which is an open-source React-based framework that I've been experimenting with. I chose it mainly because I have recent experience in it (I'm re-coding one of my biggest projects in it at the moment, expect a post about that within a few months), and because it allowed me to modularize components I needed to include very quickly. I wanted the website to be self-contained, so I naturally had to include all of the skins in the website's directory. To avoid unncessarily wasting space (and directly hosting 10 GB of copyrighted content), I wrote a quick JS script that would take my skin collection as input and ouput the same file structure, but with just the `metadata.json` file and a `preview.png` file inside each skin's folder. The `preview.png` file is a single sprite automatically cut out of the main spritesheet for the `Knight.png`, the player character (using the [sharp](https://www.npmjs.com/package/sharp) npm package). In 99% of cases, this worked perfectly. With 4 or 5 skins, I had to manually adjust the crop later to ensure some pixels weren't getting cropped off. I included this minimized collection in the website's directory, and I also .zip'd it and added a download link in case anyone had any use for it. The metadata should make it easy to parse. The code for the website (but not for the utility script, I felt that was uncessary, as it's very simple) is available on [GitHub](https://github.com/Tadeas-Jun/hkskins).

There are a few things I would like to add to the website (and to my collection). An RSS feed would be nice, for when I end up adding new skins. If I felt it was worth it, I could connect it to my [Umami](https://github.com/umami-software/umami) instance to see if people are actually visiting the website without compromising anyone's privacy. I had the idea of coding up a quick public API for the skin list, maybe with an option to select a random skin, filter by what's included in the artwork, etc. Finally, there can always be more skins -- so far, I didn't include any skins that don't modify the player character but do modify some other parts of the game, even though there is plenty of those. This last one is my priority, because I definitely want those in my collection for archival purposes. Finally, once Silksong comes out, I'm probably going to add skins for that game to the website as well (although I'll play with the frontend a bit to prevent it from getting too messy).

In the end, this project took a bit over a month of most of my free time. I enjoyed my time with it, and I found more than a couple skins that I will actually use now when I'm playing the game. I'm happy with the website, and I hope that it will serve as a comprehensive(-ish) and organized resource for the community. My personal archive is backed up regularly to multiple disks to ensure that it doesn't get lost (while I don't have a full 3-2-1 backup solution set up yet, I'm getting there -- this is probably another topic for an article later on down the line). Overall, I would consider this a very successful side project. With this done, with some luck, the consequences of centralization and entropy of the internet will miss the incredible art of skilled Hollow Knight artists.

Happy holidays! 🎄

## Update: A year later
This article was originally released on the 25th of December 2024. I'm writing this update at the end of October 2025. There has been a lot of developments for Hollow Knight as a whole, as well as for HKSkins, so I figured I would update this article to document these changes.

Since its release, the community's response to the website has been amazing. I posted about it on the Hollow Knight Discord servers and Google (and other search engines) picked up on it. The site quickly climbed up to the first rank of Google for the search term "hollow knight skins", and thus started receiving a huge influx of visitors. At this time, the site gets around 3 000  visits a day.

Once it started seeming more and more likely that Silksong (Hollow Knight's sequel game) would really release in 2025, I implemented a couple of features for the website in preparation for the sequel. I added a `game` element for each skin's metadata in order to indicate if it was a Hollow Knight or a Silksong skin. To differentiate between them on the website, I added a switcher above the search bar. I also implemented filters based on if each given skin included sprites for the main character or not, as well as an RSS feed so users can subscribe to see when updates happen.

Near the end of August 2025, Team Cherry put out the release trailer for Silksong, alongside with the release date for the game, September 4th. At that point in time, I decided to do my best to catch up in filling in all of the original Hollow Knight skins I could find. I spent a couple hours every day filling out the database and ended up finishing a day before Silksong's release, having added 183 new skins in the last few days. You can see a history of these changes in the GitHub repo's commit history.

Only two months after the game's release, there are already plenty of Silksong skins. These I also started adding to the website, dedicating every other weekend to updating HKSkins. Because of it's popularity, I regularly get e-mails and Discord messages informing me of new skins, and a few messages from skin artists themselves, asking me if I could add their work to the website. I find this very impactful, and I'm grateful that I can provide such an important resource for the community. I hope to keep track of all the new skins that are going to be coming out over the next few years and keeping the website updated!

Happy Halloween! 🎃
