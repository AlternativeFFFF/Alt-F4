## The Day I Caused a CTD. [<author>EnigmaticAussie</author>](https://mods.factorio.com/user/enigmaticaussie)

I was young, full of ideas, energy and had way to much time on my hands. Wait, who am I kidding, I wasn't that young, and was spending most of my waking hours building factories, browsing the Factorio Forums, troubleshooting bug reports so devs didn't need to, improving my builds and writing mods for the fun of it.

[Assembler Pipe Passthrough](https://mods.factorio.com/mod/assembler-pipe-passthrough) came to me one day while considering the implications of being able to build fluid processing plants, without all those extra pesky pipes. The mod quickly became popular enough that people started downloading! The premise was simple: add pipe connections to buildings that normally only have 1 (or 2) to allow for input/output on the same tile - like a mining drill does. Implementing it was... interesting. And a good learning experience for myself as to how mods are built and work in the game.

### So, what is a CTD?
CTD is shorthand for Crash To Desktop. These were extremely rare in the development of Factorio (while I've been playing - since late 0.15), simply because of how strict the rules for the game were and how well the base game handles exceptions.

Funny thing was, I didn't know I'd caused it until I'd stumbled upon a [bug report](https://forums.factorio.com/viewtopic.php?f=11&t=73488&p=444601) in my forum scraping. 

12 hours after the bug was reported, I saw it, and immediately thought it was a problem with the mod. It was, and wasn't at the same time.

After some investigation, I released a patch - "Fixed, added compatibility for the offending mods entities; no more problem". Boy was I wrong.

### Somethings still broken.
Dominik jumped onto the thread and started asking some pointed questions about what APP did, how it achieved it's results. I boiled down the CTD requirements to a minimal save to reproduce and submitted it to Wube.

`Now I see what you did there. Output fluidbox with 9 connections, up to 3 on one spot. Altogether 14 connections on one assembler. At the worst place, 5 connections and 3 different resources.` - Dominik

Basically, I'd made such a monster that it was placing up to 5 fluid boxes in the same tile, at the same heights, for different fluids. The game engine just had a brain fart and didn't know what to do; hence the CTD.

### Complete overhaul
8 versions of APP later (remeber, I had lots of spare time on my hands), Dominik had implemented a core side fix, which dissallowed multiple fluidboxes in the same tile. This broke APP (for most players), so a rewrite was in order.

I took the opportunity to overhaul the internal workings of APP, changing the way that my logic worked, moving from the premise that any fluidbox can be on any side of the entity - to all input fluid boxes must be on the N/S plane, and all output fluid boxes on the E/W plane. This solved both the CTD, as well as a host of comppatilibity issues with other mods that added overlapping fluidboxes. Win-Win-Win.