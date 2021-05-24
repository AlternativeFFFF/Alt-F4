## Combinators 2: Augmented Logistics

A couple weeks ago, I wrote an article about using combinators to improve specific builds. This time we'll take a look at ways to apply the circuit network more generally, to make your whole factory more efficient via intelligent logistics. Both bots and trains can be enhanced by just adding some basic math and/or logic. These circuits are so simple that they pretty much don't use decider combinators, so let's dive right in!

### Bots: Network-to-network interface

We've all had this issue: you create more bot demand, and suddenly all the bots from the far end of your base decide it's a good idea to travel thousands of tiles across roboport-less areas. In the best case, this will cause mild frustration at the striking similarity to real-life delivery services, and in the worst case, bots will keep getting destroyed by biters, or turning around partway through to charge at the roboports they just left, leaving you with no throughput whatsoever. This happens when your logistic network has an inward-facing corner, creating a huge logistics-deprived area, which dumb straight-line-pathing bots will immediately start cutting right through.

<image of bots flying over wilderness>

And so to avoid this, a rule was written: *thou shalt not create concave logistic networks*. Sounds simple, right? Just have your base be a massive rectangle of roboports, and there will simply be no corners to cut. This is a valid solution, but it puts very strong constraints on your expansion, since you're forced to expand the rectangle to cover all of your newly-acquired real estate. This causes situations where your actual base only takes up a tiny fraction of the area covered by your logistic network.

<image of a base where the area that actually needs coverage is way smaller than roboport rectangle>

A much better way to approach this issue is to separate your networks. Essentially, instead of making one huge rectangle, you make a bunch of unconnected smaller ones, which you can then arrange to cover any shaped area you want. This way, any single network is still convex, so bots will never leave the roboport coverage. That's a good solution, but how does one get items to travel across the gaps between networks? This is where circuits come in.

Let's construct two networks with a 1 tile gap in between, and call them **network A** and **network B**. The items will cross the gap using a stack inserter between a requester and an active provider. For any items we want to move from A to B, we should set the request on A's requesters to be the amount of items we wish to transfer. We can transfer items from B to A in a similar way.

While we can design complex ways to figure out exactly how much of what needs to go where, we'll stick to a simple solution that works well enough for most purposes: keep the two networks at equal amounts of items. To do this, we will calculate half of the difference between network contents, and force the network with more items to send that many of them to the network with less items.

<a diagram or something>

We connect a roboport in network A to a pair of arithmetic combinators, one multiplying by 1, and the other multiplying by -1. This will give us a positive and a negative value for the items in the network. We do the same for network B.

<image of this>

We then connect the negative value of one network to the positive value of the other. This will give the difference between their contents. We then divide this value by 2 and feed it to the requesters. It's important that the chests on the side with *more* items get a *positive* value, or else the system will do the exact opposite of what we want. It's also important to round up the value to your robot cargo size, or else they can be flying back and forth forever trying to fix a 2 item difference by moving 4 items at a time.

<image of this>

Because one inserter going each way is a bit slow, we can add more. If we just blindly add more chests, then the request of *each one* will be half the difference, meaning the *actual* request will be several times more than it's meant to be. We need to divide the incoming difference by the number of chests, and also add on the remainder to one of the chests. Once again, rounding up to robot cargo size is paramount. This rounding does mean that networks are not going to become strictly equal, but it's a calculated sacrifice.

<image of this>

This circuit will now do its best to keep the networks at the same item contents, with an error of a couple items. The bots will do a bit of back and forth, because there is a delay between items being removed from one network and added to the other, which means it overcorrects slightly a couple times. With more than two networks, not much changes. Because each pair of networks tries to equalize the item counts, all items gradually spread more or less evenly through the whole system.

This circuit is infinitely adjustable and customizable. You may add a biasing factor to have the network contents be in a specific ratio, you may add conditions for when to apply the bias and to what items, and whatever else you can figure out how to do. In my opinion, that is an even more important feature than the simplicity.

### Trains: Vanilla LTN analogue

One of the most popular and influential mods for Factorio is LTN, or Logistic Train Network. It essentially gives your trains the logic of bots, and your stations the functions of provider and requester. Needless to say, the mod allows colossal improvements in efficiency. One would expect such a fundamental change to the system to be nearly impossible to recreate with combinators, and they would be correct. It is however extremely easy to create a much simpler, albeit somewhat less efficient, version of LTN.

Today, I introduce the "Train Limit Dispatcher and Requester", or TLDR. It is a very basic circuit that multiple people invented independently, which uses train limits introduced in 1.1 to act as train request flags. The major simplification is that unlike LTN proper, in this system almost every train is dedicated to a single resource. The logic is simple: For every provider station, calculate the number of "train loads" you have, and set that as your train limit through simple division. For every requester, do the same with the difference between request and contents. Each train then just goes between provider and requester with "cargo full" and "cargo empty" conditions.

<image here>

If all providers are empty or already have enough trains going to them, then trains will just sit and wait until train limits allow a spot for them. Train limits also mean that there won't be a massive avalanche of trains rushing to a single station as soon as it opens, but instead exactly as many trains as the station needs will be dispatched, and no more.

It is, however, not quite as simple as I made it sound. For example, if a train unloads at a requester, but no provider is ready, then it just stands there, starving the requester. This means we need a central depot, so trains always have somewhere to go to free up a requester station. The depot is still as bare bones as it gets: just a bunch of stations with train limit a constant 1, and some refueling inserters. Trains now also go from requester to depot to provider, stopping in the depot for a short time. Some trains may stop in the depot after leaving the provider too, for example if the provider is really far away.

<image here>

But wait, there's more! Waiting space in statins is not unlimited, and if too many trains are requested at once, then they might start queuing on tracks that shouldn't have *anything* queuing on them. To fix this, we add two decider combinators. Those will check if the requested train amount is greater than a certain constant. If it isn't, the request goes straight through. If it is, the constant is output instead. Their outputs are summed, simply because the constant and train limit use different signals, and they need to be the same signal. That sum is then given to the station as the train limit.

<image here>

This circuit, just like the first circuit from this article, is customizable. For example, you could have requesters automatically determine and set their own requests, you could have something completely independent controlling their requests, or you can even change the train load item amount. Basically, any constants that the system takes, you can turn into dynamic values, controlled by each other, some independent circuit, or simply manually. You could also mess with the train schedules and conditions, for example make stations kick out trains as soon as their requests are filled, or make one train handle more than one resource.

### Conclusion

The circuits given here are intended as both final usable products, and foundations for your own circuit projects. I would say they are similar to unpainted figurines: you can still get a lot out of them in the form you got them, but you have limitless possibilities as soon as you break out some creativity and skill. Good luck wiring!