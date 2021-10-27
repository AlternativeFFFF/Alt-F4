## The Rocket Silo: Mysteries in Full

Ah, the rocket silo. It is the largest in-game entity outside of the crashed spaceship. It is also one of the most expensive craftable entities. However, when it's placed, it has some weird effects on the electric grid. We also mostly know that using productivity modules inside of it pays off. What about around the silo? All of that right here!

{% include image.html src='https://media.alt-f4.blog/ALTF4/50/alt-f4-silo-pic-1.jpg' alt='The Rocket Silo' %}

### Power Usage

To start, let's look at its power usage: It claims to use at most 4MW (which is true), but it only uses 250kW when just manufacturing rocket parts, which is a bit more than three assembling machine 1s (225kW). When does it require 4MW, a bit more than 53 assembling machine 1s, then? Well, when the silo doors are moving, or a rocket is being pushed up. Those things must be heavy! Up until version 1.1.42, it used an additional 10 kW idly at night, but there were no surface lights to indicate this. Back in 0.16, however, there were lights on the silo, as shown below, which is where this came from.

{% include image.html src='https://media.alt-f4.blog/ALTF4/50/alt-f4-silo-pic-2.jpg' alt='The Rocket Silo with Lights' %}

### Modules and the Silo

You can fit 12 beacons around 3x3 entities, 16 around oil refineries, and 20 around a silo. Two beacons with two speed module 3s each is the same thing throughput-wise as adding a second machine. So one silo can do the work of *thirteen* silos, side-by-side. Modules and beacons are insanely expensiv however, as the following table shows.

|           | Beacon | Module, tier 3 | 4 modules and 2 beacons | Silo  | Rocket from Silo |
|-----------|--------|----------------|-------------------------|-------|------------------|
| Iron      | 135    | 1083           | 4602                    | 12220 | 49100            |
| Copper    | 110    | 2000           | 8220                    | 8600  | 92500            |
| Stone     | 0      | 0              | 0                       | 1000  | 0                |
| Coal      | 20     | 190            | 800                     | 437   | 9500             |
| Crude Oil | 411    | 17334          | 70158                   | 11080 | 277778           |

When I mention costs, I mean the relevant ores needed without productivity modules in the crafting chain, while using advanced oil processing to break down crude oil. Each [beacon](https://factoriolab.github.io/list?p=beacon*1&v=1) costs quite a bit for an early-game player, but nothing compared to automated production of tier 3 modules. That's because any [tier 3 module](https://factoriolab.github.io/list?p=speed-module-3*1&v=1) costs roughly 10x more. While the calculator mentions speed modules specifically, the other two modules of the same tier are equivalent.

So four tier 3 modules and two beacons use a lot of raw materials. With certain optimizations, like the standard 8-beacon array and those shown [here](https://factorio.com/blog/post/fff-351), it's possible to get more out of your module, but the cost still stands. Normally, this cost greatly outmatches the machine. However, there is one exception to this rule, and that's the silo. The [silo]((https://factoriolab.github.io/list?p=rocket-silo*1&v=1)) costs a whopping 12,220 iron, 8,600 copper, 437 coal, 11,080 crude oil, and 1,000 stone. The modules and beacons are cheaper than placing down another silo. Less spaghetti involved, too!

### Productivity Bonus Interlude

If you're a long-time reader of Alt-F4, you might remember [issue #12](https://alt-f4.blog/ALTF4-12/#complexity-corner-productivity-modules-thekool), which is dedicated to productivity and its effects. But for first-time readers or for those needing a refresher, I'll offer an abridged version of what productivity is: Basically, it's a multiplier on your output for your given input. When I say crafting operation, I refer to the main bar within the assembling-machine or furnace UI filling up to completion. The way this works is by taking 100 inputs and multiplying that by the percentage bonus from the modules within the machine.

So, for example, take four productivity module 3s inside some copper cable assembling machine 3. The total bonus from the modules is 40%, so 10 copper plates become `20*(1+0.4)=28` copper cables. We can calculate the required input for a given output by the reverse of the process. So if we wanted 140 copper cables made with the influence of 4 productivity module 3s, we first divide by the amount per craft (2) to find out we need 70 crafting operations, including those from productivity. Then we divide 70 by the productivity multiplier of 1.4, which will 'filter out' the 20 free operations and leave us with the 50 crafting operations that we need to actually execute.

### The Rocket-Making Process

The space rocket itself is the main reason why you'd place down a silo. Each [rocket]((https://factoriolab.github.io/list?p=rocket-part*100&v=1)) costs 49,100 iron, 92,500 copper, 9,500 coal, and 277,778 crude oil. This is added onto whatever you throw into the payload slot, but that can vary greatly depending on what you feed it.

In general, for most recipes, productivity modules pay off extremely slowly. For recipes involving a lot of raw materials, it pays off fast however. Especially when used with the silo. Note that productivity doesn't apply to the rocket itself. In other words, you can't get two rockets simultaneously. It applies to each rocket part, giving you free parts which count towards your total.

One productivity module 3 in the silo itself drops the cost of each rocket to 10/11 (or 90.91%) of its original cost. This is not from the rocket itself, but rather of the 100 parts you need, since you only need 90.91 on average instead of 100 per rocket. Even a [9.09% cost drop](https://factoriolab.github.io/list?z=eJwrcM7SMjQwUCtyLtDScqvzAkG1MmMAUBsG5Q__) saves you 4,463.6 iron, 8,409.1 copper, 863.6 coal, and 25,252.5 crude oil on average. That's a bit over four modules' worth of raw materials.

What about all four modules being productivity module 3s? After that last step, you enough leftover material for it! It would yield a 28.57% cost drop. Same routine as before, take the input and multiply it by the drop of input factor gives us that we save just under [13 modules' worth]((https://factoriolab.github.io/list?z=eJwrcA7UMjQxMLLQ0nJKUStyLtDScqsDQ7UyYwBzOAgo)) of material. In other words, four productivity module 3s literally pay for themselves three times over per rocket!

### Rocket Launch Results

As we all should know, launching a satellite gets us 1000 space science packs in vanilla. But that's not the only thing you can launch. There's space science packs, which yield one fish per pack. Another fact: This is the only way to truly automate fish. Anything else just deletes the items used and does not return anything. However, there is a special achievement for launching some specific thing, but which I'll not spoil here. Inserting a car, tank, or the thing at the bottom of the Alt-F4 website into it lets you literally ride the rocket. When you press launch, it will wait for you to enter the silo as you would a car, then launch you up into space!
