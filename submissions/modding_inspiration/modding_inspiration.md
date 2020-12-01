## Modding Inspiration <author>DedlySpyder</author>

Sometimes inspiration for new features is found in the oddest places. Last month, a comment was left on my [Generic Logistic Chest](https://mods.factorio.com/mod/Generic_Logistic_Chest) mod from a German YouTube channel linking to their [spotlight](https://youtu.be/cZf56r62WE8) of the mod. Not speaking any German myself, I watched some of it anyway to see how the reviewer was showcasing the mod.

![](https://youtu.be/cZf56r62WE8)

Before I explain what I saw in the video that prompted a change, let me give some background on the Generic Logistic Chest mod. It started out as an idea to simplify the player’s inventory/quickbar for setting up logistics. Instead of needing a stack of requester, storage, and each type of provider chest (this was in the days before buffer chests), the player could just keep a single stack of generic logistic chests. When they place one, a UI opens giving them a choice of the different types of logistic chest. The player then selects one and the generic chest morphs into that type. Mining the chest turns it back into a generic one. This simple concept has grown with Factorio over the years; blueprint support was quickly added and more recently copy/paste-compatibility. All use of the mod still starts with manual chest placement and the selection UI though.

![Main selection UI for Generic Logistic Chest](media/basic_selection.webm)

[At one point in the video](https://youtu.be/cZf56r62WE8?t=575) the reviewer placed several chests at once, leaving the UI open the entire time. I believe they were showing a minor bug with the UI (placing a chest then removing it makes the dialog effectively useless), but I interpreted it as trying to place several chests and change them all at once, like so:

![Placing multiple chests, unable to change them all at once](media/old_multi_selection.webm)

At the time of the video it only changed the first chest placed by the player. That was just how it always worked; it wasn’t a conscious decision, it just never occurred to me to let the player place several and then change all of them with one click. There are plenty of times when the player will put down a row of chests, so why shouldn’t the mod support that in a nice way? So I added that feature.

![Placing multiple chests, now changing them all at once](media/new_multi_selection.webm)

This wasn’t a revolutionary feature, but it’s useful any time the player is placing multiple chests. Before this change, if the player wanted to place a row of requester chests, they would either have to place them one at a time or keep a blueprint on hand. Both of these defeated the purpose of the mod: to simplify logistic chest setup.

It wasn’t a request and I’m not even sure it was mentioned in the video. It was just something I observed when watching someone else interact with my mod. In retrospect though, I can’t believe it wasn’t in the mod from the beginning.
