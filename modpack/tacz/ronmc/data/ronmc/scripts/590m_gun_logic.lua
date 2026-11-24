local M = {}

function M.shoot(api)
    api:shootOnce(api:isShootingNeedConsumeAmmo())
end

function M.start_bolt(api)
    -- Return true to start ticking, since there are nothing needed to be check
    return true
end

function M.tick_bolt(api)
    -- Get total bolt time from script parameter in gun data
    local params = api:getScriptParams()
    local total_bolt_time = params.bolt_time * 1000
    local bolt_feed_time = params.bolt_feed_time * 1000
    if (total_bolt_time == nil or bolt_feed_time == nil) then
        return false
    end
    local bolt_time = api:getBoltTime()
    if (bolt_time < bolt_feed_time) then
        -- Bolt time less than total means we need to keep ticking, return true
        return true
    else
        -- Bolt time greater than total means that the bullet
        -- needs to be put from the magazine into the barrel, and then return false to end ticking.
        if (not api:hasAmmoInBarrel()) then
            if (api:removeAmmoFromMagazine(1) ~= 0) then
                api:setAmmoInBarrel(true);
            end
        end
        return bolt_time < total_bolt_time
    end
end

return M