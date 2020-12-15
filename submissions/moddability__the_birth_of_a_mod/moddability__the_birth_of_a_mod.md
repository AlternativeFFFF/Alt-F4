## Moddability - The Birth of a Mod

Something Kovarex said in [FFF-363](https://www.factorio.com/blog/post/fff-363) stuck with me:

> This is an example of a feature, that I just HAD TO DO, because once I realised that the feature could be there, I was almost trying to use it and was annoyed by the fact that it wasn't there.

I've dipped in and out of playing Factorio for around 6 years, but after I started modding I've always loved tinkering with the game. Sometimes when I play I end up seeing something new that bothers me just a bit with the game and there doesn't exist a mod that fixes it. I'll get to a point where I just end up modding it myself. Normally, this causes me to discard my current playthrough of Factorio, mostly because, for me, modding scratches the same itch that Factorio does.

Soon after the 1.0 launch this happened again to me. I picked up the latest [Krastorio 2](https://mods.factorio.com/mod/Krastorio2) (new to me), got to the power armor point of the game, and I was wondering why can't I rotate equipment? Sure, I could shuffle everything around my armor, but sometimes I just want to hit `R` and slap something into place with minimal effort. A quick search on the mod portal showed me that there was [Rotatable Batteries](https://mods.factorio.com/mod/RotatableBatteries) by GotLag, so it was possible, but it hasn't been done for everything.

Making a mod work with everything is a ton of work sometimes. The safe way to handle every case is to hardcode what things the changes and it will definitely work, but requires constant monitoring. Having [done something like this in the past](https://github.com/DedlySpyder/Powered_Entities/blob/0.3.28/mod-compadibility/add-mods.lua) it can get quite unwieldly and hard to look at. Plus, if one of those other mods change something, then my implementation of it either outright breaks or is inconsistent with the "supported" mod. I've recently become a big fan of trying to make my mods as dynamic as possible to avoid this. Also in theory it should save tons of time.

![xkcd Automation](https://imgs.xkcd.com/comics/automation.png)

Credit: [xkcd](https://xkcd.com/1319/)

That reality is what I enjoy in Factorio though, the "Oh, but I need to do this thing". That's not fun if it's just adding another mod dependency and adding some string to a list. So, to start a new mod with the idea that I want to rotate _any_ equipment, without the need for me to come back and edit the mod to work with [NEW GIANT OVERHAUL MOD], I need to lean on how Factorio loads mods.

In other games where you want to add mods, you have some form of a mod order list. You the player, or a program created by modders, needs to tell the game what order the mods are loaded, to make sure everything meshes together good enough to not explode. Factorio does this ordering with the mod dependencies, but it also goes a whole step further. Factorio doesn't just load all the mods in order once, it loads them in order __3 times__.

3 times? Seems excessive, right? Actually, it's a fantastic idea. The [wiki](https://wiki.factorio.com/Tutorial:Modding_tutorial/Gangsir#How_Factorio_loads_mods) explains this in much more detail, but I'll quickly explain it here. Each mod, in load order, has a settings stage then a data stage. The settings stage is for custom inputs, and the data stage is for prototype data, such as items, entities, and recipes. This cycle then repeats 2 more times. Mods specify what to load at each iteration of the cycle. Modding conventions recommend that prototypes all be added as early in this process as possible. This allows for mods that want to implicitly rely on other mods to do it without needing to even know they exist. For example, the base Factorio mod does this for barreling of liquids.

This is how the community has the giant overhaul mods that entirely rework all recipes, they just do it in a later data stage to every single recipe in the game. No large lists of mods that needing maintenance, no "This mod __needs__ loaded last".

This is how I can make my mod to rotate any equipment. I can just move my checks for equipment that needs a rotated version to a later data stage, and I _should_ implicitly cover any equipment in the game. No need for me to name mods X, Y, and Z as dependencies, or for the player to manage anything on their end, it just works. No constant management for name changes unless there's a more complex problem that I will enjoy tracking down.

With all that in mind, a few days, and a half-finished Krastorio save abandoned, [Rotatable Equipment](https://mods.factorio.com/mod/Rotatable_Equipment) was born.

![Rotated equipment](https://mods-data.factorio.com/assets/6600b190a7ad3173d942153ec9853b6b628920f4.png)

Vanilla equipment and rotated variants
