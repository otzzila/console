import type { PageServerLoad, Actions } from './$types';

import {getStatus, setHasAdmin, setLifeSupport, setAirlock, setShower, getAirlocks, forceSetAirlock} from '$lib/server/ypsilon-14/data'
import { AirlockName, AirlockState } from '../ypsilon-14/data';

export const load: PageServerLoad = async () => {
    return {
        status: await getStatus() 
    }
}

export const actions = {
    shower: async ({request}) => {
        const data = await request.formData()

        const target = Number(data.get('target') as string)
        const newState = data.get('status') as string === 'true'

        // Update airlock if it is not open
        if (target < 5){
            if (target == 4) {
                // The last shower is broken
                return {status: await getStatus(), errorMsg: 'UNABLE TO START SHOWER 5. MANUAL OVERRIDE REQUIRED.'}
            }
            await setShower(target, newState)
        }
            
    },

    hasAdmin: async ({request}) => {
        const data = await request.formData()
        
        const newState = data.get('status') as string === 'true'
        console.log('SETTING ADMIN ', newState)
        await setHasAdmin(newState)
    },

    lifeSupport: async ({request}) => {
        const data = await request.formData()
        
        const newState = data.get('status') as string === 'true'

        await setLifeSupport(newState)
    },

    airlock: async ({request}) => {
        const data = await request.formData()

        const target = data.get('target') as string
        const newState = data.get('status') as string

        // Update airlock if it is not open
        if (target in AirlockName && newState in AirlockState){

            await forceSetAirlock(target as AirlockName, newState as AirlockState)
        } else {
            return {errorMsg: "INVALID DATA"}
        } 
    }
} satisfies Actions
