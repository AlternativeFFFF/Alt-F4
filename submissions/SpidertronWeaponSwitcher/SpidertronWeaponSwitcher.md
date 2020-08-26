---
author: Xorimuth
---

### Under the hood: [Spidertron Weapon Switcher](https://mods.factorio.com/SpidertronWeaponSwitcher)

![Demonstration of switching between weapons](https://github.com/Xorimuth/Alt-F4/blob/master/submissions/SpidertronWeaponSwitcher/SWS-demo-gif.gif?raw=true)

Spidertron Weapon Switcher is a mod that allows a spidertron to fire any weapon. In this post, I will be talking about how it works behind the scenes.

If you’ve never written a mod before, you may not know that many things in Factorio cannot be changed _during the game_, for example, the range of a gun, the graphics of a building and, importantly for me, the weapon slots that a vehicle has. Of course, the weapons that a spidertron has _can_ be changed by mods, but only by creating a new ‘type’ of spidertron during the game’s loading phase.

The way that I got around this limitation is by creating 5 ‘types’ of spidertron, each one with a different set of weapons. When you switch the weapons of a spidertron, what the mod actually does is:

1) Save all the data about the spidertron (such as its inventory contents and position)
2) Delete the spidertron
3) Create a new spidertron of the next ‘type’ (with different weapon slots)
4) Insert all the saved data into the new spidertron

Because all these steps happen within the space of one tick, it appears almost* seamless to the player.

That all works great for transferring the data about the spidertron but there is one thing that makes no sense to transfer: ammo. If you have the shotgun enabled with 300 shotgun shells loaded and you switch to the flamethrower, the shotgun shells should not (and cannot) be transferred into the flamethrower ammo slots. I get around this by having a table for each spidertron so in step 1 the current ammo inventory is stored in the table under the key "shotgun", and in step 4 the ammo under the key "flamethrower" is retrieved and placed into the new spidertron's ammo slots. When the player picks up the spidertron, all the ammo for that spidertron is retrieved and placed in the player's inventory or spilled on the ground if there is no space left in the inventory.

*Some side effects (such as all remotes becoming disconnected from the spidertron) have to be mitigated with further work that is outside the scope of this blog.
