import { setItemLocalStorage } from "../utils/lsnext";

interface StorageData {
  key: string;
  value: string;
}

export const downloadStorage = (): void => {
  const element = document.createElement("a");

  const result: StorageData[] = [];

  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    result.push({ key, value: localStorage.getItem(key) });
  }

  const file = new Blob([JSON.stringify(result)], {
    type: "text/json",
  });
  element.href = URL.createObjectURL(file);
  element.download = "awc-challenges.json";
  document.body.appendChild(element);
  element.click();
  URL.revokeObjectURL(element.href);
};

export const clearStorage = (): void => {
  localStorage.clear();
};

export const importStorage = async (file: Blob): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target.result;
      const storage: StorageData[] = JSON.parse(text.toString());

      storage.forEach(({ key, value }) => setItemLocalStorage(key, value));
      resolve();
    };
    reader.onerror = reject;

    reader.readAsText(file);
  });
};
