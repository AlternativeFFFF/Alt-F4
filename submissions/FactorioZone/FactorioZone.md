## Service: [Factorio Zone](https://factorio.zone) <author>Dr.MagPie</author>

Always wanted to play on a Factorio server with your friends, but don't have the funds to afford one? Well, there is an option available to you: Factorio Zone! It allows you to host your own, free server.

The service is hosted on [AWS](https://aws.amazon.com) and WhiteFang, the developer of the service, has optimized it and dropped costs down, so at the moment he does not mind covering costs for running it as a contribution to Factorio community.

Using it is pretty straight forward. You just go to [factorio.zone](https://factorio.zone), where you can upload your save and mods. Factorio Zone does not update mods for you, so you will have to do that manually. Don't worry about accidentally closing the tab with the server, a it creates a Unique User ID aka. a token which is stored in your browser's local storage. When you open Factorio Zone next time, it will remember your save and mods.

As it is a free service, there are some limitations in place. If a server has no players on it for an hour, the service will shut it down and store the save file. If a player is idle for 30 minutes then they'll be kicked from the server. When there are no players on a server, it'll pause to protect your base from being overrun by biters.

It's worth mentioning that Factorio Zone estimates the server size to use based on the map and mods. So it'll scale with your progression (between restarts) and should work for most saves most of the time. There are a few cases it doesn't estimate correctly, but I personally did not encounter any issues with it.

Also, there are some semi-hacky ways to share your session with your friends. So any of you could start or stop the same server at any time. For that, you just need to extract and share the above-mentioned token. To do that, you can use [this tool](https://github.com/Rubydesic/factorio-zone-change-token). There also is a [great tool](https://gist.github.com/leonard84/b31b3b9fb70fb737bb250bbf893a04d2) that will help you to prepare mods to be used on Factorio Zone. It does some optimizations to the file sizes like removing assets which will not be used by the server anyways.

So if that sounds interesting to you, give it a spin, and consider thanking/supporting the developer WhiteFang for providing this to the community for free.