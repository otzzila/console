import { AirlockName, AirlockState } from '../data';
import type { PageServerLoad, Actions } from './$types';

import { setAirlock, getAirlocks } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = async () => {
    return {airlocks: await getAirlocks()}
}

export const actions = {
    modifyAirlock: async ({request}) => {
        const data = await request.formData()

        const target = data.get('target') as string
        const newState = data.get('status') as string

        // Update airlock if it is not open
        if (target in AirlockName && newState in AirlockState){

            const couldSet = await setAirlock(target as AirlockName, newState as AirlockState)

            const airlocks = await getAirlocks()
            if (couldSet) {
                return {}
            } else {
                return {errorMsg: `${target} IS OPEN. ABORTING LOCK!`}
            }
            
        } else {
            return {errorMsg: `${target} IS OPEN. ABORTING LOCK!`}
        } 
    }
} satisfies Actions

