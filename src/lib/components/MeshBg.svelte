<script lang="ts">
	let canvas: HTMLCanvasElement;

	const GRID = 28;
	const RADIUS = 2;
	const REPEL = 90;
	const FORCE = 6;
	const SPRING = 0.07;
	const DAMPING = 0.72;
	const COLOR = '#3b82f6';

	const N_PARTICLES = 7;
	const PARTICLE_REPEL = 70;
	const PARTICLE_FORCE = 5;
	const PULL_RADIUS = 260;
	const PULL_FORCE = 0.2;

	interface Dot {
		homeX: number;
		homeY: number;
		x: number;
		y: number;
		vx: number;
		vy: number;
	}

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		size: number;
	}

	function spawnParticle(width: number, height: number): Particle {
		const edge = Math.floor(Math.random() * 4);
		const speed = 1.2 + Math.random() * 1.6;
		const angle = Math.random() * Math.PI * 2;
		let vx = Math.cos(angle) * speed;
		let vy = Math.sin(angle) * speed;
		let x: number, y: number;

		switch (edge) {
			case 0:
				x = Math.random() * width;
				y = -8;
				vy = Math.abs(vy);
				break;
			case 1:
				x = width + 8;
				y = Math.random() * height;
				vx = -Math.abs(vx);
				break;
			case 2:
				x = Math.random() * width;
				y = height + 8;
				vy = -Math.abs(vy);
				break;
			default:
				x = -8;
				y = Math.random() * height;
				vx = Math.abs(vx);
				break;
		}
		return { x, y, vx, vy, size: 2.5 + Math.random() * 2.5 };
	}

	$effect(() => {
		const ctx = canvas.getContext('2d')!;
		let animId: number;
		let dots: Dot[] = [];
		let particles: Particle[] = [];
		let mouse = { x: -9999, y: -9999 };

		function build() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			dots = [];
			for (let hx = GRID; hx < canvas.width; hx += GRID)
				for (let hy = GRID; hy < canvas.height; hy += GRID)
					dots.push({ homeX: hx, homeY: hy, x: hx, y: hy, vx: 0, vy: 0 });
			particles = Array.from({ length: N_PARTICLES }, () =>
				spawnParticle(canvas.width, canvas.height)
			);
		}
		build();

		const onResize = () => build();
		const onMouseMove = (e: MouseEvent) => {
			const r = canvas.getBoundingClientRect();
			mouse.x = e.clientX - r.left;
			mouse.y = e.clientY - r.top;
		};
		const onMouseLeave = () => {
			mouse.x = -9999;
			mouse.y = -9999;
		};

		window.addEventListener('resize', onResize);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseleave', onMouseLeave);

		function draw() {
			const { width, height } = canvas;
			ctx.clearRect(0, 0, width, height);

			// Update and draw particles
			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				// Pull toward mouse
				const pdx = mouse.x - p.x;
				const pdy = mouse.y - p.y;
				const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
				if (pdist < PULL_RADIUS && pdist > 0) {
					const strength = ((PULL_RADIUS - pdist) / PULL_RADIUS) * PULL_FORCE;
					p.vx += (pdx / pdist) * strength;
					p.vy += (pdy / pdist) * strength;
				}

				p.x += p.vx;
				p.y += p.vy;

				// Respawn when fully off screen
				const margin = 20;
				if (p.x < -margin || p.x > width + margin || p.y < -margin || p.y > height + margin) {
					particles[i] = spawnParticle(width, height);
					continue;
				}

				// Draw particle with glow
				ctx.globalAlpha = 0.9;
				ctx.shadowBlur = 8;
				ctx.shadowColor = COLOR;
				ctx.fillStyle = COLOR;
				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fill();
				ctx.shadowBlur = 0;
			}

			// Update and draw mesh dots
			ctx.fillStyle = COLOR;
			ctx.shadowBlur = 0;

			for (const d of dots) {
				// Spring toward home
				d.vx += (d.homeX - d.x) * SPRING;
				d.vy += (d.homeY - d.y) * SPRING;

				// Repel from mouse
				applyRepel(d, mouse.x, mouse.y, REPEL, FORCE);

				// Repel from each particle
				for (const p of particles) {
					applyRepel(d, p.x, p.y, PARTICLE_REPEL, PARTICLE_FORCE);
				}

				d.vx *= DAMPING;
				d.vy *= DAMPING;
				d.x += d.vx;
				d.y += d.vy;

				ctx.globalAlpha = 0.18;
				ctx.beginPath();
				ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2);
				ctx.fill();
			}

			ctx.globalAlpha = 1;
			animId = requestAnimationFrame(draw);
		}

		function applyRepel(d: Dot, px: number, py: number, radius: number, force: number) {
			const dx = d.x - px;
			const dy = d.y - py;
			const dist = Math.sqrt(dx * dx + dy * dy);
			if (dist < radius && dist > 0) {
				const strength = ((radius - dist) / radius) ** 2 * force;
				d.vx += (dx / dist) * strength;
				d.vy += (dy / dist) * strength;
			}
		}

		animId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseleave', onMouseLeave);
		};
	});
</script>

<canvas bind:this={canvas} aria-hidden="true"></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 0;
	}
</style>
