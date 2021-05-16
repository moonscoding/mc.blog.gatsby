---
title : sass:meta
---



## sass:meta

### meta.load-css($url, $withL null)



### meta.call($function, $args...)

Invokes `$function` with `$args` and returns the result.

The `$function` should be a [function](https://sass-lang.com/documentation/values/functions) returned by [`meta.get-function()`](https://sass-lang.com/documentation/modules/meta#get-function).



```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// Return a copy of $list with all elements for which $condition returns `true`
/// removed.
@function remove-where($list, $condition) {
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) {
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica"));
}
```





### meta.content-exists()



### meta.feature-exists($feature)



### meta.feature-exists($name)



### meta.get-function($name, $css: false, $module : null)

Returns the [function](https://sass-lang.com/documentation/values/functions) named `$name`.



### meta.global-variable-exists($name, $module : null)



### meta.inspect($value)



### meta.keywords($args)



### meta.mixin-exists($name, $module: null)



### meta.module-functions($module)



### meta.module-variables($module)



### meta.type-of($value)



### meta.variable-exists($name)

