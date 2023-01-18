export const classNames = (...classes: (string | any)[]) => {
  return classes
    .filter((c) => c)
    .map((c) => {
      if (typeof c === "string") {
        return c;
      }
      return Object.entries(c)
        .filter(([_, v]) => v)
        .map(([k]) => k)
        .join(" ");
    })
    .join(" ");
};
