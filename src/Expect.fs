namespace Fable.Pyxpecto

open System
open Helper

[<RequireQualifiedAccess>]
module Expect =
    let inline equal (actual: 'a) (expected: 'a) msg: unit = Assert.NET.equal actual expected msg
    let notEqual actual expected msg: unit = Assert.NET.notEqual actual expected msg

    let private isNull' cond =
        match cond with
        | null -> true
        | _ -> false

    let isNull cond = equal (isNull' cond) true
    let isNotNull cond = notEqual (isNull' cond) true
    let isNotNaN cond msg = if Double.IsNaN cond then failtest (msg)
    let isNotInfinity cond msg = if Double.IsInfinity cond then failtest (msg)
    let isTrue cond = equal cond true
    let isFalse cond = equal cond false
    let isZero cond = equal cond 0
    let isEmpty (x: 'a seq) msg = if not (Seq.isEmpty x) then failtestf "%s. Should be empty." msg
    let pass () = equal true true "The test passed"
    let passWithMsg (message: string) = equal true true message
    let exists (x: 'a seq) (a: 'a -> bool) msg = if not (Seq.exists a x) then failtest (msg)
    let all (x: 'a seq) (a: 'a -> bool) msg = if not (Seq.forall a x) then failtest (msg)

    /// Expect the passed sequence not to be empty.
    let isNonEmpty (x: 'a seq) msg = if Seq.isEmpty x then failtestf "%s. Should not be empty." msg
    /// Expects x to be not null nor empty
    let isNotEmpty (x: 'a seq) msg =
        isNotNull x msg
        isNonEmpty x msg

    /// Expects x to be a sequence of length `number`
    let hasLength x number msg = equal (Seq.length x) number (sprintf "%s. Expected %A to have length %i" msg x number)

    /// Expects x to be Result.Ok
    let isOk x message =
        match x with
        | Ok _ -> passWithMsg message
        | Error x' -> failtestf "%s. Expected Ok, was Error(\"%s\")." message (string x')

    /// Expects the value to be a Result.Ok value and returns it or fails the test
    let wantOk x message =
        match x with
        | Ok x' ->
            passWithMsg message
            x'
        | Error x' -> failtestf "%s. Expected Ok, was Error('%A')." message x'

    let stringContains (subject: string) (substring: string) message =
        if not (subject.Contains(substring)) then
            failtestf "%s. Expected subject string '%s' to contain substring '%s'." message subject substring
        else
            passWithMsg message

    /// Expects x to be Result.Error
    let isError x message =
        match x with
        | Error _ -> passWithMsg message
        | Ok x' -> failtestf "%s. Expected Error _, was Ok(%A)." message x'

    let isSome x message =
        match x with
        | Some _ -> passWithMsg message
        | None -> failtestf "%s. Expected Some _, was None." message

    /// Expects the value to be a Some x value and returns x or fails the test
    let wantSome x message =
        match x with
        | Some x' ->
            passWithMsg message
            x'
        | None -> failtestf "%s. Expected Some _, was None." message

    /// Expects the value to be a Result.Error value and returns it or fails the test
    let wantError (x: Result<'a, 'b>) (message: string) =
        match x with
        | Error value ->
            passWithMsg message
            value
        | Ok value -> failtestf "%s. Expected Error _, was Ok(%A)." message value

    let isNone x message =
        match x with
        | None -> passWithMsg message
        | Some x' -> failtestf "%s. Expected None, was Some(%A)." message x'

    let private throws' f =
        try
            f ()
            None
        with exn ->
            Some exn

    /// Expects the passed function to throw an exception
    let throws f msg =
        match throws' f with
        | None -> failtestf "%s. Expected f to throw." msg
        | Some _ -> ()

    /// Expects the passed function to throw, then calls `cont` with the exception
    let throwsC f cont =
        match throws' f with
        | None -> failtest "Expected f to throw."
        | Some exn -> cont exn

    /// Expects the `actual` sequence to contain all elements from `expected`
    /// It doesn't take into account the number of occurrences and the order of elements.
    /// Calling this function will enumerate both sequences; they have to be finite.
    let containsAll (actual: _ seq) (expected: _ seq) message =
        let actualEls, expectedEls = List.ofSeq actual, List.ofSeq expected

        let matchingEls =
            actualEls
            |> List.filter (fun a -> expectedEls |> List.contains a)

        let extraEls =
            actualEls
            |> List.filter (fun a -> not (matchingEls |> List.contains a))

        let missingEls =
            expectedEls
            |> List.filter (fun e -> not (matchingEls |> List.contains e))

        if List.isEmpty missingEls then
            ()
        else
            failtestf
                "%s. Sequence `actual` does not contain all `expected` elements. Missing elements from `actual`: %A. Extra elements in `actual`: %A"
                message
                missingEls
                extraEls

    /// Expects `actual` and `expected` (that are both floats) to be within a
    /// given `accuracy`.
    let floatClose accuracy actual expected message =
        if Double.IsInfinity actual then
            failtestf "%s. Expected actual to not be infinity, but it was." message
        elif Double.IsInfinity expected then
            failtestf "%s. Expected expected to not be infinity, but it was." message
        elif Accuracy.areClose accuracy actual expected |> not then
            failtestf
                "%s. Expected difference to be less than %.20g for accuracy {absolute=%.20g; relative=%.20g}, but was %.20g. actual=%.20g expected=%.20g"
                message
                (Accuracy.areCloseRhs accuracy actual expected)
                accuracy.absolute
                accuracy.relative
                (Accuracy.areCloseLhs actual expected)
                actual
                expected

    /// Expects `actual` to be less than `expected` or to be within a
    /// given `accuracy`.
    let floatLessThanOrClose accuracy actual expected message =
        if actual > expected then
            floatClose accuracy actual expected message

    /// Expects `actual` to be greater than `expected` or to be within a
    /// given `accuracy`.
    let floatGreaterThanOrClose accuracy actual expected message =
        if actual < expected then
            floatClose accuracy actual expected message
