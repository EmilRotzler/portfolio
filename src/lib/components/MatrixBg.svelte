<script lang="ts">
	let canvas: HTMLCanvasElement;

	const FONT_SIZE  = 16;
	const SPEED      = 0.1;
	const TRAIL_FULL = 40;
	const TRAIL_FADE = 6;
	const TRAIL_LEN  = TRAIL_FULL + TRAIL_FADE;

	// Gap between consecutive streams in the same column, in rows
	const GAP_MIN = 30;
	const GAP_MAX = 100;

	const CHARS =
		'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
		'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&()*+,-./:;<=>?@[\\]^_{|}~' +
		'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψω' +
		'АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюя';

	function randomChar() {
		return CHARS[Math.floor(Math.random() * CHARS.length)];
	}

	function randomGap() {
		return GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN);
	}

	$effect(() => {
		const ctx = canvas.getContext('2d')!;
		let animId: number;

		let cols = 0;
		let rows = 0;

		// Per-column list of active head positions
		let colHeads: number[][] = [];
		// Per-column: y at which to spawn the next stream
		let colNextSpawn: number[] = [];
		let chars: string[][] = [];

		function resize() {
			canvas.width  = window.innerWidth;
			canvas.height = window.innerHeight;
			cols = Math.floor(canvas.width  / FONT_SIZE);
			rows = Math.ceil (canvas.height / FONT_SIZE);

			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Seed each column with one stream at a random position already on screen
			colHeads      = Array.from({ length: cols }, () => [Math.random() * rows]);
			colNextSpawn  = Array.from({ length: cols }, () => -(randomGap()));
			chars         = Array.from({ length: cols }, () =>
				Array.from({ length: rows }, () => randomChar())
			);
		}
		resize();
		window.addEventListener('resize', resize);

		function draw() {
			const { width, height } = canvas;
			ctx.fillStyle = '#000';
			ctx.fillRect(0, 0, width, height);

			ctx.font      = `${FONT_SIZE}px monospace`;
			ctx.textAlign = 'center';

			// Mutate a few random characters each frame for flicker
			const mutations = Math.floor(cols * 0.06);
			for (let m = 0; m < mutations; m++) {
				const c = Math.floor(Math.random() * cols);
				const r = Math.floor(Math.random() * rows);
				chars[c][r] = randomChar();
			}

			for (let c = 0; c < cols; c++) {
				const x = c * FONT_SIZE + FONT_SIZE / 2;

				// Spawn a new stream when the last one has moved far enough ahead
				if (colNextSpawn[c] <= (colHeads[c].at(-1) ?? -Infinity)) {
					colHeads[c].push(colNextSpawn[c]);
					colNextSpawn[c] = colNextSpawn[c] - randomGap();
				}

				// Advance all heads and draw
				const alive: number[] = [];
				for (let h = 0; h < colHeads[c].length; h++) {
					colHeads[c][h] += SPEED;
					const head = Math.floor(colHeads[c][h]);

					// Discard once the full trail has scrolled off the bottom
					if (colHeads[c][h] - TRAIL_LEN > rows) continue;
					alive.push(colHeads[c][h]);

					for (let i = 0; i < TRAIL_LEN; i++) {
						const row = head - i;
						if (row < 0 || row >= rows) continue;

						let color: string;
						if (i === 0) {
							color = '#ffffff';
						} else if (i <= TRAIL_FULL) {
							color = '#00ee55';
						} else {
							const alpha = 1 - (i - TRAIL_FULL) / TRAIL_FADE;
							color = `rgba(0, 238, 85, ${alpha})`;
						}

						ctx.fillStyle = color;
						ctx.fillText(chars[c][row], x, (row + 1) * FONT_SIZE);
					}
				}
				colHeads[c] = alive;

				// Refill if a column ever empties
				if (colHeads[c].length === 0) {
					colHeads[c]     = [-randomGap()];
					colNextSpawn[c] = colHeads[c][0] - randomGap();
				}
			}

			animId = requestAnimationFrame(draw);
		}

		animId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize', resize);
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
		background: #000;
	}
</style>
