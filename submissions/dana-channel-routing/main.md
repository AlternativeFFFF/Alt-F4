## Dana dev's blog: about the spaghetti in recipe graphs <author>Credne</author>

### Dana ... What is That?

[Dana](https://mods.factorio.com/mod/dana) is a mod that aims at answering a simple common question in Factorio: "How can I make item *X*?".

There are already quite a few mods doing this: [FNEI](https://mods.factorio.com/mod/FNEI), [Recipe Book](https://mods.factorio.com/mod/RecipeBook), [What is it really used for](https://mods.factorio.com/mod/what-is-it-really-used-for), etc. These mods have a common approach: Let's say a new player want to know how to craft the Chemical science pack (the cyan one). This player looks for it with one these mods (or Factorio's recipe list), and sees there is a single recipe, taking red circuits, sulfur, and engine units. So now the new player wonders "How do I make red circuits?", looks for it, and sees a single recipe that requires plastic bars, copper wires, and green circuits. Next thought: "How do I make plastic bars?": One recipe requiring petroleum gas. "How do I make petroleum gas?": Four recipes, having to inspect them one by one, and so on. That's time consuming, tedious, and the player is likely to forget some steps (like the sulfur, or steel).

Dana is born out of frustration of having to apply this process for hours on complex mod overhauls, and it takes a *slightly* different approach to answer these questions:

![dana-demo](dana-demo.mp4)
("How to make *Chemical science packs*?")

Dana is about depth: When asked how to make a Chemical science pack, it will show you all the chained steps required from the raw materials. And it does so directly in-game, by drawing you a *nice™ and understandable™* recipe graph. Players can navigate the graph with WASD, zoom in/out with mouse wheel, and select nodes or links for additional info. It's also possible to draw the full crafting graph of the current game (the vanilla one will be shown further in this article), or an "usage" graph (ie. what are all the items that can be crafted from *X*).

Dana is designed to work out of the box with any combination of mods adding/modifying/removing recipes or items. There is no hardcoded configuration provided by the player, the modders, or shipped directly with Dana. In this video, it placed the "Copper block" between the "Iron block" and the "Refinery block", the "Heavy oil" above the "Light oil", decided how the lines should be drawn/merged/bended, what each block's X-Y coordinates are, and more. All that Dana had to work with was the full list of items, recipes, and what are the available natural resources. This is done by a *graph layout algorithm* (the piece of code that takes a bunch of recipes/items and decides where to place them on screen and how to link them) specifically designed for Factorio, which will be the subject of this article.

### Dev Blog: Drawing the Graph's Spaghetti

Today's post will present some (hopefully interesting) details about the inner working of Dana's *nice™ and understandable™* graph generator. To give a general introduction, Dana's graphs are a variant of [layered graphs](https://en.wikipedia.org/wiki/Layered_graph_drawing). This means that items and recipes are placed in *node layers*, separated by *link layers*.

![Layered graph](layers-illustration.png)
(Layered graph structure: node layers  with the blue background, link layers with the green background.)

The first thing Dana does is decide how many node layers are needed, and in which layer each item/recipe will be placed. The second step is to decide the horizontal coordinate of each item/recipe. The third step is building the link layers. The final step is to assign a vertical coordinate to each element in the graph, now that the number of layers and their height is known.

The full layout algorithm is way too big and technical for an Alt-F4 article, so the rest of this will focus on the third step. Here's the problem: given two consecutive *node layers*, trace the required links in the *link layer*, in order to get a *nice™ and understandable™* graph:

![Intro: problem description](intro-problem-description.png)
(Input data of the problem)
![Intro: possible solution](intro-problem-solution.png)
(Possible result)

Conveniently, this is more or less a variant of kindergarten exercises:

![Kindergarten version](problem-kindergarten-version.png)

Since five years old kids do that, it shouldn't be hard to program, right?

### The Design: "Nice™" and "understandable™" Graph?

First, let's take a paper and a pencil (or your favorite image editor) and answer an important question: what should the links look like? As one can imagine, what makes a graph *nice™ and understandable™* is pretty hard to define.

Maybe simple straight lines, like most graph renderers?

![Straight lines: small example](alternative-solution-1.png)
![Straight lines: bigger example](alternative-solution-2.png)

This might get the job done on small graphs, but fails to be *nice™ and understandable™* with wide graphs. Nearly parallel lines crossing each other are hard to follow, and areas with a high line density become a block of white. The good old straight line isn't even enough for Vanilla Factorio crafting graphs, let alone modded ones!

So, back to the drawing board for a *nicer™ and more understandable™* solution. Let's remind ourselves of the general guidelines for user friendliness of graph links:

* Minimise line crossings, especially between almost parallel lines.
* Minimise the bends on a link.
* Minimise the length of links.

On top of that, there are general UI design rules:

* The user experience plummets if they have to scroll horizontally/vertically to cross-check information from different parts of the interface. To avoid that, the graphs must be as compact as possible.
* Less is more: if the same amount of information can be conveyed with four lines instead of twenty, that's probably a good thing to do.

So now, it's time to *search* for better ideas. And the best way to research for anything, as we all know, is ~~google~~ by pressing "T" in Factorio:

![Factorio tech tree](factorio-tech-tree.png)

Factorio's graph renderer has a more subtle way of rendering links. Each link is decomposed into three segments: two verticals, one horizontal. This approach scales much better with wider graphs, because:

* There's never a crossing of nearly parallel lines. All crossings are at right angle, which is optimal to prevent users from following the wrong line.
* The density of links is kept under control: there's always enough gap between parallel lines to distinguish them from each other.

The price for this readability is vertical space: there need to be enough room between the two rows of technologies to add all the horizontal segments without collisions:

![Factorio tech tree](factorio-tech-tree-spacing.png)

To minimize this cost, there's a simple yet huge optimisation: What if lines didn't link just two elements, but any number of elements? Just draw a single wide horizontal line for each item/technology, then add as many vertical lines as necessary to connect to the nodes.

![Factorio tech tree dana link types](factorio-tech-tree-dana-link-types.png)

Much more compact, less clutter, definitely *nice™ and understandable™*. This gives a "main bus" vibe to these graph sections that'll hopefully feel natural to a Factorio player, while hitting a good compromise between the general guidelines. This is also technically possible with Factorio's in-game rendering API, as links are just a bunch of lines, triangles and circles. This almost allows Dana to fit Factorio's full crafting graph on a single screen:

![Dana: Factorio full graph](dana-full-graph.png)

### The Coding Part

So that's all for the drawing board, time to throw some code at the problem to get the job done! But with that come some other problems. First, Factorio Mods are made in a language called Lua, and Lua has an ridiculously barren ecosystem. No success in finding a library that can do this kind of link routing.

Another solution would be porting a library from other languages. Sadly there are plenty of libraries to draw conventional graphs, but Dana is now dealing with links between any number of nodes. That's not a graph anymore, but an hypergraph. While the word sounds definitely cooler, there aren't many software libraries to draw them, and in general there's much less scientific literature on the topic. No success in finding clues to do routing the Dana way.

So, Dana has a router made "almost" from scratch. "Almost" because there was a lot of inspiration to be found elsewhere, it just required looking into some unexpected places...

#### Inspiration from PCB Design

It happens that there are some people whose daily job requires to link points on a 2D plane: printed circuit board (PCB) designers. And for problems almost identical to Dana's link routing, they have a decade-old family of well documented algorithms: [channel routers](https://en.wikipedia.org/wiki/Channel_router).

![Picture of two channels](https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/ChannelRouteSolution.png/800px-ChannelRouteSolution.png)

Before looking at the solution, the first things Dana got from that is a proper way to modelize the problem. The goal of our link router is twofold: Determine the number of *channels* between the rows of nodes, and assign a *channel* to each horizontal segment of the links.

Where each horizontal line starts and ends is simply determined by which nodes they must be linked to, and the vertical segments are simple projections from the nodes to the horizontal lines.

![Channels and trunks](dana-channels-and-trunks.png)
(Here, the router decided to make six channels in cyan, then choose a channel for each red horizontal segments.)

So maybe Dana could just copy/paste this solution. Let's just place the links like tracks were placed on PCBs in the 80s!

![Dana PCB channel router](PCB-router.png)
(Dana with a classic PCB router.)

Well that's not exactly satisfying. These algorithms were designed with the constraints of the PCB industry in mind, where link crossings are usually not a problem: only making the final PCB as small as possible really matters. But when it comes to *nice™* graphs, all this tangled spaghetti is really bad. In order to fix it, Dana has to provide the router with a **partial order** on the horizontal lines: something telling that line `A` must be placed over line `B` to minimize crossings.

#### Inspiration from Sports Tournaments

To find a good vertical order, let's start with a simple idea: For each pair (`A`,`B`) of horizontal lines, we compute the number of crossings if we place `A` over `B`, same with `B` over `A`. We can deduce that placing `A` over `B` will save (or cost) a certain amount of crossings, or possibly that it doesn't change anything.

![Example of crossing scores](crossings-score-example.png)
(Here, placing `A` above `B` saves two crossings)

Sadly the above trick may result in contradictions, à la: `A` must be placed above `B`, `B` must be placed above `C`, and `C` must be placed above `A`. To get a proper order, Dana has to sacrifice some of the generated constraints, but in a way that re-adds as few crossings as possible.

![Example of crossing score contradictions](crossings-score-contradiction.png)
(`C` over `A` saves one crossing, `A` over `B` saves two crossings, `B` over `C` saves one crossing)

Now is the perfect time to randomly start talking about sports. Let's rephrase the previous paragraph, but using sports terms instead. `A` has won against `B`, `B` has won against `C`, and `C` has won against `A`. To get a proper ranking, Dana has to ignore some of the matches' results, but in a way that ignores as few score differences as possible.

The fundamental problem is the same. Luckily for us, the sports version is as old as round-robin tournaments, and the good thing about old mainstream problems is that there are a lot of smart people who have done research on it!

A generic way to solve the issue is to use graph theory, where our sports problem would be equivalent to the [Minimum feedback arc set](https://en.wikipedia.org/wiki/Feedback_arc_set) problem. The bad news: it's a [NP-hard](https://en.wikipedia.org/wiki/NP-hardness) optimisation problem. In layman's terms: finding the best solution can be **ridiculously** time consuming even with just a few dozen of players. The good news: there is a nice pile of research articles proposing *heuristics*. Those algorithms' solutions might not be optimal, but "close enough" to optimal in "good enough" time. Various heuristics exist depending on how much computation time one is willing to pay in order to get stronger guarantees of optimality, or which can be tailored to specific types of graphs.

Dana uses the heuristic from [Eades, P., Lin, X. and Smyth, W.F. (1993)](https://researchrepository.murdoch.edu.au/id/eprint/27510/1/effective_heuristic.pdf), with trivial modifications for weighted graphs. This is an extremely fast and hopefully "not too bad" algorithm to compute a partial order (these full Pyanodon graphs have to come out before the end of time, after all). It's enough to get a much more satisfying result on the last crafting graph:

![Dana tuned channel router](improved-router.png)
(Same graph as the end of the PCB section, with the improved router.)

### Conclusion

So that's the short version: Dana runs a sports competition between Factorio items. Their rankings are then used to connect some resistors, capacitors and coils on an imaginary PCB in a fashionable manner. This enables Dana to generate *nice™ and understandable™* crafting graphs.

Trust me, I'm an engineer.
