module TestTasks

open BlackFox.Fake
open Fake.DotNet

open ProjectInfo
open BasicTasks
open Helpers

let runTestsDotNet = BuildTask.create "RunTestsDotnet" [clean; build;] {
    testProjects
    |> Seq.iter (fun testProject ->
        run dotnet "run" testProject
    )
}

let runTestsPy = BuildTask.create "RunTestsPy" [clean; build;] {
    for test in ProjectInfo.testProjects do
        run dotnet $"fable {test} --lang py -o {test}/py" ""
        run python $"{test}/py/main.py" ""
}

let runTestsJs = BuildTask.create "RunTestsJs" [clean; build;] {
    for test in ProjectInfo.testProjects do
        run dotnet $"fable {test} -o {test}/js" ""
        run npx $"mocha {test}/js --timeout 20000" ""
}

let runTests = BuildTask.create "RunTests" [clean; build; runTestsDotNet; runTestsPy; runTestsJs] { 
    ()
}