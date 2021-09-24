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
  "plugins": ["@dazn/kopytko"],
  "rules": {
    "@dazn/kopytko/dependencies-order": "error",
    "@dazn/kopytko/missing-trailing-comma": "error",
    "@dazn/kopytko/indent": ["error", 2],
  }
}
```

## Rules

### indent

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

### missing-trailing-comma

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

### dependencies-order

A rule to use with [Kopytko Packager](https://github.com/getndazn/kopytko-packager) 's importing mechanism
and [Kopytko Unit Testing Framework](https://github.com/getndazn/kopytko-unit-testing-framework) 's mocking mechanism.

Enforces a proper alphabetical and path-specific order of `@import` and `@mock` annotations:
- `@mock` annotations have to be after all `@import` annotations
- alphabetical order of paths
- nested paths have to be declared after their root path

Examples of **incorrect** code for this rule:
```brightscript
' @mock /components/mocked-function.brs
' @import /components/nested/cool-function.brs
' @import /components/nested/another-function.brs
' @import /components/main-function.brs
```

Examples of **correct** code for this rule:
```brightscript
' @import /components/main-function.brs
' @import /components/nested/another-function.brs
' @import /components/nested/cool-function.brs
' @mock /components/mocked-function.brs
```


## Recommendation
We recommend to use also [eslint-plugin-roku](https://www.npmjs.com/package/eslint-plugin-roku) rules
