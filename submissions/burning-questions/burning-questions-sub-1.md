# **Burning Questions**

*by Sir Fendi*

*version 1*

*Diagrams are included in a separate powerpoint file, conclusion will be added, calculations will be double-checked.*

*All feedback is welcome!*

Factorio has a variety of fuels that can go into your burner devices, ranging from good old hand-collected wood up to nuclear fuel, which borders on sci-fi. The most popular burner fuel is coal, which is the backbone of early game automation and it runs the boilers, furnaces, vehicles, and other machines reliably until it inevitably runs low. 

In the mid game, solid fuel is introduced as the first processed fuel, made from oil. Interestingly, solid fuel is used to later make rocket fuel, which is in turn used to make nuclear fuel. These processed fuels offer noticeable advantages like having greater energy density than coal both per unit and per stack, and they also offer an acceleration bonus when used inside vehicles. More curiously, however, the late game also brings the technology to liquify good old coal and convert it into solid fuel. This raised for me the question: If you liquify 10 units of coal and burn the solid fuel you get from it, does it provide more energy than the directly burning the coal? And what if you further processed it into rocket fuel? Similar questions followed and lead into this general look at the energy contents of different burner fuels and the energy costs of converting them. The investigation involved  solving many equations but it was much easier to convert them into diagrams, which now summarize everything nicely.

Hence, in this piece, I present some questions about different burner fuels and answer them using conversion diagrams. The results provide some interesting tidbits about how to manage your resources.



### The Questions

We begin with the question that started it all: **(1) Does processing coal into solid fuel get more energy out of it?**

We can convert the coal liquification outputs directly, but we also have cracking available, so: **(2) How much of a difference does cracking make when making solid fuel?**

Then we check if the conventional way of making solid fuel was better: **(3) How does oil processing compare with coal liquification when producing solid fuel?**

But then we note that we don't have to stop at solid fuel: **(4) Does further processing solid fuel into rocket fuel get more energy out of it?**

And then we consider adding uranium: **(5) Does further processing rocket fuel into nuclear fuel get more energy out of it?**

Then we consider that uranium is already being used for a different fuel type: **(6) How does burning nuclear fuel for power compare with making uranium fuel cells to "burn" in reactors instead?**

 Finally, we take a peak at the big picture and ask: **(7) How useful is fuel processing in general?**

Since diagrams are used to answer these questions, first let's look at how they were made.



### Making conversion diagrams

In the diagrams, the recipes for various fuel-related crafting processes are applied. The input and output ratios are preserved but we run each process fractionally to match the input quantities. Most recipes can be checked quickly from [the wiki page for oil processing](https://wiki.factorio.com/Oil_processing). The energy values of the fuels are in-game constants, referenced in [the wiki page for fuels](https://wiki.factorio.com/Fuel). The energy consumed to heat steam to 165°C is referenced in [the wiki page for steam](https://wiki.factorio.com/Steam). 

As for fuel processing electricity consumption, it depends on the machine used and number of crafting runs needed. Calculations are simplified a lot by the buildings using the same amount of power per second for any process. The power uses of machines are summarized in the table:

| Power consuming machine                                      | Power Use without Modules (MW) | Included Processes                                           |
| ------------------------------------------------------------ | ------------------------------ | ------------------------------------------------------------ |
| ![Oil refinery.png](https://wiki.factorio.com/images/thumb/Oil_refinery.png/32px-Oil_refinery.png) Oil refinery | 0.420                          | ![Basic oil processing.png](https://wiki.factorio.com/images/thumb/Basic_oil_processing.png/32px-Basic_oil_processing.png) ![Advanced oil processing.png](https://wiki.factorio.com/images/thumb/Advanced_oil_processing.png/32px-Advanced_oil_processing.png) ![Coal liquefaction.png](https://wiki.factorio.com/images/thumb/Coal_liquefaction.png/32px-Coal_liquefaction.png) |
| ![Chemical plant.png](https://wiki.factorio.com/images/thumb/Chemical_plant.png/32px-Chemical_plant.png) Chemical plant | 0.210                          | ![Heavy oil cracking.png](https://wiki.factorio.com/images/thumb/Heavy_oil_cracking.png/32px-Heavy_oil_cracking.png) ![Solid fuel from heavy oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_heavy_oil.png/32px-Solid_fuel_from_heavy_oil.png)![Solid fuel from light oil.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_light_oil.png/32px-Solid_fuel_from_light_oil.png)![Solid fuel from petroleum gas.png](https://wiki.factorio.com/images/thumb/Solid_fuel_from_petroleum_gas.png/32px-Solid_fuel_from_petroleum_gas.png) |
| ![Assembling machine 2.png](https://wiki.factorio.com/images/thumb/Assembling_machine_2.png/32px-Assembling_machine_2.png) Assembling machine 2 | 0.150 / 0.75 = 0.200*          | ![Rocket fuel.png](https://wiki.factorio.com/images/thumb/Rocket_fuel.png/32px-Rocket_fuel.png)![Uranium fuel cell.png](https://wiki.factorio.com/images/thumb/Uranium_fuel_cell.png/32px-Uranium_fuel_cell.png) |
| ![Centrifuge.png](https://wiki.factorio.com/images/thumb/Centrifuge.png/32px-Centrifuge.png) Centrifuge | 0.350                          | ![Nuclear fuel.png](https://wiki.factorio.com/images/thumb/Nuclear_fuel.png/32px-Nuclear_fuel.png) |

*Adjusted for crafting speed without modules. Also, if we use assembling machine 3, the value becomes 0.375 / 1.25 = 0.300.



The total energy consumption ("E") of a conversion process can be calculated using the machine power use ("P") multiplied by the total crafting time for all of the input, which is the time of one craft (T) multiplied by the number of crafts for the given input quantity ("n"). Hence we summarize power usage as:

`E = P * T * n`

Because this looks like conventional factory planning diagrams, I'd like to stress that "n" is **not** the number of machines for a particular recipe; it is the number of times the recipe itself is crafted to fully convert all of its inputs.



### **Coal vs. liquified coal (direct)**

The simple way to process coal is to liquify it and immediately convert the outputs into solid fuel as below:

(DIAG 1) 

We find that 10 coal yields 5.75 solid fuel this way. Meanwhile, the processing requires energy for heating steam and running machines. We can calculate the energy gain by subtracting all the input energy and processing energy from the output energy:

`Energy gain = 69 - 40 - 1.5 - 2.1 - 1.365 - 0.84 - 0.21 = 22.985MJ`

`Percent gain = 22.985MJ / 40MJ = 57.4625% `

So we see that liquifying the coal gets us about 57% more energy out of it. Can we get out even more if we use cracking?



### **Adding cracking to coal liquification**

Cracking adds and extra step to the process, but the recipes show that it increases solid fuel yield: Cracking heavy oil provides 30/40 or 75% as much light oil. On the other hand, 10 light oil is enough to make 1 solid fuels  rather than 20 heavy oil, meaning that it has 200% of the yield. Combining these, by cracking heavy oil we get 75% * 200% = 150% as much solid fuel as before. 

The same cannot be said about cracking light oil. Cracking light oil provides 20/30 or about 67% as much petroleum gas, but also 20 petroleum gas is required for making solid fuel instead of 10 light oil, meaning 50% as much yield. Since it decreases yield in both regards, light oil cracking is best avoided.

Now to look at the process with cracking:

(DIAG 2) 

We see that we now get 7.375 solid fuel from the same 10 coal instead of 5.75. However, the cracking consumes additional energy. Let's look at total energy inputs and outputs and the effect on coal demand:

`Energy gain = 88.5 - 40 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21 = 41.12MJ`

`Percent gain = 41.12MJ / 40MJ = 102.8% `

`New coal demand = 1/2.028 = 49.3% approx` 

We find that liquifying coal and including cracking leads getting a tad more than **twice its original energy**, which suggests that liquifying coal on a large scale might be useful, although practical factors like production rates need to be considered first. 

Moving on, let us complete the picture for solid fuel production:



### **Coal vs. oil** for making solid fuel

Since solid fuel can also be made out of oil, lets see how energy rich oil is compared to coal. The simplest approach is basic oil processing:

(DIAG 3)

We see that 100 oil produces 2.25 solid fuel. However, we know from its recipe that advanced oil processing yields more petroleum gas for the same 100 oil and on top of that it yields heavy oil and light oil. Hence it would better represent the energy potential of oil:

(DIAG 4)

We see that advanced oil processing yields 8.5 solid fuel from the same 100 oil. That's nearly 4 times the yield for basic oil processing! However once again, cracking the heavy oil would offer us some more energy:

(DIAG 5)

Now we see that we can get a maximum of 9.125 solid fuel per 100 oil. We can compare it with the 7.375 solid fuel from 10 coal. By solving simultaneous equations, we find that 1 unit of coal produces about 8 times as much solid fuel as 1 unit of oil. 

Meanwhile, lets look at the total energy outputs for the best cases for each:

`coal energy output = (88.5 - 1.5 - 2.1 - 0.6825 - 2.8875 - 0.21)MJ / 10 coal`
`coal energy output = 8.112MJ / coal`

`oil energy output = (109.5 - 2.1 - 0.2625 - 2.6775 - 1.155)MJ / 100 oil`

`oil energy output = 1.03305MJ / oil`

We find the energy ratio to also be around 8 oil per 1 coal. In more relatable terms, 1 train cargo wagon of coal (20000) holds as much energy as a little more than 6 fluid wagons of crude oil (15000) .

This ratio lets you get an idea of how much one resource can substitute for the other when your aim is to produce solid fuel. Since the abundances and uses vary a lot for both resources, there is no other practical knowledge derived from this comparison.

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

2. If we also crack the heavy oil before making solid fuel, the yield becomes 2.03x.

3. Coal produces about 8 times as much solid fuel or energy as crude oil, per unit.
4. Converting solid fuel into rocket fuel causes energy loss (ignoring acceleration bonuses).
5. Converting rocket fuel into nuclear fuel yields around 10x as much energy as the initial solid fuel that went in, which makes it the best way to get the most enery out of your initial coal or oil. 
6. Using uranium-235 for nuclear reactor fuel cells yields up to hundreds of times more energy from it compared to using it for nuclear fuel.

These findings help us answer the final question of how useful fuel processing is in general. What stands out the most is that liquifying coal to make solid fuel is definitely useful from the energy point of view.

Getting **double the energy from your coal via liquification** is great because it cuts your coal demand in half. However, there are other factors to consider before declaring that it is better to liquify coal in general:

* **Setup costs may or may not suit you** - We did not look at actual production rates  up until now: We know that 1 refinery processes 10 coal in 5 seconds, which translates to 2 coal per second. One boiler consumes `1.8MW / 4MJ/coal = 0.45 coal per second`. Hence one refinery consumes enough coal for about `2 / 0.45 = 4.44` boilers and produces enough solid fuel for about  `4.44 * 2.03 = 9 `  boilers. Meanwhile, each refinery requires at least 3 chemical plants (my testing suggests 5-6 because you need multiple plants to convert light oil into solid fuel fast enough) . These numbers would help you estimate if you want to invest space and resources in building all these petrochemical facilities.
* **Modules can increase energy yield** - Filling efficieny 1 modules into all the chemical plants and refineries would increase the overall energy yield by 5-10%. Meanwhile, a mixture of two or three different module types can offer the optimal energy yield per coal. Exploring the module options would maybe lead to better production rates.
* **Alternative 1: You can always just go and find more coal/oil instead** - Coal is generally not a rare resource after all and so you can just find more and burn more instead of processing it.
* **Alternative 2: You can just switch to solar or nuclear power and electric furnaces before even unlocking coal liquification** - Coal liquification requires production science packs. Solar and nuclear power can be unlocked and set up way sooner. According to [my comparison of power plants](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/), solar power is expensive but has no upkeep or pollution. Meanwhile nuclear power costs far less than solar power and pollutes only 2-10% as much as coal power. As explained in [my last article](https://www.reddit.com/r/factorio/comments/t6jn29/altf4_57_nuclear_energy_and_you/), nuclear power does not require Kovarex enrichment and you can already get 160MW using only 2 reactors and 2-3 centrifuges. As for electric furnaces, they consume twice as much electrical energy as steel furnaces consume burner energy, but you can reduce electricity consumption to 40% using two efficiency 1 modules, or obtain free products via productivity modules.
* **Vehicles definitely benefit from processed fuels, whether derived from coal or oil** - The acceleration bonus and the ability to fit much more energy into a limited number of fuel inventory slots means that at least 1 fuel processing facility for your vehicles would be quite useful. 



**Conclusion**

???