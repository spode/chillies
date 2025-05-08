import { youtube } from '@googleapis/youtube';
import type { youtube_v3 } from '@googleapis/youtube';

import { MY_API_KEY } from '$env/static/private';

const youtubeThing = youtube({
    version: 'v3',
    auth: MY_API_KEY
});

export async function getLiveSearchResults(channelId: string) {

    try {

        const params: youtube_v3.Params$Resource$Search$List = {
            channelId,
            type: ["video"],
            eventType: "live",
            maxResults: 50,
            part: ["snippet"],
        }

        const res = await youtubeThing.search.list(params);

        return await res.data;
    } catch (error) {
        console.error('Error getting searchResults:', error);
    }
}

export async function getPlaylistItems(playlistId: string) {

    let nextPageToken: string | null | undefined = "";
    const allItems = [];

    do {
        const params: youtube_v3.Params$Resource$Playlistitems$List = {
            playlistId: playlistId, // no need for array brackets
            part: ["snippet"],
            maxResults: 50,
            pageToken: nextPageToken
        };

        const res = await youtubeThing.playlistItems.list(params);

        if (res.data.items) {
            allItems.push(...res.data.items);
        }

        nextPageToken = res.data.nextPageToken;
        console.log("Next page token:", nextPageToken);

    } while (nextPageToken);

    return allItems
}