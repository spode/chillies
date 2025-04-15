<script lang="ts">
	let { promises, playSong, activeStream } = $props();
</script>

<div class="flex-1 flex flex-col gap-2 row-span-2 overflow-auto">
	{#each promises as promise}
		{#await promise then item}
			{#if item && item.items}
				{#each item.items as stream}
					<button
						class="{activeStream == stream
							? 'bg-primary/40'
							: ''}  cursor-pointer text-primary-fg text-left flex-col flex"
						onclick={() => playSong(stream)}
					>
						<div class="text-xl">{stream?.snippet?.title}</div>

						<div>
							{stream?.snippet?.publishedAt &&
								new Date(stream?.snippet?.publishedAt).toLocaleDateString()}
							{stream?.snippet?.channelTitle}
						</div>
					</button>
				{/each}
			{/if}
		{/await}
	{/each}
</div>
