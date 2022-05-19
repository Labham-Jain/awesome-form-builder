const copy = (text: string) => {
  return navigator.clipboard.writeText(text);
};

export default copy;
