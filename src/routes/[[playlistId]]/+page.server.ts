import type { PageServerLoad } from './$types';
import { CHANNELS } from '$env/static/private';
import { getLiveSearchResults } from '$lib/server/ytapi';

const videos = await Promise.all(
    CHANNELS.split(",").map(element => getLiveSearchResults(element).then(e => e?.items))
).then(e => e.flat());

videos.sort((a, b) => {
    const dateA = a?.snippet?.publishedAt ?? '';
    const dateB = b?.snippet?.publishedAt ?? '';

    return dateB.localeCompare(dateA);
});


export const load = (async () => {

    return { videos };
}) satisfies PageServerLoad;