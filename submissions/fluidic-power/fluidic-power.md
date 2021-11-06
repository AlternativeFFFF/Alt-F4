## The [Fluidic Power](https://mods.factorio.com/mod/FluidicPower) Experiment: Part 2 <author>stringweasel</author>

### What is it again?

In [last week's article](https://alt-f4.blog/ALTF4-51/) I talked about the history of Power Network overhaul mods and my own take on it called Fluidic Power. It's recommended that you read that article first, but in a nutshel, I made Factorio's power distribution more realistic by simulating it as a fluid - by using the already built-in fluid simulation.

[PICTURE OF SOME FACTORY]



### Is the performance playable?

There is a reason why electricity is implemented in Factorio the way it is. It allows us to build gigantic factories so big that that still blows my mind. And adding more realistic power might inhibit performance significantly, especially after Rseding91's quote. So what will Factorio's performance be if there's fluid flowing through each and every power pole. For that I built a pure Fluidic Power base to benchmark with - with the help of my friend JanKrater. 

My goal for this benchmarking base was to think of the most performance efficient way to build a base, and then do the exact opposite. This resulted in a spaghetti base with way too many power poles, very convoluted belts, and way too many power hungry laser turrets. Importantly though, it manages to produce science at an steady 45 SPM, and draws about 600MW.

{ 
    Map view to save file 
    caption: The benchmark Spaghetti Base running at 45 SPM
}

Factorio is designed to run at 60 updates per second (referred to as UPS), and my benchmark can run at 70 UPS on my old PC (i7-4770k 3.5GHz CPU, RAM TODO ???). This means that it takes `~14ms` to update the whole base once, called one tick. This number is also shown below in the "show-time-usage" debug output. Interestingly it also shows that my mod script (`mod-FluidicPower`) has a neglible effect on the performance (`~0.05ms`). This is because the calculations my mod actually do is minimal, because it offloads the all the hard calculations to the game engine which then do more fluid and power calculations.

![In-game "show-time-usage" and "show-entity-time-usage" information of the 45 SPM Spaghetti Base](media/show-time-usage.png)

In the output above the game can tell you where most of the updating time is spent, and it initially confused me that game seemingly spends most of the it's time in the `Electric Network`. My expectation was that the `Fluid Manager` would take be the biggest calculation hit, but instead the output shows that the `Electric Network` (`~10ms`) is using over 70% of the update time (`~13.7ms`), and the `Fluid Manager` (`~0.03ms`) seems not to be doing anything at all. This doesn't make any sense, because the amount of fluid calculations should be a massive performance drain. So I headed to the [Technical Factorio](reddit.com/r/technicalfactorio) community who are experts in the field of optimization - where they squeeze Factorio's performance to it's absolute limits. Here the brilliant mathematician SteveTrov explained to me why the in-game time usage can be misleading if you don't know how it works behind the scenes. He described it as:

{
    quote

    "Firstly the time usage stats are confusing because the fluid and electric network update are run in parallel threads. This is roughly what happens most of the time:

    1. The electric network thread is started and the electric network update timer is started. 
    2. The heat update thread is stated
    3. Multiple fluid update threads are started. 
    4. When the electric update thread finishes the time used is recorded under electric network update. The fluid update timer is effectively started now
    5. When the fluid threads have all finished (they normally do before step 4) the fluid update timer is stopped. 

    So the effect of this is that the fluid update time is nealy always very low."

    - SteveTrov 
    - [source](https://discord.com/channels/579345487371567105/579346716243787782/855875612274851881)
}

This essentially means that the Fluid Manager's time usage information is entangled in the Electric Network's and Heat Manager's time usage. It's [not possible](https://discord.com/channels/579345487371567105/579345487837003836/784493971824312340) to calculate an accurate metric as to which part takes the most processing time without a changing the Factorio game engine itself. I need another approach.

An UPS expert called [flame_Sla](https://www.reddit.com/r/technicalfactorio/comments/ks2xtk/20k_spm_201000spm_belts_v30/) then suggested that I download the [Very Sleepy Profiler](http://www.codersnotes.com/sleepy/) to see detailed information about which C++ functions are called most often. Their community often use this tool optimize the worlds most largest and most UPS efficient megabases. In the output of the tool below you can see the C++ functions that take the most time listed in descending order. flame_Sla did also mention not to focus on the absolute time shown, but rather use it as an metric to see the biggest culprits.

![Output of the Very Sleepy profiling tool running on my spaghetti Fluidic Power benchmarking base](media/sleepy-cs-output.png)

This showed something that I did not really expect. The fluid system (`FluidSystem::update`) was one of the main culprits, but the Electric Network was _still_ taking even more processing time! It turns out the main problem is `FlowStatistics<ID<...>...>::onFlow` which is called mostly by the electric network. These [flow statistics](https://lua-api.factorio.com/latest/LuaFlowStatistics.htm) are simply used to t statistics so that you can view it on a graph, eg. for power production. This means that that the game is not only slowing down because of all the new fluid calculations, but also because all the new graphs to draw!

It's very likely that Electric Network statistics collection could take a significant amount of processing time in Fluidic Power. The Factorio engine is built to only have a handful of electric networks, normally even only one. The game needs to collect and update information for every power network you have, which will be only a few of datasets. So instead of having a handful of networks Fluidic Power is designed so that _each and every_ power pole is a single electric network. The Factorio engine will then attempt to collect statistics for each of these electric networks - which in my benchmark save is about 3000! That's at least 100 times more networks to collect statistics on (or usually). This has been a known limitation for some other mods, for example the [Ruins mod](https://github.com/Bilka2/AbandonedRuins/issues/20), but Fluidic Power takes this to a new extreme. However, we still don't know the impact of these calculations _relative_ to the fluid calculations. Does the collecting of statistics really take that more time than fluid calculations?

Then flame_Sla mentioned that he once measured the Fluid Manager's time usage accurately on the world's biggest megabase, and saw that it only used `~0.4ms` for a [40KSPM 50UPS megabase](https://www.reddit.com/r/factorio/comments/nmxayx/new_ups_record_40k_spm_60_ups_no_mods_details_in/)! The way he achieved this is by _eliminating_ the Electric Network from the time usage, which he achieved by changing all machines to [run on wood as fuel](https://discord.com/channels/579345487371567105/579346716243787782/825170120162148383). Due to how Fluidic Power works I cannot easily eliminate the effect of the Electric Network without the Fluid Manager's load reducing, but I can do it the other way around! I can remove all the fluid components, and replace them with EEIs to supply or drain the power. This will cleanly elimiate all added fluid computations without removing the strenuous load on the Electric Network - which is very important! In order to record an accurate and comparable time usage metric I also attempted to force Factorio to [run on a single core](https://www.reddit.com/r/technicalfactorio/comments/mead38/how_to_turn_off_multithreading_to_get_more_useful/). So I ran I quick script to replace the hidden fluid components in the power poles and the result are as follows:

<center>

caption: Table showing timing results of unmodified baseline benchmark compared to the modified benchmark where all fluid components are removed.

|                  	| Baseline 	| Modified 	| Difference 	|
|------------------	|:--------:	|:--------: |:-----------:|
| Electric Network 	| 9.3ms    	| 9.2ms     | 0.1ms      	|
| Heat Manager     	| 0.03ms   	| 0.03ms    | 0ms        	|
| Fluid Manager    	| 0.13ms   	| 0.08ms    | 0.05ms     	|
| **Total**         | **9.46ms**|**9.31ms** | **0.15ms**    |
||

</center>

This shows that the effect that _all_ the extra fluid computations added by Fluidic Power in this benchmark is roughly `~0.15ms`! This number is probably still not very accurate because it's in the noise margins of the spaghetti base, the test is not ideal, and measuring time in parallel threads is innacurate but it gives us a good indication. This proves the Electric Networks has the biggest impact is on performance by far, and  that the extra fluid calculations are almost neglible! It makes one wonder what performance we could achieve with the Electric Network not unnecesarily collecting statistics - perhaps enormeous Fluidic Power megabases with (gigantic transformer substations)[COOL REAL PICTURE].

All-in-all Fluidic Power performs much better than I expected. And any slowdowns perceived will mainly be caused by the many Electric Networks collecting statistics, and not the fluid computations itself. Therefore, you will likely be able to launch a rocket without having your UPS dropping below 60 UPS. You could probably even build quite a bit bigger if done efficiently (I've achieved 90SPM at 220UPS!), and the mod won't neccesarily TANK your UPS as Rseding predicted. Factorio is luckily really well designed and optimized, even when not running as it was intended. This proves that Fluidic Power is definitely playable performance wise, but that's notthe only aspect that counts.

### Should you play it?

Personally, I think [Fluidic Power](https://mods.factorio.com/mod/FluidicPower) creates a really fun challenge. It's maybe not a good fit you're planning on building a long duration megabase at the moment. However, if you're looking for an interesting adventure playthrough with new challenges then this mod might be for you. I really enjoyed all the new obstacles to overcome. For example, the machines furthest away from your steam engines shuts down first, which is usually your coal patch which _feeds your boilers_. Or if you defend with laser turrets you need to ensure there's enough transformers to supply power at the correct voltage.

However, my favourite part of this mod by far is knowing that there is actual electricity flowing through the power poles. You can even see the movement of intermittent brownouts when you're base is pulling a lot of power, like many laser turrets firing at once. It's similar to the feeling I get seeing a circuit I designed and knowing it's working because of the fluid-like motion of electrons through the copper and silicon. It builds on the feeling of seeing your complex networks of belts working together to build a rocket. It makes the factory feel more alive, you can essentially see it's heartbeat, and it's really satisfying.