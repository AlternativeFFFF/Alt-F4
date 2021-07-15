#A new perspective on “A new perspective on trains in Factorio” <author>arrow in my gluteus maximus</author>

Two months ago I released a video called: “A new perspective on trains in Factorio”.

{% include youtube.html id="5nRnnfKMZKQ" %}

Those who downloaded the mod linked in the description know that this was an April first joke. For those who didn’t figure it out, sorry.
A few people have asked me for details on how I made that video, so here they are.

I’ve seen some people speculating that I somehow extracted 3D models from the game.
That’s not needed, it’s a simple rotation of what’s already shown on screen.
Well the idea might be simple, the execution is a bit more complicated.

The first problem you come across is that screens aren’t circles.
When rotating, stuff gets cut off, while other things are missing.

{% include image.html src='rotation.jpg' alt='Map view of rail network, showing only an eighth of the outposts.' caption='Simply rotating causes problems' href='rotation.jpg’' %}

I ended up applying my usual solution to recording problems for factorio: use screenshots instead. Ingame screenshots are not bound by the limitations of normal screen recording. I simply capture a larger area than is normally visible.

The next problem is that the UI also rotates, this is not something we want.
Screenshots also come to the rescue here. The take_screenshot command has an option called show_gui. So the trick is to take 2 screenshots every tick, one with ui and one without ui. If we take only the parts that differ, then we end up with the ui, which we can superimpose over the screenshot without ui. At least that was the plan. Various video editing problems made this non viable. For example my video editor did not support lossless formats (that I could find, I tried a bunch). Small differences in encoding end up in the ui.

However I found out that in recent factorio versions the ui is no longer fixed to your player position in screenshots. It is always visible no matter what part of the map you take a screenshot of. So I looked for a color far away from other colors that occur in the game. I settled on pink. And I changed the image of some concret to be pure pink. I turned off clouds. And changed up the location of my gui screenshot so only the pink concrete is visible. This way I can get the ui by green screening, or rather pink screening to be more accurate.

![](ui.mp4)

There were a few small problems with that though. Turns out there are transparent parts in the gui: the details panel that shows up when you hover over things with your mouse. It looked purple now. I ended up manually cutting it out of the gui, and nobody seems to have noticed. 

Next I created a small mod that played a sound whenever I started recording screenshots, this way I could sync up the in-game sounds with the screenshots. Similarly to how movie studios use clappers.

The mod also wrote out the value of game.players[1].vehicle.orientation into a text file. I used this to calculate how much rotation is needed, but smoothed out with some splines.

I feared that these steps would not have been enough to make it believable. Taking that many screenshots slows down the game enormously. I was worried that it would be obvious that the footage was sped up by looking at my motion in game. So I looked for a way to make the recording go faster. After recording the screenshots I encoded them into an mp4 with ffmpeg, so why not cut out the middleman and try to hook up ffmpeg directly to factorio. Both encoding pngs and writing them to disks are expensive operations. So if I could skip these steps it would go a lot faster.
Step one would be to extract the raw image data (not to be confused with the .raw format) directly from factorio instead of encoding it in a png. I couldn’t find an easy way to do it, but turns out a bmp is very close. It’s the image data backwards with a header slapped in front. So this should be way faster to encode than a png.

Next to get this into ffmpeg without saving to disk first. Turns out ffmpeg has built- in features for piping images, so a named pipe with a “.bmp” extension did the trick.

Example command: ffmpeg -f image2pipe -framerate 60 -i - -r 60 -c:v libx264 -vf format=yuv420p -crf 1 example.mp4 -y < pipe.bmp
Don’t forget to keep the pipe open between screenshots with a sleep command:
sleep 10000000 > pipe.bmp, kill the sleep command to let ffmpeg finish the recording.


I did a test run at a low fps and mhhhh, that’s not right… What’s going on here?

![](render_420_2.mp4) (If tried to get it smaller, but if it’s still too big I put it on youtube too: https://youtu.be/jq4rL2V5Nss )

The problem is that images are getting mixed. Factorio rendering is multithreaded. While one frame is still being written to the pipe, the next one might already start. Essentially mixing the pixels of both frames together.
The fix is to force factorio to wait until the previous frame is rendered before starting the next one. This can be done with: “game.set_wait_for_screenshots_to_finish()” every frame.

This however slows down factorio enough that we no longer can call it real time. Although I still have some ideas to speed it up, at this point I spend way too much time on this project already and decided to go with the tried and true method of using replays.
Factorio has this wonderful feature, it doesn’t check if the content of the mods used during the recording and playback of a replay are the same.
So first record a replay normally at a normal speed. Then edit one of your mods to take screenshots every tick. Then when you watch the replay factorio will start taking screenshots. That is assuming the changes you made to the mod don’t change the game state.

Sadly due to using replays I had to cut a few scenes. I was going to show how weird it feels to build things from a rotated perspective. But it turns out factorio doesn’t save your mouse position in the replay. So in the replay the UI follows your mouse at the time of playback, not the position your mouse was when you recorded it.
