<script lang="ts">
	import Player from './Player.svelte';
	import Streams from './Streams.svelte';
	import type { youtube_v3 } from '@googleapis/youtube';

	let { data } = $props();
	let player: YT.Player | undefined = $state();
	let activeStream: youtube_v3.Schema$SearchResult | null | undefined = $state.raw(null);

	$inspect(data);

	function playSong(item: youtube_v3.Schema$SearchResult) {
		// console.log('HLELO', item);

		if (!player) return;
		activeStream = item;
		console.log(item);
		const videoId = item.id?.videoId;
		if (videoId) player.loadVideoById(videoId);
	}

	let streamsVisible = $state(true);
</script>

<div class="h-full flex lg:flex-row flex-col">
	{#if streamsVisible}
		<Streams {activeStream} {playSong} videos={data.videos} />
	{/if}
	<div class="flex flex-col xl:flex-row flex-1">
		<button
			class="bg-primary text-primary-fg py-4 px-2 cursor-pointer rounded-2xl m-2"
			onclick={() => (streamsVisible = !streamsVisible)}
			>{streamsVisible ? 'hide' : 'show'} playlists</button
		>
		<Player bind:player />
	</div>
</div>
