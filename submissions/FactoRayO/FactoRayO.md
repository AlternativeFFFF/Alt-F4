### Facto-RayO v2.0 <author>arrow in my gluteus maximus</author>

Almost a year and a half ago, I released a raycasting engine to the factorio community.
But it didn't live up to my expectations from when I started the project.
So it didn't take long before I started working on an improved version.

It didn't take long before I had to pause the development for multiple months, as personal things got in the way.
I finished up my master’s degree for example.

But after a few months of hiatus I started uploading my progress to [my second channel](https://www.youtube.com/channel/UCNQRKtG2pU8LGS08TFiyyAA).

First came a new and improved screen.
Using the build in lamps was too limiting so out it went and in came a belt based display.

Next I implemented a way to scale textures.
A parallel lookup table did the trick. The scale of the texture is then dependent on how fast you iterate over all the pixels in the table.
Every 3 ticks 256 parallel lookups occur to find the next row of pixels to display.

After that, all other components got an upgrade too.

In the end this resulted in a design that is significantly more compact, has improved fidelity.
But most importantly is also easier to expand upon.

{% include youtube.html id="28UzqVz1r24" %}

Fun fact: this video, and many of my previous videos, were recorded entirely via in game screenshots...
That's more than 12 000 screenshots of about 20 MiB each. (The largest screenshot was 77 MiB).

This recording technique has a few advantages:
* It allows me to record at higher resolution than my own screen, in game screenshots even have anti-aliasing. 
* The recording remains smooth no matter the UPS of factorio, the recording slows down/speeds up to match.
* I can do other things on my computer while recording, this includes fixing small bugs of the raycasting engine while it's running. If you had noticed that while demonstrating all the colors that the screen can display, that not all colors are on screen for the same amount of time; that was me changing the timings while it was running. 
* I can seamlessly stop and start recording.

[For those who wish to download the map, you can do that here] (https://forums.factorio.com/download/file.php?id=62475)
