# Fable.Pyxpecto

> This repository is heavily inspired by [Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha/) by the awesome [@Zaid-Ajaj](https://github.com/Zaid-Ajaj).

Fable python library for testing. Inspired by the popular Expecto library for F# and adopts the testList, testCase and testCaseAsync primitives for defining tests.

![pyxpecto](https://github.com/Freymaurer/Fable.Pyxpecto/assets/39732517/c5d09db3-8f63-4372-8655-6330c8a00af1)

```fsharp
/// Reuse unit tests from Expecto and Fable.Mocha
let tests_basic = testList "Basic" [
    testCase "testCase works with numbers" <| fun () ->
        Expect.equal (1 + 1) 2 "Should be equal"

    testCase "isFalse works" <| fun () ->
        Expect.isFalse (1 = 2) "Should be equal"

    testCase "areEqual with msg" <| fun _ ->
        Expect.equal 2 2 "They are the same"

    testCase "isOk works correctly" <| fun _ ->
        let actual = Ok true
        Expect.isOk actual "Should be Ok"
]
```

## Install

![Nuget](https://img.shields.io/nuget/v/Fable.Pyxpecto?label=Nuget)

From [Nuget](https://www.nuget.org/packages/Fable.Pyxpecto/0.0.0) with:

- `paket add Fable.Pyxpecto --version 0.0.0`
- `<PackageReference Include="Fable.Pyxpecto" Version="0.0.0" />`

## Running tests

Use the following syntax to automatically switch between Expecto, Fable.Mocha and Pyxpecto:

```fsharp
#if FABLE_COMPILER_PYTHON
open Fable.Pyxpecto
#endif
#if FABLE_COMPILER_JAVASCRIPT
open Fable.Mocha
#endif
#if !FABLE_COMPILER
open Expecto
#endif
```

```fsharp
[<EntryPoint>]
let main argv =
    #if FABLE_COMPILER_PYTHON
    Pyxpecto.runTests all
    #endif
    #if FABLE_COMPILER_JAVASCRIPT
    Mocha.runTests all
    #endif
    #if !FABLE_COMPILER
    Tests.runTestsWithCLIArgs [] [||] all
    #endif
```

> 👀 Everything in curly braces are placeholders

1. Transpile test project to python `dotnet fable {path/to/tests} --lang py -o {path/to/tests}/py`
2. Run tests `py {path/to/tests}/{EntryFileName.py}`

## Development

### Requirements

- Python
  - check with `py --version` (Tested with `Python 3.11.1`)
- [Dotnet SDK](https://dotnet.microsoft.com/en-us/download)
  - check with `dotnet --version` (Tested with `7.0.306`)
- Node
  - check with `node --version` (Tested with `v18.16.1`)
- npm
  - check with `node --version` (Tested with `9.2.0`)

### Setup

Run all commands in root.

1. `dotnet tool restore`
1. `npm install`

### Routines

#### Tests

`./build.cmd runtests`

Can be specified to run tests for specific environment.

- `./build.cmd runtestsdotnet`
- `./build.cmd runtestsjs`
- `./build.cmd runtestspy`
