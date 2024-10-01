import type { PageServerLoad, Actions } from './$types';

import { showers } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = () => {
    return {showers}
}

export const actions = {
    default: async ({request}) => {
        const data = await request.formData()

        const target = Number(data.get('target') as string)
        const newState = data.get('status') as string === 'true'

        // Update airlock if it is not open
        if (target < showers.length){
            if (target == showers.length -1) {
                // The last shower is broken
                return {showers, errorMsg: 'UNABLE TO START SHOWER 5. MANUAL OVERRIDE REQUIRED.'}
            }
            showers[target] = newState
            console.log({showers})
            
        }
            
        return {showers} 
    }
} satisfies Actions

