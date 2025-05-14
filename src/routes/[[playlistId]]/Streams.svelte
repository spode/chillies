<script lang="ts">
	let { videos, playSong, activeStream } = $props();
</script>

<div class="flex-1 flex flex-col gap-2 row-span-2 overflow-auto px-2">
	{#each videos as video}
		<button
			class="{activeStream == video
				? 'bg-lime-400 dark:bg-gray-700'
				: 'bg-zinc-100 dark:bg-gray-400'} cursor-pointer text-left flex-col flex rounded-2xl"
			onclick={() => {
				console.log(video);

				playSong(video);
			}}
		>
			<div class="stream rounded-xl overflow-hidden flex flex-row gap-4">
				<img class="size-[100px] object-cover" src={video.snippet?.thumbnails.medium.url} alt="" />
				<div class="flex flex-col justify-center">
					<div class="text-lg lg:text-xl">{video?.snippet?.title}</div>
					<small class="text-neutral-600 dark:text-neutral-300">
						{video?.snippet?.publishedAt &&
							new Date(video?.snippet?.publishedAt).toLocaleDateString()}
						{video?.snippet?.channelTitle}
					</small>
				</div>
			</div>
		</button>
	{/each}
</div>
