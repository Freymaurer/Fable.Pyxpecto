module Tests

open Expecto

[<Tests>]
let tests =
    testList "Example" [
        testCase "Hello" <| fun _ ->
            let subject = Fable.Pytest.Tests.hello "Kevin"
            Expect.equal subject "Hello Kevin" ""
    ]
