## Burning Questions <author>Sir Fendi</author>

Factorio has a variety of fuels that can go into your burner devices, ranging from classic and modest wood, up to experimental and extreme nuclear rocket fuel. The most popular burner fuel is coal, which is the backbone of early-game automation; it runs all the boilers, furnaces, vehicles, and other machines reliably until it inevitably runs low. 

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/1-burner-fuels.png' alt='Factorio’s burner fuels.' caption='Factorio’s burner fuels.' %}

In the mid-game, solid fuel is introduced as the first processed fuel, made initially from crude oil. Conveniently, solid fuel can be used to later make rocket fuel, which in turn can be used to make nuclear fuel. These processed fuels offer noticeable advantages over coal, like having greater energy density both per unit and per stack, and an acceleration bonus when used in vehicles. More curiously, however, the late-game also brings the technology to liquify good old coal and convert it into solid fuel. This raised for me the question: Does processing coal into solid fuel get more energy out of it? In other words, if you liquify 10 units of coal, make solid fuel out of the oils and gas that it yields, and then burn the solid fuel, does it provide more energy than directly burning the coal, even with all that processing? And what if you further processed it into rocket fuel? Similar burning questions followed and snowballed into this general exploration of the energy contents of different burner fuels as well as the energy costs of converting between them.

As I set off to answer these questions, a great info source was [the wiki page for fuels](https://wiki.factorio.com/Fuel). I approached the conversions in terms of energy produced and consumed per unit of input, rather than the production rates per building. At first I tried solving many equations with a growing list of variables, but it was much easier to convert everything into diagrams, which now summarize everything nicely. Hence, in this piece, I present some questions about different burner fuels and answer them mainly using conversion diagrams. The results provide some interesting tidbits about managing your resources and they help to complete the big picture for burner fuels.

### The Questions

We begin with the question that started it all: 

**(1) Does processing coal into solid fuel get more energy out of it?**

We can convert the coal liquification outputs directly into solid fuel, but we also have cracking available, so: 

**(2) How much of a difference does cracking make when making solid fuel?**

Then we check how processing coal stands against the conventional way of making solid fuel: 

**(3) How does oil processing compare with coal liquification when producing solid fuel?**

But then we note that we don't have to stop the processing at solid fuel: 

**(4) Does further processing solid fuel into rocket fuel get more energy out of it?**

And then we consider going further and adding uranium: 

**(5) Does further processing rocket fuel into nuclear fuel get more energy out of it?**

Then we consider that uranium is already being used for a different fuel type and we look at how that compares: 

**(6) How does burning nuclear fuel for power compare with making uranium fuel cells to "burn" in reactors instead?**

After considering all the energy equations under default conditions, we next look at how things change upon introducing modules:

**(7) What are the effects of modules on fuel processing energy gains?**

Finally, we take a step back and look at the big picture, noting other factors like setup costs and alternate technologies, and we ask: 

**(8) How useful is fuel processing in general?**

With all the conversion options in the vanilla game, this list of questions actually covers all of the burner fuels except for wood, which is not converted into anything unless you use a [charcoal mod]([Charcoal Burner - Factorio Mods](https://mods.factorio.com/mod/CharcoalBurner)). Hence, here is a quick note about wood as a fuel: You may end up with a lot of it as a byproduct of clearing space using an axe or robots. However, it runs out quickly because of how little energy it provides. Instead of cutting trees for extra fuel, you would probably benefit more from using the wood to make power poles or chests, or from keeping the trees around for pollution absorption. As for other fuels, since we use conversion diagrams to answer the questions, first let's look at how they were made.

### Making Conversion Diagrams

In the diagrams, the recipes for various fuel-related crafting processes are applied. The input and output ratios are preserved, but we run each process fractionally to match the input quantities, rather than aiming for full crafting cycles. Most of the recipes featured in the diagrams can be checked quickly from [the wiki page for oil processing](https://wiki.factorio.com/Oil_processing). The energy values of the fuels are in-game constants, referenced in [the wiki page for fuels](https://wiki.factorio.com/Fuel). The energy consumed to heat steam to 165°C is referenced in [the wiki page for steam](https://wiki.factorio.com/Steam). 

As for the electricity consumption during the fuel processing, it depends on the used machines and the number of crafting cycles they need. Calculations are simplified a lot thanks to the machines using the same amount of power per second for each of their processes. These power uses are summarized in the table:

| Power consuming machine                                                                                                                          | Power Use without Modules (MW) | Included Processes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Crafting Speed |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| ![Oil refinery.png](https://wiki.factorio.com/images/thumb/Oil_refinery.png/32px-Oil_refinery.png) Oil refinery                                  | 0.420                          | ![Basic oil processing.png](https://wiki.factorio.com/images/thumb/Basic_oil_processing.png/32px-Basic_oil_processing.png) ![Advanced oil processing.png](https://wiki.factorio.com/images/thumb/Advanced_oil_processing.png/32px-Advanced_oil_processing.png) ![Coal liquefaction.png](https://wiki.factorio.com/images/thumb/Coal_liquefaction.png/32px-Coal_liquefaction.png)                                                                                                                                                                             | 1              |
| ![Chemical plant.png](https://wiki.factorio.com/images/thumb/Chemical_plant.png/32px-Chemical_plant.png) Chemical plant                          | 0.210                          | ![Heavy oil cracking.png](https://wiki.factorio.com/images/thumb/Heavy_oil_cracking.png/32px-Heavy_oil_cracking.png) ![Solid fuel from heavy oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_heavy_oil.png/32px-Solid_fuel_from_heavy_oil.png)![Solid fuel from light oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_light_oil.png/32px-Solid_fuel_from_light_oil.png)![Solid fuel from petroleum gas.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_petroleum_gas.png/32px-Solid_fuel_from_petroleum_gas.png) | 1              |
| ![Assembling machine 2.png](https://wiki.factorio.com/images/thumb/Assembling_machine_2.png/32px-Assembling_machine_2.png) Assembling machine 2* | 0.150                          | ![Rocket fuel.png](https://wiki.factorio.com/images/thumb/Rocket_fuel.png/32px-Rocket_fuel.png)![Uranium fuel cell.png](https://wiki.factorio.com/images/thumb/Uranium_fuel_cell.png/32px-Uranium_fuel_cell.png)                                                                                                                                                                                                                                                                                                                                             | 0.75           |
| ![Centrifuge.png](https://wiki.factorio.com/images/thumb/Centrifuge.png/32px-Centrifuge.png) Centrifuge                                          | 0.350                          | ![Nuclear fuel.png](https://wiki.factorio.com/images/thumb/Nuclear_fuel.png/32px-Nuclear_fuel.png)                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1              |

*We could also use assembling machine 3's for these processes, but they would consume more energy despite the speed gain.

The total processing energy ("E") needed for a conversion can be calculated using the machine power usage ("P") multiplied by the total crafting time for all of the input ("t"). This total crafting time is the time taken for one crafting cycle ("t_c") multiplied by the number of crafting cycles ("n") to cover the entire input quantity, divided by the machine crafting speed ("C"). Hence we summarize processing energy consumption as:

 $$ E = P * t = P * t_c * n / C $$ 

Once we have the crafting recipes, fuel energy values, and the processing energy equation, we have all we need to make the conversion diagrams. Now let's look at them:

### Coal vs. liquified coal

The simple way to process coal is to just liquify it and immediately convert the outputs into solid fuel, as below:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/2-coal-liq-direct.png' alt='Processing coal into solid fuel directly.' caption='Processing coal into solid fuel directly.' %}

We find that 10 coal yields 5.75 solid fuel this way. Meanwhile, the coal processing requires energy for heating steam and running machines. We can calculate the total energy gain by subtracting all the input energy and processing energy from the output energy. Then, the percent gain is the energy gain divided by the energy obtained from directly burning the input fuel.

 $$ \text{Energy gain} = 69 - 40 - 1.5 - 2.1 - 1.365 - 0.84 - 0.21 = 22.985 MJ $$ 

 $$ \text{Percent gain} = 22.985 MJ / 40 MJ = 57.4625\% $$ 

So we see that simply liquifying the coal gets us about 57% more energy out of it! Now, can we get out even more if we use cracking?

### Adding cracking to coal liquification

Cracking adds an extra step to the process, but looking at the recipes shows that it can increase solid fuel yield: Cracking heavy oil provides 30/40 or 75% as much light oil. Meanwhile, 10 light oil is enough to make one solid fuel, rather than 20 heavy oil, meaning that it has 200% of the yield. Combining these, by cracking heavy oil we get 75% * 200% = 150% as much solid fuel as before. 

However, the same cannot be said about cracking light oil. It provides 20/30 or about 66.7% as much petroleum gas. Furthermore, the recipe for solid fuel requires 20 petroleum gas rather than 10 light oil, meaning only 50% as much yield. Combining these, by cracking light oil we get 66.7% * 50% = 33.4% as much solid fuel as before, meaning that light oil cracking should be avoided.

Now to look at the process with heavy oil cracking:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/3-coal-liq-cracking.png' alt='Processing coal into solid fuel with heavy oil cracking.' caption='Processing coal into solid fuel with heavy oil cracking.' %}

We see that we now get 7.375 solid fuel from the same 10 coal, instead of 5.75. That seems great, but the cracking also consumes additional energy. So, let's look at the total energy gain:

 $$ \text{Energy gain} = 88.5 - 40 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21 = 41.12 MJ $$ 

 $$ \text{Percent gain} = 41.12 MJ / 40 MJ = 102.8% $$ 

We find that liquifying coal and including cracking leads to an energy gain of 103%, which means getting about **twice the coal's original energy**. Therefore, if you liquify coal before burning it, you only need to mine half as much as you did before! While this suggests that liquifying coal on a large scale is a great idea, other factors like setup costs need to be considered before jumping into it, as discussed later. 

Moving on, let's consider the other way that solid fuel is made:

### Coal vs. oil for making solid fuel

Since solid fuel can also be made out of oil, let's see how energy-rich oil is compared to coal. The simplest approach is basic oil processing, which yields petroleum gas that is converted directly into solid fuel:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/4-basic-oil.png' alt='Processing oil into solid fuel with basic oil processing.' caption='Processing oil into solid fuel with basic oil processing.' %}

We see that 100 oil produces 2.25 solid fuel this way. However, we know from the recipes that advanced oil processing yields more petroleum gas for the same 100 oil. On top of that, it also yields heavy oil and light oil. So it would definitely use the oil more efficiently:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/5-adv-oil-direct.png' alt='Processing oil into solid fuel with advanced oil processing.' caption='Processing oil into solid fuel with advanced oil processing.' %}

We see that advanced oil processing yields 8.5 solid fuel from the same 100 oil. That's nearly four times the yield for basic oil processing! However, we can do better: Once again, cracking the heavy oil would offer us some more energy:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/6-adv-oil-cracking.png' alt='Processing oil into solid fuel with advanced oil processing and heavy oil cracking.' caption='Processing oil into solid fuel with advanced oil processing and heavy oil cracking.' %}

Now we see that we can get a maximum of 9.125 solid fuel per 100 oil. We can now compare it with the maximum of 7.375 solid fuel from 10 coal. If we crunch these numbers, we find that one unit of coal produces about 8.08 times as much solid fuel as one unit of oil. 

Meanwhile, lets look at the total energy outputs for the best cases for each input:

 $$ \text{Coal energy output} = (88.5 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21) MJ / 10 \text{coal} $$ 

 $$ \text{Coal energy output} = 8.112 MJ / \text{coal} $$ 

 $$ \text{Oil energy output} = (109.5 - 2.1 - 0.2625 - 2.6775 - 1.155) MJ / 100 \text{oil} $$ 

 $$ \text{Oil energy output} = 1.03305 MJ / \text{oil} $$ 

We find that one unit of coal holds roughly eight times the energy as one unit of oil. This ratio lets you get an idea of how much one resource can substitute for the other when your aim is to produce solid fuel at a large scale. 

However, energy yield per unit is not the only factor when comparing coal and oil for solid fuel production. I've identified these factors: 

* **Energy yield per unit:** As we just found out, that coal holds about eight times as much energy per unit.

* **Transportation efficiency:** One cargo wagon holds 2000 coal, which contains about 16.2 GJ of energy if converted to solid fuel. The same cargo wagon holds 400 crude oil barrels, or 20 000 oil, which can yield about 20.6 GJ of energy (27% more). If you use a fluid wagon instead, you can hold 25 000 oil per wagon or 25.8 GJ (nearly 60% more), meaning that oil wagons transport more energy than coal wagons, assuming you don't have to worry about transporting water/steam. Oil also has the transportation option of pipelines, which may be preferable to trains in some cases. 

* **Relative abundances**: It simply depends on the map, so not much can be said there.

* **Exclusive uses:** While both coal and crude oil can be used to make oil products, the recipes that use coal exclusively (plastic, explosives, grenades, capsules) greatly outweigh those for crude oil (flamethrower ammo). 

Considering all these factors together, it seems to generally be better to save most of your coal for plastic/explosives production and to use mostly oil for solid fuel production, unless coal/oil abundances encourage otherwise. Thus, we have solid fuel production fully covered, but this is not the end of the fuel discussion, as we can still turn it into rocket fuel.

### Solid fuel vs. rocket fuel

Having seen that converting coal into solid fuel offers a significant energy yield, perhaps the same is true about making rocket fuel? To explore this, instead of starting from the beginning with coal/oil, it is enough to just look at the recipe for rocket fuel:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/7-rocket-fuel.png' alt='Processing solid fuel into rocket fuel.' caption='Processing solid fuel into rocket fuel.' %}

We see that a single unit of rocket fuel contains 100 MJ of energy, while the required ingredients of 10 solid fuel already holds 120 MJ, and the 10 light oil can be made into an 11th solid fuel to provide almost 12 MJ more. Hence, we see that processing solid fuel into rocket fuel makes you lose energy, before even accounting for processing energy. However, as we will cover later on, rocket fuel has advantages over solid fuel that may outweigh the energy losses. Furthermore, it is a necessary ingredient if we want to make nuclear fuel, which may increase the overall energy gains, despite the losses at this stage.

### Going nuclear

Nuclear fuel is still pretty experimental in the real world, but Factorio offers a standardized variant that is made from regular rocket fuel and uranium-235 and presents itself as the ultimate burner fuel. Like with our examination of rocket fuel, the recipe itself is enough to determine energy gains:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/8-nuclear-fuel.png' alt='Processing rocket fuel into nuclear fuel.' caption='Processing rocket fuel into nuclear fuel.' %}

We see that nuclear fuel offers an impressive energy output of 1.21 GJ, which is [a reference](https://wiki.factorio.com/Nuclear_fuel), but also around 10 times as much energy as the solid fuel first used to make the rocket fuel. This means that if you were to switch from burning coal directly to making it into nuclear fuel to burn instead, your coal demand would drop to a tiny fraction, to as little as 1/20th of what it was before. 

### Making the most of your uranium

Despite its massive energy gains and the resulting coal and oil savings, nuclear fuel might not be perfect. The uranium-235 that it uses could instead be used to make uranium fuel cells, which provide a different energy situation: They can only be used inside nuclear reactors. One fuel cell provides one reactor a constant supply of 40 MW of heat for exactly 200 seconds, which adds up to a total energy of  $ 40 MW * 200s = 8000 MJ = 8 GJ $ . If the reactor has any neighbors, the neighbor bonus kicks in, and the bonus from each neighbor leads to an additional 40MW of heat being supplied by the same fuel cell. Since the reactor can have up to four neighbors, the fuel cell can provide up to five times its original yield, which is  $ 8 GJ * 5 = 40 GJ $ . We are already dealing with GJ instead of MJ when discussing a single fuel cell, and on top of that its recipe yields 10 of them per piece of uranium-235:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/9-uranium-fuel-cell.png' alt='Processing uranium-235 into uranium fuel cells.' caption='Processing uranium-235 into uranium fuel cells.' %}

Hence, we see that we can get up to hundreds of times more energy from the same piece of uranium-235 if it is turned into uranium fuel cells, instead of being turned into nuclear fuel. This would suggest that if one already has a uranium-235 supply, they should just switch to nuclear power and electric machines, instead of using burner devices. However, it is also worth noting that nuclear fuel is unlocked alongside Kovarex Enrichment, which allows for the easy production of uranium-235. This means that using uranium efficiently stops being an issue around the time you unlock nuclear fuel.

### Module effects on energy gains

So far we have done our calculations without using any modules for the sake of keeping things simple and understanding the default conditions. Now let's look at them again with modules and see if our results change significantly. If you would like some quick refreshers on modules, our Complexity Corner articles offer introductions for [productivity modules]([Alt-F4 #12 - Reverse Engineering the Spider](https://alt-f4.blog/ALTF4-12/#complexity-corner-productivity-modules-thekool)), [speed modules]([Alt-F4 #16 - Modulating Pure Speed](https://alt-f4.blog/ALTF4-16/)), [efficiency modules]([Alt-F4 #25 - Efficiency, Efficiency, Efficiency!](https://alt-f4.blog/ALTF4-25/)), and [beacons]([Alt-F4 #29 - Beacons and Not Belts](https://alt-f4.blog/ALTF4-29/)).

When looking at modules from the perspective of fuel conversions, they primarily affect the power usage of the fuel processing machines. Let's first review the equation:

 $$ \text{Total processing energy} (E) = \text{Machine power usage} (P) * \text{Time of one crafting cycle} (t_c) * \text{Number of crafting cycles} (n) / \text{Crafting speed} (C) $$ 

 $$ E = P * t_c * n / C $$ 

Here is what the modules do:

- **Efficiency modules:** They reduce the power usage of the fuel processing machines ("P"). Their overall effects on energy gains are small but noteworthy for most recipes. I would definitely recommend using efficiency 1 modules in all of the fuel processing machines if you don't use any other modules, because they are quite cheap to make and they cut down power usage by 60% or even 80% (the efficiency limit), depending on how many module slots the machines have.

- **Speed modules:** One effect of speed modules is increasing power usage ("P") just like efficiency modules, but in the opposite direction, hence reducing our energy gains. The other effect of speed modules is increasing the crafting speed of machines ("C"), which as seen from the equation reduces the power usage, because the added speed makes the machines work for a shorter time for each crafting cycle. For every speed module, the increase in P is greater than the increase in C, which means that the overall effect of any speed module is an increase in E, which diminishes the overall energy gain. However, speed modules can be used alongside productivity modules to mitigate the slowdown they cause, and this might provide energy gains overall.

- **Productivity modules:** They have the most interesting effects. They increase power usage ("P") and decrease crafting speed ("C"), both of which lead to an increase in E, which decreases the overall energy gains. On the other hand, productivity modules increase the amount of processed fuel that is produced. Furthermore, this increase is compounded on every step of processing, which leads to exponential increases in the fuel output overall! The energy gains from the extra fuel might outweigh all the extra power consumption.

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/10-modules-overview.png' alt='Module effects on power consumption' caption='Module effects on power consumption' %}

Now let's demonstrate the use of modules. First, let's look at the case of efficiency modules in coal liquification with heavy oil cracking. Refineries and chemical plants have three module slots, so we can place three efficiency 1 modules to reduce power consumptions by 80% for each machine:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/11-coal-liq-eff.png' alt='Processing coal into solid fuel with heavy oil cracking, at minimum power consumption.' caption='Processing coal into solid fuel with heavy oil cracking, at minimum power consumption.' %}

Now we recalculate the energy gain with the decreased power consumption:

 $$ \text{Energy gain} = 88.5 - 40 - 1.5 - 0.42 - 0.1365 - 0.5775 - 0.042 = 45.824 MJ $$ 

 $$ \text{Percent gain} = 45.824 MJ / 40 MJ = 114.56\% ≈ 115\% $$  

The energy gain was 103% with no modules. We see that efficiency modules increase the energy gain from 103% to 115%. This increase is nice, but it is not that significant, since the processing energy cost was already relatively low. Nevertheless, efficiency 1 modules being cheap to produce makes this option worthwhile. 

Now, let us look at the same example with three productivity 3 modules in every machine, instead of three efficiency 1 modules. Despite increasing the power consumption, each module also increases the amount of fuel produced by 10%:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/12-coal-liq-prod-1.png' alt='Processing coal into solid fuel with heavy oil cracking, at maximum productivity.' caption='Processing coal into solid fuel with heavy oil cracking, at maximum productivity.' %}

We see that with the cumulative effects of 30% extra product output across every step in the process, the amount of solid fuel is doubled! This adds up to an extra energy gain of nearly 100 MJ! However, we also see that total power consumption has greatly increased to about 50.6 MJ. Let's see how all these changes reflect to the energy gain:

 $$ \text{Energy gain} = 185.562 - 40 - 1.5 - 12.982 - 5.9716 - 30.040 - 1.688 = 93.3804 MJ $$ 

 $$ \text{Percent gain} = 93.3804 MJ / 40 MJ = 233.451\% ≈ 233\% $$ 

We find that productivity modules increase energy gains from 103% to 233%, meaning that in this setup the produced solid fuel has **over three times as much energy** as the coal that was used for it! 

On the other hand, our machines are working at about half the speed as before, which makes power get consumed for twice as long. Perhaps we can use speed modules to counteract this. Let's try switching to two productivity 3 modules and one speed 3 module for each machine:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/13-coal-liq-prod-2.png' alt='Processing coal into solid fuel with heavy oil cracking, at high productivity & speed.' caption='Processing coal into solid fuel with heavy oil cracking, at high productivity & speed.' %}

Compared to the last setup, we now get less than double the solid fuel, but the power consumption has approximately halved. Let's see how it reflects to the energy gain: 

 $$ \text{Energy gain} = 146.448 - 40 - 1.5 - 5.775 - 2.3966 - 11.400 - 0.693 = 84.6834 MJ $$ 

 $$ \text{Percent gain} = 84.6834 MJ / 40 MJ = 211.7085\% ≈ 212\% $$ 

Compared to no modules offering 103% gain, this setup offers an excellent gain of 212%, but the full-productivity setup with 233% gain is better. This is because the cumulative fuel gains from the third productivity 3 module outweigh the reduced power consumption from the speed 3 module. 

Instead of replacing the third productivity module with a speed module, we can introduce speed beacons. This would allow us to both keep the maximum productivity and cut down machine power consumptions, although the beacons themselves would introduce additional power consumption that would have to be accounted for. I predict that another energy gain is possible by having each beacon affect multiple machines. However, since calculations involving beacons would introduce additional factors that would have to be considered, such as machine counts and the physical layout of the fuel processing area, I'll leave that rabbit hole as an exercise for the reader.

Meanwhile, seeing the strong effects of productivity modules, I wonder if we can use them to make rocket fuel production yield a net energy gain as well. So, let's fill the assembling machine 2 with productivity 3 modules:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/14-rocket-fuel-prod-1.png' alt='Processing solid fuel into rocket fuel in an assembling machine 2 at maximum productivity.' caption='Processing solid fuel into rocket fuel in an assembling machine 2 at maximum productivity.' %}

Well, the input energy cost and output energy generation are equal now, but the processing energy cost has become too high, having nearly quadrupled, making the overall process still cost more energy than it gains. 

However, we have other options for making rocket fuel: We can use assembling machine 3s instead and take advantage of their four module slots. Here is how some different combinations perform:

{% include image.html src= 'https://media.alt-f4.blog/ALTF4/60/15-rocket-fuel-prod-2.png' alt='Processing solid fuel into rocket fuel in an assembling machine 3 with various module combinations.' caption='Processing solid fuel into rocket fuel in an assembling machine 3 with various module combinations.' %}

So, I tried four productivity 3 modules in an assembling machine 3, but this slowed down the machine so much that the processing energy was almost more than the total fuel energy it put out! Next, I tried to dampen some of the inflated power consumption and speed loss by replacing the fourth productivity 3 module with an efficiency 3 module. This was helpful, but insufficient. Afterwards, I changed strategy and used a speed 3 module instead of the efficiency 3 module, to restore the speed of the machine and to cut down the processing time. While this saved more energy than the efficiency module, it still did not make enough of a difference. I tried more module combinations after that and even tried adding various beacon combinations too (no diagrams for those), but no matter what, I only managed to get close to a breakeven. 

Based on these examples, it seems that while modules can offer a significant increase in the energy gain for some fuel processing steps, it isn't the case for every step.

### So how useful is fuel processing in general?

Our findings so far about energy gains only partially help us answer this question. I have identified a more comprehensive list of factors that you should consider when deciding whether to (further) process your burner fuels:

* **Gains in energy:** If you get more energy out of the processed fuel, then your demand for the unprocessed fuel decreases and so your resource patches run out more slowly. We determined the energy gains for different fuels earlier.
- **Gains in vehicle acceleration bonus and top speed bonus:** Greater bonuses mean that your vehicles can go faster. More processed fuels offer greater bonuses as seen in [the wiki page for fuels](https://wiki.factorio.com/Fuel).
- **Gains in energy density (per unit and per stack):**  More energy per stack means the same inventory slot can hold more energy, which makes a significant difference for how much energy you can fit into each cargo wagon or chest. Meanwhile, more energy per unit means more energy can be carried by robots, belts, and inserters, which can only hold a few units at a time. If your energy consumption is fixed, using a more energy-dense fuel means needing less logistics infrastructure to move fuels, which means simpler designs and less energy consumed by the logistic system itself. More processed fuels have greater energy density in both regards, hence having these benefits.
- **Cost of processing setup:** This is in terms of materials and space needed to make enough buildings and logistics for the processing, as well as the unlock costs of the required technologies. Each tier of processing adds to these costs.
- **Availability of more coal/oil to just use instead:** On most maps, coal and oil are practically infinite, but you may not have any new patches nearby. Depending on your preferences, it may be easier to head out and set up more resource extraction infrastructure, rather than building more fuel processing infrastructure.
- **How long you will keep using the burner devices:** If you are going to switch to electrical machines and alternate power sources soon, it may not be worth the effort of setting up a large fuel processing system.

Since the above factors depend on your map and your plans, the conclusion varies on whether fuel processing is useful. Based on my experiences, I can offer the following advice about processing fuels:

- **Processed fuels are excellent for trains and tanks.** The acceleration gains from rocket fuel is quite satisfying (+80%), and nuclear fuel is on another level... (+150%)
- **You already need to mass-produce solid fuel and rocket fuel to make rocket parts,** so it is not too difficult to produce a little more for your vehicle or other burner device needs.
- **If you are burning coal for power, processing it into solid fuel can cut the coal demand by half,** or more if you use modules. And, of course, you can go all out and run your boilers with nuclear fuel to reduce the coal demand by a factor of 20. 
- **However, you can unlock solar and (regular) nuclear power much sooner than coal liquification and nuclear fuel,** because these two fuel processing technologies require production science to unlock. Meanwhile, [the advantages of solar and nuclear power](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/) may make it worthwhile to switch to them, instead of waiting to upgrade your coal power setup. Nuclear power is [easier to do than it may seem]([Alt-F4 #57 - Nuclear Energy and You](https://alt-f4.blog/ALTF4-57/#)), as it provides massive energy yields for very few reactors and centrifuges, without needing Kovarex Enrichment!

### Summary

This article started with a little burning question that brought more such questions and evolved into an exploration of all of Factorio's fuels. We uncovered the following:

**(1) Coal vs. coal liquification:** Liquifying coal and directly converting it into solid fuel yields 57% extra energy per coal, when no modules are used.

**(2) Coal liquification with cracking:** If we also crack the heavy oil before making the solid fuel, it yields 103% extra energy per coal, when no modules are used. Hence, we get about twice the energy from the same coal.

**(3) Coal vs. oil for solid fuel production:** Coal produces about eight times as much solid fuel or energy as crude oil per unit, when no modules are used. However, you can transport about 60% more energy in a fluid wagon of oil than a cargo wagon of coal. Meanwhile, coal has many exclusive uses it may be needed for, instead of making oil products, while crude oil has only one such exclusive use. Therefore, using oil for your solid fuel production may be more practical, but it ultimately depends on the abundances of coal and oil in your area.

**(4) Solid fuel vs. rocket fuel:** Converting solid fuel into rocket fuel causes energy losses, even when you use modules. However, rocket fuel offers other advantages, such as its higher bonuses in vehicles.

**(5) Rocket fuel vs. nuclear fuel:** Converting rocket fuel into nuclear fuel without using any modules yields around 10x as much energy as the initial solid fuel that went in. This makes it the best way to get the most energy out of your initial coal or oil. However, it is not the most efficient way to generate power from uranium.

**(6) Nuclear fuel vs. Uranium fuel cells:** Using uranium-235 for nuclear reactor fuel cells yields up to hundreds of times more energy from it compared to using it for nuclear fuel, but you unlock nuclear fuel alongside Kovarex enrichment, meaning that uranium-235 stops being rare when nuclear fuel is available.

**(7) Adding modules for energy gains:** Efficiency modules offer energy gains by reducing the processing energy usage, and efficiency 1 modules make a good difference while being cheap to produce. Productivity modules can offer energy gains by creating more processed fuel, and the effect compounds such that it leads to exponential increases overall in the fuel output. Speed modules can offer energy gains when used alongside productivity modules by compensating for the speed losses that increase the power consumption. 

**(8) Usefulness of processing fuels:** It depends on a number of factors, but ultimately you have to make rocket fuel anyway in order to make rocket parts, and even before then processed fuels are useful for vehicles.

These questions have been pretty fun for me to explore and I hope they were interesting for you to read! Do you have any additions or similar questions about fuels or other game mechanics? Feel free to get in touch on Reddit or Discord via the links at the bottom of the article!
