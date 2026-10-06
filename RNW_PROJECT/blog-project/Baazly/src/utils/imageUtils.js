export function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result || "");
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default {
  readFileAsDataURL
};
