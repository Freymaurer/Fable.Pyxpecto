import { Mocha_runTests, Test_ftestCaseAsync, Test_ftestCase, Expect_notEqual, Test_TestCaseBuilder__Zero, Expect_containsAll, Test_TestCaseBuilder__Delay_1505, Test_TestCaseBuilder__Run_3A5B6456, FocusState, Test_ptestCaseAsync, Test_ptestCase, Expect_isNotInfinity, Expect_floatGreaterThanOrClose, Expect_floatLessThanOrClose, AccuracyModule_low, Expect_floatClose, Expect_throws, Expect_isNotNaN, Expect_isNull, Expect_isNotNull, Expect_isNone, Expect_wantSome, Expect_isSome, Expect_wantError, Expect_isError, Expect_stringContains, Expect_wantOk, Expect_isNonEmpty, Expect_isEmpty, Expect_throwsC, Expect_isOk, Expect_isFalse, Expect_isTrue, Test_testCase, Test_testCaseAsync, Test_testList, Test_testSequenced } from "./fable_modules/Fable.Mocha.2.17.0/Mocha.fs.js";
import { singleton } from "./fable_modules/fable-library.4.1.4/AsyncBuilder.js";
import { sleep } from "./fable_modules/fable-library.4.1.4/Async.js";
import { contains, ofArray, singleton as singleton_1 } from "./fable_modules/fable-library.4.1.4/List.js";
import { equals as equals_1, defaultOf, int32ToString, structuralHash, assertEqual } from "./fable_modules/fable-library.4.1.4/Util.js";
import { anonRecord_type, equals, class_type, decimal_type, string_type, float64_type, bool_type, int32_type } from "./fable_modules/fable-library.4.1.4/Reflection.js";
import { toFail, printf, toText } from "./fable_modules/fable-library.4.1.4/String.js";
import { FSharpResult$2 } from "./fable_modules/fable-library.4.1.4/Choice.js";
import { toString } from "./fable_modules/fable-library.4.1.4/Types.js";
import { Test_TestCaseBuilder_$ctor_Z7EF1EC3F } from "./fable_modules/Fable.Mocha.2.17.0/Mocha.fs.js";

export const tests_sequential = Test_testSequenced(Test_testList("Sequential", ofArray([Test_testCaseAsync("one", singleton.Delay(() => singleton.Bind(sleep(1000), () => singleton.Return(void 0)))), Test_testCase("sync one", () => {
    Expect_isTrue(true)("this should work");
}), Test_testCaseAsync("two", singleton.Delay(() => singleton.Bind(sleep(1000), () => singleton.Return(void 0)))), Test_testCase("sync two", () => {
    Expect_isTrue(true)("");
}), Test_testList("Many", singleton_1(Test_testCase("syncThree", () => {
    Expect_isTrue(true)("");
}))), Test_testCaseAsync("three", singleton.Delay(() => singleton.Bind(sleep(1000), () => {
    Expect_isTrue(true)("this should work");
    return singleton.Zero();
})))])));

export const tests_basic = Test_testList("Basic", ofArray([Test_testCase("testCase works with numbers", () => {
    let copyOfStruct, arg, arg_1;
    const actual = 2;
    if ((actual === 2) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual, 2, "Should be equal");
    }
    else {
        throw new Error(contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg = int32ToString(2), (arg_1 = int32ToString(actual), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg)(arg_1)("Should be equal")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(2)(actual)("Should be equal"));
    }
}), Test_testCase("isFalse works", () => {
    Expect_isFalse(false)("Should be equal");
}), Test_testCase("areEqual with msg", () => {
    let copyOfStruct_1, arg_6, arg_1_1;
    if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(2, 3, "They are the same");
    }
    else {
        throw new Error(contains((copyOfStruct_1 = 2, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_6 = int32ToString(3), (arg_1_1 = int32ToString(2), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_6)(arg_1_1)("They are the same")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(3)(2)("They are the same"));
    }
}), Test_testCase("isOk works correctly", () => {
    Expect_isOk(new FSharpResult$2(0, [true]), "Should be Ok");
}), Test_testCase("isOk fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_2, arg_7, arg_1_2;
        Expect_isOk(new FSharpResult$2(1, ["fails"]), "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_2 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_7 = toString(false), (arg_1_2 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_7)(arg_1_2)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn) => {
        let copyOfStruct_3;
        const actual_5 = exn.message;
        if ((actual_5 === "Should fail. Expected Ok, was Error(\"fails\").") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_5, "Should fail. Expected Ok, was Error(\"fails\").", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_3 = actual_5, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected Ok, was Error(\"fails\").")(actual_5)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected Ok, was Error(\"fails\").")(actual_5)("Error messages should be the same"));
        }
    });
}), Test_testCase("isEmpty works correctly", () => {
    Expect_isEmpty([], "Should be empty");
}), Test_testCase("isEmpty fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_4, arg_9, arg_1_4;
        Expect_isEmpty([1], "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_4 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_9 = toString(false), (arg_1_4 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_9)(arg_1_4)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_1) => {
        let copyOfStruct_5;
        const actual_9 = exn_1.message;
        if ((actual_9 === "Should fail. Should be empty.") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_9, "Should fail. Should be empty.", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_5 = actual_9, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Should be empty.")(actual_9)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Should be empty.")(actual_9)("Error messages should be the same"));
        }
    });
}), Test_testCase("isNonEmpty works correctly", () => {
    Expect_isNonEmpty([1], "Should not be empty");
}), Test_testCase("isNonEmpty fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_6, arg_11, arg_1_6;
        Expect_isNonEmpty([], "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_6 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_11 = toString(false), (arg_1_6 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_11)(arg_1_6)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_2) => {
        let copyOfStruct_7;
        const actual_13 = exn_2.message;
        if ((actual_13 === "Should fail. Should not be empty.") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_13, "Should fail. Should not be empty.", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_7 = actual_13, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Should not be empty.")(actual_13)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Should not be empty.")(actual_13)("Error messages should be the same"));
        }
    });
}), Test_testCase("wantOk works correctly", () => {
    let copyOfStruct_8, arg_13, arg_1_8;
    const actual_15 = Expect_wantOk(new FSharpResult$2(0, [true]), "Should be Ok");
    if ((actual_15 === true) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual_15, true, "Should be true");
    }
    else {
        throw new Error(contains((copyOfStruct_8 = actual_15, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_13 = toString(true), (arg_1_8 = toString(actual_15), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_13)(arg_1_8)("Should be true")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(true)(actual_15)("Should be true"));
    }
}), Test_testCase("wantOk fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_9, arg_14, arg_1_9;
        Expect_wantOk(new FSharpResult$2(1, [true]), "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_9 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_14 = toString(false), (arg_1_9 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_14)(arg_1_9)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_3) => {
        Expect_stringContains(exn_3.message, "Expected Ok", "Error contains the error message");
    });
}), Test_testCase("isError works correctly", () => {
    Expect_isError(new FSharpResult$2(1, ["Is Error"]), "Should be Error");
}), Test_testCase("isError fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_10, arg_15, arg_1_10;
        Expect_isError(new FSharpResult$2(0, [true]), "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_10 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_15 = toString(false), (arg_1_10 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_15)(arg_1_10)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_4) => {
        Expect_stringContains(exn_4.message, "Expected Error", "error message part is present");
    });
}), Test_testCase("wantError works correctly", () => {
    let copyOfStruct_11, arg_16, arg_1_11;
    const actual_22 = Expect_wantError(new FSharpResult$2(1, [true]), "Should be Error");
    if ((actual_22 === true) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual_22, true, "Should be true");
    }
    else {
        throw new Error(contains((copyOfStruct_11 = actual_22, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_16 = toString(true), (arg_1_11 = toString(actual_22), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_16)(arg_1_11)("Should be true")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(true)(actual_22)("Should be true"));
    }
}), Test_testCase("wantError fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_12, arg_17, arg_1_12;
        Expect_wantError(new FSharpResult$2(0, [true]), "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_12 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_17 = toString(false), (arg_1_12 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_17)(arg_1_12)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_5) => {
        Expect_stringContains(exn_5.message, "Expected Error", "Error message contains the correct error");
    });
}), Test_testCase("isSome works correctly", () => {
    Expect_isSome(true, "Should be Some");
}), Test_testCase("isSome fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_13, arg_18, arg_1_13;
        Expect_isSome(void 0, "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_13 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_18 = toString(false), (arg_1_13 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_18)(arg_1_13)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_6) => {
        let copyOfStruct_14;
        const actual_28 = exn_6.message;
        if ((actual_28 === "Should fail. Expected Some _, was None.") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_28, "Should fail. Expected Some _, was None.", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_14 = actual_28, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected Some _, was None.")(actual_28)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected Some _, was None.")(actual_28)("Error messages should be the same"));
        }
    });
}), Test_testCase("wantSome works correctly", () => {
    let copyOfStruct_15, arg_20, arg_1_15;
    const actual_30 = Expect_wantSome(true, "Should be Some");
    if ((actual_30 === true) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual_30, true, "Should be true");
    }
    else {
        throw new Error(contains((copyOfStruct_15 = actual_30, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_20 = toString(true), (arg_1_15 = toString(actual_30), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_20)(arg_1_15)("Should be true")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(true)(actual_30)("Should be true"));
    }
}), Test_testCase("wantSome fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_16, arg_21, arg_1_16;
        Expect_isSome(void 0, "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_16 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_21 = toString(false), (arg_1_16 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_21)(arg_1_16)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_7) => {
        let copyOfStruct_17;
        const actual_33 = exn_7.message;
        if ((actual_33 === "Should fail. Expected Some _, was None.") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_33, "Should fail. Expected Some _, was None.", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_17 = actual_33, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected Some _, was None.")(actual_33)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected Some _, was None.")(actual_33)("Error messages should be the same"));
        }
    });
}), Test_testCase("isNone works correctly", () => {
    Expect_isNone(void 0, "Should be Some");
}), Test_testCase("isNone fails correctly", () => {
    Expect_throwsC(() => {
        let copyOfStruct_18, arg_23, arg_1_18;
        Expect_isNone(true, "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_18 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_23 = toString(false), (arg_1_18 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_23)(arg_1_18)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }, (exn_8) => {
        let copyOfStruct_19;
        const actual_37 = exn_8.message;
        if ((actual_37 === "Should fail. Expected None, was Some(true).") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_37, "Should fail. Expected None, was Some(true).", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_19 = actual_37, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected None, was Some(true).")(actual_37)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected None, was Some(true).")(actual_37)("Error messages should be the same"));
        }
    });
}), Test_testCase("isNotNull works correctly", () => {
    Expect_isNotNull("not null")("Should not be null");
}), Test_testCase("isNull works correctly", () => {
    Expect_isNull(defaultOf())("Should not be null");
}), Test_testCase("isNotNaN works correctly", () => {
    Expect_isNotNaN(20.4, "Should not be nan");
}), Test_testCase("isNotNaN fails correctly", () => {
    Expect_throws(() => {
        Expect_isNotNaN(Number.NaN, "Should fail");
    }, "Should have failed");
}), Test_testCase("floatClose works correctly", () => {
    Expect_floatClose(AccuracyModule_low, 0.1, 0.1, "Should be close enough");
}), Test_testCase("floatClose fails correctly", () => {
    Expect_throws(() => {
        Expect_floatClose(AccuracyModule_low, 0.1, 2, "Should be far enough apart");
    }, "Should have failed");
}), Test_testCase("floatLessThanOrClose works correctly", () => {
    Expect_floatLessThanOrClose(AccuracyModule_low, 0.1, 0.1, "Should be close enough");
}), Test_testCase("floatLessThanOrClose fails correctly", () => {
    Expect_throws(() => {
        Expect_floatLessThanOrClose(AccuracyModule_low, 2, 1, "Should be far enough apart");
    }, "Should have failed");
}), Test_testCase("floatGreaterThanOrClose works correctly", () => {
    Expect_floatGreaterThanOrClose(AccuracyModule_low, 0.123, 0.123, "Should be close enough");
}), Test_testCase("floatGreaterThanOrClose fails correctly", () => {
    Expect_throws(() => {
        Expect_floatGreaterThanOrClose(AccuracyModule_low, 1, 2, "Should be far enough apart");
    }, "Should have failed");
}), Test_testCase("failwith fails correctly", () => {
    Expect_throwsC(() => {
        throw new Error("Should fail");
    }, (exn_9) => {
        let copyOfStruct_20;
        const actual_42 = exn_9.message;
        if ((actual_42 === "Should fail") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_42, "Should fail", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_20 = actual_42, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail")(actual_42)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail")(actual_42)("Error messages should be the same"));
        }
    });
}), Test_testCase("failwithf fails correctly", () => {
    Expect_throwsC(() => {
        toFail(printf("%s%s"))("Should fail")("!");
    }, (exn_10) => {
        let copyOfStruct_21;
        const actual_43 = exn_10.message;
        if ((actual_43 === "Should fail!") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_43, "Should fail!", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_21 = actual_43, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail!")(actual_43)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail!")(actual_43)("Error messages should be the same"));
        }
    });
}), Test_testCase("isNotInfinity works correctly", () => {
    Expect_isNotInfinity(20.4, "Shouldn\'t be infinity");
}), Test_testCase("isNotInfinity fails correctly", () => {
    Expect_throws(() => {
        Expect_isNotInfinity(Number.POSITIVE_INFINITY, "Should fail");
    }, "Should have failed");
}), Test_testCaseAsync("testCaseAsync works", singleton.Delay(() => singleton.Bind(sleep(3000), () => singleton.Bind(singleton.Delay(() => singleton.Return(21)), (_arg_34) => {
    let copyOfStruct_22, arg_29, arg_1_22;
    const actual_46 = (_arg_34 * 2) | 0;
    if ((actual_46 === 42) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual_46, 42, "Should be equal");
    }
    else {
        throw new Error(contains((copyOfStruct_22 = actual_46, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_29 = int32ToString(42), (arg_1_22 = int32ToString(actual_46), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_29)(arg_1_22)("Should be equal")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(42)(actual_46)("Should be equal"));
    }
    return singleton.Zero();
})))), Test_ptestCase("skipping this one", () => {
    throw new Error("Shouldn\'t be running this test");
}), Test_ptestCaseAsync("skipping this one async", singleton.Delay(() => {
    throw new Error("Shouldn\'t be running this test");
    return singleton.Zero();
})), Test_testCase("stringContains works correctly", () => {
    Expect_stringContains("Hello, World!", "World", "Should contain string");
}), Test_testCase("stringContains fails correctly", () => {
    let copyOfStruct_24, copyOfStruct_23, arg_30, arg_1_23;
    try {
        Expect_stringContains("Hello, Mocha!", "World", "Should fail");
        if (!(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(true, false, "Should not be tested");
        }
        else {
            throw new Error(contains((copyOfStruct_23 = true, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? ((arg_30 = toString(false), (arg_1_23 = toString(true), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_30)(arg_1_23)("Should not be tested")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(false)(true)("Should not be tested"));
        }
    }
    catch (ex) {
        const actual_48 = ex.message;
        if ((actual_48 === "Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.") ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
            assertEqual(actual_48, "Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.", "Error messages should be the same");
        }
        else {
            throw new Error(contains((copyOfStruct_24 = actual_48, string_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals,
                GetHashCode: structuralHash,
            }) ? toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.")(actual_48)("Error messages should be the same") : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))("Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.")(actual_48)("Error messages should be the same"));
        }
    }
}), Test_testList("containsAll", ofArray([(() => {
    const builder$0040_3 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("identical sequence", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_3, Test_TestCaseBuilder__Delay_1505(builder$0040_3, () => {
        Expect_containsAll([21, 37], [21, 37], "Identical sequences");
        Test_TestCaseBuilder__Zero(builder$0040_3);
    }));
})(), (() => {
    const builder$0040_4 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("sequence contains all in different order", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_4, Test_TestCaseBuilder__Delay_1505(builder$0040_4, () => {
        Expect_containsAll([21, 37], [37, 21], "Same elements in different order");
        Test_TestCaseBuilder__Zero(builder$0040_4);
    }));
})()]))]));

export const secondModuleTests = Test_testList("second Module tests", singleton_1(Test_testCase("module works properly", () => {
    let copyOfStruct, arg, arg_1;
    const actual = 31415 / 10000;
    if ((actual === 3.1415) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual, 3.1415, "Should be equal");
    }
    else {
        throw new Error(contains((copyOfStruct = actual, float64_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg = (3.1415).toString(), (arg_1 = actual.toString(), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg)(arg_1)("Should be equal")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(3.1415)(actual)("Should be equal"));
    }
})));

export const structuralEqualityTests = Test_testList("testing records", ofArray([Test_testCase("they are equal", () => {
    let copyOfStruct, arg, arg_1;
    const actual_1 = {
        one: "one",
        two: 2,
    };
    const expected_1 = {
        one: "one",
        two: 2,
    };
    if (equals_1(actual_1, expected_1) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual_1, expected_1, "Should be equal");
    }
    else {
        throw new Error(contains((copyOfStruct = actual_1, anonRecord_type(["one", string_type], ["two", int32_type])), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg = toString(expected_1), (arg_1 = toString(actual_1), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg)(arg_1)("Should be equal")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(expected_1)(actual_1)("Should be equal"));
    }
}), Test_testCase("they are not equal", () => {
    Expect_notEqual({
        one: "one",
        two: 2,
    }, {
        one: "one",
        two: 1,
    }, "Should be equal");
})]));

export const nestedTestCase = Test_testList("Nested", singleton_1(Test_testList("Nested even more", singleton_1(Test_testCase("Nested test case", () => {
    Expect_isTrue(true)("Should be true");
})))));

export const focusedTestsCases = Test_testList("Focused", ofArray([Test_ftestCase("Focused sync test", () => {
    let copyOfStruct, arg, arg_1;
    const actual = 2;
    if ((actual === 2) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual, 2, "Should be equal");
    }
    else {
        throw new Error(contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg = int32ToString(2), (arg_1 = int32ToString(actual), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg)(arg_1)("Should be equal")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(2)(actual)("Should be equal"));
    }
}), Test_ftestCaseAsync("Focused async test", singleton.Delay(() => {
    let copyOfStruct_1, arg_6, arg_1_1;
    const actual_1 = 2;
    if ((actual_1 === 2) ? true : !(new Function("try {return this===window;}catch(e){ return false;}"))()) {
        assertEqual(actual_1, 2, "Should be equal");
    }
    else {
        throw new Error(contains((copyOfStruct_1 = actual_1, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals,
            GetHashCode: structuralHash,
        }) ? ((arg_6 = int32ToString(2), (arg_1_1 = int32ToString(actual_1), toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(arg_6)(arg_1_1)("Should be equal")))) : toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>"))(2)(actual_1)("Should be equal"));
    }
    return singleton.Zero();
}))]));

export const all = Test_testList("All", ofArray([tests_sequential, tests_basic, secondModuleTests, structuralEqualityTests, nestedTestCase]));

(function (argv) {
    return Mocha_runTests(all);
})(typeof process === 'object' ? process.argv.slice(2) : []);

