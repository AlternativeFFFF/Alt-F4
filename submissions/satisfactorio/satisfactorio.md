## Welcome to Satisfactorio!

### What?

**Satisfactorio** is an overhaul mod that bridges the gap between Satisfactory and Factorio. Every feature, from Milestones to Drones and everything in between, has been carefully re-created in Factorio.

### Why?

Modding isn't about "why", it's about "why not"! I enjoyed both Factorio and Satisfactory, and over on the Satisfactory mod portal there's a mod that attempts to bring Factorio elements into Satisfactory. Things like Inserters, Science Packs and other small scale modifications. That seemed like a cool concept so I wondered if maybe I could bring Satisfactory elements into Factorio. This [has been attempted](https://mods.factorio.com/mod/Satisfactory) before, however development doesn't seem to have gone particularly far before it was abandoned.

In particular I was interested in how Satisfactory conveyor belts connect directly to input/output slots on machines. This also applies to train stations, where a train pulls in and dumps its cargo in the platform storage, to then be loaded onto a belt. Certainly a lot simpler than some of the optimised loading/unloading setups I've seen in Factorio!

### Who?

Just for a little background, I'm quite new to the modding scene. In fact, aside from a couple of very small mods (one to [calculate solar panel ratios](https://mods.factorio.com/mod/SolarRatio) and one to [copy a snapshot of signals](https://mods.factorio.com/mod/PasteSignals) from power poles to a constant combinator), I've never attempted any signifiant modding efforts.

I am, at least, a software developer. My day-job is working on a [free-to-play Pokémon fan-game](https://pokefarm.com/), which I've been doing for the past 12 years now. But even then, that's all done in PHP and JavaScript. Lua, the language mods are written in, was completely new to me. Fortunately, the general problem-solving skills carried over quite well, so it was mostly a matter of learning the syntax and structure of Lua scripts.

### How?

As a first step, I set about figuring out how to connect belts directly to machines. I tried a few things with Loaders, but quickly found that they have a strong preference for one belt lane over the other. If the input isn't saturated, then only the right lane gets used. If that lane fills, then the other gets started, and once the bottleneck clears you end up with doubled throughput for a while, which wasn't ideal.

[[Video: one-lane-loaders.mp4 -- The miner only works on one belt lane, not both.]]

I looked into other mods such as [Miniloader](https://mods.factorio.com/mod/miniloader) and [Editor Extensions](https://mods.factorio.com/mod/EditorExtensions) to see how they handled loading items onto both belt lanes, and discovered that the solution was to have a pair of invisible inserters, one outputting to each lane.

Before too long I had a miner putting items on a belt, the belt could go into a smelter to produce ingots, then those go into a constructor to make plates, which get put in a storage container. Cool!

[[Video: tiny-production-line.mp4 -- Mining iron, smelting ingots, and constructing plates]]

I got a taste for modding and before I knew it I decided that whereas the mods that inspired me were limited in scope (one Satisfactory mod just adds Inserters, another adds Factorio recipes), *my* scope would be... *everything*. I was going to port everything Satisfactory has to offer, so I started writing down the feature list I would need to work on.

Turns out, there's a lot of features! So I got to work on the easier ones. Recipes were of course quite easy to bring over, but others... not so much!

While it's not possible to create entirely new types of building in Factorio, the desired effects can be reached through the use of "compound entities". That is, multiple different buildings stacked on (or at least near) each other. For example, the Miner doesn't actually mine items onto the belt; that would again result in only one lane being used. Instead, it places its results into an invisible chest, and the chest is then unloaded onto the belt by a Miniloader-like structure. Through this method, all kinds of new systems are possible!

### Major changes

While fundamentally Factorio and Satisfactory both share the similar core of "build stuff to build more stuff", there are some major differences that I had to make work.

First of all, there is no hand-crafting in Satisfactory. At least, not in the sense that you can just fill up a crafting queue and go about your business until it's done. Instead, you have to go to the Craft Bench and you can't do anything else while working there. To replicate this, I made an assembling machine that doesn't require power, but only works if the player has the machine open on screen.

[[Image: handcrafting.jpg -- The Craft Bench requires manual interaction.]]

On a similar note, you do not craft buildings as items in your inventory. Insetad, you can select a building and its materials will be pulled from your inventory automatically as you place down copies of the chosen building. Likewise, when picking up a building, its component parts are refunded.

[[Video: build-gun.mp4 -- Select a building then stamp it down!]]

Another major difference is related to progression. Instead of mass-producing science packs to feed into labs, Satisfactory has you bring a selection of parts to the HUB for submission. I made another assembling machine for this, but this one doesn't actually craft anything at all. It is there because the recipe selection is a close enough approximation of Milestone selection, and when a recipe is selected then the building will accept the required "ingredients". Once the items are in place, a shiny button appears for you to click and unlock the next Milestone.

[[Video: hub-selection.mp4 -- Select a Milestone and submit items to complete it]]

Power management is another factor that has been reworked. In Factorio, if your power runs low, your buildings just work slower and it's generally not a huge deal. At least, not until your coal miners fail to produce enough coal... In Satisfactory, however, insufficient power will blackout the entire factory immediately, requiring manual intervention to fix and reset the system. Implementing this took some trial and error but I eventually settled on giving each power grid a tiny drain. If that drain doesn't get the power it needs, all generators will shut down until fixed by the player.

[[Image: blackout.jpg -- The entire factory has shut down!]]

### Extra features

Satisfactory offers a remarkable number of features not present in Factorio, so these had to be replicated as closely as possible.

Combat in the early-game is done with a melee weapon, and typically involves dodging enemy attacks while poking at them. Factorio doesn't really lend itself to this, but instead the player's weapon will deal knockback and stun. When used correctly, this allows you to defeat early-game enemies without even taking damage! The enemies themselves do not build bases, but instead they are found in limited number guarding points of interest such as resource nodes and collectable items.

Not all creatures are hostile! In Satisfactory you can find and tame Lizard Doggos to keep as pets, and they will repay you with occasional random loot. This has been recreated in the mod, so you can have a little farm! Check in on them every so often to see what they've found. Maybe it'll be a Power Slug, or maybe it'll be nuclear waste...

[[Video: doggo-farm.mp4 -- Collecting items from the farm]]

Vehicles are equipped with an autopilot feature. Record a path and then set it running automatically. Great for early-game logistics before you get trains. Vehicles can be loaded and unloaded at Truck Stations, allowing for well organised and distributed factories.

[[Video: self-driving.mp4 -- A car bringing in a delivery of encased industrial beams]]

Need more movement options? Satisfactory provides the Zipline, which lets you travel along power lines. Hyper Tubes allow for travel between two connected locations. Later on you can make a Jetpack to fly a fair distance, and later still there is a Hover Pack that uses electricity from the power grid to fly as long as you want.

[[Video: jetpack.mp4 -- Wheeeeeeeee!!!]]

Drones allow for efficient long-distance transport of items. They're like Logistics Robots but actually good! Each drone can carry 9 stacks of items at once, waiting at the destination until they are all unloaded, before picking up any items that may be returned to the origin. They're blazing fast, reaching speeds over 240kmh! However, the loading and unloading process takes longer, making drones less effective for shorter journeys.

[[Video: drone-port.mp4 -- This drone delivers packaged nitrogen gas, and takes empty canisters back to be refilled]]

There's more, but this has already been a pretty long list!

### Help wanted!

As you have doubtless noticed from the screenshots above, I am a programmer, not a graphics person! Every building in the game is just a white card with the building's icon. It's perfectly playable in this state, but it doesn't look that good.

I am looking for help with this. If you have any experience making graphics for Factorio mods, I'd love to hear from you and perhaps make something happen.

In the meantime, please [enjoy the mod](https://mods.factorio.com/mod/Satisfactorio) - I've spent almost a year non-stop on it!

[[Image: aluminium-casing-build.jpg -- A small build producing aluminium casings]]

Stay effective!
