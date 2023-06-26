## What is FUE5?

FUE5 (short for **F**actorio in **U**nreal **E**ngine **5**) is an experimental project with a simple goal: to visualize the 2D world of Factorio in 3D space. It was created by 3D artist Hurricane and Factorio modder Nuke during a five month period, starting on January 10th 2023.
While many creative people in the Factorio modding community create awesome large-scale mods like Space Exploration, Bob's mods or Angel's, we decided to take a slightly different approach. To put it simply, this project is a 3D visualization environment which can import bases from the Factorio game and visually replicate their behavior. It contains no gameplay, however you can fly around and visit your base in 3D.

{% include youtube.html id="01qux-5Qx_Y" caption='FUE5 Trailer. <a href="https://www.youtube.com/watch?v=01qux-5Qx_Y">Source</a>' %}

{% include image.html src='https://media.alt-f4.blog/ALTF4/65/snap.jpg' alt='3D view of large scale factory with a variety of machines and structures.' caption='Example of a large-scale factory in the trailer. Don’t mind the missing power poles.' %}

## How was it done?

To even start thinking about a project such as this, it was necessary to model and animate each Factorio asset, be it assembling machine or inserter, from scratch based on the sprites from the game. We've used Cinema4D for 3D modelling and Adobe Photoshop for creating the textures. Once the model and textures are done, the entire structure is exported from Cinema4D to FBX format, which is then imported into Unreal Engine 5, where proper shaders are applied - such shaders are usually materials like glass, metal, or even smoke from a chimney.

{% include image.html src='https://media.alt-f4.blog/ALTF4/65/structures.jpg' alt='3 Way split depicting chemical plant. Left: Factorio Sprite. Middle: Wireframe remodel. Right: Textured remodel.' caption='The remodelling process was a lot of fun, but next time we should really ask for the original Factorio models to preserve what’s left of our sanity.' %}

It was also necessary to replicate several key systems like belts, trains, and the logistic system. These were created via the native UE5 blueprint node system. We decided to create all the logic for these system after the 3D modelling was mostly finished, since it was necessary to have the correctly sized 3D models placed in 3D space for proper alignment of moving elements such as trains and items on belts. One major step which helped push the project forward was the ingenious idea to export Factorio bases from the game directly, and to then import them into the Unreal Engine environment. This solution saved a lot of time on base building, which would be tedious and wouldn't look correct if done in Unreal Engine alone.

{% include image.html src='https://media.alt-f4.blog/ALTF4/65/nodes.jpg' alt='Node graph within Unity.' caption='When you don’t know how to code, you just put these nodes together, and if it doesn’t work you just keep adding more and more and become increasingly confused. Suspiciously similar to this factory game I’ve been playing recently.' %}

### 1. Structure System

The first major component of FUE5 is the ability to spawn structures in an identical manner to how you'd find them in Factorio. By reading in-game data, we can get building types, their orientation and cable connections. This information is exported as a JSON file via a FUE5 exporter mod directly from inside the game. This file is then read by the FUE5 project, which is enough to visually replicate all structural and vehicular behavior of the actual base.

### 2. Transport Belt System

Apart from spawning the actual 3D models of individual transport belts, we had to figure out the item movement mechanic. This was achieved by representing transport belts as splines. When exporting a Factorio base via the FUE5 exporter, each continuous transport belt segment (a segment of transport belts which are connected and end in a tunnel, end on their own, or are looped) is treated as its own individual system. Once FUE5 reads this data, it constructs a spline for each of these individual systems. These splines then guide the items through the same path they follow in the actual game.

### 3. Train System

The train system is quite different to the transport belt system, since replicating train scheduling, signals and locomotive pathing would be very hard to do. Instead, we opted to use the native Factorio system for finding routes the trains should take. For a train to spawn and drive in FUE5, one has to set its destination and give it the green light prior to exporting the base. At this point we can read the train's pre-calculated path and use it to construct a spline which then dictates the train's movement in FUE5.

### 4. Logistic System

Right off the bat we skipped construction robots, since we're currently spawning buildings via the native UE5 Construction Script system, and that's the way it's gonna stay for a while. What we focused on instead was getting logistic robots to work properly, since they're the lifeline of any semi-advanced Factorio base and they add a lot of visual interest to the whole picture. Each roboport has a chance to randomly spawn a cluster of logistic robots, where each robot has its own simple brain to search for logistic chests in the vicinity and fly between them to visually replicate resource transportation. After this task of resource transportation is done, the robot will determine the location of the closest roboport and head to it to despawn.

## Problems and Optimization

The first major issues became apparent once bigger bases were imported into FUE5 in the early days of the project. The FPS would drop significantly and blueprint events started to produce unreliable results, which is why a lot of optimization work was necessary to even run the project at 30 to 60 FPS.

Key optimization decisions revolved around poly count, texture resolution, particles, and the amount of on-tick updates. These had to be drastically reduced by optimizing the transport belt system, which caused a lot of stuttering in the early days of the project. We've also gained a lot of FPS by tweaking and optimizing the level of detail (LOD) of the animated parts of structures - such parts include things like the spinning cylinders on centrifuges, or all the gears and pistons on the roof of the the assembling machines.

{% include image.html src='https://media.alt-f4.blog/ALTF4/65/array.jpg' alt='Array of 3D texture electric furnaces.' caption='You can never have enough iron plates.' %}

There was also the need for approval from the Factorio developer Wube Software. When asked about the legality of this whole endeavour, they showed great understanding and allowed the project to be released, provided it won't be used for commercial purposes.

## The Fun Part

Once the general idea and most of the prototyping was figured out during the first two months of production, it became quite easy to replicate various Factorio assets and systems. That's when the time came to really focus on the beauty of the whole thing and creation of the [main release trailer](https://www.youtube.com/watch?v=01qux-5Qx_Y&feature=youtu.be&ab_channel=Hurricane), which showcases large-scale bases built using the FUE5 exporter, and a lot of other cool stuff one can do within the FUE5 environment.

It was necessary to build a lot of custom stuff for the large-scale factories showcased in the trailer. Just the ability to export Factorio in-game bases doesn't result in very clean and cinematic results, so there were a lot of tweaks done by hand to make it nice for the camera! It also turned out that spaghetti bases are much more fun visually than the long strips of single buildings optimized for high science per minute (SPM).

{% include image.html src='https://media.alt-f4.blog/ALTF4/65/fun.jpg' alt='Cube with machines and structures on all sides.' caption='Is this the Skyblock I’ve been hearing so much about?' %}

## How to use FUE5

This project is not a game, doesn't have any user interface, and is kind of involved. That being said, you can find a full description of the process on our [GitHub page](https://github.com/FUE5BASE/FUE5). Apart from installing UE5 and running the downloaded project, the process really comes down to simply selecting the chunk of your base you wish to export, and exporting it to FUE5 as described in the detailed [how-to guide](https://github.com/FUE5BASE/FUE5/blob/main/BaseImportGuide.md). Once you go through the process once, it becomes really easy to repeat.

## The Future

We wanted to share this project as open source via GitHub, because the Factorio community is an extremely dedicated group of very creative people, and having access to such a project might allow some of them to experience the world they love in a new dimension. Plus, it might give the more creative ones the ability to create things which were not possible before.

Myself and Nuke are currently working on polishing the existing systems so they're easy to use and perform well even with larger bases. We also started toying around with the idea of adding modded content in the future.

The factory must grow!

{% include image.html src='https://media.alt-f4.blog/ALTF4/65/se.jpg' alt='3D space elevator base surrounded by belts and machines.' caption='No joke here. Go play Space Exploration.' %}
