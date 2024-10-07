import type { PageServerLoad, Actions } from './$types';

import { setLifeSupport, getHasAdmin, getLifeSupport } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = async () => {
    return {lifeSupport: await getLifeSupport()}
}

export const actions = {
    default: async ({request}) => {

        if (await getHasAdmin()){
            const data = await request.formData()

            const newState = data.get('status') as string === 'true'

            setLifeSupport(newState)
            return {} 
        } else {
            return {errorMsg: 'ERROR: UNAUTHORIZED'} 
        }
          
        
    }
} satisfies Actions

