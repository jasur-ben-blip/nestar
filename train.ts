/* -------- TASK ZK -------- */
/* Savol */
/*
  Shunday function yozing, u har soniyada bir marta
  consolega 1 dan 5 gacha bolgan raqamlarni chop etsin va 
  5 soniyadan keyin ishini toxtatsin.

  MASALAN: printNumbers()
*/

/* YECHIM */
function printNumbers(): void {
  let current: number = 1;

  const timer = setInterval(() => {
    console.log(current);

    if (current === 5) {
      clearInterval(timer);
    }

    current++;
  }, 1000);
}

printNumbers();

/* -------- TASK ZJ -------- */
/* Savol */

// Shunday function yozing, u berilgan array ichidagi
// raqamlarni qiymatini hisoblab qaytarsin.

// MASALAN: reduceNestedArray([1, [1, 2, [4]]]); return 8;

// Yuqoridagi misolda, array nested bo'lgan holdatda ham,
// bizning function ularning yig'indisini hisoblab qaytarmoqda

/* YECHIM */

/* function reduceNestedArray(arr: any[]): number {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc + reduceNestedArray(val);
    }
    return acc + (typeof val === 'number' ? val : 0);
  }, 0);
}

const result = reduceNestedArray([1, [1, 2, [4]]]);

console.log('result:', result); */
