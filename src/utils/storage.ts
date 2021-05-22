interface LocalStorageFieldType {
  isPowerOpen: boolean;
  temperature: number;
}

export const setLocalStorage = <
  T extends keyof LocalStorageFieldType,
  U extends LocalStorageFieldType[T]
>(
  field: T,
  value: U
) => {
  localStorage.setItem(field, JSON.stringify({ value }));
};

export const getLocalStorage = (field: keyof LocalStorageFieldType) => {
  const jsonValue = localStorage.getItem(field);
  if (!jsonValue) return undefined;

  return JSON.parse(jsonValue).value;
};
