namespace Fable.Pyxpecto

open System
open Fable.Core
open Model
open TranspilerHelper

#if FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT
open Fable.Core.JsInterop
#endif

module Pyxpecto =
    module Util =
        /// Flattens a tree of tests
        let flattenTests test =
            // if listState <> Normal then propagate list state, e.g. focused or pending
            let getPrioritisedState testState listState =
                match listState with
                | Focused
                | Pending -> listState
                | _ -> testState

            let rec loop parentName testList sequenced (listState: FocusState) test =
                match test with
                | TestCase.SyncTest(name, test, state0) ->
                    let state = getPrioritisedState state0 listState
                    FlatTest.create(parentName @ [ name ], TestCode.Sync test, state, sequenced) :: testList
                | TestCase.AsyncTest(name, test, state0) ->
                    let state = getPrioritisedState state0 listState
                    FlatTest.create(parentName @ [ name ], TestCode.Async test, state, sequenced) :: testList
                | TestList(name, tests, state) ->
                    let names = parentName @ [ name ]
                    tests |> List.collect (loop names testList sequenced state)
                | TestListSequential(name, tests, state) ->
                    let names = parentName @ [ name ]
                    tests |> List.collect (loop names testList SequenceMethod.Sequential state)

            loop [] [] SequenceMethod.Parallel FocusState.Normal test

        [<AttachMembersAttribute>]
        type CustomTestRunner(test: TestCase, ?configArgs: ConfigArg[]) =
            let flatTests = flattenTests test
            let hasFocused = flatTests |> List.exists (fun ft -> ft.focusState = FocusState.Focused)
            let args = CommandLine.getArguments ()
            let codeArgs = defaultArg configArgs [||]
            let _config = Array.append codeArgs (ConfigArg.fromStrings args) |> Config

            /// If the flag '--fail-on-focused-tests' is given to command AND focused tests exist it will fail.
            let verifyFocusedAllowed =
                if _config.FailOnFocused && hasFocused then
                    printfn
                        $"{BColors.FAIL}Cannot run focused tests with '{ConfigArgLiterals.FailOnFocused}' commandline arg.{BColors.ENDC}"

                    CommandLine.exitWith (4)

            member val Language = Language.get () with get
            member val Config = _config with get
            member val SuccessfulTests = ref 0 with get, set
            member val FailedTests = ref 0 with get, set
            member val IgnoredTests = ref 0 with get, set
            member val ErrorTests = ref 0 with get, set
            member val HasFocused = hasFocused with get
            member val ErrorMessages = ResizeArray() with get, set
            member val FlatTests = flatTests with get

            member this.SumTests
                with get () = this.SuccessfulTests.Value + this.FailedTests.Value + this.ErrorTests.Value

            member private this.printSuccessMsg (name: string) (runtime: TimeSpan option) =
                this.SuccessfulTests.Value <- this.SuccessfulTests.Value + 1

                if not this.Config.Silent then
                    let focused = if this.HasFocused then "💎 | " else ""
                    let timespan = if runtime.IsSome then $" ({runtime.Value.ToString()})" else ""
                    System.Console.WriteLine $"{focused}✔️ {name}{timespan}"

            member private this.printErrorMsg (name: string) (msg: string) (isTrueError: bool) =
                this.ErrorMessages.Add(name, msg)

                let errorAgainstFailHandling =
                    if isTrueError then
                        this.ErrorTests.Value <- this.ErrorTests.Value + 1
                        "❌"
                    else
                        this.FailedTests.Value <- this.FailedTests.Value + 1
                        "🚫"

                if not this.Config.Silent then
                    let focused = if this.HasFocused then "💎 | " else ""
                    System.Console.WriteLine $"{focused}{errorAgainstFailHandling} {name}\n\b{msg}"

            member private this.printSkipPendingMsg (name: string) =
                if not this.Config.Silent then
                    System.Console.WriteLine(sprintf "🚧 skipping '%s' ... pending" name)

            member this.RunTest(test: FlatTest) =
                let name = test.fullname

                async {
                    match test.test with
                    | Sync body ->
                        try
                            body ()
                            this.printSuccessMsg name None
                        with
                        | :? AssertException as exn ->
                            this.printErrorMsg name exn.Message false
                        | e ->
                            this.printErrorMsg name e.Message true
                    | Async body ->
                        try
                            let stopwatch = Stopwatch()
                            stopwatch.Start ()
                            do! body
                            stopwatch.Stop ()
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

        let start (asyncobj: Async<'a>) =
            #if FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT
            asyncobj |> Async.StartAsPromise
            #endif
            #if !FABLE_COMPILER_JAVASCRIPT && !FABLE_COMPILER_TYPESCRIPT
            asyncobj |> Async.RunSynchronously
            #endif

        let sortTests (runner: CustomTestRunner) =
            runner.FlatTests
            |> List.fold
                (fun (runTests, pendingTests, unfocusedTests) (ft: FlatTest) ->
                    match ft with
                    | { focusState = focus
                        sequenced = sequencedMethod } ->
                        match runner.HasFocused, focus with
                        | false, Normal -> ft :: runTests, pendingTests, unfocusedTests
                        | false, Pending -> runTests, ft :: pendingTests, unfocusedTests
                        | true, Focused -> ft :: runTests, pendingTests, unfocusedTests
                        | _, _ -> runTests, pendingTests, ft :: unfocusedTests)
                ([], [], [])
            |> fun (b, c, d) -> List.rev b, List.rev c, List.rev d

        let rec universalRun (configArgs: ConfigArg[]) (tests: TestCase) =
            let runner = CustomTestRunner(tests, configArgs)

            let run (runner: CustomTestRunner) =
                let runTests, pendingTests, unfocusedTests = sortTests runner

                async {
                    for ft in runTests do
                        do! runner.RunTest(ft)

                    for ft in pendingTests do
                        runner.SkipPendingTest ft.fullname

                    for _ in unfocusedTests do
                        runner.SkipUnfocusedTest ()
                }

            // enable emoji support for .NET
            #if !FABLE_COMPILER
            System.Console.OutputEncoding <- System.Text.Encoding.UTF8
            #endif

            #if FABLE_COMPILER_PYTHON
            Fable.Core.PyInterop.emitPyExpr
                ()
                """import sys
    import io

    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')"""
            #endif

            let time = System.DateTime.Now.ToString("HH:mm:ss yyyy.MM.dd")
            System.Console.WriteLine $"{BColors.ENDC}🚀 start running {runner.Language.AsLowerCaseString} tests ... [{time}]"

            async {
                do! run runner

                let innerMsgString =
                    $"""{BColors.INFOBLUE}{runner.SumTests}{BColors.ENDC} tests run - {BColors.INFOBLUE}{runner.SuccessfulTests.Value}{BColors.ENDC} passed, {BColors.INFOBLUE}{runner.IgnoredTests.Value}{BColors.ENDC} ignored, {BColors.INFOBLUE}{runner.FailedTests.Value}{BColors.ENDC} failed, {BColors.INFOBLUE}{runner.ErrorTests.Value}{BColors.ENDC} errored"""

                let sep = "-------------------------------------------------------------------------------"
                let sb = System.Text.StringBuilder()
                sb.AppendLine() |> ignore

                for i in 1 .. runner.ErrorMessages.Count do
                    let name, msg = runner.ErrorMessages.[i - 1]
                    sb.AppendLine $"{BColors.FAIL}{i}) {name}{BColors.ENDC}\n\b{msg}" |> ignore

                sb.AppendLine() |> ignore
                let msg = sb.AppendLine(sep).AppendLine(innerMsgString).AppendLine(sep).ToString()
                System.Console.WriteLine(msg)

                let exitCode: int =
                    match runner.ErrorTests.Value, runner.FailedTests.Value with
                    | errors, _ when errors > 0 ->
                        Exception $"{BColors.FAIL}❌ Exited with error code 2{BColors.ENDC}"
                        |> System.Console.WriteLine

                        if not runner.Config.DoNotExitWithCode then
                            CommandLine.exitWith (2)

                        2
                    | _, failed when failed > 0 ->
                        Exception $"{BColors.FAIL}❌ Exited with error code 1{BColors.ENDC}"
                        |> System.Console.WriteLine

                        if not runner.Config.DoNotExitWithCode then
                            CommandLine.exitWith (1)

                        1
                    | _ ->
                        System.Console.WriteLine $"{BColors.OKGREEN}Success!{BColors.ENDC}"

                        if not runner.Config.DoNotExitWithCode then
                            CommandLine.exitWith (0)

                        0

                return exitCode
            }

    open Util

    let runTests (configArgs: ConfigArg[]) (test: TestCase) =
        let r = universalRun configArgs test |> start
        !!r

    let runTestsAsync (configArgs: ConfigArg[]) (test: TestCase) =
        let r = universalRun configArgs test
        r
