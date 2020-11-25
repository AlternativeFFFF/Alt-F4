## 1.1 Performance Improvements <author>Therenas</author>

The most recent experimental version of Factorio brought with it many changes, one of which I want to take a closer look at today. It's meekly hiding away in the [1.1 changelog](https://forums.factorio.com/viewtopic.php?p=521942#p521942) and hasn't been mentioned in the FFF's preceeding the release. It's just four words: `Multithreaded belt update logic`. I'm here to find out what that means, and what impact it actually has.

### How does this optimization work on a technical level?

Now, you might not have any concept of what it means to 'multithread' game logic. Why not just multithread everything, so the game can take advantage of all the cores your PC has? Well, it's not that simple, turns out. In general, the game needs to update all the machines, belts, pipes, etc every tick. That's how time actually progresses in-game, allowing you to play in the first place. The order in which this happens is important. First the belts move items in the direction of the belt, then an inserter picks one up and puts it into a machine, then that machine uses it to craft something.

The fundamental problem that multithreading brings is that it can't make any guarantees about the order in which things happen. When you multithread the previous example, it could be that the machine tries to craft something before the inserter inserts the item. In that case, the machine wouldn't have been able to craft because it was missing the ingredient. If the insertion happened first, then the craft could go ahead. This is a problem because it is non-deterministic. Depending on how the threaded logic turns out, the machine either crafts an item or it doesn't, which breaks the whole simulation.

This example is just an illustration of the problem of course. The actual issues that pop up are more complicated and technical in nature. Also, the actions I used as examples naturally don't all happen in a single tick for a specific machine, they're an analogy to illustrate the issue at hand. They don't necessarily correspond to how the game actually organizes things.

So, in a game like Factorio, it seems like you can't multithread anything because it would break the simulation. Everything depends on everything, right? Well, not quite. There will indeed always be parts that need to be executed in a strictly linear fashion, but you can find some parts of the whole that are truly independent of each other if you take a closer look. The belt logic is one of those parts.

When you think about it, not every belt is related to every other belt on the map. Sure, there are giant networks of belts that are interconnected, like when running a [main bus](https://wiki.factorio.com/Tutorial:Main_bus), but there's also lines of belts that aren't related to each other at all. Quite a few in fact, as trains or arrays of machines tend to break up lines of belts.

{% include figure.html src='https://media.alt-f4.blog/ALTF4/15/beltlines.jpg' alt='Screenshot of two separate lines of belts being woven together' caption='In this screenshot, the blue and red belts are part of distinct lines of belts. Notice how they weave through each other, but never actually interact. Also take note how the machine allows them to indirectly interact while preserving their separation for multithreading purposes.' %}

This allows us to parallelize (ie. 'multithread') the logic for updating belts. Now, we have to be careful, this doesn't mean we can just update the belts at any point during the tick. There still needs to be the steps of moving the items, letting the inserter pick it up, having the machine craft an item, in that order. The thing we can do is split up the moving of items. When we get to that point, we split up the task at hand so that every isolated line of belts gets its own thread. Each thread then moves the items on the series of belts its been given, making it so they all 'move at the same time', ie get processed in parallel. If we are careful to only split up lines of belts that don't interact with any others, we can safely update them on their own.

{% include figure.html src='https://media.alt-f4.blog/ALTF4/15/multithreading_illustration.jpg' alt='Illustration of the relevant part of the game update process' caption='This illustration shows how performance is gained. Instead of having to wait for the sum update time of all the different lines of belts, the game only has to wait until the one that takes the longest (Belts #2 in this case) is finished. This can lead to some large improvements, as in reality there are way more than three separate lines of belts.' %}

This approach is very similar in nature to how the improved fluid update logic that was brought up in [FFF #271](https://factorio.com/blog/post/fff-271). That blog post has some deep insight into things like how the memory layout was changed to improve cache efficiency, but that's not the focus of this article. There's also a very interesting [reddit-thread](https://www.reddit.com/r/factorio/comments/jizq1b/i_programmed_factorio_from_scratch_multithreaded/) by Varen/Raven in which he talks about his re-implementation of Factorio with multithreading in mind from the start. Give that one a read for additional technical conversation about this topic.

### Brass Tacks: What's the real-world difference?

All that theory is nice and all, but you're wondering what the actual impact on performance is. Well wonder no longer, as I've brought charts!

As a disclaimer, the UPS changes don't only come from the performance improvements made to the belt logic, as the entity update times have also improved a bit with 1.1. I can't isolate the effect of only the belt changes when benchmarking, so take this into account when interpreting these numbers. Additionally, the numbers were not measured with super rigourous methods, which means the numbers I show have a non-insignificant margin of error.

I benchmarked three different saves with different characteristics, although all of them use a lot of belts. You can't improve the performance of the non-existant after all. Let's meet our contestants, all of which are taken from the amazing [FactorioBox](https://factoriobox.1au.us) website, which has a small collection of maps that are useful for benchmarking.

First, I tested the [10k SPM base by Stevetrov](https://www.reddit.com/r/factorio/comments/bdkrwz/10k_spm_belt_megabase_benchmarked_83ups_with_way/). It uses really performance-optimized layouts, relying almost entirely on belts. No trains are in use, with bots only being used a very specific circumstances where they prove better for performance than belts. This makes it an ideal candiate to show off the impact that this change can have. The effect won't be as pronounced in other cases as the performance costs get spread around more to other things like trains or bots.

[[ CHART! ]]

Then, I tested a base whose layout is closer to what you or me would construct. It's just called [cam6](https://factoriobox.1au.us/map/info/da5d1a5a8c66638254f5ddaa1d90f1084ba2b00f28888abc83e5bfef4d3b4cd1) on FactorioBox, with no indication as to its origin. It relies mostly on belts, with some trains and bots mixed in. It also produces power using nuclear reactors, which tend to slice off a non-negligeable piece of the performance-cake. Like I said, it has all the things you would expect from a common Factorio map, which makes it a good representation of the impact you can expect on your factory.

[[ CHART! ]]

Lastly, I took a look at a somewhat unusual candiate, a gigantic, messy map titled [Besenovsky Pajzel](https://factoriobox.1au.us/map/info/06fde508f4db1afd18ae17903af1dd830a50ecf7af342afef3df99ee00c3b6bc), which presumably is the name of its creator. It's described as 'Huge map (13300x7400 tiles) with inefficient production ranged from 2,4 up to 4K SPM'. So this one uses a mix of all the things, with the most significant difference to the previous two being the extensive use of trains. What we expect from this is that the impact of the optimizations in 1.1 is overall smaller as the thing that has been improved is less relevant on this map.

[[ CHART! ]]

If we average these three very rough benchmarks, we get an average UPS improvement of X%, with the update time going down by X%. All in all, the improvement with 1.1 depends somewhat on your base layout, but in general it's a nice improvement.

After all, it doesn't really matter if a particular performance improvement has a large effect, it's the sum of all the small improvements that lead to the game running an order of magnitude quicker. We explored this a [couple of weeks back](https://alt-f4.blog/ALTF4-13/#running-the-factory-in-10) on Alt-F4, and I expect that base to get an additional uptick in performance.