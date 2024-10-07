import { AirlockName, AirlockState, type Status } from "../../../routes/ypsilon-14/data";

import {redis} from '$lib/server/redis'

// Keep the airlocks separate because that's just easier?


const boolFromRedis = (value: string | null): boolean => value == '1'

/**
 * 
 * @param name 
 * @param newState 
 * @returns True if set correctly, false if airlock is open
 */
export const setAirlock = async (name: AirlockName, newState: AirlockState): Promise<boolean> => {
    // Not the most efficient, but easy to implement
    
    // WATCH to make sure nothing changes
    let tryAgain = true
    let correctlySet = false // Did we get to do what we wanted
    const target = 'yp14:' + name
    while (tryAgain){
        try{
            // Set a watch on our airlock
            let errorOccurred = false
            await redis.unwatch()
            await redis.watch(target)
            // Get the current value
            const currentStatus = await redis.get(target)

            if (currentStatus == newState) {
                correctlySet = true
                break
            }else if  (newState == AirlockState.LOCKED && currentStatus == AirlockState.OPEN){
                correctlySet = false
                break
            }

            // Transaction to set (will fail if we couldn't do it)
            const result = await redis.multi()
                .set(target, newState)
                .exec()

            // Check we did it!
            if (result?.every((err, _) => err == null)) {
                break
            }
        } finally {
            await redis.unwatch()
        }
    }
    await redis.unwatch()
    return correctlySet
}

export const forceSetAirlock = async (name: AirlockName, newState: AirlockState) => {
    const target = 'yp14:' + name
    await redis.set(target, newState)
}


const parseAirlocks = (b1: string | null, b2: string | null, ms: string | null): Record<AirlockName, AirlockState> => {
    // default replacement
    const BAY1 = (b1 && b1 in AirlockState) ? b1 as AirlockState : AirlockState.LOCKED
    const BAY2 = (b2 && b2 in AirlockState) ? b2 as AirlockState : AirlockState.UNLOCKED
    const MINESHAFT = (ms && ms in AirlockState) ? ms as AirlockState : AirlockState.UNLOCKED

    return {
        BAY1,
        BAY2,
        MINESHAFT
    }
}

const allAirlockKeys = [AirlockName.BAY1, AirlockName.BAY2, AirlockName.MINESHAFT].map((x) => 'yp14:' + x)

export const getAirlocks = async (): Promise<Record<AirlockName, AirlockState>> => {
    let [b1, b2, ms] = await redis.mget(allAirlockKeys)

    return parseAirlocks(b1, b2, ms)
}

// SHOWERS will be 

const ADMIN_BIT = 5

export const setShower = async (idx: number, newState: boolean) => {
    if (idx > 4){
        return
    }

    await redis.hset('yp14:showers', idx, Number(newState))
}

export const parseShowers = (values: Partial<Record<string, string>>) => {
    const showerValues = [false, false, false, false, false]
    for (let i = 0; i < 5; i++){
        showerValues[i] = values[String(i)] == '1' // null defaults false
    }
    return showerValues
}

export const getShowers = async () => {
    const result = await redis.hgetall('yp14:showers') as Partial<Record<string, string>>

    return parseShowers(result)
}

export const getHasAdmin = async () => {
    const result = await redis.get('yp14:hasAdmin')
    return boolFromRedis(result)
}

export const setHasAdmin = async (newState: boolean) => {
    await redis.set('yp14:hasAdmin', newState ? '1' : '0')
}

export const getLifeSupport = async () => {
    // Life support defaults to true
    const result = await redis.get('yp14:lifeSupport') ?? '0'
    return boolFromRedis(result)
}
export const setLifeSupport = async (newState: boolean) => {
    await redis.set('yp14:lifeSupport', newState ? '1' : '0')
}

const allKeys = allAirlockKeys.concat(['yp14:hasAdmin', 'yp14:lifeSupport'])

export const getStatus = async (): Promise<Status> => {
    console.log("GETTING STATUS")
    const [b1, b2, ms, hasAdmin, lifeSupport] = await redis.mget(allKeys)
    const status: Status = {
        airlocks: parseAirlocks(b1, b2, ms),
        hasAdmin: boolFromRedis(hasAdmin),
        lifeSupport: boolFromRedis(lifeSupport),
        showers: await getShowers() // It's a hash so it needs to be separate
    }
    // console.log(status)
    return status
}
