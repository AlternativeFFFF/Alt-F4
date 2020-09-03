### Facto-RayO v2.0 <author>arrow in my gluteus maximus</author>

Almost a year and a half ago, I released a raycasting engine to the factorio community.
But it didn't live up to my expectations from when I started the project.
So it didn't take long before I started working on an improved version.

It didn't take long before I had to pause the development for multiple months however as personal things got in the way.
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

[![Facto-RayO v2.0 video](https://img.youtube.com/vi/28UzqVz1r24/0.jpg)](https://www.youtube.com/watch?v=28UzqVz1r24) <- click image to play the video
