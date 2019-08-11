                       _  _                       _
                      (_)(_)                     | |
      __ _  ___   ___  _  _  ______   __ _  _ __ | |_
     / _` |/ __| / __|| || ||______| / _` || '__|| __|
    | (_| |\__ \| (__ | || |        | (_| || |   | |_
     \__,_||___/ \___||_||_|         \__,_||_|    \__|

ascii-art-ansi.js
=================

[![NPM version](https://img.shields.io/npm/v/ascii-art-ansi.svg)]()
[![npm](https://img.shields.io/npm/dt/ascii-art-ansi.svg)]()
[![Travis](https://img.shields.io/travis/khrome/ascii-art-ansi.svg)]()

This module allows you to work with ansi strings in a style aware way, so you aren't constantly doing string manipulation and scanning when working with terminal strings. It offers a clean abstraction to build ascii-art utilities on top of.


Installation
------------

    npm install ascii-art-ansi


Usage
------

<a name="module_ascii_art_ansi"></a>
### require('ascii-art-ansii')
To do anything with it, you'll need to include the library:

```javascript
    const ansi = require('ascii-art-ansi');
```

* [ascii-art-ansi](#module_ascii_art_ansi)
  * [.map(ansi_string, handler)](#module_ascii_art_ansi.map) ⇒ <code>string</code>
  * [.length(ansi_string)](#module_ascii_art_ansi.length) ⇒ <code>int</code>
  * [.strip(ansi_string)](#module_ascii_art_ansi.strip) ⇒ <code>string</code>
  * [.toArray(ansi_string)](#module_ascii_art_ansi.to_array) ⇒ <code>Array</code>
  * [.substring(ansi_string, start, stop)](#module_ascii_art_ansi.substring) ⇒ <code>string</code>
  * [.charAt(ansi_string, position)](#module_ascii_art_ansi.charat) ⇒ <code>string</code> (length:1)
  * [.intersect(string1, .. stingN, callback)](#module_ascii_art_ansi.intersect) ⇒ <code>Promise</code> (if callback not present)
  * [.interstyle(string1, .. stingN, callback)](#module_ascii_art_ansi.interstyle) ⇒ <code>Promise</code> (if callback not present)

<a name="module_ascii_art_ansi.map"></a>
### .map(ansiString, handler)
Map through an ansi string one character at a time, without any of those characters being styles.
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| ansiString | <code>string</code> | input string to map across |
| handler | <code>function</code> | the function to map through the string |

**Example**

```javascript
    var result = ansi.map(
        ansiString,
        function(chr, codes, rowcol, pos, shortcircuit){
            // chr : the character
            // codes : a list of the active ansi codes as strings
            // rowcol: array of the 2D position of chr in a multiline string
            // pos : the position of the character
            // shortcircuit : function which stops processing after return
        }
    );
```

<a name="module_ascii_art_ansi.length"></a>
### .length(ansiString)
The number of non ansi code characters in the string
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| ansiString | <code>string</code> | input string to measure |

**Example**

```javascript
    var result = ansi.length(ansiString);
```

<a name="module_ascii_art_ansi.strip"></a>
### .strip(ansiString)
Remove any ansi codes from the string
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| ansiString | <code>string</code> | input string to measure |

**Example**

```javascript
    var result = ansi.strip(ansiString);
```

<a name="module_ascii_art_ansi.to_array"></a>
### .length(ansiString)
convert this string to an array of characters
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| ansiString | <code>string</code> | input string to measure |

**Example**

```javascript
    var result = ansi.toArray(ansiString);
```

<a name="module_ascii_art_ansi.charat"></a>
### .charAt(ansiString)
Extract a specific character from the string, by position
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| ansiString | <code>string</code> | input string to measure |

**Example**

```javascript
    var chr = ansi.charAt(ansiString, 4);
```

<a name="module_ascii_art_ansi.substring"></a>
### .substring(ansiString, start, stop)
Like the javascript built-in substring, but ansi aware
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| ansiString | <code>string</code> | input string to measure |

**Example**

```javascript
    var chr = ansi.trimTo(ansiString, 4);
```

<a name="module_ascii_art_ansi.intersect"></a>
### .intersect(ansiString)
Intersect/overlay any number of strings
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| inputString(N) | <code>string</code> | input string to measure |
| callback | <code>function</code> | callback to handle asynchronous return, if omitted, a promise is returned |

**Example**

```javascript
    var chr = ansi.intersect(s1, s2, s3, function(err, result){
        // ['A  ', ' B ', '  C'] -> 'ABC'
    });
```

<a name="module_ascii_art_ansi.interstyle"></a>
### .interstyle(ansiString)
Intersect/overlay any number of strings and include their styles
**Kind**: static property of <code>[ascii-art-ansi](#ascii-art-ansi)</code>

| Param | Type | Description |
| --- | --- | --- |
| inputString(N) | <code>string</code> | input string to measure |
| callback | <code>function</code> | callback to handle asynchronous return, if omitted, a promise is returned |

**Example**

```javascript
    var chr = ansi.interstyle(s1, s2, s3, function(err, result){
        // ['A  ', ' B ', '  C'] -> 'ABC'
    });
```


Roadmap
-------

#### Goals
- color reducer
- streaming
- pluggable colorsets/encodings


Testing
-------
In the root directory run:

	npm run test

Please make sure to run the tests before submitting a patch and report any rough edges. Thanks!

Enjoy,

-Abbey Hawk Sparrow
