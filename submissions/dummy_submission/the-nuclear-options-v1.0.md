# **The Nuclear Option**

When I came across a glowing green patch of Uranium ore for the first time, I saw that Factorio had some juicy stuff waiting for me somewhere down the tech tree: Nuclear energy! While in today’s world the trials and triumphs of nuclear power are hotly debated, the Factorio community similarly has its ongoing discussions on whether it is worthwhile: Going nuclear is a couple steps up in complexity from the other power options, while also it is completely optional on the path to launching a rocket. Hence many players tend to not bother with diving into it, or just find a good blueprint as a blackbox and call it a day. Others hear of the warnings of the nuclear reactor as a UPS killer, or even a literal killer when it explode dramatically, and they decide to steer clear of it. Yes, there is a lot to look out for, but you can trust in Wube: Like many other carefully balanced mechanics of the game, nuclear power is reasonably easy to get into and you can quickly make something that just works. As for the more complicated and colorful part, I have a few guidelines to offer from my own fair share of tinkering and the findings of the glowing gems of our community.

<!--Visual 1: Micro-setup image for nuclear from ore patch to steam turbine-->

## Demystefying Nuclear Power

While it may seem offputing with a whole bunch of new machines to it, at its core, a vanilla nuclear plant setup is only a little different from a burner steam power setup: You have a fuel being burned, heat creating steam, and an engine making power from it. The extra complexity comes from three elements: Firstly, the fuel used in reactors is unique and is made in multiple steps instead of using the miner output directly. The official wiki has a [handy tutorial](https://wiki.factorio.com/Tutorial:Nuclear_power) that covers all the basics such as mining and centrifuging uranium ore, as well as setting up a basic single-reactor plant.

Secondly, nuclear reactors do not stop burning fuel no matter what, and this can lead to a rapid heat buildup, although this *usually* is not as bad as it sounds, as I will clarify shortly.

Thirdly, heat and fluid management become a couple steps more complex (but ultimately still manageable) if you decide to combine multiple reactors, but that is also where immense efficiency gains can be made. The magic comes from the neighbor bonus: if any two running reactors share a full edge with each other, both reactors get an additional 40MW of heat output. With this being possible on up to 4 edges, you to get up to 500% of the original power output for the same amount of fuel! These enticing efficiency numbers are what push players to get inventive about managing the massive amounts of heat that is generated in huge nuclear reactor arrays. Hence we have a system that is reasonably easy to set up, and pretty interesting to scale up and optimize.

But what about the risks?

## Nuclear Safety in Factorio: A Brief History

Nucelar power was something that Wube wanted to get around to for quite a while and they shared some early design ideas before releasing the version know in 0.15. When they shared their first implementation tinkers in [FFF#164](https://www.factorio.com/blog/post/fff-164), there was a lot of focus on heating and cooling water and steam. The early designs involved high-temperature steam being cooled and only partially consumed in turbines, then condensed back into water at 95C in cooling towers, and then being fed back into heat exchangers. You can imagine this being difficult to balance, leading perhaps to one thing or another getting stuck pretty quickly. After a few more weeks of working on it, Wube decided around [FFF#167](https://www.factorio.com/blog/post/fff-167) that dealing with so much temperature management can be avoided and that water and steam could simply be treated as two separate fluids with fixed temperatures, hence simplifying regular boilers too. They also decided that none of the systems would have heat loss to the environment over time.

Meanwhile, the effects of temperature on the reactor itself were also softened: At first it was hinted that a nuclear reactor that heated up uncontrollably would explode, hence reactors would demand constant monitoring as in real life. This idea was softened before release though, such that a nuclear plants uses its internal emergency cooling systems to never let it itself heat up beyond 1000C, effectively allowing you to safely leave it alone. Well, mostly. Beware that it still *can* explode if is at over 900C and gets destroyed by a reckless player or biter. And if other reactors are close by, this may lead to [quite a light show](https://www.youtube.com/watch?v=l4ePIuhbiPg&ab_channel=Trupen). 

<!--VISUAL 2: Embed this last linked video-->

Despite the trivialized safety, we can see that Wube has provided a nuclear system which could still get pretty interesting and risky via the added complexity from the neighbor bonus. For those who would have preferred the high-risk and more realistic approach, there are [mods](https://mods.factorio.com/mod/RealisticReactors) that offer a look into the problems of meltdowns and radiation hazards.

 Now that we' seen how nuclear power is not so dangerous in the vanilla game, let's look over the other common concerns about it.

## **Common Concerns with Nuclear Power**

* **Nuclear designs and calculations are very complex **– There is nothing wrong with starting small and simple and the rest boils down to a few rules of thumb and some ratios. In the section "Designing your own Nuclear Plants" I hope to cover the details and point to guides and tools you can use.
* **Nuclear power is too expensive to set up until the late game** – In terms of research, you do not need more than chemical science packs to unlock nuclear power technology.  In terms of inital setup costs, nuclear power is significantly cheaper than solar power, as discussed in [this analysis I made](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/), summarized in the table below. Furthermore when you scale up your nuclear power setup, it gets substantially cheaper thanks to already-established infrastructure and the substantial gains from the neighbor bonus, while the costs for burner and solar power setups scale up linearly.

```
Setup Costs For First 40MW Capacity, without modules
| Technology     | Coal Burner |    Solar    |   Nuclear   |
|:--------------:|:-----------:|:-----------:|:-----------:|
| Overhead (MW)* |           x |           0 |           z |
| Iron Plt.      |           x |           y |           z |
| Copper Plt.    |           x |           y |           z |
| Steel Plt.     |           x |           y |           z |
| Coal**         |           0 |           0 |           z |
| Stone br.      |           0 |           0 |           z |
| Space (chn.)***|           x |           y |           z |
*Overhead includes power used by mining drills, assembling machines, centrifuges without to sustain 40MW. Added costs to compensate for overhead are given in parantheses.
**Used in plastic production for advanced circuits
***Space Includes chunks used for power production and fuel production areas but not mines.

Fuel Costs Per Hour for First 40MW Capacity, without modules
| Technology    | Coal Burner |    Solar    |   Nuclear   |
|:-------------:|:-----------:|:-----------:|:-----------:|
| Overhead (MW)*|           x |           0 |           z |
| Coal          |           x |           0 |           z |
| Iron Plt.**   |           x |           0 |           z |
| Uranium Ore   |           x |           0 |           z |
*Overhead includes power used by mining drills, assembling machines, centrifuges to sustain 40MW. Added costs to compensate for overhead are given in parantheses.
**Inlcudes iron plates used to produce sulfuric acid for mining and for uranium fuel cells.
```

* **Nuclear reactors are far too expensive to maintain without the Kovarex Enrichment Process** – Obtaining one piece of Uranium-235 indeed requires centrifuging thousands of uranium ore pieces, but on the other hand 1 piece of it is enough to make 10 uranium fuel cells, which last over 30 minutes in total. In a rather eye-opening [video](https://youtu.be/Qw_NzPuccxk?t=1610) Nilaus walks us through the mathematics and from there we see that you need only 8-9 electric miners and 1 centrifuge to maintain 1 nuclear reactor continuously without the Kovarex Enrichment Process, although it does not hurt to process a little more in preparation for unlocking Kovarex or in case of bad luck during centrifuging.
* **Nuclear power is a big polluter** - In vanilla Factorio, nuclear radiation causes no damage and has no effects on biter evolution, while regular pollution does. The pollution caused by nuclear power is from mining and processing uranium ore, but it is substantially small in terms of pollution per MW when compared to coal.
* **Nuclear plants are bad for the game performance (UPS)** – While it is true that nuclear power performs unargueably worse than solar power at the massive megabase scale, there is no noticeable UPS impact from  small and medium sized nuclear plants. We explore the details of this in the section "Nuclear and UPS".

With these concerns addressed, let us look into the DIY of nuclear power.

## Designing your own Nuclear Plants

### How do I know how many components I need?

When starting out, it makes sense to start with single reactor, or perhaps a 1x2 (1 row of 2 reactors) layout. The [wiki tutorial](https://wiki.factorio.com/Tutorial:Nuclear_power) has you covered for the basics. After that, the size of your design is based on your power needs. You can arrange your reactors however you want but to get the neighbor bonus between any 2 reactors, they must be sharing a full edge. After designing your setup, the easy way to calculate the total power output for it is by making a single reactor equivalent (SRE) diagram. This process works in three steps. We can go over the steps with an example, using a setup that is among my favorites:

<!--VISUAL 3: My example design-->

(Caption: An 8-reactor design within a 3x3 reactor grid. It is the most powerful 3x3 setup that has at least 1 face of each reactor exposed for automated refueling.)

```
1) Draw a copy of your reactor arrangement and to each reactor assign a value of 1. Any empty spaces receive 0:

[1][1][1]
[1][1][1]
[1][0][1]

2) For each reactor, count the number of neighbors it has (they must be aligned exactly side by side) and add it to the 1:

[1+2][1+3][1+2] --> [3][4][3]
[1+3][1+3][1+3] --> [4][4][4]
[1+1][0+0][1+1] --> [2][0][2]

3) Sum all the numbers to get the total number of single reactor equivalents. Multiply this total by 40 to get your heat output in MW:
(3+4+3) = 10
(4+4+4) = 12
(2+0+2) = 4

10 + 12 + 4 = 26 single reactor equivalents for this setup.
26 * 40MW = 1040MW power output
```

After determining your total power output, you can decide whether you have enough reactors or a sufficiently optimal arrangement of them.

Since the reactors produce their power indirectly, in the form of heat, the next goal is to harness this heat using heat exchangers. Each heat exchanger consumes up to 10MW in terms of heat and it is best to have enough of them to harness the reactors' maximum output. Hence the number of heat exchangers needed is the total power output divided by 10.  So, in our example we have 1040MW/10MW = 104 heat exchangers.

Heat exchangers use the heat they absorb to convert up to 103.09 units of 15C water into 500C steam, every second.  The exchangers have to be supplied with water from offshore pumps, which produce at most 1200 water per second. Hence to find the number of offshore pumps you need for a group of heat exchangers, you multiply the exchanger count by (103.09/1200, which is about 11.65). If all the heat exchangers are connected to the same water network, the system would need 104/11.65 = 8.93, or 9 offshore pumps in total. In the example reactor, there are 8 water networks of 13 heat exchangers. Hence each group needs 13/11.65 = 1.12 , so a little more than 1 offshore pump each, resulting in 8x2 = 16 total. This is of course, a bit of an overkill for the sake of symmetry.

Moving on from producing steam to turning it into power, for every heat exchanger produces 103.09 steam per second while every steam turbine consumes 60, hence the ratio for them is 103.09/60 = 1.718 turbines for every exchanger. If there is a single steam network across the entire plant, our example plant would need 104 * 1.718 = 178.672, or 179 turbines. However, the example actually has 12 steam networks with either 7 or 12 heat exchangers, which respectively would need 7z1.718 = 12.026 (so 12, because the 13th turbine would have almost no utilization) or 12 * 1.718 = 20.616 (so 21) turbines.

A popular simple alternative for steam turbine placement is attaching 2 to each heat exchanger without connecting anything with pipes. This provides an excess steam consumption capacity that remains unused unless your plant has steam storage (discussed below).

And so we have all the component counts covered. If you want to learn more about the mathematics involved here, or if you want a calculator to do most of it for you, the  [Factorio Cheat Sheet](https://factoriocheatsheet.com/#nuclear-power) is the resource I'd recommend.

### What do we consider when placing the components?

In terms of where to build the nuclear plant as a whole, it is quite beneficial to build near or on water, because the plant needs tons of it. Being close to uranium is optional because necesary amounts can be easil transported via trains.

When placing down the reactors, we already know about harnessing the neighbor bonus and  calculating it using SRE diagrams. Given that we want to connect as many neighbors as possible, it would make sense to just have a huge spaceless grid of reactors, but the disadvantage of that is there being no space to set up a system for automatically refueling any of the reactors in the middle, unless you [a mod for that](https://mods.factorio.com/mod/logistics-reactor-next). Hence the most popular reactor arrangement is 2xN, where all reactors except for the corner ones have 3 neighbors, hence each has at least 1 open side for inserter access. However, you can get as creative as you want and leave 2xN behind once you have a steady supply of U-235 such that the neighbor bonus is not so critical anymore.

Your other big concern is fluid flow, and the main constraint is the heat flow along heat pipes. The farther away the heat gets from the reactors, the lower the maximum temperature the pipes can have. Since reactors temperatures cannot exceed 1000C, heat pipes beyond a certain distance become too cold to operate heat exchangers. As [the wiki shows](https://wiki.factorio.com/Tutorial:Nuclear_power#Heat_pipes) and [this post effectively visualizes](https://www.reddit.com/r/factorio/comments/ge4y6c/heat_pipe_throughput_and_a_bonus_note_on_parallel/),  a single pipe can heat a row of at most 21 heat exchangers, but you can improve the range here by making the pipe thicker and by adding heat exchangers on both sides of it instead of one side.  Another tricked used by the community here is placing unfueled nuclear reactors to act as 5x5 heat pipes because this allows travelling the same distance with fewer entities and connecting to more heat exchangers from a single entity. In any case, your best bet is to keep your heat pipes short by keeping heat exchangers nearby.

As for the other fluids, you want to ensure that the water from your offshore pumps is reaching your heat exhangers without significant [throughput loss in pipelines](https://wiki.factorio.com/Fluid_system#Pipelines), hence make sure to have multiple pipelines along the way. While it is ideal to simply have short pipelines, you can also consider using pumps. The critical number is a maximum of 17 pipe segments between every 2 pumps, in order to maintain the 1200 water/second from an offshore pump. Here it is worth noting that underground pipes pairs at any distance count as only 2 pipe segments. Secondly, you want to make sure the steam generated has enough pipe space to flow from exchangers to turbines without backing up, which is not an issue except for enormous nuclear plants and can always be solved again using more pipes or adding pumps.

### What about storing the steam?

There is some debate in the community about whether steam storage is worthwhile. It is worth noting that it is not necessary for normal plant operation, since a correct ratio of exchangers to turbines (with *just* more than enough turbines) would ensure any steam produced is being consumed while the plant is running at full capacity. Meanwhile, adding optional components for steam storage, especially at a large scale, impacts the UPS by adding more fluid calculations. The size of this impact is arguably negligibile compared to that of heat exchangers and steam turbines, based on my examinations and [these](https://www.reddit.com/r/technicalfactorio/comments/qc0npz/the_impact_of_nuclear_power_plants_on_ups/) [two](https://www.reddit.com/r/factorio/comments/s2h64o/100gw_nuclear_setup_ups_comparison_2x2_345ms_vs/) detailed explorations by technical community members (further discussed below). Meanwhile, steam storage offers some optional benefits, but whether you prefer these benefits over a little extra UPS is up to you:

In the early game when U-235 is rare, steam storage prevents fuel waste: When your power demand is low, excess steam builds up in the system. If the steam system is full, the boilers stop and the heat starts building up in the reactors, which provide an additional energy buffer up until 1000C. After that, the reactors continue to accept and burn fuel cells no matter what, hence they are wasted. A steam storage setup prevents this scenario, and it is even more effective if you set up your uranium fuel cell inserters to activate only when the steam storage is running low (you can do this with a single red/green cable between each inserter and a steam storage tank).  However, after unlocking the Kovarex Enrichment Process, uranium fuel cells become very easy to obtain and so letting the reactors heat up is not a big concern any longer, apart from the 900C safety limit perhaps.

Another reason to store steam is to use it as a power buffer: When the nuclear plant's energy demand is below 100% of what reactors supply in the form of heat, the steam buffer is filled. Then, if your steam production gets disrupted by a biter bursting a water pipe or a brief reactor fuel shortage, the buffer can keep your turbines running for a few additional seconds or minutes. Meanwhile, if you build extra steam turbines (or use the generous ratio of 2 turbines per heat exchanger) your steam buffer can be used on top of your 100% reactor heat supply in situations where there is a temporary high power demand, like a biter attack on laser turrets. Note that the same power buffering goals can be achieved also using accumulators, which are far better for UPS than turbines.

### Making your plant pretty AND pracitcal

Having covered the scientific aspects of nuclear plant design, now we can consider the artistic aspects. While it may seem like there is not much room for creativity because of all the constraints mentioned above,  you do have a lot of freedom about how you arrange your components: You can arrange your reactors in longg rows or in rings. You can make many little groups of heat exchangers and turbines attached directly without pipes, or you can have all the exchangers in a big cluster and turbines in another, bigger cluster. There is also more than a handful of ways you can arrange heat pipes around your reactor array, like a plus shape or an "H" shape or even concentric rings. Hence it becomes pretty fun to tinker with designs. Here are some examples:

<!--VISUAL 4: My gallery of heat pipe layouts-->

Another aspect of nuclear plant design is planning ahead for scaling up. You can do this by creating overlapping blueprints for a progressively upgraded nuclear plant. The small inital nuclear plant that later becomes the corner of a larger nuclear plant without having to move anything, such as the example shown below.

<!--VISUAL 5: 2x1 -> 2x2 -> 2x3 nuclear plant design -->

(Caption: A 2x1 nuclear plant (4 SRE) upgraded to a 2x2 (12 SRE) design and then to a 2x3 (20 SRE) design)

The most scalable version of this concept is of course designing fully tilable slices of 2xN platns, which become truly massive and very energy dense.

## Nuclear and UPS

Nuclear power involves quite a few calculations, but Factorio has a magnificently optimized engine. Among these opposing forces, how much nuclear becomes too much to handle? We have technical community members to thank for answering this question. Notably, u/flame_Sla on Reddit [did some benchmarking](https://www.reddit.com/r/technicalfactorio/comments/qc0npz/the_impact_of_nuclear_power_plants_on_ups/) and found out that **the UPS impact of nuclear power becomes noticeable only when working on the scale of dozens of gigawatts** or greater.

A base with such a huge power demand is typically operating at the scale of several thousands of science per minute. Of course these calculations assume a fairly beefy computer and a UPS-friendly nuclear plant design. However, the margins are wide enough to suggest that if you prioritize fickle aesthetics over UPS-bound austerity for your first few fancy nuclear plants, you are not likely to be hurt by it.

Nevertheless, some designs are certainly better for performance than others.  An  [investigation](https://www.reddit.com/r/factorio/comments/s2h64o/100gw_nuclear_setup_ups_comparison_2x2_345ms_vs/) by u/warbaque compared different large scale nuclear setups against each other. Based on findings from these two community members and others, here are some tips to keep your nuclear plants be as UPS friendly as possible:

* **Per reactor, build only as many heat exchangers and steam turbines as you need.** These machines account for the majority of the UPS drain, likely because of just how many you need but also because of the calculations they need to do. u/warbaque's various tests note that the utilization of steam turbines affects their UPS drain, but fewer turbines at 100% utilization perform better than more turbines at lower utilization. Meanwhile, some mods offer higher tier versions of these buildings so that you need fewer of them.
* **Minimize heat pipe usage**. The game's heat manager was found to be the other big UPS eater when it comes to nuclear at a mega scale. Hence your designs should be even more sensitive than usual towards keeping exchangers close to reactors.
* **Refuel reactors using bots or compressed belts.** Partially compressed transport belts have a noticeable impact on UPS due to factors like inserters chasing fuel cells across the belts. Meanwhile, a setup with stopped & compressed belts and timed inserters was seen to do almost as well as bots.
* **Minimize fluid entity usage**. While comparatively less impactful than the tips above, this is worth considering at the mega scale. It applies firstly to pumps, but also to pipes and storage tanks.
* **If you want to build a megabase, transition to solar power eventually.** In the end nuclear cannot compete with solar, which has simpler calculations and excellent performance optimizations. However, since solar power is more expensive than nuclear power in terms of setup costs and space usage, starting your large scale power production with a few GW of nuclear energy is still worth the trouble since the impact at that scale is small.

## Conclusion

Hopefully this article has been helpful with demystifying nuclear power. Hopefully it now seems easier to get into, more practical than you may have suspected, and more interesting to tinker with! I am glad that Wube made the mechanics so interesting and I must praise our wonderful tinkerer community (especially u/warbaque) for sharing their explorations, tools, and guides so that this article became possible.
