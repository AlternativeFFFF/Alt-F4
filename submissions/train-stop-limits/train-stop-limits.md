## 1.1 Feature Discussion - Train stop limits

With the Factorio 1.1 beta released to the public, we thought this an appropriate time to talk about some of the changes it bring as well as to talk about how the community has been accounting for the lack of these features up until now.

### A simple mistake by a younger, more naive *Conor_*

A while ago now, I was building one of my first large bases (I believe to support beating SpaceX with 5x research costs, because *Why not?*) when I noticed issues arrising in my spaghetti™ train network. In my youthful ignorance, I had decided that each stop for a given material should have the same name and have a large number of trains set between these stops to ensure all stops get used. *This was not a good idea.* This simple to implement system led to pain and suffering, the likes of which I hadn't experienced since trying to build oil processing. This system had worked well for me on small bases with only a couple stops spread over a short distance, but at a large scale, Trains simply weren't going to the further away outposts. Some trains stops were backing up and causing deadlocks whilst other were empty. I decided there must be a better solutition, and like the good engineer I am, I ~~worked hard to research and develop and better solution to the problem~~ asked [reddit](https://www.reddit.com/r/factorio/comments/creeix/train_distribution_mod/).

> Does anyone knows of a mod that will equally distribute trains between stops of the same name, irrelevant of the distance difference. E.g. All iron unload stops called one thing but an equal number of trains go to each of the different stops. - Conor_ August 2019

*This truely was a lovely pipe dream.* Instead of what I asked for, I was quite rightly pointed towards [TSM](https://mods.factorio.com/mod/train-pubsub) and [LTN](https://mods.factorio.com/mods/Optera/LogisticTrainNetwork), then told to move along. Now, the devs have shouted down from on high, **We have a new train feature!** Okay devs, you have my attention...

### What is it?

The train stop limit, dicussed here in [FFF-361](https://factorio.com/blog/post/fff-361), allows you to set a limit on the number of trains at any one stop. The technical details of this system are talked about much more in the FFF (which is definitely worth a read!), but essentially a train should only go to a train stop if there is space for it to be recieved, exactly what young *Conor_* wanted. But does it hold up in comparison to my new love, TSM? 

![Train Stop Limit GUI](https://cdn.factorio.com/assets/img/blog/fff-361-train-stop-limit.png)

### How have modders been bypassing it?

Train supply manager, a.k.a. train pub sub, is a mod which allow train stops to request a train when certain circuit conditions are true, for example when less than a certain number of trains are enroute to the stop. It also allows you do more complex circuit wizardry such as only requesting a train when there is enough material to actually fill the train, though I have never used this functionality.

The dream for TSM, is to fully implement a [just in time](https://en.wikipedia.org/wiki/Just-in-time_manufacturing) system, by ensuring trains only ever travel full and only when they are explicitly needed. This allows you to massively reduce the number of trains on a given network by removing only send trains to be filled when there is enough resources at a given outpost and only send them to drop off when the resources in the given area are low. At all other times, the trains are sat stationary, causing zero congestion. In this system, the trains are requested at both the collection and drop off stops, This is especially important for larger bases and is the reason I love TSM so much.

![Video of TSM in action](https://media.alt-f4.blog/ALTF4/15/TSL-Video-1.mp4)
*In the video, the loading and unloading stop each only ever have one train stopped at them ensuring no backlogs. When a stop becomes empty, a train is dispatched from the depot by TSM to refill the stop which most urgently needs it.*

### When will TSM be needed?

To understand when TSM will be needed vs just using the train stop limit, I recreated the same testing TSM setup in vanilla 1.1 with [great sucess](https://www.youtube.com/watch?v=J88-RdWnNT0)! 

![Video of same setup using train stop limits](https://media.alt-f4.blog/ALTF4/15/TSL-Video-2.mp4)
*This video shows the same setup of copper trains load and unloading, again with only ever one train at the loading and unloading stops, whilst the others wait at the depot.*

The reason this works so well and is such a good drop in replacement for TSM is that the trains wait at the depot stop until there is space. If the train were to wait at the loading spot, this would cause congestion and limit the output capacity of the producer. Using depot stops allows the trains to have a "staging area" of sorts, to wait until they are needed, out of the way of the train network.

As seen above, the entirety of this system can be recreated with the new vanilla feature, likely with better performance due to the first party nature. This doesn't even account for the increased simplicity of the train stop limit compared to understanding TSM, which has quite a steep learning curve and less than perfect documentation. 

### Conclusion

A common occurence for games with modding support, is for the original developers to see interesting mod functionality and implement it into the base game. This can often hurt the mod creators as it makes their mod mostly obsolete but in the end, they have suceeded in improving the game. Their mod is now indirectly built into the game they love, meaning more people can use it. Special thanks to discord user *sorahn* in the [Factorio Discord Server](https://discord.com/invite/factorio) for spotting my questions and going out of his way to help me, making the map which I modified above to help illustrate how TSM can work in the "double request" configuration as well as for sanity checking my ideas before I built them.

This feature will be amazing for newer players (like the young and naive *Conor_*) to get into building larger and more elaborate train networks, more easliy. It provides yet another "Easy to learn, hard to master" feature for dedicated players to use and explore, whilst help newbies get in on the fun.
