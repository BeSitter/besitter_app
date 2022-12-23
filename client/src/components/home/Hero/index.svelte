<script lang="ts">
	import IoMdSearch from 'svelte-icons/io/IoMdSearch.svelte';
</script>

<div class="hero min-h-[700px]" style="background-image: url(/bg_hero.jpg);">
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-center">
		<div>
			<h1 class="mb-5 text-md lg:text-3xl font-bold text-white">
				La plateforme qui facilite la recherche d'une garde qualifiée et responsable pour vos
				<span class="text-primary">enfants</span>
			</h1>
			<button class="mt-4 lg:mt-10 btn btn-primary rounded-full">
				<span class="text-xs">Inscription gratuite</span>
			</button>
		</div>
	</div>
	<div
		class="bg-white h-24 w-full lg:w-3/6 self-end lg:rounded-t-full flex flex-row items-center justify-center py-4 px-2 lg:py-10 lg:px-20"
	>
		<div class="w-full">
			<label for="" class="font-bold text-xs ml-5">Trouver votre prochain Sitter</label>
			<input
				type="text"
				placeholder="Ville ou Code postal..."
				class="input rounded-full w-full focus:outline-none text-sm lg:text-md"
			/>
		</div>
		<button class="btn btn-primary rounded-[100%] w-14 h-14">
			<div class="w-5">
				<IoMdSearch />
			</div>
		</button>
	</div>
</div>

<style>
</style>
