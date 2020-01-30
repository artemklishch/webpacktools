//импортируйте все полифиллы и папки polifills
//импортируйте функции sum и mult под такими же именами 
// импортируйте ф-ю fetchUser из profile/gateway.js
//импортирйте ф-ю printProfile из profile/index.js
import calcExpression, { sum, mult } from './calculator/index.js';
import fetchUser from './profile/gateway.js';
import { printProfile } from './profile/index.js';
import './polifills/array-flat.js';
import './polifills/array-flatMap.js';

const calcResult = calcExpression('1 + 2');
const sumResult = sum(1, 2);
const multResult = mult(1, 2);
const userDataPromise = fetchUser('facebook');
printProfile({ name:'Tom', from:'The World' });

//убедитесь, что скрипт выполенен без ошибок