# Abstract

&emsp;Computers are one of the many things in the world that are shrouded behind a layer of ambiguity. Everyone knows what a computer *can* do, but not many people know exactly how it accomplishes these tasks. Sure, one might have a vague idea of "ones and zeroes" and maybe even some knowledge of how transistors and logic gates come together, but beyond that? It's a hazy area of uncertainty.

&emsp;In this next series of blog posts, it will be my goal to attempt to teach a little something about how our favorite machines work. Of course, if I were to do only that, this wouldn't be a particularly interesting blog. No, I'm going to be **building an honest-to-god computer in Factorio**.

&emsp;For those interested in the technical side, it's going to be using a modified version of the intel x86 machine code structure (henceforth referred to as *Fx86*), excluding higher-level systems such as system interrupts and major system flags.

# Roadmap

&emsp;Over the next coming blog posts, I'm going to be covering in detail the major components of a computer's architecture, and then implementing them in Factorio. (Don't worry if these all seem like too fancy of words, they'll all make sense eventually!)

1. Volatile Computer Memory (RAM) *<- That's today!*

2. Non-Volatile Computer Memory (HDD)


3. ALU & Processor Registers

4. The Processor and Designing Op-Codes

5. Writing a Custom Compiler

**Please note that this series of posts assumes that the reader has at least a basic grasp on how the binary and hexadecimal number systems work. For more information on binary, [click here](https://byjus.com/maths/binary-number-system/).**

## Volatile Computer Memory

&emsp;I know what that sounds like; no, memory being volatile does not mean the computer is going to blow up in someone's face (unless that person does something drastically wrong). "Volatile" in the computing world has a different meaning, which is that the data stored inside a volatile drive can be *irrecoverably* lost if power is cut to the device.


&emsp;A more common way that people refer to volatile memory is Random Access Memory (**RAM**, for short). This is where the processor can temporarily store values that it wants to manipulate later. When someone is editing a text document and hasn't pressed the save button yet, this is where their words are being stored. And as is known, if that person powers down their device before they've pressed the save button, their progress will be lost. This is also the reason why consoles sometimes displays a symbol that says "Hey, don't power me down! You might totally mess up your game!"

&emsp;In Factorio, the definition of *volatile* data storage fits quite well. If a factory of purely combinators runs out of energy, the memory cells are no longer going to be able to repeat the signals being fed into them, and the data is lost. However, I'm going to be tacking on an additional rule for what defines memory as being non-volatile (how kind of me!). If memory is to be non-volatile, it must also be able to be saved to a blueprint and pasted elsewhere whilst retaining its data. So, for example, if someone had modded in combinators that don't require electricity to function, any memory system built out of purely said combinators still wouldn't qualify for non-volatile memory. This is because if they were to try to copy over a memory block from one location to another with blueprints, the data itself wouldn't be transferred.[^1]

[^1]:Don't worry about how one would create such a storage method. The methods of how that can be accomplished will be outlined in the next blog post.

### The Memory Cell

&emsp;To create a RAM block, one first needs to create a device that can continuously store a single value. In the computer science world, this is no easy task. However, the solution in Factorio is shockingly simple! Just feed the output of a combinator back into itself without modifying the signal. Like so:

{%include image.html src='https://i.imgur.com/e5nimlf.png' alt='"Who knew building a computer was this easy?"' caption='The simplest memory cell. Works by feeding the output directly back into the input.'%}

&emsp;Now, memory isn't all that useful if it can't be changed in any way. Fortunately, the value in this type of memory cell can be changed by sending a signal to increment it. The incrementation then happens for every tick the signal is active. For instance, if the memory cell was at a value of 19 and it needed to be at 250, the processor would send a pulse of 231 for one tick.[^2] Feel free to reread that sentence until it starts making sense. Great! It's possible to get a specific value into a memory cell! All that needs to be done is to find the difference between the desired value and the current value, then flash the cell with that resultant. Uh, hmm. Easier said than done, eh?

[^2]:The signal that's being used to store the data is the 'D' letter signal, for data. It's possible to store more than one signal value in a single memory cell, but for simplicity's sake only the 'D' signal will be used.

### The (Better) Memory Cell

&emsp;The following picture shows the design I came up with. The Rattman-esque scribblings are there to explain how the flow of signals travels. It's important to note that I'm using constant combinators here to signify where the input and output wires are located; the combinators don't contain any signals themselves. The same could be accomplished with electrical poles, but combinators generate less clutter.

{%include image.html src='https://i.imgur.com/fNBTyeD.png' alt='I'm not going to spend $60 a month just to make scribbles.' caption='Officially, this is what's called a "D-latch." The circuit retains the data that's held in it until the "write" signal is pulsed, which then sets the data inside to the input.'%}


&emsp;The simplest combinator to digest would be the leftmost one. This combinator takes in whatever is input to it on the green wire, and outputs the same value in the form of the 'D' signal. It does this by reading the 'each' signal and multiplying by 1, and outputting 'D' for the result. The job of this combinator is to "sanitize" the input, which means to both (a) filter out any unwanted signals coming in and (b) separate the input from internal calculations going on in the circuit. While sanitizing the input isn't *necessary* in this situation, it's always good practice to do so.


&emsp;The next combinator to cover is the *memory cell*. This is the same circuit covered previously, with the combinator feeding into itself to store a value. The only difference this time is that the contents of the memory cell are being brought over to the 'output' constant combinator.


&emsp;Here comes the magic part. The bottommost combinator has only one job: to take in the value of the memory cell and to output the inverse. Now, both the negated value of the memory cell and the filtered input are brought over to a special decider combinator. This combinator's job is to pass through the signals it's receiving *if and only if* it receives a 'W' (write) signal on the red wire. Hence, the capacitor symbol above it.[^3]


[^3]:Technically, the correct electrical symbol to use would be a [MOSFET transistor](https://i.imgur.com/8UFev7G.png). I used the symbol for a capacitor because ~~I think it looks nice~~ it symbolizes the combinator's purpose better.

&emsp;How does this all come together? Well, its doing exactly what the perfect memory cell was outlined to do. The combination of the input combinator and the flipped-memory value combinator is exactly what was needed: the difference between the desired value and the real value. The only thing that the top combinator does is actually 'write' this value into the memory cell. Due to how the system uses subtraction in a multi-combinator process, the incoming write signal *must* be only one tick long. Ensuring that the write signal is only one tick long is a process that can be handled by higher-level systems.

### The (Many) Better Memory Cell(s)

&emsp;Wonderful, here exists a working cell that can store... well, that can store one value. Combinators in Factorio can handle numbers all the way from -2.1 billion to 2.1 billion. This translates to 32-bits (4 bytes) of data able to be stored. That's really not a lot. The ATARI system, one of the oldest consoles known to man, had 128 bytes to play with. A better system is needed.

&emsp;As with many things in Factorio, a "better" system really just translates to a whole lot of the original system. This RAM is no different. Easy enough! It can't be hard to just stack a bunch of these memory cells on top of each other and wire them up, simple as! Man, [making computers is so easy](https://pbs.twimg.com/media/FTUOYkQWQAcbVQb?format=png&name=small).

...

&emsp;It doesn't work. Whenever a signal is sent in, *all* of the memory cells react to it. That's not surprising, since there wasn't an established way to distinguish between different memory cells. This is a neighborhood of memory, and what do neighborhoods have to distinguish houses? Addresses. There needs to be way to give each of these memory cells an address, where it will only react to signals when its specific address is called.


{%include image.html src='https://i.imgur.com/wqoLPpE.png' alt='Would someone get her out of the frame please?' caption='The lamp activates when the given address matches the cell's address. In this case, the cell's address is 0 and I'm not giving any input, so the cell thinks it's active.'%}


&emsp;Here's the lovely suburban home with its address (metaphorically) painted on the front of the bricks. Despite the apparent complexity jump, the memory cell itself isn't modified at all. The only thing that's changed here is the fact that the inputs and outputs are now filtered. These filters only allow the signals to come through if the new 'A' signal on the red wire matches that cell's address.


&emsp;Previously, I had just placed a constant combinator in each of the cells and modified the addresses manually. I quickly realized that if I wanted to scale up this system I would need to manually set up to a thousand constant combinators, without error. Thankfully, I made the cells set their own addresses. Each cell's address is determined by the cell below it. A cell takes in the previous cell's output in through the electric pole, uses it for it own filters, then increments the signal by one and passes it to the next cell.


&emsp;Using this, a myriad of RAM designs can be created:

{%include image.html src='https://i.imgur.com/evw5Hac.png' alt='Warren Robinett would be proud.' caption='128-Byte RAM'%}

{%include image.html src='https://i.imgur.com/ktHCvwI.png' alt='Can you find Waldo?' caption='512-Byte RAM'%}

{%include image.html src='https://i.imgur.com/CNYN9zN.png' alt='Waldo is unfindable.' caption='2-kB RAM'%}

{%include image.html src='https://i.imgur.com/TOeYZje.png' alt='I don't need any judgement over my username.' caption='8-kB RAM'%}

### Productivity

&emsp;There's one more thing that can be done to make this memory system more efficient. Suppose the processor needs to be able to store a simple boolean (AKA true/false) value. This data on its own should ideally take up only 1 bit of memory. If this value were to be stored in our fancy new RAM system, the processor would need to set aside 31 additional bits. A typical x86 processor only needs to set aside 7 bits. The reason for this large discrepancy is because data is being stored as huge, individual 32-bit numbers. Setting these to just `1` or `0` is a massive waste of potential memory space.

&emsp;So, what do can be done about that? Well, it should be possible to make a system that divides up the memory into fourths, then only modifies the bits in the memory that the processor cares about. Additionally, the system should still have the ability to store these values in their larger 16-bit and 32-bit counterparts.


{%include image.html src='https://i.imgur.com/awm1B2v.png' alt='You're gonna have to get used to the MS Paint drawings here.' caption='Divvying up our 32-bit numbers into individual 8-bit (byte) segments.'%}

{%include image.html src='https://i.imgur.com/l310QwP.png' alt='I think it's alive.' caption='The tool used to do that. Officially called the "RAM Interfacer."'%}

&emsp;This is not an easy task. Since the way Factorio stores its values cannot be edited directly, the system needs a tool that is able to convert the "dynamic" signals that are being sent into "raw" signals that the RAM can actually store. Typically RAM doesn't have this kind of problem, but building things in Factorio presents its own challenges.


&emsp;In a nutshell, the interfacer creates what's called a "bitmask" (for example `11110000`) that can be used to filter out the digits that the system cares about. This can be done by applying a "logical AND" to both a number and the bitmask, which then only outputs the values that weren't masked. For instance, if the interfacer were to apply the mask of `11110000` to the value `10101010`, the result would be `10100000`; the last digits being cut off by the mask. The interfacer uses these masks to get rid of the bits that the processor want to override, and then adds in the new, overriding bits.


&emsp;What's much more important to address is how it's used. The interfacer takes in the standard three signals: '\[D\]ata', '\[W\]rite', and '\[A\]dress', with the additional signal '\[S\]ize.' Size determines how much memory (in bytes) the processor want to allocate to the value being sent in. The address signal now points to the new "subaddresses," with an address of '0' accessing the first raw memory cell and an address of '4' accessing the second raw memory cell. When the size signal is set to greater than 1, the interfacer knows to access *more than one* of these subaddresses at a time.


&emsp;An example would be helpful. Suppose that the RAM has a raw cell in each of the following states. Each number signifies a new subaddress. Remember that these subaddresses are only 8-bits, so they can store a value no more than 255.

255.103.0.**109** - Reading this with `S = 1` and `A = 0`, the interfacer outputs `109`. Remember, subaddresses go from right to left.

**55.103**.0.109 - Reading this with `S = 2` and `A = 2`, the interfacer outputs `65,383`. The included '255' adds another 8-bits to our number, creating `11111111.1100111`.

**255.103.0.109** - Reading this with `S = 4` and `A = 2`, the interfacer outputs `2,145,845,357`. When subaddresses point to a value not divisible by the size, throws out the remainder.


**255.103**.0.109 - Writing in 0 with `S = 2` and `A = 3`, the interfacer sets the raw RAM to `0.0.0.109`.

## Closing Notes

&emsp;I hope you enjoyed our first steps into the mechanisms behind how a computer functions! This subject can be confusing at times, so if you ever have questions, you're welcome to message Antlers#9583 (me!) on discord so I can clarify anything. I'll also be providing a [blueprint book](https://factorioprints.com/view/-NRjLvuuD2dGkU4_H3PA) that's available for you to tinker with and to get a feel for things. A fair warning, this computer is being built using the Nixie Tube, PushButton, and EditorExtensions mods, so it may be necessary to install those to get the modules to work.


&emsp;That's all from me. Stay cute y'all!

