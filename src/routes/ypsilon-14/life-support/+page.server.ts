import type { PageServerLoad, Actions } from './$types';

import { setLifeSupport, getHasAdmin, getLifeSupport } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = () => {
    return {lifeSupport: getLifeSupport()}
}

export const actions = {
    default: async ({request}) => {

        if (getHasAdmin()){
            const data = await request.formData()

            const newState = data.get('status') as string === 'true'

            setLifeSupport(newState)
            return {lifeSupport: getLifeSupport()} 
        } else {
            return {lifeSupport: getLifeSupport(), errorMsg: 'ERROR: UNAUTHORIZED'} 
        }
          
        
    }
} satisfies Actions

