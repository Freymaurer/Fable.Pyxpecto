module ProjectInfo

open Fake.Core

let project = "Fable.Pyxpecto"


let solutionFile  = $"{project}.sln"

let configuration = "Release"

let gitOwner = "Freymaurer"

let gitHome = $"https://github.com/{gitOwner}"

let projectRepo = $"https://github.com/{gitOwner}/{project}"
