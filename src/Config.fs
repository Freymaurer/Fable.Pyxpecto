namespace Fable.Pyxpecto

type Language =
    | TypeScript
    | Python
    | NET
    | JavaScript

    static member get () =
        #if FABLE_COMPILER_JAVASCRIPT
        Language.JavaScript
        #endif
        #if FABLE_COMPILER_PYTHON
        Language.Python
        #endif
        #if FABLE_COMPILER_TYPESCRIPT
        Language.TypeScript
        #endif
        #if !FABLE_COMPILER
        Language.NET
        #endif

    member this.AsLowerCaseString = (string this).ToLower()

[<RequireQualifiedAccess>]
module ConfigArgLiterals =
    let [<Literal>] FailOnFocused = @"--fail-on-focused-tests"
    let [<Literal>] Silent = @"--silent"
    let [<Literal>] DoNotExitWithCode = @"--do-not-exit-with-code"

type ConfigArg =
    | FailOnFocused
    | Silent
    | DoNotExitWithCode
    with
        static member fromString (s: string) =
            match s with
            | ConfigArgLiterals.FailOnFocused -> Some FailOnFocused
            | ConfigArgLiterals.Silent -> Some Silent
            | ConfigArgLiterals.DoNotExitWithCode -> Some DoNotExitWithCode
            | _ -> None

        static member fromStrings (arr: string[]): ConfigArg[] = arr |> Array.choose ConfigArg.fromString
        static member defaultConfigs: ConfigArg[] = [||]

type Config(args: ConfigArg[]) =
    let argExists (arg: ConfigArg) = Array.contains arg args
    member val FailOnFocused: bool = argExists ConfigArg.FailOnFocused with get
    member val Silent: bool = argExists ConfigArg.Silent with get
    member val DoNotExitWithCode: bool = argExists ConfigArg.DoNotExitWithCode with get
