namespace Fable.Pyxpecto

open System
open Fable.Core.Testing
open Fable.Core

type FocusState =
    | Normal
    | Pending
    | Focused

type TestCase =
    | SyncTest of string * (unit -> unit) * FocusState
    | AsyncTest of string * Async<unit> * FocusState
    | TestList of string * TestCase list
    | TestListSequential of string * TestCase list

type Accuracy = { absolute: float; relative: float }

module Accuracy =
    let inline areCloseLhs a b = abs(a-b)
    let inline areCloseRhs m a b = m.absolute + m.relative * max (abs a) (abs b)
    let inline areClose m a b = areCloseLhs a b <= areCloseRhs m a b
    let low = {absolute=1e-6; relative=1e-3}
    let medium = {absolute=1e-8; relative=1e-5}
    let high = {absolute=1e-10; relative=1e-7}
    let veryHigh = {absolute=1e-12; relative=1e-9}

module BColors =
    open Fable.Core

    [<Emit("'\\033[96m'")>]
    let OKCYAN : string = ""

    [<Emit("'\\033[92m'")>]
    let OKGREEN : string = ""

    [<Emit("'\\033[36m'")>]
    let INFOBLUE : string = ""

    [<Emit("'\\033[91m'")>]
    let FAIL : string = ""

    [<Emit("'\\033[93m'")>]
    let WARNING : string = ""

    [<Emit("'\\033[0m'")>]
    let ENDC : string = ""

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

[<RequireQualifiedAccess>]
module Expect =

    let inline equal (actual: 'a) (expected: 'a) msg : unit =
        if actual = expected then
            Assert.AreEqual(actual, expected, msg)
        else
            let errorMsg =
                $"    Expected: {BColors.OKCYAN}{expected}{BColors.ENDC} \n\b    Actual: {BColors.FAIL}{actual}{BColors.ENDC} \n\b    Message: {msg}"

            raise (Exception(errorMsg))
    let notEqual actual expected msg : unit =
        Assert.NotEqual(actual, expected, msg)
    let private isNull' cond =
        match cond with
        | null -> true
        | _ -> false
    let isNull cond = equal (isNull' cond) true
    let isNotNull cond = notEqual (isNull' cond) true
    let isNotNaN cond msg = if Double.IsNaN cond then failwith msg
    let isNotInfinity cond msg = if Double.IsInfinity cond then failwith msg
    let isTrue cond = equal cond true
    let isFalse cond = equal cond false
    let isZero cond = equal cond 0
    let isEmpty (x: 'a seq) msg = if not (Seq.isEmpty x) then failwithf "%s. Should be empty." msg
    let pass() = equal true true "The test passed"
    let passWithMsg (message: string) = equal true true message
    let exists (x: 'a seq) (a: 'a -> bool) msg = if not (Seq.exists a x) then failwith msg
    let all (x: 'a seq) (a: 'a -> bool) msg = if not (Seq.forall a x) then failwith msg
    /// Expect the passed sequence not to be empty.
    let isNonEmpty (x: 'a seq) msg = if Seq.isEmpty x then failwithf "%s. Should not be empty." msg
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
        | Error x' -> failwithf "%s. Expected Ok, was Error(\"%A\")." message x'
    /// Expects the value to be a Result.Ok value and returns it or fails the test
    let wantOk x message =
        match x with
        | Ok x' ->
            passWithMsg message
            x'
        | Error x' -> failwithf "%s. Expected Ok, was Error(\"%A\")." message x'
    let stringContains (subject: string) (substring: string) message =
        if not (subject.Contains(substring))
        then failwithf "%s. Expected subject string '%s' to contain substring '%s'." message subject substring
        else passWithMsg message

    /// Expects x to be Result.Error
    let isError x message =
        match x with
        | Error _ -> passWithMsg message
        | Ok x' -> failwithf "%s. Expected Error _, was Ok(%A)." message x'
    let isSome x message =
        match x with
        | Some _ -> passWithMsg message
        | None -> failwithf "%s. Expected Some _, was None." message
    /// Expects the value to be a Some x value and returns x or fails the test
    let wantSome x message =
        match x with
        | Some x' ->
            passWithMsg message
            x'
        | None -> failwithf "%s. Expected Some _, was None." message
    /// Expects the value to be a Result.Error value and returns it or fails the test
    let wantError (x: Result<'a, 'b>) (message: string) =
        match x with
        | Error value ->
            passWithMsg message
            value
        | Ok value -> failwithf "%s. Expected Error _, was Ok(%A)." message value
    let isNone x message =
        match x with
        | None -> passWithMsg message
        | Some x' -> failwithf "%s. Expected None, was Some(%A)." message x'
    let private throws' f =
        try f ()
            None
        with exn ->
            Some exn
    /// Expects the passed function to throw an exception
    let throws f msg =
        match throws' f with
        | None -> failwithf "%s. Expected f to throw." msg
        | Some _ -> ()
    /// Expects the passed function to throw, then calls `cont` with the exception
    let throwsC f cont =
        match throws' f with
        | None -> failwithf "Expected f to throw."
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
            |> failtest

    /// Expects `actual` and `expected` (that are both floats) to be within a
    /// given `accuracy`.
    let floatClose accuracy actual expected message =
        if Double.IsInfinity actual then
            failtestf "%s. Expected actual to not be infinity, but it was." message
        elif Double.IsInfinity expected then
            failtestf "%s. Expected expected to not be infinity, but it was." message
        elif Accuracy.areClose accuracy actual expected |> not then
            failtestf
                "%s. Expected difference to be less than %.20g for accuracy {absolute=%.20g; relative=%.20g}, but was %.20g. actual=%.20g expected=%.20g"
                message (Accuracy.areCloseRhs accuracy actual expected)
                accuracy.absolute accuracy.relative
                (Accuracy.areCloseLhs actual expected)
                actual expected

    /// Expects `actual` to be less than `expected` or to be within a
    /// given `accuracy`.
    let floatLessThanOrClose accuracy actual expected message =
        if actual>expected then floatClose accuracy actual expected message

    /// Expects `actual` to be greater than `expected` or to be within a
    /// given `accuracy`.
    let floatGreaterThanOrClose accuracy actual expected message =
        if actual<expected then floatClose accuracy actual expected message

module Pyxpecto =
    let rec isFocused (test: TestCase ) =
        match test with
        | SyncTest(_,_,Focused) -> true
        | AsyncTest(_,_,Focused) -> true
        | TestList(_,tests) -> List.exists isFocused tests
        | TestListSequential(_, tests) -> List.exists isFocused tests
        | _ -> false

    let rec private flattenTests lastName = function
        | SyncTest(name, test, state) ->
            let modifiedName = if String.IsNullOrWhiteSpace lastName then name else sprintf "%s - %s" lastName name
            [ SyncTest(modifiedName, test, state) ]

        | AsyncTest(name, test, state) ->
            let modifiedName = if String.IsNullOrWhiteSpace lastName then name else sprintf "%s - %s" lastName name
            [ AsyncTest(modifiedName, test, state) ]

        | TestList (name, tests) ->
            [ for test in tests do yield! flattenTests name test ]

        | TestListSequential (name, tests) ->
            [ for test in tests do yield! flattenTests name test ]

    let checkFocused (test: TestCase) = 
        let mutable hasFocused: bool = false
        let rec loop = function
            | AsyncTest (_, _, Focused) | SyncTest(_, _, Focused) ->
                hasFocused <- true

            | AsyncTest(_,_,_) | SyncTest(_,_,_) -> ()

            | TestListSequential (_,tests) | TestList (_,tests) ->
                for test in tests do loop test 
        loop test
        hasFocused

    module PyBindings =
        #if !FABLE_COMPILER_PYTHON
        open Fable.Core.JsInterop
        #else
        open Fable.Core.PyInterop
        #endif

        [<ImportAll("sys")>]
        let sys : obj = nativeOnly

        let cmd_args : string [] = sys?argv

    [<AttachMembersAttribute>]
    type CustomTestRunner(test:TestCase) =

        let hasFocused = checkFocused test

        /// If the flag '--fail-on-focused-tests' is given to py command AND focused tests exist it will fail.
        let verifyFocusedAllowed =
            let args = PyBindings.cmd_args
            let failOnFocusedTestsArg = @"--fail-on-focused-tests" 
            if Array.contains failOnFocusedTestsArg args && hasFocused then failwith $"{BColors.FAIL}Cannot run focused tests with '{failOnFocusedTestsArg}' commandline arg.{BColors.ENDC}"

        member val SuccessfulTests = 0 with get, set
        member val FailedTests = 0 with get, set
        member val IgnoredTests = 0 with get, set
        member val HasFocused = hasFocused with get
        member val ErrorMessages = ResizeArray() with get, set

        member this.SumTests
            with get() = this.SuccessfulTests + this.FailedTests

        member private this.printSuccessMsg (name: string) = 
            let focused = if this.HasFocused then "💎 | " else ""
            printfn $"{focused}✔️ {name}" 
        member private this.printErrorMsg (name: string) (msg: string) = 
            this.ErrorMessages.Add(name, msg)
            let focused = if this.HasFocused then "💎 | " else ""
            printfn $"{focused}❌ {name}\n\b{msg}" 
        member private this.printSkipPendingMsg (name: string) = printfn "🚧 skipping '%s' due to it being marked as pending" name

        member this.RunSyncTest(name: string, body: unit -> unit) = 
            try 
                body()
                this.SuccessfulTests <- this.SuccessfulTests + 1
                this.printSuccessMsg name
            with
                | e -> 
                    this.FailedTests <- this.FailedTests + 1
                    this.printErrorMsg name e.Message
                    
        member this.RunAsyncTest(name, body: Async<unit>) =
            try
                async {
                    do! body
                    this.SuccessfulTests <- this.SuccessfulTests + 1
                    this.printSuccessMsg name
                }
                |> Async.RunSynchronously
            with
                | e ->
                    this.FailedTests <- this.FailedTests + 1
                    this.printErrorMsg name e.Message

        member this.SkipPendingTest(name) =
            this.IgnoredTests <- this.IgnoredTests + 1
            this.printSkipPendingMsg name

        member this.SkipUnfocusedTest() =
            this.IgnoredTests <- this.IgnoredTests + 1

    let rec private runViaPy (test: TestCase) =
        let runner = CustomTestRunner(test)
        let rec run (runner: CustomTestRunner) (test: TestCase) =
            match test with
                | SyncTest (name: string, test, focus) ->
                    match runner.HasFocused, focus with
                    | false, Normal -> runner.RunSyncTest(name,test) 
                    | false, Pending -> runner.SkipPendingTest name
                    | true, Focused -> runner.RunSyncTest(name,test) 
                    | _,_ -> runner.SkipUnfocusedTest()

                | AsyncTest (name, test, focus) ->
                    match runner.HasFocused, focus with
                    | false, Normal -> runner.RunAsyncTest(name, test)
                    | false, Pending -> runner.SkipPendingTest name
                    | true, Focused -> runner.RunAsyncTest(name, test)
                    | _,_ -> runner.SkipUnfocusedTest()

                | TestListSequential (name, testCases) | TestList (name, testCases) ->
                    testCases
                    |> List.collect (fun t -> flattenTests name t)
                    |> List.iter (run runner)
        printfn "🚀 start running tests ..."
        run runner test
        let innerMsgString = $"""{BColors.INFOBLUE}{runner.SumTests}{BColors.ENDC} tests run - {BColors.OKGREEN}{runner.SuccessfulTests}{BColors.ENDC} passed, {BColors.INFOBLUE}{runner.IgnoredTests}{BColors.ENDC} ignored, {BColors.FAIL}{runner.FailedTests}{BColors.ENDC} failed"""
        let sep = "-------------------------------------------------------------------------------"
        let sb = System.Text.StringBuilder()
        sb.AppendLine() |> ignore
        for i in 1 .. runner.ErrorMessages.Count do
            let name, msg = runner.ErrorMessages.[i-1]
            sb.AppendLine $"{BColors.FAIL}{i}) {name}{BColors.ENDC}\n\b{msg}" |> ignore
        sb.AppendLine() |> ignore
        let msg = sb.AppendLine(sep).AppendLine(innerMsgString).AppendLine(sep).ToString()
        printfn "%s" msg
        match runner.FailedTests with
        | 1 ->
            Exception($"{BColors.FAIL}{runner.FailedTests} test failed!{BColors.ENDC}") |> raise
            1
        | failedTests when failedTests > 1 ->
            Exception($"{BColors.FAIL}{failedTests} tests failed!{BColors.ENDC}") |> raise
            1
        | _ ->
            printfn $"{BColors.OKGREEN}Success!{BColors.ENDC}"
            0

    let private runViaDotnet (test: TestCase) =
        raise (NotImplementedException("Currently not implemented, use Expecto for now."))
        1

    let rec runTests (test: TestCase) : int=
        #if FABLE_COMPILER
        runViaPy test
        #else
        runViaDotnet test
        #endif