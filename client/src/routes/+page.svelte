<script lang="ts">
  import Footer from "../components/common/Footer/index.svelte";
  import Navbar from "../components/common/Navbar/index.svelte";
  import Hero from "../components/home/Hero/index.svelte";
  import Partners from "../components/home/Partners/index.svelte";
  import RecommendedSitters from "../components/home/RecommendedSitters/index.svelte";
</script>

<div>
  <Navbar />
  <Hero />
  <Partners />
  <div class="section-divider px-4 lg:px-32">
    <RecommendedSitters />
  </div>
  <div class="section-divider">
    <Footer />
  </div> 
</div>

<style>
  /* your styles go here */
</style>
