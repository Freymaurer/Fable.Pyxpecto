import { toString, Record, Union } from "../fable_modules/fable-library.4.1.4/Types.js";
import { record_type, float64_type, list_type, class_type, lambda_type, unit_type, string_type, union_type } from "../fable_modules/fable-library.4.1.4/Reflection.js";
import { iterate, collect as collect_1, exists as exists_1, isEmpty as isEmpty_1, contains, filter, ofSeq, singleton } from "../fable_modules/fable-library.4.1.4/List.js";
import { Operators_Using } from "../fable_modules/fable-library.4.1.4/FSharp.Core.js";
import { curry2, stringHash, structuralHash, assertEqual, defaultOf, equals, assertNotEqual, disposeSafe, getEnumerator } from "../fable_modules/fable-library.4.1.4/Util.js";
import { singleton as singleton_1 } from "../fable_modules/fable-library.4.1.4/AsyncBuilder.js";
import { toConsole, isNullOrWhiteSpace, toText, printf, toFail } from "../fable_modules/fable-library.4.1.4/String.js";
import { max, isInfinity } from "../fable_modules/fable-library.4.1.4/Double.js";
import { collect, delay, toList, length, forAll, exists, isEmpty } from "../fable_modules/fable-library.4.1.4/Seq.js";
import { value as value_2 } from "../fable_modules/fable-library.4.1.4/Option.js";
import * as sys from "sys";
import { runSynchronously } from "../fable_modules/fable-library.4.1.4/Async.js";
import { contains as contains_1 } from "../fable_modules/fable-library.4.1.4/Array.js";
import { StringBuilder_$ctor, StringBuilder__AppendLine_Z721C83C5 } from "../fable_modules/fable-library.4.1.4/System.Text.js";

export class FocusState extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Normal", "Pending", "Focused"];
    }
}

export function FocusState_$reflection() {
    return union_type("Fable.Pyxpecto.FocusState", [], FocusState, () => [[], [], []]);
}

export class TestCase extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SyncTest", "AsyncTest", "TestList", "TestListSequential"];
    }
}

export function TestCase_$reflection() {
    return union_type("Fable.Pyxpecto.TestCase", [], TestCase, () => [[["Item1", string_type], ["Item2", lambda_type(unit_type, unit_type)], ["Item3", FocusState_$reflection()]], [["Item1", string_type], ["Item2", class_type("Microsoft.FSharp.Control.FSharpAsync`1", [unit_type])], ["Item3", FocusState_$reflection()]], [["Item1", string_type], ["Item2", list_type(TestCase_$reflection())]], [["Item1", string_type], ["Item2", list_type(TestCase_$reflection())]]]);
}

export class Accuracy extends Record {
    constructor(absolute, relative) {
        super();
        this.absolute = absolute;
        this.relative = relative;
    }
}

export function Accuracy_$reflection() {
    return record_type("Fable.Pyxpecto.Accuracy", [], Accuracy, () => [["absolute", float64_type], ["relative", float64_type]]);
}

export const AccuracyModule_low = new Accuracy(1E-06, 0.001);

export const AccuracyModule_medium = new Accuracy(1E-08, 1E-05);

export const AccuracyModule_high = new Accuracy(1E-10, 1E-07);

export const AccuracyModule_veryHigh = new Accuracy(1E-12, 1E-09);

export function Test_testCase(name, body) {
    return new TestCase(0, [name, body, new FocusState(0, [])]);
}

export function Test_ptestCase(name, body) {
    return new TestCase(0, [name, body, new FocusState(1, [])]);
}

export function Test_ftestCase(name, body) {
    return new TestCase(0, [name, body, new FocusState(2, [])]);
}

export function Test_testCaseAsync(name, body) {
    return new TestCase(1, [name, body, new FocusState(0, [])]);
}

export function Test_ptestCaseAsync(name, body) {
    return new TestCase(1, [name, body, new FocusState(1, [])]);
}

export function Test_ftestCaseAsync(name, body) {
    return new TestCase(1, [name, body, new FocusState(2, [])]);
}

export function Test_testList(name, tests) {
    return new TestCase(2, [name, tests]);
}

export function Test_testSequenced(test) {
    switch (test.tag) {
        case 1: {
            const name_1 = test.fields[0];
            return new TestCase(3, [name_1, singleton(new TestCase(1, [name_1, test.fields[1], test.fields[2]]))]);
        }
        case 2:
            return new TestCase(3, [test.fields[0], test.fields[1]]);
        case 3:
            return new TestCase(3, [test.fields[0], test.fields[1]]);
        default: {
            const name = test.fields[0];
            return new TestCase(3, [name, singleton(new TestCase(0, [name, test.fields[1], test.fields[2]]))]);
        }
    }
}

export class Test_TestCaseBuilder {
    constructor(name, focusState) {
        this.name = name;
        this.focusState = focusState;
    }
}

export function Test_TestCaseBuilder_$reflection() {
    return class_type("Fable.Pyxpecto.Test.TestCaseBuilder", void 0, Test_TestCaseBuilder);
}

export function Test_TestCaseBuilder_$ctor_Z69FFBD2B(name, focusState) {
    return new Test_TestCaseBuilder(name, focusState);
}

export function Test_TestCaseBuilder__Zero(_) {
}

export function Test_TestCaseBuilder__Delay_1505(_, fn) {
    return fn;
}

export function Test_TestCaseBuilder__Using_Z3647408D(_, disposable, fn) {
    return Operators_Using(disposable, fn);
}

export function Test_TestCaseBuilder__While_Z4F211AEA(_, condition, fn) {
    while (condition()) {
        fn();
    }
}

export function Test_TestCaseBuilder__For_Z371464DD(_, sequence, fn) {
    const enumerator = getEnumerator(sequence);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            fn(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
    }
    finally {
        disposeSafe(enumerator);
    }
}

export function Test_TestCaseBuilder__Combine_3A59D1F3(_, fn1, fn2) {
    fn2();
    return fn1;
}

export function Test_TestCaseBuilder__TryFinally_33907399(_, fn, compensation) {
    try {
        return fn();
    }
    finally {
        compensation();
    }
}

export function Test_TestCaseBuilder__TryWith_Z570AC55B(_, fn, catchHandler) {
    try {
        return fn();
    }
    catch (e) {
        return catchHandler(e);
    }
}

export function Test_TestCaseBuilder__Run_3A5B6456(_, fn) {
    return new TestCase(0, [_.name, fn, _.focusState]);
}

export class Test_TestAsyncBuilder {
    constructor(name, focusState) {
        this.name = name;
        this.focusState = focusState;
    }
}

export function Test_TestAsyncBuilder_$reflection() {
    return class_type("Fable.Pyxpecto.Test.TestAsyncBuilder", void 0, Test_TestAsyncBuilder);
}

export function Test_TestAsyncBuilder_$ctor_Z69FFBD2B(name, focusState) {
    return new Test_TestAsyncBuilder(name, focusState);
}

export function Test_TestAsyncBuilder__Zero(_) {
    return singleton_1.Zero();
}

export function Test_TestAsyncBuilder__Delay_Z5276B41B(_, fn) {
    return singleton_1.Delay(fn);
}

export function Test_TestAsyncBuilder__Return_1505(_, x) {
    return singleton_1.Return(x);
}

export function Test_TestAsyncBuilder__ReturnFrom_ZD4A93B1(_, x) {
    return singleton_1.ReturnFrom(x);
}

export function Test_TestAsyncBuilder__Bind_7A510B33(_, computation, fn) {
    return singleton_1.Bind(computation, fn);
}

export function Test_TestAsyncBuilder__Using_14BA44F9(_, disposable, fn) {
    return singleton_1.Using(disposable, fn);
}

export function Test_TestAsyncBuilder__While_49259930(_, condition, fn) {
    return singleton_1.While(condition, fn);
}

export function Test_TestAsyncBuilder__For_Z23956591(_, sequence, fn) {
    return singleton_1.For(sequence, fn);
}

export function Test_TestAsyncBuilder__Combine_Z3AE9B5C1(_, fn1, fn2) {
    return singleton_1.Combine(fn1, fn2);
}

export function Test_TestAsyncBuilder__TryFinally_73399279(_, fn, compensation) {
    return singleton_1.TryFinally(fn, compensation);
}

export function Test_TestAsyncBuilder__TryWith_48476DCF(_, fn, catchHandler) {
    return singleton_1.TryWith(fn, catchHandler);
}

export function Test_TestAsyncBuilder__Run_Z3C5FE790(_, fn) {
    return new TestCase(1, [_.name, fn, _.focusState]);
}

export function Test_failtest(msg) {
    throw new Error(msg);
}

export function Test_failtestf(fmt, msg) {
    return toFail(fmt)(msg);
}

export function Expect_notEqual(actual, expected, msg) {
    assertNotEqual(actual, expected, msg);
}

function Expect_isNull$0027(cond) {
    if (equals(cond, defaultOf())) {
        return true;
    }
    else {
        return false;
    }
}

export function Expect_isNull(cond) {
    const actual = Expect_isNull$0027(cond);
    return (msg) => {
        const actual_1 = actual;
        const msg_1 = msg;
        if (actual_1 === true) {
            assertEqual(actual_1, true, msg_1);
        }
        else {
            throw new Error(`    Expected: ${'\033[96m'}${true}${'\033[0m'} 
    Actual: ${'\033[91m'}${actual_1}${'\033[0m'} 
    Message: ${msg_1}`);
        }
    };
}

export function Expect_isNotNull(cond) {
    const actual = Expect_isNull$0027(cond);
    return (msg) => {
        Expect_notEqual(actual, true, msg);
    };
}

export function Expect_isNotNaN(cond, msg) {
    if (Number.isNaN(cond)) {
        throw new Error(msg);
    }
}

export function Expect_isNotInfinity(cond, msg) {
    if (isInfinity(cond)) {
        throw new Error(msg);
    }
}

export function Expect_isTrue(cond) {
    return (msg) => {
        const actual = cond;
        const msg_1 = msg;
        if (actual === true) {
            assertEqual(actual, true, msg_1);
        }
        else {
            throw new Error(`    Expected: ${'\033[96m'}${true}${'\033[0m'} 
    Actual: ${'\033[91m'}${actual}${'\033[0m'} 
    Message: ${msg_1}`);
        }
    };
}

export function Expect_isFalse(cond) {
    return (msg) => {
        const actual = cond;
        const msg_1 = msg;
        if (actual === false) {
            assertEqual(actual, false, msg_1);
        }
        else {
            throw new Error(`    Expected: ${'\033[96m'}${false}${'\033[0m'} 
    Actual: ${'\033[91m'}${actual}${'\033[0m'} 
    Message: ${msg_1}`);
        }
    };
}

export function Expect_isZero(cond) {
    return (msg) => {
        const actual = cond | 0;
        const msg_1 = msg;
        if (actual === 0) {
            assertEqual(actual, 0, msg_1);
        }
        else {
            throw new Error(`    Expected: ${'\033[96m'}${0}${'\033[0m'} 
    Actual: ${'\033[91m'}${actual}${'\033[0m'} 
    Message: ${msg_1}`);
        }
    };
}

export function Expect_isEmpty(x, msg) {
    if (!isEmpty(x)) {
        toFail(printf("%s. Should be empty."))(msg);
    }
}

export function Expect_pass() {
    assertEqual(true, true, "The test passed");
}

export function Expect_passWithMsg(message) {
    const msg = message;
    assertEqual(true, true, msg);
}

export function Expect_exists(x, a, msg) {
    if (!exists(a, x)) {
        throw new Error(msg);
    }
}

export function Expect_all(x, a, msg) {
    if (!forAll(a, x)) {
        throw new Error(msg);
    }
}

/**
 * Expect the passed sequence not to be empty.
 */
export function Expect_isNonEmpty(x, msg) {
    if (isEmpty(x)) {
        toFail(printf("%s. Should not be empty."))(msg);
    }
}

/**
 * Expects x to be not null nor empty
 */
export function Expect_isNotEmpty(x, msg) {
    Expect_isNotNull(x)(msg);
    Expect_isNonEmpty(x, msg);
}

/**
 * Expects x to be a sequence of length `number`
 */
export function Expect_hasLength(x, number, msg) {
    const actual = length(x) | 0;
    const expected = number | 0;
    const msg_1 = toText(printf("%s. Expected %A to have length %i"))(msg)(x)(number);
    if (actual === expected) {
        assertEqual(actual, expected, msg_1);
    }
    else {
        throw new Error(`    Expected: ${'\033[96m'}${expected}${'\033[0m'} 
    Actual: ${'\033[91m'}${actual}${'\033[0m'} 
    Message: ${msg_1}`);
    }
}

/**
 * Expects x to be Result.Ok
 */
export function Expect_isOk(x, message) {
    if (x.tag === 1) {
        toFail(printf("%s. Expected Ok, was Error(\"%A\")."))(message)(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
    }
}

/**
 * Expects the value to be a Result.Ok value and returns it or fails the test
 */
export function Expect_wantOk(x, message) {
    if (x.tag === 1) {
        return toFail(printf("%s. Expected Ok, was Error(\"%A\")."))(message)(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
        return x.fields[0];
    }
}

export function Expect_stringContains(subject, substring, message) {
    if (!(subject.indexOf(substring) >= 0)) {
        toFail(printf("%s. Expected subject string \'%s\' to contain substring \'%s\'."))(message)(subject)(substring);
    }
    else {
        Expect_passWithMsg(message);
    }
}

/**
 * Expects x to be Result.Error
 */
export function Expect_isError(x, message) {
    if (x.tag === 0) {
        toFail(printf("%s. Expected Error _, was Ok(%A)."))(message)(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
    }
}

export function Expect_isSome(x, message) {
    if (x == null) {
        toFail(printf("%s. Expected Some _, was None."))(message);
    }
    else {
        Expect_passWithMsg(message);
    }
}

/**
 * Expects the value to be a Some x value and returns x or fails the test
 */
export function Expect_wantSome(x, message) {
    if (x == null) {
        return toFail(printf("%s. Expected Some _, was None."))(message);
    }
    else {
        const x$0027 = value_2(x);
        Expect_passWithMsg(message);
        return x$0027;
    }
}

/**
 * Expects the value to be a Result.Error value and returns it or fails the test
 */
export function Expect_wantError(x, message) {
    if (x.tag === 0) {
        return toFail(printf("%s. Expected Error _, was Ok(%A)."))(message)(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
        return x.fields[0];
    }
}

export function Expect_isNone(x, message) {
    if (x != null) {
        const x$0027 = value_2(x);
        toFail(printf("%s. Expected None, was Some(%A)."))(message)(x$0027);
    }
    else {
        Expect_passWithMsg(message);
    }
}

function Expect_throws$0027(f) {
    try {
        f();
        return void 0;
    }
    catch (exn) {
        return exn;
    }
}

/**
 * Expects the passed function to throw an exception
 */
export function Expect_throws(f, msg) {
    const matchValue = Expect_throws$0027(f);
    if (matchValue != null) {
    }
    else {
        toFail(printf("%s. Expected f to throw."))(msg);
    }
}

/**
 * Expects the passed function to throw, then calls `cont` with the exception
 */
export function Expect_throwsC(f, cont) {
    const matchValue = Expect_throws$0027(f);
    if (matchValue != null) {
        return cont(matchValue);
    }
    else {
        return toFail(printf("Expected f to throw."));
    }
}

/**
 * Expects the `actual` sequence to contain all elements from `expected`
 * It doesn't take into account the number of occurrences and the order of elements.
 * Calling this function will enumerate both sequences; they have to be finite.
 */
export function Expect_containsAll(actual, expected, message) {
    const matchValue = ofSeq(actual);
    const expectedEls = ofSeq(expected);
    const actualEls = matchValue;
    const matchingEls = filter((a) => contains(a, expectedEls, {
        Equals: equals,
        GetHashCode: structuralHash,
    }), actualEls);
    const extraEls = filter((a_1) => !contains(a_1, matchingEls, {
        Equals: equals,
        GetHashCode: structuralHash,
    }), actualEls);
    const missingEls = filter((e) => !contains(e, matchingEls, {
        Equals: equals,
        GetHashCode: structuralHash,
    }), expectedEls);
    if (isEmpty_1(missingEls)) {
    }
    else {
        Test_failtest(toText(printf("%s. Sequence `actual` does not contain all `expected` elements. Missing elements from `actual`: %A. Extra elements in `actual`: %A"))(message)(missingEls)(extraEls));
    }
}

/**
 * Expects `actual` and `expected` (that are both floats) to be within a
 * given `accuracy`.
 */
export function Expect_floatClose(accuracy, actual, expected, message) {
    let a, b, m_1;
    if (isInfinity(actual)) {
        Test_failtestf(printf("%s. Expected actual to not be infinity, but it was."), message);
    }
    else if (isInfinity(expected)) {
        Test_failtestf(printf("%s. Expected expected to not be infinity, but it was."), message);
    }
    else if (!((a = actual, (b = expected, Math.abs(a - b) <= ((m_1 = accuracy, m_1.absolute + (m_1.relative * max(Math.abs(a), Math.abs(b))))))))) {
        let arg;
        const m_2 = accuracy;
        arg = (m_2.absolute + (m_2.relative * max(Math.abs(actual), Math.abs(expected))));
        const arg_3 = Math.abs(actual - expected);
        Test_failtestf(printf("%s. Expected difference to be less than %.20g for accuracy {absolute=%.20g; relative=%.20g}, but was %.20g. actual=%.20g expected=%.20g"), message)(arg)(accuracy.absolute)(accuracy.relative)(arg_3)(actual)(expected);
    }
}

/**
 * Expects `actual` to be less than `expected` or to be within a
 * given `accuracy`.
 */
export function Expect_floatLessThanOrClose(accuracy, actual, expected, message) {
    if (actual > expected) {
        Expect_floatClose(accuracy, actual, expected, message);
    }
}

/**
 * Expects `actual` to be greater than `expected` or to be within a
 * given `accuracy`.
 */
export function Expect_floatGreaterThanOrClose(accuracy, actual, expected, message) {
    if (actual < expected) {
        Expect_floatClose(accuracy, actual, expected, message);
    }
}

export function Pyxpecto_isFocused(test) {
    let matchResult, tests, tests_1;
    switch (test.tag) {
        case 1: {
            if (test.fields[2].tag === 2) {
                matchResult = 1;
            }
            else {
                matchResult = 4;
            }
            break;
        }
        case 2: {
            matchResult = 2;
            tests = test.fields[1];
            break;
        }
        case 3: {
            matchResult = 3;
            tests_1 = test.fields[1];
            break;
        }
        default:
            if (test.fields[2].tag === 2) {
                matchResult = 0;
            }
            else {
                matchResult = 4;
            }
    }
    switch (matchResult) {
        case 0:
            return true;
        case 1:
            return true;
        case 2:
            return exists_1(Pyxpecto_isFocused, tests);
        case 3:
            return exists_1(Pyxpecto_isFocused, tests_1);
        default:
            return false;
    }
}

function Pyxpecto_flattenTests(lastName, _arg) {
    switch (_arg.tag) {
        case 1: {
            const name_1 = _arg.fields[0];
            return singleton(new TestCase(1, [isNullOrWhiteSpace(lastName) ? name_1 : toText(printf("%s - %s"))(lastName)(name_1), _arg.fields[1], _arg.fields[2]]));
        }
        case 2:
            return toList(delay(() => collect((test_2) => Pyxpecto_flattenTests(_arg.fields[0], test_2), _arg.fields[1])));
        case 3:
            return toList(delay(() => collect((test_3) => Pyxpecto_flattenTests(_arg.fields[0], test_3), _arg.fields[1])));
        default: {
            const name = _arg.fields[0];
            return singleton(new TestCase(0, [isNullOrWhiteSpace(lastName) ? name : toText(printf("%s - %s"))(lastName)(name), _arg.fields[1], _arg.fields[2]]));
        }
    }
}

export function Pyxpecto_checkFocused(test) {
    let hasFocused = false;
    const loop = (_arg) => {
        let matchResult, tests;
        switch (_arg.tag) {
            case 0: {
                if (_arg.fields[2].tag === 2) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
                break;
            }
            case 3: {
                matchResult = 2;
                tests = _arg.fields[1];
                break;
            }
            case 2: {
                matchResult = 2;
                tests = _arg.fields[1];
                break;
            }
            default:
                if (_arg.fields[2].tag === 2) {
                    matchResult = 0;
                }
                else {
                    matchResult = 1;
                }
        }
        switch (matchResult) {
            case 0: {
                hasFocused = true;
                break;
            }
            case 1: {
                break;
            }
            case 2: {
                const enumerator = getEnumerator(tests);
                try {
                    while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
                        loop(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
                    }
                }
                finally {
                    disposeSafe(enumerator);
                }
                break;
            }
        }
    };
    loop(test);
    return hasFocused;
}

export const Pyxpecto_PyBindings_cmd_args = sys.argv;

export class Pyxpecto_CustomTestRunner {
    constructor(test) {
        const hasFocused = Pyxpecto_checkFocused(test);
        let verifyFocusedAllowed;
        if (contains_1("--fail-on-focused-tests", Pyxpecto_PyBindings_cmd_args, {
            Equals: (x, y) => (x === y),
            GetHashCode: stringHash,
        }) && hasFocused) {
            throw new Error(`${'\033[91m'}Cannot run focused tests with '${"--fail-on-focused-tests"}' commandline arg.${'\033[0m'}`);
        }
        else {
            verifyFocusedAllowed = void 0;
        }
        this["SuccessfulTests@"] = 0;
        this["FailedTests@"] = 0;
        this["IgnoredTests@"] = 0;
        this["HasFocused@"] = hasFocused;
    }
    printSuccessMsg(name) {
        const this$ = this;
        toConsole(`${this$.HasFocused ? "💎 | " : ""}✔️ ${name}`);
    }
    printErrorMsg(name, msg) {
        const this$ = this;
        toConsole(`${this$.HasFocused ? "💎 | " : ""}❌ ${name}
${msg}`);
    }
    printSkipPendingMsg(name) {
        toConsole(printf("🚧 skipping \'%s\' due to it being marked as pending"))(name);
    }
    get SuccessfulTests() {
        const __ = this;
        return __["SuccessfulTests@"] | 0;
    }
    set SuccessfulTests(v) {
        const __ = this;
        __["SuccessfulTests@"] = (v | 0);
    }
    get FailedTests() {
        const __ = this;
        return __["FailedTests@"] | 0;
    }
    set FailedTests(v) {
        const __ = this;
        __["FailedTests@"] = (v | 0);
    }
    get IgnoredTests() {
        const __ = this;
        return __["IgnoredTests@"] | 0;
    }
    set IgnoredTests(v) {
        const __ = this;
        __["IgnoredTests@"] = (v | 0);
    }
    get HasFocused() {
        const __ = this;
        return __["HasFocused@"];
    }
    get SumTests() {
        const this$ = this;
        return (this$.SuccessfulTests + this$.FailedTests) | 0;
    }
    RunSyncTest(name, body) {
        const this$ = this;
        try {
            body();
            this$.SuccessfulTests = ((this$.SuccessfulTests + 1) | 0);
            this$.printSuccessMsg(name);
        }
        catch (e) {
            this$.FailedTests = ((this$.FailedTests + 1) | 0);
            const arg_1 = e.message;
            this$.printErrorMsg(name, arg_1);
        }
    }
    RunAsyncTest(name, body) {
        const this$ = this;
        try {
            runSynchronously(singleton_1.Delay(() => singleton_1.Bind(body, () => {
                this$.SuccessfulTests = ((this$.SuccessfulTests + 1) | 0);
                this$.printSuccessMsg(name);
                return singleton_1.Zero();
            })));
        }
        catch (e) {
            this$.FailedTests = ((this$.FailedTests + 1) | 0);
            const arg_2 = e.message;
            this$.printErrorMsg(name, arg_2);
        }
    }
    SkipPendingTest(name) {
        const this$ = this;
        this$.IgnoredTests = ((this$.IgnoredTests + 1) | 0);
        this$.printSkipPendingMsg(name);
    }
    SkipUnfocusedTest() {
        const this$ = this;
        this$.IgnoredTests = ((this$.IgnoredTests + 1) | 0);
    }
}

export function Pyxpecto_CustomTestRunner_$reflection() {
    return class_type("Fable.Pyxpecto.Pyxpecto.CustomTestRunner", void 0, Pyxpecto_CustomTestRunner);
}

export function Pyxpecto_CustomTestRunner_$ctor_Z1F0D1F49(test) {
    return new Pyxpecto_CustomTestRunner(test);
}

function Pyxpecto_runViaPy(test) {
    const runner = new Pyxpecto_CustomTestRunner(test);
    const run = (runner_1, test_1) => {
        let matchResult, name_2, testCases;
        switch (test_1.tag) {
            case 1: {
                matchResult = 1;
                break;
            }
            case 3: {
                matchResult = 2;
                name_2 = test_1.fields[0];
                testCases = test_1.fields[1];
                break;
            }
            case 2: {
                matchResult = 2;
                name_2 = test_1.fields[0];
                testCases = test_1.fields[1];
                break;
            }
            default:
                matchResult = 0;
        }
        switch (matchResult) {
            case 0: {
                const test_2 = test_1.fields[1];
                const name = test_1.fields[0];
                const focus = test_1.fields[2];
                const matchValue = runner_1.HasFocused;
                let matchResult_1;
                if (matchValue) {
                    if (focus.tag === 2) {
                        matchResult_1 = 2;
                    }
                    else {
                        matchResult_1 = 3;
                    }
                }
                else {
                    switch (focus.tag) {
                        case 0: {
                            matchResult_1 = 0;
                            break;
                        }
                        case 1: {
                            matchResult_1 = 1;
                            break;
                        }
                        default:
                            matchResult_1 = 3;
                    }
                }
                switch (matchResult_1) {
                    case 0: {
                        runner_1.RunSyncTest(name, test_2);
                        break;
                    }
                    case 1: {
                        runner_1.SkipPendingTest(name);
                        break;
                    }
                    case 2: {
                        runner_1.RunSyncTest(name, test_2);
                        break;
                    }
                    case 3: {
                        runner_1.SkipUnfocusedTest();
                        break;
                    }
                }
                break;
            }
            case 1: {
                const test_3 = test_1.fields[1];
                const name_1 = test_1.fields[0];
                const focus_1 = test_1.fields[2];
                const matchValue_2 = runner_1.HasFocused;
                let matchResult_2;
                if (matchValue_2) {
                    if (focus_1.tag === 2) {
                        matchResult_2 = 2;
                    }
                    else {
                        matchResult_2 = 3;
                    }
                }
                else {
                    switch (focus_1.tag) {
                        case 0: {
                            matchResult_2 = 0;
                            break;
                        }
                        case 1: {
                            matchResult_2 = 1;
                            break;
                        }
                        default:
                            matchResult_2 = 3;
                    }
                }
                switch (matchResult_2) {
                    case 0: {
                        runner_1.RunAsyncTest(name_1, test_3);
                        break;
                    }
                    case 1: {
                        runner_1.SkipPendingTest(name_1);
                        break;
                    }
                    case 2: {
                        runner_1.RunAsyncTest(name_1, test_3);
                        break;
                    }
                    case 3: {
                        runner_1.SkipUnfocusedTest();
                        break;
                    }
                }
                break;
            }
            case 2: {
                const list_1 = collect_1((t) => Pyxpecto_flattenTests(name_2, t), testCases);
                iterate(curry2(run)(runner_1), list_1);
                break;
            }
        }
    };
    toConsole(printf("🚀 start running tests ..."));
    run(runner, test);
    const innerMsgString = `${'\033[36m'}${runner.SumTests}${'\033[0m'} tests run - ${'\033[92m'}${runner.SuccessfulTests}${'\033[0m'} passed, ${'\033[36m'}${runner.IgnoredTests}${'\033[0m'} ignored, ${'\033[91m'}${runner.FailedTests}${'\033[0m'} failed`;
    const msg = toString(StringBuilder__AppendLine_Z721C83C5(StringBuilder__AppendLine_Z721C83C5(StringBuilder__AppendLine_Z721C83C5(StringBuilder_$ctor(), "-------------------------------------------------------------------------------"), innerMsgString), "-------------------------------------------------------------------------------"));
    toConsole(printf("%s"))(msg);
    const matchValue_4 = runner.FailedTests | 0;
    if (matchValue_4 === 1) {
        toConsole(`${'\033[91m'}${runner.FailedTests} test failed!${'\033[0m'}`);
        return 1;
    }
    else if (matchValue_4 > 1) {
        toConsole(`${'\033[91m'}${matchValue_4} tests failed!${'\033[0m'}`);
        return 1;
    }
    else {
        toConsole(`${'\033[92m'}Success!${'\033[0m'}`);
        return 0;
    }
}

function Pyxpecto_runViaDotnet(test) {
    throw new Error("Currently not implemented, use Expecto for now.");
    return 1;
}

export function Pyxpecto_runTests(test) {
    return Pyxpecto_runViaPy(test);
}

