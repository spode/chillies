<script lang="ts">
	import { onMount } from 'svelte';

	let { videoId, player = $bindable() } = $props();
	let iframe = $state();

	function onPlayerReady(event) {}

	onMount(() => {
		player = new YT.Player('denkPlayer', {
			height: '390',
			width: '640',
			videoId: videoId,
			events: {
				onReady: onPlayerReady
			}
		});
	});
</script>

<iframe
	bind:this={iframe}
	allowfullscreen
	id={'denkPlayer'}
	class="w-full h-full"
	src="https://www.youtube.com/embed/{videoId}?enablejsapi=1"
	title="ytIframe"
></iframe>

<svelte:window
	onmessage={(event) => {
		var data = JSON.parse(event.data);
		// console.log('BEANS', data.info);

		// if (event.source === iframe.contentWindow) {
		// 	if (data.event === 'infoDelivery' && data.info && data.info.volume) {
		// 		myVolume = data.info.volume;
		// 	}
		// }
	}}
/>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>
