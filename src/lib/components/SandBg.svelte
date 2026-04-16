<script lang="ts">
	let canvas: HTMLCanvasElement;

	const CELL = 3; // px per grid cell

	// Sand colours — slightly varied shades of warm tan for natural texture
	// Stored as little-endian RGBA Uint32: 0xAABBGGRR
	function rgba(r: number, g: number, b: number): number {
		return (0xff << 24) | (b << 16) | (g << 8) | r;
	}

	const SAND = [
		rgba(212, 174, 112),
		rgba(198, 158,  96),
		rgba(225, 190, 130),
		rgba(185, 145,  85),
		rgba(205, 168, 105),
		rgba(232, 200, 140),
		rgba(178, 138,  78),
		rgba(220, 182, 120),
	];

	$effect(() => {
		const ctx = canvas.getContext('2d')!;
		let animId: number;

		let cols = 0, rows = 0;
		let grid: Uint8Array;        // 0 = empty, 1-8 = sand shade
		let imageData: ImageData;
		let pixels: Uint32Array;

		function resize() {
			canvas.width  = window.innerWidth;
			canvas.height = window.innerHeight;
			cols = Math.floor(canvas.width  / CELL);
			rows = Math.floor(canvas.height / CELL);
			grid      = new Uint8Array(cols * rows);
			imageData = ctx.createImageData(canvas.width, canvas.height);
			pixels    = new Uint32Array(imageData.data.buffer);
		}
		resize();
		window.addEventListener('resize', resize);

		function gi(x: number, y: number) { return y * cols + x; }

		function spawnSand(cx: number, cy: number, amount: number) {
			const gx = Math.floor(cx / CELL);
			const gy = Math.floor(cy / CELL);
			for (let i = 0; i < amount; i++) {
				const nx = gx + Math.round((Math.random() - 0.5) * 14);
				const ny = gy + Math.round((Math.random() - 0.5) * 6);
				if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && !grid[gi(nx, ny)]) {
					grid[gi(nx, ny)] = 1 + Math.floor(Math.random() * 8);
				}
			}
		}

		let windPhase = 0;

		function erode() {
			// Randomly remove cells from the bottom row so sand slowly sinks away
			const y = rows - 1;
			for (let x = 0; x < cols; x++) {
				if (grid[gi(x, y)] && Math.random() < 0.002) {
					grid[gi(x, y)] = 0;
				}
			}
		}

		function update() {
			erode();
			windPhase += 0.008;
			const wind = Math.sin(windPhase) * 0.35; // −0.35 … +0.35

			// Alternate scan direction each frame to avoid directional bias
			const dir   = (Math.random() < 0.5) ? 1 : -1;
			const start = dir > 0 ? 0 : cols - 1;
			const end   = dir > 0 ? cols : -1;

			for (let y = rows - 2; y >= 0; y--) {
				for (let x = start; x !== end; x += dir) {
					const cell = grid[gi(x, y)];
					if (!cell) continue;

					const below      = y + 1 < rows && !grid[gi(x,     y + 1)];
					const belowLeft  = y + 1 < rows && x > 0        && !grid[gi(x - 1, y + 1)];
					const belowRight = y + 1 < rows && x < cols - 1 && !grid[gi(x + 1, y + 1)];

					if (below) {
						grid[gi(x, y + 1)] = cell;
						grid[gi(x, y)]     = 0;
					} else if (belowLeft && belowRight) {
						const go = (Math.random() < 0.5 + wind) ? 1 : -1;
						grid[gi(x + go, y + 1)] = cell;
						grid[gi(x, y)]           = 0;
					} else if (belowLeft) {
						grid[gi(x - 1, y + 1)] = cell;
						grid[gi(x, y)]          = 0;
					} else if (belowRight) {
						grid[gi(x + 1, y + 1)] = cell;
						grid[gi(x, y)]          = 0;
					} else if (Math.abs(wind) > 0.15 && Math.random() < Math.abs(wind) * 0.04) {
						// Wind nudges settled surface particles
						const wx = x + (wind > 0 ? 1 : -1);
						if (wx >= 0 && wx < cols && !grid[gi(wx, y)]) {
							grid[gi(wx, y)] = cell;
							grid[gi(x,  y)] = 0;
						}
					}
				}
			}
		}

		function render() {
			pixels.fill(0);
			for (let y = 0; y < rows; y++) {
				for (let x = 0; x < cols; x++) {
					const cell = grid[gi(x, y)];
					if (!cell) continue;
					const color = SAND[cell - 1];
					const px = x * CELL, py = y * CELL;
					for (let dy = 0; dy < CELL; dy++) {
						const row = (py + dy) * canvas.width + px;
						for (let dx = 0; dx < CELL; dx++) pixels[row + dx] = color;
					}
				}
			}
			ctx.putImageData(imageData, 0, 0);
		}

		let held = false;
		let mouseX = 0, mouseY = 0;

		const onMouseDown = (e: MouseEvent) => {
			if ((e.target as HTMLElement).closest('a, button')) return;
			held = true;
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		const onMouseMove = (e: MouseEvent) => {
			mouseX = e.clientX;
			mouseY = e.clientY;
		};
		const onMouseUp = () => { held = false; };

		window.addEventListener('mousedown', onMouseDown);
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup',   onMouseUp);

		function draw() {
			if (held) spawnSand(mouseX, mouseY, 40);
			spawnSand(canvas.width / 2, CELL * 4, 6);
			update();
			render();
			animId = requestAnimationFrame(draw);
		}

		animId = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(animId);
			window.removeEventListener('resize',    resize);
			window.removeEventListener('mousedown', onMouseDown);
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('mouseup',   onMouseUp);
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
