<script lang="ts">
	let { videos, playSong, activeStream } = $props();
</script>

<div class="flex-1 flex flex-col gap-2 row-span-2 overflow-auto">
	{#each videos as video}
		<button
			class="{activeStream == video
				? 'bg-lime-400 dark:bg-gray-700'
				: ''} cursor-pointer text-left flex-col flex"
			onclick={() => {
				playSong(video);
			}}
		>
			<div class="text-xl">{video?.snippet?.title}</div>

			<div>
				{video?.snippet?.publishedAt && new Date(video?.snippet?.publishedAt).toLocaleDateString()}
				{video?.snippet?.channelTitle}
			</div>
		</button>
	{/each}
</div>
