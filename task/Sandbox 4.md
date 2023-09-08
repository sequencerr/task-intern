#### **=== GIT ===**

**Рабочее окружение**

Вы закончили работу над задачей для клиента и у вас есть рабочий код, который был создан без использования git. Клиент создал пустой репозиторий [git@example.com](mailto:git@example.com):example/test.git и расшалил для вас доступ.

**Задание**

Опишите ваши дальнейшие действия что бы ваш код появился в ветке master в репозитории [git@example.com](mailto:git@example.com):example/test.git

#### **=== CSS, HTML ===**

**Задание**

1\. Создайте такой Layout используя **Flexbox**

2\. Создайте такой Layout используя **CSS Grid**

<https://cloud.devit-team.com/s/z9BbyZbeSR97Bfg>

3\. Создайте анимацию "Квадрат по центру окна, вращается вокруг своей оси и меняет цвет с красного на оранжевый, затем на зеленый"

#### **=== JS логика ===**

Будет плюсом реализация на TypeScript. Максимально описывайте код комментариями.

**Задание**

1\. Напишите функцию deepEqual для проверки двух обьектов на идентичность. Пример:

```
deepEqual({name: 'test'}, {name: 'test'}) // output true
deepEqual({name: 'test'}, {name: 'test1'}) // output false
deepEqual({name: 'test', data: {value: 1}}, {name: 'test', data: {value: 2}}) // output false
deepEqual({name: 'test'}, {name: 'test', age: 10}) // false
```

2\. Напишите функцию генератор chunkArray, которая возвращает итератор возвращающий части массива указанной длинны.

Пример:

```
const iterator = chunkArray([1,2,3,4,5,6,7,8], 3);
iterator.next() // { value: [1,2,3], done: false }
iterator.next() // { value: [4,5,6], done: false }
iterator.next() // { value: [7,8], done: false }
iterator.next() // { value: undefined, done: true }
```

3\. Напишите функцию обертку, которая на вход принимает массив функций и их параметров, а возвращает массив результатов их выполнения. Количество аргументов исполняемой функции **не ограничено**!

Пример:

```
const f1 = (cb) => {cb(1)}
const f2 = (a, cb) => {cb(a)}
const f3 = (a, b, cb) => {setTimeout(() => cb([a, b]), 1000)}

bulkRun(
  [
    [f1, []],
    [f2, [2]]
    [f3, [3, 4]]
  ]
).then(console.log)
 // Output: [1, 2, [3, 4]]
```

4\. Напишите метод arrayToObject, который превращает массив в объект (использовать рекурсию). Пример:

```
var arr = [['name', 'developer'], ['age', 5], ['skills', [['html',4], ['css', 5], ['js',5]]]];

arrayToObject(arr)
// Outputs: {
	name: 'developer',
	age: 5,
	skills: {
		html: 4,
		css: 5,
		js: 5
	}
```

5\. Написать обратный метод (см. задачу 4) objectToArray, который из объекта создаст массив. Пример:

```
objectToArray({
	name: 'developer',
	age: 5,
	skills: {
		html: 4,
		css: 5,
		js: 5
	}
})

// Outputs: [['name', 'developer'], ['age', 5], ['skills', [['html', 4], ['css', 5], ['js', 5]]]
```

6\. Есть функция `primitiveMultiply`, которая умножает числа, но случайным образом может выбрасывать исключения типа: `NotificationException`, `ErrorException`. Задача написать функцию обертку которая будет повторять вычисление при исключении `NotificationException`, но прекращать работу при исключениях `ErrorException`

Пример:

```
function NotificationException() {}
function ErrorException() {}
function primitiveMultiply(a, b) {
  const rand = Math.random();
  if (rand < 0.5) {
    return a * b;
  } else if(rand > 0.85) {
    throw new ErrorException()
  } else {
    throw new NotificationException()
  }
}

function reliableMultiply(a, b) {
  // Ваш код
}

console.log(reliableMultiply(8, 8));
```

7\.  Напишите функцию, которая берет объект любой вложенности и преобразует ее в единую плоскую карту с разными уровнями, разделенными косой чертой ( `'/'`).

Пример:

```
const obj = {
  a: {
    b: {
      c: 12,
      d: 'Hello World'
    },
    e: [1,2,3]
  }
};

mapObject(demoData);
// Outputs: {
  'a/b/c': 12,
  'a/b/d': 'Hello World',
  'a/e': [1,2,3]
}
```

8\. Напишите функцию `combos`, которая принимает положительное целое число `num` и возвращает массив массивов положительных целых чисел, где сумма каждого массива равна  `num`.  Массивы не должны повторяться.

Пример:

```
combos(3);
// Output: 
[
  [ 3 ],
  [ 1, 1, 1 ],
  [ 1, 2 ] 
]

combos(10); 
// Output: 
[ 
  [ 10 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1, 2 ],
  [ 1, 1, 1, 1, 1, 1, 1, 3 ],
  [ 1, 1, 1, 1, 1, 1, 4 ],
  [ 1, 1, 1, 1, 1, 5 ],
  [ 1, 1, 1, 1, 6 ],
  [ 1, 1, 1, 7 ],
  [ 1, 1, 8 ],
  [ 1, 9 ],
  [ 1, 1, 1, 1, 1, 1, 2, 2 ],
  [ 1, 1, 1, 1, 1, 2, 3 ],
  [ 1, 1, 1, 1, 2, 4 ],
  [ 1, 1, 1, 1, 2, 2, 2 ],
  [ 1, 1, 1, 1, 3, 3 ],
  [ 1, 1, 1, 2, 5 ],
  [ 1, 1, 1, 2, 2, 3 ],
  [ 1, 1, 1, 3, 4 ],
  [ 1, 1, 2, 6 ],
  [ 1, 1, 2, 2, 4 ],
  [ 1, 1, 2, 2, 2, 2 ],
  [ 1, 1, 2, 3, 3 ],
  [ 1, 1, 3, 5 ],
  [ 1, 1, 4, 4 ],
  [ 1, 2, 7 ],
  [ 1, 2, 2, 5 ],
  [ 1, 2, 2, 2, 3 ],
  [ 1, 2, 3, 4 ],
  [ 1, 3, 6 ],
  [ 1, 3, 3, 3 ],
  [ 1, 4, 5 ],
  [ 2, 8 ],
  [ 2, 2, 6 ],
  [ 2, 2, 2, 4 ],
  [ 2, 2, 2, 2, 2 ],
  [ 2, 2, 3, 3 ],
  [ 2, 3, 5 ],
  [ 2, 4, 4 ],
  [ 3, 7 ],
  [ 3, 3, 4 ],
  [ 4, 6 ],
  [ 5, 5 ]
]
```

9\.  Напишите функцию `add`, которая бы работала следующим образом `add(1)(2)(7)...(n)`. Количество последовательных визовов неограничено.

Пример:

```
Number(add(1)(2)); // == 3
Number(add(1)(2)(5)); // == 8
Number(add(1)(2)(-3)(4)); //  == 4
Number(add(1)(2)(3)(4)(-5)); // == 5
```