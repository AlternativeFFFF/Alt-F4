## A scientific examination of the Factorio world

Suspension of disbelief is a well-known concept, however that does not stop me from ignoring it completely. Some days ago I saw a [Reddit post](https://www.reddit.com/r/factorio/comments/jaz6yl/calculating_the_density_of_nauvis/) about calculating the density of Nauvis, and that gave me an idea of making a just-for-fun compilation of all the ridiculous science that goes on in the Factorio universe.

Obvious warning: This article contains excessive amounts of math, if you have a crippling math allergy, feel free to skip it.

### Nauvis is a white dwarf

This is a retelling of the Reddit post by [u/DaveMcW](https://www.reddit.com/user/DaveMcW/) that I just mentioned. Note that this assumes Nauvis's day/night cycle is actually caused by rotation, which is something I'll be arguing against later on.

For a planet to not rip itself apart, gravitational acceleration must be greater than centripetal acceleration:

$ g > a $

Using the eqautions for centripetal acceleration and gravitational acceleration, we can show: 

$ GM/r^2 > rw^2 $

Next, we can substitute and rearrange to get an equation for the density of the planet:

$ density > 3π / (T^2G) $

Inputting the values for the constants and time period of Factorio's day/night cycle (T = 25000 ticks = 416.(6) s for anyone curious) we can find:

$ density > 813400 kg/m^2 $

Nauvis's density has to be greater than 813.4 g/cm<sup>3</sup>. That makes Nauvis at least as dense as a white dwarf star. For those of you not in the know, a white dwarf is what's left after a star around the mass of the Sun dies and undergoes collapse, leaving a superheated remnant about the size of the Earth. White dwarves have surface temperatures from 8 000 K to 40 000 K. For comparison, the surface of the Sun is a bit under 6 000 K. Nauvis soil must be an exceptional heat insulator!

### A bit about Nauvis's orbital mechanics

Since the shadows are at a constant length and direction throughout the day, the only possible explanation is that the light source doesn't move, meaning Nauvis is tidally locked. This means the day/night cycle is caused by a different object occluding the light. Based on the frequency of the nights, that object is probably in orbit around Nauvis, and it can't be a moon, since a moon large enough for such long nights would tidally lock Nauvis to itself. So night must be caused by a cloud of debris in orbit of Nauvis, which also gives a reason for the Engineer crashing there in the first place - the ship hit some rock in orbit.

An alternative explanation for the day/night cycle, as proposed by some, would be that Nauvis's parent star is a Cepheid variable, which I personally think is impossible, since the luminosity variance is way too high, especially for such a short period.

### Nauvis reflects at least 88.3% of all light that hits it

A single solar panel has a 9 m<sup>2</sup> area and produces 60 kW during daytime. From that number we find that the surface receives at least 6.(6) kW/m<sup>2</sup> (compare to 1 kW/m<sup>2</sup> for Earth). Considering Nauvis's ambient temperature is 15 degrees Celsius, and that it is tidally locked, we can use a rearrangement of the [effective temperature formula](https://en.wikipedia.org/wiki/Effective_temperature#Surface_temperature_of_a_planet):

$ T^4 = 0.5 * P/σ * (1-a) $

where **P** is power received per unit area, **T** is absolute surface temperature, **a** is albedo (what we're trying to find), and **σ** is the Stefan-Boltzmann constant.

$ a = 1 - 2σT^4/P $

$ T = 15 °C = 288.15 K $

$ P = 6666.(6) W/m^2 $

$ a = 0.8827 $

Nauvis has to have an albedo of at least 0.883 to maintain 15 °C. This means it reflects at least 88.3% of the light that hits it. Since the efficiency of our solar panels is probably less than 100%, and Nauvis is probably not an ideal blackbody, the albedo is likely even higher.

As some comparison, the Moon has an albedo of 0.14, and the Earth has an albedo of 0.306. If the Moon had an albedo of 0.883, it would be 6.3 times brighter. If the Earth had an albedo of 0.883, it would have an average surface temperature of -88.5 °C.

### Nukes are severely underpowered

Now it's time to come back from space and take a look at the artificial things. One piece of uranium-235 can produce 10 fuel cells, each of which contains 8 GJ (let's not think about neighbor bonus). This means a single item of U-235 has 80 GJ of fission energy in it, and since one nuke uses 30 pieces of U-235, with a 20% fission rate (which is what you get with boosted fission; something that is required for such a small nuke), it should have an explosive yield of 115 tons of TNT. That doesn't sound like a lot, but *just the explosion sprite itself* would be 60 tiles across. Such a nuke would destroy everything *completely* in a 100 tile radius, would kill everything in a 250 tile radius, and would do damage in a 500 tile radius (based on [Nukemap](https://nuclearsecrecy.com/nukemap/)).

![A 115 ton nuke overlaid over the very tip of Manhattan](https://cdn.discordapp.com/attachments/699618487097884723/769281708263735325/unknown.png)

To be fully honest, if we consider that the U-238 also contributes to a fuel cell's power, we get a somewhat smaller nuke. It's still ridiculous, but a bit less so.

*Speaking of nuclear power,*

### Nuclear fuel is 3 times hotter than the surface of the Sun

Locomotives have a constant energy consumption of 600 kW, but better fuel makes them faster. This means higher-tier fuel increases the engine's efficiency.

We can express power output through acceleration and speed:

$ P = A/t = Fd/t = Fv = mav $

Let **N** be efficiency:

$ N = mav/600 kW $

So fuel efficiency divided by coal efficiency is exactly equal to new top speed times new acceleration, meaning nuclear fuel is 1.15 * 2.5 = 2.875 times more efficient than coal. Since locomotives can run on any fuel, it's safe to assume they run on a [heat engine](https://en.wikipedia.org/wiki/Heat_engine). If this engine runs as efficiently as possible (based on a [Carnot cycle](https://en.wikipedia.org/wiki/Carnot_cycle)), its efficiency is:

$ N = 1 - T_{c}/T_{h} $

where **T<sub>c</sub>** is absolute temperature of the cold part of the engine (ambient temperature), and **T<sub>h</sub>** is absolute temperature of the hot part of the engine (heated by fuel). It is reasonable to assume that coal burns at 165 °C, based on boiler steam temperature. This means efficiency of a train running on coal is:

$ N = 1 - 288.15 K/438.15 K = 0.3423 $

Efficiency of nuclear fuel is 2.875 times greater (look above), meaning it is equal to 0.98425. This means that:

$ 1 - 288.15 K/T = 0.98425 $

$ T = 288.15 K/(1-0.98425) = 18297.525 K = 18024.375 °C $

Nuclear fuel has a temperature of over *18000 degrees*. Funnily enough, if boiler steam was just 3.68 degrees hotter, nuclear fuel's efficiency would become exactly 1, and if it went even a bit over 168.68 °C, physics would start breaking.

*That's not that big of an issue though, because everything is already broken without it. For example,*

### Items have unbelievably low densities

This part is based on [u/Maouitippitytappin](https://www.reddit.com/user/Maouitippitytappin/)'s [Reddit post](https://www.reddit.com/r/factorio/comments/j8cxvv/my_journey_to_find_scale_in_factorio/) about their journey to find scale in Factorio. To recap their post: by knowing the energy consumption of basic furnace based iron smelting, we can find the mass of 1 iron plate, which ends up being only around 40 grams. Similarly, 1 copper plate is about 65 grams. (Sources may vary, you might get different search results)

Knowing that, the total raw materials needed for a single locomotive weigh a measly 14.6 kilograms, while the locomotive itself takes up a volume of about 24 m<sup>3</sup> (assuming it's 2 high based on how it looks), meaning it has a density of 0.6 kg/m<sup>3</sup>, which is about half as dense as air.

![How to use locomotives for transportation as intended](https://media.discordapp.net/attachments/622913335783850040/769291985411899392/yes.png?width=895&height=671)

Perhaps Nauvis really is spinning, and doing it fast enough for buoyancy to be acting downwards due to centrifugal force. This is a very good explanation as to why you can fit 240 locomotives in a 1 m<sup>3</sup> chest, it's because they're probably collapsible. What it doesn't explain, however, is how trains can take a 12 meter radius turn while moving at almost 300 km/h and not derail. They should be experiencing almost 60 Gs of acceleration when turning at full speed:

$ a = v^2/r = (82.8 m/s)^2/12 m = 571.32 m/s^2 = 58.26g $

Either the curved rails are insanely sloped, or the trains have rollercoaster wheels. I personally really enjoy the thought of balloon rollercoaster trains zipping around at 300 km/h with an 18 thousand degree engine, but perhaps that's just me.
