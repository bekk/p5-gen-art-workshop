const sketchKey = "sketch";

export const sketchCache = {
  get: () => sessionStorage.getItem(sketchKey),
  set: (sketchName: string) => sessionStorage.setItem(sketchKey, sketchName),
};
