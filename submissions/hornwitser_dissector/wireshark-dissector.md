## Wireshark Dissector for Factorio <author>Hornwitser</author>

This is a project that started around the Gridlock Cluster.
I was investigating some issues with clients randomly dropping from the game and that brought me into examining packet traces using Wireshark.
But the issue was all I could see was hexadecimal goobelygook being sent between the server and the client.
And I thought for myself, how difficult would it be to write a plugin for Wireshark to decode it?
It became a bit of a personal challenge to figure out what each of the bytes meant and have them decoded into Wireshark.
I think I worked on the dissector for around 2 weeks before I sort of gave up on it.

It wasn't that I couldn't do it.
It just wasn't worth all the effort of doing it.
You see the output of my dissector wasn't all that useful for telling what's going on.
It looked something like this:

[insert old-dissector.png here]

Sure, it would decode the framing and reassemble fragemented packets, but unless you happen to know what weird, odd, strange and coloured data means it just wouldn't be of much use.
And this is also one of the reasons I haven't released this dissector, it's certainly better than looking at hex data, but not by much.
It doesn't give you the sort of deep insights into the inner workings of the Factorio protocol that you'd expect from any of the other protocol dissectors Wireshark has.
And so it became that this project was put on shelf not to be seen again.

In the past _Twinsen_ has posted about making a dissector for Wireshark in [FFF #196](https://factorio.com/blog/post/fff-196).
The post contains quite a lot of internal information about the protocol which I could have used when I made my dissector, but I chose not to as I wanted to make mine without relying on internal information from the game source code.
An obvious question right now though is why not use _Twinsen_'s dissector instead of writing my own?
Well for a start it's not publicly available.
But more importantly _it can't be made publicly available_.
The way _Twinsen's_ dissector worked was to build Factorio as a shared library, and then build a custom version of Wireshark that linked to that shared library.
But Wireshark is licensed under the GPL and you are not allowed to distribute GPL code that links with proprietary code, so to distribute the dissector Wube would have to release Factorio under the GPL which is obviously not going to happen.

But a few weeks ago, I realized something.
The Windows version of Factorio ships with a .pdb file.
It's stuffed with debug symbols, the kind of data you'd need to attach a debugger to Factorio and inspect the values of variables used in the code.
And that means it contains type information.
Type information means the structure of the data as defined in the code along with the names of fields and enums.
The name of fields are very useful as it's the label developers put on a piece of data in order to reference it in the code.
And likewise the enums contain mappings of logical names to numeric values.

I was able to dump this type information from the .pdb file into something readable using the cvdump.exe tool.
And once I had that it was pretty easy to find the names of the structures from the .pdb file rename all of the fields in my dissector to use them.
I could also get the enum definitions to translate numeric values to logical names for the fields that use them.
And after some tidying up of the code and how the data was presented I was able to make the dissector output look like this:

[insert new-dissector.png here]

No longer does one have to guess what an "Odd Blue" value is, it's clearly it's the id of an InputActionSegment.
But also the type is translated from the machine code looking 0xa2 into the much more friendly name "ServerCommand".

[Insert note here and link to release on Github once I get a goahead from Wube about releasing this.]
