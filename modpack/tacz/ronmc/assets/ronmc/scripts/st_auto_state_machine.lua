local default = require("tacz_default_state_machine")
local STATIC_TRACK_LINE = default.STATIC_TRACK_LINE
local GUN_KICK_TRACK_LINE = default.GUN_KICK_TRACK_LINE
local MAIN_TRACK = default.MAIN_TRACK
local main_track_states = default.main_track_states
local idle_state = setmetatable({}, {__index = main_track_states.idle})
local shoot_state = {}
local inspect_active = false

function shoot_state.transition(this, context, input)

    if (input == INPUT_SHOOT) then
        if inspect_active then
            inspect_active = false
            context:stopAnimation(context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK))
        end
        local track = context:findIdleTrack(GUN_KICK_TRACK_LINE, false)

        if (context:getAmmoCount() == 0) then
            context:runAnimation("shoot_last", track, true, PLAY_ONCE_STOP, 0)
        else
            context:runAnimation("shoot", track, true, PLAY_ONCE_STOP, 0)
        end
    end
    return nil
end

local reload_state = {
    need_ammo = 0,
    loaded_ammo = 0
}

local function runInspectAnimation(context)
    local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)

    if (context:getAmmoCount() <= 0) then

        if (context:hasBulletInBarrel()) then
            context:runAnimation("inspect_01", track, false, PLAY_ONCE, 0.2)
        else
            context:runAnimation("inspect_empty", track, false, PLAY_ONCE, 0.2)
        end

    else
        context:runAnimation("inspect", track, false, PLAY_ONCE, 0.2)
    end
end

function idle_state.transition(this, context, input)

    if (input == INPUT_RELOAD) then
        return this.main_track_states.reload
    end

    if (input == INPUT_INSPECT) then
        inspect_active = true
        runInspectAnimation(context)
        return nil
    end

    return main_track_states.idle.transition(this, context, input)
end

function reload_state.entry(this, context)
    local state = this.main_track_states.reload
    local isNoAmmo = not context:hasBulletInBarrel()

    if (isNoAmmo) then
        context:runAnimation(
            "reload_intro_empty",
            context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK),
            false,
            PLAY_ONCE_HOLD,
            0.2
        )
    else
        context:runAnimation(
            "reload_intro",
            context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK),
            false,
            PLAY_ONCE_HOLD,
            0.2
        )
    end

    state.need_ammo = context:getMaxAmmoCount() - context:getAmmoCount()
    state.loaded_ammo = 0
end

function reload_state.update(this, context)
    local state = this.main_track_states.reload

    if (state.loaded_ammo > state.need_ammo or not context:hasAmmoToConsume()) then
        context:trigger(this.INPUT_RELOAD_RETREAT)
    else
        local track = context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK)

        if (context:isHolding(track)) then
            context:runAnimation("reload_loop", track, false, PLAY_ONCE_HOLD, 0)
            state.loaded_ammo = state.loaded_ammo + 1
        end
    end
end

function reload_state.transition(this, context, input)
    if (input == this.INPUT_RELOAD_RETREAT or input == INPUT_CANCEL_RELOAD) then
        context:runAnimation("reload_end", context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK), false, PLAY_ONCE_STOP, 0.2)

        inspect_active = false

        context:runAnimation(
            "reload_end",
            context:getTrack(STATIC_TRACK_LINE, MAIN_TRACK),
            false,
            PLAY_ONCE_STOP,
            0.2
        )

        return this.main_track_states.idle
    end
    return this.main_track_states.idle.transition(this, context, input)
end

local M = setmetatable({
    main_track_states = setmetatable({
        idle = idle_state,
        reload = reload_state
    }, {__index = main_track_states}),
    gun_kick_state = shoot_state,
    INPUT_RELOAD_RETREAT = "reload_retreat"
}, {__index = default})
function M:initialize(context)
    default.initialize(self, context)
    self.main_track_states.reload.need_ammo = 0
    self.main_track_states.reload.loaded_ammo = 0
end
return M