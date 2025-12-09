open BlackFox.Fake
open System.IO
open Fake.Core
open Fake.DotNet
open Fake.IO
open Fake.IO.FileSystemOperators
open Fake.IO.Globbing.Operators
open Fake.Tools

open Helpers

initializeContext()

open BasicTasks
open TestTasks

let _ = TestTasks.runMultiTargetTests
let _ = TestTasks.runSwitchTests
let _ = TestTasks.runTests

[<EntryPoint>]
let main args =
    runOrDefault build args
