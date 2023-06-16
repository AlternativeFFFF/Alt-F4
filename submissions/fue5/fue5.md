# What is FUE5?
FUE5 (short for Factorio in Unreal Engine 5) is an experimental project with a simple goal - to visualize the 2D world of Factorio in 3D space. It was created by a 3D artist Hurricane and Factorio modder Nuke during 5 month period, starting on January 10 2023.
As many creative people in the Factorio modding community create awesome large scale mods like Space Exploration, Bob's mods or Angels, we decided to take slightly different approach. To put it simply - this project is 3D visualization environment which is able to import bases from the Factorio game and seemingly replicate their behavior. It contains no gameplay, however you can fly around and visit your base in 3D.

{% include youtube.html id="01qux-5Qx_Y" caption='FUE5 Trailer. Source' %}

![image](https://cdn.discordapp.com/attachments/1082941602806374521/1106489698240712714/snap1_0-00-00-00.jpg)
*Example of a large scale factory in the trailer. Don't mind the missing power poles.*

# How was it done?
To even start thinking about project such as this it was necessary to model and animate each Factorio asset, be it Assembling Machine or Inserter, from scratch based on the pictures from the game. We've used Cinema4D for 3D modelling and Adobe Photoshop for creating the textures. Once the model and textures are done, the entire structure is exported from Cinema4D to FBX format which is then imported to UE5 and proper shaders are applied - such shaders are usually materials like glass. metal or even smoke effect from the chimney.

![image](https://cdn.discordapp.com/attachments/628560996717559820/1116413192575397978/structures.jpg)
*The remodelling process was a lot of fun but next time we should really ask for the original Factorio models to keep what's left of our sanity.*

It was also necessary to replicate several key systems like the belt transportation, train or logistic systems. These were created via the native UE5 blueprint node system. We decided to create all the logic for these system after the 3D modelling was mostly finished since it was necessary to have the correctly sized 3D models placed in 3D space for proper alignment of moving elements such as trains and items on belts. Major step, which helped to accelerate the project forward, was ingenious idea to export Factorio bases from the game directly and then import them to the Unreal Engine environment. This solution saved a lot of time of base building which would be tedious and wouldn't look correct if done in the Unreal Engine alone.

![image](https://cdn.discordapp.com/attachments/628560996717559820/1116411057775325214/nodes.jpg)
*When you don't know how to code you just put these nodes together and if it doesn't work you just keep adding more and more and become increasingly confused. Suspiciously similar to this factory game I've been playing recently.*

#### 1. Structure System
First major compoment of FUE5 is the ability to spawn structures in identical manner as you'd find them in the Factorio game. By reading ingame data we can get building types, their orientation and cable connections. This information is exported as a JSON file via FUE5 exporter mod directly from the game. This file is then read by FUE5 project and the data in this file alone is enough to seemingly replicate all structural and vehicular behavior of the actual Factorio base.

#### 2. Transport Belt System
Apart from spawning the actual 3D models of individual Transport Belts, we had to figure out the item movement mechanic. This was achieved by representing Transport Belts as splines. The moment you export Factorio base via FUE5 exporter, each continuous Transport Belt segment (a segment of Transport Belts which are connected and end in a tunnel, end on their own or are looped) is treated as it's own individual system. Once FUE5 reads this data it constructs a spline for each of these individual systems and these splines then guide the items through the same path they follow in the actual game.

#### 3. Train System
Train system is quite different than the Transport Belt System since replicating train scheduling, signals and Locomotive's autonomous driving would be very hard to do so we opted for using the native Factorio system for finding routes the train should take. For a train to spawn and drive in FUE5 one has to set it's destination prior to exporting via the FUE5 Exporter and give the train a green light. At this point we can read the train's pre-calculated path and use it to construct a spline which then drives the train's movement in FUE5.

#### 4. Logistic System
Right off the bat we skipped Construction Robots since we're 'currently spawn buildings via the native UE5 Construction Script system and that's the way it's gonna stay for a while. What we focused on was getting the Logistic Robots to work properly since they're the lifeline of any semi-advanced Factorio base and they add a lot of visual fidelity to the whole picture. Each Roboport has a chance to randomly spawn a cluster of Logistic Robots where each Robot has it's own simple brain to search for Logistic Chests in the vicinity and fly between them to seemingly replicate resource transportation. After this task of resource transportation is done, the Robot will for the location of the closest Roboport and heads to it for despawn.


# The problems and optimization
First major issues became apparent once bigger bases were imported into the FUE5 in the early days of the project. The FPS would drop significantly and blueprint events started to produce unreliable results which is why a lot of optimization work was necessary to even run the project at 30 to 60 FPS.

Key optimization decisions came to poly count, texture resolution, particle amount and the amount of ontick updates which had to be dastically reduced by optimizing the Transport Belt system which caused a lot of stuttering in the early days of the project. We've also gained a lot of FPS by tweaking and optimizing the LODs of the animated parts of structures - such parts include things like the spinning cylinders on Centrifuge or all the gears and piston on the roof of the the Assembling Machines.

![image](https://cdn.discordapp.com/attachments/628560996717559820/1116779471148683264/array.jpg)
*You can never have enough iron plates.*

There was also the need for approval from the original Factorio developer Wube Software. When asked about the legality of this whole endeavour they showed great understanding and allowed the project to be released, provided it won't be used for commercial purposes.


# The fun
Once the general idea and most of the prototyping was figured out during the first two months of production it became quite easy to replicate various Factorio assets and systems. That's when the time came to really focus on the beauty of the whole thing and creation of the [main release trailer](https://www.youtube.com/watch?v=01qux-5Qx_Y&feature=youtu.be&ab_channel=Hurricane) which showcases large scale bases built using the FUE5 Exporter and a lot of other cool stuff one can do within the FUE5 environment.
It was necessary to build a lot of custom stuff for the large scale factories showcased in the trailer because just the ability to export Factorio ingame bases doesn't provide such clean and neat cinematic results so you gotta tweak a lot of stuff by hand to make it nice for the camera! It also turned out the spaghetti bases are much more fun visually than the long strips of single building optimized for high SPM.

![image](https://cdn.discordapp.com/attachments/628560996717559820/1116780913586618398/fun.jpg)
*Is this the SkyBlock I've been hearing so much about?*

# How to use FUE5
This project is not a game, doesn't have any user interface and is kinda geeky to fully understand. That being said you can find full description of the process on our [GitHub page](https://github.com/FUE5BASE/FUE5). Apart from installing UE5 and running the downloaded project, the process really comes down to simply selecting the chunk of your base you wish to export and then import the exported data to the FUE5 project as described in the detailed [How-to Guide](https://github.com/FUE5BASE/FUE5/blob/main/BaseImportGuide.md). Once you go through the process at least once, it becomes really easy to repeat.

# The future
We wanted to share this project as a open source via GitHub because Factorio community is extremely dedicated group of very creative people and having access to such project might allow to some of the Factorio fans experience the world they love in a new dimension and to give the more creative ones the ability to create things which were not possible before.

Myself and Nuke are currently working on polishing the existing systems so they're easy to use and perform well even with larger bases. We also also started toying around with the idea of adding modded content in the future.

The factory must grow!

![image](https://cdn.discordapp.com/attachments/628560996717559820/1116780591153688698/se.jpg)
*No joke here. Go play Space Exploration.*