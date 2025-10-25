<footer>
	<nav>
		<a href="/">Home</a>
		<a href="/about">Über</a>
		<button onclick={() => window.scrollTo(0, 0)}>Nach oben scrollen</button>
	</nav>
</footer>

<style>
	footer {
		margin-top: 1rem;
		background-color: var(--secondary-bg-color);
		padding: 1rem;
	}

	nav {
		display: flex;
		justify-content: center;
		gap: 1rem;
		color: var(--secondary-font-color);
	}

	button {
		text-decoration: underline;
	}
</style>
