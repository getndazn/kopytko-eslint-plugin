# Kopytko ESLint plugin

An ESLint plugin with a set of rules

## Installation

1. Install `eslint` peer dependency:
```bash
npm i eslint --save-dev
```

2. Install `eslint-plugin-kopytko`:
```bash
npm i @dazn/eslint-plugin-kopytko --save-dev
```

## Configuration

In `.eslintrc`:
```json
{
  "extends": "plugin:@dazn/kopytko/recommended",
  "plugins": ["@dazn/kopytko"]
}
```

## Rules

### @dazn/kopytko/dependencies-order

A rule to use with [Kopytko Packager](https://github.com/getndazn/kopytko-packager) 's importing mechanism
and [Kopytko Unit Testing Framework](https://github.com/getndazn/kopytko-unit-testing-framework) 's mocking mechanism.

Enforces a proper alphabetical and path-specific order of `@import` and `@mock` annotations:
1. imports or mocks from external packages have to be before local ones
2. `@mock` annotations have to be after all `@import` annotations
3. alphabetical order of external packages names
4. alphabetical order of paths
5. nested paths have to be declared after their root path

#### External packages before local

Example of **incorrect** code:
```brightscript
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
' @import /components/nested/some-function.brs from package-name
' @mock /components/mocked-function.brs
' @mock /components/some-mocked-function.brs from package-name
```

Example of **correct** code:
```brightscript
' @import /components/nested/some-function.brs from package-name
' @mock /components/some-mocked-function.brs from package-name
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
' @mock /components/mocked-function.brs
```

#### Imports before mocks

Example of **incorrect** code:
```brightscript
' @mock /components/mocked-function.brs
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
```

Example of **correct** code:
```brightscript
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
' @mock /components/mocked-function.brs
```

#### Alphabetical order of external packages names

Example of **incorrect** code:
```brightscript
' @import /components/a-function.brs from package-name
' @import /components/some-function.brs from another-package-name
' @mock /components/another-mocked-function.brs from package-name
' @mock /components/some-mocked-function.brs from another-package-name
' @import /components/main-function.brs
' @mock /components/mocked-function.brs
```

Example of **correct** code:
```brightscript
' @import /components/some-function.brs from another-package-name
' @import /components/a-function.brs from package-name
' @mock /components/some-mocked-function.brs from another-package-name
' @mock /components/another-mocked-function.brs from package-name
' @import /components/main-function.brs
' @mock /components/mocked-function.brs
```

#### Alphabetical order of paths

Example of **incorrect** code:
```brightscript
' @import /components/nested/another-function.brs
' @import /components/main-function.brs
' @import /components/nested/cool-function.brs
' @mock /components/some-mocked-function.brs
' @mock /components/mocked-function.brs
```

Example of **correct** code:
```brightscript
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
' @mock /components/mocked-function.brs
' @mock /components/some-mocked-function.brs
```

### @dazn/kopytko/function-no-return

Check if function with defined return type has `return` statement.

Examples of **incorrect** code for this rule:
```brightscript
function calc() as Integer
  result = 1 + 2
end function
```

Examples of **correct** code for this rule:
```brightscript
function calc() as Integer
  result = 1 + 2
  return result
end function
```

### @dazn/kopytko/indent

Enforces consistent indentation of block, array and object expressions, and function declarations

Examples of **incorrect** code for this rule, set to 2 characters:
```brightscript
sub test()
  example = [
  1,
    2,
  ]
  if (1 = 1)
  superFunction({
    a: "a",
  b: "b",
      c: "c",
  })
  end if
end sub

  sub another()
  superFunction({})
  end sub
```

Examples of **correct** code for this rule, set to 2 characters:
```brightscript
sub test()
  example = [
    1,
    2,
  ]
  if (1 = 1)
    superFunction({
      a: "a",
      b: "b",
      c: "c",
    })
  end if
end sub

sub another()
  superFunction({})
end sub
```

### @dazn/kopytko/missing-trailing-comma

Enforces a trailing comma after every property of multiline associative array

The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

Examples of **incorrect** code for this rule:
```brightscript
test = {
  a: "a",
  b: "b"
}
```

Examples of **correct** code for this rule:
```brightscript
test = {
  a: "a",
  b: "b",
}
```

### @dazn/kopytko/no-uninitialized-variables

Check that all variables are declared.

Examples of **incorrect** code for this rule:
```brightscript
sub a()
  print(foo)
end sub
```

Examples of **correct** code for this rule:
```brightscript
sub a()
  foo = "bar"
  print(foo)
end sub
```
### @dazn/kopytko/sub-to-function

Check that `sub` doesn't have a return type.

Examples of **incorrect** code for this rule:
```brightscript
sub a() as Dynamic
end sub
```

Examples of **correct** code for this rule:
```brightscript
sub a()
  print("foo")
end sub
```

### @dazn/kopytko/no-print

Disallows the use of `print`.

### @dazn/kopytko/no-stop

Disallows the use of `stop`.
