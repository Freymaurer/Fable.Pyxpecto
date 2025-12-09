module BasicTasks

open BlackFox.Fake
open Fake.IO
open Fake.DotNet
open Fake.IO.Globbing.Operators

open ProjectInfo

let clean = BuildTask.create "Clean" [] {
    !! "src/**/bin"
    ++ "src/**/obj"
    ++ "tests/**/bin"
    ++ "tests/**/obj"
    ++ "pkg"
    |> Shell.cleanDirs
}

let build = BuildTask.create "Build" [clean] {
    solutionFile
    |> DotNet.build (fun o ->
        {o with
            MSBuildParams = {o.MSBuildParams with DisableInternalBinLog = true}}
    )
}
