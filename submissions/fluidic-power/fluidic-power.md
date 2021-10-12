## The [Fluidic Power](https://mods.factorio.com/mod/FluidicPower) Experiment <author>stringweasel</author>

Ever since my education in Electronic Engineering I've seen the flow of electricity in everywhere I look, especially. For example the backward-travelling wave of cars (read *electrons*) inching forward in traffic is an the flow of electricity. Even more interresting is how close the flow of electricity is to the flow of fluids. When I flush the toilet and it creates a whirlpool I see an inductor being charged up through a capacitor. When I suddenly close a tap and I hear the water hammering in the pipes I see a inductor's voltage spike that's used for [Boost Converters](https://en.wikipedia.org/wiki/Boost_converter). Wouldn't it be cool to have this behaviour of electricty in Factorio?

### Why is it hard?

As you know vanilla Factorio's electricity is perfect. Your electrical grid can transmit infite power over infinite distances indefinitely. It's almost like they strung cryogenically cooled [super-conductors](https://en.wikipedia.org/wiki/Superconductivity) to the small and cheap wooden power poles. This works very well for the purpose and constraints of the game and fits most playstyules perfectly. However, since the start there were always a few players looking for more of a challange who wondered if electricity could be made more realistic.

Modding capabilities limited
when connected with copper - power flows
can only have three wires
power can only be manipulated through accus and EEIs, which does not have wire connections - compound entities needed

### The History

There are a few mods that have attempted this, and all in differnt ways. One of the first ones was probably [Flow Network](https://mods.factorio.com/mods/Simdezimon/flownetwork) - made in the time of Factorio 0.13. How it works in a nutshell is that a custom accumulator is placed on each power pole, and the copper wire is replaced with red circuit wire to stop the vanilla electricity transfer. Energy is then distributed manually between these accumulators with a custom formula - very similar to the vanilla fluid simulation (?? GET FFF). Unfortunately, this is very slow, as _all_ electricity calculations are done in the mod (in Lua), which is way slower than when the game executed the calculations internally (in C++).

// Download this image and host it on our server
![Example of FlowNetwork power distribution](https://mods-data.factorio.com/assets/6d8618acf0c9aac24efd39273298e11c70a5c9f8.png)

Another try was mod that came around in Factorio 0.15 called [High Voltage](https://mods.factorio.com/mod/highvoltage). This is quite an interesting mod with a lot of moving parts. Electricity is distributed at either high or regular voltage, where the transformers and other equipment are either accumulators or Electric Energy Interfaces. The high voltage power distribution is then calculated manually with custom forumalas - very similar to what Flow Network did. This allowed the author to introduce interesting mechanics like transformers requiring time to "spin up". Regular votlage electricity - that powers your machines - is distributed using copper wire, just like in vanilla. This means the amount amount Lua calculations is much lower. However, to introduce voltage drop over distance the author added a mechanic when the power pole is too far away from the transformer. When this happens the power pole is silently replaced with a pole with a supply distance of zero, which means the pole will still be connected to power, but it cannot transmit that power to any machines. Quite an brilliant sollution.

// Download this image and host it on our server
![High Voltage power distribution showing power poles disabling when too far from transformer. It also shows an overlay (blue and red lines) when selecting a power pole - very similar to Fluidic Power](https://i.imgur.com/n5s1a6m.jpg)

Both of these mentioned mods was very performance heavy and would very likely not scale with big factories - and they were also never updated. In my opinion the best modern solution is likely [Power Overload](https://mods.factorio.com/mod/PowerOverload) by Xorimuth. Here the goal is to differentiate power grid into subnetworks using transformers. There is no real difference to power before and after the transformer, but the transfer of power is also calculated in the mod itself. However, the goal here is slightly different. If a given sub-network has a power pole drawing more power than it can handle it has a chance to explode! What makes this mod amazing is how clean it looks and feels with all the copper connections still showing. This is because the bulky machines like Electric Energy Interfaces that he requires for power manipulation is on a completely different surface - all connected by a trans dimentional copper cable!

// Download this image and host it on our server
![Power Overload power distribution through a transformer (that looks like a power switch)](https://mods-data.factorio.com/assets/0c35838cf1a3cf18a90081de3aaf6d6f7b95f623.png)

TODO Mention transformators?

These mods are all brilliant in their own way and can create amazing gameplay. However, I was wondering if electricity can be even more realistic? Can it mimic fluids even more which will inherently drop off over distance, limit throughput, and thus require higher votlages?

### What did I do different?

Luckily, Factorio does have a built-in fluid simulation that is very well optimized and runs in C++. This simulation manages the oil in your storage tanks and the steam in your nuclear power plants. It's not perfect, and can cause many headaches, but it works. This simulation is exactly what's required to mimic electricity flow as a fluid - so I set about trying to implement it.

After many hours of mucking about in the Factorio [datastage](https://lua-api.factorio.com/latest/Data-Lifecycle.html) and struggling with fluidboxes for way too long I finally stumbled onto a working solution.

{Insert image of decomposed power distribution}

In essence I converted electricity into a fluid - which I call the power fluid - and then I turned all poles into pipes. This means the power fluid will flow to other poles like a fluid, just like water or any other fluid, and from there power your entities. This fluid has an unit off???

```
// Power production specifies the assembler power consumption
power_production = (fluid_fuel_value * units_per_craft) / crafting_time

// Power consumption specifies the generator fluid usage rate
power_consumption = fluid_fuel_value * fluid_usage_per_tick * 60
```

To generate the power fluid I simply run an assembler that creates the fluid at the correct pace relative to it's power consumption wiTo turn the fluid back into electricity.

```
power_consumption = fluido
```

What I really enjoy about this design is how brutally simple the transformers are. All the mods I mentioned had to manually calculate the power transfer over a transformer, whereas I simply had to create an assembling machine that inputs and outputs fluids, with a recipe like:

```
1 unit of 1000kJ fluid = 1000 units of 1MJ fluid
```

### What obstacles did I face?

Is this neccesary?

### Is the performance playable?