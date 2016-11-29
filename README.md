# Ng-LocalStorage
[![version](https://img.shields.io/npm/v/ng-localstorage.svg?style=flat-square)](http://npm.im/ng-localstorage) [![downloads](https://img.shields.io/npm/dm/ng-localstorage.svg?style=flat-square)](https://npm-stat.com/charts.html?package=ng-localstorage&from=2016-11-24) [![MIT License](https://img.shields.io/npm/l/ng-localstorage.svg?style=flat-square)](http://opensource.org/licenses/MIT)

A local storage wrapper to simplify local storage setters and getters
 
### Installation ###
```sh
npm install --save ng-localstorage
```
### Usage ###
```sh
import { NgLocalStorage } from 'ng-localstorage';   
```

And inject the service to the constructor:
```javascript
constructor (private NgLocalStorage: NgLocalStorage) { ...
```
And you can use all localStorage APIs: **set**, **get**, **remove**, **clear**

### Store Object
**ng-localstorage** automatically converts `Object` input to `JSON` string and save it.
```javascript
var userData = {name: 'John Doe', email: 'johndoe@mail.com'};
NgLocalStorage.set('user', userData);
```

### Get Object
**ng-localstorage** allows you to retrieve saved items in `Object` format, which means you can use a `dot-notation` approach to access `Object` properties.
```javascript
// given that userData Object has been saved in localStorage
NgLocalStorage.get('user'); // returns {name: 'John Doe', email: 'johndoe@mail.com'}
NgLocalStorage.get('user.name'); // returns 'John Doe'
```

### Clearing localStorage
Same as native `localStorage` approach.
```javascript
NgLocalStorage.remove('user');
NgLocalStorage.clear();
```