<script lang="ts">
	import { decode } from 'html-entities';
	let { videos, playSong, activeStream } = $props();

	function scrollToButton(button: HTMLButtonElement) {
		button.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
	}
</script>

<div
	class="flex-1 content-start flex flex-col xl:grid xl:grid-cols-[repeat(auto-fit,_minmax(400px,_1fr))] gap-2 row-span-2 overflow-auto px-2"
>
	{#each videos as video, index}
		<button
			class="{activeStream == video
				? 'bg-lime-400 dark:bg-gray-700'
				: 'bg-zinc-100 dark:bg-gray-900'} video-{index} h-[100px] cursor-pointer text-left flex-col flex rounded-2xl"
			onclick={(e) => {
				const targetElement = e.target as Element | null;
				const button = targetElement?.closest('button');
				if (button) scrollToButton(button);

				playSong(video);
			}}
		>
			<div class="stream rounded-xl overflow-hidden flex flex-row gap-4">
				<img class="size-[100px] object-cover" src={video.snippet?.thumbnails.medium.url} alt="" />
				<div class="flex flex-col justify-center">
					<div class="text-lg lg:text-xl line-clamp-2">{decode(video?.snippet?.title)}</div>
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
