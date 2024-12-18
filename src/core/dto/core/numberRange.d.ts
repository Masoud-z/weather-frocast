type NumberRange<T extends number, U extends number> = Exclude<
  Enumerate<T>,
  Enumerate<U>
>;
