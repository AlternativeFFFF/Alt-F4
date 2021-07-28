## A new perspective on “A new perspective on trains in Factorio” <author>arrow in my gluteus maximus</author>

Two months ago I released a video called: “A new perspective on trains in Factorio”. If you haven't seen it yet, please watch it before reading the article, as it won't make too much sense otherwise.

Some people have reportedly experienced headaches after viewing this video. You have been warned.

{% include youtube.html id="5nRnnfKMZKQ" %}

Those who downloaded [the mod linked in the description](https://mods.factorio.com/mod/train_perspective) know that this was an April Fool's joke. For those who didn’t figure it out: I'm sorry. A few people have asked me for details on how I made this video, so I decided to write up a quick explanation. ~~Don't try this at home.~~

I’ve seen some people speculating that I somehow extracted 3D models from the game. That’s not needed, it’s a simple rotation of what’s already shown on screen. While the idea might be simple though, the execution is a bit more complicated.

The first problem you come across is that screens aren’t circles. When rotating, parts of the image gets cut off, while other parts such as the GUI are missing.

{% include image.html src='https://media.alt-f4.blog/ALTF4/44/rotation.jpg' alt='Example of a rotated image, corners have missing pixels because it’s not a circle.' caption='Simply rotating causes problems.' href='https://media.alt-f4.blog/ALTF4/44/rotation.jpg' %}

I ended up applying my usual solution to recording problems for Factorio: use screenshots instead. Ingame screenshots are not bound by the limitations of normal screen recording. Therefore to capture the video I simply capture a screenshot every tick over a larger area than is normally visible. That way, no part of the screen is ever cut off when rotated.

The next problem is that the UI also rotates, this is not something we want. Screenshots also come to the rescue here. The [take_screenshot()](https://lua-api.factorio.com/latest/LuaGameScript.html#LuaGameScript.take_screenshot) command has an option called `show_gui`. The trick is to take two screenshots every tick, one with the UI visible and one without it. If we take only the parts that differ, then we end up with only the UI, which we can then superimpose over the screenshot without UI. At least that was the plan. Various video editing problems made this unviable. For example, my video editor did not support lossless formats (that I could find, I tried a bunch). Small differences in encoding thus end up in the UI.

However, I found out that in recent Factorio versions the UI is no longer fixed to your player's position in screenshots. It is always visible no matter what part of the map you take a screenshot of. So I looked for a colour far away from other colours that occur in the game. I settled on pink. And I changed the image of some concrete to be pure pink and turned clouds off. I changed the location of my UI screenshot so only the pink concrete is visible. This way I can get the UI by using a sort of greenscreen, or rather a pinkscreen in this case.

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/44/ui.mp4' alt='Factorio user interface above bright pink background.' caption='Pinkscreened UI' width='1920px' %}

There were a few small problems with that though. Turns out there are transparent parts in the UI, namely the details panel that shows up when you hover over things with your mouse. It looked purple now. I ended up manually cutting it out of the UI, and nobody seems to have noticed.

Next, I created a small mod that played a sound whenever I started recording screenshots, this way I could sync up the in-game sounds with the screenshots. Similarly to how movie studios use [clappers](https://en.wikipedia.org/wiki/Clapperboard).

The mod also wrote out the value of [game.players[1].vehicle.orientation](https://lua-api.factorio.com/latest/LuaEntity.html#LuaEntity.orientation) into a text file. I used this to calculate how much rotation is needed but smoothed out using [splines](https://en.wikipedia.org/wiki/Spline_(mathematics)).

I feared that these steps would not have been enough to make it believable. Taking that many screenshots slows down the game enormously. I was worried that it would be obvious that the footage was sped up by looking at my motion in-game. So I looked for a way to make the recording go faster. After recording the screenshots I encoded them into an mp4 with FFmpeg, so why not cut out the middleman and try to hook up FFmpeg directly to Factorio. Both encoding pngs and writing them to disks are expensive operations. So if I could skip these steps it would go a lot faster.

Step one would be to extract the raw image data (not to be confused with the `.raw` format) directly from Factorio instead of encoding it in a png. I couldn’t find an easy way to do it, but turns out a `.bmp` is very close. It’s the image data backwards with a header slapped in front. So this should be way faster to encode than a png.

Next to get this into FFmpeg without saving to disk first. Turns out FFmpeg has built-in features for piping images, so a named pipe with a “.bmp” extension did the trick.

Example command: `ffmpeg -f image2pipe -framerate 60 -i - -r 60 -c:v libx264 -vf format=yuv420p -crf 1 example.mp4 -y < pipe.bmp`

Don’t forget to keep the pipe open between screenshots with a sleep command: `sleep 10000000 > pipe.bmp`, kill the sleep command at the end to let FFmpeg finish the recording. I did a test run at a low fps and … that’s not right! What’s going on here?

{% include video.html mp4='https://media.alt-f4.blog/ALTF4/44/render_420_2.mp4' alt='Factorio recording with low FPS' width='800px' %}

The problem is that images are getting mixed. Factorio rendering is multithreaded. While one frame is still being written to the pipe, the next one might already start. Essentially mixing the pixels of both frames together. The fix is to force Factorio to wait until the previous frame is rendered before starting the next one. This can be done with by calling [game.set_wait_for_screenshots_to_finish()](https://lua-api.factorio.com/latest/LuaGameScript.html#LuaGameScript.set_wait_for_screenshots_to_finish) every frame.

This however slows down Factorio enough that we no longer can call it real-time. Although I still have some ideas to speed it up, at this point I spent way too much time on this project already and decided to go with the tried and true method of using replays.

Factorio has this wonderful feature where it doesn’t check if the code of the mods used during the recording and playback of a replay are the same. So I first recorded a replay normally at a normal speed. Then I edited one of my mods to take screenshots every tick. Then, when playing the replay, Factorio will start taking screenshots. That is assuming the changes you made to the mod don’t change the game state.

Sadly due to using replays, I had to cut a few scenes. I was going to show how weird it feels to build things from a rotated perspective, but it turns out Factorio doesn’t save your mouse position in the replay. So in the replay, the UI follows your mouse at the time of playback, not the position your mouse was in when you recorded it.

{% include juxtapose.html left_mp4='https://media.alt-f4.blog/ALTF4/44/replay_demo_1.mp4' left_alt='video of building chests' left_width='1280px' right_mp4='https://media.alt-f4.blog/ALTF4/44/replay_demo_2.mp4' right_alt='video of building chests as seen through a replay' right_width='1280px' 
caption='Comparison how building looks normally (left) or when viewing a replay (right)' %}

All in all, this was a fun challenge and I enjoyed confusing the Factorio players.
