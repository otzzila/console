import type { PageServerLoad, Actions } from './$types';

import { setShower, getShowers } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = async () => {
    return {showers: await getShowers()}
}

export const actions = {
    default: async ({request}) => {
        const data = await request.formData()

        const target = Number(data.get('target') as string)
        const newState = data.get('status') as string === 'true'

        // Update airlock if it is not open
        if (Number.isInteger(target) && target < 5){
            if (target == 4) {
                // The last shower is broken
                return {errorMsg: 'UNABLE TO START SHOWER 5. MANUAL OVERRIDE REQUIRED.'}
            }

            await setShower(target, newState)
        }
            
        return {} 
    }
} satisfies Actions

