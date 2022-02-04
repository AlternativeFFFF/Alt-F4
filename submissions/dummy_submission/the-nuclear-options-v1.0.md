 

# **The Nuclear Options**

<!--Draft 1.0, by Sir Fendi. Images are missing and some uncertainties about UPS are being researched. Also not sure about the appendix. All feedback is welcome about content, layout, or anything else. -->

When I came across a glowing green patch of Uranium ore for the first time, I saw that Factorio had some juicy stuff waiting for me somewhere down the tech tree: Nuclear energy! While in today’s world the trials and triumphs of nuclear power are hotly debated, the Factorio community similarly has its ongoing discussions on whether it is worthwhile: Going nuclear is a couple steps up in complexity from the other power options, while also it is completely optional on the path to launching a rocket. Hence many players tend to not bother with diving into it, or just find a good blueprint as a blackbox and call it a day. Others hear of the warnings of the nuclear reactor as a UPS killer, or even a literal killer when it explode dramatically, and they decide to steer clear of it. Yes, there is a lot to look out for, but you can trust in Wube: Like many other carefully balanced mechanics of the game, nuclear power is reasonably easy to get into and you can quickly make something that just works. As for the more complicated and colorful part, I have a few guidelines to offer from my own fair share of tinkering and the findings of the glowing gems of our community.



## Demystefying Nuclear Power

While it may seem offputing with a whole bunch of new machines to it, at its core, a vanilla nuclear plant setup is only a little different from a burner steam power setup: You have a fuel being burned, heat creating steam, and an engine making pwoer from it. The extra complexity comes from three elements: Firstly, the fuel used in reactors is unique and is made in multiple steps instead of using the miner output directly. The official wiki has a [handy tutorial](https://wiki.factorio.com/Tutorial:Nuclear_power) that covers all the basics such as mining and centrifuging uranium ore, as well as setting up a basic single-reactor plant. 

Secondly, nuclear reactors do not stop burning fuel no matter what, and this can lead to a rapid heat buildup, although this *usually* is not as bad as it sounds, as I will clarify shortly. 

Thirdly, heat and fluid management become a couple steps more complex (but ultimately still manageable) if you decide to combine multiple reactors, but that is also where immense efficiency gains can be made. The magic comes from the neighbor bonus: if any two running reactors share a full edge with each other, both reactors get an additional 40MW of heat output. With this being possible on up to 4 edges, you to get up to 500% of the original power output for the same amount of fuel! These enticing efficiency numbers are what push players to get inventive about managing the massive amounts of heat that is generated in huge nuclear reactor arrays. Hence we have a system that is reasonably easy to set up, and pretty interesting to scale up and optimize.

But what about the risks?

 

## Nuclear Safety in Factorio: A Brief History

Nucelar power was something that Wube wanted to get around to for quite a while and they shared some early design ideas before releasing the version know in 0.15. When they shared their first implementation tinkers in [FFF#164](https://www.factorio.com/blog/post/fff-164), there was a lot of focus on heating and cooling water and steam. The early designs involved high-temperature steam being cooled and only partially consumed in turbines, then condensed back into water at 95C in cooling towers, and then being fed back into heat exchangers. You can imagine this being difficult to balance, leading perhaps to one thing or another getting stuck pretty quickly. After a few more weeks of working on it, Wube decided around [FFF#167](https://www.factorio.com/blog/post/fff-167) that dealing with so much temperature management can be avoided and that water and steam could simply be treated as two separate fluids with fixed temperatures, hence simplifying regular boilers too. 

Meanwhile, the effects of temperature on the reactor itself were also softened: At first it was hinted that a nuclear reactor that heated up uncontrollably would explode, hence reactors would demand constant monitoring as in real life. This idea was softened before release though, such that a nuclear plants uses its internal emergency cooling systems to never let it itself heat up beyond 1000C, effectively allowing you to safely leave it alone. Well, mostly. Beware that it still *can* explode if is at over 900C and gets destroyed by a reckless player or biter. And if other reactors are close by, this may lead to [quite a light show](https://www.youtube.com/watch?v=l4ePIuhbiPg&ab_channel=Trupen). Despite the trivialized safety, we can see that Wube has provided a nuclear system which could still get pretty interesting and risky via the added complexity from the neighbor bonus. For those who would have preferred the high-risk and more realistic approach, there are multiple [mods]() that offer a look into the problems of meltdowns and radiation hazards.

 Now that we' seen how nuclear power is not so dangerous in the vanilla game, let's look over the other common concerns about it.

## **Common Concerns with Nuclear Power**

* **Nuclear power is too expensive to set up until the late game** – In terms of research, you do not need more than chemical science packs to unlock nuclear power technology. The setting up requires time, yes. And a single nuclear reactor sure is expensive. However the material costs, in terms of iron and copper, for a 40MW starter level nuclear setup is only [a fraction]()<!--[See appendix]--> of the cost of setting up 40MW worth of solar panels and accumulators, and the cost per MW of adding any further reactors is substantially cheaper thanks to already-established infrastructure and the substantial gains from the neighbor bonus. 
* **A nuclear reactor is too expensive to maintain without the Kovarex enrichment process** – Indeed, obtaining one unit of Uranium-235 requires centrifuging thousands of uranium ores, but on the other hand 1 piece of it is enough to make 10 uranium fuel cells, which last over 30 minutes in total. In a rather eye-opening [video](https://youtu.be/Qw_NzPuccxk?t=1610) Nilaus walks us through the mathematics and from there we see that you need only 8-9 miners and 1 centrifuge to maintain 1 nuclear reactor continuously without the Kovarex enrichment process, although it does not hurt to process a little more in case of bad luck during centrifuging.

* **Nuclear calculations and designs are hard **– At the end of the day, calculating ratios for nuclear setups is not that different from planning your assembly lines. In the same spirit, the wonderful [Factorio Cheat Sheet](https://factoriocheatsheet.com/#nuclear-power) provides the formulas and interactive calculators you need and there are just a few design rules to keep in mind, which we cover below.
* **Nuclear plants are bad for the game performance (UPS)** – It’s true that with all the fluid mechanics involved, nuclear cannot compete with the simplicity of solar power in terms of UPS efficiency, but that does not mean its impact is that large, especially with just a handful of reactors.  We will cover this too, below.
* **What if the radiation causes mutated mega-biters?** - Oddly enough radiation does not seem to affect any entities in vanilla Factorio while regular old pollution already is enough to mutate those pesky biters. Nuclear energy is actually very helpful in this regard, as creates no pollution apart from the relatively small amounts from uranium mining and processing.

With these concerns addressed, let us look into the DIY of nuclear power.

## Designing your own plants

### How do I know how many components I need?

When starting out, it makes sense to start with single reactor, or perhaps a 1x2 (1 row of 2 reactors) layout. The [wiki tutorial](https://wiki.factorio.com/Tutorial:Nuclear_power) has you covered for the basics. After that, the size of your design is based on your power needs. You can arrange your reactors however you want, and the easy way to calculate the power output from a layout is making a single reactor equivalent (SRE) diagram. It works in three steps. We can go over the steps with an example of a 3x3 setup:

`1) Draw a copy of your reactor arrangement and to each reactor assign a value of 1:`

``[1][1][1]` 

``[1][1][1]` 

``[1][1][1]` 

`2) For each reactor, count the number of neighbors it has (they must be aligned exactly side by side) and add it to the 1:`

``[1+2][1+3][1+2] -> [3][4][3]` 

``[1+3][1+4][1+3] -> [4][5][4]` 

``[1+2][1+3][1+2] -> [3][4][3]` 

`3) Sum all the numbers and multiply by 40 to get your power output in MW:`

`(3 + 4 + 3) * 2 + (4 + 5 + 4) = 33 SRE`

`33 SRE * 40MW = 1320MW`

Next to harvest all that reactors' heat power we need heat exchangers. To find how many you need, simply divide the total power produced by 10, since one exchanger consumes 10MW. For our example we get 132. Meanwhile, to feed these heat exchangers with water, 1 offshore pump is enough for 12 heat exchangers, hence in this example we need 132 / 12 = 11 offshore pumps.

Moving on from producing steam to turning it into power, for every heat exchanger, you need 1.718 steam turbines and it is best to round up the product. So in our case, we have 132 * 1.718 = 226.776, or 227 steam turbines. 

And so we have all the component counts covered. If you want to learn more about the mathematics involved here, or if you want a calculator to do most of it for you, the  [Factorio Cheat Sheet](https://factoriocheatsheet.com/#nuclear-power) is the resource I'd recommend.

### What do we consider when placing the components?

When placing down the reactors, we already know about harnessing the neighbor bonus and  calculating it using SRE diagrams. Given that we want to connect as many neighbors as possible, it would make sense to just have a huge spaceless grid of reactors, but the disadvantage of that is there being no space to set up a system for automatically refueling any of the reactors in the middle, unless you use [mods](https://mods.factorio.com/mod/logistics-reactor-next). Hence the most popular reactor arrangement is 2xN, where all reactors except for the corner ones have 3 neighbors, hence each has at least 1 open side for inserter access. However, you can get as creative as you want and leave 2xN behind once you have a steady supply of U-235 such that the neighbor bonus is not so critical anymore.

Your other big concern is fluid flow, and the main constraint is the heat flow along heat pipes. The farther away the heat gets from the reactors, the lower the maximum temperature the pipes can have. Since reactors temperatures cannot exceed 1000C, heat pipes beyond a certain distance become too cold to operate heat exchangers. As the [wiki shows](https://wiki.factorio.com/Tutorial:Nuclear_power#Heat_pipes) and [this post effectively visualizes](https://www.reddit.com/r/factorio/comments/ge4y6c/heat_pipe_throughput_and_a_bonus_note_on_parallel/),  a single pipe can heat a row of at most 21 heat exchangers, but you can improve the range here by making the pipe thicker and by adding heat exchangers on both sides of it instead of one side.  Another tricked used by the community here is placing unfueled nuclear reactors to act as 5x5 heat pipes because this allows travelling the same distance with fewer entities and connecting to more heat exchangers from a single entity. In any case, your best bet is to keep your heat pipes short by keeping heat exchangers nearby. 

As for the other fluids, you want to ensure that the water from your offshore pumps is reaching your heat exhangers without significant [throughput loss in pipelines](https://wiki.factorio.com/Fluid_system#Pipelines), hence make sure to have multiple pipelines along the way and regularly place pumps on them. Secondly, you want to make sure the steam generated has enough pipe space to flow from exchangers to turbines without backing up, which is usually not a big issue and can be solved again using more pipes and pumps.

### What about storing the steam?

There is some debate in the community about whether steam storage is worthwhile. It is worth noting that it is not necessary for normal plant operation, since a correct ratio of exchangers to turbines (with *just* more than enough turbines) would ensure any steam produced is being consumed while the plant is running at full capacity. Meanwhile, adding optional components for steam storage, especially at a large scale, inflicts a toll on UPS. This is the main argument against steam storage and it is a valid one, but the practise it is not without its niche uses.

In the early game when U-235 is rare, steam storage prevents fuel waste: When your power demand is low, excess steam builds up in the system. If the steam system is full, the boilers stop and the heat starts building up in the reactors, which provide an additional energy buffer up until 1000C. After that, the reactors continue to accept and burn fuel cells no matter what, hence they are wasted. A steam storage setup prevents this scenario, and it is even more effective if you set up your uranium fuel cell inserters to activate only when the steam storage is running low (you can do this with a single red/green cable between each inserter and a steam storage tank).  However, after unlocking the Kovarex enrichment process, uranium fuel cells become very easy to obtain and so letting the reactors heat up is not a big concern, apart from the 900C safety limit perhaps.

Another reason to store steam in the early game is to use it as a power buffer against variable demand: If you have more turbines in your system than your exchangers can supply, and if your power demand was low for a while, hence filling your storage, you can later use this buffered amount of steam to temporarily boost your power output during the brief periods when you need extra power, like when several laser turrets activate at once. However, the same power buffering idea can also be done with accumulators, and in the long term the solution for excess demand should always be increasing the base power supply.

### Making it pretty AND pracitcal

Having covered the scientific parts of nuclear plant design, now we can consider the artistic side. While it may seem like there is not much room for creativity because of all the constraints mentioned above,  you do have a lot of freedom about how you arrange your components: You can have a tileable 2x2 reactor design, or go for a 2x100 leviathan plant, you can make many little groups of heat exchangers directly attached to turbines, or you can have all exchangers in a cluster and turbines in another, bigger cluster. There is also more than a handful of ways you can arrange heat pipes around your reactor array, like a plus shape or an "H" shape or even concentric rings. Hence it becomes pretty fun to tinker with designs. Here are some examples:

**gallery***

One of my favorite designs is this one, which I like to use as my second nuclear plant on a map (after a 1x2 starter plant). It has some steam storage because of the abovementioned early game reasons and water storage simply because I think it looks neat. Some of the reactors on the sides are refueled based on the steam or accumulator levels while others are always being refueled.  The reactor outputs up to 1040MW and I tend to start thinking about building a 2xN when my power demand approaches 1000MW.

**pic***

A neat idea is to create your own blueprints for a progressively upgraded nuclear plant. One way to do so is to make all the major component groups tileable so that you simply place down a new set when you need it. Alternatively, you can make the whole plant tileable. Another idea is to have a small nuclear plant that later becomes the corner of a large nuclear plant via using overlapping blueprints, such as the example shown below, where there is at first a 2x1 plant in an area reserved for a 2x3 plant and we can paste on it the larger plant's blueprint when the power demand arises.

**pic***



## Nuclear and UPS

Nuclear power involves quite a few fluid calculations, but Factorio has a magnificently optimized engine. Among these opposing forces, how much nuclear becomes too much to handle? We have technical community members to thank for answering these questions. Notably, u/flame_Sla on Reddit [did some benchmarking](https://www.reddit.com/r/technicalfactorio/comments/qc0npz/the_impact_of_nuclear_power_plants_on_ups/) and found out that the UPS impact of nuclear power becomes noticeable when we are working on the scale of a **dozens of gigawatts** or more.  A base with such a huge power demand is typically operating at the scale of several thousands of science per minute. Of course these calculations assume a fairly beefy computer and a UPS-friendly nuclear plant design. However, the margins are wide enough to suggest that if you prioritize fickle aesthetics over UPS-bound austerity for your first few fancy nuclear plants, you are not likely to be hurt by it. Nevertheless, here are some tips to keep your nuclear plants running as smoothly as possible:

* **Per reactor, build only as many heat exchangers and steam turbines as you need.** These machines account for the majority of the UPS drain, not least because they are the ones that are built the most. This was observed by u/flame_Sla but also discussed by others, like in [this investigation](https://www.reddit.com/r/factorio/comments/s2h64o/100gw_nuclear_setup_ups_comparison_2x2_345ms_vs/) by u/warbaque.
* **If you have long uninterrupted pipelines, replace them with lines of underground pipes.** This works because an underground pipe counts as only 2 pipes while it can replace up to 10 regular pipes. This will also increase the throughput!
* **Limit or avoid steam storage.** While turbines and exchangers are the biggest UPS culprits and storage tanks have a relatively low impact, the difference becomes noticeable as the scale grows.
* **Switch to solar... eventually.** In the end nuclear cannot compete with solar, which has essentially no moving parts. However, since mass-producing solar fields is a lot more expensive than nuclear, covering your initial few GW with nuclear can give you a solid start in the never-ending power problem.
* Check: Maximize the usage of the neighbor bonus
  * Possible resource: https://www.reddit.com/r/factorio/comments/s2h64o/100gw_nuclear_setup_ups_comparison_2x2_345ms_vs/
* Check: Is it better to have 1 turbine less than the ratio (hence steam builds up in the system), or 1 turbine more (hence steam generally doesn't build up)
* Check: Is it better to have more nuclear capacity than demand, or less (with the difference compensated by solar)
* Check: Other tips?

## Conclusion

Hopefully this article has been helpful with demystifying nuclear power. I am glad that Wube made the mechanics so interesting to tinker with and I must praise our wonderful community full of tinkerers who have made tools and explorations, guides and videos, so that all of us can embrace a nuclear future without fear. <!--What else?-->

----------



<!--Does it make sense to have an appendix? Should I just post this on reddit and link it instead?-->

## Appendix: Cost comparison: 40MW of solar power and accumulators vs a 40MW nuclear starter setup

For this comparision we assume 100% productivity for all machines.

###  Solar setup cost

40 000 kW / 42 kW = 953 Solar panels and 953 * 84% = 800 accumulators

Total intermediates: 

* 4000 batteries, 
* 1600 iron plates
* 4765 copper plates
* 4765 steel plates
* 14295 electric circuits

Let us deconstruct the batteries:

* 80k sulfuric acid
* 1600 + (4000) = 5600 iron plates
* 4765 + 4000 = 8765 copper plates
* 4765 steel plates
* 14295 electric circuits

Let us also deconstruct the acid:

* Water
* 8000 sulfur
* 5600 + (1600) = 7200 iron plates
* 8765 copper plates
* 4765 steel plates
* 14295 electric circuits

We now have basic materials in a comparable way.

###  Nuclear setup cost

40MW = 1 nuclear plant, 4 heat exchangers, and 7 steam turbines. However, also include some relevant infrastructure: 3 centrifuges, 30 mining drills, 10 storage tanks, 1000 pipes, 5 pumps.

We can calculate the cost by using Factorio Lab by setting the list as items produced per minute:

https://factoriolab.github.io/list?z=eJwrcDLVMox3CtMyiXc21TKPT9QyjjfQMjaId3HSMjSIdw7WMo13dgUyDQzUirW0nPLrnB3VyowBh1IODg__

We get:

* 800 advanced circuits
* 800 concrete
* 1690 electric circuits
* 8270 copper wire
* 5385 copper plates
* 750 steel plates
* 8745 iron plates
* Thousands of uranium ore

However this list involves duplicated counts because it not a simple list of independent materials. e.g. 43% of iron production is shown to go to steel production, and 19% to electric circuit production, thus these two portions can be deducted. Similar calcualtions show the following revision:

*  Electric circuits (Discount 95% for advanced circuits)
* Copper wire (Discount 61% for electric cirucits, 39% for advanced circuits)
* Copper plates (Discount 77% for copper wire)
* Iron plates (Discount 43% for steel plates, 19% for electric circuits)
* By the same logic, we were able to eliminate 100% of iron ore, copper ore, coal, and crude oil from these calculations.

We are left with:

* 800 advanced circuits
* 800 concrete
* 660 electric circuits
* 0 copper wire
* 1239 copper plates
* 750 steel plates
* 3324 iron plates
* Thousands of uranium ore

Now lets deconstruct the advanced circuits so that we can make the resource costs comparable to the other scenario. Our final list is:

We are left with:

* 0 + (800 * 2 ) = 1600 plastic bars
* 800 concrete
* 660 + (800 * 2) = 1690 electric circuits
* 0 copper wire
* 1239 + (800 * 2) = 2839 copper plates
* 750 steel plates
* 3324 iron plates
* Thousands of uranium ore



Now, putting solar and nuclear side by side, in this respective order:

* 8000 sulfur vs 1600 plastic: not too clear in terms of oil, but the solar setup does not need the 800 coal that the nuclear setup needs
* 0 concrete vs 800 concrete: The soalr setup does not need the 800 stone that the nuclear setup needs, as well as 80 iron ore less.
* 14295 electric circuits vs 1690 electric circuits: The solar setup requires more than 8x as many
* 8765 copper plates vs: 2839: The solar setup requires more than 3x as many
* 4765 steel plates vs. 750 steel plates: The solar setup requires more than 6x as many
* 7200 iron plates vs 3324 şron plates (+ 80 iron ore from the concrete): The soalr setup requires more than 2x as many 
* 0 uranium ore vs thousands of uranium ore: The difference is clear.



From this comparison we see that a nuclear setup requires some coal and stone, and of course tons of uranium ore, but it is several times cheaper in terms of copper and iron when comapred to the equivalent power generation capacity in MW with solar panels and accumulators. Furthermore, any additional reactors will have diminishing additional costs per MW because of the neighbor bonus providing susbtantial amounts of free heat.

