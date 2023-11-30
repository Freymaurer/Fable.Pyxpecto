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

module RunMt =
    let rootPath = @"./tests/Multitarget.Tests"

    let py = BuildTask.create "runMtPy" [clean; build] { 
        let py_folder_name = "py"
        run dotnet $"fable {rootPath} --lang py -o {rootPath}/{py_folder_name}" ""
        run python $"{rootPath}/{py_folder_name}/main.py" ""
    }

    let js = BuildTask.create "runMtJs" [clean; build] { 
        let js_folder_name = "js"
        run dotnet $"fable {rootPath} -o {rootPath}/{js_folder_name}" ""
        run node $"{rootPath}/{js_folder_name}/Main.js" ""
    }

    let ts = BuildTask.create "runMtTs" [clean; build] { 
        let ts_folder_name = "ts"
        run dotnet $"fable {rootPath} --lang ts -o {rootPath}/{ts_folder_name}" ""
        run npx $"ts-node {rootPath}/{ts_folder_name}/Main.ts" ""
    }

    let net = BuildTask.create "runMtNet" [clean; build] { 
        run dotnet "run" rootPath
    }

let runMultiTargetTests = BuildTask.create "runMt" [clean; build; RunMt.js; RunMt.net; RunMt.ts; RunMt.py] {
    ()
}

let runTests = BuildTask.create "RunTests" [clean; build; runTestsDotNet; runTestsPy; runTestsJs] { 
    ()
}