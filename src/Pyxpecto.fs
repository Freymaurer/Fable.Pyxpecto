﻿namespace Fable.Pyxpecto

open System
open Fable.Core

module Assert =
    open Fable.Core.Testing

    let AreEqual(actual, expected, msg) = 
        #if FABLE_COMPILER
        Assert.AreEqual(actual, expected, msg)
        #else
        actual = expected |> ignore
        #endif

    let NotEqual(actual, expected, msg) = 
        #if FABLE_COMPILER
        Assert.NotEqual(actual, expected, msg)
        #else
        actual <> expected |> ignore
        #endif
 
open Assert

module Model =

    [<AttachMembers>]
    type Stopwatch() =
        member val StartTime: DateTime option = None with get, set
        member val StopTime: DateTime option = None with get, set
        member this.Start() = this.StartTime <- Some DateTime.Now
        member this.Stop() = 
            match this.StartTime with
            | Some _ -> this.StopTime <- Some DateTime.Now
            | None -> failwith "Error. Unable to call `Stop` before `Start`."
        member this.Elapsed : TimeSpan = 
            match this.StartTime, this.StopTime with
            | Some start, Some stop -> stop - start
            | _, _ -> failwith "Error. Unable to call `Elapsed` without calling `Start` and `Stop` before."

    type FocusState =
        | Normal
        | Pending
        | Focused

    type TestCase =
        | SyncTest of string * (unit -> unit) * FocusState
        | AsyncTest of string * Async<unit> * FocusState
        | TestList of string * TestCase list
        | TestListSequential of string * TestCase list

    type AssertException(msg) = inherit Exception(msg) 

    type TestCode =
    | Sync of stest: (unit -> unit)
    | Async of atest: Async<unit>

    type SequenceMethod =
    | Sequential
    | Parallel

    [<AttachMembers>]
    type FlatTest = 
        {
          name          : string list
          test          : TestCode
          focusState    : FocusState
          sequenced     : SequenceMethod
        } 
        static member create(name, test, focusState, sequenceMethod) = {
            name = name
            test = test
            focusState = focusState
            sequenced = sequenceMethod
        }
        member this.fullname = String.concat(" - ") this.name

open Model

type Accuracy = { absolute: float; relative: float }

module Accuracy =
    let inline areCloseLhs a b = abs(a-b)
    let inline areCloseRhs m a b = m.absolute + m.relative * max (abs a) (abs b)
    let inline areClose m a b = areCloseLhs a b <= areCloseRhs m a b
    let low = {absolute=1e-6; relative=1e-3}
    let medium = {absolute=1e-8; relative=1e-5}
    let high = {absolute=1e-10; relative=1e-7}
    let veryHigh = {absolute=1e-12; relative=1e-9}

module CommandLineArguments =

    #if FABLE_COMPILER_PYTHON
    module Python =

        open Fable.Core.PyInterop

        [<ImportAll("sys")>]
        let sys : obj = nativeOnly

        let getArgs() : string [] = 
            !!sys?argv
    #endif

    #if (FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT)
    module NodeJs =
        [<Emit("process.argv")>]
        let getArgs() : string [] = nativeOnly
    #endif

    #if !FABLE_COMPILER
    module NET =
        let getArgs() : string [] = Environment.GetCommandLineArgs()
    #endif

    let getArguments() : string [] =
        let args =
            #if FABLE_COMPILER_PYTHON
            Python.getArgs()
            #endif
            #if (FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT)
            NodeJs.getArgs()
            #endif
            #if !FABLE_COMPILER
            NET.getArgs();
            #endif
        args

module BColors =
    open Fable.Core

    [<Emit("'\x1b[36m'")>]
    let OKCYAN : string = "\x1b[36m"

    [<Emit("'\x1b[32m'")>]
    let OKGREEN : string = "\x1b[32m"

    [<Emit("'\x1b[94m'")>]
    let INFOBLUE : string = "\x1b[94m"

    [<Emit("'\x1b[31m'")>]
    let FAIL : string = "\x1b[31m"

    [<Emit("'\x1b[33m'")>]
    let WARNING : string = "\x1b[33m"

    [<Emit("'\x1b[0m'")>]
    let ENDC : string = "\x1b[0m"

module Helper =
    let expectError (str:string) = AssertException str |> raise 

open Helper

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
        | AsyncTest(name, test, state) -> TestListSequential(name, [ AsyncTest(name, test, state) ])
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

[<RequireQualifiedAccess>]
module Expect =

    let inline equal (actual: 'a) (expected: 'a) msg : unit =
        if actual = expected then
            Assert.AreEqual(actual, expected, msg)
        else
            let errorMsg =
                $"    Expected: {BColors.OKCYAN}{expected}{BColors.ENDC} \n\b    Actual: {BColors.FAIL}{actual}{BColors.ENDC} \n\b    Message: {msg}"

            expectError(errorMsg)
    let notEqual actual expected msg : unit =
        Assert.NotEqual(actual, expected, msg)
    let private isNull' cond =
        match cond with
        | null -> true
        | _ -> false
    let isNull cond = equal (isNull' cond) true
    let isNotNull cond = notEqual (isNull' cond) true
    let isNotNaN cond msg = if Double.IsNaN cond then expectError(msg)
    let isNotInfinity cond msg = if Double.IsInfinity cond then expectError(msg)
    let isTrue cond = equal cond true
    let isFalse cond = equal cond false
    let isZero cond = equal cond 0
    let isEmpty (x: 'a seq) msg = if not (Seq.isEmpty x) then expectError(sprintf "%s. Should be empty." msg)
    let pass() = equal true true "The test passed"
    let passWithMsg (message: string) = equal true true message
    let exists (x: 'a seq) (a: 'a -> bool) msg = if not (Seq.exists a x) then expectError(msg)
    let all (x: 'a seq) (a: 'a -> bool) msg = if not (Seq.forall a x) then expectError(msg)
    /// Expect the passed sequence not to be empty.
    let isNonEmpty (x: 'a seq) msg = if Seq.isEmpty x then expectError(sprintf "%s. Should not be empty." msg)
    /// Expects x to be not null nor empty
    let isNotEmpty (x: 'a seq) msg =
        isNotNull x msg
        isNonEmpty x msg
    /// Expects x to be a sequence of length `number`
    let hasLength x number msg = equal (Seq.length x) number (sprintf "%s. Expected %A to have length %i" msg x number)
    /// Expects x to be Result.Ok
    let isOk x message =
        match x with
        | Ok _ -> passWithMsg message
        | Error x' -> expectError(sprintf "%s. Expected Ok, was Error('%s')." message (string x'))
    /// Expects the value to be a Result.Ok value and returns it or fails the test
    let wantOk x message =
        match x with
        | Ok x' ->
            passWithMsg message
            x'
        | Error x' -> expectError(sprintf "%s. Expected Ok, was Error('%A')." message x')
    let stringContains (subject: string) (substring: string) message =
        if not (subject.Contains(substring))
        then expectError(sprintf "%s. Expected subject string '%s' to contain substring '%s'." message subject substring)
        else passWithMsg message

    /// Expects x to be Result.Error
    let isError x message =
        match x with
        | Error _ -> passWithMsg message
        | Ok x' -> expectError(sprintf "%s. Expected Error _, was Ok(%A)." message x')
    let isSome x message =
        match x with
        | Some _ -> passWithMsg message
        | None -> expectError(sprintf "%s. Expected Some _, was None." message)
    /// Expects the value to be a Some x value and returns x or fails the test
    let wantSome x message =
        match x with
        | Some x' ->
            passWithMsg message
            x'
        | None -> expectError(sprintf "%s. Expected Some _, was None." message)
    /// Expects the value to be a Result.Error value and returns it or fails the test
    let wantError (x: Result<'a, 'b>) (message: string) =
        match x with
        | Error value ->
            passWithMsg message
            value
        | Ok value -> expectError(sprintf "%s. Expected Error _, was Ok(%A)." message value)
    let isNone x message =
        match x with
        | None -> passWithMsg message
        | Some x' -> expectError(sprintf "%s. Expected None, was Some(%A)." message x')
    let private throws' f =
        try f ()
            None
        with exn ->
            Some exn
    /// Expects the passed function to throw an exception
    let throws f msg =
        match throws' f with
        | None -> expectError(sprintf "%s. Expected f to throw." msg)
        | Some _ -> ()
    /// Expects the passed function to throw, then calls `cont` with the exception
    let throwsC f cont =
        match throws' f with
        | None -> expectError(sprintf "Expected f to throw.")
        | Some exn -> cont exn

    /// Expects the `actual` sequence to contain all elements from `expected`
    /// It doesn't take into account the number of occurrences and the order of elements.
    /// Calling this function will enumerate both sequences; they have to be finite.
    let containsAll (actual : _ seq) (expected : _ seq) message =
        let actualEls, expectedEls = List.ofSeq actual, List.ofSeq expected
        let matchingEls =
            actualEls
            |> List.filter (fun a -> expectedEls |> List.contains a)

        let extraEls =
            actualEls
            |> List.filter (fun a -> not (matchingEls |> List.contains a))
        let missingEls =
            expectedEls
            |> List.filter (fun e -> not (matchingEls |> List.contains e))

        if List.isEmpty missingEls then
            ()
        else
            sprintf
                "%s. Sequence `actual` does not contain all `expected` elements. Missing elements from `actual`: %A. Extra elements in `actual`: %A"
                message
                missingEls
                extraEls
            |> expectError

    /// Expects `actual` and `expected` (that are both floats) to be within a
    /// given `accuracy`.
    let floatClose accuracy actual expected message =
        if Double.IsInfinity actual then
            sprintf "%s. Expected actual to not be infinity, but it was." message
            |> expectError
        elif Double.IsInfinity expected then
            sprintf "%s. Expected expected to not be infinity, but it was." message
            |> expectError
        elif Accuracy.areClose accuracy actual expected |> not then
            sprintf "%s. Expected difference to be less than %.20g for accuracy {absolute=%.20g; relative=%.20g}, but was %.20g. actual=%.20g expected=%.20g"
                message 
                (Accuracy.areCloseRhs accuracy actual expected)
                accuracy.absolute accuracy.relative
                (Accuracy.areCloseLhs actual expected)
                actual expected
            |> expectError

    /// Expects `actual` to be less than `expected` or to be within a
    /// given `accuracy`.
    let floatLessThanOrClose accuracy actual expected message =
        if actual>expected then floatClose accuracy actual expected message

    /// Expects `actual` to be greater than `expected` or to be within a
    /// given `accuracy`.
    let floatGreaterThanOrClose accuracy actual expected message =
        if actual<expected then floatClose accuracy actual expected message

module Pyxpecto =

    /// Flattens a tree of tests
    let flattenTests test =
        let rec loop parentName testList sequenced test =
            match test with
            | TestCase.SyncTest (name, test, state) ->
                FlatTest.create(
                    parentName@[name],
                    TestCode.Sync test,
                    state,
                    sequenced
                ) :: testList
            | TestCase.AsyncTest (name, test, state) ->
                FlatTest.create(
                    parentName@[name],
                    TestCode.Async test,
                    state,
                    sequenced
                ) :: testList
            | TestList (name, tests) -> 
                let names = parentName @ [name]
                tests |> List.collect (loop names testList sequenced) 
            | TestListSequential (name, tests) -> 
                let names = parentName @ [name]
                tests |> List.collect (loop names testList SequenceMethod.Sequential) 
        loop [] [] SequenceMethod.Parallel test

    [<AttachMembersAttribute>]
    type CustomTestRunner(test:TestCase) =

        let flatTests = flattenTests test
        let hasFocused = flatTests |> List.exists (fun ft -> ft.focusState = FocusState.Focused)
        let args = CommandLineArguments.getArguments()
        let testPrint = printfn "%A" args
        ///// If the flag '--fail-on-focused-tests' is given to py command AND focused tests exist it will fail.
        //let verifyFocusedAllowed =
        //    let args = PyBindings.cmd_args
        //    let failOnFocusedTestsArg = @"--fail-on-focused-tests" 
        //    if Array.contains failOnFocusedTestsArg args && hasFocused then failwith $"{BColors.FAIL}Cannot run focused tests with '{failOnFocusedTestsArg}' commandline arg.{BColors.ENDC}"

        member val SuccessfulTests = ref 0 with get, set
        member val FailedTests = ref 0 with get, set
        member val IgnoredTests = ref 0 with get, set
        member val ErrorTests = ref 0 with get, set
        member val HasFocused = hasFocused with get
        member val ErrorMessages = ResizeArray() with get, set
        member val FlatTests = flatTests with get

        member this.SumTests
            with get() = this.SuccessfulTests.Value + this.FailedTests.Value + this.ErrorTests.Value

        member private this.printSuccessMsg (name: string) (runtime: TimeSpan option) = 
            let focused = if this.HasFocused then "💎 | " else ""
            this.SuccessfulTests.Value <- this.SuccessfulTests.Value + 1
            let timespan = if runtime.IsSome then $" ({runtime.Value.ToString()})" else ""
            printfn $"{focused}✔️ {name}{timespan}" 

        member private this.printErrorMsg (name: string) (msg: string) (isTrueError: bool)= 
            this.ErrorMessages.Add(name, msg)
            let focused = if this.HasFocused then "💎 | " else ""
            let errorAgainstFailHandling = 
                if isTrueError then 
                    this.ErrorTests.Value <- this.ErrorTests.Value + 1
                    "❌" 
                else 
                    this.FailedTests.Value <- this.FailedTests.Value + 1
                    "🚫"
            printfn $"{focused}{errorAgainstFailHandling} {name}\n\b{msg}" 

        member private this.printSkipPendingMsg (name: string) = printfn "🚧 skipping '%s' ... pending" name

        member this.RunTest(test : FlatTest) =
            let name = test.fullname
            async {
                match test.test with
                | Sync body ->
                    try 
                        body()
                        this.printSuccessMsg name None
                    with
                        | :? AssertException as exn ->
                            this.printErrorMsg name exn.Message false
                        | e ->
                            this.printErrorMsg name e.Message true
                | Async body ->
                    try 
                        let stopwatch = new Stopwatch()
                        stopwatch.Start()
                        do! body
                        stopwatch.Stop()
                        this.printSuccessMsg name (Some stopwatch.Elapsed)
                    with
                        | :? AssertException as exn ->
                            this.printErrorMsg name exn.Message false
                        | e ->
                            this.printErrorMsg name e.Message true
            }

        member this.SkipPendingTest(name) =
            this.IgnoredTests.Value <- this.IgnoredTests.Value + 1
            this.printSkipPendingMsg name

        member this.SkipUnfocusedTest() =
            this.IgnoredTests.Value <- this.IgnoredTests.Value + 1

    let private start (asyncobj: Async<'a>) =

        #if FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT
        asyncobj |> Async.StartAsPromise
        #endif
        #if !FABLE_COMPILER_JAVASCRIPT && !FABLE_COMPILER_TYPESCRIPT
        asyncobj |> Async.RunSynchronously
        #endif

    let private sortTests (runner: CustomTestRunner) = 
        runner.FlatTests
        |> List.fold(fun (runTests, pendingTests, unfocusedTests) (ft: FlatTest) ->
            match ft with
            | { focusState = focus; sequenced = sequencedMethod } ->
                match runner.HasFocused, focus with
                | false, Normal -> 
                    ft::runTests,  pendingTests, unfocusedTests
                | false, Pending -> 
                    runTests, ft::pendingTests, unfocusedTests
                | true, Focused -> 
                    ft::runTests,  pendingTests, unfocusedTests
                | _,_ -> 
                    runTests, pendingTests, ft::unfocusedTests
        ) ([],[],[])
        |> fun (b,c,d) -> List.rev b, List.rev c, List.rev d

    let rec private runViaPy (tests: TestCase) =
        let runner = CustomTestRunner(tests)
        let run (runner: CustomTestRunner) =
            let runTests, pendingTests, unfocusedTests = sortTests runner
            async {
                for ft in pendingTests do
                    runner.SkipPendingTest ft.fullname
                for _ in unfocusedTests do
                    runner.SkipUnfocusedTest()
                for ft in runTests do
                    do! runner.RunTest(ft)
            }
        // enable emoji support for .NET
        #if !FABLE_COMPILER
        System.Console.OutputEncoding <- System.Text.Encoding.UTF8
        #endif
        printfn "🚀 start running tests ..."
        async {
            do! run runner
            let innerMsgString = $"""{BColors.INFOBLUE}{runner.SumTests}{BColors.ENDC} tests run - {BColors.INFOBLUE}{runner.SuccessfulTests.Value}{BColors.ENDC} passed, {BColors.INFOBLUE}{runner.IgnoredTests.Value}{BColors.ENDC} ignored, {BColors.INFOBLUE}{runner.FailedTests.Value}{BColors.ENDC} failed, {BColors.INFOBLUE}{runner.ErrorTests.Value}{BColors.ENDC} errored"""
            let sep = "-------------------------------------------------------------------------------"
            let sb = System.Text.StringBuilder()
            sb.AppendLine() |> ignore
            for i in 1 .. runner.ErrorMessages.Count do
                let name, msg = runner.ErrorMessages.[i-1]
                sb.AppendLine $"{BColors.FAIL}{i}) {name}{BColors.ENDC}\n\b{msg}" |> ignore
            sb.AppendLine() |> ignore
            let msg = sb.AppendLine(sep).AppendLine(innerMsgString).AppendLine(sep).ToString()
            printfn "%s" msg
            match runner.ErrorTests.Value, runner.FailedTests.Value with
            | errors,_ when errors > 0 ->
                Exception($"{BColors.FAIL}❌ Exited with error code 2{BColors.ENDC}") |> printfn "%A"
                return 2
            | _,failed when failed > 0 ->
                Exception($"{BColors.FAIL}❌ Exited with error code 1{BColors.ENDC}") |> printfn "%A"
                return 1
            | _ ->
                printfn $"{BColors.OKGREEN}Success!{BColors.ENDC}"
                return 0
        }

    // This is possibly the most magic
    #if !FABLE_COMPILER_JAVASCRIPT && !FABLE_COMPILER_TYPESCRIPT
    let (!!) (any: 'a) = any
    #endif
    #if FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT
    open Fable.Core.JsInterop
    #endif

    let rec runTests (test: TestCase) = 
        let r = runViaPy test |> start
        !!r