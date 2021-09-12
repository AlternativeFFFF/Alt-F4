---
author: Lovely_Santa
image:
  url: none
  transcription: A succesfull attempt at automated mod testing
title: "Alt-F4 #999 - A succesfull attempt at automated mod testing..."
lang: en
discuss:
  discord: https://alt-f4.blog/discord
---

After a long while, an old contributer *Lovely_Santa* is back in his writing pen! It has been since Issue #2 that we've heared from him, when he was experimenting with the modding abilities the (at the time) new spidertron. This time he stays on topic with the Angel's mods, while writing about something completely different...

## How it all began...

Before I tell you a story about automating the boring parts of creating a Factorio mod, I have to take you back to the beginning... Once upon a time, -no.. I have to start somewhere at the end of 2019. And by that I do not mean the well-known story of how COVID-19 started, but with the sad story about Arch666Angel stepping back from creating his all-famous [Angel's mods](https://mods.factorio.com/user/Arch666Angel). This all came due to IRL changes in his life. I'm not gonna bother explaining all the details, but it resulted in a few modders being interested in taking over his legacy.

It took until the 27th of January 2020 to convince Arch666Angel to let the community contribute to his creation. After working out all the details, he selected few people to keep his vision of the mods alive, at which point we could inform the public about this. The main interaction at the time went through the factorio forums, from which you can still read the [announcement message](https://forums.factorio.com/viewtopic.php?p=475786#p475786) till this day.

During the month January 2020 we had already eagerly started to update the mods from 0.17 to 0.18 with all the breaking changes the base game introduced. After Arch666Angel's approval, we released our first version [*"Initial 0.18 release"*](https://github.com/Arch666Angel/mods/commit/8b7ff10ba82d3071f374e08452b5ca22d42e4780)! Soon after celebrating our succes, reality slapped us in the face with a great amount of bug reports on the forums. Little did we know how huge this undertaking would be, how much time we spend bugfixing and most of all, how great the big community is by trying to help figure out the issues.

## It started small

With the great help of the community we learned how the Angel's libary worked. For those that do not know what a library is, it is a set of helper functions that abstract the factorio code base such that it becomes easier to program. It is mainly a list with quality of life additions for the developer, such that he can focus on developing features, rather than writing boiler plate code to get something to work. You can compare Angel's library to some stand-alone mods like the [Factorio Library](https://mods.factorio.com/mod/flib), [Bob's Functions Library mod](https://mods.factorio.com/mod/boblibrary) or even my own attempt [Lovely_santa's library of knowledge](https://mods.factorio.com/mod/LSlib). There is no 'right' or 'wrong' way to implement a library, as long as it suits its purpose. By understanding Angel's library, which actually lives inside Angel's refining and not as a stand-alone mod, we figured more efficient ways of dealing with certain bugs arrising in the mod.

I am confident now saying that we do not make coding mistakes anymore, code slipping through the cracks, which would result in a hard crash of the mods. Nowadays the issues are likely edge cases, unhandled cases or a strange modpack configuration. Most frequently we receive bugs from people who play with a few Angel's mods and a few Bob mods. The reason for this is simple: there are many configurations with many settings, which result in many oversights. [A small example](https://www.reddit.com/r/factorio/comments/pfvqn0/playing_an_angel_bobs_game_and_noticed_about_9/) is shown below; you fix a bug with some technology being unresearchable, in some exotic configuration:
![Nickel processing is unresearchable](https://i.redd.it/7s8wfklgpwk71.png)
After a while you notice another configuration:
![Nickel processing is unresearchable AGAIN!](https://media.discordapp.net/attachments/693538202153123930/882911964215509012/unknown.png)
As a solution, we began creating a list of configurations we had to test. [*pezzawinkle*](https://mods.factorio.com/user/pezzawinkle) recently made [a not-so-small list](https://github.com/Arch666Angel/mods/blob/master/Config_Testing_Regime.txt) with all configurations he tests every time he prepairs a release.

Personally, I test every change I make with all the configurations I impacted. The most tedious part of fixing bugs is having to reload all Angel's mods into the mod folder over and over again. On the 11th of April 2020 I created [a small python script](https://github.com/Arch666Angel/mods/pull/188/commits/e37f2673f234e0c9271f56ecc6d4934b0d83cd50) to update all Angel's mods to the latest changes.

This script saved so many time, allowing for a sporadic coffee break while it reloaded the mods after tweaking that one line that still didn't behave as intended. By using this script over time, I had another issue, Bob. Yes, Bobbingabout released an update of his mods, and it broke all the workd I just did fixing a bug... On the 3rd of May 2021, almost a year later, I created [another small python script](https://github.com/Arch666Angel/mods/pull/591/commits/3d0a7de0a68c3ec6566cbd45c3599b036ab775bb) to download all bob mods from the portal, rather than doing this ingame one by one.

## The ball sped up rolling downhill

At the end of 2020, we decided to work on a big feature inside Angel's Industries: a decent implementation of the component and technology overhaul. This was the last feature Arch666Angel was working on before he pulled back from modding. On the 26th of May 2021 (half a year since the last release), we presented the new version of the overhauls to the public, after which the bug reports started rolling in quickly.

We realised that with the overhauls we created many more configuration, with even more settings. At this point it becomes quite tough to maintain and test this completely by hand. I started thinking about creating some [unit tests](https://en.wikipedia.org/wiki/Unit_testing) to take this burden of our shoulders. After some discussions and ideas from the great modding community I finally decided on the 30th of June 2021 to commit myself at creating the unit test infrastructure, groupted in a separate mod: [Angel's Dev - Unit Tests](https://github.com/Arch666Angel/mods/pull/634/commits/d59328e81235e26beb88ba66659cb78315827a00). A small note, You will not find this mod on the modportal.

I already had a way of building the Angel's mods from the github folder to the factorio mod folder and a similar script to download bob mods from the mod portal. In order to test different configurations, I had to write two additional scripts. [The first script](https://github.com/Arch666Angel/mods/pull/634/commits/8977e17bba55d06fb3b60ff4c593e2307f110395) reads and rewrites the `mod-settings.dat` file with the mod settings. The settings file stores all the user configured settings, which can lead to different mod configurations. For example, in Angel's Industries it can be used to switch between *special vanilla*, *bob-angels* (= regular overhaul, also possible without bob mods), *component overhaul* or *science overhaul*. It basically can change the complete behaviour of angels mods with a few checkboxes:
![Settings within Angel's Industries](TODO)
Since the loading and saving part of mod settings is completely handled by the base game, it was a part that I didn't encounter in creating mods before. However, I was very surprised at finding [thorough documentation on the Factorio Wiki](https://wiki.factorio.com/Mod_settings_file_format) about this.

[The second script](https://github.com/Arch666Angel/mods/pull/634/commits/abb64c2fe8007e060f112716ebe33864510b6451) configures the `mod-list.json` file, which contains the information about which mods have to be enabled. This is the part which are people most familiar with that play modded Factorio. They download mods from the portal, and after finishing the game they disable the mods and play with some other mods.
![Factorio mod list with all Bob Angel's mods](TODO)

With these 4 scripts, everything is in place to launch factorio with a certain configuration of the latest mods and their mod settings. It was only a matter of telling factorio to launch over and over with different mod settings. Assuming an ingame mod (Angel's Dev - Unit Tests in this case) telling the testing infrastructure that the testing is over, it can shut down Factorio and launch the next configuration to test. At this point, the unit testing infrastructure could check if all configurations loaded without crashing. After loading the game, the unit testing mod could verify everything during the game, at runtime.

## The last piece of the puzzle

A week later, on the 8th of June 2021 I finished writing [the most basic unit test](https://github.com/Arch666Angel/mods/pull/634/commits/1435fbd2f1134b08307406e21fdd657f1cafa019) which did nothing more than reporting which mods are active ingame. After the unit test was finished logging the results, the [main script](https://github.com/Arch666Angel/mods/pull/634/commits/64ea68023f19c2505aa3cfbb7642f13cf7f70fbd) could launch the next configuration. A sample output of this single unit test can be seen below:

```{r, class.output="scroll-100"}

angelsdev-unit-test: Testing Special vanilla (light)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing Special vanilla (regular)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing Special vanilla (extended)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing Special vanilla (BA)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (light)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (regular)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (extended)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (extended components)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (extended technology)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (BobPower non-default + overhaul)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (BobPower non-default + components)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (BobPower non-default + technology)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (BobAssembly non-default + overhaul)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (BobLogistics non-default + overhaul)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (BobRevamp non-default + overhaul)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing BA (Bob other non-default + overhaul)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test:     bobassembly version 1.1.3
angelsdev-unit-test:     bobclasses version 1.1.0
angelsdev-unit-test:     bobelectronics version 1.1.3
angelsdev-unit-test:     bobenemies version 1.1.1
angelsdev-unit-test:     bobequipment version 1.1.2
angelsdev-unit-test:     bobgreenhouse version 1.1.0
angelsdev-unit-test:     bobinserters version 1.1.0
angelsdev-unit-test:     boblibrary version 1.1.4
angelsdev-unit-test:     boblogistics version 1.1.3
angelsdev-unit-test:     bobmining version 1.1.3
angelsdev-unit-test:     bobmodules version 1.1.2
angelsdev-unit-test:     bobores version 1.1.3
angelsdev-unit-test:     bobplates version 1.1.3
angelsdev-unit-test:     bobpower version 1.1.3
angelsdev-unit-test:     bobrevamp version 1.1.3
angelsdev-unit-test:     bobtech version 1.1.3
angelsdev-unit-test:     bobvehicleequipment version 1.1.2
angelsdev-unit-test:     bobwarfare version 1.1.3
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing Pure Angels (overhaul)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing Pure Angels (components)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Testing Pure Angels (technology)
angelsdev-unit-test: Launching factorio.exe
angelsdev-unit-test: Starting 1 unit tests...
angelsdev-unit-test: Starting unit test 001.
angelsdev-unit-test:     Unit testing mod configuration:
angelsdev-unit-test:     angelsbioprocessing version 0.7.21
angelsdev-unit-test:     angelsdev-unit-test version 0.0.1
angelsdev-unit-test:     angelsexploration version 0.3.11
angelsdev-unit-test:     angelsindustries version 0.4.15
angelsdev-unit-test:     angelspetrochem version 0.9.21
angelsdev-unit-test:     angelsrefining version 0.12.1
angelsdev-unit-test:     angelssmelting version 0.6.18
angelsdev-unit-test:     base version 1.1.38
angelsdev-unit-test: Unit test 001 PASSED!
angelsdev-unit-test: Finished testing! All unit tests passed!
angelsdev-unit-test: Closing factorio.exe

angelsdev-unit-test: Summary:
angelsdev-unit-test: [PASSED] Special vanilla (light)
angelsdev-unit-test: [PASSED] Special vanilla (regular)
angelsdev-unit-test: [PASSED] Special vanilla (extended)
angelsdev-unit-test: [PASSED] Special vanilla (BA)
angelsdev-unit-test: [PASSED] BA (light)
angelsdev-unit-test: [PASSED] BA (regular)
angelsdev-unit-test: [PASSED] BA (extended)
angelsdev-unit-test: [PASSED] BA (extended components)
angelsdev-unit-test: [PASSED] BA (extended technology)
angelsdev-unit-test: [PASSED] BA (BobPower non-default + overhaul)
angelsdev-unit-test: [PASSED] BA (BobPower non-default + components)
angelsdev-unit-test: [PASSED] BA (BobPower non-default + technology)
angelsdev-unit-test: [PASSED] BA (BobAssembly non-default + overhaul)
angelsdev-unit-test: [PASSED] BA (BobLogistics non-default + overhaul)
angelsdev-unit-test: [PASSED] BA (BobRevamp non-default + overhaul)
angelsdev-unit-test: [PASSED] BA (Bob other non-default + overhaul)
angelsdev-unit-test: [PASSED] Pure Angels (overhaul)
angelsdev-unit-test: [PASSED] Pure Angels (components)
angelsdev-unit-test: [PASSED] Pure Angels (technology)

```

As any developer will know, this minimal viable product (MVP) could still use some polishing. After some extensive use, on the 22nd of August 2021, I added two more features, of which the first added a separate file containing [all the test configurations](https://github.com/Arch666Angel/mods/commit/27b899d43b1db04d99cc8c8086cf7ece83376419#diff-f7f9cb110df5ea99bfdecacc536b281dba523acc5418d1e9774fc803f7846348), such that it becomes easier to add new configurations as needed. The second feature added the ability to [log the test results to a file](https://github.com/Arch666Angel/mods/commit/a5732a52c5dfdcd6d9c5f4d89ad699ea9bd90bda#diff-f7f9cb110df5ea99bfdecacc536b281dba523acc5418d1e9774fc803f7846348). Doing this the new test results could be compared with the old test results by using some external tools such as [ExamDiff Pro](https://www.prestosoft.com/edp_examdiffpro.asp). This is mainly to verify that some rapported issues are resolved (lines missing in the new test results), without introducing new issues (lines added in the new test results).

## The result

Since the use of the minimal viable product, we released already an update. After two weeks of waiting for major game breaking bugs, we were surprised at finding that we had close to no breaking bugs. I personally have a new 'rule' while maintaining Angel's mods; if a bug is found, first create an appropriate unit test to catch this bug, before resolving the issue. My personal feedback, it takes quite some additional time to run all the unit tests, but that is easily planned by running the unit tests while taking a coffee break.

Currently the (few) unit tests we have only check the loading stage of the game (also known as [the data stage](https://wiki.factorio.com/Tutorial:Modding_tutorial/Gangsir#The_data_stage)). However, nothing is limiting us to also create complex unit tests which test behaviour during the game (also known as [the runtime stage](https://wiki.factorio.com/Tutorial:Modding_tutorial/Gangsir#Runtime_stage)).

I hope this helps me (as a developer) spending less time in the future fixing bugs, and spending more quality time implementing new features. I understand that this is not required for small stand-alone mods, but are usefull for maintaining quite a large codebase, especially when you are developing with multiple people, where you are not able to look at every line of code someone else wrote and knowing all details of every feature that is added.

This is my personal story, explaining how I learned first hand as a sole developer how bigger companies use unit tests, code integration and many automated tools to automate their process of pushing out new features with the confidence that the code will succeed in what it was intended to do, and not frustrate millions of people with a small undescriptive message *"Task failed succesfully. Contact the developers."*
 