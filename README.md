el-scroll
=========

Simple way to make an element scrollable.



Goals
-----

* Make it very simple to have one or more scrollable elements.
* Target mobile browsers and Phonegap/Cordova applications.
* Prevent over scroll of the page itself.
* Minimal setup.
* Simple design that minifies well.
* No hard dependencies.

Note: It seems to work well for desktop browsers too...


Features
--------
* Exposes itself as either an AMD module, [module-loader-tdd](https://github.com/christianalfoni/module-loader-tdd) module or global. The latter is the fallback if none of the module loader are located.
* Backbone / jQuery support. See next section.



Dependencies / Integration
------------

* Hard:
    * None
* Soft:
    * Backbone if you plan to trigger it by event.
    * jQuery to be able to pass in a jQuery object.

Usage
-----

As AMD module:

```javascript
require(['elScroll'], function(elScroll) {
    elScroll(element)
})
```

As module-loader-tdd module:

```javascript
require('elScroll');
elScroll(element)
```

As global:

```javascript
elScroll(element)
```

Using Backbone event:

```javascript
Backbone.trigger("elScroll:new", element, [options object])
```

### Arguments

#### First - element


* DOM element
* Id of an existing DOM element
* jQuery wrapped DOM element

#### Second - Options object

Available options:

* applyStyling
    - Values: true / false
    - Purpose: Disable the styling set from JS.

Example:
```javascript
elScroll(element, {applyStyling: false})
```


Future
------
Lots could be done in regards to code structure, features and such, but as part of the purpose is to keep this simple, extensions and rewrite might be better suited for an elScroll2 project.
Now the plan is to get some experience with the current implementation.