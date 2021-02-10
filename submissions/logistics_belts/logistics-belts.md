## Logistics Belts <author>Recon419A</author>

Factorio has three main methods of moving items: belts, bots, and trains. Belts are good for single- or double-item throughput, trains for massive quantities of a single item, and bots for complicated crafting tasks. Sometimes, however, you need a combination of these approaches, which is where techniques like sushi belts can come into play. In this article, I want to talk about another approach I call "logistics belts". Like sushi belts, logistics belts can be used with or without mods and are not a mod themselves; rather, they are a way to control what resources go where using belts and very simple circuits. Like the vanilla logistics network and certain train-based mods like LTN, they aim to be a way to deliver resources that's smarter than simply running basic belts.

### Description of a Logistics Belt

Logistics belts are a somewhat complicated concept, but it's much simpler to understand when you see one in action. In this example, pay attention to how several items are sent along the same belt, each being loaded onto the belt only when requested. If iron and copper is all that is needed, no steel will be sent; likewise, if nothing is needed, the belt will remain empty.

<p>
  <figure>
    <video class="media" width="100%" height="100%" style="max-width: 1280px; max-height: 720px"
      playsinline muted controls>
      <source src="https://media.alt-f4.blog/ALTF4/23/logistics-belts-demo.mp4" type="video/mp4">
      </source>
      Video demonstration of logistics belt concept.
    </video>
    <figcaption>A demonstration of logistics belts using circuit conditions, filter splitters, and loaders. Inserters can be used in lieu of loaders but may need to be doubled or tripled depending on the belt speed.</figcaption>
  </figure>
  </p>
  
You can see in the example that the circuit condition is set to send materials when the destination has less than one hundred. In reality, the length of the belt will affect how many materials are sent; if the belt is long, one hundred will be buffered with hundreds still on the belt. There *is* a theoretical limit to how long the belt can be without overflowing the receiver chest, but in practice, you won't hit it if you're using steel chests; at very large distances, you'll be using trains instead anyways. If you would like to have a play with this logistics belt setup, the blueprint string is available [here](https://media.alt-f4.blog/ALTF4/23/logistics-belt-blueprint.txt), though it should be noted the blueprints utilizes loaders from the [Loader Redux](https://mods.factorio.com/mods/Optera/LoaderRedux) mod.

{% include image.html src='https://media.alt-f4.blog/ALTF4/23/logistics-belt-circuit-condition.jpg' alt='An example circuit condition for a logistics belt.' caption='An example circuit condition for a logistics belt. Note that setting a limit of one hundred will actually send approximately 270 plates over this distance, due to plates remaining on the belt at the time of cutoff.' %}

### Use Cases for Logistics belts

Logistics belts are useful when you need a lot of an item all at once, and then none of it for a very long time. Anyone who has ever automated belts with bots will be familiar with the phenomenon known as the "charging cloud" that comes about when your logistics network asks for no less than ten thousand gears and fifteen hundred electronic circuits. Likewise, when you ask for something like the materials to make a nuclear reactor or a rocket silo, bots will tend to swarm around an assembler in an area that was never designed for that degree of throughput. When you need a lot of an item, it's much easier to get it in by belt: sending ten thousand gears takes less than four minutes and barely damages your UPS; with bots it would take 2500 separate trips and likely make that many bots go airborne, swamping charging capacity that may never have been designed for that and taking forever to return to equilibrium. Running dedicated belts for every item, however, creates its own set of problems; often, the belts will be sitting idle and taking up space within your factory, and you may not even have room to run an eight-bus in the first place. For something like your belt mall, sending a large load of gears intermixed with a large load of electronic circuits is trivial for a logistics belt; once they arrive in that location, using bots internally is much less strain on your logistics network.

### Limitation: Multiple Destinations

The problem of sending one item to multiple destinations is non-trivial, and it's something I personally haven't been able to solve. Because filter splitters pull all of an item off, sending that item past a filter splitter *some of the time only* requires complicated splitter arrangements and several circuit conditions originating from different destinations. I've given the problem a good deal of thought, and while I've come up with several prototypes, they've mostly been prone to behaviours like jamming or sending too many of an item to the wrong destination, potentially causing an overflow if left unattended. With the Factorio community being what it is, I wouldn't be surprised if this is solved within a week or two, and in several different ways; maybe we'll even hear about *your* solution in a future Alt-F4. For now, though, I leave it as a challenge to the community. Be sure to let me know what you come up with!

### A Note on Sushi Belts

Players who have been around the game a while may have already encountered a similar concept: sushi belts. Like logistics belts, sushi belts place more than two resources on a belt, but they generally do so as a loop designed for complicated crafting. A circuit condition at the entrance or around the entire belt helps to control the amount of every resource present, even leading to such complicated examples as the ["bloodbus"](https://imgur.com/gallery/Q4oR0#Jiwed0Q) - a circulatory system for your factory. While the concept of a logistics belt is similar, it has a few important differences, and the key one is related to their function: while sushi belts go *around*, and tend to service multiple assemblers in no particular order, logistics belts go *to* and tend to direct resources from one location to another. In fact, a logistics belt can be used to feed a sushi belt in place of an ordinary bus - when resources are needed, they can be sent, with carefully limited rate control preventing over-population of the belt loop. Other concepts like clocked belts or inserter limiting can be applied here, and can even be combined with logistics belts to achieve monumental feats of engineering. In my mind, logistics belts themselves are just one part of the player's toolkit.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/23/sushi_belts_chaos.mp4' alt='Video of sushi city block base.' caption='A crazy example of sushi belts in action in a massive city block base. Source: <a href="https://www.reddit.com/r/factorio/comments/kv53ym/you_have_heard_of_sushi_belts_and_you_have_heard/">u/dentoid’s reddit post</a>' width='800px' %}
