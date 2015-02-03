# [CSS Premix Mixins]
The following is a list of less mixin for CSS shortcuts.

## Keyframes mixin
 * **.keyframes( @name:string, @rules:{ keyframe block } );**

 * **Description:** This will build a set of keyframe definitions with the given prefixes.

 Example:
 ```less
  .keyframes("my-fade-animation", {
    from {
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    to{
      opacity: 1;
    }
  });
 ```

## Animation property mixin
 * **.animation();**

 * **Description:** .animation mixin is shorthand for -webkit-animation and animation and use for css animations
 should be used like a native css animation property.

 * This mixin will take in the following parameters with its respective values in order
 ```sh
  @animation: <single-animation-name> || <time> || <timing-function> || <time> || <single-animation-iteration-count>
  || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>
  ```

 Example:
 ```less
   .animation( my-fade-animation 3s, my-other-animation 2s 2s ; );
  ```

### Additional Animation property mixin
  Example:
  ```less
  .animation( my-fade-animation; 3s; @delay: 2s );
 ```

 * **Description:** This is an extended mixin for advance animation and -webkit-animation. This mixin requires a name
  and duration, but for every additional parameter there needs to be an @parameterName: value. The following is a
  list of usable parameters for this mixin are as follows:
 ```sh
  @name: a name of your custom animation
  @duration: <time> (Default is 0)
  @timingFn: linear || ease || ease-in || ease-out || ease-in-out || cubic-bezier(n,n,n,n)
  @delay: <time> (Default is 0)
  @iterationCount: <number> (Default is 1) || infinite
  @direction: normal || reverse || alternate || alternate-reverse
  @fillMode: none || forwards || backwards || both
  @playState: paused || running
 ```

## Column property mixin
* **.column();**

* **Description:** This mixin is used to separate content into multiple columns. This mixin needs to take in @count,
which is short for column-count, as its first parameter in order to work. Support across all browsers with the
exception of @fill which only has support for Moz, see below for details.

 Example:
 ```less
 .column( 3; @width: 200px; @ruleColor: red );
 ```

* This mixin takes in the following parameters:
```sh
 @count: <number> | auto *REQUIRED*
 @width: auto | <length>
 @ruleWidth: medium | thin | thick | <length>
 @ruleStyle: none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset
 @ruleColor:  <color>, currently set to transparent as it has no default color and takes in the current color of the
 element as default.
 @fill:  balance | auto
 @gap: <length> | normal
 @span: 1 | all
```


## Filter property mixin
 * **.filter();**

 Example:
 ```less
 .filter( grayscale(50%) contrast(20%) );
 ```
 * **Description:** .filter mixin is shorthand for -webkit-filter and filter. This mixin will take in the following
 parameters with its respective values the parameters do not have to be in order and may contain more than one
 parameter. Currently does not support for IE and Opera Mini as the native filter does not support.
 ```sh
  @filter: <none> || <blur> || <brightness> || <contrast> || <url> || <drop-shadow> || <grayscale> || <hue-rotate> ||
   <invert> || <opacity> || <sepia>
   ```

 * The following is a list of values for the parameters of .filter:
 ```sh
  blur: <number> || <percentage>
  brightness: <number> || <percentage>
  contrast: <number> || <percentage>
  url: url(svg-url#element-id)
  drop-shadow: <offset-x> <offset-y> (required) || <blur-radius> (optional) || <spread-radius> (optional) || <color>
  (optional) drop-shadow takes in numerical values with the exception of color *
  grayscale: <number> || <percentage>
  hue-rotate: <angle>
  invert: <number> || <percentage>
  opacity: <number> || <percentage>
  sepia: <number> || <percentage>
```
