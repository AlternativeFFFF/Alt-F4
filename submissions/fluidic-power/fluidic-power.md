## The [Fluidic Power](https://mods.factorio.com/mod/FluidicPower) Experiment: Part 2 <author>stringweasel</author>

### What is it again?

In [last week's article](https://alt-f4.blog/ALTF4-51/) I talked about the history of Factorio power network overhaul mods and how they worked, and then explained my own take on it called Fluidic Power. It's recommended that you read that article first, but in a nutshell, I made Factorio's power distribution more realistic by simulating it as a fluid - using the already built-in fluid simulation mechanics. This means you need to use transformers to minimize voltage drop over distance. It also means that, for example, it is more work to keep your laser turrets firing at 100%, or to build highly beaconed setups.

![An exmaple of biters attacking an outpost with \"show-fluid-box-info\" turned on. The green bar shows the fluid level and blue shows the fluid speed. Notice the lasers intermittently turning off.](media/biters-attack.mp4)

These new limitations mean that Fluidic Power achieved its goal of creating a new game mechanic that more closely resembles realistic electricity. However, it does introduce significantly more performance overhead with all the new fluid calculations required. I didn't want to put a mod on the mod portal that will bring your PC to a halt if you built a decently sized factory. So therefore I set out to do some research. Do the extra fluid calculations really have a significant impact?

### Is the performance playable?

There is a reason why Factorio implements electricity the way it does. It allows us to build [absolutely gigantic factories](https://forums.factorio.com/viewtopic.php?f=204&t=60816) at such a scale that you can get lost in them. Adding more realistic power might inhibit performance so significantly that you'd have to build smaller factories, and nobody wants to do that. So the question is: What would Factorio's performance actually be like if there was fluid flowing through each and every power pole. I needed a benchmark map, so I set out to build a pure Fluidic Power base with the help of my friend JanKrater.

My goal for this base was to think of the most performance efficient way to build a base, and to then do the exact opposite (well, mostly). This resulted in a spaghetti base with way too many power poles, very convoluted belts, and way too many power-hungry laser turrets. Very importantly though, it manages to produce a steady 45 science per minute, and it draws about 600 MW with not a single efficiency module in sight.

{
    Map view to save file (it's in the media folder)
    caption: The benchmark Spaghetti Base running at 45 SPM
}

Normally, Factorio runs at about 60 updates per second (referred to as UPS), and I managed to push this benchmark map to run at 70 UPS on my old-ish PC (i7-4770k 3.5GHz CPU, DDR3-1600MHz RAM). This means that it takes about `~14ms` to update the whole base once, called one tick, where for 60 UPS the maximum amount of time per update can be `1/60 = ~16.6ms`. This number is also shown below in the "show-time-usage" debug output. Interestingly, it also shows that my mod script (`mod-FluidicPower`) has a neglible effect on the performance (`~0.05ms`). This is possible because my mod makes very few calculations, as it's able to offload all the expensive fluid and power calculations to the optimized game engine. The main timing information to look at is `Fluid Manager` and `Electric Network`.

![In-game "show-time-usage" and "show-entity-time-usage" information of the 45 SPM Spaghetti Base](media/show-time-usage.png)

In the output above the game tells you where most of the time is spent, and it initially confused me that game seemingly spends most of its time in the `Electric Network`. My expectation was that the `Fluid Manager` would take the biggest performance hit, but instead the output shows that the `Electric Network` (`~10ms`) is using over 70% of the update time (`~13.7ms`), and that the `Fluid Manager` (`~0.03ms`) doesn't seem to be doing anything at all. This doesn't make any sense, because I expected the amount of fluid calculations to be a massive performance drain. I headed to the [Technical Factorio](reddit.com/r/technicalfactorio) community, where they push Factorio's performance to its absolute limit. Here, the brilliant mathematician SteveTrov explained to me why the in-game time usage can be misleading if you don't know how the timing calculations are actually implemented. He described it as such:

{
    quote

    "Firstly, the time usage stats are confusing because the fluid and electric network update are run in parallel threads. This is roughly what happens most of the time:

    1. The electric network thread is started and the electric network update timer is started.
    2. The heat update thread is stated
    3. Multiple fluid update threads are started.
    4. When the electric update thread finishes the time used is recorded under electric network update. The fluid update timer is effectively started now
    5. When the fluid threads have all finished (they normally do before step 4) the fluid update timer is stopped.

    So the effect of this is that the fluid update time is nearly always very low."

    - SteveTrov
    - [source](https://discord.com/channels/579345487371567105/579346716243787782/855875612274851881)
}

This essentially means that the Fluid Manager's time usage information is entangled in the Electric Network's and Heat Manager's time usage. It's [not possible](https://discord.com/channels/579345487371567105/579345487837003836/784493971824312340) to calculate an accurate metric as to which part takes the most processing time without changing the Factorio game engine itself. I need another approach to know if the `Electric Network` really is taking more processing time than the `Fluid Manager`, and if so, by how much?

An UPS expert called [flame_Sla](https://www.reddit.com/r/technicalfactorio/comments/ks2xtk/20k_spm_201000spm_belts_v30/) then suggested that I download the [Very Sleepy Profiler](http://www.codersnotes.com/sleepy/) to see detailed information about which of the Factorio engine's C++ functions are called most often. Their community often use this tool to optimize the world's largest and most UPS efficient megabases. In the output of the tool below you can see which C++ functions take the most time, listed in descending order. *flame_Sla* did also mention not to focus on the absolute times shown, but to rather use it as a metric which the biggest culprits can be identified with.

![Output of the Very Sleepy profiling tool running on my spaghetti Fluidic Power benchmarking base. On the right is one instance of the call stack of the selected function.](media/sleepy-cs-output.png)

This showed something that I didn't really expect. The fluid system (`FluidSystem::update`) was only in the top 10 worst timed functions, and the Electric Network was _still_ taking more processing time! It turns out the main problem was `FlowStatistics<ID<...>...>::onFlow`, which is mostly called by the electric network. These [flow statistics](https://lua-api.factorio.com/latest/LuaFlowStatistics.html) collect the data necessary to view the game's graphs, eg. the power production window. This means that the game is not only slowing down because of all the new fluid calculations, but also to collect information to draw the graphs for all the new power networks!

It's very likely that the collection of `Electric Network` statistics could take a significant amount of processing time with Fluidic Power. The Factorio engine is designed to only have a handful of electric networks, or even just a single one. The game needs to collect and update information for every power network you have, which will normally only be a few distinct datasets. So instead of having a handful of networks, Fluidic Power is designed so that _each and every_ power pole is a single electric network. The Factorio engine will then attempt to collect statistics for each of these electric networks - which is about 3000 electric networks in my benchmark save! That's at least 100 times more networks to collect statistics on than Factorio is designed for. This has been a known limitation for some other mods, but Fluidic Power takes this to a new extreme. However, we still don't know the impact of these calculations _relative_ to the fluid calculations. Does the collecting of statistics really take that much more time than the fluid calculations themselves?

*flame_Sla* mentioned that he once managed to measure the Fluid Manager's time usage on the world's biggest megabase, and that it only used `~0.4ms` for a [40KSPM 60UPS megabase](https://www.reddit.com/r/factorio/comments/nmxayx/new_ups_record_40k_spm_60_ups_no_mods_details_in/)! That means only 2.5% of the update time was spent on fluid calculations! The way he isolated the Fluid Manager's time usage from the Electric Network is by completely _eliminating_ the Electric Network from the measurement. He achieved this by changing all machines to [run on wood as fuel](https://discord.com/channels/579345487371567105/579346716243787782/825170120162148383) which meant no more electricity was used and the Electric Network was idle. Due to how Fluidic Power works, I cannot easily eliminate the effect of the Electric Network the same way without also reducing the Fluid Manager's load, but I can do it the other way around! I can remove all the _fluid_ components, and replace them with EEIs that supply or drain the power. This will cleanly eliminate all added fluid computations without removing the strenuous load on the Electric Network by making sure the factory is still running normally. In order to record an accurate and comparable time usage metric I also attempted to force Factorio to [run on a single core](https://www.reddit.com/r/technicalfactorio/comments/mead38/how_to_turn_off_multithreading_to_get_more_useful/). I ran a quick script to replace the power poles' hidden fluid components for this test and the result are as follows:

<center>

caption: Table showing timing results of unmodified baseline benchmark compared to the modified benchmark where all fluid components are removed.

|                  	| Baseline 	| Modified 	| Difference 	|
|------------------	|:--------:	|:--------: |:-----------:|
| Electric Network 	| 9.3ms    	| 9.2ms     | 0.1ms      	|
| Heat Manager     	| 0.03ms   	| 0.03ms    | 0ms        	|
| Fluid Manager    	| 0.13ms   	| 0.08ms    | 0.05ms     	|
| **Total**         | **9.46ms**|**9.31ms** | **0.15ms**    |

</center>

This shows that _all_ the extra fluid computations from Fluidic Power in this benchmark only take roughly `~0.15ms`! This number is probably still not very accurate as it's within the noise margins of the spaghetti base, the test is not ideal, and measuring time in parallel threads is inaccurate. However, it does give us a good indication of where most processing time is going. This proves that the electric network does have the biggest impact on performance by far, and that the extra fluid calculations are almost negligible. It makes one wonder what performance could be achieved if the electric network didn't unnecessarily collect statistics - perhaps we'd see enormous Fluidic Power megabases with gigantic transformer substations next to nuclear reactors and massive solar panel arrays.

All in all, Fluidic Power performs much better than I had expected. Any perceived slowdowns will mainly be caused by the many electric networks collecting statistics, and not the fluid computations themselves. You will still likely be able to launch a rocket without having your UPS drop below 60 UPS. You could probably even build quite a bit bigger if you have an efficient layout (I've achieved 90SPM at 220UPS!), and the mod won't neccesarily *tank* your UPS as *Rseding1* predicted. Factorio is luckily really well designed and optimized, even when not running as intended. This proves that Fluidic Power is definitely playable performance-wise, but that's not the only aspect that counts.

### Should you play it?

Personally, I think [Fluidic Power](https://mods.factorio.com/mod/FluidicPower) creates a really fun challenge. It's maybe not for you if you're planning on building a long-lived megabase, but if you're looking for an interesting [adventure playthrough](https://www.reddit.com/r/factorio/comments/qna0s7/comment/hjinkhd/) with new challenges then this mod might just be for you. I really enjoyed overcoming all the new gameplay obstacles it creates. For example, the machines furthest away from your steam engines shut down first, which are usually the electric mining drills on your coal patch that _feed your boilers_. I hadn't ever experienced such a dangerous coal death spiral before. Or, if you defend your walls with laser turrets, you'll need to ensure there are enough transformers to supply power at the correct voltage.

However, my favourite part of this mod by far is knowing that there is actual electricity flowing through the power poles. You can even see the waves of intermittent brownouts over your machines when your base is pulling too much power, like when many laser turrets fire at once. It's similar to the feeling I get when I look at a circuit I designed, while knowing it's working because of the fluid-like motion of electrons through the copper and silicon. It builds on the feeling of seeing your complex networks of belts working together to build a rocket. It makes the factory feel more alive. You can basically see its steady heartbeat, and it's really satisfying.
