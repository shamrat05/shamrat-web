/// <reference types="vite/client" />
/// <reference types="vite-imagetools" />

declare module '*?format=webp' {
  const src: string;
  export default src;
}

declare module '*&as=webp' {
  const src: string;
  export default src;
}

declare module '*&as=avif' {
    const src: string;
    export default src;
}
