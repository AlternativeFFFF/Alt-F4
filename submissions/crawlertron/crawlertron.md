---
author: Lovely_Santa
---

### Spidertron Missed Leg Day
I think I speak for the majority of the early-access community when I say that I was pleasantly surprised when I saw the release notes for version 1.0! As your friendly neighborhood mod creator, I had to take a closer look under the hood to see how spidertron is built, opening my mind so new mod ideas could start to grow.

Like most fans of Arch666Angel already know, I am [one of the contributors](https://forums.factorio.com/viewtopic.php?p=475786#p475786) to the Angel’s mods. Since [Angel’s Exploration](https://mods.factorio.com/mod/angelsexploration) is in a very early stage of development, I could not imagine a better place to put spidertron to good use. I will not spoil what I have brewing, instead I would rather take this moment to share some of the struggles of the development process.

Let us meet Crawlertron, the Angel-branded spidertron that will join the Crawler family in Angel’s vehicles. One requirement I have for my new Crawlertron is his size. I want him to be smaller, quite a bit smaller actually. This meant I had to introduce a scaling factor to the spidertron definitions in order to be able to scale him down. As some of you fellow mod creators have surely already noticed, he has one of the largest prototypes in the game. A few hours and a few cups of deliciousness later, after defining everything with a scaling factor, I could start loading up the game to see my result. Scaling Crawlertron down (scaling factor < 1) would not show me obvious mistakes in my coding, so I decided to scale him up instead (scaling factor > 1), with this being the result:

![A large crawlertron with tiny legs.](https://raw.githubusercontent.com/LovelySanta/Alt-F4/crawlertron/submissions/crawlertron/crawlertron_large.png)

As you probably noticed, his legs look like tiny sticks! It’s a wonder that he hasn’t broken a leg yet! Returning to my Crawlertron leg definitions, I could not find anything wrong with them, so I chose to ask for help in the Factorio Discord modding channel. Klonan (a Wube team member, seen on [this page](https://factorio.com/game/about) enjoying two beers at the same time) even said that it would require some Factorio engine rewrite to allow his legs to scale correctly. In the meantime, Klonan asked me to scale him down, to see if that would work at least. Well, have a look:

![A small crawlertron with thick legs.](https://raw.githubusercontent.com/LovelySanta/Alt-F4/crawlertron/submissions/crawlertron/crawlertron_tiny.png)

I guess you can spot what the issue is in this case, because it’s the same as before! We can see that not everything works directly out of the box, which can have some fun side effects. I am sure this will be fixed in a future update; in the meantime I already registered [a bug report](https://forums.factorio.com/viewtopic.php?f=7&t=88180) about it with the developers. I may come back in a future update to showcase you what Crawlertron has become, and how his legs have healed.
