## Service: [Factorio Zone](https://factorio.zone) <author>Dr.MagPie</author>

Did you know that you can host Factorio server for free?
Factorio Zone is a free service which allows you to host your own server!
Amazing! Right? But how it could be free? Where servers are hosted? Glad you asked!

Service is hosted on [AWS](https://aws.amazon.com) and WhiteFang the developer of the service, has optimized it and dropped costs down, so at the moment he does not mind covering costs for running it as a contribution to Factorio community.

Using service is pretty straight forward.
You just go to web page [factorio.zone](https://factorio.zone) and there you can upload your save and mods.
Service does not update mods for you, so you will have to update them manually!

What will happen if I will close the tab with the server?
No worries! Service creates a Unique User ID aka. TOKEN which is stored in your browsers local storage. And when you will open Factorio Zone next time it will load your save and mods.

Also as it is a free service there are some limitations in place.
If the server has no players on it for an hour then the service will shut it down and store the save file. If a player is idle for 30 minutes then they'll be kicked from the server. When on a server are no players it pauses, So biters will not overrun your base.
Worth mentioning that Factorio Zone estimates the server size to use based on the map and mods. So it'll scale with your progression (between restarts) and should work for most saves most of the time. There are a few cases it doesn't estimate correctly though. But I personally did not encounter any issues with it.

Also, there are hacky ways to share your session with your friend(s). So you both any time could start or stop the same server. For that, you just need to extract and share the above-mentioned token. To do it you can use [this tool](https://github.com/Rubydesic/factorio-zone-change-token)
And there is a [great tool](https://gist.github.com/leonard84/b31b3b9fb70fb737bb250bbf893a04d2) that will help you to prepare mods to be used on Factorio Zone. It does some optimizations like removing assets which are not used server-side.