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



