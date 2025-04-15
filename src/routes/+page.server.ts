import type { PageServerLoad } from './$types';
import { CHANNELS } from '$env/static/private';
import { getSearchResults } from '$lib/server/ytapi';

const promises = CHANNELS.split(",").map(element => {

    return getSearchResults(element);

});

export const load = (async () => {
    return { promises: promises };
}) satisfies PageServerLoad;