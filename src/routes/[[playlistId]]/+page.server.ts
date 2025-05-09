import type { PageServerLoad } from './$types';
import { CHANNELS } from '$env/static/private';
import { getLiveSearchResults, getPlaylistItems } from '$lib/server/ytapi';

const videos = await Promise.all(
    CHANNELS.split(",").map(element => getLiveSearchResults(element).then(e => e?.items))
).then(e => e.flat());

// videos.sort((a, b) => new Date(b?.snippet.publishedAt) - new Date(a?.snippet.publishedAt));

export const load = (async ({ params }) => {



    return { videos };
}) satisfies PageServerLoad;