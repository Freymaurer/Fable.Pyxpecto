module TestTasks

open BlackFox.Fake
open Fake.DotNet

open ProjectInfo
open BasicTasks

let runTestsDotNet = BuildTask.create "RunTestsDotnet" [clean; build;] {
    testProjects
    |> Seq.iter (fun testProject ->
        Fake.DotNet.DotNet.test(fun testParams ->
            {
                testParams with
                    Logger = Some "console;verbosity=detailed"
                    Configuration = DotNet.BuildConfiguration.fromString configuration
                    NoBuild = true
                    MSBuildParams = {testParams.MSBuildParams with DisableInternalBinLog = true}
            }
        ) testProject
    )
}

open Helpers

let runTestsPy = BuildTask.create "RunTestsPy" [clean; build;] {
    for test in ProjectInfo.pyTestProjects do
        run pipenv $"run pytest {test}/Main.py" ""
}

let runTests = BuildTask.create "RunTests" [clean; build; runTestsDotNet; runTestsPy] { 
    ()
}