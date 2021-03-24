### Mod Spotlight: No Belts <author>oof2win2</author>

[No Belts](https://mods.factorio.com/mod/no-belts) is a Factorio mod that is something that doesn't show up very often on the mod portal: it removes a core game mechanic. As you might have guessed from the title, the concept of the mod is that your ability to place belts is removed, which is generally one of the first things you place down when you start automating things. Instead, you have the ability to place logistic robots much earlier in the game, basically from the point where you manufacture your first green circuit.

The grind in the start may feel a bit harder, but it has a reward: everything can be bot-based. Mining, production, everything. The concept of a "main bus" can be thrown out, since nothing like that is possible (unless you get train wagons and inserters). Furthermore, you **will** need to re-design a large part of your designs so it can still be placeable, as not even robots can place belts. This means that you get to enjoy re-designing things that you will be using, which might come in handy sometime later, if you design it well!

{%include image.html src='./fullres_screenshot.png' alt='Bot based LDS' caption='Belt based LDS factory turned into bot-based' }

Above, you can see a low density structure production facility. This is an example of a blueprint that has been converted from using belts to using robots. In this case, it was very easy, as I just used a beacon forest. You can however create any design you like! The blueprints are available [here](blueprints.txt), 
but the bot based factory isn't as productive as it can be - it has 1k LDS less due to robot issues, but that can be easily fixed by just adding in a bit more roboports (or a mod that increases charging capacity and charging speed).
// CHARGING SPEED is being increased, so this comment may not be true after. Will need to test it

You may also ask about performance. That is a very valid question and understandable with robots being considered as UPS killers. I have thought of this, so I experimented. I gave the Alt-F4 team the save, and they gave their results back, so below is a table. Remember, looking at bots means looking at 100k bots in one place, which is something you wouldn't encounter in your average playthrough

| Specs                                      | FPS/UPS (looking at bots) | FPS/UPS (not looking at bots) |
|--------------------------------------------|---------------------------|-------------------------------|
| i7-8700, 16GB RAM, 1060                    | 25                        | 60                            |
| Ryzen 7 2700, 16GB RAM, RTX 3080 (UHD res) | 35                        | 40-50                         |
| Ryzen 5 3600, 32gb ram @ 3000mhz, GTX 1070 | 20                        | 40-50                         |
| (Laptop) i7-5700, 8GB RAM, integrated      | 19                        | 27                            |

I wish you, who might want to try the mod out, best of luck! If you happen to create something amazing (as the community just won't stop doing), reach out to me on Discord, prefferably through the [Alt-F4 discord](https://discord.gg/ceKebbY). I might want to feature you on my mod page!