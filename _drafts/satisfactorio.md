## Welcome to Satisfactorio! <author>PFQNiet</author>

### What?

For the past year, I have been building a mod called **Satisfactorio**. It is an overhaul mod that allows you to have (almost) all of the experience of [Satisfactory](https://www.satisfactorygame.com) *inside* Factorio! Every feature, from Milestones to Drones and everything in between, has been carefully re-created in Factorio.

### Why?

Modding isn't about "why", it's about "why not"! I enjoyed both Factorio and Satisfactory, and over on the Satisfactory mod portal there's [a mod](https://ficsit.app/mod/5tEqdNJV8zHcxp) that re-creates Factorio in Satisfactory, including Inserters, the tech tree and the goal of launching a rocket. That seemed like a cool concept so I wondered if maybe I could bring Satisfactory elements into Factorio. This [has been attempted](https://mods.factorio.com/mod/Satisfactory) before, however development doesn't seem to have gone particularly far before it was abandoned.

One particular feature I was interested in before I started was how Satisfactory conveyor belts connect directly to input/output slots on machines. This also applies to train stations, where a train pulls in and dumps its cargo in the platform storage, to then be loaded onto a belt. Certainly a lot simpler than some of the optimised loading/unloading setups I've seen in Factorio!

### Who?

Just for a little background, I'm quite new to the modding scene. In fact, aside from a couple of very small mods (one to [calculate solar panel ratios](https://mods.factorio.com/mod/SolarRatio) and one to [copy a snapshot of signals](https://mods.factorio.com/mod/PasteSignals) from power poles to a constant combinator), I've never attempted any signifiant modding efforts.

I am though, at least, a software developer. My day-job is working on a [free-to-play Pokémon fan-game](https://pokefarm.com/), which I've been doing for the past twelve years now. But even then, that's all done in PHP and JavaScript. Lua, the language mods are written in, was completely new to me. Fortunately, the general problem-solving skills carried over quite well, so it was mostly a matter of learning the syntax and structure of Lua scripts. The Factorio API is [exceptionally well-documented](https://lua-api.factorio.com/latest/index.html) and the [Factorio forums](https://forums.factorio.com/viewforum.php?f=82) were invaluable tools to help me get going.

### How?

As a first step, I set about figuring out how to connect belts directly to machines. I tried a few things with loaders, but quickly found that they have a strong preference for one lane of the belt over the other. If the input isn't saturated, then only the right lane gets used. If that lane fills, then the other gets started, and once the bottleneck clears you end up with doubled throughput for a while, which wasn't ideal. Satisfactory avoids this problem entirely by only having single-lane belts, but unfortunately that is not possible in Factorio.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/one-lane-loaders.mp4' alt='Miner unloading onto only one lane of a belt.' caption='The miner only works on one belt lane, not both.' width='900px' %}

I looked into other mods such as [Miniloader](https://mods.factorio.com/mod/miniloader) and [Editor Extensions](https://mods.factorio.com/mod/EditorExtensions) to see how they handled loading items onto both belt lanes, and discovered that the solution was to have a pair of invisible inserters, one outputting to each lane.

Before too long I had a miner putting items on a belt, the belt going into a smelter to produce ingots, then the ingots going into a constructor to make plates, which finally get put in a storage container. Cool!

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/tiny-production-line.mp4' alt='Chain of macines feeding into each other via betl.' caption='Mining iron, smelting ingots, and constructing plates.' width='960px' %}

I got a taste for modding and before I knew it I decided that I was going to port *everything* Satisfactory has to offer. Crazy, perhaps, but this small experiment had thoroughly [nerd sniped](https://xkcd.com/356/) me, so I started writing down the feature list I would need to work on.

Turns out, there's a lot of features! I got to work on the easier ones. Recipes were of course quite easy to bring over, and making different assembling machines for different recipe categories was simple, but other features were much harder.

While it's not possible to create entirely new types of building in Factorio, the desired effects can be reached through the use of "compound entities". That is, multiple different buildings stacked on (or at least near) each other. For example, my re-creation of the [Miner](https://satisfactory.fandom.com/wiki/Miner) doesn't actually mine items onto the belt; that would again result in only one lane being used. Instead, it places its results into an invisible chest, and the chest is then unloaded onto the belt by a Miniloader-like structure. Through this method, all kinds of new systems are possible!

### Major changes

While fundamentally Factorio and Satisfactory both share a similar core of ["making stuff that makes stuff"](https://alt-f4.blog/ALTF4-42/#part-2-automation-in-other-games), there are some major differences that I had to make work.

First of all, there is no hand-crafting in Satisfactory. At least, not in the sense that you can just fill up a crafting queue and go about your business until it's done. Instead, you have to go to the [Craft Bench](https://satisfactory.fandom.com/wiki/Craft_Bench) and you can't do anything else while working there. To replicate this, I made an assembling machine that doesn't require power, but only works if the player has the machine open on screen.

{% include image.html src='https://media.alt-f4.blog/ALTF4/45/handcrafting.jpg' alt='GUI of craft bench showing iron plates being crafted' caption='The Craft Bench requires manual interaction.' %}

On a similar note, you do not craft buildings as items in your inventory. Instead, you can select a building and its materials will be pulled from your inventory automatically as you place down copies of the chosen building. Likewise, when picking up a building, its component parts are refunded.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/build-gun.mp4' alt='Buildings being constructed.' caption='Select a building then stamp it down!' width='900px' %}

Another major difference is related to progression. Instead of mass-producing science packs to feed into labs, Satisfactory has you bring a selection of parts to the HUB for submission. I made another assembling machine for this, but this one doesn't actually craft anything at all. It is there because the recipe selection is a close enough approximation of Milestone selection, and when a recipe is selected then the building will accept the required "ingredients". Once the items are in place, a shiny button appears for you to click, unlocking the next Milestone.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/hub-selection.mp4' alt='Milestone being selected and completed in a GUI.' caption='Select a Milestone and submit items to complete it.' width='960px' %}

Power management is another factor that has been reworked. In Factorio, if your power runs low, your buildings just work slower and it's generally not a huge deal (at least not until your coal miners fail to produce enough coal...). In Satisfactory, however, insufficient power will blackout the entire factory immediately, requiring manual intervention to fix and reset the system. Implementing this took some trial and error but I eventually settled on giving each power grid a tiny drain. If that drain doesn't get the power it needs, all generators will shut down until fixed by the player.

{% include image.html src='https://media.alt-f4.blog/ALTF4/45/blackout.jpg' alt='Machines show low power symbol.' caption='The entire factory has shut down!' %}

Splitting and merging belts is quite different. Rather than having a single "Splitter" entity that balances its two input and output belts, Satisfactory uses a Conveyor Splitter and Conveyor Merger, which split one belt into three or merge three into one respectively. This means balancers are a bit different! Satisfactory doesn't tend to need them generally, but they're still quite useful.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/3x3-balancer.mp4' alt='Three full belts of items being mixed together.' caption='A 3:3 balancer mixing belts together.' width='960px' %}

Satisfactory also provides the Smart Splitter (and a higher-tier Programmable Splitter) that allows you to set filters on items passing through:

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/smart-splitter.mp4' alt='Belt of mixed item types being sorted onto separate belts.' caption='The mixed belt is split back into clean belts.' width='960px' %}

### Extra features

Satisfactory offers a remarkable number of features not present in Factorio, so these had to be replicated as closely as possible.

Combat in the early-game is done with a melee weapon, and typically involves dodging enemy attacks while poking at them. Factorio doesn't really lend itself to this, but instead the player's weapon will deal knockback and stun. When used correctly, this allows you to defeat early-game enemies without even taking damage! The enemies themselves do not build bases, but instead they are found in limited number guarding points of interest such as resource nodes and collectable items.

Not all creatures are hostile either. In Satisfactory you can find and tame Lizard Doggos to keep as pets, and they will repay you with occasional random loot. This has been recreated in the mod, so you can have a little farm! Check in on them every so often to see what they've found. Maybe it'll be a Power Slug, or maybe it'll be nuclear waste, you never know!

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/doggo-farm.mp4' alt='Items being collected from biters.' caption='Collecting items from the farm.' %}

Vehicles are equipped with an autopilot feature. Record a path and then set it running automatically. Great for early-game logistics before you get trains. Vehicles can be loaded and unloaded at Truck Stations, allowing for well organised and distributed factories.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/self-driving.mp4' alt='Car driving along programmed path, stopping, then continuing on path.' caption='A car bringing in a delivery of encased industrial beams.' width='960px' %}

Need more movement options? Satisfactory provides the Zipline, which lets you travel along power lines. Hyper Tubes allow for travel between two connected locations. Later on you can make a Jetpack to fly a fair distance, and later still there is a Hover Pack that uses electricity from the power grid to fly as long as you want.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/zipline.mp4' alt='Engineer riding power lines as a zipline.' caption='The Zipline allows you to ride alone power lines.' width='1400px'%}

Drones allow for efficient long-distance transport of items. They're like Logistics Robots, but actually good! Each drone can carry nine stacks of items at once, waiting at the destination until they are all unloaded, before picking up any items that may be returned to the origin. They're blazing fast, reaching speeds over 240kmh! However, the loading and unloading process takes longer, making drones less effective for shorter journeys.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/drone-port.mp4' alt='Flying drone makes a delivery.' caption=' This drone delivers packaged nitrogen gas, and takes empty canisters back to be refilled.' width='960px' %}

There's more, but this has already been a pretty long list, so I'll stop there.

### Help wanted!

As you have doubtless noticed from the screenshots above, I am a programmer, not a graphics person. Every building in the game is just a white card with the Satisfactory building's icon. Functionally the game is very playable in this state, as you can quite easily get used to the "graphics", but it doesn't *look* that good. I am looking for help with this. If you have any experience making graphics for Factorio mods, I'd love to hear from you and perhaps make something happen.

In the meantime, please [enjoy the mod](https://mods.factorio.com/mod/Satisfactorio), out now on the Mod Portal!

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/45/aluminium-casing-build.mp4' alt='Production line of machines to produce aluminum casings.' caption='A small build producing aluminium casings.' width='960px' %}

Stay effective!
