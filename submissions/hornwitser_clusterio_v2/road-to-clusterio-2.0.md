---
author: Hornwitser
editor: Names of who edited this post [optional]
image:
  url: Path to thumbnail for this ALT-F4 post (URI)
  transcription: Small transcription of the image thumbnail
title: "Alt-F4 #X - The Road to Clusterio 2.0"
lang: en
discuss:
  forum: Link to forum thread [optional]
  reddit: Link to reddit thread [optional]
  discord: Link to discord chat [optional]
---

Hello, I'm Hornwitser and I want to tell the story of how I ended up spending a year developing Clusterio 2.0 which still has a long way to go before a release.
If you haven't heard of Clusterio before it's a piece of server software that enables mods to interact across servers.
It is perhaps best known from the Clusterio 60k event in 2018 where teleport chests were used to transfer items between some 46 Factorio servers in order to build a factory that could do 60k science per minute.
These teleportation chests work like active provider and requester chests, one removes items from the game and put them in shared cloud storage and the other takes items requested from that cloud storage and put them in the game.

[Insert clusterio v1 video here]
[Caption: Iron ore being mined on the server on the left, then sent to the server on the right via Clusterio teleportation chests.]

In July 2019 The Gridlock Cluster event was held.
Instead of teleportation chests for transporting items between servers, there were trains that could teleport from the edge of one server to the edge of another server using teleporting train stops.
This was also implemented with the help of Clusterio, but it wasn't added as a feature to the Clusterio mod, instead, it was a separate mod that made use of the same Clusterio server infrastructure as the teleportation chests.

[Insert train video here]
[Caption: Train teleporting from the edge of one server to the edge of another server.
As cool as these train teleports are, just the thought of having to deal with the buggy train teleportation code gives me shivers.]

Clusterio has always been composed of two parts: the gameplay interactions implemented in mod code that runs inside the game, and the server-side infrastructure which deals with moving data between the game servers.
In the beginning, the server-side was coded around handling the teleportation chests, but as development has progressed the idea of what Clusterio _is_ has changed from teleporting chests to a pluggable server-side platform for making such cross-server gameplay elements.
And indeed, the server-side code for handling the train teleports is implemented as a plugin to Clusterio.

But the Clusterio devs' vision of a reliable and stable clustered Factorio server manager with an easy to install and use interface, that can enable the easy development of cross-server mods that you can install at a push of a button is one that has been far from the reality with Clusterio.
And that is where I enter the picture.


Humble Beginnings
-----------------

I started out hacking on Clusterio back in July 2019 as part of trying to help the Gridlock team with fixing issues they had.
One of the first things I noticed installing Clusterio to get a test cluster on my machine was the one thousand packages it pulled in as dependencies from npm.
Node.js was new to me then, but it didn't take an experienced developer to see the sad state of affair the Clusterio code base was in.
A term often thrown around in software development is technical debt.
It's the idea that choosing shortcuts and easy but limited solutions to save time creates more work down the line to extend and maintain the code base.
Clusterio had a lot of technical debt, and I mean _a lot_.
It caused many pains during the Gridlock event for the team organizing and managing it.
Simple things like turning off research sync for new instances was not possible with the way the system was set up, and I don't recall anyone managing to temorarily disable it during the event.

After The Gridlock Cluster event I started working on improving and cleaning up the Clusterio codebase.
One of the first things I did was slimming down on the 1000 dependencies that were pulled in from npm, I found it outrageous for there to be over 300 MB of stuff needed just to run the Node.js backend.
And it turned out that most of it wasn't actually needed to run Clusterio.
About half were development tools that didn't need to be installed in a production environment, and a quater was what I would describe as lazy solutions: large libraries pulled in to use a single function from it.
Many of these were trivial to re-implement locally and remove the need for the library, and in one case the re-implementation was the same amount of code as using the large library in the first place.
In the end I managed to remove the need for some 700 packages (244 MB), though it should be noted most of these were dependencies of dependencies.

The next issue I tackled was the automated testing.
If you're unfamiliar with automated testing it is the idea of writing code to verify that the code being tested works as it should and doesn't break in the future.
The most common type is unit tests which invokes isolated functions in the code and checks if the result is what was expected from the arguments passed to it.
Automated testing is sort of a corner stone for writing reliable code and while there were unit tests set up for Clusterio they didn't work.
It's another example of technical debt showing itself in the code.
Maintaining the automated tests and adding new tests for code that is added is extra work, and skipping that work is a shortcut.
The long term effect of a lack of testing is that things break and the developers simply don't notice.

After the tests were fixed my focus turned into cleaning up the code.
Doing things like fixing broken code, removing unused or obsolete code, and refactoring bad code into slightly less bad code.
One of the changes that started to take shape was moving the code for the teleporter chests into a separate plugin for Clusterio.
We later decided to rebrand the whole item teleportation through magical chests as Subspace Storage.
Clusterio is first and foremost the server software making cross server mod interactions possible.
Having these teleportation chests also be called Clusterio is confusing when we're expecting more and more that Clusterio will be used for other things than those chests.
While I was at it I also decided to replace those wonky sky chests and collection nets sprites with something more apropriate for subspace storage.

[Insert subpsace-storage-sprites.jpg here]
[Caption: New placeholder sprites for the item, fluid, and electricity inputs and outputs in the Subspace Storage mod.]

They are still more of a placeholder art though I'm not much of a 3D artist when it comes to texturing and mechanical modeling.
I spent most of the time making these setting up an automated toolchain with Blender to render, crop and output the sprites into the mod, you know how it is with programmers; automate all the things.


Save patching
-------------

As my work continued the first major improvement I worked on was save patching, but before I talk about it I want to mention what it was set out to replace.
The Gridlock cluster used scenario code to implement the train teleportation and in-game server switcher, this is often called soft-modding as it means you don't need to download any mods and restart Factorio to connect to the servers.
The code was constantly being improved as the event went on so it would not have been sufficient to put the code into a scenario and call it a day.
Updating a scenario on a server mid-game without the use of mods is kind of tricky.

So the code was loaded into the game via a scenario called Hotpatch (also known as Server-side Multi-mod Scenario).
Conceptually Hotpatch is a very cool thing, it lets you load in mod like code while the game is running and it'll execute that code in an environment that emulates the Factorio mod environment.
But there were major issues with Hotpatch: it's poorly documented making it hard to use correctly, the implementation was incomplete and buggy, and most troublesome was that all the code had to be sent as a command on startup.
Factorio is very slow with long commands which leads to the game running for quite a while on the old code while the new code is being sent over.

In search of a solution for the problems with Hotpatch I looked at how the game stores scenario code in a save.
It's remarkably simple: a saved is a regular zip file and the Lua files of the scenario are stored in it as regular text files.
Replace those Lua files in the save and the code for the scenario has been updated.
With some more thought to the issue, I came up with a simple module system based on the event\_handler Lua library that Factorio comes with.
Lua code to be run in the game is put into its own folder and before starting the Factorio server Clusterio will copy that code into the save and generate scenario code to load it.
It's not without its downsides though, but the benefits of not having to deal with Hotpatch was more than worth it.


Breaking Everything
-------------------

After I did save patching it became clear that a major overhal of the code was needed.
A particularly painful point about Clusterio has been the complete lack of remote management.
If you want to start a Factorio server that is part of the cluster you have to log in to the computer that hosts it and manually start it through whichever process manager you choose to use, the same goes if you want to change any settings for that server.
Managing a cluster in this way is painful and that was a lesson learned the hard way in the Clusterio 60k event.
For Gridlock the Pterodactyl game server management panel was used to manage servers remotely, and it was awful, but that's a story for another time.
Having the ability to remotely manage Factorio servers in Clusterio has been a desired feature for a long time and there has been attempts at implementing it in the code.
But the way the code was structured, with everything tied together around running a single Factorio server per Node.js client process made it very hard to get any sensible remote management baked in without breaking everything in the process.

So naturally I broke everything and implemented remote management.

The new way Clusterio 2.0 works is that a slave process is run on each computer you want to host Factorio servers on.
These Factorio servers are called instances in Clusterio and the slave process connects to the master server and listens for commands to create and start instances.
Multiple instances can run at the same time on a slave and that means you only need to setup one slave for each computer you want to host Factorio servers on, and there's only one Node.js process to start up on these computers.
The terms node, slave, instance and client were actually used interchangably in Clusterio 1.x to mean what would be an instance in Clusterio 2.0.

One of the things that had to change was the way Clusterio communicated between computers.
In 1.x this is handled for the most part by the master server hosting an HTTP server and responding to requests on it.
But this has the problem that the master server can't send messages to other computers, only respond to requests sent to it from other computers as that's how HTTP works.
To get around this problem with HTTP I replaced it with a simple WebSocket based protocol using JSON payloads.
WebSocket unlike HTTP allows both parties of the connection to send messages to each other at any time.

With everything broken this sort of became the point where the 2.0 development really began.
I used this oppertunity to start fresh on a lot of things in the coming months.


Possible additional topics:
- New Plugin System
- New Configuration System
- Factorio Locale and Item Icon Export (with image)
- User and Permission System
- Repackaged and Published on npm
- Rewritten Web Interface (with images)

Draft text (not sure where to fit in yet):

One of the early motivations I had for improving Clusterio was the pains the Gridlock team experienced using it.
It might be one of the reasons we haven't seen a Clusterio event this year.
There were plans for making a Gridlock 2, but the pains of working with Clusterio 1.x has more than likely stymied that effort and I haven't heard anything in months on that front.
It didn't take me long to come up with the idea of organizing my own Clusterio event while working on Clusterio 2.0 though, and that has been my main motivation for developing Clusterio 2.0 ever since.
I have put out [a teaser on reddit](https://www.reddit.com/r/factorio/comments/jsf21n/the_next_clusterio_event_is_brewing/) for the event I have in mind and right now the aim is to run it early next year, possibly January.

----------------------------------

I hope you liked this little glimpse into the Clusterio 2.0 development, I have many more things that I would like to talk about in the coming weeks.
Please note that 2.0 is not yet ready for public use, though if you're interested in the development, check out our [Discord server](https://discord.gg/5XuDkje) and [GitHub repo](https://github.com/clusterio/factorioClusterio).
