<script lang="ts">
	import { flip } from 'svelte/animate';
	import { onDestroy } from 'svelte';
	import SitterCard from '../Cards/SitterCard.svelte';
	export let sliderItems: any[] = [];
	// export let itemWidth = 300
	// export let itemSpacing = 20
	export let speed = 500;
	// export let controlColor = '#444'
	// export let controlScale = '0.5'
	export let autoplay = false;
	export let autoplaySpeed = 5000;
	export let displayControls = true;
	export let sliderType = '';
	let interval: any;

	const rotateLeft = () => {
		const transitioningImage = sliderItems[sliderItems.length - 1];
		// @ts-ignore
		document.getElementById(transitioningImage.id).style.opacity = '0';
		sliderItems = [
			sliderItems[sliderItems.length - 1],
			...sliderItems.slice(0, sliderItems.length - 1)
		];
		// @ts-ignore
		setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = '1'), speed);
	};
	const rotateRight = () => {
		const transitioningImage = sliderItems[0];
		// @ts-ignore
		document.getElementById(transitioningImage.id).style.opacity = '0';
		sliderItems = [...sliderItems.slice(1, sliderItems.length), sliderItems[0]];
		// @ts-ignore
		setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = '1'), speed);
	};
	const startAutoPlay = () => {
		if (autoplay) {
			interval = setInterval(rotateLeft, autoplaySpeed);
		}
	};
	const stopAutoPlay = () => {
		clearInterval(interval);
	};
	if (autoplay) {
		startAutoPlay();
	}
	onDestroy(() => {
		stopAutoPlay();
	});
</script>

<div id="slider-container">
	{#if sliderType === 'sitterCards'}
		<div id="slider-images">
			{#each sliderItems as item (item.id)}
				<div id={item.id} animate:flip={{ duration: speed }} class="mx-2">
					<SitterCard />
				</div>
			{/each}
		</div>
	{/if}
	{#if displayControls && sliderItems.length > 4}
		<button id="left" on:click={rotateLeft}>
			<slot name="left-control">
				<div class="tooltip" data-tip="Précédent">
					<div class="rotate-180">
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
							><path
								fill="#3eb9c0"
								d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z"
							/></svg
						>
					</div>
				</div>
			</slot>
		</button>
		<button id="right" on:click={rotateRight}>
			<slot name="right-control">
				<div class="tooltip" data-tip="Suivant">
					<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
						><path
							fill="#3eb9c0"
							d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.218 19l-1.782-1.75 5.25-5.25-5.25-5.25 1.782-1.75 6.968 7-6.968 7z"
						/></svg
					>
				</div>
			</slot>
		</button>
	{/if}
</div>

<style>
	#slider-container {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		overflow-x: hidden;
	}
	#slider-images {
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
		-webkit-mask: linear-gradient(90deg, #000 0%, #fff 100%);
		mask: linear-gradient(90deg, #000 0%, #fff 100%);
	}
	button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
	}
	button:focus {
		outline: none;
	}
	#left {
		left: 10px;
	}
	#right {
		right: 10px;
	}
</style>
