  

# JOSEF


![JOSEF at work](https://i.imgur.com/Q18m060.mp4)

This post tries to explain the inner workings of JOSEF’s Organically Self-Expanding Factory (or JOSEF, in short). I‘ll try to give a more or less complete explanation of how it all works, although I won‘t be able to go too much into „combinator by combinator“ detail.

I will try to convince you that you don’t need to be a programmer or a magician to try this yourself! I didn’t have a terrible amount of experience with advanced circuit stuff before I started this and I only know very basic magic. I promise, if you know how to use a combinator and have the patience to fool around a little bit, you can figure this out, too!

First off, JOSEF is made possible by the [recursive blueprints](https://mods.factorio.com/mod/recursive-blueprints) mod. I won‘t explain in detail how it works, but you can automatically place blueprints (solo or from books), offset them by specified distances using the X and Y signal, use (filtered) deconstruction of areas with sizes specified by W (width) and H (height) signals. You can deploy different blueprints from a book by increasing the *construction bot = N* that you‘re sending to the deployer. The mod can do more than that, but that‘s enough for our purposes. Have a look at the mod page for a more complete description.

I‘ll roughly outline how JOSEF works, then dig a little bit into the different parts of it. The general principle goes as follows:

- The base is made of rings of a very simple 2x2 chunk train grid around a central „brain“ cell.

- A new ring gets built once the existing ones have been filled up.

- A train goes through all the cells in a new ring and checks for ore patches.

- Other trains come in to either dedicate the cell to mining, solar or production of building materials.

- Once the existing ring is full, a new ring is started.

## Ring mechanism

Why build complete rings instead of anything more "slow and steady" like spirals? Because it‘s simple, it works and I honestly didn‘t see a reason for anything more complex than that. It only needs 10-15 combinators and doesn‘t have the need for complicated memory (aside from storing the ring number you‘re currently at) or anything like that.

The basic ring building mechanism is as follows:

- Every cell is described by its position on an (X,Y) grid. The innermost cell has the coordinates (0,0). The one to the left has (-1,0), the one on top has (0,-1) and so on.

- Variable N defines the ring it's currently building (the central cell being counted as the N=1 ring). Let‘s take N=3 (i.e. turning a 3x3 into a 5x5 grid) as an example here.

- The ring is split into the horizontal (top/bottom) and vertical rows (left/right). To build the horizontal (blue) rows, you want X to run continuously from the leftmost (-2) to the rightmost (2) coordinate and Y to flip between -2 and 2. Interchange X and Y and you get the vertical (orange) rows.

- This is achieved by having a running (A) and a flipping (B) variable that first get assigned to A=X and B=Y for a few seconds (enough ticks to place hundreds of cells) and then the other way around.

![The basic ring logic](https://i.imgur.com/Gy4xVQg.png)

The last thing required to make this work is some way of increasing the ring number N. I included a combinator in every cell, sending a global “Q=1” signal. This way JOSEF will roughly know when the ring is done building - when *Q=(2N-1)^2*, to be precise. The primary train will only go to new cells once this condition is fullfilled. This prevents the train from going to half-built cells and messing up.

Since I’m not only building an ever-expanding rail grid, the condition for starting the next ring is *M+I+J+E=(2N-1)^2*, which means that every cell in the existing rings has been filled with mining (M), power (E) or production (I,J).

## Managing individual cells

![A new cell during uncoupling of the roboport network](https://i.imgur.com/IAONQEo.png)

Okay, so now there is a bunch of new, empty cells. How to handle those individually?

New cells get built with a station called "New Cell" (creative, isn't it?) and a block of combinators in them. Having the combinators in there from the start proved a lot simpler than constructing them during the analysis part, since half-constructed combinator setups (and also half-deconstructed ones) will inevitably end badly.

When all the cells in a new ring are built and enough materials are available in the logistic network, the builder train starts going through them one by one. It only contains a few materials (crucially: miners, see next paragraph) and a BP book that is unloaded into a deployer chest. There are a few tricks involved for cycling through the blueprint book. The full process is too long to describe here, but let’s look at the start as an example:

- BP 1 is a deconstruction planner for roboports. The initial roboports (globally connected) in a cell are set to “read logistic network content” and thereby output *“U-235=1”* (because there’s a chest with exactly 1 U-235 in a chest in the brain). One of the combinators is set to *“U-235=0 → construction bot = 1”*, leading to BP 2 being deployed once all four roboports are deconstructed.

- BP 2 builds a roboport in the center of the cell which is uncoupled from the network. The pre-built belt starts feeding 50 construction bots from the train into it. This new roboport is set to “read robot statistics” and a *“T=50 → construction bot =1”* combinator triggers BP 3 once 50 bots were fed into the now uncoupled network.

- BP 3 deconstructs the bot belt and immediately triggers BP 4.

Generally, for cycling through blueprints you‘ll want to find some entity that can output circuit signals and use that entity being built/deconstructed as an indicator for the next step. In addition, you can use "idle construction bots (*T=Z*)" or "item X available in logistic storage" to make sure that the building process is actually complete.

As an example for what kinds of problems you can run into if you're not careful or use time-dependent conditions: As JOSEF started growing larger, it sometimes took a bit of time for bots to come and build the uncoupled roboport. If (for reasons that will appear later) 200 belts were unloaded before that roboport was built, the order of blueprints got messed up, the thing started building belts for mining without deconstructing the bot belt, then dedicated the cell as “no mining”. It was an absolute mess and lead to the factory getting stuck.

## Resource Finder

![Checking for ore patches and placing blueprints accordingly](https://i.imgur.com/NFgi72P.mp4)

Now for one of the crucial bits: How to find resources? There’s no “automatic ore checker” or anything like that, but it’s actually really simple once you have uncoupled roboport networks:

- The builder train unloads a fixed amount of mining drills. If you place a blueprint that includes miners, they will be taken from this chest, so you can precisely say how many miners were placed in that cell. To be on the safe side, the train carries 150 miners and 200 belts.

- JOSEF waits for the miners to be completely unloaded (by waiting for belts=200) and for the 50 construction bots to be idle (by waiting for T=Z from the roboport) after placing the miner blueprint. It checks the number of miners left in the chest and increases the “construction bot” signal by either 1 or 2.

- This means two different blueprints can be deployed: The “Mining” or the “No Mining” blueprint. There are a few more steps involved but this renames the station, deconstructs the chests and rebuilds the roboports to reconnect the cell. Also, this will lead to the blueprint book being put back into the train after everything is done.

To avoid problems with mixed mining, every mining cell contains one station each for iron ore, copper ore, stone and coal. They only activate when x>2000, so most of them will just stay locked.

This is definitely the „quick & dirty“ approach and could be greatly improved.

The initial builder train’s job is done once the cell is designated as “Mining” or “No Mining” and the roboport network is reconnected. Another train will come into the “Mining” cells, properly label the stations, deconstruct the combinators and add an “M” signal to the constant combinator characterizing the type of cell.

My way of finding ores has one big problem: You can never have miners stored in the global logistic network or they will (in part) be placed instead of the ones in the uncoupled network. With my small cells, construction ranges overlap so much that the entire cell can be accessed from the outside. There are a few safeguards in place to prevent miners from becoming available in the global network (while still having them transported to the builder train by logistic bots), but there can be situations where the ore finding gets messed up once the base gets really big. But it’s a rare thing and it doesn’t break anything, so that’s fine with me.

However in the next version I‘ll try to keep miners away from logistic chests completely, except for the ones in cells that are currently being analyzed.

The “No Mining” cells are handled by two different trains, depending on….

## ...Power

![Power: Roughly 7MW of continuous power per cell](https://i.imgur.com/YkO1Vjs.png)

To make the start a little easier, JOSEF was granted 30MW of continuous power. Other than that, power is provided by solar panels and accumulators. One cell produces 7MW continuously (10MW peak), so you need a few of those. As a rough idea, in my run that got to ~500 cells, 150 of them were power cells (Coincidentally exactly the same number as mining cells).

Once accumulator charge drops below 70%, the “Power” train is allowed to start. Similarly to the “Mining” train, this guy just goes around (this time to „No Mining“ stations), deploys the solar blueprint, deconstructs combinators, adds an “E” signal to the global combinator and gets out of there. There are no further limitations on it because I wanted to make sure that there would always be a way to get more power if JOSEF played himself into a corner.

Due to my way of building complete, ever-increasing rings every now and then, there are huge power spikes. This leads to JOSEF overbuilding power by quite a bit as the first few new cells in every ring usually get dedicated to power. In my larger runs, average draw towards the end was around 500MW while potential power generation was about 1GW.

![Power graph: You can read off the time a certain ring took to build](https://i.imgur.com/mbDMv4R.png)

Now there‘s only one little detail missing: We want JOSEF to actually make the materials that it‘s using! So all the remaining cells get dedicated to...

## ...Production

The production of building materials takes place in 2 different spaghetti cells. The story of how those get built is the similar to the ones before: When a station called “No Mining” is available and enough building materials are in the logistic network (and power isn't running low), a train comes in, deploys a blueprint and adds either “I” or “J” to the global constant combinator, depending on which production cell is built. This guy does one additional thing: It unloads a bit of coal (to make sure trains have something to run on) and, for production cell 2, some heavy oil barrels to start coal liquefaction.

The builder train in charge simply alternates between the two different cells. There’s a simple “inserter cycle” that takes the blueprint book out of the train when it gets home, puts in the other one, then waits for the train to leave before activating again.

![Production cell 1: Basic, non-oily things](https://i.imgur.com/BccZ1d9.png)

The first cell produces all the different basic building materials: Belts, assemblers, miners, inserters, rails, trains, stations, signals, power poles – more or less everything that doesn‘t require oil. The basic production cell needs to be built before JOSEF runs out of stuff like belts or rails. This may be a problem if you have too many resource patches in the center or if you don’t give it a enough to start with and it decides to just solar panel the world. But you can always fix this by giving it a few more starting materials.

  

![Production cell 2: Advanced things using oil](https://i.imgur.com/CQsUf42.png)

The second cell produces the more advanced things: Roboports, robots, logistic chests, blueprint deployers, solar panels & accumulators. This one needs to be built before JOSEF runs out of roboports. The builder train brings in 10 barrels of heavy oil which get emptied, run through the refinery and get refilled as soon as possible. JOSEF is not producing barrels but instead relying on the initial ones getting recycled infinitely.

The two production cells are far from optimized, built to ratio or anything like that. They slowly and steadily produce all the things necessary but it may take an hour until a certain cell produces, say, their first train station, because it needs to fill up with belts first. However, it turns out that this becomes a non-issue after a bit, but more on that later.

How many of these cells actually get supplied with ores depends on available resources, of course. Trains will always prefer to feed those cells close to resource patches so some further away cells might just stay empty for a while. But they will sooner or later get their resources, simply because there is an incredible number of...

## ...Trains

The number of trains gets ridiculous very quickly. In my >500 cell run JOSEF was using 750 trains. The reason: For every new production cell that gets built, 4 new trains (one for each ore) get deployed in a dedicated “train deployer” cell in the center. Most of them will sit in a station and wait to be unloaded, so that's not a problem.

Deploying trains in an extra cell (instead of including them in the production blueprints) ensures that trains get deployed in a position where they don't interfere with existing trains, which can cause the new ones to attach to existing trains. 

## General & Outlook

- It’s quite interesting to see how JOSEF behaves when he gets a bit larger. Initially, expansion is fairly slow because building materials have to be produced. Looking at the power graph you can see how it initially speeds up from ring to ring, even though the number of cells it has to go through increases with every ring. This is due to the fact that production increases quadratically, while demand only increases linearly (or even stagnates at later stages). At some point around ring 9 or 10, production stops being the bottleneck and the time needed to fill up a ring increases, simply because more cells have to be filled.

- In this version, I relied quite heavily on bots transporting things across the whole base (mainly to stock up the builder train and return unused materials from newly analyzed cells). This was more due to my lazyness than anything else and I‘m definitely planning on improving that for future versions. But my system of spamming production cells everywhere, using an excessive amount of construction bots and giving them access to building materials scattered across the whole base worked a lot better than I had expected – Build jobs are given to nearby bots which always take things from the closest location available, as long as you only offer them one type of chest.

- I loved coming up with the system, designing the cells and all that, but I have to be honest: Testing something like this is a bit annoying, especially if you‘re impatient and want to see it running. It‘s like testing a Rube Goldberg machine that runs for many hours – For every tiny change that you make, you have to start over, implement the change and let it run for a couple of hours. Many small fixes you quickly come up with will lead to more unforeseen problems that might only occur in ring 6 or so. You can of course make things easier by e.g. giving it infinite construction materials when you‘re testing the ore finding mechanism, but actual realistic tests are pretty tedious.

This is certainly not the last JOSEF I‘m ever going to build. In fact, I started a small, unprofessional [tutorial series](https://youtube.com/playlist?list=PLqiMv9sOILspVylhnHefjleLWw1Ye2RrD) in which I‘m building a second version. I‘m not yet sure where this will go but I have a few ideas:

- Larger cells. I'm currently planning on doing 4x4 chunks instead of 2x2, but I'm not sure if I'll stick with that. I’ll have uncoupled bot networks to begin with which will greatly simplify the whole ore finding process.

- Dealing with water, both as a resource and as an obstacle: Should be very doable

- Dealing with biters: Will be difficult to get right. I won‘t tackle deathworlds but small amounts of biters should be okay

- Dealing with cliffs: Will only be difficult psychologically. I‘ve always hated them and turned them off right away. Should be easy to handle.

- Making science: Will be a little tricky, simply because it will hugely increase the draw on resources and the amount of active trains. I will have to heavily limit the science generated in individual cells. Also, obviously, production materials have to be prioritized from science or the thing will grind to a halt.

## Final Thoughts

 A few years ago when I first saw the video of GreyGoo (probably the most popular self-expanding factory to date) I felt really intimidated and I was sure that an absolute genius from out of this world had come up with this. I thought it would simply be impossible for a normal, semi-experienced factorio player to ever achieve something like this.

Now I don‘t want to compare JOSEF to GreyGoo. JOSEF is a really dumbed-down SEF and there are countless things that could (and will!) be improved. But I felt like lots of people congratulating me on making this felt the same way towards JOSEF that I did towards GreyGoo back then. So while I am definitely proud of this and thankful for all the praise, please believe me when I say: THIS WAS NOT THAT HARD! Anybody who has built a clever, circuit-based contraption for sushi belts, balanced train stations, clever Kovarex build, whatever, can make this as well! Just play around with it a little and you‘ll see that this is actually more than doable. I hope this little glimpse into JOSEF‘s simplistic inner workings has proven that. I‘d really love to see more people taking a stab at this. 

Feel free to use my ideas as a starting point, improve on them, toss them out and replace them if you don‘t like them! And of course, I‘d always be happy to discuss, help, debug and brainstorm. A few of JOSEF‘s features only came to life due to discussions with awesome people from this great community.