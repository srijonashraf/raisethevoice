export function createMarkup(content: string) {
  return { __html: content };
}

export const getUiAvatar = (name: string) => {
  return `https://ui-avatars.com/api/?name=${name}&length=2&background=${stringToColor(
    name
  )}&color=fff`;
};

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str?.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = hash & 0x0000ff;
  const color = (r << 16) | (g << 8) | b;
  return color.toString(16).padStart(6, '0');
};
