/c

local surface = game.surfaces.nauvis
local count = 0
for _, entity in pairs(surface.find_entities_filtered{
    name = {
        "fluidic-small-electric-pole-in",
        "fluidic-small-electric-pole-out",
        "fluidic-medium-electric-pole-in",
        "fluidic-medium-electric-pole-out",
        "fluidic-substation-in",
        "fluidic-substation-out",
        "fluidic-big-electric-pole",
    }
}) do
    if string.find(entity.name, "out") then
        local eei = surface.create_entity{
            name = "electric-energy-interface",
            position = entity.position
        }
    elseif string.find(entity.name, "in") then
        local eei = surface.create_entity{
            name = "electric-energy-interface",
            position = entity.position
        }
        if eei and eei.valid then
            eei.power_usage = 1000000000000
            eei.power_production = 0
        else
            error("Could not create eei")
        end
    end

    entity.destroy{raise_destroy=false}
    count = count + 1
end

game.print("Replaced "..count.." things")