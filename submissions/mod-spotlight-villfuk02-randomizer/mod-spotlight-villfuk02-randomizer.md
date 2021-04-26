## Vanilla. Shaken, not stirred.

[*Vill’s Recipe Randomizer*](https://mods.factorio.com/mod/ZRecipeRandomizer) does exactly what the name suggests - randomizes recipes. On the first sight, this can seem like a very stupid and a very simple idea. However, once you try to make it less stupid, it gets very complicated pretty quickly.

![Free spaghetti sample](spaghetti-sample.jpg)
*Example factory making production (purple) science packs from distractor capsules, power switches and flamethrower ammo.*

### How it started

I first started working on this project in September 2020. At that time I was trying to make a mod that’s both simple and unique. It wasn’t supposed to be playable, or even good, just something fun to make. After running into some issues, knowing well I’m making a mod nobody would play anyway, I gave up ~~and never touched programming again~~.

After two other failed projects I came back to Factorio, this time, as a player. I played vanilla, then Industrial Revolution 2, and then I tried Space Exploration. I love playing overhaul mods, because it lets me learn new recipes, discover new factory layouts and solve new logistic problems. But most overhaul mods are very grindy and I get bored quickly. And that’s when I realized that a randomizer mod has in fact a purpose: It’s like an unlimited supply of overhaul mods, but it keeps the vanilla feel! And the biggest bonus for me was that I don’t have to make any new machines and graphics, it’s just messing with letters and numbers.

### Not as simple as it seems

The mod could simply take each recipe and make it take random items as ingredients. But then it would be pretty useless, because for example red science could take nuclear fuel as an ingredient, but you don’t have it researched yet. So I decided to make it crawl through the tech tree, and for each recipe unlocked, take only the items unlocked before it as potential ingredients. There are of course exceptions in some mods, where you can unlock a recipe before you can even craft it, so I have to be a bit more careful.

You probably wouldn’t want to make an underground belt from steam engines and labs. That would be way too expensive. I needed a way to make the recipes more balanced. So I decided to implement an algorithm that calculates the value of each item based on the resources you need to make it. We can easily calculate that 1 electronic circuit takes 1 iron ore and 1.5 copper ore:

![How it's made: Electonic circuit](electronic-circuit.jpg)
*1.5 copper ore plus 1 iron ore makes 1 electronic circuit.*

Let's say that both copper ore and iron orea have a value of 1, that means electronic circuits would have a value of 2.5. Now the randomizer knows it can use for example 1 transport belt (1.5) and 1 copper ore (1) as a new recipe for electronic circuits. There is some variance in the final value. It makes the recipes a bit more unique, but most importantly, it’s easier to find a valid combination, speeding up the randomization process.

At this point I published the mod and from feedback and some testing it became very apparent there were many bugs (of course) and two "big" issues. The word *big* is in quotes, because the mod was still more playable than you’d expect even from a randomizer. However I wanted the players to enjoy it, not just experience it.

### First few issues

The first issue was wood. The default settings made sure wood was not randomized, but many recipes used wooden power poles as an ingredient! As you can imagine, the fix ~~should have been~~ was pretty simple and boring. I added a flag for non-randomizable resources, like wood, and any item that strictly needs an item with this flag as its ingredient inherites it.

The second one was that even though recipes needed the right amount of resources, they often were too complex and felt unfair. The mod did not account for the number of crafting steps or crafting time. A great example is the automation (red) science pack. It is very cheap, having a value of only 3, but it takes 5 seconds to craft. It was used in many recipes like a basic component similarly to iron gears. Its long crafting time means you could need a lot of assemblers making red science just for something simple like underground belts. Another problematic example is that simple items like iron gears could require many steps like making them from stone bricks, which could be made from iron sticks, which could be made from pipes, etc. So I made the mod calculate a second value, called complexity, for each item. Complexity takes into account the amount of crafting steps required, the amount of various ingredients (and results) and also the crafting times.

### Balancing raw resources

It seemed that I’ve arrived at the perfect randomizer, but again, some issues (and bugs) revealed themselves. Often, many recipes used primarily one resource (often iron or stone) which was kind of bland and you had to scout for far away ore patches, because you needed just so much of the chosen resource. Also, oil was often not needed for launching the rocket. For a given recipe, all valid items were equally likely to be picked, so the items without oil massively outnumbered the few oil products. I tried some strategies to push the algorithm in the right direction but none of them really worked. I could just tell it to use more plastic or solid fuel and such, but what if you want to play with mods and there are even more items to be prioritized? I wanted a universal solution.

And I already knew one approach that could solve it, but I was afraid to implement it, because it would make everything way more complicated. This means more development time, more bugs and a potentially way slower loading times. After unsuccessfully trying to come up with some simpler way to achieve a similar result, I finally decided to go with this complicated solution.

The main idea was to use the amounts of raw resources instead of just the total value. This means the mod can make sure that each randmoized recipe needs the right amount of raw resources, ensuring that all raw resources are used. Similarly to the total value, the raw resource amounts for each recipe may vary a bit, or they can be completely random based on the mod settings. Pretty simple yeah? Well, now instead of doing maths with one number I have to do maths with several and the logic is a lot more complicated. Fortunately, with some optimizations and rigorous testing, the mod works fine and is still pretty fast.

And that’s the history of *Vill's Recipe Randomizer*!

### We need to go deeper

Except I did not talk about some BIG issues (notice the missing quotes and the capital letters) which were present from the start. One of them is recipe loops. The algoritm could get stuck when trying to evaluate the value of one of the recipes or it could calculate it improperly. Loops contained within one recipe are simple to deal with. For evaluating the recipe, the algorithm cuts out the items that appear both as an ingredient and as a result, removing the loop. It can then add back the cut out items, because their values are now known, making the recipe ready for randomizing. In vanilla, this applies to kovarex enrichment process and coal liquefaction:

![Clean it up!](kovarex-and-liquefaction.jpg)
*40 U-235 and 2 U-238 can be removed from kovarex and 25 heavy oil can be removed from coal liquefaction.*

Loops with more than one recipe are somewhat problematic. There are no loops in vanilla with more than one recipe (except for barreling and unbarrelling, which is not randomized by default anyway), so they’re pretty easy to miss, but in mods, they are everywhere, also the randomizer might accidentally create a loop in certain conditions. To illustrate the problem we’ll need an example. Let’s take synthetic sapphires in Industrial Revolution 2. You need pure nickel mineral, silica and sapphire dust to make a sapphire, however, sapphire dust is made by crushing sapphires, forming a loop:

![Sapphire loop](sapphire-loop.jpg)

The way I resolved this issue is that when a loop is detected, it gets cut open in one point and then the recipes are merged into one. The new recipe is then used for the calculation instead of the one the straightened loop ended with. Here, the two recipes are merged by removing the 3 sapphire dust in the middle, then we can remove the 2 sapphires that are both an ingredient and a result:

![Sapphire unlooped](sapphire-unlooped.jpg)

And we end up with a recipe to make sapphires while leaving out the problematic details! But what happens when there’s branching loops or loops within loops?

![Loopy diagram](loopy.jpg)
*This is not based on any specific recipes, but I'm sure something complicated at least as this diagram exists in some mod.*

Let's just say that things get loopy. I think I somewhat solved it in the mod but I won’t go into details here, this is not a graph theory course :D (and I’m not sure the solution works reliably).

### The nemesis

And now, time for the biggest issue of them all: recipes with multiple outputs. Let’s take for example advanced oil processing.

![Advanced oil processing](advanced-oil-processing.jpg)

By default, crude oil has a value of 0.4 and we’ll ignore water for now. That means the recipe has a total value of 40. So we know that 25 heavy oil + 45 light oil + 55 petroleum gas should have a value of 40 in total, but how much of that value is contained within each product? There are many ways to approach this and tackling this issue took the most time and it caused many headaches. Let’s go through the two most different options.

The simplest: Just make each of the results worth an equal part of the total value. This is mostly reasonable, but it breaks when you introduce waste products. For example, the kovarex enrichment process makes 41 U-235 and 2 U-238, the algorithm would assume they both have the same value, but you probably know that U-235 is much more valuable. So this approach is not really usable.

The "best": Just make each part worth the full value, but keep track of the byproducts which you can subtract later. For example, heavy oil has light oil and petroleum gas as its byproducts in advanced oil processing. That means lubricant has them as byproducts too, because it's made only from heavy oil. If we want to make an express splitter, we need, among some other ingredients, lubricant and advanced circuits. Advanced circuits need petroleum, but we have some as a byproduct of the lubricant so we can subtract it. The only byproduct that’s left is light oil. What do we do with the light oil? We can of course crack it to save even more petroleum. But that takes some water. Is it cheaper to use more water or more petroleum? Well, let’s calculate both options just in case.

As you can tell, this approach is insanely complicated. There are many edge-cases and questions to be answered. Like what do I do with excess byproducts when other ingredients recipe don’t want them? I tried to implement a version of this approach and I must say, I was pretty successful. It took me only about 100 hours and I had to fix about a million bugs. And what was the reward? Well, this solution is still not perfect, although it comes very close. I also could no longer make sense of my own code. Everything broke every time I tried to adjust something. And most importantly, loading the mod with vanilla Factorio took anywhere from 10 seconds to 10 minutes. Since I want the mod to be compatible with as many other mods (and it working with vanilla Factorio would be nice too), I decided this is not the way to go.

Finally, after much more thinking, I arrived at the algorithm I use now. It is basically a compromise between the two approaches described above. It works well enough and is pretty simple. Though not simple enough for me to explain, because I’d need to explain the many other quirks of the evaluation algorithm. It does not evaluate all multiple-output recipes incredibly well in all cases, but it also does not break in edge cases (I hope).

### Final thoughts

And that concludes our peek into the inner workings of the Recipe Randomizer. If you have any questions or suggestions, you can message me on [my discord server](https://discord.gg/jn4nRrrB6d). Speaking of which, I’d like to thank all the people who joined it and posted bugs, ideas, tested things or otherwise supported me during the development. The mod couldn’t come this far without you!
