## Facto-RayO v2.0 <author>arrow in my gluteus maximus</author>

Almost a year and a half ago, I released a [raycasting engine](https://www.reddit.com/r/factorio/comments/bgj05z/raycasting_engine_in_factorio_vanilla_017/) to the Factorio community. But it didn’t live up to my expectations from when I started the project and it didn’t take long before I started working on an improved version.

Soon after starting work I had to pause development for multiple months as personal things got in the way, like finishing up my master’s degree, for example. After a few months of hiatus though, I started uploading my progress to my second [YouTube channel](https://www.youtube.com/channel/UCNQRKtG2pU8LGS08TFiyyAA).

The first thing I worked on was a new and improved screen. Using the built-in lamps was too limiting, so out they went and in came a belt-based display. Next, I implemented a way to scale textures. A parallel lookup table did the trick. The scale of the texture is then dependent on how fast you iterate over all the pixels in the table. Every three ticks 256 parallel lookups occur to find the next row of pixels to display. After that, all other components got an upgrade too.

All this resulted in a design that is significantly more compact, has improved fidelity, and, most importantly, is easier to expand upon in the future. I go over the new version in more detail in my YouTube video:

{% include youtube.html id="28UzqVz1r24" %}

Fun bonus fact: This video, and many of my previous videos, were recorded entirely via in-game screenshots.  
That’s more than 12,000 screenshots of about 20 MiB each. (The largest screenshot was 77 MiB.)

This recording technique has a few advantages:

- It allows me to record at higher resolution than my own screen, and in-game screenshots even have anti-aliasing.
- The recording remains smooth no matter the UPS Factorio is running at, as the recording ‘automatically’ slows down/speeds up to match.
- I can do other things on my computer while recording, including fixing small raycasting engine bugs while it’s running. If you noticed that while demonstrating all the colours that the screen can display not all colours are on screen for the same amount of time, that was me changing the timings while it was running.
- It allows me to seamlessly stop and start recording.

For those who wish to download the map and take a look in game, you can do so [here](https://forums.factorio.com/download/file.php?id=62475).
