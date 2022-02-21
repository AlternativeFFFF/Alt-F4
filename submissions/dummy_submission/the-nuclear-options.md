## The Nuclear Option <author>Sir Fendi</author>

When I came across a glowing green patch of uranium ore for the first time, I realized that Factorio had some juicy stuff waiting for me somewhere down the tech tree: Nuclear energy! While in today’s world the trials and triumphs of nuclear power are hotly debated, the Factorio community similarly has its ongoing discussions on whether it is worthwhile: Going nuclear is a couple steps up in complexity from the other power options, while also being completely optional on the path to launching a rocket. Hence many players tend to not bother with diving into it, or just find a good blueprint as a blackbox and call it a day. Others hear of the warnings of the nuclear reactor as a UPS killer, or even a literal killer when it explodes dramatically, and they decide to steer clear of it. Yes, there is a lot to look out for, but you can trust in Wube: Like many other carefully balanced mechanics of the game, nuclear power is reasonably easy to get into and you can quickly make something that just works. As for the more complicated and colorful part, I have a few guidelines to offer from my own fair share of tinkering and the findings of the glowing gems of our community.

<!--Visual 1: A small nuclear setup with all the required parts, producing 40 MW.-->

### Demystifying Nuclear Power

While a whole bunch of new machines may seem daunting, at its core, a vanilla nuclear plant setup is only a little different from a burner steam power setup: You have a fuel being burned, the resulting heat creating steam, and an engine generating power from that steam. The extra complexity comes from three elements: First, the fuel used in reactors is unique and is made in multiple steps, instead of using the mined resource directly. The official wiki has a [handy tutorial](https://wiki.factorio.com/Tutorial:Nuclear_power) that covers all the basics, such as mining and centrifuging uranium ore, as well as setting up a basic single-reactor plant.

Second, unlike regular boilers, nuclear reactors do not stop burning fuel no matter what, although this is *usually* not as bad as it sounds, as I will demonstrate shortly.

Third, when you combine multiple reactors, heat and fluid management become a little more complex (but ultimately still manageable). Despite the extra math, combining reactors is where immense efficiency gains can be made. The magic comes from the neighbor bonus: if any two running reactors share a full edge with each other, both reactors get an additional 40 MW of heat output. With this being possible on up to four edges, you can get up to 500% of the original power output for the same amount of fuel! This enticing bonus is what pushes players to get inventive about managing the massive amounts of heat that is generated in huge nuclear reactor arrays. Thus, we have a system that is reasonably easy to set up, and pretty interesting to scale up and optimize.

But what about the risks?

### Nuclear Safety in Factorio: A Brief History

Nuclear power was something that Wube wanted to get around to for quite a while and they shared some early design ideas before releasing the version we know in 0.15. When they shared their first implementation attempts in [FFF#164](https://www.factorio.com/blog/post/fff-164), there was a lot of focus on heating and cooling water and steam. The early designs involved high-temperature steam being cooled and only partially consumed in turbines, then condensed back into water at 95°C in cooling towers, and then being fed back into heat exchangers. You can imagine this being difficult to balance, leading perhaps to one thing or another getting stuck pretty quickly. After a few more weeks of working on it, Wube decided around the time of [FFF#167](https://www.factorio.com/blog/post/fff-167) that dealing with so much temperature management can be avoided and that water and steam could simply be treated as two separate fluids with fixed temperatures. They also decided that none of the systems would lose heat to the environment over time.

Meanwhile, the effects of temperature on the reactor itself were also softened: At first it was hinted that a nuclear reactor that heated up uncontrollably would explode, meaning reactors would demand constant monitoring, like they do in real-life. This idea was softened before the release though, such that a nuclear plant uses its internal emergency cooling systems to dump excess heat so it never heats up beyond 1000°C, effectively allowing you to safely leave it alone. Well, mostly. Beware that it still *can* explode if it's over 900°C and gets destroyed by a reckless player or biter. If other reactors are in the vicinity, it'll lead to quite a light show:

<!--VISUAL 2: Hot reactors are safe until they aren't [please embed the video https://www.youtube.com/watch?v=l4ePIuhbiPg&ab_channel=Trupen] -->

Despite the trivialized safety, we can see that Wube has provided a nuclear system which could still get pretty interesting and risky via the added complexity from the neighbor bonus. For those who would have preferred the high-risk and more realistic approach, there are [mods](https://mods.factorio.com/mod/RealisticReactors) that offer a look into the problems of meltdowns and radiation hazards.

Now that we've seen how nuclear power is not so dangerous in the vanilla game, let's look over the other common concerns about it.

### **Common Concerns with Nuclear Power**

* **Nuclear designs and calculations are very complex** – There is nothing wrong about starting with small and simple reactors, and the rest boils down to a few rules of thumb and some ratios. In the section "Designing your own Nuclear Plants" I hope to cover the details and point to guides and tools you can use.

* **Nuclear power is too expensive to set up until the late game** – Nuclear power is unlocked with chemical science packs. While it does take some time to get everything running, nuclear power actually costs less in terms of raw materials when compared to equivalent amounts of solar power, especially when the neighbor bonus comes into play. I made an analysis about this and [posted it on Reddit](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/). I found that even with a basic 40 MW nuclear setup, you save thousands of copper and iron plates when compared to building 40 MW of solar panels and accumulators. Hence, if your power demand passes 40 MW and you don't want boiler pollution, you may find it quite profitable to get into nuclear power.

* **Nuclear power is a big polluter** - In vanilla Factorio, nuclear radiation causes no damage and has no effects on biter evolution, while regular pollution does. The pollution caused by nuclear power comes only from the mining and processing of uranium ore. I compared this to the pollution from coal power in the same [Reddit post](https://www.reddit.com/r/technicalfactorio/comments/srosza/coal_vs_solar_vs_nuclear_setup_costs_and_running/) as above. I found that nuclear power causes only 2-10% of the pollution of mining and burning coal for power.

* **Nuclear reactors are far too expensive to maintain without the Kovarex Enrichment Process** – Obtaining one piece of Uranium-235 indeed requires centrifuging over 1000 uranium ore pieces, but on the other hand a single piece of it is enough to make 10 uranium fuel cells, which last over 33 minutes in total. In a rather eye-opening [tutorial video](https://youtu.be/Qw_NzPuccxk?t=1610), Nilaus walks us through the mathematics, and from there we see that you only need eight electric miners and one centrifuge to maintain one nuclear reactor continuously without the Kovarex Enrichment Process, although it does not hurt to process a little more uranium in preparation for unlocking Kovarex or in case of bad luck during centrifuging. In addition, placing any productivity modules you can get in the centrifuges and fuel assemblers improves your yield significantly.

* **Nuclear plants are bad for the game performance (UPS)** – While it is true that nuclear power performs unarguably worse than solar power at the massive megabase scale, there is no noticeable UPS impact from small and medium sized nuclear plants. We explore the details of this in the section "Nuclear and UPS".

With these concerns addressed, let us look into the DIY of nuclear power.

### Designing your own Nuclear Plants

#### How do I know how many components I need?

When starting out, it makes sense to start with a single reactor, or perhaps a 1x2 (1 row of 2 reactors) layout. The [wiki tutorial](https://wiki.factorio.com/Tutorial:Nuclear_power) has you covered for the basics. After that, the size of your design is based on your power needs. You can arrange your reactors however you want, but to get the neighbor bonus between any two reactors, they must be sharing a full edge. After designing your setup, the easy way to calculate the total power output for it is by making a single reactor equivalent (SRE) diagram. This process works in three steps. We can go over the steps with an example, using a setup that is among my favorites:

<!--VISUAL 3: A design I made with 8 reactors in a 3x3 grid. It is the most powerful 3x3 setup (1040 MW output) that has at least 1 face of each reactor exposed for automated refueling.-->

1) Draw a copy of your reactor arrangement and to each reactor assign a value of 1. Any empty spaces receive 0:

```
[1][1][1]
[1][1][1]
[1][0][1]
```

2) For each reactor, count the number of neighbors it has (they must be aligned exactly side by side) and add it to the 1:

```
[1+2][1+3][1+2] --> [3][4][3]
[1+3][1+3][1+3] --> [4][4][4]
[1+1][0+0][1+1] --> [2][0][2]
```

3) Sum all the numbers to get the total number of single reactor equivalents. Multiply this total by 40 to get your heat output in MW:

```
(3+4+3) = 10
(4+4+4) = 12
(2+0+2) = 4

10 + 12 + 4 = 26 single reactor equivalents for this setup.
26 * 40 MW = 1040 MW power output
```

After determining your total power output, you can decide whether you have enough reactors or a sufficiently optimal arrangement of them. However, this is only the beginning of the design process. Next, we have to turn reactor heat into steam using heat exchangers, which we will need to supply with water from offshore pumps. Then, the steam needs to be consumed by steam turbines.

Since the reactors produce their power indirectly, in the form of heat, we need to harness this power using heat exchangers. Each heat exchanger consumes up to 10 MW in terms of heat, and it is best to have enough of them to harness the reactors' maximum output. Hence, the number of heat exchangers needed is the total power output in MW divided by 10. So, in our example we have 1040 MW / 10 MW = 104 heat exchangers.

Heat exchangers use the heat they absorb to convert up to 103.09 units of 15°C water into 500°C steam, every second. The exchangers have to be supplied with water from offshore pumps, which produce at most 1200 water per second. Hence one offshore pump supports `1200/103.09` heat exchangers, or about 11.64 of them. Therefore you can find how many offshore pumps a group of heat exchangers needs by dividing their count by 11.64. Looking at our example, if all the heat exchangers are connected to the same water network, the network would need `104/11.64 = 8.93`, or 9 offshore pumps in total. However, in the example reactor there are 8 water networks of 13 heat exchangers. Hence each group needs `13/11.64 = 1.12`, so a little more than 1 offshore pump each. I went for 2 each, meaning `2x8 = 16` in total.

Moving on from producing steam to turning it into power, every heat exchanger produces 103.09 steam per second while every steam turbine consumes 60 steam per second. Hence the ratio for them is `103.09/60 = 1.718` turbines for every exchanger. If there is a single steam network across our example plant, it would need `104x1.718 = 178.672`, (so 179) turbines. However, the example actually has 12 steam networks with either 7 or 12 heat exchangers, which respectively would need `7x1.718 = 12.026` (so 12, because the 13th turbine would have almost no utilization) or `12x1.718 = 20.616` (so 21) turbines.

A popular simple alternative for steam turbine placement is attaching two to each heat exchanger without connecting anything with pipes. This provides an excess steam consumption capacity that remains unused unless your plant has steam storage (discussed below).

And so all the component counts are covered. If you want to learn more about the mathematics involved here, or if you want a calculator to do most of it for you, the [Factorio Cheat Sheet](https://factoriocheatsheet.com/#nuclear-power) is the resource I'd recommend.

#### What do we consider when placing the components?

In terms of where to build the nuclear plant as a whole, it is quite beneficial to build near or on water, because the plant needs tons of it. Being close to uranium is optional because it can be easily transported via trains.

Next is the question of arranging the reactors. We already know about harnessing the neighbor bonus and calculating it using SRE diagrams. Given that we want to connect as many neighbors as possible, it would make sense to just have a huge spaceless grid of reactors, but the disadvantage of that is there being no space to set up a system for automatically refueling any of the reactors located in the middle, unless you use [a mod for that](https://mods.factorio.com/mod/logistics-reactor-next). Thus, in an ideal setup, all reactors have neighbors on three sides and have the fourth side open for inserters to add/remove fuel cells. The 2xN setup is massively popular because it achieves exactly this, for every reactor except for the corner ones.

Your other big concern is fluid flow, and the main constraint is the heat flow along heat pipes. The farther away the heat gets from the reactors, the lower the maximum temperature the pipes can have. Since reactor temperatures cannot exceed 1000°C, heat pipes beyond a certain distance become too cold to operate heat exchangers. As [the wiki shows](https://wiki.factorio.com/Tutorial:Nuclear_power#Heat_pipes) and [this post effectively visualizes](https://www.reddit.com/r/factorio/comments/ge4y6c/heat_pipe_throughput_and_a_bonus_note_on_parallel/), a single pipe can heat a row of at most 21 heat exchangers, but you can improve the range here by making the pipe thicker and by adding heat exchangers on both sides of it instead of one side. Another tricked used by the community here is placing unfueled nuclear reactors to act as 5x5 heat pipes because this allows travelling the same distance with fewer entities and connecting to more heat exchangers from a single entity. In any case, it is best to keep your heat pipes short by keeping heat exchangers near the reactors.

As for the other fluids, you want to ensure that the water from your offshore pumps is reaching your heat exchangers without significant [throughput loss in pipelines](https://wiki.factorio.com/Fluid_system#Pipelines), hence make sure to have multiple pipelines along the way. Throughput loss can be observed when your heat exchangers don't have enough fluid input while the offshore pump output is below 1200/second. While the ideal approach is to simply have short pipelines, you can also consider using pumps. The critical number is a maximum of 17 pipe segments between every two pumps, in order to maintain the 1200 water/second from an offshore pump. Here it is worth noting that underground pipes pairs at any distance count as only two pipe segments. Secondly, you want to make sure the steam generated has enough pipe space to flow from exchangers to turbines without backing up, which is not an issue except for enormous nuclear plants. Generally, adding more pipes from heat exchangers to turbines is easier than adding pumps, as noted in [this post](https://www.reddit.com/r/factorio/comments/sbse5k/do_you_have_hard_time_estimating_pipeline/) by *u/warbaque* on Reddit.

#### What about storing the steam?

There is some debate in the community about whether steam storage is worthwhile. It is worth noting that it is not necessary for normal plant operation, since a correct ratio of exchangers to turbines (with *just* more than enough turbines) would ensure any steam produced is being consumed while the plant is running at full capacity. Meanwhile, adding optional components for steam storage, especially at a large scale, complicates your plant design. More importantly, it impacts the UPS by adding more fluid calculations. The size of this impact is arguably small compared to that of heat exchangers and steam turbines, based on my examinations and [these](https://www.reddit.com/r/technicalfactorio/comments/qc0npz/the_impact_of_nuclear_power_plants_on_ups/) [two](https://www.reddit.com/r/factorio/comments/s2h64o/100gw_nuclear_setup_ups_comparison_2x2_345ms_vs/) detailed explorations by technical community members (further discussed below). Meanwhile, steam storage offers some optional benefits but it is up to you to decide if you prefer these benefits at the cost of some extra space and UPS.

In the early game when U-235 is slow to obtain, steam storage prevents fuel waste: When your power demand is low, excess steam builds up in the system. If the steam system is full, the boilers stop and the heat starts building up in the reactors, which provide an additional energy buffer up until 1000°C. After that, the reactors continue to accept and burn fuel cells no matter what, wasting them. A steam storage setup prevents this scenario, and it is even more effective if you configure your uranium fuel cell inserters to activate only when the steam storage is running low (you can do this with a single red/green cable between each inserter and a steam storage tank). However, after unlocking the Kovarex Enrichment Process, uranium fuel cells become very easy to obtain and so letting the reactors heat up and dump heat is not a big concern any longer. However, you might still want to keep the steam storage after Kovarex if you want to keep your reactors below 900°C for safety reasons.

Another reason to store steam is to make a "steam battery" as type of power buffer: When the nuclear plant's energy demand is below 100% of what reactors supply in the form of heat, the steam buffer is filled. Then, if your steam production gets disrupted by a biter bursting a water pipe or a brief reactor fuel shortage, the buffer can keep your turbines running for a few additional seconds or minutes. Meanwhile, if you build extra steam turbines (or use the generous ratio of two turbines per heat exchanger) your steam buffer can be used on top of your 100% reactor heat supply in situations where there is a temporary high power demand, like a biter attack on laser turrets. Note that the same power buffering goals can be achieved also using accumulators, which are far better for UPS than turbines. Also note that every steam turbine added to a power grid is listed as extra capacity in the power overview menu regardless of its steam supply. This means that if you have an excess of turbines and an emptied steam buffer, you will be unable to supply as much power as listed in the overview even though your reactors are running at full capacity.

#### Making your plant pretty *and* practical

Having covered the scientific aspects of nuclear plant design, now we can consider the artistic aspects. While it may seem like there is not much room for creativity because of all the constraints mentioned above, you do have a lot of freedom about how you arrange your components. The biggest setback here is the neighbor bonus, which makes it difficult to prefer any setup other than 2xN. However, if you are willing to sacrifice some neighbor bonus efficiency (especially when fuel is abundant after unlocking Kovarex) you can get creative and arrange your reactors in rings or fractals.

As for other components, you can make many little groups of heat exchangers and turbines attached directly without pipes, or you can have all the exchangers in a big cluster and turbines in another, bigger cluster. There is also a few ways you can arrange heat pipes around your reactor array. Here are some examples for arranging a 2x2 plant:

<!--VISUAL 4A/4B/4C (Gallery): All of these setups produce 480 MW of heat while they have different arrangements. Note that differences in heat exchanger grouping can lead to overall steam turbine counts changing slightly. -->

Another aspect of nuclear plant design is planning for scaling from the start. You can do this by creating overlapping blueprints for a progressively upgraded nuclear plant. For example, you can reserve a big space for a 2x3 plant, but at first only build a 2x1 starter plant, as shown in the images below. When designing such blueprints, it is easier to first build the biggest plant and then selectively delete parts to scale it down.

<!--VISUAL 5A/5B/5C (Gallery): The first blueprint is a 2x1 plant. The second blueprint makes it a 2x2 plant and adds steam storage. The third blueprint expands the reactor setup to 2x3 and adds more than enough steam turbines to allow using the steam buffer to temporarily produce more power than usual. -->

Overlapping upgrades is just one way to plan for large reactor designs. You can also create blueprints of heat exchanger and turbine sets to just place down every time you add a new reactor to your plant. The most scalable version of this concept is to design fully tileable slices of 2xN plants, which become incredibly wide because of all the exchangers and turbines you need to fit side by side.

### Nuclear and UPS

Nuclear power involves quite a few calculations, but Factorio has a magnificently optimized engine. Among these opposing forces, how much nuclear becomes too much to handle? We have technical community members to thank for answering this question. Notably, *u/flame_Sla* on Reddit [did some benchmarking](https://www.reddit.com/r/technicalfactorio/comments/qc0npz/the_impact_of_nuclear_power_plants_on_ups/) and found that the UPS impact of nuclear power becomes noticeable only when working on the scale of 10s of GW or greater.

A base with such a huge power demand is typically operating at the scale of several thousand units of science per minute. Of course these calculations assume a fairly beefy computer and a UPS-friendly nuclear plant design. However, the UPS budget is generally high enough to suggest that you would be fine if you prioritize aesthetics over UPS for your first 5-10 GW of nuclear power.

Nevertheless, some designs are certainly better for performance than others. In [another benchmarking investigation](https://www.reddit.com/r/factorio/comments/s2h64o/100gw_nuclear_setup_ups_comparison_2x2_345ms_vs/), *u/warbaque* compared different large scale nuclear setups against each other. Based on the findings and experiences of these two community members, I have compiled this list of guidelines to make your nuclear plant designs as UPS friendly as possible:

* **Per reactor, build only as many heat exchangers and steam turbines as you need** - These machines account for the majority of the UPS drain (around 80% of an optimized setup), likely because of just how many you need but also because of the calculations they need to do. *u/warbaque*'s various tests note that the utilization percentage of steam turbines affects their UPS drain, but fewer turbines at 100% utilization perform better than more turbines at lower utilization. Meanwhile, some mods offer higher tier versions of these buildings so that you need fewer of them.

* **Minimize heat pipe usage** - The game's heat manager was found to be the other big UPS eater (around 20% of an optimized setup). The number of heat connections is main factor to consider, meaning that heat pipes should be as short as possible and be only one tile thick.

* **Refuel reactor arrays using bots or clocked belts** - While bots may sounds less UPS-efficient than belts, the issue with using belts is inserter tracking, which is when the inserters try to catch moving items on belts. This issue occurs a lot when you have a long belt servicing many reactors. It causes an extra 6% of UPS overhead to an optimized setup. The way around the issue is to use bots to deliver fuel cells. Alternatively, you can use a transport belt that is not looping and inserters that are "clocked", meaning that they are timed using circuit networks such that they all take from the belt at once and then wait for the belt to fill up before they are allowed to take again.

* **Minimize fluid entity usage, particularly pumps** - In an optimized setup, the fluid system accounts for less than 1% of UPS drain. On the other hand, a setup with pressurized steam pipes (one pump per two exchangers) had an extra UPS overhead of 15%. Hence it is preferable to use very few pumps, while afterwards one may consider removing storage tanks (starting from steam storage).

* **If you want to build a megabase, transition to solar power eventually** - In the end nuclear cannot compete with solar, which has simpler calculations and excellent performance optimizations. However, since solar power is more expensive than nuclear power in terms of setup costs and space usage, starting your large scale power production with a few GW of nuclear energy is still worth the trouble since the impact at that scale is small.

Given these guidelines, you'll notice that the designs featured in earlier images are not the most UPS friendly. They don't have to be, unless you are going to build several copies of them. Nevertheless, lets see how the design changes when we apply these guidelines to an example.

<!--VISUAL 6A/6B (slider comparison): To optimize for UPS we have removed non-essential heat pipes and steam storage. We also reduced the steam turbine count to fit the 1.718 ratio with heat exchangers. -->

### Conclusion

After going through the nuts and bolts nuclear power, hopefully it now seems easier to get into, more practical than you may have suspected, and more fun to tinker with! I am glad that Wube made the mechanics so interesting and I must praise our wonderful tinkerer community (especially *u/warbaque* and *u/flame_Sla* on Reddit) for sharing their explorations, tools, and guides so that this article became possible.
