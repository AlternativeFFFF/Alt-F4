---
author: Xorimuth
---

### Under the hood: [Spidertron Weapon Switcher](https://mods.factorio.com/SpidertronWeaponSwitcher)

Spidertron Weapon Switcher is a mod that allows Spidertron to fire any kind of weapon. In this post, I will be talking about how it works behind the scenes. But first, a peak at how awesome this looks in action:

![Demonstration of switching between weapons](https://github.com/Xorimuth/Alt-F4/blob/master/submissions/SpidertronWeaponSwitcher/SWS-demo-gif.gif?raw=true)

If you’ve never written a mod before, you may not know that many things in Factorio cannot be changed _during the game_, like for example the range of a gun, the graphics of a machine and, importantly for me, the weapon slots that a vehicle has. Of course, the weapons that Spidertron has _can_ be changed by mods, but only by creating a new ‘type’ of Spidertron during the loading phase of the game.

The way that I got around this limitation is by creating 5 versions of Spidertron, one for each type of gun. So, when you switch weapons in-game, what the mod actually does is:

1) Save all relevant data about the spidertron, such as its inventory contents and position
2) Delete the current spidertron
3) Create a new spidertron of the next ‘type’, which has different weapons mounted, in its place
4) Insert all the saved data into the new spidertron

All of these steps happen within a single tick, which makes it appear (almost*) seamless to the player. (*Some side effects, such as all remotes becoming disconnected from the spidertron, have to be mitigated with further work that is outside the scope of this blog.)

That all works great for transferring data about the spidertron but there is one thing that makes no sense to transfer: ammo. If you have the shotgun enabled with 300 shotgun shells loaded and you switch to the flamethrower, the shotgun shells should not (and cannot) be transferred into the flamethrower ammo slots.

 I get around this by having a table for each spidertron so in step 1 the current ammo inventory is stored in the table under the key "shotgun", and in step 4 the ammo under the key "flamethrower" is retrieved and placed into the new spidertron's ammo slots. When the player picks up the spidertron, all the ammo for that spidertron is retrieved and placed in the player's inventory, or spilled on the ground if there is no space left in the inventory.
