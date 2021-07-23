## Welcome to Satisfactorio!

### What?

**Satisfactorio** is an overhaul mod that bridges the gap between Satisfactory and Factorio. Every feature, from Milestones to Drones and everything in between, has been carefully re-created in Factorio.

### Why?

Modding isn't about "why", it's about "why not"! I enjoyed both Factorio and Satisfactory, and over on the Satisfactory mod portal there's a mod that attempts to bring Factorio elements into Satisfactory. Things like Inserters, Science Packs and other small scale modifications. That seemed like a cool concept so I wondered if maybe I could bring Satisfactory elements into Factorio.

### How?

Having never modded anything before, I set about figuring out how to connect belts directly to machines. I tried a few things with Loaders, but quickly found that they have a strong preference for one belt lane over the other, so I looked to Miniloaders and discovered that a pair of invisible inserters would do the job quite well.

[[Image: one-lane-loaders.jpg]]

Before too long I had a miner putting items on a belt, the belt could go into a smelter to produce ingots, then those go into a constructor to make plates, which get put in a storage container. Cool!

[[Image: tiny-production-line.jpg]]

I got a taste for modding and before I knew it I decided that whereas the mods that inspired me were limited in scope (one Satisfactory mod just adds Inserters, another adds Factorio recipes), *my* scope would be... *everything*. I was going to port everything Satisfactory has to offer, so I started writing down the feature list I would need to work on.

Turns out, there's a lot of features! So I got to work on the easier ones. Recipes were of course quite easy to bring over, but others... not so much!

### Major changes

While fundamentally Factorio and Satisfactory both share the similar core of "build stuff to build more stuff", there are some major differences that I had to make work.

First of all, there is no hand-crafting in Satisfactory. At least, not in the sense that you can just fill up a crafting queue and go about your business until it's done. Instead, you have to go to the Craft Bench and you can't do anything else while working there. To replicate this, I made an assembling machine that doesn't require power, but only works if the player has the machine open on screen.

[[Image: handcrafting.jpg]]

On a similar note, you do not craft buildings as items in your inventory. Insetad, you can select a building and its materials will be pulled from your inventory automatically as you place down copies of the chosen building. Likewise, when picking up a building, its component parts are refunded.

[[Image: build-gun.jpg]]

Another major difference is related to progression. Instead of mass-producing science packs to feed into labs, Satisfactory has you bring a selection of parts to the HUB for submission. I made another assembling machine for this, but this one doesn't actually craft anything at all. It is there because it provided a tidy way of offering Milestone Selection, and accepting the various parts required for submission. Once the ingredients are in place, a shiny button appears for you to click and unlock the next Milestone.

[[Image: hub-selection.jpg]]

Power management is another factor that has been reworked. In Factorio, if your power runs low, your buildings just work slower and it's generally not a huge deal. At least, not until your coal miners fail to produce enough coal... In Satisfactory, however, insufficient power will blackout the entire factory immediately, requiring manual intervention to fix and reset the system. Implementing this took some trial and error but I eventually settled on giving each power grid a tiny drain. If that drain doesn't get the power it needs, all generators will shut down until fixed by the player.

[[Image: blackout.jpg]]

### Extra features

Satisfactory offers a remarkable number of features not present in Factorio, so these had to be replicated as closely as possible.

Combat in the early-game is done with a melee weapon, and typically involves dodging enemy attacks while poking at them. Factorio doesn't really lend itself to this, but instead the player's weapon will deal knockback and stun. Essentially, if you land the first hit, you don't get hit in return.

Not all creatures are hostile! In Satisfactory you can find and tame Lizard Doggos to keep as pets, and they will repay you with occasional random loot. This has been recreated in the mod, so you can have a little farm!

[[Image: doggo-farm.jpg]]

Vehicles are equipped with an autopilot feature. Record a path and then set it running automatically. Great for early-game logistics before you get trains.

[[Image: self-driving.jpg]]

Need more movement options? Satisfactory provides the Zipline, which lets you travel along power lines. Hyper Tubes allow for travel between two connected locations. Later on you can make a Jetpack to fly a fair distance, and later still there is a Hover Pack that uses electricity from the power grid to fly as long as you want.

[[Image: jetpack.jpg]]

Drones allow for efficient long-distance transport of items. They're like Logistics Robots but actually good!

[[Image: drone-port.jpg -- full canisters are sent out, empty ones are returned]]

There's more, but this has already been a pretty long list!

### Help wanted!

As you have doubtless noticed from the screenshots above, I am a programmer, not a graphics person! Every building in the game is just a white card with the building's icon. It's perfectly playable in this state, but it doesn't look that good.

If you have any experience making graphics for Factorio mods, I'd love to hear from you and perhaps make something happen.

In the meantime, please enjoy the mod - I've spent almost a year non-stop on it!

[[Image: aluminium-casing-build.jpg]]

Stay effective!
