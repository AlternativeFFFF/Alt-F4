## Universal 8-8: Perfectly balanced, as all things should be

Some time ago I made a bunch of computer parts with belts and splitters. This time I will continue my unhealthy obsession with moving items around by making something that's actually at least slightly practical, that being a balancer. Now, why would I write a whole article on designing a balancer? Well that is because the one we will be making today is no average balancer. This article won't go very deep into balancer design principles, since we will be using pre-made and well-known blueprints for the most part. What you *do* need to know is some terminology:

* Input-balanced: Draws from all inputs evenly. Especially important when merging many inputs to a few outputs.
* Output-balanced: Gives to all outputs evenly. Especially important when splitting a few inputs to many outputs.
* Throughput-limited: Has internal bottlenecks. An example of a throughput-limited system would be merging two belts into one, and then splitting it back into two. Such a system has a maximum throughput of one belt, even though two belts are available both on input and output.
* Throughput-unlimited: Opposite of throughput-limited.

All blueprints from this article (and a couple extras) can be found at [this link](https://controlc.com/1d0c31bf).

### The premise

Picture the following: you're a new player, and you've just heard about those things called "balancers" and how useful they are. You see an image of a 4-4 balancer, build it, but then only hook up 3 outputs to get 3 balanced belts. Instead you're met with a 2:1:1 ratio and disappointment:

![How not to use a balancer](https://cdn.discordapp.com/attachments/699618487097884723/813449477028446269/unknown.png)

In this article, I set myself a goal to make a balancer for which this sort of intuition works, in other words, no matter the input/output configuration, all outputs are always equal, and all inputs are drawn from evenly. This kind of balancer is known as a "universal balancer", a concept first explored and named in [this post](https://www.reddit.com/r/factorio/comments/a5ferf/i_present_to_you_the_44_universal_balancer/) by Reddit user [u/tzwaan](https://www.reddit.com/user/tzwaan), who is one of the moderators of the [Factorio subreddit](https://www.reddit.com/r/factorio).

Universal balancers can do what no balancer should be able to: no matter the configuration, they're input-balanced, output-balanced, *and* throughput-unlimited at the same time! This is a set of properties previously thought to be possessed only by a 2-2 balancer, which is just a single splitter. The drawback is that they get *big*.

### Design principles

Let's think about how to convert a 4-4 balancer into a 3-3. That is done by looping the extra output back into the first splitter. We will use this idea as our base principle:

![Looped 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813449600852819968/unknown.png)

Now, how would we make it so the balancing doesn't get ruined when we block some outputs? Simple, we use priority splitters to auto-loop the items that can't get out. Of course, we need to merge them back with the input too, and set input priority so the main inputs don't slow down when there are items coming. Here is how that might look like:

![Auto-looping 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813449812728217640/unknown.png)

After some testing, we discover a major issue. If the looping items try to enter a belt that's already full, they just back up all the way to the split-off point and block the overflow, putting us back to square one:

![Broken auto-looping 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813450086234587156/unknown.png)

To remedy this, we need to make sure every item on the loop can get to every single one of the loop's exits. This can be done in many ways, but for our needs we're looking for the smallest number of splitters. It just so happens that the most splitter-economical way to do this is with another balancer. Let's add it to the loop:

![Fixed 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813450357639872553/unknown.png)

We now have a fully functional universal 4-4. However, it can be improved. Because of certain balancer mechanics, we don't actually need 4 belts looping back. In general, we need 3 belts less than our balancer is made for. This means we can optimize our 4-4 by compressing the looping belts into 2, and then splitting them again:

![Simpler universal 4-4](https://cdn.discordapp.com/attachments/699618487097884723/813451928238948372/unknown.png)

Now we can shuffle the components around until we get something small, such as this:

![Small universal 4-4](https://media.discordapp.net/attachments/753031298368536577/814603704921227344/unknown.png?width=1440&height=270)

This balancer, while pretty long, is only 6 wide, which means you can fit it in a standard 4 belt bus, and have just enough space to tile them next to each other. It's important to note that this is not my design, although it's based on one of mine. Sadly, I forgot who came up with it, so I can't give proper credit.

### Advanced design

Now, let's try something bigger: a universal 8-8. We begin by doing the same steps as with our 4-4, except we use 8-8 balancers instead. This is what we get:

![Basic universal 8-8](https://cdn.discordapp.com/attachments/699618487097884723/813450635667832842/unknown.png)

Unfortunately, this is an imperfect balancer. Here is one condition which makes it bottleneck:

![Basic 8-8 bottlenecking](https://cdn.discordapp.com/attachments/699618487097884723/813450849481130012/unknown.png)

As you can see, 6 belts are available, but less than 6 are coming out. This is a problem. The standard 8-8 balancer is throughput-limited, meaning the entire thing is as well. Luckily, this is easily fixed by simply replacing the core balancer with a throughput-unlimited one. Notice how the loopback can stay throughput-limited:

![Proper universal 8-8](https://cdn.discordapp.com/attachments/699618487097884723/813451151625289778/unknown.png)

Now let's once again shuffle the components around, and also use some belt weaving to compress 8 belts into 4 tiles:

![Compacted 8-8 universal](https://cdn.discordapp.com/attachments/699618487097884723/813451640144658432/unknown.png)

The balancer is unrecognizable, but that's because the secondary balancer is now inline with the main one, meaning we have to deal with up to 12 belts shoved into a 8 tile wide space, which forces the secondary balancer to be extremely spread out. If only there was some way to avoid the clunky belt weaving without making it wider... Oh wait, there is! Remember that we only need a maximum of 5 belts of loopback! The throughput of 8 red belts is equal to 5.333... blue belts, meaning we can get away with replacing almost the entire loop with red belts, which makes the balancer equivalent to the following:

![Universal 8-8 with red loopback](https://cdn.discordapp.com/attachments/699618487097884723/814614993026285598/unknown.png)

This trick allows us to ditch the belt weaving, because now we can just run the loopback through blue and red undergrounds without issue. This makes it possible to achieve *maximum compression*:

![Shortened universal 8-8](https://cdn.discordapp.com/attachments/699618487097884723/814604964450009138/unknown.png)

This final design is also laughably easy to downgrade to red and yellow belts:

![A blue, red and yellow universal 8-8s together](https://cdn.discordapp.com/attachments/699618487097884723/814615878317899826/unknown.png)

It's definitely possible to make a yellow belt design without any blue undergrounds, but that would make the whole thing much longer. It is also possible to make both the red and yellow designs without any higher-level undergrounds at all, but that would make the whole thing 33% wider and who knows how much longer.

### Final explanations

I intentionally left some mysteries in this article, as some were too awkward to explain in the process, and some I don't understand that well myself. This is the part where I clear up the former, so fair warning that some technical stuff is coming.

* Why is a balancer the most splitter-efficient redistributor?

Let's prove this using induction. First, imagine that we already have the most efficient possible distributor across 2<sup>N-1</sup> belts, we'll call it the "small distributor". Now, let's add splitters to split each of its outputs into 2. We now have a 2<sup>N-1</sup>-2<sup>N</sup> distributor. To have the right number of inputs, let's clone the small distributor, and feed its outputs to the remaining inputs of the added splitters. We now have a 2<sup>N</sup>-2<sup>N</sup> distributor with the smallest possible amount of splitters. Now we just say that a 2-2 distributor is a single splitter, which is obviously the most efficient 2-2 distributor. If you look carefully at this setup we just generated, this is nothing but a 2<sup>N</sup>-2<sup>N</sup> balancer.

* How do you guarantee input balancing?

Balancing is reversible. If no outputs are blocked, then all of them always have the same item flow regardless of inputs. Similarly, if no inputs are starved, then all of them have the same item flow regardless of outputs. The loopback guarantees that all inputs are getting enough items, meaning that everything will always be input-balanced.

* Why 3 less belts in the loopback?

When there are 1 or 2 outputs, our core is guaranteed to always be input balanced because 2<sup>N</sup>, the number of our inputs, is divisible by 1 and 2. This is a property of all throughput-unlimited balancers. 2<sup>N</sup> is not divisible by 3, however, so in that case we must rely on the loopback to feed all the unused inputs of the core. When 3 outputs are open, the rest of the outputs get directed to the loopback, meaning it must be able to maintain at least 2<sup>N</sup>-3 belts of throughput, or else the core begins starving on one end and overflowing on the other, which breaks the balancing.

* Why did you leave some loopback splitters blue?

Those are the first splitters of the secondary balancer. They are the only part of the loopback that can get more than 2 red belts of throughput, meaning they have to be blue or else the loopback will bottleneck.