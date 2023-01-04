<script lang="ts">
  import MdVerifiedUser from 'svelte-icons/md/MdVerifiedUser.svelte'
</script>

<div class="card w-72 bg-base-100 grid-cols-5 md:grid-cols-1 border-t-[1px] border-gray-100 shadow-md mb-4">
    <figure><img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Shoes" class="object-contain w-full h-48" /></figure>
    <div class="card-body">
      <h2 class="card-title">
        Alice, 21
        <span class="w-6 text-primary tooltip tooltip-primary font-normal" data-tip="Compte vérifié"><MdVerifiedUser /></span>
      </h2>
      <p class="">Bonjour, je m'appelle Manon, j'ai 21 ans...</p>
      <div class="card-actions justify-end">
        <div class="badge badge-outline badge-primary cursor-pointer">Contacter</div> 
        <div class="badge badge-outline badge-secondary cursor-pointer">Voir profil</div>
      </div>
    </div>
  </div>

<style>
</style>
