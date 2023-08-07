module Fable.Pytest.Tests

#if FABLE_COMPILER_PYTHON
open Fable.Pytest
#else
open Expecto
#endif

let hello name = "Hello " + name

let all = 
    testList "Example" [
        testCase "Hello" <| fun _ ->
            let subject = hello "Kevin"
            Expect.equal subject "Hello Kevin" ""
    ]

[<EntryPoint>]
let main argv =
    #if FABLE_COMPILER_PYTHON
    Pytest.runTests all
    #else
    Tests.runTestsWithCLIArgs [] [||] all
    #endif