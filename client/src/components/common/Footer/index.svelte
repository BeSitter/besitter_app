<script lang="ts">
</script>

<div class="mt-20 flex flex-col border-t-[1px] border-gray-200">
	<footer class="footer p-10 bg-base-100 text-neutral">
		<div>
			<span class="footer-title">BeSitter</span>
			<a class="link link-hover">Comment ça marche</a>
			<a class="link link-hover">Aide</a>
			<a class="link link-hover">Tarifs</a>
			<a class="link link-hover">À propos de nous</a>
			<a class="link link-hover">Contact</a>
		</div>
		<div>
			<span class="footer-title">Découvrir</span>
			<a class="link link-hover">Conseils et articles</a>
			<a class="link link-hover">Confiance & sécurité</a>
			<a class="link link-hover">Les normes communautaires</a>
			<a class="link link-hover">Partenaires</a>
		</div>
		<div>
			<span class="footer-title">Légal</span>
			<a class="link link-hover">Confidentialité</a>
			<a class="link link-hover">Conditions</a>
		</div>
		<div>
			<span class="footer-title">Newsletter</span>
			<div class="form-control w-80">
				<label class="label">
					<span class="label-text">Enter your email address</span>
				</label>
				<div class="relative">
					<input
						type="text"
						placeholder="username@site.com"
						class="input input-bordered w-full pr-16"
					/>
					<button class="btn btn-primary absolute top-0 right-0 rounded-l-none">S'inscrire</button>
				</div>
			</div>
		</div>
	</footer>
	<div class="ocean">
		<div class="wave" />
		<div class="wave" />
		<div class="wave" />
	</div>
</div>

<style>
	.ocean {
		height: 80px; /* change the height of the waves here */
		width: 100%;
		position: relative;
		bottom: 0;
		left: 0;
		right: 0;
		overflow-x: hidden;
	}

	.wave {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 88.7'%3E%3Cpath d='M800 56.9c-155.5 0-204.9-50-405.5-49.9-200 0-250 49.9-394.5 49.9v31.8h800v-.2-31.6z' fill='%233eb9c0'/%3E%3C/svg%3E");
		position: absolute;
		width: 200%;
		height: 100%;
		animation: wave 10s -3s linear infinite;
		transform: translate3d(0, 0, 0);
		opacity: 0.8;
	}

	.wave:nth-of-type(2) {
		bottom: 0;
		animation: wave 18s linear reverse infinite;
		opacity: 0.5;
	}

	.wave:nth-of-type(3) {
		bottom: 0;
		animation: wave 20s -1s linear infinite;
		opacity: 0.5;
	}

	@keyframes wave {
		0% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(-25%);
		}
		100% {
			transform: translateX(-50%);
		}
	}
</style>
