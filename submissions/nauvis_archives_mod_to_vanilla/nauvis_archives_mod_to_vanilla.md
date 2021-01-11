## Nauvis Archives: From Mod to Vanilla <author>stringweasel</author>

Factorio has a very rich modding community. There's mods for almost anything you can think of. From complete overhaul mods like [Space Exploration](https://mods.factorio.com/mod/space-exploration) or [Krastorio 2](https://mods.factorio.com/mod/Krastorio2), to small quality of life mods like [Squeak Through](https://mods.factorio.com/mod/Squeak%20Through), or the ability to listen to [KnighRider music while you're driving](https://mods.factorio.com/mod/JKIL-KnightRider). Some mods are more popular than others - some even reaching over a 1 million downloads. However, the greatest honor a modder can likely achieve is to have his mod incorporated into the vanilla game. Quick examples of this can be [Research Queue](https://mods.factorio.com/mod/research-queue) or [Landfill](https://forums.factorio.com/viewtopic.php?f=190&t=3793), or even the ~~mod~~ modder [*Rseding* that was incorporated into the vanilla team](https://factorio.com/blog/post/fff-300).

I downloaded and investigated a few of these mods that was added to vanilla at some point. You might notice that some of the referenced mod pages link to the [Factorio Forums](https://forums.factorio.com/viewforum.php?f=190) and not the [Mod Portal](https://mods.factorio.com/). This is because before Factorio 0.13 (released in June 2016) all mods were hosted on the Factorio Forums. It was only with the [launch of Factorio 0.13](https://www.factorio.com/blog/post/fff-141) that the Mod Portal was available. 

### Transporting Fluids

Today fluids are very easy to transport. You can use trains with fluid wagons, maybe simple pipes, or even fluid barrels to transport any fluid to any location. However, it wasn't always this easy. Fluid Wagons weren't added to vanilla until April 2017 with Factorio 0.15. Before that you had to barrel your crude-oil at the outpost and unbarrel it again at your base - which requries very careful empty barrel management. Or, you could simply download the [Rail Tanker mod](https://mods.factorio.com/mods/Choumiko/RailTanker) which was originally made by *JamesOFarrell*. It was released in November 2014 as an extension of his [Wagons mod](https://forums.factorio.com/viewtopic.php?f=190&t=3926). At some point the modder [*Choumiko*](https://mods.factorio.com/user/choumiko) took over maintaining the mod and it was moved to the mod portal.

RAIL TANKER VIDEO EXAMPLE
![](media/railtanker_0.12.mp4)

*Caption: The Railtanker mod as seen in Factorio 0.12 (although released in Factorio 0.11 originally). Notice the old train graphics, and how there is [no one-tile-gap](https://www.factorio.com/blog/post/fff-133) between the wagons.*

This mod had a few limitations. For example, you could not place any inserters next to this rail tanker, because it would remove the *fake items* inside the tanker and corrupt it. And the only way to fill/empty the tanker was using a maximum of two of the very weak small pumps - there was no regular pump yet. The placement of the pump was also inconstent, especially after train sizes changed in Factorio 0.13, but the rail tanker's size remained mostly the same. As an interesting side note, when the vanilla fluid wagon was finally added in Factorio 0.15, you could originally store store [*three* different liquids](https://wiki.factorio.com/index.php?title=Fluid_wagon&oldid=151795) inside one fluid wagon. Ever wondered why the vanilla fluid wagon has three tanks?

The other main way of transporting fluids long distance was using barrels. Barrels was part of Factorio from relatively early on, but initially the player was limited to *only* barreling crude-oil. The first person to mitigate this problem was a modder nonchalantly named *btw* with his [Liquid Station mod](https://forums.factorio.com/viewtopic.php?f=14&t=2797) which was released in March 2014 for Factorio 0.9. In this mod you could to barrel any fluid, but you had to use a special machine - called a Liquid Station - to do so. 

LIQUID STATION EXAMPLE
![](media/liquid_station.mp4)

*Caption: The Liquid Station mod as seen in Factorio 0.10. In the example sulpheric acid is moved between two storage tanks*

This first mod was not maintained for long. However, it soon prompted a new mod which is much closer to what we know today. This mod was called [Fluid Barrels](https://forums.factorio.com/viewtopic.php?t=7887), created by *firegrenade* and published in January 2015 for Factorio 0.11 (and later transfered to the [mod portal](https://mods.factorio.com/mods/jockeril/fluid-barrel)). In this mod any assembler could be used for barreling/unbarreling, as it is today. It was only in April 2017 with Factorio 0.15 - three years after the Liquid Station Mod - that any fluid could be barrelled in vanilla Factorio. Another honourable mention for a barreling mod is [Omnibarrels](https://mods.factorio.com/mod/Omnibarrels) by *GotLag*. The graphics he created most likely inspired vanilla graphics for quite some time after the art was requested from him by the developers.

![](media/omnibarrels.png)

*Caption: Conversation between Wube developer *V453000* and the modder *GotLag* (also goes by Stone Cold Jane Austin). This is observed on the #friday-facts channel on the offical Factorio Discord. [(Link to conversation)](https://discord.com/channels/139677590393716737/603392474458882065/771678012054700042)*

### The Picker Tool (The Q-key)

In the old days of Factorio you could not simply press `Q` while hovering over a building and have it magically appear in your cursor. No, you had manually to find it in your inventory or in you quick bar. And if you used your quickbar you also had to search through some unwanted items, since in those days it was a [seperate inventory](https://www.factorio.com/blog/post/fff-191) and not simply shorcuts. A modder named *Tinyboss* saw this constant struggle and made the original [Picker mod](https://mods.factorio.com/mods/Tinyboss/picker) in August 2015. After a while *Tinyboss* [allowed](https://www.reddit.com/r/factorio/comments/67hsjj/the_new_pipette_tool/dgs9aa3?utm_source=share&utm_medium=web2x&context=3) the renown modder [*Nexela*](https://mods.factorio.com/user/Nexela) take over the mod's maintenance, who then created the [Picker Extended Mod](https://mods.factorio.com/mod/PickerExtended). 

![](media/picker_original.png)

*Caption: The mod page of the original Picker mod after it was moved to the Mod Portal. (*Tinyboss* goes by many [descriptive aliases](https://www.reddit.com/r/factorio/comments/67hsjj/the_new_pipette_tool/dgs9aa3/))*

Luckily, in Factorio 0.15 some of this mod's functionality was [included](https://forums.factorio.com/viewtopic.php?t=50827) in the vanilla game. Even though this mod's premise is faily simple, it is very powerful. It's one of those features that as soon as you get used to it, you cannot imagine playing without it. It should be noted that only a small part of the mod's functionality was added to vanilla. The mod is still available, and has an extensive set of extra useful features. 

### Personal Roboport

A lot of Factorio players rush for the personal roboport when building a base. It's hard to imagine Factorio without it. You only need to think of building your entire rail network by hand, or by having to cover the entire area with roboports. Not to even think about the countless outposts. However, this amazing tool was only added to vanilla Factorio in July 2015 with Factorio 0.12. Before then this feature was known only as Pocket Bots, and it was only available as a mod.

![](media/pocket_bots_technology.png)

*Caption: The Pocket Bots technology screen as shown in Factorio 0.12*

Pocket Bots was released in June 2014 by *JamesOFarrell* on a Factorio Forums thread called: [*Pocket Bots: Construction bots for your pocket*](https://forums.factorio.com/viewtopic.php?t=4441). And as you can imagine, this mod became very popular and was used by many. To make the mod work in that old version of Factorio *JamesOFarrell* had to be clever with hacks. It seems like he had to create a temporary logistic chest at the players feet for the robots to be able to pick up (or drop) the items. There was no other way to pick it up directly from the players inventory. It had other quirks as well, like only working outside your roboport coverage, but that is typically where it was most used.

POCKET BOTS IN USE VIDEO
![](media/pocket_bots_example.mp4)

*Caption: An example of the pocket bots in use. Notice the temporary creation of a logistic chest at the players feet.*

The developers noticed how popular and useful this mod was, and almost exactly a year later the vanilla [Personal Roboport](https://wiki.factorio.com/Personal_roboport) was teased in [Factorio Friday Facts #92](https://factorio.com/blog/post/fff-92) in preperation for Factorio 0.12. It should be noted that in Factorio 0.12 there was only one personal roboport type, and no upgraded MK2 version. This meant that to have 100 working personal construction robots you had to have 10(!) personal roboports. It wasn't until Factorio 0.15, released in February 2019, that we received the [Personal Roboport MK2](https://wiki.factorio.com/Personal_roboport_MK2), which allowed you to fit 100 bots in your pocket using only 4 personal roboports.

### The Blueprint String

A blueprint string is used to [import and export blueprints](https://wiki.factorio.com/Blueprint#Importing.2FExporting_blueprints) to and from you game. This can be anything from nuclear builds, rail network, or perfect-ratio solar blueprints. And as you might guess, this was also a mod before it was native to vanilla. Blueprints were added to vanilla in Factorio 0.9, but soon after that people wanted to start [sharing](https://forums.factorio.com/viewtopic.php?f=66&t=2697&p=19833&hilit=blueprint#p19833) their blueprints. And as always, a modder came to the rescue. This time it was *JamesOFarrell* again, the guy that brought us PocketBots, who then created a famous mod called [Foreman](https://forums.factorio.com/viewtopic.php?f=190&t=6516) in November 2014.

![](media/foreman.png)

*Caption: The Foreman GUI as seen in game (taken from the [forum post](https://forums.factorio.com/viewtopic.php?f=190&t=6516)).*

However, technically *JamesOFarrell* was not the first to implement the blueprint *string*, even though this mod was most likely its predecessor. Rather, the main feature of the Foreman mod was only the managing of blueprints. There was no blueprint books at that point - it was only added in Factorio 0.13, two years later. This meant each blueprint was saved seperately in your inventory, and which would quickly clog it up. Therefore, besides managing blueprints, one of Foreman's features was a way to import/export these blueprints. But still, it didn't create blueprint strings originally. It instead created small snippets of Lua code! Below is an example of a reduced piece of the `*.blueprint` file that it created - that could be read with any text editor.

```
do local blueprintData={icons={[1]="fast-transport-belt",[2]="boiler"},entities={[1]={type="transport-belt",position={x=-8.5,y=-3.5},name="fast-transport-belt",orientation=0,direction=4,entitynumber=1},[2]={type="transport-belt",position={x=-8.5,y=-4.5},name="fast-transport-belt",orientation=0,direction=4,entitynumber=2},[3]={type="pipe-to-ground",position={x=-7.5,y=-4.5},name="pipe-to-ground",orientation=0,direction=2,entitynumber=3},[4]={type="inserter",direction=4,filters={[1]={index=1},[2]={index=2},[3]={index=3},[4]={index=4},[5]={index=5}},conditions={red={count=5,operator=">",name="raw-wood"},logistics={operator=">",count=1},green={operator=">",count=1}},entitynumber=4,orientation=0,connections={red={[1]=74},green={}},name="smart-inserter",position={x=-6.5,y=-3.5}},[5]={type="boiler",position={x=-6.5,y=-4.5},name="boiler",orientation=0,direction=0,entitynumber=5}, ... name="PowerSmart"};return blueprintData;end
```

And as you might imagine, this resulted in very large blueprint files and it became quite unwieldly. There was discussions about how reduce the blueprint's footprint, for example by using zip files, but nothing resulted in a robust implementation while maintaining ease-of-use. However, less than two weeks after Foreman was released, a famous modder called *DaveMcW* solved this problem. (If you don't know this name yet, see this [article](https://alt-f4.blog/ALTF4-13/)). He solved the blueprint size problem by compressing the mentioned code snippet using a `gzip + base64` format, and thus created the now-famous [Blueprint String](https://forums.factorio.com/viewtopic.php?f=14&t=6742).

![](media/blueprint_string_gui.png)

*Caption: The easy to use Blueprint String GUI as seen in game (taken from the [forum post](https://forums.factorio.com/viewtopic.php?f=14&t=6742)).

Soon after this mod was released *DaveMcW* likely helped *JamesOFarrell* to support blueprint strings in Foreman as well. These two mods ruled the blueprint gameplay. If you wanted to share blueprints you used Blueprint Strings, and if you wanted a better blueprint management tool you used Foreman. At some point the modder *Choumiko* took over maintaining of [Foreman](https://forums.factorio.com/viewtopic.php?f=92&t=14243). It wasn't until Factorio 0.15 - released April 2017, more than two years later - that blueprint strings was [supported in Vanilla](https://wiki.factorio.com/Blueprint). When it was added to vanilla the format of the code snippet changed slightly (which resulted in [this mod](https://mods.factorio.com/mods/DaveMcW/blueprint-string)), but the [compression method was still the same](https://github.com/tzwaan/python-factorio-blueprints/blob/062f34b34356bfd5820ab488746fe6dd0bccc4b4/py_factorio_blueprints/util.py#L19-L23) as first created by *DaveMcW*.

### Blueprints

Now, what is a personal roboport or blueprint strings without the actual blueprints? It was on the wishlist a long time for Factorio's creator, kovarex. This can be seen in his [forum post](https://forums.factorio.com/viewtopic.php?f=9&t=6&p=7&hilit=blueprint#p7) from 2013 - when Factorio was still in infancy - where they were still deciding in what direction to take the game. But, it was not the developers who managed to implement it first. No, the original creator was a modder named *drs9999*. And it was a technology that you had to unlock.

![](media/blueprints_nanobots_technology.png)

*Caption: The Blueprints technology screen as shown in Factorio 0.7. The little yellow robot is the old Robotics Technology icon. It's also used as the mod's nanobots - more on that later.*

This mod was first [posted](https://forums.factorio.com/viewtopic.php?f=190&t=553&hilit=blueprint) on the Factorio Forums in March 2013 - just over a month after kovarex mentioned blueprints in the aforementioned forum and before Factorio 0.4. These blueprints did not work nearly as intuitively as they do today. This is simply because the game was just over a year old at the time. There was no selection tool. There wasn't construction bots back, not to even mention a roboport. (The lonely logistic bots just hovered around when not in use.) But most importantly, mod functionality were not nearly as extensive as it is today. 

To circumvent these limitations the creator created markers that you can place down. These markers was used to designate an area to either save as blueprint or where to place down a saved blueprint. Saved blueprints were saved inside the mod in a specific number of slots, and not as items like today. There was even an option to select an area to upgrade. You then required nanobots (the little yellow bots in the picture above) in your inventory that was consumed to build the blueprint in the designated area. The creator made a [YouTube tutorial](https://youtu.be/jpekc8DchQg) for more information, but below I put together a very quick demo:

BLUEPRINT DEMO VIDEO
![](media/blueprints_demo.mp4)

*Caption: Example use of the first blueprints. (Redacted slightly for demonstration purposes). Notice the old graphics, and which ones are still used today.*

Blueprints were added to vanilla in February 2014 with Factorio 0.9, which means this mod was the only way to duplicate any part of your factory for over a year. And although it was deprecated quite quickly, it's *most likely* a direct ancestor to other massive mods that became very popular. Things like [Nanobots](https://mods.factorio.com/mod/Nanobots) by *Nexela* and [Upgrade Planner](https://forums.factorio.com/viewtopic.php?f=92&t=14781) by *kds71* both work on premises that was first shown in this Blueprints mod. As a side note, more blueprint features were modded before vanilla as well, like [blueprinting trains](https://mods.factorio.com/mod/blueprint-train) by *DaveMcW* and [mirroring blueprints](https://mods.factorio.com/mod/blueprint_flip_and_turn) by *NovaM*.

### Concluding Thoughts

Factorio has a very healthy and active modding community. They greatly increase the replayability of Factorio and expands the game to fit more playing styles. The fact that we have such an amazing modding scene is mostly because it was cultivated by the developers. They encourage modders to continue what they're doing, and even go out of their way occationaly to give modders the tools they need to create their amazing mods. This doesn't mean that the developers are lazy and deligating work they don't want to do. Rather, they are always focussed on the game's core gameplay first - things like optimization, interface, game mechanics, etc. There simply isn't always time to implement and experiment with new and exciting features. The fact that a healthy modding ecosystem evolved around the developers helps them decide in which direction to take the game, while the players get to experiment with all kinds of fun gameplay mechanics. SovietWomble has a great [video essay series](https://youtu.be/_LhmHO6qXf4) explaning a similar situation where multitudes of mods in different configurations described exactly what aspects the players enjoyed - similar to evolution and survival of the fittest. However, in his story the developers didn't use this information correctly, but - in my opinion - the Wube team is an excellent example of where this information is used correctly. They are building and expanding Factorio based on what the players enjoy. This is likely part of the reason why Factorio is currently the [3rd best rated game](https://steamdb.info/stats/gameratings/) on Steam.