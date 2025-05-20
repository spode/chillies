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

        console.log("LIVESEARCH status", res.status, res.statusText);


        return res.data;
    } catch (error) {
        console.error('Error getting searchResults:', error.errors[0].message);
    }
}