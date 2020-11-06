## Complexity Corner: Productivity Modules <author>TheKool</author>

Welcome to the first in a series of articles about elements of the game that seem intimidating at first glance, but turn out to not be that hard to start using. The series starts off with a trilogy about modules, spending a short time to focus on each of the three choices in turn. Later, the series may return with additional topics. Each article will attempt to answer three simple questions: *What is it?*, *What results can it give?*, and *Where should it be used?*

### Preface: Complexity bias in Factorio

Before diving into specifics, I wanted to briefly touch on why we might shy away from the complex aspects of the game and stick to the comfortable ones we know. If you’ve ever found yourself looking at something you are unfamiliar with and telling yourself “That looks complicated; I’ll just stick with what I know and figure that out later”, then you’ve experienced complexity bias.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/12/prod-modules-1.mp4' width='640px' height='360px' alt='Science river lab setup' caption='<a href="https://www.reddit.com/r/factorio/comments/jfiky6/small_update_to_the_science_river_blueprint/">u/Quazarz_’s Science River</a>' %}

Complexity bias is a mental tendency to see things as more complex than they really are, especially when we don’t fully understand them. When it comes to projects this may manifest as procrastination, as we avoid a task that we expect to be long and difficult. When it comes to Factorio, this usually manifests as a preference to stick with the comfortable game mechanics we know and understand in order to avoid learning how new ones like circuits or nuclear power work. However, just as that task often turns out to be much easier than anticipated, I hope to show you that the game elements you’ve been avoiding may be simpler than you thought after all.

{% include figure.html src='https://media.alt-f4.blog/ALTF4/12/prod-modules-2.jpg' alt='Modules in existing labs' caption='Or you can just throw some modules in your existing setup...' %}

### What are productivity modules?

In case you aren’t familiar with them, [modules](https://wiki.factorio.com/Module) are items that you can place into buildings to change some of their performance characteristics, like crafting speed and energy usage. They can also be placed into [beacons](https://wiki.factorio.com/Beacon), transmitting their effect to every building within range. This can be very powerful, which is why modules are often used in large builds to reduce the number of buildings needed to meet a certain goal. This often means they’re seen as an end-game tool, as seen in LoneWolf’s [Megabase Thinking](https://alt-f4.blog/ALTF4-7/#megabase-thinking-lonewolf) article for example. They can, however, be quite powerful much sooner. Indeed, they can be used as early as the green science stage, appearing immediately after advanced circuits in the tech tree.

Now, [productivity modules](https://wiki.factorio.com/Module#Productivity_module) are the most mechanically complex modules in the game as they do four things: increase pollution, increase energy usage, slow the machine down, and add a productivity bonus. As complex as they sound, that last one is the only one that really matters. The productivity bonus works in the same way as the mining productivity bonus: If you have, for example, a 10% productivity bonus then every cycle will add 10% to the productivity bar, and when it reaches 100% you get a free product. That’s right, free. It didn’t even take any resources, it just appeared out of thin air.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/12/prod-modules-3.mp4' width='1280px' height='720px' alt='Productivity modules in action'%}

### What results can they give?

Productivity modules then, while being the most complex module mechanically, have the most straightforward answer to how you should use them. Put simply, they reduce how many resources you need for your factory. If you want to get more output than your inputs would normally allow (such as when you are short on one or more resources), you use productivity modules. This means their use is as straightforward as it gets: for best results, spam the ever-living daylights out of them. They are actually unique in this regard, as they are the only thing in the game aside from the mining productivity research that gives something from nothing.

The earliest application is likely to be two productivity 1 modules in an assembling machine 2, which gives a +8% productivity bonus at the cost of -30% speed and a lot of extra energy usage and pollution. One of the latest applications is four productivity 3 modules in an assembling machine 3, which gives +40% productivity and -60% speed, with a boatload of extra energy usage and pollution. At this point, I hope you’re not worried about biters anymore! Getting 40% more output from your resources is a pretty big deal, and that benefit accumulates all the way down the tech tree if you’re using them wherever you can. If you’re using them at every opportunity in your rocket silo recipe, you can actually drop the raw ore requirements down as low as 15% of the original value! Don’t believe me? Take a look for yourself.

![Rocket silo productivity module comparison](https://media.alt-f4.blog/ALTF4/12/prod-modules-4.jpg)

As mentioned, they do also reduce the working speed of whatever they are placed in. If you build closely to ratios in your factory, you’ll need to consider both the slowed working speed and the bonus outputs in your calculations, because these will turn all your ratios on their heads. To solve this, I usually just let [KirkMcDonald’s calculator](https://kirkmcdonald.github.io/calc.html#zip=dVBBisMwDPxNTjW09FbIYxRZSUQV28hyS36/poRkne6CwUgz0ozGg0F/c1d37RYO/b1joyX3OQGSy8gU6l+L52N83Lol+iKUe/AvqIB3yIqF7ZHu+7vsYGRxSSNSzhymg4AxJVKHMAg1kxuQBGwDLiSEpjEw/qk1E7zWjxBqNdnIcB1rdglPs/1DrrxsVWQA/e0H5MtdVDppNJ1675OsRqat062PMdRzxJVwuuQI6hvLRcai1R0g+3P7qCW+naeQ2VaXTQta0TbgbETSZLLZGgtJwxzAjHQ9XToRqHvPdCLnKOw/O9yocXF70DvlBw==) do the work for me.

### Where should they be used?

So you’ve decided you’d like to use productivity modules. Where should you put them? The obvious answer is “everywhere you can”, but there are a few cases that deserve special mention, even if you use them nowhere else.

- **Rocket Silo:** If you load your silo with four of the productivity 3 modules, you only need about 70 rocket parts worth of materials to make your rocket, and you likely won’t notice the slow effect at all.
- **Oil:** If you are running a map that doesn’t have enough oil fields within reach and you’re struggling to pump enough crude oil, consider placing productivity modules in your refineries and anything that uses the oil and plastic products. It may not look like much, but it can help stretch that struggling resource further.
- **Labs:** You can place productivity modules in labs! Free science! They don’t even produce pollution; you’re avoiding the worst drawback entirely! What’s not to love?
- **Mining drills:** It’s a trap! Don’t do it! It doesn’t multiply with your mining productivity research, it just adds to it, and the research gives a much more significant bonus. You’re better off with speed or efficiency modules.

Productivity modules have a couple of special caveats though. Specifically, they can only be used for intermediate products, meaning those items that are used in other recipes and not placed down as buildings. Secondly, they cannot be placed into beacons. If they could, they’d be overpowered! If you’ve not been using productivity modules, you should strongly consider tossing a few together for your rocket silo or labs and see the difference they make.
