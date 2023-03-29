## Mod Spotlight / Mod Comparison / Requesting A Train <author>OceanPhantom</author>

Factorio's train system is great. Trains are the transportation method of choice when it comes to long distances. Its rules are exceedingly simple, allowing you to build your first automated bi-directional rail network to a nearby ore outpost with incredible ease. And yet these rules, taken all together, can make setting up a network of hundreds of trains to feed your megabases's insatiable demand for raw resources a logistical nightmare.

They allow for such incredible complexity that [u/minibetrayal](https://www.reddit.com/u/minibetrayal/) on Reddit theorized that the train system was actually Turing complete. And then took on the challenge of [building the largest and most useless rail network ever](https://www.reddit.com/r/factorio/comments/evkff6/the_biggest_and_most_useless_rail_network_ever/) to prove it. Making the rail system join the circuit network and the belt transport system ([Alt-F4 #23](https://alt-f4.blog/ALTF4-23/) & [Alt-F4 #24](https://alt-f4.blog/ALTF4-24/)) as yet another independently Turing complete part of Factorio.

With all the options available to us, how could the train system possibly get better? Enter: the Factorio modding community.

We've talked before about how mods have improved the rail system. They introduced the first iteration of [the fluid wagon](https://alt-f4.blog/ALTF4-21/). They've changed trains' behaviour, with mods like [Train Supply Manager (TSM)](https://mods.factorio.com/mod/train-pubsub), which we've talked about previously all the way back in [Alt-F4 #15](https://alt-f4.blog/ALTF4-15/).

It then came to my attention that while ALT-F4 has touched on it briefly in several separate previous articles ([Alt-F4 #28](https://alt-f4.blog/ALTF4-28/) & [Alt-F4 #37](https://alt-f4.blog/ALTF4-37/)), there has yet to be one that takes an in-depth look at the [Logistic Train Network](https://mods.factorio.com/mod/LogisticTrainNetwork) mod, or 'LTN' for short. Until recently, LTN was unique, with the only other notable mod that altered how trains functioned being the previously mentioned TSM.

That all changed in November 2022, with the advent of not one, but two new competitors, which unlike TSM, directly compete with LTN's style of logistics. With two new competitors, [Project Cybersyn](https://mods.factorio.com/mod/cybersyn) and [Rail Logistics Dispatcher](https://mods.factorio.com/mod/RailLogisticsDispatcher) being recently released, now seems like the perfect time to compare and contrast all three options.

{% include image.html src='screenshot-tick-55628.png' alt='The entities added by all three mods placed next to each other' caption='The entities added by all three mods' %}

To understand what makes these mods so popular, we first need to understand how they alter vanilla train behavior. At their core, all three mods will dynamically alter train schedules based on signals from the circuit network. This makes the rail system behave more like the vanilla [Logistic Network](https://wiki.factorio.com/Logistic_network), which makes these mods extremely powerful tools for building many-to-many train networks.

Now, many-to-many networks are easily doable in vanilla Factorio (we've done a tutorial on building one in [Alt-F4 #37](https://alt-f4.blog/ALTF4-37/)). As a quick summary: A single decider combinator can be used to set the train limit on a station to 1 when certain conditions are met, such as when a station accepting a resource (a *requester station*) drops below a threshold. Conversely, the same can be done at a station that supplies a resource (a *provider station*). If desired, more combinators can be added for further functionality, such as raising the train limit at further thresholds, or adding a maximum train limit.

The shortcoming of this approach is that it is at its best when dealing with a single resource. Combinators are able to do anything a computer can, making it possible to have a train network that is able to handle multiple resources on each train, and even having any arbitrary train handling an arbitrary resource. However, the sheer amount of circuitry involved in making the latter variant of a many-to-many train network makes it a challenge few have attempted, and even fewer have succeeded at. All three of these mods allow someone with a rudimentary understanding of circuits to easily reuse trains for other resources and set up multi-item stations.

### Logistic Train Network - The Original

Originally conceived of [on the Factorio forums](https://forums.factorio.com/viewtopic.php?f=6&t=34225) by *ssilk* in October 2016, and subsequently implemented and released by *Optera* in April 2017 for Factorio version 0.14, Logistic Train Network is one of the most beloved and influential mods in Factorio history. It remains popular to this day, as evidenced by the 'recursive' mods later made to complement LTN, and serves as direct inspiration for the other two mods we'll discuss later. While I'll be going over LTN here, this article is intended more to highlight differences between the mods than to be a manual; as such, a more complete overview of the signals and features can be found on the [LTN subforum](https://forums.factorio.com/viewtopic.php?f=214&t=51072)

LTN adds the Logistic Train Stop entity and 22 signals used to control the network. When used with mods that add more types of locomotives and wagons, LTN will also add more signals for each new locomotive or wagon.

{% include image.html src='LTN-stop.png' alt='The hybrid Logistic Train Stop entity added by LTN' caption='The hybrid Logistic Train Stop entity added by LTN' %}

The Logistic Train Stop must be used for the mod to work, and completely replaces the vanilla train stop. This new addition is a hybrid entity composed of a train stop, a lamp (which serves as the input for signals), and a yellow constant combinator (which serves as the output). Together with a constant combinator to configure the station, the minimum footprint for the stop is 2x2 + 1x1. (Only the stop by itself is required for a provider using global defaults.)

{% include image.html src='LTN-signals.png' alt='The virtual signals added by LTN' caption='The virtual signals added by LTN' %}

While the number of signals can be daunting, many of them (particularly the bottom two rows) can be safely ignored while still having a fully-functional network.

The only signal that is absolutely necessary is the 'Stop is Depot' signal in the top-left corner. In LTN, all deliveries begin and end at depot stations, and a train needs to first enter such a station before its 'brain' is taken over by the mod. This signal turns a stop into the equivalent of the Logistic Network's Roboports. These depots are thus also excellent places to handle refueling due to their central role in the network.

The other two kinds of train stop are the Provider and Requester. While one might think that the signals with the Provider Chest and Requester Chest denote which one a stop is, this is not the case. In actuality, a positive resource signal indicates that the train stop is a Provider for that resource. An equivalent negative signal instead indicates that the stop is a Requester for that resource. These two signal types are instead simply 'thresholds', which is a minimum amount that prevents a train from attempting to take from or provide to that stop if the received signals does not meet it. LTN offers the ability to use stack thresholds instead for increased flexibility, although fluids must use the regular threshold signal.

The fact that the sign (`+` or `-`) of the signal is what controls station behavior leads to a common pitfall where an unfamiliar user might find that their requester stop has unintentionally become a provider. The remedy for this behavior is simply increasing the threshold, either on a per-station basis, or by using the global amount settings.

These signals are all required to be sent into the lamp part of the hybrid entity which functions as the stop's input port. Another one of the most common errors is sending the control signals to the wrong part of the hybrid entity.

The third part of the entity, the combinator which serves as LTN's output, is what makes exact train loading and multi-item stops possible. Through it, LTN outputs the expected delivery, allowing inserter stack sizes and filters to be configured for the appropriate cargo when multiple items are in play. (The Locked Slots signal should also be sent to the input lamp to ensure excess cargo does not remain in the inserter's hands, as that would contaminate the next train.)

One disadvantage of LTN is its steep learning curve. It can be difficult to correctly configure stations as a new player, and it's rather easy to make mistakes that propagate through your base. Another complication is that LTN uses its own train limit signal, and uses that over vanilla train limits for its requester and provider stations. However, that signal does not work with its depot stops, which instead require the use of vanilla train limits. (Optera, the mod author, has also stated that there are no plans to change that.)

### Project Cybersyn - LTN Lite

Named for [Project Cybersyn](https://en.wikipedia.org/wiki/Project_Cybersyn) of Allende's Chile, this mod released just a week after Rail Logistics Dispatcher. Project Cybersyn serves as something of a halfway point between LTN and RLD, removing some of LTN's more complex features in favor of simplicity, such as the ability to control which train lengths are eligible to use a particular station.

{% include image.html src='Cybersyn-combinator.png' alt='Project Cybersyn's Cybernetic Combinator next to a Train Stop' caption='Project Cybersyn's Cybernetic Combinator placed next to a Train Stop, highlighted to show the 1-tile range' %}

Unlike LTN, which adds a whole new stop that must completely replace its vanilla counterpart, Project Cybersyn adds a new entity that must be placed within a tile of a station to control it. Together with a constant combinator to configure the new entity, the minimum footprint for the stop is 2x2 + 2x1 (or 1x2) + 1x1. Only the stop and Cybernetic Combinator are required for depots and fuel stations. Sharp-eyed readers will notice the 'No Power' icon - Cybersyn is the only one of the three mods that adds an entity that requires power to function properly. Placing down more Cybernetic combinators allows one to use additional functions. One welcome change is that Cybersyn uses vanilla train limits, unlike LTN.

{% include image.html src='Cybersyn-GUI-1.png' alt='Cybernetic Combinator showing different modes' caption='Cybernetic Combinator showing different modes' %}

Project Cybersyn's Cybernetic Combinators have five modes: Station, Depot, Refueler, Station Control, and Wagon Control. As with LTN, trains must first be sent to a depot in order for the mod to assign them a schedule. However, trains do not need to return to the depot in order to receive a new schedule, thanks to the depot bypass feature. This feature may necessitate some changes in rail and depot design to take full advantage of it, though.

A second major change is that by default, trains with cargo in them are no longer allowed to receive new deliveries. LTN does warn the user if a train left with cargo, which could cause contamination in a base's logistics if the user did not take care to use filter inserters to unload cargo, or at best cause deliveries to grind to a halt as trains that already had inventory could not take on a full delivery. Cybersyn simply prevents that from happening in the first place.

Third, the Refueler mode combined with the depot bypass feature allows trains to be constantly on the move and only stop for fuel when they run low, which significantly reduces the number of trains needed to supply a base.

{% include image.html src='Cybersyn-signals.png' alt='Project Cybersyn's signals' caption='Project Cybersyn's signals' %}

Project Cybersyns adds a total of three signals, making for a simpler overall system. While it retains the requester threshold, priority, and locked slots signals (which are identical in function to the ones from LTN), many of the other signals, including the 'provide threshold' signals, are removed entirely.

{% include image.html src='Cybersyn-GUI-2.png' alt='Cybernetic Combinator in Station Mode' caption='Cybernetic Combinator in Station Mode' %}

One of the best changes in my opinion is the fact that Cybersyn's combinator GUI allows the user to not just notice that a station can both Provide and Request, but also disable one of those modes. This means that the workaround of sending very high threshold signals to the train stop is unneeded. Another excellent change is that the combinator is a single entity, which makes it more obvious where the input and output ports are.

Adding a second combinator in station control mode additionally allows the user to set thresholds on a per-item basis. While this could be achieved with LTN, it also required additional combinators for each resource with a different threshold. With Cybersyn, the same could be done with just an additional Cybernetic combinator and a second constant combinator, making it much more space efficient for stations with many items.

In terms of downsides, they are few and far between: The Cybernetic Combinator can take up a bit more space in certain circumstances. They also require power to function properly. Lastly, the automatic allow list can be finicky, and can be incompatible with things like diagonal stations or modded wagons with different sizes. It also has no solution to manually control the train configurations allowed to use the station, requiring them to be disabled instead. Some control over which trains can use the station is still enforceable via use of network masks.

One planned feature is a [manager GUI](https://mods.factorio.com/mod/cybersyn/discussion/63b1ebbf7c6d7ab3f0ba2285) similar to [LTN Manager](https://mods.factorio.com/mod/LtnManager), which is one of several third-party mods for LTN. This mod gives an overview of the stations in LTN, allowing one to quickly view station inventories, requests, etc. When implemented, Cybersyn's version will have greater feature parity with LTN.

### Rail Logistics Dispatcher - Built-in GUI

The second of the three mods to be released, Rail Logistics Dispatcher, is also the most radically different, with its most prominent feature being an integrated GUI.

{% include compare.html old='RLD=stop.png' new='RLD-stop-ALT.png' caption='The titular Rail Logistics Dispatcher. While it resembles a lamp, a look in ALT mode reveals the truth of the matter: It is actually a combinator in disguise!' %}

Much like Cybersyn, Rail Logistics Dispatcher forgoes replacing the vanilla train stop in favor of adding another entity to control it. However, the Dispatcher it adds is smaller, doesn't require power, and uses lamp graphics similar to LTN, making it easier to tell whether the stop is functioning correctly. Taken together, the minimum footprint for the dispatcher and train stop is 2x2 + 1x1, with the latter needing to be 1 tile away from the stop it controls.

{% include gallery.html items='RLD-GUI.png;Rail Logistics Dispatcher's GUI,LTN-Combinator-Modernized.png;LTN Combinator Modernized's GUI' %}

While third-party mods like [LTN Combinator Modernized](https://mods.factorio.com/mod/LTN_Combinator_Modernized) have been very helpful to those lacking experience with circuit networks, the fact remains that it is an entirely separate mod dedicated to simplifying and improving the user experience. With that in mind, RLD opted to include a GUI right out of the box. (RLD does also offer a 'signals mode' to allow the user to configure the Dispatcher in a manner more similar to LTN if desired.) Similar to Project Cybersyn above, Rail Logistics Dispatcher's author also plans to implement a native [manager UI](https://mods.factorio.com/mod/RailLogisticsDispatcher/discussion/6390043c3a48c93b86a5f22b) to view the whole network in the future.

Unlike both of the previous two mods, Rail Logistics Dispatcher adds no new signals at all. Everything that was previously done through signals such as Thresholds, Train Configurations, and Network IDs, is now done through the use of the GUI. RLD also goes all-in on the per-item thresholds. It doesn't have any per-station thresholds through its GUI, nor any global thresholds in its settings. However, it can save certain requests and thresholds to be applied again later. In addition to the individual item units and stacks of items, RLD also has the ability to set requests based on a wagon (fluid or cargo) load.

Instead of the 'Locked Slots Signal' that LTN and Cybersyn share, RLD instead opts to reverse inserters and have them put items back inside the chest or warehouse from which they picked them up. On one hand, this does mean that the user would have difficulty making stations using loaders or inserters picking up directly from belts. On the other hand, this does mean that multi-item provider trains can fill trains with slightly higher loads.

Rail Logistics Dispatcher's GUI makes it the easiest of the three mods to use, but it does come with one big downside: while copying a dispatcher within the same save is perfectly doable, blueprinting it for use in other saves or for sharing with others is not. API limitations mean that only the Dispatcher entity is copied, while the configured settings are lost. A second, more minor issue is that you may need to isolate the signals from your inventory with a combinator, or use a different wire, if you wish to use them for other purposes, due to RLD's Dispatcher input having negative signals for items it is requesting that might otherwise contaminate it.

One potential issue that I do have to point out is that the mod author has mentioned [recently becoming a father and lacking time](https://mods.factorio.com/mod/RailLogisticsDispatcher/discussion/63da24773837d81618202439). This means that updates and bug fixes may take a long time to be implemented going forward, which may be a deciding factor for some.

### Final Thoughts

These three mods are nearly identical in their core function, allowing anyone who is familiar with one mod to easily switch over to using either of the other two. Each one of these mods has different advantages and disadvantages, and I hope this has helped you decide on one to pick, or even simply realize that these mods exist at all!
