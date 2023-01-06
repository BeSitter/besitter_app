<script lang="ts">
	import IoMdHeartEmpty from 'svelte-icons/io/IoMdHeartEmpty.svelte';
	import IoIosMenu from 'svelte-icons/io/IoIosMenu.svelte';
	import Drawer from 'svelte-drawer-component';
	import IoIosClose from 'svelte-icons/io/IoIosClose.svelte';
	export let sticky = false;
	let isMenuOpened = false;
	let y: any;
	let windowInnerWidth: any;
</script>

<svelte:window bind:scrollY={y} bind:innerWidth={windowInnerWidth} />

<Drawer
	open={isMenuOpened}
	size={windowInnerWidth <= 800 ? '60%' : '20%'}
	placement="right"
	on:clickAway={() => (isMenuOpened = false)}
>
	<div class="p-4">
		<button
			class="rounded-full tooltip tooltip-bottom tooltip-primary"
			data-tip="Fermer"
			on:click={() => (isMenuOpened = false)}
		>
			<div class="w-10">
				<IoIosClose />
			</div>
		</button>
	</div>
	<div class="h-full flex flex-col items-center justify-center gap-2">
		<div>
			<a href="/auth/signup" class="font-bold hover:text-primary">S'inscrire</a>
		</div>
		<div>
			<a href="" class="font-bold hover:text-primary">Se connecter</a>
		</div>
	</div>
</Drawer>
<nav
	id="navbar"
	class="flex flex-col justify-center w-full top-0 z-50 px-4 lg:px-8 {y >= 50
		? 'shadow-lg bg-base-100'
		: `${sticky ? 'bg-primary' : ''}`}"
	class:sticky
	class:fixed={!sticky}
>
	<div class="flex flex-row justify-between items-center">
		<!-- logo -->
		<div class="tooltip tooltip-bottom tooltip-primary" data-tip="Accueil">
			<a href="/" class="font-bold"><img src="/logo.png" alt="" class="w-24" /></a>
		</div>
		<div class="hidden lg:flex flex-row items-center gap-14">
			<a
				href="/"
				class="flex flex-col items-center gap-2 font-semibold {y >= 50
					? 'text-neutral'
					: 'text-white'}"
			>
				<span>Pour vos enfants</span>
				<span class="w-24 h-[2px] {y >= 50 ? 'bg-neutral' : 'bg-white'}" />
			</a>
			<a
				href="/"
				class="flex flex-col items-center gap-2 font-semibold {y >= 50
					? 'text-neutral'
					: 'text-white'}"
			>
				<span>Pour vos parents</span>
			</a>
		</div>
		<div class="flex flex-row justify-center items-center gap-4">
			<button
				class="w-8 h-8 tooltip tooltip-bottom tooltip-primary {y >= 50
					? 'text-neutral'
					: 'text-white'}"
				data-tip="Mes favoris"
			>
				<IoMdHeartEmpty />
			</button>
			<div>
				<button
					class="btn btn-md rounded-full bg-base-100 hover:bg-gray-300 text-neutral {y >= 50
						? 'border-neutral'
						: 'border-none'}"
					on:click={() => (isMenuOpened = true)}
				>
					<div class="flex flex-row justify-between items-center gap-2">
						<div class="w-5 text-neutral">
							<IoIosMenu />
						</div>
						<div class="rounded-full bg-gray-300 p-2">M</div>
					</div>
				</button>
			</div>
		</div>
	</div>
</nav>

<style>
	#navbar {
		height: 90px;
	}
</style>
