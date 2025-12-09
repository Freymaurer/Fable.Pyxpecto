module Helpers

open BlackFox.Fake
open Fake.Core
open Fake.DotNet

let createProcess exe arg dir =
        CreateProcess.fromRawCommandLine exe arg
        |> CreateProcess.withWorkingDirectory dir
        |> CreateProcess.ensureExitCode

module Proc =

    module Parallel =

        open System

        let locker = obj()

        let colors = [|
            ConsoleColor.DarkYellow
            ConsoleColor.DarkCyan
            ConsoleColor.Magenta
            ConsoleColor.Blue
            ConsoleColor.Cyan
            ConsoleColor.DarkMagenta
            ConsoleColor.DarkBlue
            ConsoleColor.Yellow
        |]

        let print color (colored: string) (line: string) =
            lock locker
                (fun () ->
                    let currentColor = Console.ForegroundColor
                    Console.ForegroundColor <- color
                    Console.Write colored
                    Console.ForegroundColor <- currentColor
                    Console.WriteLine line)

        let onStdout index name (line: string) =
            let color = colors.[index % colors.Length]
            if isNull line then
                print color $"{name}: --- END ---" ""
            else if String.isNotNullOrEmpty line then
                print color $"{name}: " line

        let onStderr name (line: string) =
            let color = ConsoleColor.Red
            if isNull line |> not then
                print color $"{name}: " line

        let redirect (index, (name, createProcess)) =
            createProcess
            |> CreateProcess.redirectOutputIfNotRedirected
            |> CreateProcess.withOutputEvents (onStdout index name) (onStderr name)

        let printStarting indexed =
            for (index, (name, c: CreateProcess<_>)) in indexed do
                let color = colors.[index % colors.Length]
                let wd =
                    c.WorkingDirectory
                    |> Option.defaultValue ""
                let exe = c.Command.Executable
                let args = c.Command.Arguments.ToStartInfo
                print color $"{name}: {wd}> {exe} {args}" ""

        let run cs =
            cs
            |> Seq.toArray
            |> Array.indexed
            |> fun x -> printStarting x; x
            |> Array.map redirect
            |> Array.Parallel.map Proc.run

let dotnet = createProcess "dotnet"

let npm =
    let npmPath =
        match ProcessUtils.tryFindFileOnPath "npm" with
        | Some path -> path
        | None ->
            "npm was not found in path. Please install it and make sure it's available from your path. " +
            "See https://safe-stack.github.io/docs/quickstart/#install-pre-requisites for more info"
            |> failwith

    createProcess npmPath

let uv =
    let path =
        match ProcessUtils.tryFindFileOnPath "uv" with
        | Some path -> path
        | None ->
            "uv was not found in path. Please install it and make sure it's available from your path."
            |> failwith

    createProcess path

let node =
    let path =
        match ProcessUtils.tryFindFileOnPath "node" with
        | Some path -> path
        | None ->
            "node was not found in path. Please install it and make sure it's available from your path."
            |> failwith

    createProcess path

let npx =
    let path =
        match ProcessUtils.tryFindFileOnPath "npx" with
        | Some path -> path
        | None ->
            "npx was not found in path. Please install it and make sure it's available from your path."
            |> failwith

    createProcess path

let run proc arg dir =
    proc arg dir
    |> Proc.run
    |> ignore

let runParallel processes =
    processes
    |> Proc.Parallel.run
    |> ignore

let initializeContext () =
    let execContext = Context.FakeExecutionContext.Create false "build.fsx" [ ]
    Context.setExecutionContext (Context.RuntimeContext.Fake execContext)

/// Executes a dotnet command in the given working directory
let runDotNet cmd workingDir =
    let result =
        DotNet.exec (DotNet.Options.withWorkingDirectory workingDir) cmd ""
    if result.ExitCode <> 0 then failwithf "'dotnet %s' failed in %s" cmd workingDir

let runOrDefault defaultTarget args =
    Trace.trace (sprintf "%A" args)
    try
        match args with
        | [| target |] -> Target.runOrDefault target
        | arr when args.Length > 1 ->
            Target.run 0 (Array.head arr) ( Array.tail arr |> List.ofArray )
        | _ -> BuildTask.runOrDefault defaultTarget
        0
    with e ->
        printfn "%A" e
        1
