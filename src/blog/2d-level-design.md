---
layout: "post.njk"
title: "How to design breathtaking 2D platformer levels"
description: "An examination of the level design of 2018's Celeste."
date: "2024-08-31"
tags: "article"
categories:
  - software engineering
  - game development
eledris: true
eledrisReleaseDate: "2019-10-21"
---

Platformers have been popular since the dawn of games; from Super Mario Bros. of 1985 to Celeste of today. Good level design is one of the most essential parts of a platformer. Want to design breathtaking levels for your game?

[Celeste](https://www.celestegame.com/), the game I mentioned, is one of the best platformers I have ever played in my life. It was originally created in a short game jam, with the final product releasing in early 2018. If you haven’t, you should check Celeste out. The game connects pixel tight controls, cute pixel art, an excellent story, and a breathtaking score. I could talk about this masterpiece of a game for ages (and I probably will, there's a few more case study ideas I have for it). However, today I’d like to focus on only one aspect of the game: the level design.

The game features 9 chapters, most of them having 3 variations (A-sides, B-sides, C-sides, each increasing in difficulty). Madeline, the protagonist of the game, has only 3 main moves: the jump, the dash, and the climb. So how did the developers achieve fun, challenging, and interesting gameplay all throughout these plentiful levels of the game?

While Madeline can do only these three basic moves, each chapter features a halo of new mechanics. The game teaches you these mechanics flawlessly, then ramps up the challenge, usually ending the chapter with a climactic combination of everything you’ve learned. This, as well as the fact that Madeline’s movements can also be combined, strung together into combos such as hyperdashes, wallboosts, spikejumps, and a plethora of other advanced tricks, creates amazing level concepts that don’t get boring for the whole game.

![Learn all about 2d platformer level design in this article, partly a case study of Celeste and Mario games.](/assets/img/blog/lvl-celeste-1b-platformer-level-design.png)

Let’s see what each chapter of Celeste does to guide the player through its levels, step by step. This way, we can learn the platformer level design techniques of the game development masters behind this game.

## Introducing new mechanics
In Celeste, each chapter presents the player with some new mechanics (usually at least 3). These could range from platforms that launch you high up to the air, enemies that follow your movement, to wind that messes up your sense of speed. The game manages to teach the player over 40 unique mechanics, while not overwhelming them.

To do this, the game uses a pattern that is common in successful platformers, including, for example, many Super Mario games. Next time you play a platformer game, try to notice the pattern:

1. Each new mechanic is introduced in a safe space. Here, the player can get used to the mechanic without having to fear death.
2. After that, there’s the first challenge. At this point, the player knows that the mechanic exists, and did have some time to prepare for the challenge, so this shouldn’t be much of a problem.
3. As the player progresses further in the level, the mechanic is presented in harder challenges. The obstacle is faster, the timing window to pass the challenge is smaller, or the obstacle is present multiple times.
4. Lastly, the newly introduced mechanic is combined with already existing mechanics to achieve maximum challenge.

This approach is established in level design. It ensures the player doesn’t get surprised by a new mechanic or frustrated by dying a lot early on. As the level progresses, the challenge ramps up, until the climax, combining everything the player has learned about this new mechanic, along with all the already established ones. In the end, the player can feel good about themselves while being able to track the journey they took to master the given challenge in all circumstances.

## Designing levels
Now you know how game designers introduce new mechanics to the player, and how they pace the difficulty throughout a chapter of the game. But what about the levels themselves? Celeste has over 500 rooms -- individual levels the player has to jump, climb, and dash their way through to get to the end of the game. What goes to designing such a room?

Maddy Thorson, the lead developer of Celeste, goes into detail on her level design process in a GDC talk, titled “[Level Design Workshop: Designing Celeste](https://www.youtube.com/watch?v=4RlpMhBKNr0)“. You can watch the whole 30-minute talk by clicking on the link.

In summary, every level in Celeste is a very small, self-contained story. Maddy describes how she and her team iterate on different designs of the level, all to give the player several options on how to play the story. The game is also designed to be enjoyed by speedrunners, so Maddy includes ways to directly skip some parts of the level for more skilled players.

In Celeste, each chapter is designed around several of the new mechanics. This is because individual levels, or rooms, are very short. In games with longer connected levels, such as many Mario games, each level is instead designed around a certain mechanic.

## Collectibles and extra challenges
One thing Celeste really excels at is adding additional challenges for determined players. If a player wants to simply complete the main story of the game and move on, it will take them a few hours, but it will not be that hard. However, the main story is only a fraction of the game’s content. There are multiple sets of collectibles and extra, optional, but very entertaining, challenges in the game. There are strawberries -- collectibles in almost every room that can be collected via completing a challenging series of jumps and dashes. In each chapter of the game, the player can also find a B-side cassette. After finding the cassette, they can play a much harder version of the chapter.

There are also crystal hearts that involve the player completing a little puzzle in each chapter. After getting a few of these hearts and/or completing some of the B-sides, chapter 8 opens. This bonus chapter changes some of the core mechanics of the game, providing an additional challenge. Even that’s not the end though.

![One of the C-side levels of the Mirror Temple chapter of Celeste, the 2d platformer video game.](/assets/img/blog/lvl-celeste-5c-platformer-level-design.png)

Once the player completes all B-sides, C-sides for each chapter unlocks. These are very short but very challenging versions of the original chapters. Finaly, golden strawberries also unlock. Golden strawberries are the ultimate collectible in the game. Each chapter has only one (except Chapter 1 A-side, more on that in a second), and to acquire it, one has to complete a whole chapter without dying once. In the final chapters of the game, this is such a difficult challenge, that the community literally [keeps a spreadsheet](https://docs.google.com/spreadsheets/d/1FesTb6qkgMz-dCn7YdioRydToWSQNTg1axFEIHU4FF8/) with all the players who have achieved it. As of mid-2024, there's under a 1 000 players who got the last golden strawberry.

There are other small isolated bonus challenges in the game. As mentioned, Chapter 1 A-side has an extra golden strawberry that a player can acquire after beating the chapter without dashing (it took me about 6 hours to get it), and more. Celeste makes an interesting point for game developers; these little challenges are not hard to implements (I don’t imagine the golden strawberries taking more than a few hours of development), you can get a great amount of bonus content from the levels you have already created for the game.

## Generic level design tips
There are some other general tips that come into effect when designing levels. Here's a rapid fire list. If you have some experience with level design and have some tips to share, please feel free to email me.

- It’s very easy to fall into the trap of symmetrical levels. Don’t do this -- an asymmetrical level is usually much more interesting.
- You should playtest as much as possible. Find people to play your levels early, watch how they react to them, keep notes on how potential players play. Run through your own levels. Try getting through them as fast as possible, as slow as possible. Try what happens when you screw up at some places. Do your best to break your own level.
- Don’t be afraid to trash a level if it’s just not working. Don’t worry, you’ll come up with many more amazing level ideas.

## Conclusion
I hope that these tips were helpful to get you kickstarted on your level design journey. There is, obviously, much more to level design. If you have any insights or anectodes, I'd love to hear from you! This article also does not touch upon 3D level design, as that's an area I have zero experience in, and is, presumably, an entirely different cup of tea.
