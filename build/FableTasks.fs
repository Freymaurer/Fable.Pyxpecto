module FableTasks

open BlackFox.Fake

open ProjectInfo
open BasicTasks
open Helpers

let fablePy = BuildTask.create "fablePy" [clean; build;] {
    for test in ProjectInfo.testProjects do
        run dotnet $"fable {test} -o {test}/py --lang python --noCache" ""
}

let fableJs = BuildTask.create "fableJs" [clean; build;] {
    for test in ProjectInfo.testProjects do
        run dotnet $"fable {test} -o {test}/js --noCache" ""
}

let fable = BuildTask.create "fable" [clean; build; fablePy; fableJs] {
    ()
}