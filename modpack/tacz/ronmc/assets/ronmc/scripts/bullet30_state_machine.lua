local default = require("tacz_default_state_machine")
local STATIC_TRACK_LINE = default.STATIC_TRACK_LINE
local BOLT_CAUGHT_TRACK = default.BOLT_CAUGHT_TRACK

local normal_state = setmetatable({}, {__index = default.bolt_caught_states.normal})

function normal_state.update(this, context)

    local ammo = context:getAmmoCount()

    -- Maximal 30 sichtbare Patronen
    local maxAmmo = 30

    -- Begrenzen falls Magazin größer ist
    if ammo > maxAmmo then
        ammo = maxAmmo
    end

    -- Animation berechnen
    local progress = 1 - (ammo / maxAmmo)

    context:setAnimationProgress(
        context:getTrack(STATIC_TRACK_LINE, BOLT_CAUGHT_TRACK),
        progress,
        false
    )
end

function normal_state.entry(this, context)
    context:runAnimation(
        "static_ammo_display",
        context:getTrack(STATIC_TRACK_LINE, BOLT_CAUGHT_TRACK),
        false,
        PLAY_ONCE_STOP,
        0
    )

    normal_state.update(this, context)
end

local M = setmetatable({
    bolt_caught_states = setmetatable({
        normal = normal_state
    }, {__index = default.bolt_caught_states})
}, {__index = default})

return M