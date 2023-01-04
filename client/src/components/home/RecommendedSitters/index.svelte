<script lang="ts">
	import SitterCardSlider from "../../common/Carousels/SitterCardSlider.svelte";
  let sitterCards = [
    {sitter_name: 'Alice', id: '1'},
    {sitter_name: 'Bob', id: '2'},
    {sitter_name: 'Mich', id: '3'},
    {sitter_name: 'Alice', id: '4'},
    {sitter_name: 'Alice', id: '5'},
    {sitter_name: 'Alice', id: '6'},
    {sitter_name: 'Alice', id: '7'},
    {sitter_name: 'Alice', id: '8'},
    {sitter_name: 'Alice', id: '9'},
    {sitter_name: 'Alice', id: '10'},

  ]
</script>
<div>
  <div class="flex justify-center mb-10">
    <h2 class="font-bold text-lg md:text-2xl">Trouvez des baby-sitters sélectionnés dans votre région</h2>
  </div>
  <div>
    <SitterCardSlider sliderItems={sitterCards} displayControls={true} sliderType="sitterCards"/>
  </div>
  <div class="flex justify-center mt-10">
    <button class="btn btn-primary">Voir tous les baby-sitters actifs
    </button>
  </div>
</div>
<style>

</style>
