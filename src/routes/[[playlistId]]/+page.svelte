<script lang="ts">
	import Player from './Player.svelte';
	import Streams from './Streams.svelte';
	import type { youtube_v3 } from '@googleapis/youtube';

	let { data } = $props();
	let player: YT.Player | undefined = $state();
	let activeStream: youtube_v3.Schema$SearchResult | null | undefined = $state.raw(null);

	function playSong(item: youtube_v3.Schema$SearchResult) {
		if (!player) return;
		activeStream = item;
		console.log(item);
		const videoId = item.id?.videoId;
		if (videoId) player.loadVideoById(videoId);
	}

	let streamsVisible = $state(true);
</script>

<div class="h-full flex lg:flex-row flex-col">
	{#if data.videos}
		{#if streamsVisible}
			<Streams {activeStream} {playSong} videos={data.videos} />
		{/if}
		<div class="flex flex-col xl:flex-row flex-1">
			<button
				class="dark:bg-primary dark:text-gray-100 bg-lime-400 text-black font-semibold py-4 px-2 cursor-pointer rounded-2xl m-1"
				onclick={() => (streamsVisible = !streamsVisible)}
				>{streamsVisible ? 'hide' : 'show'} playlists</button
			>
			<Player bind:player />
		</div>
	{:else}
		<p>api error perhaps</p>
	{/if}
</div>
