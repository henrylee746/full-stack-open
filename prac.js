/*let vs const

1. let is blocked scoped, var is function-scoped 
2. var is hoisted w/ undefined value, let will throw error 
if you try to accesss before initialization
3. var can be re-initialized whereas let cannot be

const follows same principles as let except you cannot 
change value after initialization


Spread/Rest Operators

*/

function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // Spread Operator.

function concatenateStrings(...strings) {
  return strings.join(" ");
}
console.log(concatenateStrings("Hello", "world", "!")); //Rest Operator.

/*
Spread: Expands array/other iterable into individual elements
Rest: Accepts indefinite number of args


HOISTING:
Functions/Variables being "hoisted" to the top of the execution process 
during compilation

Functions are hoisted to the top and can be invoked prior to their defn 
Variables are hoisted, but functionality depends (var undefined, let/const error)
Classes are hoisted, but will throw an error if trying to access before declaration

Closures: Basically a function inside another, but the inner can access the outer's variables 
*/
function outerFunction() {
  let outerVariable = "I'm from the outer scope!";
  function innerFunction() {
    console.log(outerVariable); // Accesses the outerVariable
  }
  return innerFunction;
}
const closure = outerFunction(); // outerFunction executes and returns innerFunction
closure(); // Logs: "I'm from the outer scope!"
/*
Callbacks: A function passed into another function as an arg
Executed once that function is called/done 
Common example is eventHandlers
*/

const button = document.querySelector(".button1");
button.addEventListener("click", () => console.log("hi"));

/*HTML
Semantic Elements: Tags that describe their meaning to the browser and developer
- Improves accessibility and readability 
e.g. header, nav, main, section

div vs section: section defines an actual part of your webpage, div is 
an unspecified container for any purpose (e.g. structuring layout w/ flex or grid)
*/

/*CSS
Positioning:
- Fixed: Positioned relative to the viewport
- Relative: Positioned relative to the document flow 
- Absolute: Positioned relative to ancestor (parent container/element)
- Sticky: Used for headers that stick to the top even while scrolling down

Specificity Calculation

Specificity is calculated using a point system, where different types of selectors are assigned different weights:

Inline Styles: These have the highest specificity with a value of 1000. For example: <h1 style="color: pink;">Heading</h1>

ID Selectors: These have a specificity value of 100. For example: #navbar { color: blue; }

Class, Attribute, and Pseudo-Class Selectors: These have a specificity value of 10. For example: .test { color: green; } [type="text"] { color: red; } :hover { color: yellow; }

Element and Pseudo-Element Selectors: These have a specificity value of 1. For example: p { color: black; } ::before { content: ""; }


**Inline vs Block vs Inline-Block**
Block-level elements start on a new line, takes up the whole line (default)
Inline elements do not start on a new line and only take up as much width as necessary
Inline-Block: Like an inline element, but can adjust its width/height
*/
import React, { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]); // stores fetched data
  const [loading, setLoading] = useState(true); // loading indicator
  const [error, setError] = useState(null); // error handling

  useEffect(() => {
    // Fetch user data from a placeholder API
    async function fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data); // update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // empty dependency array → runs once on mount

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">User List</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-2 rounded-md">
            <p>
              <strong>{user.name}</strong>
            </p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Example question:
// Given an array of users, return only their names sorted alphabetically.
const users = [
  { name: "Charlie", age: 28 },
  { name: "Alice", age: 22 },
  { name: "Bob", age: 25 },
];

// Expected output: ["Alice", "Bob", "Charlie"]

const usersSorted = users.sort();

// Reverse a string without using .reverse()
function reverseString(str) {
  const strSplit = str.split("");
  const newArr = [];
  for (let i = strSplit.length - 1; i >= 0; i--) {
    newArr.push(strSplit[i]);
  }
  return newArr.join("");
}

// Increment counter each time button is clicked
const btn = document.getElementById("btn");
const counter = document.getElementById("counter");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  counter.innerHTML = count;
});

async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error with response status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(`Error with message ${e.message}`);
    return null;
  }
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const url = "https://getData/something";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error with Status Code: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (e) {
        console.error(e.message);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (error) return <p>{error}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

const double = createMultiplier(2);
console.log(double(5)); // 10

const createMultiplier = (num) => {
  return function (x) {
    return num * x;
  };
};

//Invert Object

const object = Object.fromEntries(
  Object.entries(object).map(([k, v]) => [v, k])
);
