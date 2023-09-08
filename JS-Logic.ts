type Primitive = number | string | boolean | bigint | symbol | undefined | null;
interface Nested {
	[key: string | number]: Primitive | Primitive[] | Nested;
}

// 1\. Напишите функцию deepEqual для проверки двух обьектов на идентичность. Пример:
function deepEqual(a: Nested, b: Nested): boolean {
	if (typeof a != typeof b) return false;
	if (typeof a !== 'object') return a === b; // compare primitives

	// lines below to compare objects
	const keysA = Object.keys(a);
	const keysB = Object.keys(b);

	if (keysA.length !== keysB.length) return false;
	for (const key of keysA) {
		if (!keysB.includes(key)) return false; // Object A missing key from Object B
		if (!deepEqual(a[key] as Nested, b[key] as Nested)) return false;
	}
	return true; // if all is ok return positive
}

// ```
console.log(deepEqual({ name: 'test' }, { name: 'test' })); // output true
console.log(deepEqual({ name: 'test' }, { name: 'test1' })); // output false
console.log(deepEqual({ name: 'test', data: { value: 1 } }, { name: 'test', data: { value: 2 } })); // output false
console.log(deepEqual({ name: 'test' }, { name: 'test', age: 10 })); // false
// ```

// 2\. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

function* chunkArray<T>(arr: T[], size: number): Generator<T[]> {
	for (let i = 0; i < arr.length; i += size) yield arr.slice(i, i + size);
}

for (const val of chunkArray([1, 2], 3)) console.log(val);
for (const val of chunkArray([1, 2, 3], 3)) console.log(val);
// Пример:

// ```
const iterator = chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3);
console.log(iterator.next()); // { value: [1,2,3], done: false }
console.log(iterator.next()); // { value: [4,5,6], done: false }
console.log(iterator.next()); // { value: [7,8], done: false }
console.log(iterator.next()); // { value: undefined, done: true }
// ```

// 3\. Напишите функцию обертку, которая на вход принимает массив функций и их параметров, а возвращает массив результатов их выполнения. Количество аргументов исполняемой функции **не ограничено**!

async function bulkRun(arr: [(...args: any[]) => any, any[]][]) {
	const tasks: Promise<any>[] = [];
	for (const [fun, args] of arr) {
		const task = new Promise(resolve => fun(...args, (args: any) => resolve(args)));
		tasks.push(task);
	}
	return Promise.all(tasks); // resolve all pending tasks
}

// Пример:

// ```
const f1 = cb => {
	cb(1);
};
const f2 = (a, cb) => {
	cb(a);
};
const f3 = (a, b, cb) => {
	setTimeout(() => cb([a, b]), 1000);
};

bulkRun([
	[f1, []],
	[f2, [2]],
	[f3, [3, 4]]
]).then(r => {
	console.log(r);
});
//  // Output: [1, 2, [3, 4]]
// ```

// 4\. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию).
type KeyArray = [string | number, Primitive | KeyArray][];
function arrayToObject(arr: KeyArray) {
	const obj = {};
	for (const [key, val] of arr) {
		if (Array.isArray(val)) {
			obj[key] = {};
			const subObjectEntries = Object.entries(arrayToObject(val));
			for (const [key2, val2] of subObjectEntries) obj[key][key2] = val2;
			continue;
		}
		obj[key] = val;
	}
	return obj;
}

// Пример:
// ```
var arr: KeyArray = [
	['name', 'developer'],
	['age', 5],
	[
		'skills',
		[
			['html', 4],
			['css', 5],
			['js', 5]
		]
	]
];

console.log(arrayToObject(arr));
// Outputs: {
// name: 'developer',
// age: 5,
// skills: {
// 	html: 4,
// 	css: 5,
// 	js: 5
// }
// ```

// 5\. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив.
function objectToArray(obj: Nested) {
	const arr: KeyArray = [];
	for (const [key, val] of Object.entries(obj)) {
		if (typeof val == 'object') {
			const subEntry: KeyArray = [];
			for (const entry of objectToArray(val as Nested)) subEntry.push(entry);
			arr.push([key, subEntry]);
			continue;
		}
		arr.push([key, val]);
	}
	return arr;
}

// Пример:
// ```
console.log(
	objectToArray({
		name: 'developer',
		age: 5,
		skills: {
			html: 4,
			css: 5,
			js: 5
		}
	})
);

// Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]
// ```

// 6\. Есть функция `primitiveMultiply`, которая умножает числа, но случайным образом может выбрасывать исключения типа: `NotificationException`, `ErrorException`. Задача написать функцию обертку которая будет повторять вычисление при исключении `NotificationException`, но прекращать работу при исключениях `ErrorException`

// Пример:

// ```
function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a, b) {
	const rand = Math.random();
	if (rand < 0.5) {
		return a * b;
	} else if (rand > 0.85) {
		throw new ErrorException();
	} else {
		throw new NotificationException();
	}
}

// iterative is better than recursion
function reliableMultiply(a, b) {
	while (true)
		try {
			return primitiveMultiply(a, b);
		} catch (e) {
			if (e instanceof NotificationException) continue;
			throw e;
		}
}

try {
	console.log(reliableMultiply(8, 8));
} catch (e) {
	console.log(e);
}
// ```

// 7\.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( `'/'`).

// BFS
function mapObject(obj: Nested) {
	const q1: any = [obj];
	const q2 = [''];
	const result = {};

	while (q1.length) {
		const work = q1.shift()!;
		const path = q2.shift()!;

		if (Object.prototype.toString.call(work) != '[object Object]') result[path] = work;
		else
			for (const [key, val] of Object.entries(work)) {
				q1.push(val);
				q2.push((path ? path + '/' : '') + key);
			}
	}
	return result;
}
// Пример:

// ```
const demoData = {
	a: {
		b: {
			c: 12,
			d: 'Hello World'
		},
		e: [1, 2, 3]
	}
};

console.log(mapObject(demoData));
// // Outputs: {
//   'a/b/c': 12,
//   'a/b/d': 'Hello World',
//   'a/e': [1,2,3]
// }
// ```

// 8\. Напишите функцию `combos`, которая принимает положительное целое число `num` и возвращает массив массивов положительных целых чисел, где сумма каждого массива равна  `num`.  Массивы не должны повторяться.

function combos(num: number) {
	const result: number[][] = [];
	generateCombinations(num, [], 1);
	return result;

	function generateCombinations(remaining: number, currentCombo: number[], start: number) {
		if (remaining === 0) {
			result.push(currentCombo.slice());
			return;
		}
		for (let i = start; i <= remaining; i++) {
			currentCombo.push(i);
			generateCombinations(remaining - i, currentCombo, i);
			currentCombo.pop();
		}
	}
}
// Пример:

// ```
console.log(combos(3));
// Output:
// [
//   [ 3 ],
//   [ 1, 1, 1 ],
//   [ 1, 2 ]
// ]

console.log(combos(10));
// Output:
// [
//   [ 10 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
//   [ 1, 1, 1, 1, 1, 1, 1, 3 ],
//   [ 1, 1, 1, 1, 1, 1, 4 ],
//   [ 1, 1, 1, 1, 1, 5 ],
//   [ 1, 1, 1, 1, 6 ],
//   [ 1, 1, 1, 7 ],
//   [ 1, 1, 8 ],
//   [ 1, 9 ],
//   [ 1, 1, 1, 1, 1, 1, 2, 2 ],
//   [ 1, 1, 1, 1, 1, 2, 3 ],
//   [ 1, 1, 1, 1, 2, 4 ],
//   [ 1, 1, 1, 1, 2, 2, 2 ],
//   [ 1, 1, 1, 1, 3, 3 ],
//   [ 1, 1, 1, 2, 5 ],
//   [ 1, 1, 1, 2, 2, 3 ],
//   [ 1, 1, 1, 3, 4 ],
//   [ 1, 1, 2, 6 ],
//   [ 1, 1, 2, 2, 4 ],
//   [ 1, 1, 2, 2, 2, 2 ],
//   [ 1, 1, 2, 3, 3 ],
//   [ 1, 1, 3, 5 ],
//   [ 1, 1, 4, 4 ],
//   [ 1, 2, 7 ],
//   [ 1, 2, 2, 5 ],
//   [ 1, 2, 2, 2, 3 ],
//   [ 1, 2, 3, 4 ],
//   [ 1, 3, 6 ],
//   [ 1, 3, 3, 3 ],
//   [ 1, 4, 5 ],
//   [ 2, 8 ],
//   [ 2, 2, 6 ],
//   [ 2, 2, 2, 4 ],
//   [ 2, 2, 2, 2, 2 ],
//   [ 2, 2, 3, 3 ],
//   [ 2, 3, 5 ],
//   [ 2, 4, 4 ],
//   [ 3, 7 ],
//   [ 3, 3, 4 ],
//   [ 4, 6 ],
//   [ 5, 5 ]
// ]
// ```

// 9\.  Напишите функцию `add`, которая бы работала следующим образом `add(1)(2)(7)...(n)`. Количество последовательных визовов неограничено.

// // Пример:
function add(num: number) {
	let sum = num;
	function addNext(nextNum) {
		sum += nextNum;
		return addNext;
	}
	addNext.valueOf = () => sum;
	return addNext;
}

// // ```
console.log(Number(add(1)(2))); // == 3
console.log(Number(add(1)(2)(5))); // == 8
console.log(Number(add(1)(2)(-3)(4))); //  == 4
console.log(Number(add(1)(2)(3)(4)(-5))); // == 5
// ```
