import { AirlockName, AirlockState } from '../data';
import type { PageServerLoad, Actions } from './$types';

import { airlocks } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = () => {
    return {airlocks}
}

export const actions = {
    modifyAirlock: async ({request}) => {
        const data = await request.formData()

        const target = data.get('target') as string
        const newState = data.get('status') as string

        // Update airlock if it is not open
        if (target in AirlockName && newState in AirlockState){
            const airlock = target as AirlockName
            if (airlocks[airlock] != AirlockState.OPEN){
                airlocks[airlock] = newState as AirlockState
            }
            
            console.log({airlocks})
            
            return {airlocks}
        } else {
            return {airlocks, errorMsg: `${target} IS OPEN. ABORTING LOCK!`}
        } 
    }
} satisfies Actions

