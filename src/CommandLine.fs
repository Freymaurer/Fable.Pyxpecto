namespace Fable.Pyxpecto

open System
open Fable.Core

module CommandLine =
    #if FABLE_COMPILER_PYTHON
    module Python =
        open Fable.Core.PyInterop

        [<ImportAll("sys")>]
        let sys: obj = nativeOnly

        let getArgs (): string[] =
            !!sys?argv |> Array.ofSeq

        let exitWith (exitCode: int): unit =
            !!sys?exit (nativeint (exitCode))
    #endif

    #if (FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT)
    module NodeJs =
        [<Emit("process.argv")>]
        let getArgs (): string[] = nativeOnly

        [<Emit("process.exit($0)")>]
        let exitWith (exitCode: int): unit = nativeOnly
    #endif

    #if !FABLE_COMPILER
    module NET =
        let getArgs (): string[] = Environment.GetCommandLineArgs()
        let exitWith (exitCode: int): unit = Environment.Exit(exitCode)
    #endif

    let getArguments (): string[] =
        let args =
            #if FABLE_COMPILER_PYTHON
            Python.getArgs ()
            #endif
            #if (FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT)
            NodeJs.getArgs ()
            #endif
            #if !FABLE_COMPILER
            NET.getArgs ()
            #endif

        args

    let exitWith (exitCode: int): unit =
        #if FABLE_COMPILER_PYTHON
        Python.exitWith (exitCode)
        #endif
        #if (FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT)
        NodeJs.exitWith (exitCode)
        #endif
        #if !FABLE_COMPILER
        NET.exitWith (exitCode)
        #endif
