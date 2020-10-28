## A scientific examination of the Factorio world <author>pocarski</author>

Suspension of disbelief is a well-known concept, which does not stop some of us from ignoring it completely. I recently saw a [Reddit post](https://www.reddit.com/r/factorio/comments/jaz6yl/calculating_the_density_of_nauvis/) about calculating the density of Nauvis, and that gave me the idea of making a just-for-fun compilation of all the ridiculous science that goes on in the Factorio universe. After all, this community has always been just a bunch of nerds with way too much free time, so why not indulge in some recreational nerdiness?

Obvious warning: This article contains excessive amounts of maths; if you have a crippling maths allergy, feel free to skip it.

### Nauvis is a white dwarf

This is a retelling of the Reddit post by [u/DaveMcW](https://www.reddit.com/user/DaveMcW/) that I just mentioned. Note that this theory assumes Nauvis’s day/night cycle is actually caused by rotation, which is something I’ll be arguing against later on.

Large celestial bodies are held together by gravity and, for a planet to not get ripped apart by centrifugal force, gravitational acceleration at the equator must be greater than centripetal acceleration. Using the equations for centripetal acceleration and gravitational acceleration, we can show that:

$ \frac{GM}{r^2} > rw^2 $

$ GM > r^3w^2 $

$ \frac{4}{3}\pi r^3 = V \Rightarrow r^3 = \frac{3V}{4\pi} $

$ GM > \frac{3Vw^2}{4\pi} \Rightarrow G\frac{M}{V} > \frac{3w^2}{4\pi} $

$ \frac{M}{V} = \rho ; w = \frac{2\pi}{T} \Rightarrow \frac{3w^2}{4\pi} = \frac{3\pi}{T^2} $

$ \frac{G\rho}{3} > \frac{\pi}{T^2} $

$ \rho > \frac{3\pi}{GT^2} $

Inputting the values for the constants and the period of Factorio’s day/night cycle (T = 25,000 ticks = 416.(6) seconds, for anyone unaware) we find:

$ \rho > 813,400 \mathrm{kg/m^3} $

Nauvis’s density has to be greater than 813.4 g/cm<sup>3</sup>. For comparison, steel’s density is 8.1 g/cm<sup>3</sup>, lead’s density is 11.4 g/cm<sup>3</sup>, and osmium metal, the densest substance on Earth, has a density of 22.6 g/cm<sup>3</sup>. 813.4 g/cm<sup>3</sup> is such an extreme number that Nauvis has to be a white dwarf star to be that dense. For those of you not in the know, a white dwarf is what’s left after a star around the mass of the Sun dies and undergoes collapse, leaving a superheated remnant about the size of the Earth. White dwarves have surface temperatures from 8,000 K to 40,000 K. For comparison, the surface of the Sun is a bit under 6,000 K. Nauvis soil must be an exceptional heat insulator!

### A bit about Nauvis’s orbital mechanics

Since all shadows are at a constant length and direction throughout the day we must conclude that the light source’s position in the sky doesn’t change, meaning Nauvis is [tidally locked](https://en.wikipedia.org/wiki/Tidal_locking). It follows that the day/night cycle we observe is caused by some object occluding the light. Based on the frequency of the nights, that object is probably in orbit around Nauvis, and it can’t be a moon since a moon large enough for such long nights would tidally lock Nauvis to itself. So, night must be caused by a cloud of debris in orbit of Nauvis—which also provides a reason for the Engineer crashing there in the first place: the ship hit some rock in orbit.

An alternative explanation for the day/night cycle, proposed by some, is that Nauvis’s parent star is a [Cepheid variable](https://en.wikipedia.org/wiki/Cepheid_variable), which is a type of star that varies in terms of size, temperature, and brightness in a regular pettern. I personally think this is impossible since the luminosity variance is way too high, especially for such a short period.

### Nauvis reflects at least 88.3% of all light that hits it

A single Factorio solar panel has an area of 9 m<sup>2</sup> and produces 60 kW during daytime. From that number we find that the surface receives at least 6.(6) kW/m<sup>2</sup> (compared to 1 kW/m<sup>2</sup> for Earth). Considering Nauvis’s ambient temperature is 15 degrees Celsius, and that it is tidally locked, we can use a slightly modified [effective temperature formula](https://en.wikipedia.org/wiki/Effective_temperature#Surface_temperature_of_a_planet):

$ T = \root{4}\of{\frac{1}{2}\frac{P(1-a)}{\sigma}} $

where **P** is power received per unit area, **T** is absolute surface temperature, **a** is albedo (what we’re trying to find), and **σ** is the [Stefan-Boltzmann constant](https://en.wikipedia.org/wiki/Stefan%E2%80%93Boltzmann_constant).

$ a = 1 - \frac{2\sigma T^4}{P} $

$ T = 15\mathrm{°C} = 288.15\mathrm{K} $

$ P = 6666.(6)\mathrm{W/m^2} $

$ a = 0.8827 $

Nauvis has to have an albedo of at least 0.883 to maintain 15 °C. This means it reflects at least 88.3% of the light that hits it. Since the efficiency of our solar panels is probably less than 100%, and Nauvis is probably not an ideal blackbody, the albedo is likely even higher.

As a comparison, the Moon has an albedo of 0.14 and the Earth has an albedo of 0.306. If the Moon had an albedo of 0.883, it would be 6.3 times brighter. If the Earth had an albedo of 0.883, it would have an average surface temperature of -88.5 °C.

### Nukes are severely underpowered

Now it’s time to return from space and take a look at the artificial things. One piece of Factorio Uranium-235 can produce 10 fuel cells, each of which contains 8 GJ (let’s ignore the neighbour bonus). This means a single unit of U-235 has 80 GJ of fission energy in it, and since one nuke uses 30 pieces of U-235, with a 20% fission rate (which is what you get with boosted fission; something that is required for such a small nuke), it should have an explosive yield of 115 tons of TNT. That doesn’t sound like a lot, but *just the explosion sprite itself* would be 60 tiles across. Such a nuke would destroy everything *completely* in a 100 tile radius, would kill everything in a 250 tile radius, and would do damage in a 500 tile radius (based on [Nukemap](https://nuclearsecrecy.com/nukemap/)).

![A diagram of the effects of a 115 ton nuke overlaid on a map of the tip of Manhattan](https://cdn.discordapp.com/attachments/699618487097884723/769281708263735325/unknown.png)

What the rings on this diagram mean, from smallest to largest:

* Crater and crater lip (scorch mark sprite)
* Fireball (explosion sprite)
* Heavy structure damage (the “destroy everything completely” zone)
* 100% probability of 3rd degree burns (the “kill everything” zone)
* 50% probability of first degree burns (the “do damage” zone)

To be completely honest, if we consider that the U-238 also contributes to a fuel cell’s power we get a somewhat smaller nuke. It’s still ridiculous, but a bit less so.

*Speaking of nuclear power...*

### Nuclear fuel is three times hotter than the surface of the Sun

Locomotives have a constant energy consumption of 600 kW, but better fuel makes them faster. This means higher-tier fuel increases the engine’s efficiency.

We can express power output through acceleration and speed:

$ P = \frac{A}{t} = \frac{Fs}{t} = Fv = mav $

Let **N** be efficiency:

$ N = \frac{mav}{600\mathrm{kW}} $

So, fuel efficiency divided by coal efficiency is exactly equal to new top speed times new acceleration, meaning nuclear fuel is 1.15 * 2.5 = 2.875 times more efficient than coal. Since locomotives can run on any fuel, it’s safe to assume they run on a [heat engine](https://en.wikipedia.org/wiki/Heat_engine). If this engine runs as efficiently as possible (based on a [Carnot cycle](https://en.wikipedia.org/wiki/Carnot_cycle)), its efficiency is:

$ N = 1 - \frac{T_{c}}{T_{h}} $

where **T<sub>c</sub>** is absolute temperature of the cold part of the engine (288.15 K; ambient temperature), and **T<sub>h</sub>** is absolute temperature of the hot part of the engine (heated by fuel). It is reasonable to assume that on Nauvis coal burns at 165 °C (438.15 K), based on boiler steam temperature. This means efficiency of a train running on coal is:

$ N = 1 - \frac{288.15\mathrm{K}}{438.15\mathrm{K}} = 0.3423 $

Efficiency of nuclear fuel is 2.875 times greater (see above), meaning it is equal to 0.98425. This means that:

$ 1 - \frac{288.15\mathrm{K}}{T} = 0.98425 $

$ T = \frac{288.15\mathrm{K}}{1-0.98425} = 18297.525\mathrm{K} = 18024.375\mathrm{°C} $

Nuclear fuel thus has a temperature of over *18,000 degrees Celcius*. Funnily enough, if boiler steam was just 3.68 degrees hotter, nuclear fuel’s efficiency would become exactly 1. And if it went even a bit over 168.68 °C, physics would start breaking.

*That’s not that big of an issue though, because everything is already broken without it. For example...*

### Items have unbelievably low densities

This part is based on [u/Maouitippitytappin](https://www.reddit.com/user/Maouitippitytappin/)’s [Reddit post](https://www.reddit.com/r/factorio/comments/j8cxvv/my_journey_to_find_scale_in_factorio/) about their journey to find scale in Factorio. To recap their post: by knowing the energy consumption of basic furnace-based iron smelting we can find the mass of a single iron plate, which ends up being only around 40 grams. Similarly, one copper plate is about 65 grams. (Sources may vary, you might get different search results.)

Knowing that we can calculate that the raw materials needed for a single locomotive weigh a measly 14.6 kg, while the locomotive itself takes up a volume of about 24 m<sup>3</sup> (assuming it’s 2 m high based on how it looks), meaning it has a density of 0.6 kg/m<sup>3</sup>, which is about half as dense as air. This means that locomotives can be used as balloons!

![An image of a brave pioneer using locomotives for aerial transportation](https://media.discordapp.net/attachments/622913335783850040/769291985411899392/yes.png?width=895&height=671)

Perhaps Nauvis really is spinning, and doing it fast enough for buoyancy to be acting downwards due to centrifugal force. This is a very good explanation as to why you can fit 240 locomotives in a 1 m<sup>3</sup> chest; it’s because they’re probably collapsible. What it doesn’t explain, however, is how trains can take a turn with only a 12 meter radius while moving at just under 300 km/h without derailing. They should be experiencing almost 60 G’s of acceleration when turning at full speed:

$ a = \frac{v^2}{r} = \frac{(82.8\mathrm{m/s})^2}{12\mathrm{m}} = 571.32\mathrm{m/s^2} = 58.26g $

Since the rails are clearly not sloped, the trains must have [rollercoaster wheels](https://en.wikipedia.org/wiki/Roller_coaster_wheel_assembly), holding onto the tracks from 3 sides. I personally really enjoy the thought of balloon rollercoaster trains zipping around at 300 km/h with an 18,000 °C engine, but perhaps that’s just me.
