import type { PageServerLoad, Actions } from './$types';

import {showers, getHasAdmin, setHasAdmin, getLifeSupport, setLifeSupport, airlocks} from '$lib/server/ypsilon-14/data'
import type { Status } from '../ypsilon-14/data';

const getStatus = () => {
    return {
        airlocks,
        showers,
        hasAdmin: getHasAdmin(),
        lifeSupport: getLifeSupport(),
    }
}

export const load: PageServerLoad = () => {
    return {
        status: getStatus() 
    }
}

export const actions = {
    showers: async ({request}) => {
        const data = await request.formData()

        const target = Number(data.get('target') as string)
        const newState = data.get('status') as string === 'true'

        // Update airlock if it is not open
        if (target < showers.length){
            if (target == showers.length -1) {
                // The last shower is broken
                return {status: getStatus(), errorMsg: 'UNABLE TO START SHOWER 5. MANUAL OVERRIDE REQUIRED.'}
            }
            showers[target] = newState
            console.log({showers})
            
        }
            
        return {status: getStatus()} 
    }
}
