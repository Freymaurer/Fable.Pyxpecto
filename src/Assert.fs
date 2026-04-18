namespace Fable.Pyxpecto

open Fable.Core.Testing
open Helper

module Assert =
    module NET =
        let firstDiff s1 s2 =
            let s1 = Seq.append (Seq.map Some s1) (Seq.initInfinite (fun _ -> None))
            let s2 = Seq.append (Seq.map Some s2) (Seq.initInfinite (fun _ -> None))

            Seq.mapi2 (fun i s p -> i, s, p) s1 s2
            |> Seq.find (function
                | _, Some s, Some p when s = p -> false
                | _ -> true)

        let private allDiffs (s1: string) (s2: string) =
            let q1 = Seq.append (Seq.map Some s1) (Seq.initInfinite (fun _ -> None))
            let q2 = Seq.append (Seq.map Some s2) (Seq.initInfinite (fun _ -> None))

            Seq.mapi2 (fun i s p -> i, s, p) q1 q2
            |> Seq.take (1 + max s1.Length s2.Length)
            |> Seq.fold
                (fun (onFrom, l) v ->
                    match onFrom, v with
                    | None, (i, f, s) when f <> s -> Some i, l
                    | Some i, (j, f, s) when f = s -> None, (i, j) :: l
                    | onFrom, _ -> onFrom, l)
                (None, [])
            |> snd

        let private highlightAllRed diffs (s: string) =
            let redStart = BColors.FAIL
            let redEnd = BColors.ENDC
            let l = s.Length

            List.fold
                (fun (s: string) (i, j) ->
                    if i >= l then s
                    else s.Insert(min j l, redEnd).Insert(i, redStart))
                s
                diffs

        let private highlightAllGreen diffs (s: string) =
            let greenStart = BColors.OKGREEN
            let greenEnd = BColors.ENDC
            let l = s.Length

            List.fold
                (fun (s: string) (i, j) ->
                    if i >= l then s
                    else s.Insert(min j l, greenEnd).Insert(i, greenStart))
                s
                diffs

        let private printVerses (firstName: string) first (secondName: string) second =
            let first, second =
                match box first, box second with
                | (:? string as f), (:? string as s) -> string f, string s
                | f, s -> sprintf "%A" f, sprintf "%A" s

            let prefix =
                if first.Length > 100
                   || second.Length > 100
                   || Seq.exists ((=) '\n') first
                   || Seq.exists ((=) '\n') second then
                    '\n'
                else
                    ' '

            let first = sprintf "\n%s:%c%s" firstName prefix first
            let second = sprintf "\n%s:%c%s" secondName prefix second
            let diffs = allDiffs first second
            String.Concat(highlightAllGreen diffs first, highlightAllRed diffs second)

        let private stringEquals diffPrinter actual expected message =
            match firstDiff actual expected with
            | _, None, None -> ()
            | i, Some a, Some e ->
                failtestf "%s. String does not match at position %i. Expected char: %A, but got %A.%s" message i e a (diffPrinter expected actual)
            | i, None, Some e ->
                failtestf "%s. String actual was shorter than expected, at pos %i for expected item %A.%s" message i e (diffPrinter expected actual)
            | i, Some a, None ->
                failtestf "%s. String actual was longer than expected, at pos %i found item %A.%s" message i a (diffPrinter expected actual)

        let equalWithDiffPrinter (diffPrinter: obj -> obj -> string) (actual: 'a) (expected: 'a) message =
            match box actual, box expected with
            | (:? string as a), (:? string as e) -> stringEquals diffPrinter a e message
            | _, _ ->
                if actual <> expected then
                    failtestf "%s.%s" message (diffPrinter expected actual)

        let private printVersesDiff (expected: 'A) (actual: 'A) = printVerses "expected" expected "  actual" actual

        /// Expects the two values to equal each other.
        let equal (actual: 'a) (expected: 'a) message = equalWithDiffPrinter printVersesDiff actual expected message

        /// Expects the two values not to equal each other.
        let notEqual (actual: 'a) (expected: 'a) message =
            if expected = actual then
                failtestf "%s.Actual value was equal to %A but had expected them to be non-equal.%s" message actual (printVersesDiff expected actual)

    let AreEqual(actual, expected, msg) =
        #if FABLE_COMPILER
        Assert.AreEqual(actual, expected, msg)
        #else
        NET.equal actual expected msg
        #endif

    let NotEqual(actual, expected, msg) =
        #if FABLE_COMPILER
        Assert.NotEqual(actual, expected, msg)
        #else
        NET.notEqual actual expected msg
        #endif
