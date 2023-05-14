# What is FUE5?
FUE5 (short for Factorio in Unreal Engine 5) is an experimental project with a simple goal - to visualize the 2D world of Factorio in 3D space. It was created by a 3D artist Hurricane and Factorio modder Nuke during 5 month period, starting on January 10 2023. As many creative people in the Factorio modding community create awesome large scale mods like Space Exploration, Bob's mods or Angels, we decided to take slightly different approach.

![image](https://cdn.discordapp.com/attachments/1082941602806374521/1106489698240712714/snap1_0-00-00-00.jpg)

# How was it done?
To even start thinking about project such as this it was necessary to model and animate each Factorio asset, be it Assembling Machine or Inserter, from scratch based on the pictures from the game. It was also necessary to replicate several key systems like the belt transportation, train or logistic systems.
Major step, which helped to accelerate the project forward, was ingenious idea to export Factorio bases from the game directly and then import them to the Unreal Engine environment. This solution saved a lot of time of base building which would be tedious and wouldn't look correct if done in the Unreal Engine alone.

![image](https://cdn.discordapp.com/attachments/1082941602806374521/1106489890008473621/snap2_0-00-00-00.jpg)

# The problems
First major issues became apparent once bigger bases were imported into the UE project in the early days of the project.

The FPS would drop significantly and blueprint events started to produce unreliable results which is why a lot of optimization work was necessary to even run the project at 30 to 60 FPS. Key optimization decisions came to poly count, texture resolution, particle amount and the amount of ontick updates which had to be reduced drastically by mainly optimizing the belt and train systems which caused a lot of stuttering in the early days of the project.

There was also the need for approval from the original Factorio developer Wube Software. When asked about the legality of this whole endeavour they showed great understanding and allowed the project to be released in it's current state.

![image](https://cdn.discordapp.com/attachments/1082941602806374521/1106490230497882132/snap4_0-00-00-00.jpg)

# The fun
Once the general idea and most of the prototyping was figured out during the first month of production it became quite easy to replicate various Factorio assets and systems. That's when the time came to really focus on the beauty of the whole thing and creation of the main release trailer which showcases large scale bases built using the FUE5 Exporter and a lot of other cool stuff one can do within the FUE5 environment.
It was necessary to build a lot of custom stuff for the large scale factories showcased in the trailer because just the ability to export Factorio ingame bases doesn't provide such clean and neat cinematic results so you gotta tweak a lot of stuff by hand to make it nice for the camera! It also turned out the spaghetti bases are much more fun visually than the long strips of single building optimized for high SPM.

![image](https://cdn.discordapp.com/attachments/1082941602806374521/1106491380617990144/snap5_0-00-00-00.jpg)

# The future
We wanted to share this project as a open source via GitHub because Factorio community is extremely dedicated group of very creative people and having access to such project might allow to some of the Factorio fans experience the world they love in a new dimension!

Myself and Nuke aren't planning any major overahuls of this project since we have day jobs of our own and this project already took huge chunk of our free time. The basic principles of several blueprint systems we created aren't perfect aswell so expanding upon them wouldn't be as reasonable as reworking them from ground up.

That being said we are excited about the opportunities this project gives us within the awesome world of Factorio so I wouldn't rule out occasional toying around and creating more FUE5 content in the future! :)

![image](https://cdn.discordapp.com/attachments/1082941602806374521/1106491380953526393/snap3_0-00-00-00.jpg)