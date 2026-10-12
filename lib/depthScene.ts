/** Small photo mesh. All inference happens offline; the browser loads two textures. */
type SceneOptions = {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  image: string;
  depth: string;
  onFailure: () => void;
};

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Scene texture unavailable"));
    image.src = src;
  });
}

function perspective(aspect: number) {
  const near = 0.1,
    far = 10,
    f = 3;
  return new Float32Array([
    f / aspect,
    0,
    0,
    0,
    0,
    f,
    0,
    0,
    0,
    0,
    (far + near) / (near - far),
    -1,
    0,
    0,
    (2 * far * near) / (near - far),
    0,
  ]);
}

function camera(x: number, y: number, distance: number) {
  const length = Math.hypot(x, y, distance);
  const zx = x / length,
    zy = y / length,
    zz = distance / length;
  const right = Math.hypot(zz, zx);
  const xx = zz / right,
    xz = -zx / right;
  const yx = zy * xz,
    yy = zz * xx - zx * xz,
    yz = -zy * xx;
  return new Float32Array([
    xx,
    yx,
    zx,
    0,
    0,
    yy,
    zy,
    0,
    xz,
    yz,
    zz,
    0,
    -(xx * x + xz * distance),
    -(yx * x + yy * y + yz * distance),
    -length,
    1,
  ]);
}

export async function createDepthScene({
  canvas,
  container,
  image,
  depth,
  onFailure,
}: SceneOptions) {
  // Textures are decoded before requesting a context; failed images leave the
  // accessible next/image photograph visible underneath.
  const textures = await Promise.all([loadImage(image), loadImage(depth)]);
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    powerPreference: "low-power",
    preserveDrawingBuffer: false,
  });
  if (!gl || gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) < 1)
    throw new Error("Photo depth unsupported");
  const vertex = `
    attribute vec2 a_uv;
    uniform sampler2D u_depth;
    uniform mat4 u_projection;
    uniform mat4 u_view;
    uniform float u_aspect;
    varying vec2 v_uv;
    void main() {
      v_uv = a_uv;
      float z = (texture2D(u_depth, a_uv).r - 0.5) * 0.16;
      // Compensate the neutral perspective so the resting frame preserves the
      // photograph's straight lines. Motion reveals the relative depth.
      vec2 xy = vec2((a_uv.x - 0.5) * 2.0 * u_aspect, (0.5 - a_uv.y) * 2.0);
      xy *= (3.0 - z) / 3.0;
      xy *= 1.035; // Small safe border; no invented off-frame content.
      gl_Position = u_projection * u_view * vec4(xy, z, 1.0);
    }`;
  const fragment = `
    precision mediump float;
    uniform sampler2D u_image;
    varying vec2 v_uv;
    void main() { gl_FragColor = texture2D(u_image, v_uv); }`;
  function compile(type: number, source: string) {
    const shader = gl!.createShader(type);
    if (!shader) throw new Error("Shader unavailable");
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      gl!.deleteShader(shader);
      throw new Error("Photo shader unsupported");
    }
    return shader;
  }
  const vs = compile(gl.VERTEX_SHADER, vertex),
    fs = compile(gl.FRAGMENT_SHADER, fragment);
  const program = gl.createProgram();
  if (!program) throw new Error("Photo program unavailable");
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    gl.deleteProgram(program);
    throw new Error("Photo shader unavailable");
  }
  gl.useProgram(program);
  const columns = 128,
    rows = 80,
    uv: number[] = [],
    indices: number[] = [];
  for (let y = 0; y <= rows; y++)
    for (let x = 0; x <= columns; x++) uv.push(x / columns, y / rows);
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < columns; x++) {
      const i = y * (columns + 1) + x;
      indices.push(
        i,
        i + 1,
        i + columns + 1,
        i + 1,
        i + columns + 2,
        i + columns + 1,
      );
    }
  const vertexBuffer = gl.createBuffer(),
    indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);
  const attribute = gl.getAttribLocation(program, "a_uv");
  gl.enableVertexAttribArray(attribute);
  gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );
  const gpuTextures = textures.map((textureImage, index) => {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      textureImage,
    );
    return texture;
  });
  gl.uniform1i(gl.getUniformLocation(program, "u_image"), 0);
  gl.uniform1i(gl.getUniformLocation(program, "u_depth"), 1);
  const projectionLocation = gl.getUniformLocation(program, "u_projection"),
    viewLocation = gl.getUniformLocation(program, "u_view"),
    aspectLocation = gl.getUniformLocation(program, "u_aspect");
  let frame = 0,
    destroyed = false,
    visible = true;
  let targetX = 0,
    targetY = 0,
    x = 0,
    y = 0,
    dolly = 0,
    targetDolly = 0;
  function request() {
    if (!destroyed && visible && !document.hidden && !frame)
      frame = requestAnimationFrame(draw);
  }
  function draw() {
    frame = 0;
    if (destroyed || !visible || document.hidden) return;
    x += (targetX - x) * 0.085;
    y += (targetY - y) * 0.085;
    dolly += (targetDolly - dolly) * 0.085;
    const aspect = container.clientWidth / container.clientHeight;
    gl!.uniform1f(aspectLocation, aspect);
    gl!.uniformMatrix4fv(projectionLocation, false, perspective(aspect));
    gl!.uniformMatrix4fv(viewLocation, false, camera(x, y, 3 - dolly));
    gl!.drawElements(gl!.TRIANGLES, indices.length, gl!.UNSIGNED_SHORT, 0);
    if (
      Math.abs(targetX - x) +
        Math.abs(targetY - y) +
        Math.abs(targetDolly - dolly) >
      0.0001
    )
      request();
  }
  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(container.clientWidth * ratio);
    canvas.height = Math.round(container.clientHeight * ratio);
    gl!.viewport(0, 0, canvas.width, canvas.height);
    request();
  }
  function pointer(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const rect = container.getBoundingClientRect();
    targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.1;
    targetY = (0.5 - (event.clientY - rect.top) / rect.height) * 0.05;
    request();
  }
  function leave() {
    targetX = 0;
    targetY = 0;
    request();
  }
  function scroll() {
    if (!visible) return;
    const rect = container.getBoundingClientRect();
    targetDolly =
      Math.max(
        0,
        Math.min(1, (innerHeight - rect.top) / (innerHeight + rect.height)),
      ) * 0.035;
    request();
  }
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else request();
  }
  function lost(event: Event) {
    event.preventDefault();
    destroy();
    onFailure();
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) {
      scroll();
      request();
    } else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  const resizeObserver = new ResizeObserver(resize);
  observer.observe(container);
  resizeObserver.observe(container);
  container.addEventListener("pointermove", pointer, { passive: true });
  container.addEventListener("pointerleave", leave);
  window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  canvas.addEventListener("webglcontextlost", lost);
  resize();
  scroll();
  cancelAnimationFrame(frame);
  frame = 0;
  draw();
  function destroy() {
    if (destroyed) return;
    destroyed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
    container.removeEventListener("pointermove", pointer);
    container.removeEventListener("pointerleave", leave);
    window.removeEventListener("scroll", scroll);
    document.removeEventListener("visibilitychange", visibility);
    canvas.removeEventListener("webglcontextlost", lost);
    gpuTextures.forEach((texture) => gl!.deleteTexture(texture));
    gl!.deleteBuffer(vertexBuffer);
    gl!.deleteBuffer(indexBuffer);
    gl!.deleteShader(vs);
    gl!.deleteShader(fs);
    gl!.deleteProgram(program);
  }
  return destroy;
}
