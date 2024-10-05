import type { PageServerLoad } from './$types';


import { getHasAdmin } from '$lib/server/ypsilon-14/data';

export const load: PageServerLoad = () => {
    return {hasAdmin: getHasAdmin()}
}