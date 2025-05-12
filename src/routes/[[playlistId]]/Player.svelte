<script lang="ts">
	import { delayed } from '$lib';
	import { onMount } from 'svelte';

	let { player = $bindable() } = $props();
	let iframe = $state();

	function onPlayerReady() {}

	onMount(async () => {
		await delayed(1000);
		player = new YT.Player('denkPlayer', {
			height: '390',
			width: '640',
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
	src="https://www.youtube.com/embed/{'4xDzrJKXOOY'}?enablejsapi=1"
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
