local default = require("tacz_default_state_machine")

local STATIC_TRACK_LINE = default.STATIC_TRACK_LINE
local static_track_top = default.static_track_top

local function increment(obj)
    obj.value = obj.value + 1
    return obj.value - 1
end

local FIRE_MODE_TRACK = increment(static_track_top)
local SWITCH_MODE_TRACK = increment(static_track_top)

local fire_mode_state = {
    semi = {},
    auto = {},
    draw = {}
}

local function getTrack(context, track)
    return context:getTrack(STATIC_TRACK_LINE, track)
end

local function stopSwitch(context)
    context:stopAnimation(getTrack(context, SWITCH_MODE_TRACK))
end

-- =========================
-- DRAW
-- =========================
function fire_mode_state.draw.transition(this, context, input)
    if input == INPUT_MODE_DRAW then
        local mode = context:getFireMode()

        if mode == SEMI then
            context:runAnimation("static_semi", getTrack(context, FIRE_MODE_TRACK), true, PLAY_ONCE_HOLD, 0)
            return this.semi
        elseif mode == AUTO then
            context:runAnimation("static_auto", getTrack(context, FIRE_MODE_TRACK), true, PLAY_ONCE_HOLD, 0)
            return this.auto
        end
    end
end

-- =========================
-- SEMI
-- =========================
function fire_mode_state.semi.update(this, context)
    local track = getTrack(context, FIRE_MODE_TRACK)

    if context:isHolding(track) then
        context:runAnimation("static_semi", track, true, PLAY_ONCE_HOLD, 0)
    end

    if context:getFireMode() == AUTO then
        context:trigger(this.INPUT_MODE_AUTO)
    end
end

function fire_mode_state.semi.transition(this, context, input)
    if input == this.INPUT_MODE_AUTO then
        context:runAnimation("switch_auto", getTrack(context, SWITCH_MODE_TRACK), false, PLAY_ONCE_STOP, 0)
        return this.auto
    end

    if input == INPUT_SHOOT or input == INPUT_RELOAD or input == INPUT_INSPECT then
        stopSwitch(context)
    end
end

-- =========================
-- AUTO
-- =========================
function fire_mode_state.auto.update(this, context)
    local track = getTrack(context, FIRE_MODE_TRACK)

    if context:isHolding(track) then
        context:runAnimation("static_auto", track, true, PLAY_ONCE_HOLD, 0)
    end

    if context:getFireMode() == SEMI then
        context:trigger(this.INPUT_MODE_SEMI)
    end
end

function fire_mode_state.auto.transition(this, context, input)
    if input == this.INPUT_MODE_SEMI then
        context:runAnimation("switch_semi", getTrack(context, SWITCH_MODE_TRACK), false, PLAY_ONCE_STOP, 0)
        return this.semi
    end

    if input == INPUT_SHOOT or input == INPUT_RELOAD or input == INPUT_INSPECT then
        stopSwitch(context)
    end
end

-- =========================
-- MODULE EXPORT (WICHTIG)
-- =========================
local M = setmetatable({
    fire_mode_state = fire_mode_state,

    FIRE_MODE_TRACK = FIRE_MODE_TRACK,
    SWITCH_MODE_TRACK = SWITCH_MODE_TRACK,

    INPUT_MODE_SEMI = "input_mode_semi",
    INPUT_MODE_AUTO = "input_mode_auto",
    INPUT_MODE_DRAW = "input_mode_draw",
}, { __index = default })

function M:initialize(context)
    default.initialize(self, context)
end

return M