import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({params}) => {
    const count = Number(params.count)

    if (Number.isInteger(count)){
        return {
            count
        }
    } else {
        error(404, 'Not Found')
    }
}