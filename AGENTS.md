# Agent Guide

## Intention and library design

This library is designed to build a F# Fable transpiler compatible unit test runner. It is designed to target multiple Fable targets.

## Test and validation commands

Run from repository root (`/home/runner/work/Fable.Pyxpecto/Fable.Pyxpecto`):

- `dotnet tool restore`
- `npm install`
- `dotnet build Fable.Pyxpecto.sln -c Release`
- `dotnet test Fable.Pyxpecto.sln -c Release --no-build`

Build script entrypoints:

- `./build.sh runtests`
- `./build.sh runtestsdotnet`
- `./build.sh runtestsjs`
- `./build.sh runtestspy`
- `./build.sh runmtnet`
- `./build.sh runmtjs`
- `./build.sh runmtts`
- `./build.sh runmtpy`

> Note: build script test targets rely on `uv` being available on PATH.

## Code structure overview

- `src/Prelude.fs`: terminal colors and transpiler helper operator.
- `src/Model.fs`: domain types (`TestCase`, `FlatTest`, `FocusState`), `Accuracy`, and shared failure helpers.
- `src/Assert.fs`: low-level equality and diff formatting assertions.
- `src/CommandLine.fs`: runtime argument and process-exit abstraction for .NET, Python, JS/TS.
- `src/TestDsl.fs`: test/list constructors and computation expression builders (`test`, `testAsync`, focused/pending variants).
- `src/Expect.fs`: user-facing expectation helpers.
- `src/Suspect.fs`: Pyxpecto-specific assertion helpers.
- `src/Config.fs`: runtime language/config argument parsing and typed config.
- `src/PyxpectoRunner.fs`: test flattening, execution engine, reporting, and `runTests` entrypoints.

Support areas:

- `tests/Mocha.Tests`: switchable tests for Expecto/Mocha/Pyxpecto usage.
- `tests/Multitarget.Tests`: language-agnostic multi-target test suite.
- `build/`: FAKE build orchestration for compile/test routines.
