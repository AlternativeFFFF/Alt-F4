# Burning Questions

*by Sir Fendi*

*version 1.2*

(Calculations will be double-checked)

Media:

* Images are the slides in a separate PowerPoint file. They are in order.

* There is a preview image of the table as a PNG.

All feedback is welcome! I am wondering:

- Maybe more images can be added?

- Are there any other posts/explorations you have seen in the past that would be cool to mention here?

. . . . . . . .

Factorio has a variety of fuels that can go into your burner devices, ranging from classic and modest wood, up to experimental and extreme nuclear rocket fuel. The most popular burner fuel is coal, which is the backbone of early-game automation; it runs all the boilers, furnaces, vehicles, and other machines reliably until it inevitably runs low. 

{% include image.html

src= 'src'
 alt='Factorio's burner fuels'
 caption='Factorio's burner fuels.'

%}

In the mid-game, solid fuel is introduced as the first processed fuel, made initially from crude oil. Conveniently, solid fuel is used to later make rocket fuel, which is in turn used to make nuclear fuel. These processed fuels offer noticeable advantages over coal, like having greater energy density both per unit and per stack, and an acceleration bonus when used in vehicles. More curiously, however, the late-game also brings the technology to liquify good old coal and convert it into solid fuel. This raised for me the question: Does processing coal into solid fuel get more energy out of it? In other words, if you liquify 10 units of coal, make solid fuel out of the oils and gas that it yields, and then burn the solid fuel, does it provide more energy than directly burning the coal, even with all that processing? And what if you further processed it into rocket fuel? Similar burning questions followed and snowballed into this general exploration of the energy contents of different burner fuels as well as the energy costs of converting between them.

As I set off to answer these questions, a great info source was [the wiki page for fuels](https://wiki.factorio.com/Fuel) and I approached the conversions in terms of energy produced and consumed per unit of input, rather than the production rates per building. At first I tried solving many equations with a growing list of variables, but it was much easier to convert everything into diagrams, which now summarize everything nicely. Hence, in this piece, I present some questions about different burner fuels and answer them mainly using conversion diagrams. The results provide some interesting tidbits about managing your resources and they help to complete the big picture for burner fuels.

## The Questions

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

**(7) What are the effects of modules on energy gains?**

Finally, we take a step back and look at the big picture, noting other factors like costs and alternate technologies, and we ask: 

**(8) How useful is fuel processing in general?**

With all the conversion options in the vanilla game, this list of questions actually covers all of the burner fuels except for wood, which is not converted into anything unless you use a [charcoal mod]([Charcoal Burner - Factorio Mods](https://mods.factorio.com/mod/CharcoalBurner)). Hence, here is a quick note about wood as a fuel: You may end up with a lot of it as a byproduct of clearing space using an axe or robots. However, it runs out quickly because of how little energy it provides. Instead of cutting trees for extra fuel, you would probably benefit more from using the wood to make power poles or chests, or from keeping the trees around for pollution absorption. As for other fuels, since we use conversion diagrams to answer the questions, first let's look at how they were made.

## Making Conversion Diagrams

In the diagrams, the recipes for various fuel-related crafting processes are applied. The input and output ratios are preserved, but we run each process fractionally to match the input quantities, rather than aiming for full crafting cycles. Most of the used recipes can be checked quickly from [the wiki page for oil processing](https://wiki.factorio.com/Oil_processing). The energy values of the fuels are in-game constants, referenced in [the wiki page for fuels](https://wiki.factorio.com/Fuel). The energy consumed to heat steam to 165°C is referenced in [the wiki page for steam](https://wiki.factorio.com/Steam). 

As for the electricity consumption during the fuel processing, it depends on the used machines and the number of crafting cycles they need. Calculations are simplified a lot thanks to the machines using the same amount of power per second for each of their processes. These power uses are summarized in the table:

<!-- See table.PNG for a clean preview -->

| Power consuming machine                                                                                                                          | Power Use without Modules (MW) | Included Processes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Crafting Speed |
| ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| ![Oil refinery.png](https://wiki.factorio.com/images/thumb/Oil_refinery.png/32px-Oil_refinery.png) Oil refinery                                  | 0.420                          | ![Basic oil processing.png](https://wiki.factorio.com/images/thumb/Basic_oil_processing.png/32px-Basic_oil_processing.png) ![Advanced oil processing.png](https://wiki.factorio.com/images/thumb/Advanced_oil_processing.png/32px-Advanced_oil_processing.png) ![Coal liquefaction.png](https://wiki.factorio.com/images/thumb/Coal_liquefaction.png/32px-Coal_liquefaction.png)                                                                                                                                                                             | 1              |
| ![Chemical plant.png](https://wiki.factorio.com/images/thumb/Chemical_plant.png/32px-Chemical_plant.png) Chemical plant                          | 0.210                          | ![Heavy oil cracking.png](https://wiki.factorio.com/images/thumb/Heavy_oil_cracking.png/32px-Heavy_oil_cracking.png) ![Solid fuel from heavy oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_heavy_oil.png/32px-Solid_fuel_from_heavy_oil.png)![Solid fuel from light oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_light_oil.png/32px-Solid_fuel_from_light_oil.png)![Solid fuel from petroleum gas.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_petroleum_gas.png/32px-Solid_fuel_from_petroleum_gas.png) | 1              |
| ![Assembling machine 2.png](https://wiki.factorio.com/images/thumb/Assembling_machine_2.png/32px-Assembling_machine_2.png) Assembling machine 2* | 0.150                          | ![Rocket fuel.png](https://wiki.factorio.com/images/thumb/Rocket_fuel.png/32px-Rocket_fuel.png)![Uranium fuel cell.png](https://wiki.factorio.com/images/thumb/Uranium_fuel_cell.png/32px-Uranium_fuel_cell.png)                                                                                                                                                                                                                                                                                                                                             | 0.75           |
| ![Centrifuge.png](https://wiki.factorio.com/images/thumb/Centrifuge.png/32px-Centrifuge.png) Centrifuge                                          | 0.350                          | ![Nuclear fuel.png](https://wiki.factorio.com/images/thumb/Nuclear_fuel.png/32px-Nuclear_fuel.png)                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1              |

*We could also use assembling machine 3's for these processes, but they would consume more energy despite the speed gain.

The total processing energy ("E") needed for a conversion can be calculated using the machine power usage ("P") multiplied by the total crafting time for all of the input ("t"). This total crafting time is the time taken for one crafting cycle ("t_c") multiplied by the number of crafting cycles ("n") to cover the entire input quantity, divided by the machine crafting speed ("C"). Hence we summarize processing energy consumption as:

`E = P * t = P * t_c * n / C`

Once we have the crafting recipes, fuel energy values, and the processing energy equation, we have all we need to make the conversion diagrams. Now let's look at them:

## Coal vs. liquified coal

The simple way to process coal is to just liquify it and immediately convert the outputs into solid fuel, as below:

{% include image.html 

src= 'src'
 alt='Processing coal into solid fuel directly'
 caption='Processing coal into solid fuel directly' 

%}

We find that 10 coal yields 5.75 solid fuel this way. Meanwhile, the coal processing requires energy for heating steam and running machines. We can calculate the total energy gain by subtracting all the input energy and processing energy from the output energy. Then, the percent gain is the energy gain divided by the energy obtained from directly burning the input fuel.

`Energy gain = 69 - 40 - 1.5 - 2.1 - 1.365 - 0.84 - 0.21 = 22.985MJ`

`Percent gain = 22.985 MJ / 40 MJ = 57.4625%`

So we see that simply liquifying the coal gets us about 57% more energy out of it. Now, can we get out even more if we use cracking?

## Adding cracking to coal liquification

Cracking adds an extra step to the process, but looking at the recipes shows that it can increase solid fuel yield: Cracking heavy oil provides 30/40 or 75% as much light oil. Meanwhile, 10 light oil is enough to make one solid fuel, rather than 20 heavy oil, meaning that it has 200% of the yield. Combining these, by cracking heavy oil we get 75% * 200% = 150% as much solid fuel as before. 

However, the same cannot be said about cracking light oil. It provides 20/30 or about 66.7% as much petroleum gas, but also 20 petroleum gas is required for making solid fuel instead of 10 light oil, meaning 50% as much yield. Combining these, by cracking light oil we get 66.7% * 50% = 33.4% as much solid fuel as before, meaning that light oil cracking should be avoided.

Now to look at the process with heavy oil cracking:

{% include image.html

src= 'src'
 alt='Processing coal into solid fuel with heavy oil cracking'
 caption='Processing coal into solid fuel with heavy oil cracking'

%}

We see that we now get 7.375 solid fuel from the same 10 coal, instead of 5.75. That seems great, but the cracking also consumes additional energy. So, let's look at total energy gain:

`Energy gain = 88.5 - 40 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21 = 41.12MJ`

`Percent gain = 41.12 MJ / 40 MJ = 102.8%`

We find that liquifying coal and including cracking leads getting about **twice its original energy**. In other words, if you liquify coal before burning it, you only need half as much as you did before! While this suggests that liquifying coal on a large scale is a great idea, other factors like setup costs need to be considered before jumping into it, as discussed later. 

Moving on, let's consider the other way that solid fuel is made:

## Coal vs. oil for making solid fuel

Since solid fuel can also be made out of oil, let's see how energy-rich oil is compared to coal. The simplest approach is basic oil processing, which yields petroleum gas that is converted directly into solid fuel:

{% include image.html

src= 'src'
 alt='Processing oil into solid fuel with basic oil processing'
 caption='Processing oil into solid fuel with basic oil processing'

%}

We see that 100 oil produces 2.25 solid fuel this way. However, we know from the recipes that advanced oil processing yields more petroleum gas for the same 100 oil. On top of that, it also yields heavy oil and light oil. So it would definitely use the oil more efficiently:

{% include image.html

src= 'src'
 alt='Processing oil into solid fuel with advanced oil processing'
 caption='Processing oil into solid fuel with advanced oil processing'

%}

We see that advanced oil processing yields 8.5 solid fuel from the same 100 oil. That's nearly four times the yield for basic oil processing! However, we can do better: Once again, cracking the heavy oil would offer us some more energy:

{% include image.html

src= 'src'
 alt='Processing oil into solid fuel with advanced oil processing and heavy oil cracking'
 caption='Processing oil into solid fuel with advanced oil processing and heavy oil cracking'

%}

Now we see that we can get a maximum of 9.125 solid fuel per 100 oil. We can now compare it with the maximum of 7.375 solid fuel from 10 coal. If we crunch these numbers, we find that one unit of coal produces about 8.08 times as much solid fuel as one unit of oil. 

Meanwhile, lets look at the total energy outputs for the best cases for each input:

`coal energy output = (88.5 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21)MJ / 10 coal`

`coal energy output = 8.112MJ / coal`

`oil energy output = (109.5 - 2.1 - 0.2625 - 2.6775 - 1.155)MJ / 100 oil`

`oil energy output = 1.03305MJ / oil`

We find that one unit of coal holds roughly eight times the energy as one unit of oil. This ratio lets you get an idea of how much one resource can substitute for the other when your aim is to produce solid fuel at a large scale. 

However, energy yield per unit is not the only factor when comparing coal and oil for solid fuel production. I've identified these factors: 

* **Energy yield per unit:** As we just found out, that coal holds about eight times as much energy per unit.

* **Transportation efficiency:** One cargo wagon holds 2000 coal, which contains about 16.2GJ of energy if converted to solid fuel. The same cargo wagon holds 400 crude oil barrels, or 20 000 oil, which can yield about 20.6GJ of energy (27% more). If you use a fluid wagon instead, you can hold 25 000 oil per wagon or 25.8GJ (nearly 60% more), meaning that oil wagons transport more energy than coal wagons, assuming you don't have to worry about transporting water/steam. Oil also has the transportation option of pipelines, which may be preferable to trains in some cases. 

* **Relative abundances**: It simply depends on the map, so not much can be said there.

* **Exclusive uses:** While both coal and crude oil can be used to make oil products, the recipes that use coal exclusively (plastic, explosives, capsules) greatly outweigh those for crude oil (flamethrower ammo). 

Considering all these factors together, it seems to generally be better to save most of your coal for plastic/explosives production and to use mostly oil for solid fuel production, unless coal/oil abundances encourage otherwise. Thus, we have solid fuel production fully covered, but this is not the end of the fuel discussion, as we can still turn it into rocket fuel.

## Solid fuel vs. rocket fuel

Having seen that converting coal into solid fuel offers a significant energy yield, perhaps the same is true about making rocket fuel? To explore this, instead of starting from the beginning with coal/oil, it is enough to just look at the recipe for rocket fuel:

{% include image.html

src= 'src'
 alt='Processing solid fuel into rocket fuel'
 caption='Processing solid fuel into rocket fuel'

%}

We see that a single unit of rocket fuel contains 100 MJ of energy, while the required ingredients of 10 solid fuel already holds 120 MJ, and the 10 light oil can be made into an 11th solid fuel to provide almost 12 MJ more. Hence, we see that processing solid fuel into rocket fuel makes you lose energy, before even accounting for processing energy. However, as we will cover later on, rocket fuel has advantages over solid fuel that may outweigh the energy losses. Furthermore, it is a necessary ingredient if we want to make nuclear fuel, which may increase the overall energy gains, despite the losses at this stage.

## Going nuclear

Nuclear fuel is still pretty experimental in the real world, but Factorio offers a standardized variant that is made from regular rocket fuel and uranium-235 and presents itself as the ultimate burner fuel. Like with our examination of rocket fuel, the recipe itself is enough to determine energy gains:

{% include image.html

src= 'src'
 alt='Processing rocket fuel into nuclear fuel'
 caption='Processing rocket fuel into nuclear fuel'

%}

We see that nuclear fuel offers an impressive energy output of 1.21GJ, which is [a reference](https://wiki.factorio.com/Nuclear_fuel), but also around 10 times as much energy as the solid fuel first used to make the rocket fuel. This means that if you were to switch from burning coal directly to making it into nuclear fuel to burn instead, your coal demand would drop to a tiny fraction, to as little as 1/20th of what it was before. 

## Making the most of your uranium

Despite its massive energy gains and the resulting coal and oil savings, nuclear fuel might not be perfect. The uranium-235 that it uses could instead be used to make uranium fuel cells, which provide a different energy situation: They can only be used inside nuclear reactors. One fuel cell provides one reactor a constant supply of 40 MW of heat for exactly 200 seconds, which adds up to a total energy of `40 MW * 200s = 8000 MJ = 8 GJ`. If the reactor has any neighbors, the neighbor bonus kicks in, and the bonus from each neighbor leads to an additional 40MW of heat being supplied by the same fuel cell. Since the reactor can have up to four neighbors, the fuel cell can provide up to five times its original yield, which is `8 GJ * 5 = 40 GJ`. We are already dealing with GJ instead of MJ when discussing a single fuel cell, and on top of that its recipe yields 10 of them per piece of uranium-235:

{% include image.html

src= 'src'
 alt='Processing uranium-235 into uranium fuel cells'
 caption='Processing uranium-235 into uranium fuel cells'

%}

Hence, we see that we can get up to hundreds of times more energy from the same piece of uranium-235 if it is turned into uranium fuel cells, instead of being turned into nuclear fuel. This would suggest that if one already has a uranium-235 supply, they should just switch to nuclear power and electric machines, instead of using burner devices. However, it is also worth noting that nuclear fuel is unlocked alongside Kovarex Enrichment, which allows for the easy production of uranium-235. This means that using uranium efficiently stops being an issue around the time you unlock nuclear fuel.

## Module effects on energy gains

So far we have done our calculations without using any modules for the sake of keeping things simple and understanding the default conditions. Now let's look at them again with modules and see if our results change significantly. Modules primarily affect the power usage of the fuel processing machines. Let's first review the equation:

`Total processing energy (E) = Machine power usage (P) * time of one crafting cycle (t_c) * numnber of crafting cycles (n) / crafting speed (C)`

`E = P * t_c * n / C`

Here is what the modules do:

- **Efficiency modules:** They reduce the power usage of the fuel processing machines ("P"). Their overall effects on energy gains are small but noteworthy for most recipes. I would definitely recommend using efficiency 1 modules in all of the fuel processing machines if you don't use any other modules, because they are quite cheap to make and they cut down power usage by 60% or even 80% (the efficiency limit), depending on how many module slots the machines have.

- **Speed modules:** One effect of speed modules is increasing power usage ("P") just like efficiency modules, but in the opposite direction, hence reducing our energy gains. The other effect of speed modules is increasing the crafting speed of machines ("C"), which as seen from the equation, reduces the power usage. For every speed module, the increase in P is greater than the increase in C, which means that the overall effect of any speed module is an increase in E, which results in decreased energy gains overall. However, speed modules can be used to mitigate the slowdown from productivity modules, which might provide energy gains overall.

- **Productivity modules:** They have the most interesting effects. They increase power usage ("P") and decrease crafting speed ("C"), both of which lead to an increase in E, which decreases the overall energy gains. On the other hand, productivity modules increase the amount of processed fuel that is produced. Furthermore, this increase is compounded on every step of processing, which leads to exponential increases in the fuel output overall! The energy gains from the extra fuel might outweigh all the extra power consumption.



{% include image.html

src= 'src'
 alt='Module effects on power consumption'
 caption='Module effects on power consumption'

%}

Now let's demonstrate the use of modules. First, let's look at the case of efficiency modules in coal liquification with heavy oil cracking. Refineries and chemical plants have three module slots, so we can place three efficiency 1 modules to reduce power consumptions by 80% for each machine:

{% include image.html

src= 'src'
 alt='Processing coal into solid fuel with heavy oil cracking, at minimum power consumption'
 caption='Processing coal into solid fuel with heavy oil cracking, at minimum power consumption'

%}

The total power consumption drops from about 3.28MJ to about 0.66MJ, which translates to an energy gain of 116%, compared to the default case of 103%. This increase is nice, but it is not that significant, since the processing energy cost was already relatively low. Now, let us look at the same example with three productivity 3 modules instead to see the effects of maximum productivity:

{% include image.html

src= 'src'
 alt='Processing coal into solid fuel with heavy oil cracking, at maximum productivity'
 caption='Processing coal into solid fuel with heavy oil cracking, at maximum productivity'

%}

We see that with the cumulative effects of 30% extra product output across the process results in more than double the amount of solid fuel as before! This adds up to an extra energy gain of nearly 100 MJ! However, we also see that total power consumption has greatly increased to about 50.6 MJ. Nevertheless, our overall energy gains have become `185.6 - 50.6 - 40 - 1.5 = 93.5 MJ`, which is about 134% of energy gains, instead of the default case of 103%. Meanwhile, our machines are working at half the speed as before, which makes power get consumed for twice as long.

Now, let's try out the compensating effects of speed modules by switching to two productivity 3 modules and one speed 3 module for each machine:

{% include image.html

src= 'src'
 alt='Processing coal into solid fuel with heavy oil cracking, at high productivity + speed'
 caption='Processing coal into solid fuel with heavy oil cracking, , at high productivity + speed'

%}

We now find numbers somewhere in the middle of the previous two cases. We get about 12.2 solid fuel now, which is a good gain, giving us about 146.4MJ. We see that the total power consumption is about 20.3MJ. Now, our overall energy gains have become `146.4 - 20.3 - 40 - 1.5 = 84.6MJ`, which is about 112% of energy gains, instead of the default case of 103%. We discover that full productivity performs better in this case, despite the machines slowing down so much.

Seeing the strong effects of productivity modules, I wonder if we can make rocket fuel production yield net energy gains too, so let's fill the assembling machine 2 with productivity 3 modules:

{% include image.html

src= 'src'
 alt='Processing solid fuel into rocket fuel in an assembling machine 2 at maximum productivity'
 caption='Processing solid fuel into rocket fuel in an assembling machine 2 at maximum productivity'

%}

Well, the input energy cost and output energy generation are equal now, but the processing energy cost has grown big enough to wipe all the fuel energy gains. Looking at the cause of this high power cost, we see that it is because this recipe takes 30 seconds to craft, while before we were working with two or five seconds. This difference means that a higher power consumption will have a much greater impact overall.

However, we have other options for making rocket fuel: We can use assembling machine 3s instead and take advantage of their four module slots. Here is how some different combinations perform:

{% include image.html

src= 'src'
 alt='Processing solid fuel into rocket fuel at high productivity AM3'
 caption='Processing solid fuel into rocket fuel at high productivity AM3'

%}

Alright, so I tried four productivity 3 modules in an assembling machine 3 but this slowed down the machine so much that the processing energy was almost more than the fuel energy it put out! So next I tried to remove a productivity module and dampen some of the inflated power consumption with an efficiency 3 module. This was helpful but insufficient. Afterwards I changed strategy and used a speed module to restore the speed of the machine and cut down the processing time. While this performed better than the efficiency module, it still did not make enough of a difference. I tried more combinations after that and even tried adding various beacon combinations too (no diagrams for those) but no matter what I only managed to get close to a breakeven. 

Based on these examples, it seems that while modules do offer some significant boosts to energy gains, they do not necessarily make every single fuel processing step better (it depends on the recipe crafting time vs. the energy gains).

## So how useful is fuel processing in general?

Our findings so far about energy gains only partially help us answer this question. I have identified a more comprehensive list of factors that you should consider when deciding whether to (further) process your burner fuels:

* **Gains in energy:** If you get more energy out of the processed fuel, then your demand for the unprocessed fuel decreases and so your resource patches run out more slowly. We determined the energy gains for different fuels earlier.
- **Gains in vehicle acceleration bonus and top speed bonus:** Greater bonuses mean that your vehicles can go faster. More processed fuels offer greater bonuses. 
- **Gains in energy density (per unit and per stack):**  More energy per stack means the same inventory slot can hold more energy, which makes a significant difference for how much energy you can fit into each cargo wagon or chest. Meanwhile, more energy per unit means more energy can be carried by robots, belts, and inserters, which can only hold a few units at a time. If your energy consumption is fixed, using a more energy-dense fuel means needing less logistics infrastructure to move fuels, which means simpler designs and less energy consumed by the logistic system itself. More processed fuels have greater energy density in both regards, hence having these benefits.
- **Cost of processing setup:** This is in terms of materials and space needed to make enough buildings and logistics for the processing, as well as the unlock costs of the required technologies. Each tier of processing adds to these costs.
- **Availability of more coal/oil to just use instead:** Since these resources are practically infinite on most maps, you may prefer to skip the energy gains and brute-force your way out of fuel shortages by setting up more resource extraction infrastructure, instead of building more fuel processing infrastructure. This factor simply depends on your surroundings.
- **How long you will keep using the burner devices:** If you are going to switch to electrical machines and alternate power sources soon, it may not be worth the effort of setting up a large fuel processing system.

Since the above factors depend on your map and your plans, the conclusion varies on whether fuel processing is useful. Based on my experiences, I can offer the following advice about processing fuels:

- **Processed fuels are excellent for trains and tanks.** The acceleration gains from rocket fuel is quite satisfying (+80%), and nuclear fuel is on another level... (+150%)
- **You already need to mass-produce solid fuel and rocket fuel to make rocket parts,** so it is not too difficult to produce a little more for your vehicle or other burner device needs.
- **If you are burning coal for power, processing it into solid fuel will cut the coal demand by half.** And of course, you can go all out and run your boilers with nuclear fuel to reduce the coal demand by a factor of 20. However, unlocking coal liquification or nuclear fuel requires production science, which means you can unlock solar and (regular) nuclear power much sooner, and [their advantages](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/) may make it worthwhile to switch to them before upgrading your coal setup. Nuclear power is [easier to do than it may seem]([Alt-F4 #57 - Nuclear Energy and You](https://alt-f4.blog/ALTF4-57/#)), as it provides massive energy yields for very few reactors and centrifuges, without needing Kovarex Enrichment!

## Summary

This article started with a little burning question that brought more burning questions and evolved into an exploration of all of Factorio's fuels. We uncovered the following:

**(1) Coal vs. coal liquification:** Liquifying coal and directly converting it into solid fuel yields 57% extra energy per coal, when no modules are used.

**(2) Coal liquification with cracking:** If we also crack the heavy oil before making the solid fuel, it yields 103% extra energy per coal, when no modules are used.

**(3) Coal vs. oil for solid fuel production:** Coal produces about eight times as much solid fuel or energy as crude oil per unit, when no modules are used. However, you can transport about 60% more energy in a fluid wagon of oil than a cargo wagon of coal. Meanwhile, coal has many exclusive uses it may be needed for, instead of making oil products, while crude oil has only one such exclusive use. Therefore, using oil for your solid fuel production may be more practical, but it ultimately depends on the abundances of coal and oil on your map.

**(4) Solid fuel vs. rocket fuel:** Converting solid fuel into rocket fuel causes energy loss, when no modules are used. However, rocket fuel offers other advantages, such as its higher bonuses in vehicles.

**(5) Rocket fuel vs. nuclear fuel:** Converting rocket fuel into nuclear fuel yields around 10x as much energy as the initial solid fuel that went in, when no modules are used. This makes it the best way to get the most energy out of your initial coal or oil. However, it is not the most efficient way to generate power from uranium.

**(6) Nuclear fuel vs. Uranium fuel cells:** Using uranium-235 for nuclear reactor fuel cells yields up to hundreds of times more energy from it compared to using it for nuclear fuel, but you unlock nuclear fuel alongside Kovarex enrichment, meaning that uranium-235 stops being rare when nuclear fuel is available.

**(7) Adding modules for energy gains:** Efficiency modules offer energy gains by reducing the processing energy usage. Productivity modules offer energy gains by creating more processed fuel. Speed modules might enhance productivity module effects by compensating for speed losses. Modules in general are more effective in boosting the gains for recipes with shorter crafting times and higher energy gains.

**(8) Usefulness of processing fuels:** It depends on a number of factors, but ultimately you have to make rocket fuel anyway in order to make rocket parts, and until you get to that stage it is really useful for vehicles.

These questions have been pretty fun for me to explore and I hope they were interesting to you too! Do you have any additions or similar questions about fuels or other game mechanics? Feel free to get in touch on Reddit or Discord via the links at the bottom of the article!

# 