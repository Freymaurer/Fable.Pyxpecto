# Fable.Pyxpecto



| Latest | Prerelease | Downloads |
|----------------|---------|-----------|
| <a href="https://www.nuget.org/packages/Fable.Pyxpecto">![Nuget](https://img.shields.io/nuget/v/Fable.Pyxpecto?logo=nuget)</a>|<a href="https://www.nuget.org/packages/Fable.Pyxpecto/absoluteLatest">![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/Fable.Pyxpecto?logo=nuget)</a>|![Nuget](https://img.shields.io/nuget/dt/Fable.Pyxpecto?label=downloads)|

> This repository is heavily inspired by [Fable.Mocha](https://github.com/Zaid-Ajaj/Fable.Mocha/) by the awesome [@Zaid-Ajaj](https://github.com/Zaid-Ajaj).

Inspired by the popular Expecto library for F# and adopts the testList, testCase and testCaseAsync primitives for defining tests.

Fable.Pyxpecto can be used to run tests in **Python**, **JavaScript**, **TypeScript** and **.NET**! Or use compiler statements to switch between Pyxpecto and keep using Fable.Mocha and Expecto!

![pyxpecto](https://github.com/Freymaurer/Fable.Pyxpecto/assets/39732517/c5d09db3-8f63-4372-8655-6330c8a00af1)

**Table of Contents**
- [Features](#features)
  - [Reuse Expecto/Fable.Mocha Tests](#reuse-expectofablemocha-tests)
  - [Pending](#pending)
  - [Focused](#focused)
  - [Sequential Tests](#sequential-tests)
  - [Command Line Args](#command-line-arguments)
- [Install](#install)
- [Run Tests](#running-tests)
  - [Pyxpecto Only](#language-agnostic)
  - [With Fable.Mocha and Expecto](#with-mocha-and-expecto)
- [Development](#development)


## Features

### Reuse Expecto/Fable.Mocha Tests

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
### Pending

Pending tests will not be run, but displayed as "skipped".

```fsharp
ptestCase "skipping this one" <| fun _ ->
    failwith "Shouldn't be running this test"

ptestCaseAsync "skipping this one async" <|
    async {
        failwith "Shouldn't be running this test"
    }
```

### Focused

If there are any focused tests all other tests will not be run and are displayed as "skipped".

> 👀 Passing the `--fail-on-focused-tests` command line argument will make the runner fail if focused tests exist. This is used to avoid passing CI chains, when accidently pushing focused tests.
>
> Example `py my_focused_tests_file.py --fail-on-focused-tests` will fail.

```fsharp
let focusedTestsCases =
    testList "Focused" [
        ftestCase "Focused sync test" <| fun _ ->
            Expect.equal (1 + 1) 2 "Should be equal"
        ftestCaseAsync "Focused async test" <|
            async {
                Expect.equal (1 + 1) 2 "Should be equal"
            }
    ]
```

### Sequential Tests

Actually all tests run with this library will be sequential. The function is only added to comply with Expecto syntax.

💬 Help wanted. I currently have a prototype implementation for parallel tests on a branch. But it breaks collecting run-tests in .NET.

### Command Line Arguments

Running any py/ts/js/net code from pyxpecto can be customized with flags:

```
Fable.Pyxtpecto (F#)
Author: Kevin Frey

Usage:
  (python/node/npx ts-node/dotnet run) <path_to_entrypoint> [options]

Options:
  --fail-on-focused-tests       Will exit with ExitCode 4 if run with this argument 
                                and focused tests are found.
  --silent                      Only start and result print. No print for each test.

```

These can also be given via: 

```fsharp
[<EntryPoint>]
let main argv = 
    !!Pyxpecto.runTests [|
        ConfigArg.FailOnFocused
        ConfigArg.Silent
    |] all
```

## Install

From [Nuget](https://www.nuget.org/packages/Fable.Pyxpecto) with:

- `paket add Fable.Pyxpecto`
- `<PackageReference Include="Fable.Pyxpecto" Version="0.0.0" />`

## Running tests

### Language Agnostic

Fable.Pyxpecto does not use any dependencies and tries to support as many fable languages as possible. 
Check out the [multitarget test project](./tests/Multitarget.Tests) to see it fully set up!

```fsharp
open Fable.Pyxpecto

// This is possibly the most magic used to make this work. 
// Js and ts cannot use `Async.RunSynchronously`, instead they use `Async.StartAsPromise`.
// Here we need the transpiler not to worry about the output type.
#if !FABLE_COMPILER_JAVASCRIPT && !FABLE_COMPILER_TYPESCRIPT
let (!!) (any: 'a) = any
#endif
#if FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT
open Fable.Core.JsInterop
#endif

[<EntryPoint>]
let main argv = !!Pyxpecto.runTests [||] all
```

Then run it using:

- **.NET**: `dotnet run`
- **JavaScript**: 
  - `dotnet fable {rootPath} -o {rootPath}/{js_folder_name}`
  - `node {rootPath}/{js_folder_name}/Main.js`
  - *Requirements*:
    - nodejs installed. 
    - package.json with `"type": "module"`.
    - init with `npm init`.
    - See: [package.json](./package.json).
- **TypeScript**:
  - `dotnet fable {rootPath} --lang ts -o {rootPath}/{ts_folder_name}`
  - `npx ts-node {rootPath}/{ts_folder_name}/Main.ts`
  - *Requirements*: 
    - possible same as JavaScript.
    - Require tsconfig file, see: [tsconfig.json](./tsconfig.json). (💬 Help wanted)
- **Python**:
  - `dotnet fable {rootPath} --lang py -o {rootPath}/{py_folder_name}`
  - `python {rootPath}/{py_folder_name}/main.py`
  - *Requirements*: 
    - python executable on your PATH, or replace `python` with `path/to/python.exe`.

### With Mocha and Expecto

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
    Pyxpecto.runTests [||] all
    #endif
    #if FABLE_COMPILER_JAVASCRIPT
    Mocha.runTests all
    #endif
    #if !FABLE_COMPILER
    Tests.runTestsWithCLIArgs [] [||] all
    #endif
```

⚠️ If you want to use Pyxpecto in combination with Fable.Mocha you need to conditionally set Fable.Mocha dependency as shown below. Without this fable will try to transpile Fable.Mocha to python, which will result in errors.

```xml
<!-- .fsproj file-->
<PackageReference Condition="'$(FABLE_COMPILER_JAVASCRIPT)' == 'true'" Include="Fable.Mocha" Version="2.17.0" />
```

> 👀 Everything in curly braces are placeholders

1. Transpile test project to python `dotnet fable {path/to/tests} --lang py -o {path/to/tests}/py`
2. Run tests `python {path/to/tests}/{EntryFileName.py}`

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

> Switch test project
- `./build.cmd runtestsdotnet`
- `./build.cmd runtestsjs`
- `./build.cmd runtestspy`

> Multitarget test project
- `./build.cmd runmtpy`
- `./build.cmd runmtjs`
- `./build.cmd runmtts`
- `./build.cmd runmtnet`
