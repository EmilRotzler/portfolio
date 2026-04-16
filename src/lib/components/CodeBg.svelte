<script lang="ts">
	let canvas: HTMLCanvasElement;

	const LINES = [
		"import { sveltekit } from '@sveltejs/kit/vite';",
		"import { defineConfig } from 'vite';",
		'',
		'export default defineConfig({',
		'  plugins: [sveltekit()],',
		'});',
		'',
		'interface User {',
		'  id: string;',
		'  name: string;',
		'  email: string;',
		'  createdAt: Date;',
		'}',
		'',
		'const fetchUser = async (id: string): Promise<User> => {',
		'  const res = await fetch(`/api/users/${id}`);',
		"  if (!res.ok) throw new Error('Not found');",
		'  return res.json();',
		'};',
		'',
		'function formatDate(date: Date): string {',
		"  return date.toLocaleDateString('en-US', {",
		"    year: 'numeric',",
		"    month: 'long',",
		"    day: 'numeric',",
		'  });',
		'}',
		'',
		'// Component state',
		'let users = $state<User[]>([]);',
		'let loading = $state(false);',
		'let error = $state<string | null>(null);',
		'',
		'$effect(() => {',
		'  loading = true;',
		"  fetchUser('current')",
		'    .then(u => { users = [u]; })',
		'    .catch(e => { error = e.message; })',
		'    .finally(() => { loading = false; });',
		'});',
		'',
		'export const config = {',
		"  api: 'https://api.example.com',",
		'  timeout: 5000,',
		'  retries: 3,',
		'  debug: false,',
		'};',
		'',
		"type Status = 'idle' | 'loading' | 'success' | 'error';",
		'',
		'class EventEmitter<T> {',
		'  private listeners: Set<(data: T) => void> = new Set();',
		'',
		'  on(fn: (data: T) => void) {',
		'    this.listeners.add(fn);',
		'    return () => this.listeners.delete(fn);',
		'  }',
		'',
		'  emit(data: T) {',
		'    this.listeners.forEach(fn => fn(data));',
		'  }',
		'}',
		'',
		'const router = {',
		'  push: (path: string) => history.pushState({}, "", path),',
		'  replace: (path: string) => history.replaceState({}, "", path),',
		'  back: () => history.back(),',
		'};',
		'',
		'async function validateSchema<T>(',
		'  data: unknown,',
		'  schema: Schema<T>',
		'): Promise<T> {',
		'  const result = schema.safeParse(data);',
		'  if (!result.success) {',
		'    throw new ValidationError(result.error);',
		'  }',
		'  return result.data;',
		'}',
		'',
		'// Route handler',
		'export const GET: RequestHandler = async ({ params }) => {',
		'  const data = await fetchUser(params.id);',
		'  return json(data);',
		'};',
		'',
		'const debounce = <T extends unknown[]>(',
		'  fn: (...args: T) => void,',
		'  delay: number',
		') => {',
		'  let timer: ReturnType<typeof setTimeout>;',
		'  return (...args: T) => {',
		'    clearTimeout(timer);',
		'    timer = setTimeout(() => fn(...args), delay);',
		'  };',
		'};',
	];

	const LINES_RIGHT = [
		'using Microsoft.AspNetCore.Mvc;',
		'using System.Threading.Tasks;',
		'',
		'namespace Api.Controllers;',
		'',
		'[ApiController]',
		'[Route("api/[controller]")]',
		'public class UsersController : ControllerBase',
		'{',
		'  private readonly IUserService _users;',
		'',
		'  public UsersController(IUserService users)',
		'  {',
		'    _users = users;',
		'  }',
		'',
		'  [HttpGet("{id}")]',
		'  public async Task<IActionResult> Get(string id)',
		'  {',
		'    var user = await _users.FindAsync(id);',
		'    if (user is null) return NotFound();',
		'    return Ok(user);',
		'  }',
		'',
		'  [HttpPost]',
		'  public async Task<IActionResult> Create(CreateUserDto dto)',
		'  {',
		'    var user = await _users.CreateAsync(dto);',
		'    return CreatedAtAction(nameof(Get), new { id = user.Id }, user);',
		'  }',
		'',
		'  [HttpDelete("{id}")]',
		'  public async Task<IActionResult> Delete(string id)',
		'  {',
		'    await _users.DeleteAsync(id);',
		'    return NoContent();',
		'  }',
		'}',
		'',
		'public interface IUserService',
		'{',
		'  Task<User?> FindAsync(string id);',
		'  Task<User> CreateAsync(CreateUserDto dto);',
		'  Task DeleteAsync(string id);',
		'}',
		'',
		'public record CreateUserDto(string Name, string Email);',
		'',
		'public class User',
		'{',
		'  public string Id { get; init; } = Guid.NewGuid().ToString();',
		'  public required string Name { get; set; }',
		'  public required string Email { get; set; }',
		'  public DateTime CreatedAt { get; init; } = DateTime.UtcNow;',
		'}',
		'',
		'// Middleware',
		'public class RequestLoggingMiddleware',
		'{',
		'  private readonly RequestDelegate _next;',
		'  private readonly ILogger _logger;',
		'',
		'  public async Task InvokeAsync(HttpContext ctx)',
		'  {',
		'    _logger.LogInformation("Req: {Method} {Path}",',
		'      ctx.Request.Method, ctx.Request.Path);',
		'    await _next(ctx);',
		'    _logger.LogInformation("Res: {Status}",',
		'      ctx.Response.StatusCode);',
		'  }',
		'}',
		'',
		'builder.Services.AddScoped<IUserService, UserService>();',
		'builder.Services.AddControllers();',
		'builder.Services.AddEndpointsApiExplorer();',
		'builder.Services.AddSwaggerGen();',
		'',
		'var app = builder.Build();',
		'app.UseMiddleware<RequestLoggingMiddleware>();',
		'app.MapControllers();',
		'app.Run();',
	];

	const KEYWORDS = new Set([
		'import',
		'export',
		'from',
		'default',
		'interface',
		'type',
		'class',
		'function',
		'const',
		'let',
		'var',
		'return',
		'if',
		'else',
		'for',
		'while',
		'async',
		'await',
		'new',
		'true',
		'false',
		'null',
		'undefined',
		'throw',
		'try',
		'catch',
		'finally',
		'extends',
		'implements',
		'private',
		'public',
		'readonly',
		'static',
		'abstract',
		'enum',
		'of',
		'in',
		'typeof',
		'keyof',
	]);

	type Token = { text: string; color: string };

	const C = {
		keyword: 'rgba(86,  156, 214, 0.8)',
		string: 'rgba(206, 145, 120, 0.8)',
		comment: 'rgba(106, 153,  85, 0.8)',
		number: 'rgba(181, 206, 168, 0.8)',
		type: 'rgba( 78, 201, 176, 0.8)',
		plain: 'rgba(212, 212, 212, 0.7)',
		gutter: 'rgba(133, 133, 133, 0.5)',
		bg: 'rgba( 24,  24,  24, 0.22)',
		gutterBg: 'rgba( 16,  16,  16, 0.14)',
	};

	function tokenize(line: string): Token[] {
		const tokens: Token[] = [];
		let i = 0;

		const trimmed = line.trimStart();
		if (trimmed.startsWith('//')) {
			const indent = line.length - trimmed.length;
			if (indent) tokens.push({ text: line.slice(0, indent), color: C.plain });
			tokens.push({ text: line.slice(indent), color: C.comment });
			return tokens;
		}

		while (i < line.length) {
			const ch = line[i];

			if (ch === '"' || ch === "'" || ch === '`') {
				let j = i + 1;
				while (j < line.length && line[j] !== ch) {
					if (line[j] === '\\') j++;
					j++;
				}
				tokens.push({ text: line.slice(i, j + 1), color: C.string });
				i = j + 1;
				continue;
			}

			if (/\d/.test(ch) && (i === 0 || !/\w/.test(line[i - 1]))) {
				let j = i;
				while (j < line.length && /[\d.]/.test(line[j])) j++;
				tokens.push({ text: line.slice(i, j), color: C.number });
				i = j;
				continue;
			}

			if (/[a-zA-Z_$]/.test(ch)) {
				let j = i;
				while (j < line.length && /[\w$]/.test(line[j])) j++;
				const word = line.slice(i, j);
				const color = KEYWORDS.has(word) ? C.keyword : /^[A-Z]/.test(word) ? C.type : C.plain;
				tokens.push({ text: word, color });
				i = j;
				continue;
			}

			tokens.push({ text: ch, color: C.plain });
			i++;
		}

		return tokens;
	}

	$effect(() => {
		const ctx = canvas.getContext('2d')!;
		let animId: number;

		const LINE_H = 28;
		const FONT_SZ = 17;
		const GUTTER_W = 60;
		const PAD = 24;
		const TOTAL_L = LINES.length * LINE_H;
		const TOTAL_R = LINES_RIGHT.length * LINE_H;

		// Two columns with different speeds and start offsets
		let offsets = [0, TOTAL_R * 0.4];
		const speeds = [0.25, 0.18];

		function resize() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		resize();
		window.addEventListener('resize', resize);

		function drawColumn(colX: number, colW: number, offset: number, lines: string[]) {
			const h = canvas.height;

			ctx.fillStyle = C.gutterBg;
			ctx.fillRect(colX, 0, GUTTER_W, h);

			ctx.font = `${FONT_SZ}px "Courier New", Consolas, monospace`;

			const startLine = Math.floor(offset / LINE_H);
			const pixelShift = offset % LINE_H;

			ctx.save();
			ctx.beginPath();
			ctx.rect(colX, 0, colW, h);
			ctx.clip();

			for (let row = -1; row < Math.ceil(h / LINE_H) + 1; row++) {
				const lineIdx = (((startLine + row) % lines.length) + lines.length) % lines.length;
				const y = row * LINE_H - pixelShift + LINE_H;

				ctx.fillStyle = C.gutter;
				ctx.textAlign = 'right';
				ctx.fillText(String(lineIdx + 1), colX + GUTTER_W - 10, y);

				ctx.textAlign = 'left';
				let x = colX + GUTTER_W + PAD;
				for (const tok of tokenize(lines[lineIdx])) {
					ctx.fillStyle = tok.color;
					ctx.fillText(tok.text, x, y);
					x += ctx.measureText(tok.text).width;
				}
			}

			ctx.restore();
		}

		function draw() {
			const w = canvas.width;
			const h = canvas.height;
			const colW = Math.floor(w / 2);

			ctx.clearRect(0, 0, w, h);
			ctx.fillStyle = C.bg;
			ctx.fillRect(0, 0, w, h);

			// Divider between columns
			ctx.fillStyle = 'rgba(255,255,255,0.04)';
			ctx.fillRect(colW, 0, 1, h);

			drawColumn(0, colW, offsets[0], LINES);
			drawColumn(colW, colW, offsets[1], LINES_RIGHT);

			offsets[0] = (offsets[0] + speeds[0]) % TOTAL_L;
			offsets[1] = (offsets[1] + speeds[1]) % TOTAL_R;

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
		filter: blur(5px);
	}
</style>
