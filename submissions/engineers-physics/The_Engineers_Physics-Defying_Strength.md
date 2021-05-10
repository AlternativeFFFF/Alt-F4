## The Engineer's Physics-Defying Strength <author>Romner</author>

Minecraft's Steve is strong. [Lift-billions-of-kilograms-with-no-problems-strong](https://www.reddit.com/r/Minecraft/comments/jmz6lz/actualized_maximum_weight_that_steve_can_hold/). But that doesn't even *begin* to compare to Factorio's Engineer.

Assuming that no mods are allowed, the Engineer wearing a set of MK2 Power armor has 120 inventory slots, plus 30 logistic trash slots, which is a total of 150 usable slots. The heaviest item in the game per slot is, as far as I know, the nuclear reactor. Each slot can fit ten of them, giving us a total of 1500 reactors. According to [this article](https://www.nextbigfuture.com/2007/07/constructing-lot-of-nuclear-power.html), modern nuclear reactors use 40 metric tons of steel and 190m³ of concrete per MW. Nuclear reactors in Factorio produce 40MW. Each! Oh, and there's also the neighbor bonus, which we can account for with an equation (assuming four or more reactors and a 2xN reactor layout), where `$n$` is the number of reactors and `$P$` is the base power output of the reactor:

$(n - 4) \cdot P \cdot 4 + 4 \cdot P \cdot 3$

Using this, we get a total of ...

$(1500 - 4) \cdot 40 \cdot 4 + 4 \cdot 40 \cdot 3 = 239\ 840\mathrm{MW}$

With the numbers from the [earlier article](https://www.nextbigfuture.com/2007/07/constructing-lot-of-nuclear-power.html) and a [quick google search](https://www.google.com/search?q=concrete+density+kg%2Fm3), we can calculate the total mass:

$239\ 840 \cdot 40 = 9\ 593\ 600$ metric tons of steel and
$239\ 840 \cdot 190 \cdot 2.4 = 109\ 367\ 040$ metric tons of concrete, equals a total of
$9\ 593\ 600 + 109\ 367\ 040 = 118\ 960\ 640$ metric **tons**, or **118 960 640 000 kilograms**.

Now, most people would be satisfied with that number; it is much higher than what Steve can carry. But we can do better. *Much* better.

Remember [ALT-F4 #11](https://alt-f4.blog/ALTF4-11/), specifically the "[Nauvis is a white dwarf](https://alt-f4.blog/ALTF4-11/#nauvis-is-a-white-dwarf)" article by *pocarski*?

In that article, he calculated that the density of Nauvis has to be at least 813 400kg/m³ to keep itself from falling appart. Earth by comparison has a density of [5 515kg/m³](https://en.wikipedia.org/wiki/Earth_mass#:~:text=average%20density%20of%205515%20kg.m%E2%88%923), which makes it around 150 times less dense. Assuming then that Nauvis is comparable to Earth in terms of size, it means Nauvis has around 150 times the gravity. Thus, Factorio's Engineer can carry:

$813\ 400 \div 5\ 515 \cdot  118\ 960\ 640\ 000 \approx 17\ 545\ 346\ 251\ 315\mathrm{kg}$ worth of nuclear reactors.

**17 545 346 251 314 kilograms.
Seventeen and a half *trillion* kilograms.**

But wait, we aren't done yet. Pocarski's equation doesn't calculate the *actual* density of a planet, just the *lowest plausible* density; any lower and the planet would fall apart because the gravity wouldn't be strong enough to overcome the centrifugal forces. That means that the real density of a planet should be much higher than what pocarski's equation predicts. Using it on [Earth](https://www.google.com/search?q=earth+rotational+period+in+seconds) confirms this:

$\frac{3\pi}{G\ \cdot\ 86\ 164^2} \approx 19\mathrm{kg/m^3}$, which is around 290 times less than Earth's actual density of 5 515kg/m³.

Trying it for [Mars](https://www.google.com/search?q=mars+rotational+period+in+seconds) gives us a similar result:

$\frac{3\pi}{G\ \cdot\ 88\ 619.616^2} \approx 18\mathrm{kg/m^3}$, which is around 220 times less than Mars' density of [3 933kg/m³](https://nssdc.gsfc.nasa.gov/planetary/factsheet/marsfact.html#:~:text=3933).

Using these, we can assume that an Earth-like planet should have around 200-300 times the density calculated by pocarski's equation. That means Nauvis' density is closer to $813\ 400 \cdot 250 = 203\ 350\ 000\mathrm{kg/m^3.}$ Such impossibly strong gravity is probably the reason why neither the Engineer nor the bugs can apparently climb cliffs or swim.

Calculating the total weight with that value gives us:

$203\ 350\ 000 \div 5\ 515 \cdot 118\ 960\ 640\ 000 \approx 4\ 386\ 336\ 562\ 828\ 649\mathrm{kg.}$

**4 386 336 562 828 649 kilograms.
Almost *four and a half quadrillion kilograms.***

For comparison, that's about the total weight of [everything ever made by humans](https://www.nationalgeographic.com/environment/article/human-made-materials-now-equal-weight-of-all-life-on-earth), **four times**. Or, the weight of [all living things on the Earth](https://en.wikipedia.org/wiki/Biomass_(ecology)#:~:text=The%20total%20live%20biomass%20on%20Earth%20is%20about%20550%E2%80%93560%20billion%20tonnes), **eight times.**

Steve can carry around [5 billion kilograms](https://www.reddit.com/r/Minecraft/comments/jmz6lz/actualized_maximum_weight_that_steve_can_hold/). That is around 870 000 times less. Using NBT tags though, Steve would be able to lift [*pretty much the entire universe several times over*](https://qr.ae/pGt554), but I personally think that using those wouldn't be fair, considering they can [only be used with cheats](https://minecraft.fandom.com/wiki/Tutorials/Command_NBT_tags).

So, is the Engineer stronger than Steve? Maybe. The answer to that question depends entirely on if you think Steve using NBT tags should be allowed or not.
