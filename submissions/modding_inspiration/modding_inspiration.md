## Modding Inspiration

I love getting feedback on my mods. Sometimes inspiration for new features are found in the oddest places. Last month, a comment was left on my [Generic Logistic Chest](https://mods.factorio.com/mod/Generic_Logistic_Chest) mod from a German YouTube channel linking to a spotlight of the mod. Not speaking any German myself, I still watched it a bit to see how the reviewer was showcasing the mod.

![](https://youtu.be/cZf56r62WE8)

Before I explain what I saw in the video that prompted a change, let me give some background on the Generic Logistic Chest mod. It started out as an idea to simplify inventory/quickbar for setting up logistics. Instead of a stack of requester, storage, and each type of provider chests (this was in the days before buffer chests), the player could just keep a single stack of "generic" logistic chests. When they plop one down a UI opens, showing them the choice of all the logistic chests. The player then selects one and that generic chest changes into it. Mining the changed chest turns it back into a generic chest. Simple in concept, though the mod has grown with Factorio over the years. Blueprint support was quickly added and more recently copy/pasting. Though any use of the mod starts with this manual placement and selection UI.

![Main selection UI for Generic Logistic Chest](media/basic_selection.webm)

[At one point in the video](https://youtu.be/cZf56r62WE8?t=575) the reviewer places several chests leaving the UI open the entire time. I believe they were showing a minor bug with the UI (placing a chest then removing it meant that the UI was effectively useless), but I interpreted it as them trying to place several chests and change them all at once. Like so:

![Placing multiple chests, unable to change them all at once](media/old_multi_selection.webm)

At the time of the video, it only changed the first chest placed by the player. That was just how it always worked, it wasn't a conscious decision, it just never occurred to me to let the player place several and then change all of them with one click. There are plenty of times when the player will put down a row of chests, so why shouldn't the mod support that in a nice way?

![Placing multiple chests, now changing them all at once](media/new_multi_selection.webm)

This wasn't a revolutionary feature, but it helps out any time the player is using the chest. Before this change, if the player wanted to place a row of requester chests, they would either have to place them one at a time, or keep a blueprint on hand. Either one of these defeated the purpose of the mod, which was to simplify logistic chest setup.

It wasn't a request and I'm not even sure it mentioned in the video. It was just something I observed when watching someone else interact with my mod. In retrospect though, I can't believe it wasn't in the mod from the beginning.
