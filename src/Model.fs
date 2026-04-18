namespace Fable.Pyxpecto

open System
open Fable.Core

module Model =
    [<AttachMembers>]
    type Stopwatch() =
        member val StartTime: DateTime option = None with get, set
        member val StopTime: DateTime option = None with get, set
        member this.Start() = this.StartTime <- Some DateTime.Now

        member this.Stop() =
            match this.StartTime with
            | Some _ -> this.StopTime <- Some DateTime.Now
            | None -> failwith "Error. Unable to call `Stop` before `Start`."

        member this.Elapsed: TimeSpan =
            match this.StartTime, this.StopTime with
            | Some start, Some stop -> stop - start
            | _, _ -> failwith "Error. Unable to call `Elapsed` without calling `Start` and `Stop` before."

    type FocusState =
        | Normal
        | Pending
        | Focused

    type TestCase =
        | SyncTest of string * (unit -> unit) * FocusState
        | AsyncTest of string * Async<unit> * FocusState
        | TestList of string * TestCase list * FocusState
        | TestListSequential of string * TestCase list * FocusState

    type AssertException(msg) =
        inherit Exception(msg)

    type TestCode =
        | Sync of stest: (unit -> unit)
        | Async of atest: Async<unit>

    type SequenceMethod =
        | Sequential
        | Parallel

    [<AttachMembers>]
    type FlatTest =
        {
            name: string list
            test: TestCode
            focusState: FocusState
            sequenced: SequenceMethod
        }

        static member create(name, test, focusState, sequenceMethod) =
            { name = name
              test = test
              focusState = focusState
              sequenced = sequenceMethod }

        member this.fullname = String.concat (" - ") this.name

type Accuracy =
    { absolute: float
      relative: float }

module Accuracy =
    let inline areCloseLhs a b = abs (a - b)
    let inline areCloseRhs m a b = m.absolute + m.relative * max (abs a) (abs b)
    let inline areClose m a b = areCloseLhs a b <= areCloseRhs m a b
    let low = { absolute = 1e-6; relative = 1e-3 }
    let medium = { absolute = 1e-8; relative = 1e-5 }
    let high = { absolute = 1e-10; relative = 1e-7 }
    let veryHigh = { absolute = 1e-12; relative = 1e-9 }

module Helper =
    open Model

    let inline failtest msg = raise <| AssertException msg
    let inline failtestf fmt = Printf.ksprintf failtest fmt
