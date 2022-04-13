# **Burning Questions**

*by Sir Fendi*

*version 1.1*

*Diagrams are included in a separate powerpoint file, conclusion will be added, calculations will be double-checked.*

*All feedback is welcome!*

Factorio has a variety of fuels that can go into your burner devices, ranging from classic and modest wood, up to sci-fi level nuclear fuel. The most popular burner fuel is coal, which is the backbone of early game automation and it runs all the boilers, furnaces, vehicles, and other machines reliably until it inevitably runs low. 

In the mid game, solid fuel is introduced as the first processed fuel, made from oil. Conveniently, solid fuel is used to later make rocket fuel, which is in turn used to make nuclear fuel. These processed fuels offer noticeable advantages over coal, like having greater energy density both per unit and per stack, and they also offer an acceleration bonus when used in vehicles. More curiously, however, the late game also brings the technology to liquify good old coal and convert it into solid fuel. This raised for me the question: Does processing coal make it more energy efficient? In other words, if you liquify 10 units of coal and burn the solid fuel you get from it, does it provide more energy than the directly burning the coal? And what if you further processed it into rocket fuel? Similar questions followed and lead into this general exploration of the energy contents of different burner fuels as well as the energy costs of converting them. 

As I set off to answer these questions, a great info source was the [the wiki page for fuels](https://wiki.factorio.com/Fuel) and I approached the conversions in terms of energy produced and consumed per unit of input, rather than the production rates per building. At first I tried solving many equations with a growing list of variables, but it was much easier to convert everything into diagrams, which now summarize everything nicely. Hence, in this piece, I present some questions about different burner fuels and answer them using conversion diagrams. The results provide some interesting tidbits about how to manage your resources and they help to complete the big picture for burner fuels.

### The Questions

We begin with the question that started it all: **(1) Does processing coal into solid fuel get more energy out of it?**

We can convert the coal liquification outputs directly, but we also have cracking available, so: **(2) How much of a difference does cracking make when making solid fuel?**

Then we check how processing coal stands against the conventional way of making solid fuel: **(3) How does oil processing compare to coal liquification when producing solid fuel?**

But then we note that we don't have to stop the processing at solid fuel: **(4) Does further processing solid fuel into rocket fuel get more energy out of it?**

And then we consider going further and adding uranium: **(5) Does further processing rocket fuel into nuclear fuel get more energy out of it?**

Then we consider that uranium is already being used for a different fuel type and we consider the energy efficiency for that as well: **(6) How does burning nuclear fuel for power compare with making uranium fuel cells to "burn" in reactors instead?**

Finally, we take a peak at the big picture and ask: **(7) How useful is fuel processing in general?**

With all the conversion options in the vanilla game, this list of questions actually covers all of the burner fuels except for wood, which is not converted into anything unless you use a [charcoal mod]([Charcoal Burner - Factorio Mods](https://mods.factorio.com/mod/CharcoalBurner)). Hence, a quick note about wood as a fuel: You may end up with a lot of it as a by product of clearing space using an axe or robots. However, it runs out quickly because of how little energy it provides. Instead of cutting trees for fuel, you would probably benefit more from using the wood to make power poles or chests, or from keeping the trees around for pollution absorption. As for other fuels, since we use conversion diagrams to answer the questions, first let's look at how they were made.

### Making Conversion Diagrams

In the diagrams, the recipes for various fuel-related crafting processes are applied. The input and output ratios are preserved but we run each process fractionally to match the input quantities rather than aiming for full cycles. Most recipes can be checked quickly from [the wiki page for oil processing](https://wiki.factorio.com/Oil_processing). The energy values of the fuels are in-game constants, referenced in [the wiki page for fuels](https://wiki.factorio.com/Fuel). The energy consumed to heat steam to 165°C is referenced in [the wiki page for steam](https://wiki.factorio.com/Steam). 

As for the electricity consumption during the fuel processing, it depends on the machine used and number of crafting cycles needed. Calculations are simplified a lot by the buildings using the same amount of power per second for any process. The power uses of machines are summarized in the table:

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

### **Coal vs. liquified coal (direct)**

The simple way to process coal is to just liquify it and immediately convert the outputs into solid fuel as below:

(DIAG 1: coal -> solid fuel, simple) 

We find that 10 coal yields 5.75 solid fuel this way. Meanwhile, the processing requires energy for heating steam and running machines. We can calculate the energy gain by subtracting all the input energy and processing energy from the output energy. Meanwhile, the percent gain is the energy gain divided by the energy obtained from directly burning the input fuel.

`Energy gain = 69 - 40 - 1.5 - 2.1 - 1.365 - 0.84 - 0.21 = 22.985MJ`

`Percent gain = 22.985MJ / 40MJ = 57.4625% `

So we see that simply liquifying the coal gets us about 57% more energy out of it. Now, can we get out even more if we use cracking?

### **Adding cracking to coal liquification**

Cracking adds and extra step to the process, but the looking at the recipes shows that it increases solid fuel yield: Cracking heavy oil provides 30/40 or 75% as much light oil. On the other hand, 10 light oil is enough to make 1 solid fuel  rather than 20 heavy oil, meaning that it has 200% of the yield. Combining these, by cracking heavy oil we get 75% * 200% = 150% as much solid fuel as before. 

However, the same cannot be said about cracking light oil. Cracking light oil provides 20/30 or about 66.7% as much petroleum gas, but also 20 petroleum gas is required for making solid fuel instead of 10 light oil, meaning 50% as much yield. Combining these, by cracking light oil we get 66.7% * 50% = 33.4% as much solid fuel as before, meaning that light oil cracking should be avoided.

Now to look at the process with cracking:

(DIAG 2: coal -> solid fuel, with heavy oil cracking)

We see that we now get 7.375 solid fuel from the same 10 coal instead of 5.75. That seems great but the cracking also consumes additional energy. So, let's look at total energy gain in total:

`Energy gain = 88.5 - 40 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21 = 41.12MJ`

`Percent gain = 41.12MJ / 40MJ = 102.8% `

We find that liquifying coal and including cracking leads getting a tad more than **twice its original energy**. In other words, if you liquify coal before burning it, you only need half as much as you did before! While this suggests that liquifying coal on a large scale is a great idea, other factors like production rates need to be considered, as discussed later. 

Moving on, let us consider the other way that solid fuel is made:

### **Coal vs. oil** for making solid fuel

Since solid fuel can also be made out of oil, lets see how energy rich oil is compared to coal. The simplest approach is basic oil processing, which yields petroleum gas that is converted directly into solid fuel:

(DIAG 3: oil -> solid fuel, basic processing)

We see that 100 oil produces 2.25 solid fuel. However, we know from its recipe that advanced oil processing yields more petroleum gas for the same 100 oil. On top of that, it also yields heavy oil and light oil. Hence it would better definitely use the oil more efficiently:

(DIAG 4: oil -> solid fuel, advanced processing)

We see that advanced oil processing yields 8.5 solid fuel from the same 100 oil. That's nearly 4 times the yield for basic oil processing! However once again, cracking the heavy oil would offer us some more energy:

(DIAG 5: oil -> solid fuel, basic processing with heavy oil cracking)

Now we see that we can get a maximum of 9.125 solid fuel per 100 oil. We can compare it with the 7.375 solid fuel from 10 coal. If we crunch these numbers, we find that 1 unit of coal produces about 8.1 times as much solid fuel as 1 unit of oil. 

Meanwhile, lets look at the total energy outputs for the best cases for each input:

`coal energy output = (88.5 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21)MJ / 10 coal`
`coal energy output = 8.112MJ / coal`

`oil energy output = (109.5 - 2.1 - 0.2625 - 2.6775 - 1.155)MJ / 100 oil`

`oil energy output = 1.03305MJ / oil`

We find that for energy, 1 unit of coal holds about 7.85 times the energy as 1 unit of oil. In more relatable terms, 1 train cargo wagon of coal (20000) holds more energy than 6 fluid wagons of crude oil (150000) . This ratio lets you get an idea of how much one resource can substitute for the other when your aim is to produce solid fuel at a large scale. Meanwhile, since the abundances and uses vary a lot for both coal and oil, we cannot definitively say that one resource is better than the other for producing solid fuel; it simply depends.

Soild fuel is not the end of the discussion, as we can make into rocket fuel.

### **Solid fuel vs. rocket fuel**

Having seen that turning our coal into solid fuel offers a significant energy yield, what can we say about rocket fuel? Instead of starting from the top, it is enough to just look at the recipe for rocket fuel:

(DIAG 7)

We see that a single unit rocket fuel contains 100MJ of energy while the raw material of 10 solid fuel already holds 120MJ, and the 10 light oil can be made into an 11th solid fuel, providing almost 12MJ more. Hence we see that there is no benefit from burning rocket fuel in furnaces or boilers. However, its higher energy density per stack and accerleration bonus makes it very useful as vehicle fuel and it is also is a necessary ingredient if we want to make nuclear fuel.

### **Adding uranium**

Nuclear fuel is still pretty experimental in the real world, but Factorio offers a standardized variant that is made from regular rocket fuel and uranium-235. Like with our examination of rocket fuel, the recipe itself says enough:

(DIAG 8)

We see that nuclear fuel offers an impressive energy output of 1.21GJ, which is [a reference](https://wiki.factorio.com/Nuclear_fuel). Looking back at the rocket fuel discussion, we see that the inital 10 solid fuel is definitely worth processing into rocket fuel to make the nuclear fuel, because it yields 10 times as much energy. This means that if you were to switch from burning coal directly to making it into nuclear fuel, your coal demand would drop to a tiny fraction. 

Despite its massive energy gains in terms of coal and oil savings, nuclear fuel is not perfect. The uranium-235 that it uses could instead be used to make uranium fuel cells:

(DIAG 9)

While uranium fuel cells can only be used inside nuclear reactors, we see that producing them instead results in up to hundreds of times more energy gained from the same piece of uranium-235, depending on the neighbor bonus of reactor consuming it. This would suggest that if one has a uranium-235 supply already, they should just switch to nuclear power instead.

### So how useful is fuel processing in general?

Looking back at our original questions we found out that:

1. Liquifying coal and directly turning it into solid fuel yields 1.57x as much energy.

2. If we also crack the heavy oil before making solid fuel, the energy yield becomes 2.03x.

3. Coal produces about 7.85 times as much solid fuel or energy as crude oil, per unit.

4. Converting solid fuel into rocket fuel causes energy loss (ignoring acceleration bonuses).

5. Converting rocket fuel into nuclear fuel yields around 10x as much energy as the initial solid fuel that went in, which makes it the best way to get the most energy out of your initial coal or oil. 

6. Using uranium-235 for nuclear reactor fuel cells yields up to hundreds of times more energy from it compared to using it for nuclear fuel.

These findings help us answer the final question of how useful fuel processing is in general. What stands out the most is that liquifying coal to make solid fuel is definitely useful from the energy point of view.

Getting **double the energy from your coal via liquification** is great because it cuts your coal demand in half. However, there are other factors to consider before declaring that it is better to liquify coal in general:

* **After checking production rates, setup costs may or may not suit you** - We did not look at actual production rates up until now: We know that 1 refinery processes 10 coal in 5 seconds, which translates to 2 coal per second. One boiler consumes 1.8MW. In terms of coal, `1.8MW / 4MJ/coal = 0.45 coal per second`. In comparison, one refinery consumes enough coal for about `2 / 0.45 = 4.44` boilers. If we use heavy oil cracking after coal liquification, we know that the energy yield is doubled (2.03x) Hence, 1 refinery produces enough materials to make solid fuel for about  `4.44 * 2.03 = 9` boilers. As for processing the materials, one refinery requires at least 3 chemical plants (my testing suggests 5-6 because you need multiple plants to convert light oil into solid fuel fast enough***TEST) . These numbers would help you estimate if you want to invest space and resources in building all these petrochemical facilities.

* **Modules can increase energy yield** - Filling efficieny 1 modules into all the chemical plants and refineries would increase the overall energy yield by 5-10%. Meanwhile, a mixture of two or three different module types can offer the optimal energy yield per coal. Exploring the module options would maybe lead to better production rates.
* **Alternative 1: You can always just go and find more coal/oil instead** - Coal is generally not a rare resource after all and so you can just find more and burn more instead of processing it.
* **Alternative 2: You can just switch to solar or nuclear power and electric furnaces before even unlocking coal liquification** - Coal liquification requires production science packs. Solar and nuclear power can be unlocked and set up way sooner. According to [my comparison of power plants](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/), solar power is expensive but has no upkeep or pollution. Meanwhile nuclear power costs far less than solar power and pollutes only 2-10% as much as coal power. As explained in [my last article](https://www.reddit.com/r/factorio/comments/t6jn29/altf4_57_nuclear_energy_and_you/), nuclear power does not require Kovarex enrichment and you can already get 160MW using only 2 reactors and 2-3 centrifuges. As for electric furnaces, they consume twice as much electrical energy as steel furnaces consume burner energy, but you can reduce electricity consumption to 40% using two efficiency 1 modules, or obtain free products via productivity modules.
* **Vehicles definitely benefit from processed fuels, whether derived from coal or oil** - The acceleration bonus and the ability to fit much more energy into a limited number of fuel inventory slots means that at least 1 fuel processing facility for your vehicles would be quite useful. 

**Conclusion**