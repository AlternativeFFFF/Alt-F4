## Mod spotlight: [Editor Extensions](https://mods.factorio.com/mod/EditorExtensions) <author>Raiguard</author>

Everyone knows about [Creative Mod](https://mods.factorio.com/mod/creative-mod). It provides you with many different 'cheat'-items that you can use to test your factory layouts. It has been around for quite a long time, and has served people well over the years.

However, if you use Creative Mod for any length of time, you'll start to notice lag spikes here and there. Continue using it more and more, and the lag spikes will get more and more frequent. Eventually, your game will begin to slow down as you use more and more of Creative Mod's tools.

A year and a half ago, I started experiencing lag on my creative world. I had just released my [first mod](https://mods.factorio.com/mod/Tapeline) at the time, so I had a little bit of experience with the API. Curious, I delved into Creative Mod's code and tried to see if I could figure out what was going on.

The result was: Creative Mod was very well made... for its time. The mod was first created in 0.13, when the modding API was much more limited. Thus, it managed to do all of these awesome things with an extremely limited set of tools. But now, the mod API is much more mature and a lot more capable. I set out to create an update to Creative Mod that would take advantage of these new features, thereby decreasing its performance impact.

But eventually, I realized that updating Creative Mod was infeasible. There would be too many breaking changes in order to bring it up-to-date, so instead, I decided to create a new mod altogether. That mod was initially released as _Infinity Mode_, but was soon deprecated and replaced with Editor Extensions for various reasons.

Editor Extensions does not _replace_ the game's map editor like Creative Mod and Infinity Mode do - it _augments_ it. Thus, EE does not have a "cheats" window akin to Creative Mod and Infinity Mode. The editor has all of that functionality - and more - buried within its many menus.

Editor Extensions' main appeal is its performance - it is several order of magnitudes faster than Creative Mod. I'm going to go over some of the methods I used to achieve this.

### Electricity

The first thing I set out to do was create energy sources and energy voids. Creative Mod does this by creating boilers, then filling them with electricity on every tick using a script. However, now the game has a built-in entity that can do this automatically: the _Electric energy interface_ (EEI). This entity can magically produce and consume electricity out of nothing, and its parameters are adjustable at runtime.

There are two things about the EEI that I wanted to improve on - the GUI and the usage priority. The EEI's GUI is functional, but confusing, and an entity can only have one usage priority assigned to it. Of course, I can fix the first problem by creating a custom GUI, but the second problem is solved in a slightly trickier manner.

What you see as an _Infinity accumulator_ is actually one of five possible entities, each with a different usage priority. Depending on how you configure it in the GUI, a small script will hot-swap the entity with another one that looks identical, but has a different usage priority. This allows a single "entity" to do everything from producing, consuming, and storing a customizable amount of power (up to 999 [Yotta](https://en.wikipedia.org/wiki/Yotta-)watts!).

{% include imgur.html id="3QyxRdz" %}

### Chests

The next problem I wanted to solve was chests. Creative Mod has a variety of chests, which can spawn, duplicate, or delete items. However, it uses scripts to accomplish _all_ of that functionality, creating a rather large overhead after placing just a few chests.

In 0.16, the base game was graced with the _Infinity chest_, which can do all of this and more. It works by setting _infinity filters_, which themselves have "at least", "at most" and "exactly" modes. This offloads all of the item manipulation to the game itself, reducing the scripting overhead to absolutely zero!

EE extends upon the basic infinity chest by adding logistic variants, and adding a special kind of infinity chest called an _Aggregate chest_. The Aggregate chest is most similar to the Creative chest - it holds a stack of every item in the game. A small script sets its infinity filters when placed, and then the base game handles the rest. There are regular and passive provider variants of this chest as well.

Using Infinity and Aggregate chests, you can get the exact behavior you want for testing your builds.

{% include imgur.html id="TtYA87y" %}

### Belts

Often times, you will want to quickly and easily place items on a belt, or get rid of items on a belt, to test your setups. In vanilla, you can do this with an infinity chest and a _loader_ (a hidden entity that you can get in the map editor). However, these loaders are fairly basic, and if you want to have different items on each side of a belt, you have to place two loaders and two infinity chests. That's four entities, and then you have to configure the chests as well, taking up even more time.

To solve this problem, I actually built upon another mod - [Miniloader](https://mods.factorio.com/mod/miniloader). A lot of the concepts are shared between Miniloader and the _Infinity loader_, so this explanation will give you a sneak peak into how that mod works as well.

The _Infinity loader_ is actually a minimum of five entities at once:

{% include imgur.html id="23NDRXZ" %}

From left to right, we have the loader entity itself, an infinity chest, two stack filter inserters, and a constant combinator. All of these entities play a role in making the Infinity loader work.

When you place an infinity loader, what you are actually placing is a "dummy combinator". This is a constant combinator that is disguised to look like a loader. When placed, a script immediately destroys that combinator and replaces it with an invisible one. This combinator is what you actually interact with, and is saved in blueprints so the filters can be preserved. Then the loader entity is added, along with an invisible infinity chest and a minimum of two invisible stack filter inserters with their speed cranked up to max.

When you configure the loader's filters through its custom GUI, you are actually setting the filters on the invisible stack filter inserters, as well as the infinity chest. These inserters will pull from the chest and put the items on the belt extremely quickly, making it seem as if the items are spawning out of nowhere.

The reverse is also true - if you rotate an infinity loader to consume items, the inserters will pull everything off of the belt and throw it in the infinity chest, making it seem as if the items are magically disappearing. All of this is done behind the scenes and takes advantage of vanilla behaviors. A script is used to "set up" the loader, but from then on, the script does nothing, reducing the scripting overhead for using these loaders - once again - to zero.

Of course, to make things as simple as possible, there is only one infinity loader _item_ that you place. The loader will switch its belt type depending on what it's connected to automatically, and will add or remove inserters to be able to keep up with the belt's speed. And because there are multiple different inserters, we can set different filters for each side of the belt.

The result is a convenient, easy-to-use entity that can produce and consume items on a belt, while being extremely performance friendly.

{% include imgur.html id="4wgCivT" %}

### Character cheats

While Editor Extensions is primarily meant to be used from the map editor, it is also quite possible and quite easy to use a character as well. By using _cheat mode_ (accessed by typing `/cheat` or `/cheat all` into the console), you can get access to all the tools mentioned above.

Some of the tools I haven't mentioned include supercharged equipment:

{% include imgur.html id="veT8DuC" %}

By using this equipment, you can become immortal, run super fast, and see clearly in the darkness. The super roboport, combined with super construction bots, allows you to very quickly construct and deconstruct. The result is you can access many of the editor's god-like powers while retaining your comfortable body. And in the future, if you ever remove Editor Extensions from your save, the equipment will simply disappear, leaving infinite reach as the only evidence of the mod being there.

### Conclusion

{% include imgur.html id="CRn5QlU" %}

Editor Extensions is the result of over a year of testing both in-game builds and mods. There are many, _many_ things that I haven't covered here - including a `toggle editor` shortcut, inventory sync, infinity pipes, and a special testing scenario - but that would make this post even longer than it already is. I hope you enjoyed the read, and I hope you gained some insight into how Factorio's amazing modding API works.

The Factorio developers spoil us with what we are able to do to their game, and the API only gets more and more capable with every update. Thank you for reading, and thank you to the developers for making this possible!
