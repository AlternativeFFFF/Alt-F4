## Recipe-Oriented Factorio Life <author>Ph.X</author>

Factorio has a complex network of production lines (i.e. spaghetti) that make the game fun and challenging. It's a complex engineering problem with similar challenges to software engineering, so I think it is worthwhile to use some real-life experience to improve the game experience.

### What is 'ROFL'

People with programming experience should have heard of ~~[Object-Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming)~~ [Modular Programming](https://en.wikipedia.org/wiki/Modular_programming), which is the theory that Recipe-Oriented Factorio Life (ROFL) aims to mimic. Modular programming is a software design technique that emphasizes separating the functionality of a program into independent, interchangeable modules, such that each contains everything necessary to execute a single aspect of the desired functionality. In ROFL, we divide the whole factory into independent, interchangeable subfactory modules, such that each contains everything necessary to process only one recipe of the desired factory.

Like most philosophies, ROFL tries to find one timeless [Arche](https://en.wikipedia.org/wiki/Arche) as the origin of everything; In our case, we choose the recipe. Red circuits can be crafted by an assembly machine of any tier, which may be affected by different modules, and the required raw materials may come from a belt, a logistics chest, or even an adjacent copper wire assembly machine, but no matter how other conditions may change, the recipe itself keeps being copper wires, electronic circuits with plastic bars to the advanced circuit. The recipe is kind of an atomic operation in Factorio: an indivisible unit, as it can't be broken down further.

Based on a certain recipe, a dedicated subfactory is packaged into a module. A separate logistics system is used to fetch raw materials and ditch products for the modules, as the interface for external interaction of the module. The purpose of this division is to achieve high cohesion inside the modules and low coupling between the modules. High cohesion inside the module meaning the module contains all the facilities (assemble machines, inserters, belts, power poles, beacons, etc.) needed to make the recipe so it can work independently. Low coupling between the modules meaning modules interact with each other through predefined interfaces (ie. power and rail grids) without direct dependencies, making them interchangeable.

To better implement this idea, the [LTN - Logistic Train Network](https://mods.factorio.com/mods/Optera/LogisticTrainNetwork), [AAI Containers & Warehouses](https://mods.factorio.com/mod/aai-containers) and [Miniloader](https://mods.factorio.com/mod/miniloader) mods are being used in the following examples. The blueprints for all the examples below can be downloaded [here](attachment/rofl_example_blueprint.txt).

### Interface Design

Before actually building any subfactory modules, we need to design a universal logistics network as the interface between the modules. Although a main bus or logistic robots can be implemented as such a logistics system to some extent, a city-block rail grid far exceeds other solutions in terms of throughput, reusability, and plain *coolness*.

In vanilla, trains can only run on a predetermined schedule, which is not flexible and "logistical". This is where LTN comes in handy. In LTN, trains are parked in depot stations just like logistic robots are placed in roboports. Logistic train stops can also act like a requester or provider chest depending on the signal they receive. When there is a logistic demand, LTN will find a suitable train at the depot and generate a schedule for it to fetch the specified items at the provider station, then go to the requester station for unloading, then return to a depot station, similar again to the behavior of a logistic robot. But unlike logistic robots, the trains do not load or unload themselves, so inserters or loaders at the stations are needed. LTN is more powerful than a logistic robot network because of the huge cargo capacity, high speed, and support for fluid transports.

The chosen rail grid in my example is a two-way left-hand drive railroad, which allows me to place the rail signals in between the rails. Junctions are straight and left turn only for space-saving. Most stations have a train stop limit of two to ensure that a maximum of one train waits outside the station. Sections occupied by a handful of trains waiting outside the stations can be detoured through the fully interconnected grid.

![rail grid](figure/rail_grid.png)
_Only the center grid will contain a crafting module._

The modules are kept at a grid distance from each other, where the grids between the modules are used for train traffic management, solar power generation, and robot logistics networks separation. Robots excel in short-distance logistics but are terrible at long-distance transportation. A separated logistics network can prevent robots from being involved in unnecessary long-distance flights because that part of the job belongs to trains.

The smallest two car trains with one locomotive and one cargo/fluid wagon were chosen to reduce the size and eliminate the need to balance loading and unloading between wagons. Fuel replenishment for the locomotives happens in the LTN depot stations where trains return to after each delivery.

![rail yard module](figure/rail_yard_module.png)
_Fuel used for locomotives replenishment are also acquired via LTN._

### Module design

Let's start with the simplest example, the iron gear wheel; a recipe with a single ingredient and a single product. A logistic train stop at the bottom of the grid is requesting 8000 iron plates, and a logistic train stop at the top of the grid is providing items (i.e. gears) from the connected warehouse.

![Gear module](figure/rofl_gear_module.png)
_Simply gear module. The raw material station sits at the bottom, the product station is located at the top._

Since the inputs and outputs within this module are fulfilled by trains, our modification and upgrade of the production line within the module will not affect other modules. So, we could change it into a fully beaconed setup for gears without changing anything else about the factory.

![Alt gear module](figure/rofl_gear_module_2.png)
_Gear module with beacons. No change of stations, only the production line between stations._

Next, let‘s look at an advanced circuit module with three types of raw materials. By setting the logistic train stop to request multiple ingredients, we are able to unload all of our raw materials at a single station. At this point all the raw materials are mixed in one warehouse，we then use filter miniloaders (similar to filter inserters) to separate each material onto a separate belt to supply the assembly machines.

![Advanced circuit module](figure/advanced_circuit_module.png)
_Advanced circuit module. Use a single station to obtain raw materials._

The same works for recipes that produce/consume fluids if we use a fluid wagon instead. In this case, since there are multiple output fluids and they can't be mixed in a fluid wagon, we use more than one output station.

![Oil refinery module](figure/oil_refinery_module.png)
_Oil refinery module. Note that by controlling the pump via the LTN signal allows different fluids to be loaded or unloaded at the same station without mixing._

There are also some unconventional recipes, such as research, a steam power plant, and the rocket silo.

![research center module](figure/research_center_module.png)
_Research center module, which doesn't need an output station_

![thermal power plant module](figure/thermal_power_plant_module.png)
_Steam power plant with landfill to place on the water. Or you can use [Landfill Everything](https://mods.factorio.com/mod/LandfillEverything) to prepare the site._

![rocket silo module](figure/rocket_silo_module.png)
_Rocket silo module. Independent logistics robot network are used within the module. The bottom station is for materials needed to build rockets, and the station on right is for the payloads of the rocket, usually satellites._

### Pros and Cons of ROFL

ROFL is aimed at engineering-minded people, making it easy for players to divide and conquer production problems. When you need to implement a certain recipe, simply set up input and output stations in the grid that match the types of raw materials and products, and then design production lines between the stations. When the capacity of a recipe is insufficient, you can directly copy and paste the corresponding factory module and integrate it into the whole factory production without [plumbing up the inputs and outputs](https://alt-f4.blog/ALTF4-22/#the-goal-of-factorio).

ROFL is not optimized towards perfect production, as it is not a perfect-ratio production line, so it's common that structures stop working because of insufficient raw materials or product overflow. Each item has to be loaded to and unloaded from a wagon, adding a lot of input and output bottlenecks, most typically in copper wire, where the number of products exceeds the number of raw materials and the number of stacks is high while the demand is huge. There is a very significant stockpile for every cell because of the warehouses, which does not help you identify the items with insufficient production in time (definitely iron ore though). The rail network used for inter-module logistics in the factory is expensive to build and also poses a large number of traffic accident hazards (praise the spidertron).

### Conclusion

ROFL is more of a way of thinking that tries to simplify complex problems rather than a blueprint book. The examples above are just one solution that uses ROFL as a guide. Using LTN to build a rail grid may be considered a bit cheaty by some, but this idea can also be used for main bus gameplay and more. There will never be one "correct" way to play Factorio, the variety is what makes it awesome.

[Ph.X]: <> (TODO: add map view from save file)
_A space exploration mod game using the ROFL scheme above._
