## Belt-only computing, part 1/2: Not so quick maths

In Factorio, we can use the circuit network to build things like a simple logic system, all the way up to a fully functional computer and then, someone insane enough might even [run DOOM on it](https://www.youtube.com/watch?v=OE24uwCiz9Q&list=PLdkxm81SV4uVs7EHAxeGcaPLe9xX_7tjb). What is less obvious, however, is the fact that the circuit network is not the only [Turing complete](https://en.wikipedia.org/wiki/Turing_completeness) system in the game. Indeed, you can build a computer out of something very basic, something which you get almost as soon as you start a new game: belts. In this 2 part series, I will be walking through the process of designing two systems used in real-life computers, using nothing but belts and splitters. I will be using loaders and infinity chests, however at any time there are exactly as many items entering, as items leaving, so all belts can be looped through a buffer. I chose not to do that for the sake of compactness and avoiding spaghetti. I have to give credit to [letao12](https://www.youtube.com/channel/UC6BeS4toXnPJe-Kds9E_FEQ), who made a series of videos around creating a belt-only CPU, which is what inspired me to come back to his idea with my own take on it.

In order for any system to be Turing complete, it must be possible to create something known as logic gates. Logic gates are simple elements that perform basic operations of [Boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra) by giving an output based only on the current inputs. There are only 2 numbers in Boolean algebra: 1 and 0. In electronics, they correspond to high voltage and low voltage but, in our case, we will say that a belt with items is a 1, and an empty belt is 0. There are 3 basic logic gates:

* OR gate - outputs 1 **if at least one** input is 1
* AND gate - outputs 1 **if all** inputs are 1
* NOT gate - outputs 1 **only if** the input is 0

The truth table below shows their respective outputs based on the range of possible inputs.

| A    | B    | NOT A | A OR B | A AND B |
| ---- | ---- | ----- | ------ | ------- |
| 0    | 0    | 1     | 0      | 0       |
| 0    | 1    | 1     | 1      | 0       |
| 1    | 0    | 0     | 1      | 0       |
| 1    | 1    | 0     | 1      | 1       |

It is a known fact that by chaining these logic gates in specific ways (and sometimes looping some wires), it is possible to construct a [Turing machine](https://en.wikipedia.org/wiki/Turing_machine). All three of the basic gate types can be created entirely with belts and splitters. I don't want to make people scroll for an hour, so I only show the default all-inputs-zero state for most circuits. Here a link to a [blueprint book](https://controlc.com/9e140a6c) with everything from this article, for anyone who would like to experiment with the circuits themselves. I will refer to different items as "item type 1/2/3/...", for convenience and generality, and priority/non-priority inputs and outputs as "primary/secondary", mostly just for convenience. I will also be using different colours in the images, to differentiate between item types.

### The basic gates

The AND and OR gates are as simple as a single splitter with a set priority: 

![A single splitter acting both as an AND and an OR gate](https://cdn.discordapp.com/attachments/699618487097884723/802622552198479932/and_and_or.png)
*The primary output acts as an OR gate, whilst the secondary output acts as an AND gate.* 

The NOT gate is a bit trickier to make, but it can be done by using more than one item type and some clever filtering and prioritizing:

![A combined NOT gate, and signal duplicator](https://cdn.discordapp.com/attachments/699618487097884723/802622548889305169/very_useful_circuit.png)

Whilst *input A* is 0, the first splitter is only receiving one input, and so item type 2 is going onto the primary output, meaning only the *NOT A output* is 1.
When input A is on, the first splitter is now getting 2 inputs; item type 1 is going into the primary input, therefore it gets put on the primary output, replacing item type 2 which is now coming out of the secondary output. The secondary output is effectively a copy of A, but with a different item type. 

The primary output of the first splitter is always 1 but switches item type depending on the input. Using a filter splitter, we can split this variable item type signal into 2 wires: one will just be signal A coming straight through with the same item type as the original input, type 1, the other will be *NOT A*, with item type 2.

This second circuit is exceptionally useful because it combines a NOT gate, a signal duplicator, and an item swapper. We need signal duplicators because branching a belt with a splitter makes the item flow unsaturated, which causes it to interact with other splitters incorrectly as it is neither 0 or 1. We also need an item swappers as there is often a mismatch between one circuit's output type and another's input type.

### The half-adder

Now that we have our 3 basic components, let's build a half-adder. *Why would we need a half-adder?* Well, as the name might suggest, a half-adder is one half of a full adder, which is a circuit with the ability to add binary numbers together. This will allow us to do addition, and creative uses of addition allow us to implement *literally* every other mathematical operation imaginable.

A half-adder is a circuit that sums two single-digit binary numbers. This may sound like a daunting task, but in reality, it's very simple. Both inputs, A and B are single-digit binary numbers meaning the maximum possible output is 2 (1+1) which, unfortunately, will not fit into a single-digit output. Instead, we will use a two-digit binary number where the first digit has a place value of 2 (2<sup>2</sup>) and the second a place value of 1 (2<sup>0</sup>). Taking this into account, here is the half adder's truth table:

| A    | B    | First digit of A + B | Second digit of A + B |
| ---- | ---- | -------------------- | --------------------- |
| 0    | 0    | 0                    | 0                     |
| 0    | 1    | 0                    | 1                     |
| 1    | 0    | 0                    | 1                     |
| 1    | 1    | 1                    | 0                     |

The first digit is simply A AND B. However, for the second digit, we need something called an XOR gate (XOR stands for "exclusive OR"). An XOR gate outputs 1 if **exactly one** input is 1, which is precisely what we need for the second digit.

An XOR gate's logic is, "A or B, but not both", and therefore an XOR gate is just *(A OR B) AND NOT (A AND B)*. Here is how to do this with the basic gates discussed earlier:

![XOR Gate image]()

Combining the AND and XOR gates, we can produce a half adder circuit as shown below:

![A half-adder](https://cdn.discordapp.com/attachments/699618487097884723/802622555218247710/half_adder.png)

We also get an AND gate output for free from the combined duplicator-NOT circuit, giving us a complete half-adder. It just so happens that we can combine the first item swapper with the second AND gate, which allows us to get rid of a splitter:

![A slightly simpler half-adder](https://cdn.discordapp.com/attachments/699618487097884723/802655251529596948/simpler_half_adder.png)

### The final product

Now, to convert our half-adder to a full adder, we need to connect 2 of them in sequence (hence the name "half-adder"): 

![A diagram of a full adder](https://cdn.discordapp.com/attachments/699618487097884723/802652825074532362/unknown.png)

As you can see, a full adder is just 2 half-adders chained in a specific way. Now, we could just copy and paste the circuit, but thanks to the properties of belts, there is a much better and smaller way. The 2 lanes of a belt are processed by splitters independently from each other, meaning that instead of chaining two half-adders, we can instead **run everything through a single half-adder twice**. This is usually impossible with traditional logic circuits, but in this brave new world of Factorio computers, anything goes. Here is how:

![A full adder](https://cdn.discordapp.com/attachments/699618487097884723/802622547937329193/spread_out_full_adder.png)

Here, the first half-adder uses the right-hand side of the belt, and the second half-adder uses the left-hand side of the belt. First, the inputs make it through the first half-adder as normal on the right-hand side of the belt. Next, the half adder's XOR output is looped all the way back and is now put on the left side of the belt. It goes through the same mechanisms again, but since it's on the left side, it doesn't interact with the right side at all. The second half-adder still has a free input, though, so we have to connect a third input belt, this time on the left side to act as the *carry in* bit. The AND outputs of both half-adders are sideloaded onto a belt, automatically creating an OR. Internal delays might cause both half-adders' carries to output at the same time meaning it is attempting to unload a full belt, onto half of a belt. Therefore, we also need an overflow protection splitter so that the carry bit doesn't back up and break the entire circuit. After some rearranging of the components, we get this:

![A compact full adder](https://cdn.discordapp.com/attachments/699618487097884723/802622554841153567/compacted_full_adder.png)

This is *exactly* the same circuit as in the previous image and I leave it as an exercise to the reader to verify that. The only thing left to do is to stack a bunch of these together and feed them numbers, so here is a belt-only adder calculating 01001101 (77) + 10001011 (139) = 011011000 (216):

![An array of adders calculating 01001101 (77) + 10001011 (139) = 011011000 (216)](https://media.discordapp.net/attachments/704073496552144959/808383185280434206/K1VQHZg.png)

Adding numbers is cool and all, but it's nothing without some kind of memory, which is exactly what we will be exploring in the next issue. Stay tuned!