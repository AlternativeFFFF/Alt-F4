## Mod Spotlight: [Realistic Fusion Power](https://mods.factorio.com/mod/RealisticFusionPower) <author>Romner</author>

It always bothered me that we can *somehow* make small, portable fusion reactors, but we can’t make any factory-sized ones. So I made this mod. Now, I know a lot of you will be asking why. Why do we need fusion when we already have nuclear fission?

- In the end game, you will need a lot of power. A **lot** of power. At the lowest UPS cost possible. A single fusion power plant can produce a bit over 40 GW. That’s equivalent to about 500,000 solar panels.
- Fission needs uranium which has to be mined with sulfuric acid, and when depleted you need to find another ore patch. Fusion uses deuterium which is (relatively) abundant in water. Solar needs a lot of space. Steam... well, you probably already know why steam isn’t really an option in the endgame.

### Technologies

Fusion isn’t easy to achieve of course, because otherwise us humans would be using it as our primary power source. To get the full 20 GW/power plant you’ll need a bit over *one million* science packs of each type (except military). At first, fusion will be very impractical and use more energy than it produces, but at the end you’ll feel like you have unlimited energy (which you practicaly will).

With chemical science, the only thing you can unlock is deuterium extraction by boiling water to separate heavy water from normal water (heavy water has a boiling point ~1 °C higher than normal water) and then electrolysing the heavy water.

The first fusion reaction you can unlock is D-D (Deuterium-Deuterium) with production science, which can not even sustain itself. After a few efficiency upgrades it becomes possible to use as a power source, but still pretty impractical compared to fission (150 MW/power plant at most). You can also unlock the Girdler sulfide (GS) process, which can concentrate heavy water to ~5% (and then 10% with a second research) before boiling it. This is much more space and energy efficient than directly boiling water.

With utility science you can unlock tritium breeding from the D-D reactions and D-T fusion, which at first produces ~1 GW (with efficiency upgrades the most you can get is ~1.6 GW) — at this point fusion becomes more practical than fission. After that, you can also research helium-3 breeding from D-D and unlock basic aneutronic fusion (He3-He3) which can convert the energy generated directly to electricity (no need for heat exchangers/turbines). He3-He3 cannot sustain itself at first, but can produce up to 3.5 GW with efficiency upgrades. You can also concentrate heavy water to 20% before boiling it, increasing efficiency even more.

If [RTG](https://mods.factorio.com/mod/RTG) is installed you can also unlock a portable fusion reactor that can produce a lot of power but needs fuel. You also unlock He3-He3 fuel cells which can last 12.5 minutes each at the max 20 MW output. (Of course you’ll never be able to use the full 20 MW, much less for 12.5 minutes straight, so they will last a lot longer.)

With space science you can unlock more efficiency upgrades to D-T and He3-He3, allowing them to produce 1.9 GW and 10 GW respectively. You can also unlock D-He3 aneutronic fusion, which doesn’t need as much energy to heat as He3-He3 and produces more heat — 5 GW without upgrades, 18.5 GW with. After that you can unlock tritium decay to helium-3. (This was originally meant for the [weaponry addon](https://mods.factorio.com/mod/RealisticFusionWeaponry), but it can also boost power production to ~41 GW/power plant, and it can be disabled with a setting.) You can also unlock D-He3 fuel cells for the portable reactor if [RTG](https://mods.factorio.com/mod/RTG) is installed. These can last ~17 minutes each at 20 MW.

If that still isn’t enough for you, there’s another recently added (currently beta; can be disabled in mod settings) power source: antimatter. First, you research hydrogen extraction+ionization after all of the fusion-related tech is researched. That allows you to split hydrogen atoms into protons and electrons. Next, you can research particle acceleration and antimatter science packs which don’t need a lot of resources except power — a single particle accelerator can use 10 GW to produce 100/s. After a bunch of other research, the least you can expect of an antimatter power plant can be ~1.3 TW (~1,300 GW). The most is ~1.5 TW. Either way, it’s way more energy than anyone could ever use without giant UPS drops.

If this seems to be too easy, keep in mind that just basic deuterium extraction needs more science that fission power. There’s also a multiplier to change the science cost if you’d like some extra challenge.

### Fusion - How it works

20 GW example power plant (no tritium decay):

{% include imgur.html id="P8EY3TD" %}

First, you get a lot of water and, using the GS process, enrich it to 20% heavy water (which has deuterium instead of ordinary hydrogen). In the process you generate a lot of deuterium-depleted water which can either be boiled into steam or dumped back into wherever the water came from. Discharging water back into a lake or whatever isn’t possible without some workarounds. What I did is make the discharge pump internally an assembling machine that can only be built on water. Its recipe needs 1,200 depleted water and produces 0 depleted water — that way it’s possible to “discharge” the depleted water.) After you have the pure heavy water, you have to electrolyze it to get the deuterium needed for fusion.

After you get the deuterium, you have to heat it to the temperature fusion occurs at (which is pretty damn high, by the way). The interesting thing about the heater is that it isn’t your regular boiler, nonono. Internally, it’s actually a furnace. A furnace is effectively an assembling machine which chooses its own recipe based on the ingredients. I did this so that I can make technologies that can improve the heating efficiency. (If there’s more than one recipe with the same ingredients, the heater chooses alphabetically using the internal name, so for example I can make a `recipe-1` and then unlock `recipe-0` with a technology and the heater will use `recipe-0` if it’s unlocked).

Now that you have the plasma, you have to somehow get it into the reactor. Iron pipes won’t do:

{% include imgur.html id="XCW5W7T" %}

The orange pipes on the left are magnetic containment pipes. With these, you can transport plasma at temperatures of millions of degrees. Any other pipe will explode. This is achieved by a script that checks 16 pipes every tick (about 1,000 pipes per second).

“But wouldn’t that kill my UPS?” Nope:

{% include imgur.html id="CsPrDkv" %}

The performance is about the same regardless of how many pipes are placed down because it goes through a set amount (16 by default; customizable with a mod setting) of pipes per tick. If you do have performance problems, you can simply turn it down in the mod settings, or disable it completely by setting it to 0.

Back to the reactor. It works similarly to the heater (it’s a furnace internally, recipes get unlocked by techs, etc.), except that instead of plasma it produces a “fluid” called GJ. It can’t be transported by *any* pipes, pumps, undergrounds or storage tanks. It simply disappears. The heat exchanger is internally a reactor that consumes said GJ. 1 GJ (the “fluid”) = 1 GJ of heat energy. Then you just get some heat exchangers and turbines to convert the heat to electricity like with fission. I also added high capacity versions of both that consume and produce ten times more for UPS and space reasons. (D-T can make up to 2 GW = 200 heat exchangers and 343 turbines or 20 HC exchangers and 35 HC turbines.) D-D produces tritium and helium-3, which can be mixed with deuterium. The aneutronic reactor works exactly the same as the normal reactor, and the direct energy converter is internally a generator (like the steam turbine).

You’ll also need a lot of energy to kickstart the process, since you first need to heat whatever you’re fusing to get it to actually fuse and produce energy. Without efficiency upgrades D-D needs 400 MW to kickstart, D-T needs 200 MW, He3-He3 needs 7 GW, and D-He3 needs 5 GW.

### Antimatter - How it works

The first thing you do is electrolyze normal water to get hydrogen, and then ionize it to separate the electrons from protons. Then you need to accelerate and collide protons to get high-energy (read as very-speedy) antiprotons and collide electrons to get high-energy positrons in the particle accelerator. Accelerators consume 10 GW each, and you will need four of them. Decelerators consume half of that, but you’ll need twice as many. After that you have to slow the high-energy particles with the particle decelerator to get (non-speedy) antiprotons and positrons. You then combine those to get antihydrogen, which can be used to make matter-antimatter fuel cells which can be used in the reactor to produce energy.

Do *not* use normal pipes to route antimatter. Unless you like big explosions and are too lazy to make [actual weapons](https://mods.factorio.com/mod/RealisticFusionWeaponry) with the antimatter you waste by doing that. This uses the same script as the plasma, so no noticeable performance impact.

{% include imgur.html id="LrNZuGL" %}

This part is work in progress at the time of writing (it can be disabled in settings), so there isn’t a lot of content for antimatter yet (and I’m not sure about the balance), but that should change with updates in the future.

Also, some of the textures are modified from [Krastorio 2](https://mods.factorio.com/mod/Krastorio2). If you haven’t tried it yet, then do — it’s between vanilla and angelbobs in terms of difficulty and the graphics look awesome. If you’re one of the people that made Krastorio and don’t want me to use the textures, please contact me (see below) and I’ll replace them with something else.

### Outro

So, you made it to the end. That probably means you’re interested in the mod. If that’s the case, go ahead and [download it](https://mods.factorio.com/mod/RealisticFusionPower)! If not, then tell me what I could improve though the [forums](https://forums.factorio.com/memberlist.php?mode=viewprofile&u=63064) or on Discord (Romner#5341). Or don’t. Up to you. Also, don’t worry about not being ‘professional’ enough or whatever when contacting me. We mod makers aren’t all that different from other people. :)

There will also be a part two in the next Alt-F4 where I’ll talk about the [weaponry addon](https://mods.factorio.com/mod/RealisticFusionWeaponry), which will contain lots and lots of big explosions.
