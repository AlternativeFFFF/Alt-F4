## Universal 8-8: Perfectly balanced, as all things should be

Some time ago I made a bunch of computer parts with belts and splitters. This time I will continue my unhealthy obsession with moving items around by making something that's actually at least slightly practical, that being a balancer. Now, why would I write a whole article on designing a balancer? Well that is because the one we will be making today is no average balancer. This article won't go very deep into balancer design principles, since we will be using pre-made and well-known blueprints for the most part. What you *do* need to know is some terminology:

* Input-balanced: Draws from all inputs evenly. Especially important when merging many inputs to a few outputs.
* Output-balanced: Gives to all outputs evenly. Especially important when splitting a few inputs to many outputs.
* Throughput-limited: Has an input-output configuration that creates an internal bottleneck. For example, merging two belts into one and splitting back to two.
* Throughput-unlimited: Opposite of throughput-limited.

All blueprints from this article (and a couple extras) can be found at [this link](https://controlc.com/c21ae405).

### The premise

Picture the following: you're a new player, and you've just heard about those things called "balancers" and how useful they are. You see an image of a 4-4 balancer, build it, but then only hook up 3 outputs to get 3 balanced belts. Instead you're met with a 2:1:1 ratio and disappointment:

![How not to use a balancer](https://cdn.discordapp.com/attachments/699618487097884723/813449477028446269/unknown.png)

In this article, I set myself a goal to make a balancer for which this sort of intuition works, in other words, no matter the input/output configuration, all outputs are always equal, and all inputs are drawn from evenly. This kind of balancer is known as a "universal balancer", a concept first explored and named in [this post](https://www.reddit.com/r/factorio/comments/a5ferf/i_present_to_you_the_44_universal_balancer/) by Reddit user [u/tzwaan](https://www.reddit.com/user/tzwaan), who is one of the moderators of the [Factorio subreddit](https://www.reddit.com/r/factorio).

Universal balancers can do what no balancer should be able to: no matter the configuration, they're input-balanced, output-balanced, *and* throughput-unlimited at the same time! This is a set of properties previously thought to be possessed only by a 2-2 balancer, which is just a single splitter. The drawback is that they get *big*.

### The design process

Let's think about how to convert a 1-4 balancer into a 1-3. That is done by looping the extra output back into the first splitter. The same can be done with a 4-4 balancer, which we will use as our base principle:

![Looped 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813449600852819968/unknown.png)

Now, how would we make it so the balancing doesn't get ruined when we block some outputs? Simple, we use priority splitters to auto-loop the items that can't get out. Of course, we need to merge them back with the input too, and set input priority so the main inputs don't slow down when there are items coming:

![Auto-looping 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813449812728217640/unknown.png)

We now discover a major issue. If the looping items try to enter a belt that's already full, they just back up all the way to the split-off point and block the overflow, putting us back to square one:

![Broken auto-looping 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813450086234587156/unknown.png)

To remedy this, we need to make sure every item on the loop can get to every single one of the loop's exits. The way to do this with the least splitters is a secondary balancer:

![Fixed 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813450357639872553/unknown.png)

And we're pretty much done with the 4-4. It can be improved, but more on that later. Now, let's try our hand at something bigger: a universal 8-8. We do the same steps as before, and get this:

![Basic universal 8-8](https://cdn.discordapp.com/attachments/699618487097884723/813450635667832842/unknown.png)

However, there is an arrangement in which this happens:

![Basic 8-8 bottlenecking](https://cdn.discordapp.com/attachments/699618487097884723/813450849481130012/unknown.png)

6 belts are available, but less than 6 are coming out. This is a problem. The standard 8-8 balancer is throughput-limited, meaning the entire thing is as well. Luckily, this is easily fixed by simply replacing the core balancer with a throughput-unlimited one. Notice how the loopback can stay throughput-limited:

![Proper universal 8-8](https://cdn.discordapp.com/attachments/699618487097884723/813451151625289778/unknown.png)

Now comes the time for the usual procedure of moving stuff around until we achieve black hole-level component densities. Because we used blue belts, we can employ belt weaving to get the 8 belts of loopback to be 4 tiles wide. Here is the finished balancer:

![Compacted 8-8 universal](https://cdn.discordapp.com/attachments/699618487097884723/813451640144658432/unknown.png)

It is unrecognizable, but that's because the secondary balancer is now inline with the main one, meaning we have to deal with up to 12 belts shoved into a 8 tile wide space, which forces the secondary balancer to be extremely spread out.

### Final note

We don't actually need as many belts of loopback as we used. In general, for an N-N universal balancer (where N is a power of 2 like 4, 8, 16 etc) we need N-3 belts looping back. While I could have done that, the extra mass of splitters to merge 8 to 5 and then back to 8 would have made it take even more space. However, this fact is really helpful for the 4-4 universal, because it allows us to have only 2 belts of loopback:

![Simpler universal 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813451928238948372/unknown.png)

Then after some compacting, we get a design comically small in comparison to the 8-8:

![Compact universal 4-4 next to universal 8-8](https://cdn.discordapp.com/attachments/699618487097884723/813452464120528896/unknown.png)

It's important to note that this universal 4-4 is not my own design, although it's based on a series of balancers I made long ago. Unfortunately, I don't remember who created it.