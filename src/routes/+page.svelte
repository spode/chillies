<script lang="ts">
	import { onMount } from 'svelte';
	import Player from './Player.svelte';
	import Streams from './Streams.svelte';
	import type { youtube_v3 } from '@googleapis/youtube';

	let { data } = $props();
	let firstItem: string | null | undefined = $state('');
	let player: YT.Player | undefined = $state();
	let activeStream: youtube_v3.Schema$SearchResult | null | undefined = $state.raw(null);

	// $inspect(data);

	onMount(async () => {
		const promises = await data.promises[0];
		if (promises && promises.items) firstItem = promises.items[0].id?.videoId;
	});

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
	{#if streamsVisible}
		<Streams {activeStream} {playSong} promises={data.promises} />
	{/if}
	<div class="flex flex-col xl:flex-row flex-1">
		<button
			class="bg-primary text-primary-fg py-4 px-2 cursor-pointer"
			onclick={() => (streamsVisible = !streamsVisible)}
			>{streamsVisible ? 'hide' : 'show'} playlists</button
		>
		<Player bind:player videoId={firstItem} />
	</div>
</div>
