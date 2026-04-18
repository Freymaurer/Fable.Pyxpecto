namespace Fable.Pyxpecto

open Fable.Core

#if FABLE_COMPILER_JAVASCRIPT || FABLE_COMPILER_TYPESCRIPT
open Fable.Core.JsInterop
#endif

module BColors =
    [<Emit("'\x1b[36m'")>]
    let OKCYAN: string = "\x1b[36m"

    [<Emit("'\x1b[32m'")>]
    let OKGREEN: string = "\x1b[32m"

    [<Emit("'\x1b[94m'")>]
    let INFOBLUE: string = "\x1b[94m"

    [<Emit("'\x1b[31m'")>]
    let FAIL: string = "\x1b[31m"

    [<Emit("'\x1b[33m'")>]
    let WARNING: string = "\x1b[33m"

    [<Emit("'\x1b[0m'")>]
    let ENDC: string = "\x1b[0m"

module TranspilerHelper =
    // This is possibly the most magic
    #if !FABLE_COMPILER_JAVASCRIPT && !FABLE_COMPILER_TYPESCRIPT
    let (!!) (any: 'a) = any
    #endif

    let private x = 0 // placeholder to make it not error in not js/ts
