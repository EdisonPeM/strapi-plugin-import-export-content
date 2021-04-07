async function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = ({ target: { result } }) => resolve(result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

export default readFileContent;
