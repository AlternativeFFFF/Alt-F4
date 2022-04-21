# Burning Questions

*by Sir Fendi*

*version 1.1*

*Diagrams are included in a separate powerpoint file, calculations will be double-checked.*

*All feedback is welcome!*

Factorio has a variety of fuels that can go into your burner devices, ranging from classic and modest wood, up to sci-fi level nuclear fuel. The most popular burner fuel is coal, which is the backbone of early game automation and it runs all the boilers, furnaces, vehicles, and other machines reliably until it inevitably runs low. 

In the mid game, solid fuel is introduced as the first processed fuel, made from oil. Conveniently, solid fuel is used to later make rocket fuel, which is in turn used to make nuclear fuel. These processed fuels offer noticeable advantages over coal, like having greater energy density both per unit and per stack, and they also offer an acceleration bonus when used in vehicles. More curiously, however, the late game also brings the technology to liquify good old coal and convert it into solid fuel. This raised for me the question: Does processing coal make it more energy efficient? In other words, if you liquify 10 units of coal and burn the solid fuel you get from it, does it provide more energy than the directly burning the coal? And what if you further processed it into rocket fuel? Similar questions followed and lead into this general exploration of the energy contents of different burner fuels as well as the energy costs of converting them. 

As I set off to answer these questions, a great info source was the [the wiki page for fuels](https://wiki.factorio.com/Fuel) and I approached the conversions in terms of energy produced and consumed per unit of input, rather than the production rates per building. At first I tried solving many equations with a growing list of variables, but it was much easier to convert everything into diagrams, which now summarize everything nicely. Hence, in this piece, I present some questions about different burner fuels and answer them using conversion diagrams. The results provide some interesting tidbits about how to manage your resources and they help to complete the big picture for burner fuels.

## The Questions

We begin with the question that started it all: 

**(1) Does processing coal into solid fuel get more energy out of it?**

We can convert the coal liquification outputs directly, but we also have cracking available, so: 

**(2) How much of a difference does cracking make when making solid fuel?**

Then we check how processing coal stands against the conventional way of making solid fuel: 

**(3) How does oil processing compare with coal liquification when producing solid fuel?**

But then we note that we don't have to stop the processing at solid fuel: 

**(4) Does further processing solid fuel into rocket fuel get more energy out of it?**

And then we consider going further and adding uranium: 

**(5) Does further processing rocket fuel into nuclear fuel get more energy out of it?**

Then we consider that uranium is already being used for a different fuel type and we consider how that compares: 

**(6) How does burning nuclear fuel for power compare with making uranium fuel cells to "burn" in reactors instead?**

Finally, we take a step back and look at the big picture to ask: 

**(7) How useful is fuel processing in general?**

With all the conversion options in the vanilla game, this list of questions actually covers all of the burner fuels except for wood, which is not converted into anything unless you use a [charcoal mod]([Charcoal Burner - Factorio Mods](https://mods.factorio.com/mod/CharcoalBurner)). Hence, a quick note about wood as a fuel: You may end up with a lot of it as a by product of clearing space using an axe or robots. However, it runs out quickly because of how little energy it provides. Instead of cutting trees for extra fuel, you would probably benefit more from using the wood to make power poles or chests, or from keeping the trees around for pollution absorption. As for other fuels, since we use conversion diagrams to answer the questions, first let's look at how they were made.

## Making Conversion Diagrams

In the diagrams, the recipes for various fuel-related crafting processes are applied. The input and output ratios are preserved but we run each process fractionally to match the input quantities rather than aiming for full cycles. Most recipes can be checked quickly from [the wiki page for oil processing](https://wiki.factorio.com/Oil_processing). The energy values of the fuels are in-game constants, referenced in [the wiki page for fuels](https://wiki.factorio.com/Fuel). The energy consumed to heat steam to 165°C is referenced in [the wiki page for steam](https://wiki.factorio.com/Steam). 

As for the electricity consumption during the fuel processing, it depends on the machine used and number of crafting cycles needed. Calculations are simplified a lot by the buildings using the same amount of power per second for any process. The power uses of machines are summarized in the table:

<!-- See table.PNG for a clean preview -->

| Power consuming machine                                                                                                                         | Power Use without Modules (MW) | Included Processes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Crafting Speed |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| ![Oil refinery.png](https://wiki.factorio.com/images/thumb/Oil_refinery.png/32px-Oil_refinery.png) Oil refinery                                 | 0.420                          | ![Basic oil processing.png](https://wiki.factorio.com/images/thumb/Basic_oil_processing.png/32px-Basic_oil_processing.png) ![Advanced oil processing.png](https://wiki.factorio.com/images/thumb/Advanced_oil_processing.png/32px-Advanced_oil_processing.png) ![Coal liquefaction.png](https://wiki.factorio.com/images/thumb/Coal_liquefaction.png/32px-Coal_liquefaction.png)                                                                                                                                                                             | 1              |
| ![Chemical plant.png](https://wiki.factorio.com/images/thumb/Chemical_plant.png/32px-Chemical_plant.png) Chemical plant                         | 0.210                          | ![Heavy oil cracking.png](https://wiki.factorio.com/images/thumb/Heavy_oil_cracking.png/32px-Heavy_oil_cracking.png) ![Solid fuel from heavy oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_heavy_oil.png/32px-Solid_fuel_from_heavy_oil.png)![Solid fuel from light oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_light_oil.png/32px-Solid_fuel_from_light_oil.png)![Solid fuel from petroleum gas.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_petroleum_gas.png/32px-Solid_fuel_from_petroleum_gas.png) | 1              |
| ![Assembling machine 2.png](https://wiki.factorio.com/images/thumb/Assembling_machine_2.png/32px-Assembling_machine_2.png) Assembling machine 2 | 0.150*                         | ![Rocket fuel.png](https://wiki.factorio.com/images/thumb/Rocket_fuel.png/32px-Rocket_fuel.png)![Uranium fuel cell.png](https://wiki.factorio.com/images/thumb/Uranium_fuel_cell.png/32px-Uranium_fuel_cell.png)                                                                                                                                                                                                                                                                                                                                             | 0.75*          |
| ![Centrifuge.png](https://wiki.factorio.com/images/thumb/Centrifuge.png/32px-Centrifuge.png) Centrifuge                                         | 0.350                          | ![Nuclear fuel.png](https://wiki.factorio.com/images/thumb/Nuclear_fuel.png/32px-Nuclear_fuel.png)                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1              |

*If we use assembling machine 3 instead, the power use would be 0.375MW and crafting speed 1.25.

The total processing energy ("E") needed for a conversion can be calculated using the machine power use ("P") multiplied by the total crafting time for all of the input ("T"). This total crafting time is the duration of one crafting cycle ("d") divided by the machine crafting speed ("s"), multiplied by the number of crafting cycles ("c") to cover the entire input quantity. Hence we summarize processing energy consumption as:

`E = P * T = P * d * c / s`

Once we have the crafting recipes, fuel energy values, and the processing energy equation, we have all we need to make the conversion diagrams. Now let's look at them:

## Coal vs. liquified coal

The simple way to process coal is to just liquify it and immediately convert the outputs into solid fuel as below:

{% include image.html 

src= 'src'
 alt='Processing coal into solid fuel directly'
 caption='Processing coal into solid fuel directly' 

%}

We find that 10 coal yields 5.75 solid fuel this way. Meanwhile, the processing requires energy for heating steam and running machines. We can calculate the energy gain by subtracting all the input energy and processing energy from the output energy. Meanwhile, the percent gain is the energy gain divided by the energy obtained from directly burning the input fuel.

`Energy gain = 69 - 40 - 1.5 - 2.1 - 1.365 - 0.84 - 0.21 = 22.985MJ`

`Percent gain = 22.985MJ / 40MJ = 57.4625% `

So we see that simply liquifying the coal gets us about 57% more energy out of it. Now, can we get out even more if we use cracking?

## Adding cracking to coal liquification

Cracking adds and extra step to the process, but the looking at the recipes shows that it increases solid fuel yield: Cracking heavy oil provides 30/40 or 75% as much light oil. On the other hand, 10 light oil is enough to make 1 solid fuel  rather than 20 heavy oil, meaning that it has 200% of the yield. Combining these, by cracking heavy oil we get 75% * 200% = 150% as much solid fuel as before. 

However, the same cannot be said about cracking light oil. Cracking light oil provides 20/30 or about 66.7% as much petroleum gas, but also 20 petroleum gas is required for making solid fuel instead of 10 light oil, meaning 50% as much yield. Combining these, by cracking light oil we get 66.7% * 50% = 33.4% as much solid fuel as before, meaning that light oil cracking should be avoided.

Now to look at the process with cracking:

{% include image.html

src= 'src'
 alt='Processing coal into solid fuel with heavy oil cracking'
 caption='Processing coal into solid fuel with heavy oil cracking'

%}

We see that we now get 7.375 solid fuel from the same 10 coal instead of 5.75. That seems great but the cracking also consumes additional energy. So, let's look at total energy gain in total:

`Energy gain = 88.5 - 40 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21 = 41.12MJ`

`Percent gain = 41.12MJ / 40MJ = 102.8% `

We find that liquifying coal and including cracking leads getting a tad more than **twice its original energy**. In other words, if you liquify coal before burning it, you only need half as much as you did before! While this suggests that liquifying coal on a large scale is a great idea, other factors like production rates need to be considered, as discussed later. 

Moving on, let us consider the other way that solid fuel is made:

## Coal vs. oil for making solid fuel

Since solid fuel can also be made out of oil, lets see how energy rich oil is compared to coal. The simplest approach is basic oil processing, which yields petroleum gas that is converted directly into solid fuel:

{% include image.html

src= 'src'
 alt='Processing oil into solid fuel with basic oil processing'
 caption='Processing oil into solid fuel with basic oil processing'

%}

We see that 100 oil produces 2.25 solid fuel. However, we know from its recipe that advanced oil processing yields more petroleum gas for the same 100 oil. On top of that, it also yields heavy oil and light oil. Hence it would better definitely use the oil more efficiently:

{% include image.html

src= 'src'
 alt='Processing oil into solid fuel with advanced oil processing'
 caption='Processing oil into solid fuel with advanced oil processing'

%}

We see that advanced oil processing yields 8.5 solid fuel from the same 100 oil. That's nearly 4 times the yield for basic oil processing! However once again, cracking the heavy oil would offer us some more energy:

{% include image.html

src= 'src'
 alt='Processing oil into solid fuel with advanced oil processing and heavy oil cracking'
 caption='Processing oil into solid fuel with advanced oil processing and heavy oil cracking'

%}

Now we see that we can get a maximum of 9.125 solid fuel per 100 oil. We can compare it with the 7.375 solid fuel from 10 coal. If we crunch these numbers, we find that 1 unit of coal produces about 8.08 times as much solid fuel as 1 unit of oil. 

Meanwhile, lets look at the total energy outputs for the best cases for each input:

`coal energy output = (88.5 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21)MJ / 10 coal`
`coal energy output = 8.112MJ / coal`

`oil energy output = (109.5 - 2.1 - 0.2625 - 2.6775 - 1.155)MJ / 100 oil`

`oil energy output = 1.03305MJ / oil`

We find that for energy, 1 unit of coal holds about 7.85 times the energy as 1 unit of oil. This ratio lets you get an idea of how much one resource can substitute for the other when your aim is to produce solid fuel at a large scale. 

Meanwhile, I identified a more comprehensive list of factors to consider when comparing coal and oil for solid fuel production: 

* **Energy per unit:** As we just found out, that coal holds about 8 times as much energy per unit.

* **Transportation efficiency:** 1 cargo wagon of 2000 coal holds about 16.2GJ of energy if converted to solid fuel. The same cargo wagon holds 400 crude oil barrels, or 20 000 oil, which gives about 20.6GJ of energy (27% more). If you use a fluid wagon instead, you can hold 25 000 oil or 25.8GJ (nearly 60% more), meaning that oil wagons transport more energy assuming you don't have to worry about transporting water/steam. Oil also has the transport option of pipelines, which may be preferable to trains in some cases. 

* **Relative abundances**: It simply depends on the map, so not much can be said there.

* **Exclusive uses:** While both coal and oil can be used to make oil products, the recipes that use coal exclusively (plastic, explosives, capsules) greatly outweigh those for crude oil (flamethrower ammo). 

Considering all these factors together, it seems to generally be better to save most of your coal for plastic/explosive production and mostly use oil for solid fuel production, unless coal/oil abundances encourage otherwise. However, solid fuel is not the end of the fuel discussion, as we can make into rocket fuel.

## Solid fuel vs. rocket fuel

Having seen that converting coal into solid fuel offers a significant energy yield, what can we say about rocket fuel? Instead of starting from coal/oil, it is enough to just look at the recipe for rocket fuel:

{% include image.html

src= 'src'
 alt='Processing solid fuel into rocket fuel'
 caption='Processing solid fuel into rocket fuel'

%}

We see that a single unit rocket fuel contains 100MJ of energy while the raw material of 10 solid fuel already holds 120MJ, and the 10 light oil can be made into an 11th solid fuel, providing almost 12MJ more. Hence we see that there is a significant energy loss if one chooses to burn rocket fuel in furnaces or boilers. However, its higher energy density per stack and acceleration bonus makes rocket fuel great for vehicles and it is also is a necessary ingredient if we want to make nuclear fuel.

## Going nuclear

Nuclear fuel is still pretty experimental in the real world, but Factorio offers a standardized variant that is made from regular rocket fuel and uranium-235. Like with our examination of rocket fuel, the recipe itself says enough:

{% include image.html

src= 'src'
 alt='Processing rocket fuel into nuclear fuel'
 caption='Processing rocket fuel into nuclear fuel'

%}

We see that nuclear fuel offers an impressive energy output of 1.21GJ, which is [a reference](https://wiki.factorio.com/Nuclear_fuel), but also around 10 times as much energy as the solid fuel first used to make the rocket fuel. This means that if you were to switch from burning coal directly to making it into nuclear fuel to burn instead, your coal demand would drop to a tiny fraction, to as little as 1/20 as before. 

## Making the most of your uranium

Despite its massive energy gains in terms of coal and oil savings, nuclear fuel is not perfect. The uranium-235 that it uses could instead be used to make uranium fuel cells, which provide a different energy situation:

{% include image.html

src= 'src'
 alt='Processing uranium-235 into uranium fuel cells'
 caption='Processing uranium-235 into uranium fuel cells'

%}

While uranium fuel cells can only be used inside nuclear reactors, we see that they produce energy on the level of GJ instead of MJ, and the production increases multiplicatively via the reactor neighbor bonus. Hence, up to hundreds of times more energy is gained from the same piece of uranium-235 if used in a nuclear reactor instead of nuclear fuel. This would suggest that if one has a uranium-235 supply already, they should just switch to nuclear power and electric furnaces instead of burner devices. 

However, nuclear fuel is still very effective for vehicles. It is also worth noting that nuclear fuel is unlocked alongside Kovarex Enrichment, meaning that there is no shortage of uranium-235 upon unlocking it, meaning that using uranium efficiently is not critical any more.



## So how useful is fuel processing in general?

Our findings so far about energy gains help us answer the final question of how useful fuel processing is in general. While our main focus so far has been the energy gains from processing, I've identified a more comprehensive list of factors to decide whether fuel processing is worthwhile.

To decide whether to (further) process your burner fuel, consider…

* **Gains in energy:** If you get more energy out of processed fuel, then your demand for the unprocessed fuel decreases and so your resource patches run out more slowly. We determined above that processing cost into solid fuel offers great gains, while rocket fuel.
- **Gains in vehicle acceleration bonus and top speed bonus:** Greater bonuses mean that your vehicles can go faster. More processed fuels offer greater bonuses.
- **Gains in energy density (per unit and per stack):** More energy per stack means more vehicle range per stack of fuel, which makes a big difference for trains because of their limited fuel slots. Meanwhile, more energy per unit means less logistics are required to move a fixed amount of energy. Needing fewer bots, belts, and/or trains to move fuels simplifies things and it also makes the logistics themselves cost less energy. More processed fuels have greater energy density in both regards, hence having these benefits.
- **Cost of processing setup:** This is in terms of materials and space needed to make enough buildings for the processing, as well as the unlock cost of the required technology. Each tier of processing adds to these costs.
- **Availability of more coal/oil to just use instead:** Since these resources are technically infinite on most maps, you may prefer to skip the energy gains and brute force your fuel problem by setting up more resource extraction buildings and infrastructure instead of more fuel processing infrastructure. This factor simply depends on your surroundings.
- **How long you will keep using the burner devices:** If you are going to switch to electrical machines and alternate power sources soon, it may not be worth the effort of setting up a fuel processing system.

Since these factors depend on your map and your plans, the conclusion varies on whether fuel processing is useful. Based on my experiences, I can offer the following advice about processing fuels:

- **Processed fuels are excellent for trains and tanks.** The speed gains from rocket fuel is quite satisfying and nuclear fuel is on another level…
- **You already need to mass produce solid fuel and rocket fuel to make rocket parts,** so it is not too difficult to produce a little more for your vehicle or other burner device needs.
- **If you are burning coal for power, processing it into solid fuel will cut down its demand significantly.** For example, doubling the energy per coal means that you need to mine only half as much as before. However, unlocking coal liquification requires production science, which means you can unlock solar and nuclear power much sooner and [their advantages](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/) may make it worthwhile to switch to them before upgrading your coal setup. Nuclear power is [easier to do than it may seem]([Alt-F4 #57 - Nuclear Energy and You](https://alt-f4.blog/ALTF4-57/#)), especially without Kovarex enrichment!
- **Use modules in your fuel processing to increase energy gains.** Filling all the fuel processing machines with efficiency 1 modules is quick and offers some energy savings. More complex module combinations may offer better gains, as presented in [this guide]([Tutorial:Producing power from oil - Factorio Wiki](https://wiki.factorio.com/Tutorial:Producing_power_from_oil)) on the official wiki.



## Summary

This article started with a little question that snowballed into an exploration of all of Factorio's fuels. We uncovered the following:

**(1) Coal vs. coal liquification:** Liquifying coal and directly turning it into solid fuel yields 1.57 times as much energy per coal.

**(2) Coal liquification with cracking:** If we also crack the heavy oil before making solid fuel, it yields 2.03 times as much energy per coal.

**(3) Coal vs. oil for solid fuel production:** Coal produces about 8 times as much solid fuel or energy as crude oil per unit. However, you can transport about 60% more energy in a fluid wagon of oil than a cargo wagon of coal. Meanwhile, coal has many exclusive uses it may be needed for instead of liquification while crude oil has next to none. Therefore using oil for solid fuel production may be more practical, but it ultimately depends on the abundances of coal and oil around you at the moment.

**(4) Solid fuel vs. rocket fuel:** Converting solid fuel into rocket fuel causes energy loss, but rocket fuel offers several advantages within vehicles.

**(5) Rocket fuel vs. nuclear fuel:** Converting rocket fuel into nuclear fuel yields around 10x as much energy as the initial solid fuel that went in, which makes it the best way to get the most energy out of your initial coal or oil. However, it is not the best way to generate power from uranium.

**(6) Nuclear fuel vs. Uranium fuel cells:** Using uranium-235 for nuclear reactor fuel cells yields up to hundreds of times more energy from it compared to using it for nuclear fuel but you unlock nuclear fuel alongside Kovarex enrichment, meaning that uranium-235 is no longer rare when nuclear fuel is available.

**(7) Usefulness of processing fuels:** todo*

Wrap up paragraph: todo* Do you have any other questions about Factorio’s fuels? ...