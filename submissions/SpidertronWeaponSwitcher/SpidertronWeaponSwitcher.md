# Spidertron Weapon Switcher - Under the hood
### Xorimuth

https://mods.factorio.com/SpidertronWeaponSwitcher

[[TODO: insert gif here of spidertron fighting biter bases whilst switching between different weapons]]

If you’ve never written a mod before, you may not know that many things in Factorio cannot be changed _during the game_, for example, the range of a gun, the graphics of a building and, importantly for me, the weapon slots that a vehicle has. Of course, the weapons that a spidertron has _can_ be changed by mods, but only by creating a new ‘type’ of spidertron during the game’s loading phase.

The way that I got around this limitation is by creating 5 ‘types’ of spidertron, each one with a different set of weapons. When you switch the weapons of a spidertron, what the mod actually does is:

1) Store all the data about the spidertron (such as its inventory contents and position)
2) Delete the spidertron
3) Create a new spidertron of the next ‘type’ (with different weapon slots)
4) Insert all the stored data into the new spidertron

Because all these steps happen within the space of one tick, it appears almost* seamless to the player.

*Some side effects such as all remotes becoming disconnected from the spidertron can be mitigated with further work that is outside the scope of this blog.
