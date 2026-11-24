local default = require("tacz_default_state_machine")

local STATIC_TRACK_LINE = default.STATIC_TRACK_LINE
local MAIN_TRACK = default.MAIN_TRACK
local main_track_states = default.main_track_states
local static_track_top = default.static_track_top

local inspect_state = setmetatable({}, {__index = main_track_states.inspect})
local idle_state = setmetatable({}, {__index = main_track_states.idle})

-- Track helper
local function increment(obj)
    obj.value = obj.value + 1
    return obj.value - 1
end

local FIRE_MODE_TRACK = increment(static_track_top)
local SWITCH_MODE_TRACK = increment(static_track_top)

-- 🔥 NEW: Ammo display track
local AMMO_TRACK = increment(default.static_track_top)

local MAX_AMMO = 30

-- --------------------------
-- Ammo Visual State
-- --------------------------
local ammo_state = {}

function ammo_state.entry(this, context)
    context:runAnimation(
        "static_ammo_display",
        context:getTrack(STATIC_TRACK_LINE, AMMO_TRACK),
        false,
        PLAY_ONCE_STOP,
        0
    )
end

function ammo_state.update(this, context)

    local ammo = context:getAmmoCount()

    if ammo > MAX_AMMO then
        ammo = MAX_AMMO
    end

    if context:isStopped(context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)) == false then
        return
    end

    local progress = 1 - (ammo / MAX_AMMO)

    context:setAnimationProgress(
        context:getTrack(STATIC_TRACK_LINE, AMMO_TRACK),
        progress,
        false
    )

end

-- --------------------------
-- Reload / Inspect (original untouched)
-- --------------------------
local function isNoAmmo(context)
    return (not context:hasBulletInBarrel()) and (context:getAmmoCount() <= 0)
end

local function runReloadAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)
    local ext = context:getMagExtentLevel()

    if (isNoAmmo(context)) then
        if (ext == 0) then
            context:runAnimation("reload_empty", track, false, PLAY_ONCE_STOP, 0.2)
        else
            context:runAnimation("reload_empty", track, false, PLAY_ONCE_STOP, 0.2)
        end
    else
        if (ext == 0) then
            context:runAnimation("reload_tactical", track, false, PLAY_ONCE_STOP, 0.2)
        else
            context:runAnimation("reload_tactical", track, false, PLAY_ONCE_STOP, 0.2)
        end
    end
end

local function runInspectAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)

    if (isNoAmmo(context)) then
        context:runAnimation("inspect_empty", track, false, PLAY_ONCE_STOP, 0.2)
    else
        context:runAnimation("inspect", track, false, PLAY_ONCE_STOP, 0.2)
    end
end

-- --------------------------
-- Idle State (original + hook)
-- --------------------------
function idle_state.transition(this, context, input)

    if (input == INPUT_RELOAD) then
        runReloadAnimation(context)
        return this.main_track_states.idle
    end

    if (input == INPUT_FIRE_SELECT) then
        context:stopAnimation(context:getTrack(STATIC_TRACK_LINE, FIRE_MODE_TRACK))
        context:stopAnimation(context:getTrack(STATIC_TRACK_LINE, SWITCH_MODE_TRACK))
        return this.main_track_states.idle
    end

    if (input == INPUT_PUT_AWAY) then
        local put_away_time = context:getPutAwayTime()
        local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)

        context:stopAnimation(context:getTrack(STATIC_TRACK_LINE, SWITCH_MODE_TRACK))
        context:runAnimation("put_away", track, false, PLAY_ONCE_HOLD, put_away_time * 0.75)

        context:setAnimationProgress(track, 1, true)
        context:adjustAnimationProgress(track, -put_away_time, false)

        return this.main_track_states.final
    end

    if (input == INPUT_INSPECT) then
        runInspectAnimation(context)
        return inspect_state
    end

    return main_track_states.idle.transition(this, context, input)
end

-- --------------------------
-- STATE MACHINE EXPORT
-- --------------------------
local M = setmetatable({
    main_track_states = setmetatable({
        idle = idle_state,
        inspect = inspect_state
    }, {__index = main_track_states}),

    FIRE_MODE_TRACK = FIRE_MODE_TRACK,
    SWITCH_MODE_TRACK = SWITCH_MODE_TRACK,

    ammo_state = ammo_state
}, {__index = default})

-- init
function M:initialize(context)
    default.initialize(self, context)
end

-- IMPORTANT: state registration
function M:states()
    return {
        self.base_track_state,
        self.bolt_caught_states.normal,
        self.main_track_states.start,
        self.gun_kick_state,
        self.movement_track_states.idle,
        self.ADS_states.normal,
        self.slide_states.normal,
        self.ammo_state -- 🔥 IMPORTANT
    }
end

return M