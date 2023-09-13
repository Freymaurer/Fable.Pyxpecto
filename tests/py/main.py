from __future__ import annotations
from math import (nan, inf)
import sys
from typing import Any
from src.pyxpecto import Test_TestCaseBuilder__ctor_Z69FFBD2B
from src.pyxpecto import (Test_testSequenced, Test_testList, Test_testCaseAsync, Test_testCase, Expect_isTrue, TestCase, Expect_isFalse, Expect_isOk, Expect_throwsC, Expect_isEmpty, Expect_isNonEmpty, Expect_wantOk, Expect_stringContains, Expect_isError, Expect_wantError, Expect_isSome, Expect_wantSome, Expect_isNone, Expect_isNotNull, Expect_isNull, Expect_isNotNaN, Expect_throws, Expect_floatClose, AccuracyModule_low, Expect_floatLessThanOrClose, Expect_floatGreaterThanOrClose, Expect_isNotInfinity, Test_ptestCase, Test_ptestCaseAsync, FocusState, Test_TestCaseBuilder, Test_TestCaseBuilder__Run_3A5B6456, Test_TestCaseBuilder__Delay_1505, Expect_containsAll, Test_TestCaseBuilder__Zero, Expect_notEqual, Test_ftestCase, Test_ftestCaseAsync, Pyxpecto_runTests)
from fable_modules.fable_library.async_ import sleep
from fable_modules.fable_library.async_builder import (singleton, Async)
from fable_modules.fable_library.choice import FSharpResult_2
from fable_modules.fable_library.double import divide
from fable_modules.fable_library.list import (singleton as singleton_1, of_array)
from fable_modules.fable_library.string_ import (to_fail, printf)
from fable_modules.fable_library.types import Array
from fable_modules.fable_library.util import (assert_equal, to_enumerable, equals)

def _arrow6(__unit: None=None) -> Async[None]:
    def _arrow5(__unit: None=None) -> Async[None]:
        return singleton.Return()

    return singleton.Bind(sleep(1000), _arrow5)


def body_1(__unit: None=None) -> None:
    Expect_isTrue(True)("this should work")


def _arrow8(__unit: None=None) -> Async[None]:
    def _arrow7(__unit: None=None) -> Async[None]:
        return singleton.Return()

    return singleton.Bind(sleep(1000), _arrow7)


def body_3(__unit: None=None) -> None:
    Expect_isTrue(True)("")


def body_4(__unit: None=None) -> None:
    Expect_isTrue(True)("")


def _arrow13(__unit: None=None) -> Async[None]:
    def _arrow12(__unit: None=None) -> Async[None]:
        Expect_isTrue(True)("this should work")
        return singleton.Zero()

    return singleton.Bind(sleep(1000), _arrow12)


tests_sequential: TestCase = Test_testSequenced(Test_testList("Sequential", of_array([Test_testCaseAsync("one", singleton.Delay(_arrow6)), Test_testCase("sync one", body_1), Test_testCaseAsync("two", singleton.Delay(_arrow8)), Test_testCase("sync two", body_3), Test_testList("Many", singleton_1(Test_testCase("syncThree", body_4))), Test_testCaseAsync("three", singleton.Delay(_arrow13))])))

def body(__unit: None=None) -> None:
    actual: int = 2
    if actual == 2:
        assert_equal(actual, 2, "Should be equal")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(2)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be equal") + "")



def body_1(__unit: None=None) -> None:
    Expect_isFalse(False)("Should be equal")


def body_2(__unit: None=None) -> None:
    raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(3)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(2)) + "") + ('\033[0m')) + " \n\b    Message: ") + "They are the same") + "")


def body_3(__unit: None=None) -> None:
    Expect_isOk(FSharpResult_2(0, True), "Should be Ok")


def body_4(__unit: None=None) -> None:
    def case(__unit: None=None) -> None:
        Expect_isOk(FSharpResult_2(1, "fails"), "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch(exn: Exception) -> None:
        actual_5: str = str(exn)
        if actual_5 == "Should fail. Expected Ok, was Error(\"fails\").":
            assert_equal(actual_5, "Should fail. Expected Ok, was Error(\"fails\").", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Expected Ok, was Error(\"fails\").") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_5) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case, catch)


def body_5(__unit: None=None) -> None:
    Expect_isEmpty(to_enumerable([]), "Should be empty")


def body_6(__unit: None=None) -> None:
    def case_1(__unit: None=None) -> None:
        Expect_isEmpty(to_enumerable([1]), "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_1(exn_1: Exception) -> None:
        actual_9: str = str(exn_1)
        if actual_9 == "Should fail. Should be empty.":
            assert_equal(actual_9, "Should fail. Should be empty.", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Should be empty.") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_9) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_1, catch_1)


def body_7(__unit: None=None) -> None:
    Expect_isNonEmpty(to_enumerable([1]), "Should not be empty")


def body_8(__unit: None=None) -> None:
    def case_2(__unit: None=None) -> None:
        Expect_isNonEmpty(to_enumerable([]), "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_2(exn_2: Exception) -> None:
        actual_13: str = str(exn_2)
        if actual_13 == "Should fail. Should not be empty.":
            assert_equal(actual_13, "Should fail. Should not be empty.", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Should not be empty.") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_13) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_2, catch_2)


def body_9(__unit: None=None) -> None:
    actual_15: bool = Expect_wantOk(FSharpResult_2(0, True), "Should be Ok")
    if actual_15 == True:
        assert_equal(actual_15, True, "Should be true")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_15)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be true") + "")



def body_10(__unit: None=None) -> None:
    def case_3(__unit: None=None) -> None:
        Expect_wantOk(FSharpResult_2(1, True), "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_3(exn_3: Exception) -> None:
        Expect_stringContains(str(exn_3), "Expected Ok", "Error contains the error message")

    Expect_throwsC(case_3, catch_3)


def body_11(__unit: None=None) -> None:
    Expect_isError(FSharpResult_2(1, "Is Error"), "Should be Error")


def body_12(__unit: None=None) -> None:
    def case_4(__unit: None=None) -> None:
        Expect_isError(FSharpResult_2(0, True), "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_4(exn_4: Exception) -> None:
        Expect_stringContains(str(exn_4), "Expected Error", "error message part is present")

    Expect_throwsC(case_4, catch_4)


def body_13(__unit: None=None) -> None:
    actual_22: bool = Expect_wantError(FSharpResult_2(1, True), "Should be Error")
    if actual_22 == True:
        assert_equal(actual_22, True, "Should be true")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_22)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be true") + "")



def body_14(__unit: None=None) -> None:
    def case_5(__unit: None=None) -> None:
        Expect_wantError(FSharpResult_2(0, True), "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_5(exn_5: Exception) -> None:
        Expect_stringContains(str(exn_5), "Expected Error", "Error message contains the correct error")

    Expect_throwsC(case_5, catch_5)


def body_15(__unit: None=None) -> None:
    Expect_isSome(True, "Should be Some")


def body_16(__unit: None=None) -> None:
    def case_6(__unit: None=None) -> None:
        Expect_isSome(None, "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_6(exn_6: Exception) -> None:
        actual_28: str = str(exn_6)
        if actual_28 == "Should fail. Expected Some _, was None.":
            assert_equal(actual_28, "Should fail. Expected Some _, was None.", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Expected Some _, was None.") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_28) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_6, catch_6)


def body_17(__unit: None=None) -> None:
    actual_30: bool = Expect_wantSome(True, "Should be Some")
    if actual_30 == True:
        assert_equal(actual_30, True, "Should be true")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_30)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be true") + "")



def body_18(__unit: None=None) -> None:
    def case_7(__unit: None=None) -> None:
        Expect_isSome(None, "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_7(exn_7: Exception) -> None:
        actual_33: str = str(exn_7)
        if actual_33 == "Should fail. Expected Some _, was None.":
            assert_equal(actual_33, "Should fail. Expected Some _, was None.", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Expected Some _, was None.") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_33) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_7, catch_7)


def body_19(__unit: None=None) -> None:
    Expect_isNone(None, "Should be Some")


def body_20(__unit: None=None) -> None:
    def case_8(__unit: None=None) -> None:
        Expect_isNone(True, "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    def catch_8(exn_8: Exception) -> None:
        actual_37: str = str(exn_8)
        if actual_37 == "Should fail. Expected None, was Some(true).":
            assert_equal(actual_37, "Should fail. Expected None, was Some(true).", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Expected None, was Some(true).") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_37) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_8, catch_8)


def body_21(__unit: None=None) -> None:
    Expect_isNotNull("not null")("Should not be null")


def body_22(__unit: None=None) -> None:
    Expect_isNull(None)("Should not be null")


def body_23(__unit: None=None) -> None:
    Expect_isNotNaN(20.4, "Should not be nan")


def body_24(__unit: None=None) -> None:
    def case_9(__unit: None=None) -> None:
        actual_41: float = nan
        Expect_isNotNaN(actual_41, "Should fail")

    Expect_throws(case_9, "Should have failed")


def body_25(__unit: None=None) -> None:
    Expect_floatClose(AccuracyModule_low, 0.1, 0.1, "Should be close enough")


def body_26(__unit: None=None) -> None:
    def case_10(__unit: None=None) -> None:
        Expect_floatClose(AccuracyModule_low, 0.1, 2.0, "Should be far enough apart")

    Expect_throws(case_10, "Should have failed")


def body_27(__unit: None=None) -> None:
    Expect_floatLessThanOrClose(AccuracyModule_low, 0.1, 0.1, "Should be close enough")


def body_28(__unit: None=None) -> None:
    def case_11(__unit: None=None) -> None:
        Expect_floatLessThanOrClose(AccuracyModule_low, 2.0, 1.0, "Should be far enough apart")

    Expect_throws(case_11, "Should have failed")


def body_29(__unit: None=None) -> None:
    Expect_floatGreaterThanOrClose(AccuracyModule_low, 0.123, 0.123, "Should be close enough")


def body_30(__unit: None=None) -> None:
    def case_12(__unit: None=None) -> None:
        Expect_floatGreaterThanOrClose(AccuracyModule_low, 1.0, 2.0, "Should be far enough apart")

    Expect_throws(case_12, "Should have failed")


def body_31(__unit: None=None) -> None:
    def case_13(__unit: None=None) -> None:
        raise Exception("Should fail")

    def catch_9(exn_9: Exception) -> None:
        actual_42: str = str(exn_9)
        if actual_42 == "Should fail":
            assert_equal(actual_42, "Should fail", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_42) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_13, catch_9)


def body_32(__unit: None=None) -> None:
    def case_14(__unit: None=None) -> None:
        to_fail(printf("%s%s"))("Should fail")("!")

    def catch_10(exn_10: Exception) -> None:
        actual_43: str = str(exn_10)
        if actual_43 == "Should fail!":
            assert_equal(actual_43, "Should fail!", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail!") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_43) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")


    Expect_throwsC(case_14, catch_10)


def body_33(__unit: None=None) -> None:
    Expect_isNotInfinity(20.4, "Shouldn\'t be infinity")


def body_34(__unit: None=None) -> None:
    def case_15(__unit: None=None) -> None:
        actual_45: float = inf
        Expect_isNotInfinity(actual_45, "Should fail")

    Expect_throws(case_15, "Should have failed")


def _arrow19(__unit: None=None) -> Async[None]:
    def _arrow18(__unit: None=None) -> Async[None]:
        def _arrow16(__unit: None=None) -> Async[int]:
            return singleton.Return(21)

        def _arrow17(_arg_34: int) -> Async[None]:
            actual_46: int = (_arg_34 * 2) or 0
            if actual_46 == 42:
                assert_equal(actual_46, 42, "Should be equal")

            else: 
                raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(42)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_46)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be equal") + "")

            return singleton.Zero()

        return singleton.Bind(singleton.Delay(_arrow16), _arrow17)

    return singleton.Bind(sleep(3000), _arrow18)


def body_36(__unit: None=None) -> None:
    raise Exception("Shouldn\'t be running this test")


def _arrow20(__unit: None=None) -> Async[None]:
    raise Exception("Shouldn\'t be running this test")
    return singleton.Zero()


def body_38(__unit: None=None) -> None:
    Expect_stringContains("Hello, World!", "World", "Should contain string")


def body_39(__unit: None=None) -> None:
    try: 
        Expect_stringContains("Hello, Mocha!", "World", "Should fail")
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should not be tested") + "")

    except Exception as ex:
        actual_48: str = str(ex)
        if actual_48 == "Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.":
            assert_equal(actual_48, "Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.", "Error messages should be the same")

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + "Should fail. Expected subject string \'Hello, Mocha!\' to contain substring \'World\'.") + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + actual_48) + "") + ('\033[0m')) + " \n\b    Message: ") + "Error messages should be the same") + "")




def _arrow26(__unit: None=None) -> TestCase:
    _builder_3: Test_TestCaseBuilder = Test_TestCaseBuilder__ctor_Z69FFBD2B("identical sequence", FocusState(0))
    def _arrow23(__unit: None=None) -> None:
        Expect_containsAll(to_enumerable([21, 37]), to_enumerable([21, 37]), "Identical sequences")
        Test_TestCaseBuilder__Zero(_builder_3)

    return Test_TestCaseBuilder__Run_3A5B6456(_builder_3, Test_TestCaseBuilder__Delay_1505(_builder_3, _arrow23))


def _arrow28(__unit: None=None) -> TestCase:
    _builder_4: Test_TestCaseBuilder = Test_TestCaseBuilder__ctor_Z69FFBD2B("sequence contains all in different order", FocusState(0))
    def _arrow27(__unit: None=None) -> None:
        Expect_containsAll(to_enumerable([21, 37]), to_enumerable([37, 21]), "Same elements in different order")
        Test_TestCaseBuilder__Zero(_builder_4)

    return Test_TestCaseBuilder__Run_3A5B6456(_builder_4, Test_TestCaseBuilder__Delay_1505(_builder_4, _arrow27))


tests_basic: TestCase = Test_testList("Basic", of_array([Test_testCase("testCase works with numbers", body), Test_testCase("isFalse works", body_1), Test_testCase("areEqual with msg", body_2), Test_testCase("isOk works correctly", body_3), Test_testCase("isOk fails correctly", body_4), Test_testCase("isEmpty works correctly", body_5), Test_testCase("isEmpty fails correctly", body_6), Test_testCase("isNonEmpty works correctly", body_7), Test_testCase("isNonEmpty fails correctly", body_8), Test_testCase("wantOk works correctly", body_9), Test_testCase("wantOk fails correctly", body_10), Test_testCase("isError works correctly", body_11), Test_testCase("isError fails correctly", body_12), Test_testCase("wantError works correctly", body_13), Test_testCase("wantError fails correctly", body_14), Test_testCase("isSome works correctly", body_15), Test_testCase("isSome fails correctly", body_16), Test_testCase("wantSome works correctly", body_17), Test_testCase("wantSome fails correctly", body_18), Test_testCase("isNone works correctly", body_19), Test_testCase("isNone fails correctly", body_20), Test_testCase("isNotNull works correctly", body_21), Test_testCase("isNull works correctly", body_22), Test_testCase("isNotNaN works correctly", body_23), Test_testCase("isNotNaN fails correctly", body_24), Test_testCase("floatClose works correctly", body_25), Test_testCase("floatClose fails correctly", body_26), Test_testCase("floatLessThanOrClose works correctly", body_27), Test_testCase("floatLessThanOrClose fails correctly", body_28), Test_testCase("floatGreaterThanOrClose works correctly", body_29), Test_testCase("floatGreaterThanOrClose fails correctly", body_30), Test_testCase("failwith fails correctly", body_31), Test_testCase("failwithf fails correctly", body_32), Test_testCase("isNotInfinity works correctly", body_33), Test_testCase("isNotInfinity fails correctly", body_34), Test_testCaseAsync("testCaseAsync works", singleton.Delay(_arrow19)), Test_ptestCase("skipping this one", body_36), Test_ptestCaseAsync("skipping this one async", singleton.Delay(_arrow20)), Test_testCase("stringContains works correctly", body_38), Test_testCase("stringContains fails correctly", body_39), Test_testList("containsAll", of_array([_arrow26(), _arrow28()]))]))

def body(__unit: None=None) -> None:
    actual: float = divide(31415.0, 10000.0)
    if actual == 3.1415:
        assert_equal(actual, 3.1415, "Should be equal")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(3.1415)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be equal") + "")



second_module_tests: TestCase = Test_testList("second Module tests", singleton_1(Test_testCase("module works properly", body)))

def body(__unit: None=None) -> None:
    actual_1: dict[str, Any] = {
        "one": "one",
        "two": 2
    }
    expected_1: dict[str, Any] = {
        "one": "one",
        "two": 2
    }
    if equals(actual_1, expected_1):
        assert_equal(actual_1, expected_1, "Should be equal")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(expected_1)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_1)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be equal") + "")



def body_1(__unit: None=None) -> None:
    Expect_notEqual({
        "one": "one",
        "two": 2
    }, {
        "one": "one",
        "two": 1
    }, "Should be equal")


structural_equality_tests: TestCase = Test_testList("testing records", of_array([Test_testCase("they are equal", body), Test_testCase("they are not equal", body_1)]))

def body(__unit: None=None) -> None:
    Expect_isTrue(True)("Should be true")


nested_test_case: TestCase = Test_testList("Nested", singleton_1(Test_testList("Nested even more", singleton_1(Test_testCase("Nested test case", body)))))

def body(__unit: None=None) -> None:
    actual: int = 2
    if actual == 2:
        assert_equal(actual, 2, "Should be equal")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(2)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be equal") + "")



def _arrow29(__unit: None=None) -> Async[None]:
    actual_1: int = 2
    if actual_1 == 2:
        assert_equal(actual_1, 2, "Should be equal")

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(2)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_1)) + "") + ('\033[0m')) + " \n\b    Message: ") + "Should be equal") + "")

    return singleton.Zero()


focused_tests_cases: TestCase = Test_testList("Focused", of_array([Test_ftestCase("Focused sync test", body), Test_ftestCaseAsync("Focused async test", singleton.Delay(_arrow29))]))

all: TestCase = Test_testList("All", of_array([tests_sequential, tests_basic, second_module_tests, structural_equality_tests, nested_test_case]))

def main(argv: Array[str]) -> int:
    return Pyxpecto_runTests(all)


if __name__ == "__main__":
    main(sys.argv[1:])


