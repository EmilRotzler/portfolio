<script lang="ts">
	let canvas: HTMLCanvasElement;

	interface Wave {
		baseY: number;
		amp1: number;
		freq1: number;
		spd1: number;
		amp2: number;
		freq2: number;
		spd2: number;
		r: number;
		g: number;
		b: number;
		a: number;
		varAmp: number;
		varFreq1: number;
		varVPhase1: number;
		varFreq2: number;
		varVPhase2: number;
		fvarAmp: number;
		fvarFreq1: number;
		fvarVPhase1: number;
		fvarFreq2: number;
		fvarVPhase2: number;
		p1: number;
		p2: number;
	}

	interface Ball {
		x: number;
		y: number;
		vx: number;
		vy: number;
		dropping: boolean;
		waveIdx: number;
		radius: number;
		color: string;
	}

	const waves: Wave[] = [
		{
			baseY: 0.77,
			amp1: 0.03,
			freq1: 0.0065,
			spd1: 0.22,
			amp2: 0.018,
			freq2: 0.013,
			spd2: 0.7,
			r: 130,
			g: 210,
			b: 240,
			a: 0.28,
			varAmp: 0.28,
			varFreq1: 0.07,
			varVPhase1: 0.0,
			varFreq2: 0.05,
			varVPhase2: 1.1,
			fvarAmp: 0.2,
			fvarFreq1: 0.04,
			fvarVPhase1: 0.5,
			fvarFreq2: 0.03,
			fvarVPhase2: 2.1,
			p1: 0,
			p2: 0,
		},
		{
			baseY: 0.77,
			amp1: 0.045,
			freq1: 0.008,
			spd1: 0.38,
			amp2: 0.02,
			freq2: 0.015,
			spd2: 0.8,
			r: 30,
			g: 170,
			b: 215,
			a: 0.38,
			varAmp: 0.32,
			varFreq1: 0.09,
			varVPhase1: 2.3,
			varFreq2: 0.06,
			varVPhase2: 0.4,
			fvarAmp: 0.22,
			fvarFreq1: 0.05,
			fvarVPhase1: 3.7,
			fvarFreq2: 0.04,
			fvarVPhase2: 1.2,
			p1: 0,
			p2: 0,
		},
		{
			baseY: 0.8,
			amp1: 0.042,
			freq1: 0.009,
			spd1: 0.55,
			amp2: 0.019,
			freq2: 0.017,
			spd2: 1.05,
			r: 0,
			g: 130,
			b: 185,
			a: 0.5,
			varAmp: 0.25,
			varFreq1: 0.06,
			varVPhase1: 4.7,
			varFreq2: 0.08,
			varVPhase2: 3.2,
			fvarAmp: 0.18,
			fvarFreq1: 0.06,
			fvarVPhase1: 1.9,
			fvarFreq2: 0.05,
			fvarVPhase2: 4.8,
			p1: 0,
			p2: 0,
		},
		{
			baseY: 0.82,
			amp1: 0.038,
			freq1: 0.01,
			spd1: 0.76,
			amp2: 0.017,
			freq2: 0.019,
			spd2: 1.3,
			r: 0,
			g: 95,
			b: 160,
			a: 0.62,
			varAmp: 0.35,
			varFreq1: 0.11,
			varVPhase1: 1.6,
			varFreq2: 0.07,
			varVPhase2: 5.1,
			fvarAmp: 0.25,
			fvarFreq1: 0.07,
			fvarVPhase1: 0.3,
			fvarFreq2: 0.06,
			fvarVPhase2: 2.6,
			p1: 0,
			p2: 0,
		},
		{
			baseY: 0.85,
			amp1: 0.034,
			freq1: 0.0115,
			spd1: 1.02,
			amp2: 0.015,
			freq2: 0.022,
			spd2: 1.65,
			r: 0,
			g: 60,
			b: 130,
			a: 0.74,
			varAmp: 0.3,
			varFreq1: 0.08,
			varVPhase1: 3.8,
			varFreq2: 0.1,
			varVPhase2: 0.9,
			fvarAmp: 0.2,
			fvarFreq1: 0.05,
			fvarVPhase1: 5.2,
			fvarFreq2: 0.07,
			fvarVPhase2: 3.4,
			p1: 0,
			p2: 0,
		},
		{
			baseY: 0.89,
			amp1: 0.028,
			freq1: 0.013,
			spd1: 0.4,
			amp2: 0.012,
			freq2: 0.026,
			spd2: 2.1,
			r: 0,
			g: 30,
			b: 95,
			a: 0.88,
			varAmp: 0.38,
			varFreq1: 0.12,
			varVPhase1: 5.5,
			varFreq2: 0.09,
			varVPhase2: 2.7,
			fvarAmp: 0.28,
			fvarFreq1: 0.08,
			fvarVPhase1: 2.8,
			fvarFreq2: 0.06,
			fvarVPhase2: 0.7,
			p1: 0,
			p2: 0,
		},
	];

	const BALL_COLORS = ['#ff6b6b', '#ffd93d', '#ff9a3c', '#6bcb77', '#000000'];

	$effect(() => {
		const ctx = canvas.getContext('2d')!;
		let animId: number;
		let lastT = 0;
		const balls: Ball[] = [];

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resize();
		window.addEventListener('resize', resize);

		function waveY(w: Wave, x: number): number {
			const h = canvas.height;
			const f1 = w.freq1 * (1 + w.fvarAmp * Math.sin(w.fvarFreq1 * lastT + w.fvarVPhase1));
			const f2 = w.freq2 * (1 + w.fvarAmp * Math.sin(w.fvarFreq2 * lastT + w.fvarVPhase2));
			return (
				w.baseY * h + w.amp1 * h * Math.sin(f1 * x + w.p1) + w.amp2 * h * Math.sin(f2 * x + w.p2)
			);
		}

		const onClick = (e: MouseEvent) => {
			if ((e.target as HTMLElement).closest('a, button')) return;

			const bestIdx = 1 + Math.floor(Math.random() * 4);

			balls.push({
				x: e.clientX,
				y: e.clientY,
				vx: -(25 + Math.random() * 35),
				vy: 0,
				dropping: true,
				waveIdx: bestIdx,
				radius: 10 + Math.random() * 8,
				color: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)],
			});
		};
		window.addEventListener('click', onClick);

		function drawBall(b: Ball) {
			ctx.save();
			// ctx.shadowBlur = 12;
			// ctx.shadowColor = 'rgba(0,0,0,0.35)';

			// Body
			ctx.beginPath();
			ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
			const body = ctx.createRadialGradient(
				b.x - b.radius * 0.35,
				b.y - b.radius * 0.35,
				b.radius * 0.05,
				b.x,
				b.y,
				b.radius
			);
			//body.addColorStop(0, 'rgba(255,255,255,0.85)');
			body.addColorStop(0.4, b.color);
			//body.addColorStop(1, 'rgba(0,0,0,0.25)');
			ctx.fillStyle = body;
			ctx.fill();

			// Specular highlight
			ctx.shadowBlur = 0;
			ctx.beginPath();
			ctx.arc(b.x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.22, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255,255,255,0.55)';
			ctx.fill();

			ctx.restore();
		}

		function drawWave(w: Wave, t: number) {
			const { width, height } = canvas;
			const baseY = w.baseY * height;
			const amp = (w.amp1 + w.amp2) * height;
			const f1 = w.freq1 * (1 + w.fvarAmp * Math.sin(w.fvarFreq1 * t + w.fvarVPhase1));
			const f2 = w.freq2 * (1 + w.fvarAmp * Math.sin(w.fvarFreq2 * t + w.fvarVPhase2));

			ctx.beginPath();
			for (let x = 0; x <= width; x += 3) {
				const y =
					baseY +
					w.amp1 * height * Math.sin(f1 * x + w.p1) +
					w.amp2 * height * Math.sin(f2 * x + w.p2);
				x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
			}
			ctx.lineTo(width, height);
			ctx.lineTo(0, height);
			ctx.closePath();

			const grad = ctx.createLinearGradient(0, baseY - amp, 0, height);
			grad.addColorStop(0, `rgba(${w.r},${w.g},${w.b},${(w.a * 0.5).toFixed(3)})`);
			grad.addColorStop(0.3, `rgba(${w.r},${w.g},${w.b},${w.a.toFixed(3)})`);
			grad.addColorStop(
				1,
				`rgba(${Math.max(0, w.r - 20)},${Math.max(0, w.g - 30)},${Math.max(0, w.b - 20)},${Math.min(1, w.a + 0.08).toFixed(3)})`
			);
			ctx.fillStyle = grad;
			ctx.fill();

			if (w.baseY > 0.7) {
				ctx.strokeStyle = `rgba(220,240,255,${(w.a * 0.35).toFixed(3)})`;
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				for (let x = 0; x <= width; x += 3) {
					const y =
						baseY +
						w.amp1 * height * Math.sin(f1 * x + w.p1) +
						w.amp2 * height * Math.sin(f2 * x + w.p2);
					x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
				}
				ctx.stroke();
			}
		}

		function draw(t: number) {
			const dt = t - lastT;
			lastT = t;

			for (const w of waves) {
				const s1 = w.spd1 * (1 + w.varAmp * Math.sin(w.varFreq1 * t + w.varVPhase1));
				const s2 = w.spd2 * (1 + w.varAmp * Math.sin(w.varFreq2 * t + w.varVPhase2));
				w.p1 += s1 * dt;
				w.p2 += s2 * dt;
			}

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Draw waves, interleaving balls so they appear behind the wave in front of them
			for (let i = 0; i < waves.length; i++) {
				drawWave(waves[i], t);
				// Draw balls riding this wave layer, covered by the next wave in front
				for (let j = balls.length - 1; j >= 0; j--) {
					const b = balls[j];
					if (b.waveIdx !== i) continue;

					const surface = waveY(waves[i], b.x) - b.radius * 0.6;

					if (b.dropping) {
						b.vy += 900 * dt; // gravity
						b.y += b.vy * dt;
						if (b.y >= surface) {
							b.y = surface;
							b.vy = 0;
							b.dropping = false;
						}
					} else {
						b.x += b.vx * dt;
						b.y = waveY(waves[i], b.x) - b.radius * 0.6;
					}

					if (b.x < -60 || b.x > canvas.width + 60) {
						balls.splice(j, 1);
					} else {
						drawBall(b);
					}
				}
			}

			animId = requestAnimationFrame((ts) => draw(ts / 1000));
		}

		animId = requestAnimationFrame((ts) => draw(ts / 1000));

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
			window.removeEventListener('click', onClick);
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
