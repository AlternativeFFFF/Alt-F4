## Combinators and why you shouldn't fear them <author>pocarski</author>

There are many technologies in the research tree that aren't necessary to finish the game, and are therefore often sidelined. Some of those are perfectly understandable, for example military tech on peaceful mode. Others are sometimes not even considered, even though they can provide exceptional improvement. One such technology is the circuit network, which I will explore in this article.

There are four main components of the circuit network: wires, constant combinators, decider combinators and arithmetic combinators.

(combinators.png)

Constant combinators continuously output whatever you set them to (and also don't need power); decider combinators output some signal when a certain logical condition is met; arithmetic combinators perform mathematical operations. Wires act like a sort of "signal cloud", where all signals being output into a wire can be read by everything connected to it. Red and green wires have identical functionality, but can both be connected to the same device without interfering with each other.

### Basic elements

Let's look at three very simple single-combinator modules which are widely used. These modules are: the monostable, the RS latch and the counter. We'll start with the monostable, which looks like this:

(monostable)

The monostable is the easiest to understand. The input is immediately passed to the output through the red wire, and the inverted input is added onto the same red wire after the standard one tick of combinator delay. Both values being on the same wire cancel each other out, meaning the output is exactly equal to the input, but only lasts for a single game tick. Here, use of the "each" signal makes sure that the circuit can take any signal as input. If you wish to make it signal-specific, you can replace the "each" in input and output with the desired signal. This circuit has a truly colossal amount of uses, especially if used in combination with a counter.

(RS latch)

Next is the RS latch. Its inputs are either 1 "S" signal or 1 "R" signal. When it receives an "S" signal, the condition of the combinator becomes true. It is looped to itself, so the 1 "S" that it outputs will be added to the input, and keep the condition true even after the original "S" input turns off. Similarly, when it receives an "R" input, the condition becomes false, turning off the "S" output and breaking the cycle. This circuit is best used for systems where you want some kind of [hysteresis](https://en.wikipedia.org/wiki/Hysteresis), where one state triggers the "S" input, and another state triggers the "R" input.

(counter)

Finally, the counter. Structurally it is identical to the SR latch, but this time the output is set to "input count of everything". This means that while the decider's condition is followed, it will keep giving its own outputs to itself, thus remembering them. For every tick it receives a signal, it will increment the value of that signal in its memory by the amount received. As soon as the condition is broken, the memory is cleared, since the decider no longer allows signals to pass. Similarly to the counter, if you wish to make it remember only one signal, replace the "everything" in the output with the desired signal. This circuit, just like the monostable, has an immense number of uses, but the most popular one is to keep track of item amounts.

### Basic examples

Now, let's explore some cases where each of these modules might come in handy.

Say you have a nuclear reactor blueprint where the extraction of a used fuel cell triggers the insertion of a fresh one. Such a design would have to be manually started since reactors are built empty. What you ideally want to add is a circuit which, once all fuel cell chests have items in them, triggers the fueling inserters exactly once. This is where the monostable comes in. Have a combinator in each chest checking if there are enough items in it, and then wire all of those together into a single combinator that checks if all chests are ready. This decider then outputs a "used fuel cell" signal into a monostable, which is wired to every fueling inserter of the reactor. This causes all fueling inserters to trigger exactly once the moment there is fuel available to all of them, starting the reactor automatically. By extension, this also makes the reactor automatically restart if it ever runs out of fuel.

(reactor fueling)

Next, a classic example: backup power. Imagine you have an array of accumulators and you want to activate your boilers if the stored energy gets too low. You could just wire a switch directly to an accumulator and tell it to activate if accumulators are below, say, 20% charge, but that would just cause it to rapidly switch on and off, keeping the accumulators at exactly 20% all the time. Instead, you should use an RS latch. Have a combinator output "S" when accumulator charge is below 20%, and another one output "R" when charge is above 70%. Hook them both to the latch, and wire the output of the latch to a switch set to activate if S > 0. The switch will activate as soon as charge drops below 20%, and keep the backup running until charge goes above 70%.

(backup switch)

Finally, a process that many fear to set up: uranium enrichment. The part we're worried about is the recycling of uranium. We want to stop recycling U-235 as soon as we hit 40 items, after which the extra one should be placed into the output. Naturally, we use a counter for this. The recycling inserter is set to "read hand - pulse", so every time it grabs uranium for recycling the counter counts up. As soon as the amount in the counter becomes greater or equal to 40, the recycling inserter's filter is changed to U-238. U-235 has higher signal priority, so this can be done by simply turning off "U-235" while there is a constant input of "U-238". This means it takes out U-238 on its fifth swing, which resets the counter and triggers the U-235 output inserter. We don't need any special handling of the recycled U-238 because the input inserter's stack size is 3, meaning there will never be any competition between U-238 inserters, since their respective item counts add up to 5, the exact amount needed.

(enrichment)

### Conclusion

Each of the given examples can be improved and made more specific to the user's needs. Sometimes it can be done with basic math and logic, other times you'd need to add a couple more basic modules. For example, you could add a second counter to the enrichment circuit to prevent the centrifuge from overfilling and stalling.

Every single milestone in circuit networks was worked towards step by step, by splitting the whole into parts, and then splitting the parts even further. After all, that's how modern computers were developed - make a logic gate out of transistors, then make a memory latch and an adder out of logic gates, then make a RAM and ALU out of memory latches and adders, then make a computer out of those. If you can manage to sometimes think "hey, I've solved this before", then you can achieve anything with circuits.
