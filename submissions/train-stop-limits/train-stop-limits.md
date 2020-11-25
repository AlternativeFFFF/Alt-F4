## Train Stop Limits <author>Conor_</author>

When the topic of talking about the changes that 1.1 brings came up, the obvious thing for me to discuss is of course the new 'train stop limit' feature because [I love trains](https://alt-f4.blog/ALTF4-8/#i-love-factorio-because-of-trains-conor_)! In the following, I'm taking a look at what problem this feature solves, and how I dealt with it before now.

### A simple mistake by a younger, more naive Conor_

A while ago now I was building one of my first big bases to try and beat [SpaceX](https://mods.factorio.com/mod/SpaceMod) on 5x research costs (because *Why not?*) when I noticed issues arrising in my spaghetti™ train network. In my youthful ignorance I had decided that the stops for a given material should share a name, deploying a large number of trains to run between these stops to ensure all of them get used. This was not a good idea. The simple-to-implement system led to pain and suffering, the likes of which I hadn't experienced since trying to figure out oil processing. It had worked well for me on small bases with only a couple of stops spread over a short distance, but at a large scale, trains simply weren't going to the outposts that are further away. Some trains stops were backing up and causing deadlocks whilst others were deserted. I decided there had to be a better solution, and like the good engineer I am, I ~~worked hard to research and develop and better solution to the problem~~ asked [reddit](https://www.reddit.com/r/factorio/comments/creeix/train_distribution_mod/).

{% include quote.html text='Does anyone knows of a mod that will equally distribute trains between stops of the same name, irrelevant of the distance difference. E.g. All iron unload stops called one thing but an equal number of trains go to each of the different stops.' author='Conor_ (August, 2019)'%}

What a lovely pipe dream I had there. Instead of what I asked for, I was quite rightly pointed towards [TSM](https://mods.factorio.com/mod/train-pubsub) and [LTN](https://mods.factorio.com/mods/Optera/LogisticTrainNetwork), then told to move along. With 1.1, the devs shouted down from on high: **'We have a new train feature!'** Okay devs, you have my attention...

### What are Train Stop Limits?

The train stop limit, as discussed in [FFF-361](https://factorio.com/blog/post/fff-361), allows you to set a limit on the number of trains at any one stop. The technical details of this system are talked about much more in the FFF (which is definitely worth a read), but essentially a train should only go to a train stop if there is space for it to be recieved, which is exactly what young *Conor_* wanted. But does it hold up in comparison to my new-found love TSM?

{% include image.html src='https://cdn.factorio.com/assets/img/blog/fff-361-train-stop-limit.png' alt='Train Stop Limit GUI' caption='Source: <a href="https://www.factorio.com/blog/post/fff-361">FFF-361</a>' %}

### What is TSM and why should I care?

Train supply manager is a mod which allows train stops to *request* a train when certain circuit conditions are fulfilled. One pertinent example for such a condition would be to request a train when less than a certain number of trains are en-route to the stop. It also allows you do more complex circuit wizardry such as only requesting a train when there is enough material to actually fill the train, though I have never used this functionality.

The dream for TSM is to fully implement a [just-in-time](https://en.wikipedia.org/wiki/Just-in-time_manufacturing) system by ensuring trains only ever travel when explicitly needed. This allows you to massively reduce the number of moving trains on a given network by only sending trains to be filled up when there are enough resources at the given outpost, and only sending them to drop off when resources at the target stop run low. At all other times, the trains are stationary, causing zero congestion. Though this has been possible in vanilla using large train stackers to carefully plan where waiting trains should stop, it is not ideal or convenient. In this system, the trains are being requested at both the collection and drop off stops, which is especially important for larger bases and is the reason I love TSM so much.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/15/TSL-Video-1.mp4' width='1000px' height='900px' alt='Video of TSM in action' caption='In the video, the loading and unloading stop each only ever have one train stopped at them, ensuring no backlogs happen. When a stop becomes empty, a train is dispatched from the depot by TSM to refill the stop which most urgently needs it.' %}

### Can Train Stop Limits replace TSM?

To understand when TSM will be needed versus just using the train stop limit, I recreated the same testing TSM setup in vanilla 1.1, without TSM, with [great sucess](https://www.youtube.com/watch?v=J88-RdWnNT0)!

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/15/TSL-Video-2.mp4' width='1000px' height='900px' alt='Video of same setup using train stop limits' caption='This video shows the same setup of copper trains load and unloading, again with only ever one train at the loading and unloading stops, whilst the others wait at the depot.' %}

The reason this works so well and is such a good drop-in replacement for TSM is that the trains wait at the depot stop until there is space in the loading or unloading station. If the train were to wait at the loading spot, this would cause congestion and limit the output capacity of the producer. Using depot stops allows the trains to have a "staging area" of sorts, to wait until they are needed, out of the way of the train network.

As we can seen, the entirety of this system can be recreated with the new vanilla feature, likely with better performance due to the first party nature. This doesn't even account for the increased simplicity of the train stop limit compared to understanding TSM, which has quite a steep learning curve and less than perfect documentation. TSM may still be useful in certain scenarios such as when the player wants information about which requests are currently unfufilled which TSM provides through its interface, though I personally rarely use these features.

### Conclusion

A common occurence for games with modding support is for the game developers to notice interesting mod functionality and implement it into the base game. This can be a bit painful for the mod creators as it makes their mod mostly obsolete, but in the end, they have suceeded in improving the game. Their mod is now indirectly built into the game they love, meaning more people can use it, which is great.

Special thanks to discord user *sorahn* in the [Factorio Discord Server](https://discord.com/invite/factorio) for spotting my questions and going out of his way to help me, making the map which I modified above to help illustrate how TSM can work in the "double request" configuration as well as for sanity checking my ideas before I built them.

This feature will be amazing for newer players (like the young and naive *Conor_*) to get into building larger and more elaborate train networks, more easliy. It provides yet another "Easy to learn, hard to master" feature for dedicated players to use and explore, whilst help newbies get in on the fun.
