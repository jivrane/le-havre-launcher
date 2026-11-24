local default = require("tacz_default_state_machine")
local STATIC_TRACK_LINE = default.STATIC_TRACK_LINE
local MAIN_TRACK = default.MAIN_TRACK
local main_track_states = default.main_track_states

local inspect_state = setmetatable({}, {__index = main_track_states.inspect})
local idle_state = setmetatable({}, {__index = main_track_states.idle})

local function runInspectAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)

    if (context:getAmmoCount() <= 0) then
        context:runAnimation("inspect_empty", track, false, PLAY_ONCE_STOP, 0.2)
    elseif (context:getAmmoCount() <= 1) then
        context:runAnimation("inspect_01", track, false, PLAY_ONCE_STOP, 0.2)
    elseif (context:getAmmoCount() <= 2) then
        context:runAnimation("inspect_02", track, false, PLAY_ONCE_STOP, 0.2)
    elseif (context:getAmmoCount() <= 3) then
        context:runAnimation("inspect_03", track, false, PLAY_ONCE_STOP, 0.2)
    elseif (context:getAmmoCount() <= 4) then
        context:runAnimation("inspect_04", track, false, PLAY_ONCE_STOP, 0.2)
    elseif (context:getAmmoCount() <= 5) then
        context:runAnimation("inspect_05", track, false, PLAY_ONCE_STOP, 0.2)
    else
        context:runAnimation("inspect", track, false, PLAY_ONCE_STOP, 0.2)
    end
end

function idle_state.transition(this, context, input)
    if (input == INPUT_INSPECT) then
        runInspectAnimation(context)
        return inspect_state
    end

    return main_track_states.idle.transition(this, context, input)
end

function inspect_state.transition(this, context, input)
    return main_track_states.inspect.transition(this, context, input)
end

local M = setmetatable({
    main_track_states = setmetatable({
        idle = idle_state,
        inspect = inspect_state
    }, {__index = main_track_states})
}, {__index = default})

function M:initialize(context)
    default.initialize(self, context)
end

function M:states()
    return {
        self.base_track_state,
        self.bolt_caught_states.normal,
        self.main_track_states.start,
        self.gun_kick_state,
        self.movement_track_states.idle,
        self.ADS_states.normal,
        self.slide_states.normal
    }
end

return M