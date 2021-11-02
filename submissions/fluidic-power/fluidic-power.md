## The [Fluidic Power](https://mods.factorio.com/mod/FluidicPower) Experiment <author>stringweasel</author>

Ever since my education in Electronic Engineering, I've seen the flow of electricity everywhere I look. The backwards-travelling wave of cars inching forward in traffic is the movement of electrons to my eyes. Even more interesting is how similar the flow of electricity is to the movement of fluids. When I flush the toilet and it creates a whirlpool, I see an inductor being charged up by a capacitor. When I suddenly close a tap and I hear the water hammering in the pipes I see an inductor's voltage spike that's used for [boost converters](https://en.wikipedia.org/wiki/Boost_converter). Wouldn't it be cool to have this realistic behaviour of electricity in Factorio?

### Why is it hard?

First, in vanilla Factorio, electricity behaves ideally - meaning there is no resistance in the wires. Your electrical grid can transmit infite power over infinite distances indefinitely. It's almost like they strung cryogenically cooled [super-conductors](https://en.wikipedia.org/wiki/Superconductivity) to cheap wooden poles. This works very well for the goals and constraints of the game and fits most play-styles perfectly. However, there's always been a few players looking for more of a challange, wondering if electricity could be made [more realistic](https://forums.factorio.com/viewtopic.php?t=68761). Players who want to have to use transformers to avoid some kind of voltage drop over distance.

However, recreating more realistic electricity behaviors is (arguably) out of scope for vanilla Factorio and will [likely never happen](https://forums.factorio.com/viewtopic.php?p=301132#p301132) - so it's up to mods to fill this slightly sadistic niche. In Factorio, mods can only modify [predetermined aspects](https://lua-api.factorio.com/next/) of the game, and the options available for electricity are very limited. Therefore modders have come up with some interesting workarounds. One of the main problems is that once power poles are connected by copper wire, the game will automatically transfer electricity internally, which cannot be manipulated by mods. The only real access to the power network is to artificially supply or drain electricity using an [Electric Energy Interface](https://wiki.factorio.com/Prototype/ElectricEnergyInterface) (henceforth called *EEI*), but that doesn't change _how_ the power is transferred.

Another possibly is to manually remove the copper cables from power poles to manually handle the flow of electricity, but that will always also remove the visual cable connection, which looks odd. It'll also force you to calculate the transfer of power yourself in mod-code and artifically manage the power network, just like the game would do behind the scenes normally. The problem is that calculations done by a mod will always be orders of magnitude slower than the game engine doing the same. This is why the Factorio developer *Rseding91* had the following to say a few years ago after someone asked for a mod to implement [voltage drop](https://en.wikipedia.org/wiki/Voltage_drop).

{
    quote:

    "[Voltage is] not the only thing you're going to be worrying about dropping. Your UPS will TANK once you build more than a few of anything if you used such a mod :P"

    - Rseding91, Factorio Developer
    - link: https://www.reddit.com/r/factorio/comments/6wwkhx/comment/dmcea1c/
}

This does of course not mean it's impossible, even if it's not as performant as vanilla Factorio. Mods have found beautiful ways around all kinds of obstacles, including these limitations, and have created all kinds of great gameplay mechanics once thought to be unrealistic.

### A Short History of Electricity Overhauls

One of the first power overhaul mods was probably [Flow Network](https://mods.factorio.com/mods/Simdezimon/flownetwork) - made in the timeframe of Factorio 0.13. In a nutshell, a custom invisible accumulator is placed underneath every power pole, creating a composite entity, a trick very commonly used in mods. The copper wire is then removed and replaced with red circuit wire to stop the vanilla electricity transfer, but still visualizing the connection. Energy is then distributed manually between these hidden accumulators with a custom script. Unfortunately, as previously mentioned, this is very slow, as *all* electricity calculations are done in the mod and not handled by Factorio itself. It does however have the advantage of being very customizable.

![Example of FlowNetwork power distribution showing a power pole's voltage, the current flowing through the pole, and the voltage drop at that pole.](media/flow-network.png)

Another attempt came around for Factorio 0.15 called [High Voltage](https://mods.factorio.com/mod/highvoltage). This is quite an interesting mod with a lot of moving parts. Electricity is distributed at either high or regular voltage, where the transformers and other equipment are either accumulators or EEIs. The high voltage power distribution is then calculated manually with custom formulas - very similar to what Flow Network did. This allowed the author to introduce interesting mechanics like transformers requiring time to "spin up". Regular voltage on the other hand simply powers your machines and is distributed using copper wire, just like in vanilla, meaning no modding calculations are required. However, the author did introduce a type of voltage drop over distance which only required a calculation when a power pole is placed. If the placed power pole is too far away from the transformer then it won't be able to power any machines. What happens is that the power pole is silently replaced with a pole with a [supply distance](https://wiki.factorio.com/Prototype/ElectricPole#supply_area_distance) of zero, which means the pole will still be connected to power, but it cannot transmit that power to any machines. Quite a brilliant solution.

![High Voltage power distribution showing power poles disabling when too far from transformer. It also shows an overlay (blue and red lines) when selecting a power pole - very similar to Fluidic Power](media/high-voltage.jpg)

Both of these mods were very performance heavy and would very likely not scale with big factories - and they were also never updated to newer Factorio versions. In my opinion, the best modern solution is likely [Power Overload](https://mods.factorio.com/mod/PowerOverload) by Xorimuth. Here, the goal is to the split the power grid into seperate sub-networks using transformers. There is no real change to power going through a transformer, and the transfer of power through it is calculated by the mod itself. If a given sub-network has a power pole drawing more power than it can handle, it has a chance to explode! What makes this mod amazing is how clean it looks and feels with all the copper connections still showing. This is because the most of the required components like EEIs that the author requires for power manipulation is on a completely different surface - all connected by transdimentional copper wires!

![Power Overload power distribution through a transformer that looks like a power switch](media/power-overload.png)

A final honourable mention would be [Electric Transformators](https://mods.factorio.com/mod/Electric_Transformators) which I stumbled across a month or so after Fluidic Power's release. This has a similar approach to Power Overload, but without the exploding power poles, which means it doesn't punish _not_ using the transformers. It did however find an interesting way to way build transformers where no mod power calculations are required. Each transformer is a composite entity with a boiler that creates a fluid from electricity, and then a generator that turns it back into electricity. This means the electric networks are disconnected, but calculations between the networks are still done by the (much more performant) game engine.

![Electric Transformators power distribution through a cool looking transformer. ](media/electric-transformators.png)

These mods are all brilliant in their own way and can create amazing gameplay. However, I was wondering if electricity could be even more realistic? Could it mimic fluids even more closely? And most importantly - can we create some mechanic which will inherently punish certain power networks by limiting throughput, and thus incentivise the use of transformers?

### What did I do different?

Luckily, Factorio does have built-in fluid simulation, which is very well optimized and runs on the game engine. This simulation manages the oil in your storage tanks and the steam in your nuclear power plants. It's [not perfect](https://factorio.com/blog/post/fff-260) and can cause some headaches, but it works well enough. This fluid simulation is exactly what's required to mimic electricity that flows like a fluid - so I set out trying to implement it.

After many hours of mucking about in the Factorio [data stage](https://lua-api.factorio.com/latest/Data-Lifecycle.html),  and struggling with fluidboxes and composite entities for way too long, I finally stumbled onto a working solution. I successfully converted electricity into a fluid - which I call the power fluid - and essentially turned all poles into pipes. Below is an example of a steam engine powering a radar using Fluidic Power, showing both what you will see using the mod (left) and what happens behind the scenes (right).

{
    juxtapose
    ![](media/fluidic-example.png)
    ![](media/fluidic-example-decom.png)

    caption: From left to right, the setup shows power generation, stepping up voltage, stepping down voltage, and power usage.
}

The power fluid will flow to other poles like a fluid, just like water or any other fluid, and from there it will power your entities. The unit of this power fluid is in Joule (for example `10kJ`), which means it is *energy* that's being distributed through the poles. The unit could likely have been Volt or even Coulomb (as in [electric charge](https://en.wikipedia.org/wiki/Electric_charge)), but using energy integrates easily with Factorio's existing mechanics.

This implementation does however require two types of poles, namely normal poles and source poles. The source poles are placed next to your power generators, and they create the power fluid. This is achieved by placing a tiny assembler underneath the pole that creates the fluid at the correct rate with a very specific power consumption. To power your machines you need normal power poles, which have tiny generators (like the [steam engine](https://wiki.factorio.com/Steam_engine)) underneath them that turns the fluid back into electricity. This also allows the power fluid to flow through multiple poles to where it's required, just like how you can chain steam engines together. It also means that I can [limit](link to generator stat) how much power each pole can deliver to the machines surrounding it!

Below is the psuedo code to ensure the power poles have the correct characteristics.
```
// Power production dictates the source pole's assembler power consumption
power_production = (fluid_fuel_value * units_per_craft) / crafting_time

// Power consumption dictates the normal pole's generator fluid usage rate
power_consumption = fluid_fuel_value * fluid_usage_per_tick * 60
```

Next up are transformers, which have a vital part to play in a mod like this, because as we all know, fluids [don't travel very far](https://wiki.factorio.com/Fluid_system#Pipelines) at high throughput. In the real world, a transformer steps up the voltage for more efficient (read *easier*) power distribution. Fluidic Power does not have voltage to step up, but the required throughput can be reduced by simply converting the fluid energy to a larger unit. For example, "high voltage" can be emulated with the power fluid's unit being `1MJ` instead of `1kJ`. This means that for the same amount of fluid flow, more *energy* will flow. What I really enjoy about this implementation is how brutally simple these transformers are. All the mods I mentioned had to manually calculate the power transfer over a transformer or create complex composite entities, whereas I simply had to create an assembling machine with a specific recipe. This recipe doesn't change the total amount of energy, but convert it to a more or less dense form. The time to craft of this recipe, or how much fluid units it can transform, can then dictate the power input/output rating of the transformer!

```
// Example Transformer Step-Up Recipe
1000 units of 1kJ fluid --> 1 unit of 1MJ fluid

// Transformer Power Rating
power_rating = fluid_output_amount * fluid_output_unit / time_per_craft
```

With a little fiddling, this resulted in some intuitive and fun gameplay. It's designed so that only the lowest voltage can power your machines or accept generated power. Then, once the voltage is increased to aid distribution, the high voltage fluid can *only* travel through big power poles. These big power poles are also limited and cannot power any machines or accept any generated power. This is probably my favourite part of this implementation. It means that there is an inherent incentive to create a high voltage backbone throughout your base, and everywhere you want to actually use any power, you need to use transformers.

![Example of main high voltage line (solid in-game overlay) with transformers stepping down the voltage to machines (dashed in-game overlay). This allows for simplistic power distribution.](media/transformers.png)

Finally, having power simulated as a fluid changes the design of the accumulators. It's no longer a smart entity that only accepts surplus power, which only releases all it's energy when it's requried. Instead, it's a simple storage tank which acts like a big, dumb capacitor. It only accepts the low voltage power which means your battery banks need plenty of transformers. It's possible to create the same behaviour as vanilla accumulators with fun circuitry, but without circuitry they still function well enough, albeit a little inefficiently.

### In Conclusion

All-in-all I was suprised and excited that I found an implemetation that fulfilled most of my goals and inherently created the challenges and obstacles that I envisioned it to have. And I didn't have to create many artifical limitations to the player, which is a great bonus. I only created the fundamental system and it regulates itself! I'm abusing some mechanics, which does introduce some weird quirks like accidentally mixing different voltages or not showing physical copper connections, but it's actually really fun to play.

However, the question is rather: how playable is this mod's performance? This mod required many more fluid calculations than a vanilla game, and abuses some other mechanics. Can the highly optimized Factorio engine keep up, even though it's been predicted that such a mod will tank your UPS? I will go into more detail about this next week. To end on a [cliffhanger](https://en.wikipedia.org/wiki/Cliffhanger), what I found out might surprise you. It definitely surprised me.
