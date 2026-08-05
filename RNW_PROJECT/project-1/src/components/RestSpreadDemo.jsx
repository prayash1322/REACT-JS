function sumAll(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

function RestSpreadDemo() {
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5, 6];
  const mergedArray = [...arr1, ...arr2];

  const obj1 = { name: "Prayash", course: "BSc IT" };
  const obj2 = { city: "Surat", state: "Gujarat" };
  const mergedObject = { ...obj1, ...obj2 };

  const originalObject = { a: 1, b: 2 };
  const copiedObject = { ...originalObject };
  copiedObject.a = 100;

  const restSum = sumAll(1, 2, 3, 4, 5);

  return (
    <section className="section">
      <h2>Rest and Spread Operator Examples</h2>

      <h3>1. Merge Two Arrays</h3>
      <p>{JSON.stringify(mergedArray)}</p>

      <h3>2. Merge Two Objects</h3>
      <p>{JSON.stringify(mergedObject)}</p>

      <h3>3. Copy an Object with Spread</h3>
      <p>Original: {JSON.stringify(originalObject)}</p>
      <p>Copy (changed a to 100): {JSON.stringify(copiedObject)}</p>

      <h3>4. Rest Operator Function (sumAll)</h3>
      <p>sumAll(1, 2, 3, 4, 5) = {restSum}</p>
    </section>
  );
}

export default RestSpreadDemo;
