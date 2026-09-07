// Preview images have generated 640px and 960px variants. New project images can
// provide their own srcSet and sizes; unrecognized paths use a normal image.
const widths = { sport: 1600, custom: 1000, detail: 1000, hero: 1800 };
export default function Photo({ src, sizes = '(max-width: 767px) 100vw, 50vw', ...props }) {
  const name = src.match(/^\/images\/(sport|custom|detail|hero)\.jpg$/)?.[1];
  if (!name) return <img src={src} sizes={sizes} {...props} />;
  return (
    <img
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-960.webp 960w, /images/${name}.webp ${widths[name]}w`}
      sizes={sizes}
      {...props}
    />
  );
}
