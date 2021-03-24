## Complexity Corner: Beacons <author>The Kool</author>

Welcome back to Complexity Corner! This week I'll be continuing with the topic of modules that I've talked about in the first three articles. I'll be going over the concept of beacons this time, a building that relies completely on modules for its existence. As before, I will ask three questions about this potentially unfamiliar thing: “What is it?”, “What results can it give?”, and “Where should it be used?” My goal is to show those of you who haven't used it yet just how easy it is to work with.

### What are beacons?

The [beacon](https://wiki.factorio.com/Beacon) is a building that you can place modules into, which spreads the effect of those modules to nearby buildings. It takes up a space of 3x3 tiles and has a range of 9x9 tiles, meaning it can affect anything within three tiles of it. It first appears relatively late in your usual playthrough, requiring purple science to research, but the most advanced ingredient to craft it is red circuits. A beacon has two module slots, and will transmit half the effect of any slotted modules to nearby buildings, all while consuming a constant 480MW of power.

### What results can they give?

Most people see beacons as a megabase tool, and it's true, they are very effective at improving performance, or UPS (**U**pdates **P**er **S**econd). With faster machines, you need fewer of them, and fewer things moving means your computer can handle bigger factories. Improving UPS is far from they only thing they do, though.

[Image: beacons]

The two best ways to use a beacon are to surround one beacon with buildings, or to surround one building with beacons. The first case is good for making those expensive tier 3 modules do more work per module (as much as four modules worth of work), and the second case is for pushing a building far beyond its normal capacity. With speed modules in and around an Assembly Machine 3, the speed of the building is 2.6x as fast as it would be without beacons, and 8x as fast as with no modules at all.

A quick note must be given to what beacons cannot do: Beacons cannot contain productivity modules, and beacons will only boost a building that has module slots. So no, you can't put speed modules in a beacon and expect your steel furnace to work faster. Your electric furnace, however, will speed up.

### Where should they be used?

You may think it doesn't make sense to put efficiency modules in beacons because beacons draw a lot of power on their own, but consider this: Since a beacon always uses 480MW of power, if you can save at least that much power on affected buildings then you are reducing overall power draw. For example, the base power draw of three Assembly Machine 3s is 1,125MW. If you place two Efficiency 3 modules in a beacon, they will reduce the power draw of nearby buildings by 50%. Since 1,125 / 2 = 562.5MW, you're saving 82.5MW. And that's with only 3 assembly machines, you can easily fit more in there. Just be careful about the 20% minimum power draw limit on machines!

Speed modules in beacons are much more common. If you have something that just *needs* to run as fast as possible (like exhausted oil pumpjacks), you can surround it with speed-filled beacons. You can use a line of beacons between buildings if you have a part of your factory that is getting way too large, such as furnace arrays, in order to get their size way down. Remember: you don't have to go full megabase to play around with beacons in your base, so give them a try in small corners where you think they'll help!

[Image: beaconed furnaces | Caption: The left block and the right block have the same throughput.]

Finally, I should say that efficiency modules will offset the penalty from other modules, so you can use them together around your furnaces and mining drills to significantly reduce the pollution output. The minimum power draw (and thus pollution factor) is 20% of the building's original value, not the value after penalties, so your Efficiency 3 modules really start to shine here. If you mix 14 Efficiency 3 and 10 Speed 3 modules in a 12-beacon array, you completely negate the pollution increase of the speed modules and still get a 250% speed increase.

See, I told you Efficiency 3 modules are useful! And if you have anything to say about that, come find me on the [Discord](https://discord.gg/AsXAwyV) and help me put together a future article. Until then, I'll see you on the factory floor!
