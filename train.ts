/* -------- TASK ZJ -------- */
/* Savol */

// Shunday function yozing, u berilgan array ichidagi
// raqamlarni qiymatini hisoblab qaytarsin.

// MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;

// Yuqoridagi misolda, array nested bo'lgan holdatda ham,
// bizning function ularning yig'indisini hisoblab qaytarmoqda

/* YECHIM */

function reduceNestedArray(arr: any[]): number {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc + reduceNestedArray(val);
    }
    return acc + (typeof val === 'number' ? val : 0);
  }, 0);
}

const result = reduceNestedArray([1, [1, 2, [4]]]);

console.log('result:', result);
