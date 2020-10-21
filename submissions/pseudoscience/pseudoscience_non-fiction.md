## A scientific examination of the Factorio world

Suspension of disbelief is a well-known concept, however that does not stop me from ignoring it completely. Some days ago I saw a [Reddit post](https://www.reddit.com/r/factorio/comments/jaz6yl/calculating_the_density_of_nauvis/) about calculating the density of Nauvis, and that gave me an idea of making a just-for-fun compilation of all the ridiculous science that goes on in the Factorio universe. I will not go into the formulas because that would make this article sound like a research paper. Instead, I leave the exact calculations as an exercise for the especially dedicated reader.

### Nauvis is a white dwarf

This is a short recap of the Reddit post by [u/DaveMcW](https://www.reddit.com/user/DaveMcW/) that I just mentioned. We know the length of one day/night cycle on the planet, which gives us its angular velocity. By stating that the centripetal force from the planet's rotation has to be less than gravity at the equator and then cancelling a bunch of values, we get that Nauvis's density has to be greater than 813400 kg/m\^3. That makes Nauvis at least as dense as a white dwarf star.

### A bit about Nauvis's orbital mechanics

Since the shadows are at a constant length and direction throughout the day, the only possible explanation is that the light source doesn't move, meaning Nauvis is tidally locked. This means the day/night cycle is caused by a different object occluding the light. Based on the frequency of the nights, that object is probably in orbit around Nauvis, and it can't be a moon, since a moon large enough for such long nights would tidally lock Nauvis to itself. So night must be caused by a cloud of debris in orbit of Nauvis, which also gives a reason for the Engineer crashing there in the first place.

### Nauvis reflects at least 88.3% of all light that hits it

A single solar panel has a 9 m\^2 area and produces 60 kW during daytime. From that number we find that the surface receives at least 6.67 kW/m\^2 (compare to 1 kW/m\^2 for Earth). Considering Nauvis's ambient temperature is 15 degrees Celsius, we can use the [effective temperature formula](https://en.wikipedia.org/wiki/Effective_temperature#Surface_temperature_of_a_planet) to find that if Nauvis was a perfect blackbody, it has to have an albedo of 0.883 (keeping in mind that it's tidally locked). For comparison, the Earth has an albedo of 0.306, the Moon has an albedo of 0.12, and Enceladus, the most reflective body in the Solar system, has an albedo of 0.9. And all of that without even considering that solar panels have less than 100% efficiency, and that Nauvis is not an ideal blackbody!

### Nuclear fuel is 3 times hotter than the surface of the Sun

Now it's time to come back from space and take a look at the artificial things. Locomotives have a constant energy consumption of 600 kW, but better fuel makes them faster. This means higher-tier fuel increases the engine's efficiency. Since useful power is force times velocity, efficiency is proportional to acceleration times top speed. Now, since we can use any fuel to power the locomotive, we can safely assume it is based on a [heat engine](https://en.wikipedia.org/wiki/Heat_engine). If we assume that the engine is a perfect heat engine that works using the [Carnot cycle](https://en.wikipedia.org/wiki/Carnot_cycle), and that coal burns at a temperature of 165 degrees Celsius (based on boiler steam temperature) and ambient temperature is 15 degrees, after plugging in all the numbers we get that nuclear fuel has a temperature of over 18000 degrees.

### Nukes are severely underpowered

One piece of uranium-235 can produce 10 fuel cells, each of which contains 8 GJ (let's not think about neighbor bonus). This means a single item of U-235 has 80 GJ of fission energy in it, and since one nuke uses 30 pieces of U-235, with a 20% fission rate (which is what you get with boosted fission something that is required for such a small nuke), it should have an explosive yield of 115 tons of TNT. That doesn't sound like a lot, but one of those would destroy everything completely in a 100 tile radius, would kill everything in a 250 tile radius, and would do damage in a 500 tile radius (based on [Nukemap](https://nuclearsecrecy.com/nukemap/))

### Items have extremely low densities

This part is based on [u/Maouitippitytappin](https://www.reddit.com/user/Maouitippitytappin/)'s [Reddit post](https://www.reddit.com/r/factorio/comments/j8cxvv/my_journey_to_find_scale_in_factorio/) about their journey to find scale in Factorio. To recap their post: by knowing the energy consumption of iron smelting, we can find the mass of 1 iron plate, which ends up being only around 40 grams.

Knowing that, the iron needed for a single locomotive weighs a measly 6.7 kilograms, while the locomotive itself takes up a volume of about 24 m\^3 (assuming it's 2 high based on how it looks), meaning it is about 3 times less dense than air.
