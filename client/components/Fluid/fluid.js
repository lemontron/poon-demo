import { getWebGLContext, hashCode } from './util';

export const createFluid = (canvas, config) => {
	const splatStack = [];
	let timer;

	const {gl, ext} = getWebGLContext(canvas);

	const Material = function(vertexShader, fragmentShaderSource) {
		this.vertexShader = vertexShader;
		this.fragmentShaderSource = fragmentShaderSource;
		this.programs = [];
		this.activeProgram = null;
		this.uniforms = [];
	};

	Material.prototype.setKeywords = function(keywords) {
		let hash = 0;
		for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i]);

		let program = this.programs[hash];
		if (program == null) {
			let fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
			program = createProgram(this.vertexShader, fragmentShader);
			this.programs[hash] = program;
		}

		if (program === this.activeProgram) return;

		this.uniforms = getUniforms(program);
		this.activeProgram = program;
	};

	Material.prototype.bind = function() {
		gl.useProgram(this.activeProgram);
	};

	const Program = function(vertexShader, fragmentShader) {
		this.uniforms = {};
		this.program = createProgram(vertexShader, fragmentShader);
		this.uniforms = getUniforms(this.program);
	};

	Program.prototype.bind = function() {
		gl.useProgram(this.program);
	};

	function createProgram(vertexShader, fragmentShader) {
		let program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(program);

		return program;
	}

	function getUniforms(program) {
		const uniforms = [];
		const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
		for (let i = 0; i < uniformCount; i++) {
			const uniformName = gl.getActiveUniform(program, i).name;
			uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
		}
		return uniforms;
	}

	function compileShader(type, source, keywords) {
		source = addDefines(source, keywords);

		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader);

		return shader;
	}

	function addDefines(source, keywords) {
		if (keywords == null) return source;
		let keywordsString = '';
		keywords.forEach(keyword => {
			keywordsString += '#define ' + keyword + '\n';
		});
		return keywordsString + source;
	}

	const baseVertexShader = compileShader(gl.VERTEX_SHADER, '\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n');
	const copyShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        gl_FragColor = texture2D(uTexture, vUv);\n    }\n');
	const clearShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n');
	const displayShaderSource = '\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform sampler2D uBloom;\n    uniform sampler2D uSunRays;\n    uniform sampler2D uDithering;\n    uniform vec2 ditherScale;\n    uniform vec2 texelSize;\n\n    vec3 linearToGamma (vec3 color) {\n        color = max(color, vec3(0));\n        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n    }\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n\n    #ifdef SHADING\n        vec3 lc = texture2D(uTexture, vL).rgb;\n        vec3 rc = texture2D(uTexture, vR).rgb;\n        vec3 tc = texture2D(uTexture, vT).rgb;\n        vec3 bc = texture2D(uTexture, vB).rgb;\n\n        float dx = length(rc) - length(lc);\n        float dy = length(tc) - length(bc);\n\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        c *= diffuse;\n    #endif\n\n    #ifdef BLOOM\n        vec3 bloom = texture2D(uBloom, vUv).rgb;\n    #endif\n\n    #ifdef SUN_RAYS\n        float sunrays = texture2D(uSunRays, vUv).r;\n        c *= sunrays;\n    #ifdef BLOOM\n        bloom *= sunrays;\n    #endif\n    #endif\n\n    #ifdef BLOOM\n        float noise = texture2D(uDithering, vUv * ditherScale).r;\n        noise = noise * 2.0 - 1.0;\n        bloom += noise / 255.0;\n        bloom = linearToGamma(bloom);\n        c += bloom;\n    #endif\n\n        float a = max(c.r, max(c.g, c.b));\n        gl_FragColor = vec4(c, a);\n    }\n';
	const splatShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n');
	const advectionShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n\n    void main () {\n    #ifdef MANUAL_FILTERING\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        vec4 result = bilerp(uSource, coord, dyeTexelSize);\n    #else\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        vec4 result = texture2D(uSource, coord);\n    #endif\n        float decay = 1.0 + dissipation * dt;\n        gl_FragColor = result / decay;\n    }', null);
	const divergenceShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n');
	const curlShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n');
	const vorticityShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n\n        vec2 vel = texture2D(uVelocity, vUv).xy;\n        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n    }\n');
	const pressureShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n');
	const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, '\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n');

	const blit = (function() {
		gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
		gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(0);

		return function(destination) {
			gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
			gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
		};
	})();

	let dye;
	let velocity;
	let divergence;
	let curl;
	let pressure;

	const copyProgram = new Program(baseVertexShader, copyShader);
	const clearProgram = new Program(baseVertexShader, clearShader);
	const splatProgram = new Program(baseVertexShader, splatShader);
	const advectionProgram = new Program(baseVertexShader, advectionShader);
	const divergenceProgram = new Program(baseVertexShader, divergenceShader);
	const curlProgram = new Program(baseVertexShader, curlShader);
	const vorticityProgram = new Program(baseVertexShader, vorticityShader);
	const pressureProgram = new Program(baseVertexShader, pressureShader);
	const gradientSubtractProgram = new Program(baseVertexShader, gradientSubtractShader);

	const displayMaterial = new Material(baseVertexShader, displayShaderSource);

	function initFrameBuffers() {
		const simRes = getResolution(config.SIM_RESOLUTION);
		const dyeRes = getResolution(config.DYE_RESOLUTION);

		let texType = ext.halfFloatTexType;
		let rgba = ext.formatRGBA;
		let rg = ext.formatRG;
		let r = ext.formatR;

		if (dye == null) {
			dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, gl.NEAREST);
		} else {
			dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, gl.NEAREST);
		}

		if (velocity == null) {
			velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, gl.NEAREST);
		} else {
			velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, gl.NEAREST);
		}

		divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
		curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
		pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
	}

	function createFBO(w, h, internalFormat, format, type, param) {
		gl.activeTexture(gl.TEXTURE0);
		const texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

		const fbo = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
		gl.viewport(0, 0, w, h);
		gl.clear(gl.COLOR_BUFFER_BIT);

		let texelSizeX = 1.0 / w;
		let texelSizeY = 1.0 / h;

		return {
			texture: texture,
			fbo: fbo,
			width: w,
			height: h,
			texelSizeX: texelSizeX,
			texelSizeY: texelSizeY,
			attach: function attach(id) {
				gl.activeTexture(gl.TEXTURE0 + id);
				gl.bindTexture(gl.TEXTURE_2D, texture);
				return id;
			},
		};
	}

	function createDoubleFBO(w, h, internalFormat, format, type, param) {
		let fbo1 = createFBO(w, h, internalFormat, format, type, param);
		let fbo2 = createFBO(w, h, internalFormat, format, type, param);

		return {
			width: w,
			height: h,
			texelSizeX: fbo1.texelSizeX,
			texelSizeY: fbo1.texelSizeY,
			get read() {
				return fbo1;
			},
			set read(value) {
				fbo1 = value;
			},
			get write() {
				return fbo2;
			},
			set write(value) {
				fbo2 = value;
			},
			swap: function swap() {
				let temp = fbo1;
				fbo1 = fbo2;
				fbo2 = temp;
			},
		};
	}

	function resizeFBO(target, w, h, internalFormat, format, type, param) {
		const newFBO = createFBO(w, h, internalFormat, format, type, param);
		copyProgram.bind();
		gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0));
		blit(newFBO.fbo);
		return newFBO;
	}

	function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
		if (target.width === w && target.height === h) return target;
		target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
		target.write = createFBO(w, h, internalFormat, format, type, param);
		target.width = w;
		target.height = h;
		target.texelSizeX = 1.0 / w;
		target.texelSizeY = 1.0 / h;
		return target;
	}

	displayMaterial.setKeywords([]);
	initFrameBuffers();

	let lastUpdateTime = Date.now();
	tick(0);

	function tick(ts) {
		if (!canvas.isConnected) return cancelAnimationFrame(timer); // Stop the animation when the element is unmounted

		const dt = (ts - lastUpdateTime) / 1000;
		//initFrameBuffers(); // call this if the canvas size changed
		applyInputs();
		step(dt);
		render();
		timer = requestAnimationFrame(tick);
		lastUpdateTime = ts;
	}

	function applyInputs() {
		if (splatStack.length > 0) multipleSplats(splatStack.pop());
	}

	function step(dt) {
		gl.disable(gl.BLEND);
		gl.viewport(0, 0, velocity.width, velocity.height);

		curlProgram.bind();
		gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
		gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
		blit(curl.fbo);

		vorticityProgram.bind();
		gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
		gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
		gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
		gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
		gl.uniform1f(vorticityProgram.uniforms.dt, dt);
		blit(velocity.write.fbo);
		velocity.swap();

		divergenceProgram.bind();
		gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
		gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
		blit(divergence.fbo);

		clearProgram.bind();
		gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
		gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
		blit(pressure.write.fbo);
		pressure.swap();

		pressureProgram.bind();
		gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
		gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
		for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
			gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
			blit(pressure.write.fbo);
			pressure.swap();
		}

		gradientSubtractProgram.bind();
		gl.uniform2f(gradientSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
		gl.uniform1i(gradientSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
		gl.uniform1i(gradientSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
		blit(velocity.write.fbo);
		velocity.swap();

		advectionProgram.bind();
		gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
		const velocityId = velocity.read.attach(0);
		gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
		gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
		gl.uniform1f(advectionProgram.uniforms.dt, dt);
		gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
		blit(velocity.write.fbo);
		velocity.swap();

		gl.viewport(0, 0, dye.width, dye.height);

		gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
		gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1));
		gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
		blit(dye.write.fbo);
		dye.swap();
	}

	function render(target) {
		// gl.disable(gl.BLEND);
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
		drawDisplay(target?.fbo);
	}

	function drawDisplay(fbo) {
		displayMaterial.bind();
		gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0));
		blit(fbo);
	}

	function multipleSplats(amount, x = 1) {
		for (let i = 0; i < amount; i++) {
			const y = Math.random();
			const dx = 1000 * (Math.random() - 0.5);
			// const dy = 1000 * (Math.random() - 0.5);
			splat(x, y, dx, 0, config.COLOR);
		}
	}

	function splat(x, y, dx, dy, color) {
		gl.viewport(0, 0, velocity.width, velocity.height);
		splatProgram.bind();
		gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
		gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
		gl.uniform2f(splatProgram.uniforms.point, x, y);
		gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0);
		gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0));
		blit(velocity.write.fbo);
		velocity.swap();

		gl.viewport(0, 0, dye.width, dye.height);
		gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0));
		gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
		blit(dye.write.fbo);
		dye.swap();
	}

	function correctRadius(radius) {
		let aspectRatio = canvas.width / canvas.height;
		if (aspectRatio > 1) radius *= aspectRatio;
		return radius;
	}

	function getResolution(resolution) {
		const aspectRatio = (gl.drawingBufferHeight / gl.drawingBufferWidth);
		return {width: Math.round(resolution), height: Math.round(resolution * aspectRatio)};
	}

	const move = (x) => {
		multipleSplats(10, x / window.innerWidth);
	};

	return {move, stop: () => cancelAnimationFrame(timer)};
};