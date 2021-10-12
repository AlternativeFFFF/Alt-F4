## Automating Factorio Screenshots <author>Therenas</author>

When working on my [mods](), I often have issues with taking appropriate screenshots for them. It's a lot more work to set up scenarios in such a way that they are appealing to look at while visually explaining a core concept of the mod in question. In my opinion, a lot of mods don't have good screenshots, and it's not because the mod authors don't care, it's because it's really hard to produce good ones. They just need to do a lot of work with quite a limited 'language', even if a picture is worth a thousand words.

Now, even though that all sounds pretty winy (which it is), the actual issue is not taking the screenshots themselves. It's fine to spend a couple of hours on them after you spent dozens or hundreds of hours on the mod itself. No, the actual issue is keeping them updated. Every change you do to the mod should ideally be reflected by updated screenshots; having them be outdated just signals a certain lack of care to me. I might be too much of a stickler though.

How often they need to be updated depends on the kind of mod of course. If you're [Bottleneck]() and don't change very often, your screenshots won't fall out of date. If you're a reasonably complex GUI mod though, practically every release changes some pixel here or there in your interface. So you taking five minutes to fix a UI glitch should ideally lead to you updating your screenshots, which would make you spend much more time taking screenshots than doing actual work. Nobody wants to do that, and thus your screenshots fall out of date.

Compounding this effect and creating a bit of a virtuous cycle is human psychology. If you know that your screenshots will need to be updated every second release, you'll just decide to skip them, only this once. The next release will have a change anyways, so why bother updating them now, that would be a waste of time. Only when the next release comes, the same psychology will lead you to procrastinate once more. Just this once. Repeat ad infinitum.

Maybe I'm just incredibly lazy and normal people don't have any issues with this. They'd probably just pick a set schedule to update the screenshots, and thus they'll be mostly up to date most of the time. But not me. In practice, in my case, it lead to me updating the screenshots about once every six months, if that. And it bothered me that they were not up to date, but the 'I'll just do it next time'-mentality was overpowering in the face of doing work that would be naught a week later.

Still though, I wanted a solution. I needed a solution, if only to absolve me of my self-imposed guilt. It couldn't be difficult to do of course. The idea of working on myself as a person would not pass muster, I'll do that next week. Automation was the promised land it seemed, as it often does, and as it sometimes is.

I automated a few things related to mod development, most notably the process of [bundling up]() a new release and all the micro-management that comes with that. In that particular case, it's not even really because I don't want to do the same tedious steps for all of my releases ([164 and counting]() for [Factory Planner]()), it's more about preventing me from making mistakes during that process, which could lead to broken versions getting to users and so on. Can't have that.

### Actual scripting work

With all that rambling over, let's get into the actual scripting part. My idea was pretty simple: Write a [Python script]() that launches Factorio into a custom scenario, which then takes over the actual screenshotting part (for which Factorio has a [dedicated API method]() thankfully), after which the script puts the screenshots into the right folder and maybe crops them a bit. The first part of that is rather easy, I just needed to figure out which [command line arguments]() I needed, string them together, and the scenario was running. So far, so simple.

The actual scenario is a bit more complicated though. To be able to take meaningful screenshots, I need to setup various GUIs in various states to show the functionality I wanted to highlight. Doing this kind of thing for entities on the map is easier, since you can use all the APIs for interacting with the game world that you'd normally use. For GUIs though, which are a bit of a world on their own, you'll have to come up with your own system.

The biggest issue comes from not being able to just simulate an actual user clicking on your interface. The game does not have any API method for this, since it's not needed for any actual mod. What it means though is that you need to somehow emulate clicks. This is a bit awkward since, unless your mod is setup for this from the start, or just very well structured, you'll need to either rewrite your event handler or use rather hacky methods. You might be able to guess which route I took.

After getting the hacks sorted,
