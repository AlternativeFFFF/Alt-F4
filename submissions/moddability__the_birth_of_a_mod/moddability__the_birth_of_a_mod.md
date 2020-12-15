## Moddability: The Birth of a Mod <author>DedlySpyer</author>

Something _Kovarex_ said in [FFF-363](https://www.factorio.com/blog/post/fff-363) stuck with me:

{% include quote.html text='This is an example of a feature, that I just HAD TO DO, because once I realised that the feature could be there, I was almost trying to use it and was annoyed by the fact that it wasn’t there.' author='Klonan' %}

I’ve dipped in and out of playing Factorio for around six years, but since I started modding I’ve always loved tinkering with the game. Sometimes when I play, I end up seeing something new that bothers me just a bit and for which there isn’t a mod to fix it. I’ll get to a point where I just end up modding it myself. Normally, this causes me to discard my current playthrough of Factorio, mostly because, for me, modding scratches the same itch that actually playing the game does.

Soon after the 1.0 launch this happened to me again. I picked up the latest version of [Krastorio 2](https://mods.factorio.com/mod/Krastorio2), got to the power armor point of the game, and was wondering why I couldn’t rotate equipment. Sure, I could probably shuffle everything around in my armour, but sometimes I just want to hit `R` and slap something into place with minimal effort. A quick search on the mod portal showed me that there was [Rotatable Batteries](https://mods.factorio.com/mod/RotatableBatteries) by _GotLag_; so it was possible, but it hasn’t been implemented for everything.

Making a mod work in every circumstance can be a ton of work sometimes. The safe way to handle every case is to hardcode your changes for every situation. That will definitely work, but requires constant monitoring. Having [done something like this in the past](https://github.com/DedlySpyder/Powered_Entities/blob/0.3.28/mod-compadibility/add-mods.lua), I know that it can get quite unwieldly and hard to read. Plus, if one of those other mods changes something, my implementation either outright breaks or is inconsistent with the “supported” mod. So, I’ve recently become a big fan of trying to make my mods as dynamic as possible to avoid this. It should, in theory, also save tons of time, but this doesn’t always work out.

{% include image.html src='https://imgs.xkcd.com/comics/automation.png' alt='xkcd Automation' caption='Credit: <a href="https://xkcd.com/1319/">xkcd #1319</a>' %}

That reality is what I enjoy in Factorio though; the “Oh, but I need to do this thing.” That’s not fun if it’s just adding another mod dependency by adding some string to a list. So, to start a new mod with the aim of being able to rotate _any_ equipment without the need for me to constantly maintain it, I needed to lean on how Factorio loads mods.

In other games where you want to add mods, you have some form of a mod-order list. You, the player, or a program created by modders, needs to tell the game in what order the mods are to be loaded, to make sure everything meshes together well enough to not explode. Factorio achieves this ordering via mod dependencies, but it also goes a whole step further. Factorio doesn’t just load all the mods in order once, it loads them in order __three times__.

Three times? Seems excessive, right? Actually, it’s a fantastic idea. The [wiki](https://wiki.factorio.com/Tutorial:Modding_tutorial/Gangsir#How_Factorio_loads_mods) explains this in much more detail, but I’ll quickly explain it here. Each mod, in load order, has a settings stage, then a data stage. The settings stage is pretty self-explanatory, and the data stage is for prototype data, such as items, entities, and recipes. This cycle then repeats two more times. Mods specify what to load at each iteration of the cycle. Modding conventions recommend that prototypes all be added as early in this process as possible. This allows for mods that want to implicitly rely on other mods to do it without needing to know they exist. For example, the base Factorio mod does this for barreling of liquids.

This is how the community has the giant overhaul mods that entirely rework all recipes; they just do it in a later data stage to every single recipe in the game. No large lists of mods that need maintenance, no “This mod __needs__ to be loaded last.”

This is how I am able to make my mod able to rotate any equipment. I can just move my checks for equipment that needs a rotated version to a later data stage, and it _should_ implicitly cover any equipment in the game. No need for me to name mods X, Y, and Z as dependencies, or for the player to manage anything at their end; it just works. No constant management for name changes, unless there’s a more complex problem that I will enjoy tracking down.

With all that in mind, a few days, and a half-finished Krastorio save abandoned, [Rotatable Equipment](https://mods.factorio.com/mod/Rotatable_Equipment) was born.

{% include image.html src='https://media.alt-f4.blog/ALTF4/18/moddability-1.jpg' alt='Rotated equipment' caption='Vanilla equipment and rotated variants.' %}
