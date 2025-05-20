<script lang="ts">
	import Player from './Player.svelte';
	import Streams from './Streams.svelte';
	import type { youtube_v3 } from '@googleapis/youtube';

	let { data } = $props();
	let player: YT.Player | undefined = $state();
	let activeStream: youtube_v3.Schema$SearchResult | null | undefined = $state.raw(null);
	let playerVolume = $state(0);

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
		<Streams {activeStream} {playSong} videos={data.videos} />
	{/if}
	<div class="flex flex-col">
		<button
			class="dark:bg-primary bg-lime-400 font-semibold xl:w-24 xl:text-xl py-4 px-2 cursor-pointer rounded-2xl m-1 flex-1"
			onclick={() => (streamsVisible = !streamsVisible)}
			>{streamsVisible ? 'hide' : 'show'} playlists</button
		>
		<div>
			<label class="block text-sm font-medium text-gray-700 dark:text-gray-300" for="volume"
				>Volume</label
			>
			<input
				bind:value={playerVolume}
				oninput={() => player?.setVolume(playerVolume)}
				id="volume"
				type="number"
				class="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline focus:outline-sky-500 focus:invalid:border-pink-500 focus:invalid:outline-pink-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none sm:text-sm dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20"
				max="100"
				min="0"
			/>
		</div>
	</div>
	<div class="flex flex-col xl:flex-row flex-1">
		<Player bind:player bind:playerVolume />
	</div>
</div>
