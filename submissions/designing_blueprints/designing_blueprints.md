## Designing Blueprints with Creative Mod and KirkMcDonald's Calculator <author>gamebuster800</author>

I like to design my factory in isolation. When I need a certain resource in my game, like some science pack, I stop my "survival" save and open another save with [creative mod](https://mods.factorio.com/mod/creative-mod).

Creative mod adds infinite sources for liquids and raw materials, and it adds easily configurable cheats like speed-up, disable biters, all tech and infinite reach.

Before I start I'll determine my goal. In this case, I just finished Chemical (blue) Science Pack production and just introduced Construction and Logistic Bots to my base. To finish unlocking the non-infinite tech tree, I'll need Production (purple) and Utility (yellow) Science Pack production, so that's what I'll be designing.

I still have mostly first-tier entities available: Yellow Belts, Yellow Inserts and Assembling Machine 1s. I did setup production for the higher tier ones, but these are just starting and I still have a pool of these first-tier entities, so I'll focus my blueprint on using the first tier entities.

### KirkMcDonald's Calculator

I'll be using [KirkMcDonald's calculator](https://kirkmcdonald.github.io/calc.html#data=1-0-0&items=production-science-pack:r:60,utility-science-pack:r:60&ignore=iron-plate,copper-plate) to create a diagram of all the required resources and entities required to produce them.

I'll tell the calculator not to include furnaces for raw metal ore and raw copper ore, since I'm the kind of person to do smelting at the ore deposits.

> Ores stack up to 50, while plates stack up to 100. Therefore, when smelting before loading into trains or chests, you can double the amount of plates per storage container.

### Designing the blueprint

Because the diagram is pretty large, I'll first design the individual components of the blueprint, feeding it with infinite resources and consuming all resources. I do this for all of the production chains like Advanced Circuit production, Electronic Circuit production or Steel production. I measure the performance of each one by speeding up the game (Creative Mode > Cheats > Game Settings > Game Speed > **100**) and looking at the production window. (use **P** to open the production window). I usually let it run for 10 in-game minutes to an in-game hour.

The production should match the numbers from the calculator. If it doesn't, check the assembly machines and see what resource is lacking. Follow the lacking resources until you find your problem. Usually the belt is not capable of transporting the amount of materials, or the inserters aren't fast enough.

Once all the individual production chains seem to be functioning well, I'll connect them all together and measure their overal performance. I'll remove all extra infinite sources and no longer consume the outputs other than the science production. This way I measure if there are any bottlenecks between the production chains.

Again, I usually let it run for 10 in-game minutes to an in-game hour, fixing all the bottlenecks or other issues. I'll make sure the system produces the amount of resources exactly for at least an hour, without any spikes or dips.

> If you want to be extra thorough, you can disable an input for a minute and restart it again, and see if the production recovers properly. Especially with oil production, sometimes one resource backing up can permanently cripple another one, breaking the factory. You must make sure that any excess liquid production is consumed properly and doesn't back up.

### Packing the blueprint

Now that I have a factory capable of producing my desired material, I have to pack the blueprint into the smallest area possible. I like to have the inputs and outputs all as close as possible together and all at one side.

I copy/paste the individual production chains so that I'll end up with something that resembles a rectangle with minimum wasted space, while also connecting them all together.

Once I'm satisfied with my production chain tetris skills, I'll measure the blueprint again. Usually some mistakes slip in.

### Releasing the blueprint

Finally, I mark all the inputs with constant combinators. I'll use a constant combinator for each input and set a signal with the amount of resources per minute that should be provided on the belt and the belts right of it.

I blueprint the whole thing (including the constant combinators), write a description, version number, describe the inputs and outputs in the description, and save it.