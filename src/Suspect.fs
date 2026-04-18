namespace Fable.Pyxpecto

open Helper

/// This module contains assertion helpers which are Fable.Pyxpecto specific. They cannot be used in combination with Mocha and Expecto.
[<RequireQualifiedAccess>]
module Suspect =
    /// <summary>
    /// This function only verifies non-whitespace characters
    /// </summary>
    let stringEqual actual expected message =
        let pattern = @"\s+"
        let regex = System.Text.RegularExpressions.Regex(pattern, System.Text.RegularExpressions.RegexOptions.Singleline)
        let actual = regex.Replace(actual, "")
        let expected = regex.Replace(expected, "")
        Expect.equal actual expected message

    /// Expects the `actual` sequence to equal the `expected` one.
    let sequenceEqual actual expected message =
        match Assert.NET.firstDiff actual expected with
        | _, None, None -> ()
        | i, Some a, Some e -> failtestf "%s. Sequence does not match at position %i. Expected item: %O, but got %O." message i e a
        | i, None, Some e -> failtestf "%s. Sequence actual shorter than expected, at pos %i for expected item %O." message i e
        | i, Some a, None -> failtestf "%s. Sequence actual longer than expected, at pos %i found item %O." message i a

    let fail message = failtestf "Test failed! %s" message
