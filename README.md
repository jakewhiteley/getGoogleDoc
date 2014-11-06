getGoogleDoc
============

`$.getGoogleDoc` will fetch the data from a public spreadsheet hosted on Google Drive, and return it as an array of objects, with each object representing a row of your spreadsheet. It comes in at 400b when gzipped and works across all major browsers - allowing anyone to easily edit data for a project.

## Using getGoogleDoc

### Basic Implementation
This plugin follows the spec for similar AJAX shorthand methods like `$.getJSON`, so you can use the plugin by passing it the public key of your sheet, and a success function to handle the response.

```
// fetch spreadsheet with a success function
$.getGoogleDoc('1l-5ToWOOlmaPhlzdKsLggZKfenSMNZTkzXzFMg9P1es', function (data) {
    // log a table of results to the console
    console.table(data)
})
```
### Using jQuery promise

Alternatively, you can make use of the jQuery promise interface methods such as `.done()` and .`fail()` if you want more control.

```
// fetch spreadsheet as a promise
$.getGoogleDoc('1l-5ToWOOlmaPhlzdKsLggZKfenSMNZTkzXzFMg9P1es')
    .done(function (data) {
        console.table(data)
    })
    .fail(function (data) {
        console.log('getGoogleDoc failed')
    })
    .always(function (data) {
        console.log('getGoogleDoc complete')
    });
```
### Example Data Returned

The callback function is called with the parsed contents of the Google spreadsheet as a parameter. This is an Array of Objects with an Object for each row in the spreadsheet. Each objects keys are the column names from your table, and the values are the contents of the relevant cell.

```
[ 
    {
        name: 'James',
        surname: 'Brimble',
        age: 27,
        address: null
    }, {
        name: 'Alice',
        surname: 'Brimble',
        age: 26,
        address: null
    } //, { ... }
]
```
