Instructions and References for the Code snippets

JSON Class Note: (JavaScript Object Notation)
It is written as name/value - key/value pairs 

Example : "name" : "Tesfaye", "age" : 23

Example of JSON that represents a pet (name, dateOfBirth, category: dog/cat/other, sex: male/female)

{
    "name": "Puppy",
    "dateOfBirth" : "4/1/2022",
    "category": "dog",
    "sex": "male",
    "age": 1
}

[]

Value of the JSON name/key can be any of the following type
a string ---- Text 
a number --- any number 
an object 
an array 
a boolean 
null 

REST API (SharePoint REST API and GRAPH API)

YourSiteUrl/_api/site   - returns JSON data of Site information
YourSiteUrl/_api/web    - returns JSON data of the web
YourSiteUrl/_api/web/Lists    - returns all SharePoint lists under the web in JSON 

Get all lists with specific properties, example Title, ItemCount, Hidden, Description
To see the above selection of Fields we use oData called $select
YourSiteUrl/_api/web/lists?$select=Title,Description,ItemCount,Hidden

How can we filter specific lists in REST API, we use oData called $filter
example get all lists which are not hidden 
YourSiteUrl/_api/web/lists?$select=Title,Description,ItemCount,Hidden&$filter=Hidden eq false
$filter goes with conditional operators like equal, not equal, greater, less, etc ... 
eq stands for equal 
ne stands for not equal 
le, lt, gt, ge 
example 
SiteURl/_api/web/lists?$select=Title,Description,ItemCount,Hidden&$filter=Hidden eq false and ItemCount gt 10

How do I get just one list two options, by name of the list or by ID of the list 
By name/Title 
SiteURl/_api/web/lists/getbytitle('ListName')
example 
SiteURl/_api/web/lists/getbytitle('State')

by ID example 509ecc35-9a9c-4d06-8120-be247f5a7d20
example
SiteURl/_api/web/lists(guid'509ecc35-9a9c-4d06-8120-be247f5a7d20')

To get all items in the list 
SiteURl/_api/web/lists/getbytitle('State')/items  or
SiteURl/_api/web/lists(guid'509ecc35-9a9c-4d06-8120-be247f5a7d20')/items

Example $expand with lookup Country and Person or Group Author 
/_api/web/lists/getbytitle('State')/items?$select=Title,ID,Country/Title,Author/Title,Author/EMail&$expand=Country,Author


Give me all items where country column  is Ethiopia based on above example 

/_api/web/lists/getbytitle('State')/items?$select=Title,ID,Country/Title,Author/Title,Author/EMail&$expand=Country,Author&$filter=Country/Title eq 'Ethiopia'

To get one list item use its unique Id 

_api/web/lists/getbytitle('ListName')/items(ID)
example /_api/web/lists/getbytitle('State')/items(5)

get all SharePoint Groups in REST API 

SiteURl/_api/web/sitegroups

HTML, CSS, JavaScript

HTML Hyper Text Markup Language 

<br> <a href="sdfasd">Click Here</a>

<div class="myClass"><a href="https://google.com">Click Me</a></div>

The following are commonly used html tags 

div - block element -- takes the entire row of the browser 
span - inline element 
a  - anchor or link require href attribute is required optionally there is target attribute
ex. <a href="https://google.com"> Click Me</a>
p - Paragraph 
<p>This is a paragraph </p>
img - image requires src attribute to specify the location of the image itself 
ex. <img src="image location">
h1, h2, h3, .... h6 - heading 1  through heading 6
ex <h1>This is heading 1</h1>
ol - li ---> ordered list 
example
<ol>
    <li> item 1</li>
    <li> item 2</li>
</ol>
ul - li ---> unordered list 
example
<ul>
    <li> item 1</li>
    <li> item 2</li>
</ul>




Form html tags 

button - button 
input - the king of all form tags 
select -- option --- drop down 


CSS cascading stylesheet 
Syngtax 

selector {
    property: value;
}

selector - is either name of element (ex p, img...), id of an element or class of an element 

example 
element selector 
p {}

id selector 
#idName {}
#headings {}

class selector 
.className {}
.redClass {}

property is any property of the element we wanted to change 
example: color, margin, padding, size, .... 
.className {color: red;}


Typescript/JavaScript

Terms 

variables
statements
operators Logical and Mathematical 
conditional statements
looping 
functions/methods
Object Oriented Programming (class, interface, inheritance, Polymorphism )
JSON Vs JavaScript Object

Variables and datatypes 
let a = 5;
let age: number;

a = 10;
let myName = 'Tesfaye Gari';

let students = ["Birhan", "Hayat", "Kunuza", "Mulu", "Fate"];

let student1 = { name: "Birhan", batch: "Feb2023", phone: "444-333-44455", email: "Birhan@gmail.com" }
let student2 = { name: "Hayat", batch: "Winter2022", phone: "555-333-44455", email: "hayat@gmail.com" }
let student3 = { name: "Sena", batch: "Winter2022", phone: "256-333-44455", email: "sena@gmail.com" }


let stdntObjects = [student1, student2, student3] 
students.sort();
//numbers operators +, -, *, /, mod (modulus)  - Mathematical operators 

students.sort();

//Logical Operators equality, greater, greater or equal, less, less or equal, not equal
// 5=6 false in maths but programmatically we compare it 6 == 7
/**
 * equality ==  ex 5==5 is true 
 * similarity === 
 * not equal != 
 * less than <
 * greater than > 
 * less than or equal <= 
 * greater or equal >=
 */
let num1 = 60;
let num2 = '60';
let num3 = 60;
/**
 * num1==num2  True 
 * num1==num3  True
 * num1===num2  false 
 * num1===num3 true 
 */

 Conditional statement //if else statement 
 Syntax of if -- else statement 
 if(expression) {
    //if expression is true execute these statements
 } else {
    //if expression is false execute anything in this block 
 }
 //expression is something that gives us true or false value 
 example 

 if (num1 == num2) {
    console.log("Num 1 is equal to num 2");
 }else {
    console.log("Num 1 is not equal to num 2");
 }

 //switch --- case  conditional statement reading assignment not urgent 

Looping 

suppose i wanted display collection below 

let students = ["Birhan", "Hayat", "Kunuza", "Mulu", "Fate"]; 

as shown below 
<ul>
    <li>Birhan</li>
    <li>Hayat</li>
    <li>Kunuza</li>
    <li>Mulu</li>
    <li>Fate</li>
</ul>

most widely used looping is for loop 
Syntax 

for(initialization; expression; action) {
    //if expression is true execute block
}

let output = "<ul>";
for(let i = 0; i < students.length; i = i + 1){
    //all codes goes here 
    output = output + "<li>" + students[i] + "</li>";
}
 output += "</ul>"

simplified for collection 
let output = "<ul>";
 for(let st of students){
    output = output + "<li>" + st + "</li>";
 }
 output += "</ul>"
Function is a block of code that get executed on demand 
Function definition 
function execution 

Function definition: //outside of class 

function functionName ( [parameters] ) {
    //Block of codes goes here ...
    [return value;] //optionally 
}

example define the function that calculates power of mathematics 
ex Power(4,3) ==> has to return 4*4*4 = 48
Power (2, 10) ===>2*2*2*2*2*2*2*2*2*2 = 1024

function Power( a: number, b: number ){
    //caclulate p here 
    let p = 1; 
    for (let i = 1; i <= b; i++){
        p = p*a;
    }
    return p;
}


Please try to watch and follow video and reading the following links

https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part

https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint

if(a=true){
  //True Action
}else{
   //false action
}

using tertiary operator
a=true ? //True Action : //False Action;

JavaScript Function 

function funcName (params) {
	//block of codes
	return value;
}
Arrow Function 
funcName = (params) => value;

Hellow World Webpart: Add custom code to read all sharepoint groups from the site 
Also add more webpart properties for demo purpose 





