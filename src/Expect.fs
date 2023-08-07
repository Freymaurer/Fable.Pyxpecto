namespace Fable.Pytest

open Fable.Core
open Fable.Core.PyInterop
open System

type FocusState =
    | Normal
    | Pending
    | Focused

type TestCase =
    | SyncTest of string * (unit -> unit) * FocusState
    | AsyncTest of string * Async<unit> * FocusState
    | TestList of string * TestCase list
    | TestListSequential of string * TestCase list

[<AutoOpen>]
module Test =
    let testCase name body = SyncTest(name, body, Normal)
    let ptestCase name body = SyncTest(name, body, Pending)
    let ftestCase name body = SyncTest(name, body, Focused)
    let testCaseAsync name body = AsyncTest(name, body, Normal)
    let ptestCaseAsync name body = AsyncTest(name, body, Pending)
    let ftestCaseAsync name body = AsyncTest(name, body, Focused)
    let testList name tests = TestList(name, tests)
    let testSequenced test =
        match test with
        | SyncTest(name, test, state) -> TestListSequential(name, [ SyncTest(name, test, state) ])
        | AsyncTest(name, test, state) ->  TestListSequential(name, [ AsyncTest(name, test, state) ])
        | TestList(name, tests) -> TestListSequential(name, tests)
        | TestListSequential(name, tests) -> TestListSequential(name, tests)

    /// Test case computation expression builder
    type TestCaseBuilder (name: string, focusState: FocusState) =
        member _.Zero () = ()
        member _.Delay fn = fn
        member _.Using (disposable: #IDisposable, fn) = using disposable fn
        member _.While (condition, fn) = while condition() do fn()
        member _.For (sequence, fn) = for i in sequence do fn i
        member _.Combine (fn1, fn2) = fn2(); fn1
        member _.TryFinally (fn, compensation) =
            try fn()
            finally compensation()
        member _.TryWith (fn, catchHandler) =
            try fn()
            with e -> catchHandler e
        member _.Run fn = SyncTest (name, fn, focusState)

    /// Builds a test case
    let inline test name =
        TestCaseBuilder (name, Normal)
    /// Builds a test case that will ignore other unfocused tests
    let inline ftest name =
        TestCaseBuilder (name, Focused)
    /// Builds a test case that will be ignored
    let inline ptest name =
        TestCaseBuilder (name, Pending)

    /// Async test case computation expression builder
    type TestAsyncBuilder (name: string, focusState: FocusState) =
        member _.Zero () = async.Zero ()
        member _.Delay fn = async.Delay fn
        member _.Return x = async.Return x
        member _.ReturnFrom x = async.ReturnFrom x
        member _.Bind (computation, fn) = async.Bind (computation, fn)
        member _.Using (disposable: #IDisposable, fn) = async.Using (disposable, fn)
        member _.While (condition, fn) = async.While (condition, fn)
        member _.For (sequence, fn) = async.For (sequence, fn)
        member _.Combine (fn1, fn2) = async.Combine (fn1, fn2)
        member _.TryFinally (fn, compensation) = async.TryFinally (fn, compensation)
        member _.TryWith (fn, catchHandler) = async.TryWith (fn, catchHandler)
        member _.Run fn = AsyncTest (name, fn, focusState)

    /// Builds an async test case
    let inline testAsync name =
        TestAsyncBuilder (name, Normal)
    /// Builds an async test case that will ignore other unfocused tests
    let inline ftestAsync name =
        TestAsyncBuilder (name, Focused)
    /// Builds an async test case that will be ignored
    let inline ptestAsync name =
        TestAsyncBuilder (name, Pending)

    let failtest msg = failwith msg
    let failtestf fmt msg = failwithf fmt msg

open Fable.Core.Testing

module Expect =

    let inline equal (actual: 'a) (expected: 'a) (message: string) : unit = 
        Assert.AreEqual (actual,expected,message)

module Pytest = 
    //[<Emit("""assert $1 == $2, f$3""")>]
    //abstract member equal: 'a -> 'a -> string -> unit
    let inline it (msg: string) (bool: unit -> unit) : unit = jsNative
        
    let rec private runViaPytest (test: TestCase) =
        match test with
            | SyncTest (msg, test, focus) ->
                match focus with
                | _ -> 
                    it msg test
                //| Normal -> it msg test
                //| Pending -> itSkip msg test
                //| Focused -> itOnly msg test

            //| AsyncTest (msg, test, focus) ->
            //    match focus with
            //    | Normal -> itAsync msg (configureAsyncTest test)
            //    | Pending -> itSkipAsync msg (configureAsyncTest test)
            //    | Focused -> itOnlyAsync msg (configureAsyncTest test)

            | TestList (name, testCases) ->
                testCases
                |> List.iter (runViaPytest)

            //| TestListSequential (name, testCases) ->
            //    describe name <| fun () ->
            //        testCases
            //        |> List.iter (runViaMocha)

    let runViaDotnet (test: TestCase) =
        raise (NotImplementedException("Currently not implemented, use Expecto for now."))
        1

    let rec runTests (test: TestCase) : int=
        #if FABLE_COMPILER_PYTHON
        runViaPytest test
        0 // Shouldn't return error codes for this path
        #else
        runViaDotnet test
        #endif