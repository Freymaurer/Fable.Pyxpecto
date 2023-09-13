from __future__ import annotations
from dataclasses import dataclass
from math import (isnan, isinf)
import sys
from typing import (Any, List, Callable, TypeVar, Optional)
from fable_modules.fable_library.array_ import contains as contains_1
from fable_modules.fable_library.async_ import run_synchronously
from fable_modules.fable_library.async_builder import (Async, singleton as singleton_1)
from fable_modules.fable_library.choice import FSharpResult_2
from fable_modules.fable_library.fsharp_core import Operators_Using
from fable_modules.fable_library.list import (FSharpList, singleton, of_seq, filter, contains, is_empty as is_empty_1, exists as exists_1, collect as collect_1, iterate)
from fable_modules.fable_library.option import value as value_2
from fable_modules.fable_library.reflection import (TypeInfo, union_type, string_type, unit_type, lambda_type, class_type, list_type, float64_type, record_type)
from fable_modules.fable_library.seq import (is_empty, exists, for_all, length, to_list, delay, collect)
from fable_modules.fable_library.string_ import (to_fail, printf, to_text, is_null_or_white_space, to_console)
from fable_modules.fable_library.system_text import (StringBuilder__AppendLine_Z721C83C5, StringBuilder__ctor)
from fable_modules.fable_library.types import (Array, Union, Record, to_string)
from fable_modules.fable_library.util import (IEnumerable_1, get_enumerator, assert_not_equal, equals, assert_equal, structural_hash, max, compare_primitives, string_hash, curry2)

__G = TypeVar("__G")

__E = TypeVar("__E")

__F = TypeVar("__F")

__D = TypeVar("__D")

__C = TypeVar("__C")

__B = TypeVar("__B")

__A = TypeVar("__A")

__K = TypeVar("__K")

__J = TypeVar("__J")

__I = TypeVar("__I")

__H = TypeVar("__H")

_A = TypeVar("_A")

_B = TypeVar("_B")

__A_ = TypeVar("__A_")

def _expr9() -> TypeInfo:
    return union_type("Fable.Pyxpecto.FocusState", [], FocusState, lambda: [[], [], []])


class FocusState(Union):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> List[str]:
        return ["Normal", "Pending", "Focused"]


FocusState_reflection = _expr9

def _expr10() -> TypeInfo:
    return union_type("Fable.Pyxpecto.TestCase", [], TestCase, lambda: [[("Item1", string_type), ("Item2", lambda_type(unit_type, unit_type)), ("Item3", FocusState_reflection())], [("Item1", string_type), ("Item2", class_type("Microsoft.FSharp.Control.FSharpAsync`1", [unit_type])), ("Item3", FocusState_reflection())], [("Item1", string_type), ("Item2", list_type(TestCase_reflection()))], [("Item1", string_type), ("Item2", list_type(TestCase_reflection()))]])


class TestCase(Union):
    def __init__(self, tag: int, *fields: Any) -> None:
        super().__init__()
        self.tag: int = tag or 0
        self.fields: Array[Any] = list(fields)

    @staticmethod
    def cases() -> List[str]:
        return ["SyncTest", "AsyncTest", "TestList", "TestListSequential"]


TestCase_reflection = _expr10

def _expr11() -> TypeInfo:
    return record_type("Fable.Pyxpecto.Accuracy", [], Accuracy, lambda: [("absolute", float64_type), ("relative", float64_type)])


@dataclass(eq = False, repr = False)
class Accuracy(Record):
    absolute: float
    relative: float

Accuracy_reflection = _expr11

AccuracyModule_low: Accuracy = Accuracy(1E-06, 0.001)

AccuracyModule_medium: Accuracy = Accuracy(1E-08, 1E-05)

AccuracyModule_high: Accuracy = Accuracy(1E-10, 1E-07)

AccuracyModule_veryHigh: Accuracy = Accuracy(1E-12, 1E-09)

def Test_testCase(name: str, body: Callable[[], None]) -> TestCase:
    return TestCase(0, name, body, FocusState(0))


def Test_ptestCase(name: str, body: Callable[[], None]) -> TestCase:
    return TestCase(0, name, body, FocusState(1))


def Test_ftestCase(name: str, body: Callable[[], None]) -> TestCase:
    return TestCase(0, name, body, FocusState(2))


def Test_testCaseAsync(name: str, body: Async[None]) -> TestCase:
    return TestCase(1, name, body, FocusState(0))


def Test_ptestCaseAsync(name: str, body: Async[None]) -> TestCase:
    return TestCase(1, name, body, FocusState(1))


def Test_ftestCaseAsync(name: str, body: Async[None]) -> TestCase:
    return TestCase(1, name, body, FocusState(2))


def Test_testList(name: str, tests: FSharpList[TestCase]) -> TestCase:
    return TestCase(2, name, tests)


def Test_testSequenced(test: TestCase) -> TestCase:
    if test.tag == 1:
        name_1: str = test.fields[0]
        return TestCase(3, name_1, singleton(TestCase(1, name_1, test.fields[1], test.fields[2])))

    elif test.tag == 2:
        return TestCase(3, test.fields[0], test.fields[1])

    elif test.tag == 3:
        return TestCase(3, test.fields[0], test.fields[1])

    else: 
        name: str = test.fields[0]
        return TestCase(3, name, singleton(TestCase(0, name, test.fields[1], test.fields[2])))



def _expr14() -> TypeInfo:
    return class_type("Fable.Pyxpecto.Test.TestCaseBuilder", None, Test_TestCaseBuilder)


class Test_TestCaseBuilder:
    def __init__(self, name: str, focus_state: FocusState) -> None:
        self.name: str = name
        self.focus_state: FocusState = focus_state


Test_TestCaseBuilder_reflection = _expr14

def Test_TestCaseBuilder__ctor_Z69FFBD2B(name: str, focus_state: FocusState) -> Test_TestCaseBuilder:
    return Test_TestCaseBuilder(name, focus_state)


def Test_TestCaseBuilder__Zero(_: Test_TestCaseBuilder) -> None:
    pass


def Test_TestCaseBuilder__Delay_1505(_: Test_TestCaseBuilder, fn: __G) -> __G:
    return fn


def Test_TestCaseBuilder__Using_Z3647408D(_: Test_TestCaseBuilder, disposable: __E, fn: Callable[[__E], __F]) -> __F:
    return Operators_Using(disposable, fn)


def Test_TestCaseBuilder__While_Z4F211AEA(_: Test_TestCaseBuilder, condition: Callable[[], bool], fn: Callable[[], None]) -> None:
    while condition():
        fn()


def Test_TestCaseBuilder__For_Z371464DD(_: Test_TestCaseBuilder, sequence: IEnumerable_1[__D], fn: Callable[[__D], None]) -> None:
    with get_enumerator(sequence) as enumerator:
        while enumerator.System_Collections_IEnumerator_MoveNext():
            fn(enumerator.System_Collections_Generic_IEnumerator_1_get_Current())


def Test_TestCaseBuilder__Combine_3A59D1F3(_: Test_TestCaseBuilder, fn1: __C, fn2: Callable[[], None]) -> __C:
    fn2()
    return fn1


def Test_TestCaseBuilder__TryFinally_33907399(_: Test_TestCaseBuilder, fn: Callable[[], __B], compensation: Callable[[], None]) -> __B:
    try: 
        return fn()

    finally: 
        compensation()



def Test_TestCaseBuilder__TryWith_Z570AC55B(_: Test_TestCaseBuilder, fn: Callable[[], __A], catch_handler: Callable[[Exception], __A]) -> __A:
    try: 
        return fn()

    except Exception as e:
        return catch_handler(e)



def Test_TestCaseBuilder__Run_3A5B6456(_: Test_TestCaseBuilder, fn: Callable[[], None]) -> TestCase:
    return TestCase(0, _.name, fn, _.focus_state)


def _expr25() -> TypeInfo:
    return class_type("Fable.Pyxpecto.Test.TestAsyncBuilder", None, Test_TestAsyncBuilder)


class Test_TestAsyncBuilder:
    def __init__(self, name: str, focus_state: FocusState) -> None:
        self.name: str = name
        self.focus_state: FocusState = focus_state


Test_TestAsyncBuilder_reflection = _expr25

def Test_TestAsyncBuilder__ctor_Z69FFBD2B(name: str, focus_state: FocusState) -> Test_TestAsyncBuilder:
    return Test_TestAsyncBuilder(name, focus_state)


def Test_TestAsyncBuilder__Zero(_: Test_TestAsyncBuilder) -> Async[None]:
    return singleton_1.Zero()


def Test_TestAsyncBuilder__Delay_Z5276B41B(_: Test_TestAsyncBuilder, fn: Callable[[], Async[__K]]) -> Async[__K]:
    return singleton_1.Delay(fn)


def Test_TestAsyncBuilder__Return_1505(_: Test_TestAsyncBuilder, x: __J) -> Async[__J]:
    return singleton_1.Return(x)


def Test_TestAsyncBuilder__ReturnFrom_ZD4A93B1(_: Test_TestAsyncBuilder, x: Async[__I]) -> Async[__I]:
    return singleton_1.ReturnFrom(x)


def Test_TestAsyncBuilder__Bind_7A510B33(_: Test_TestAsyncBuilder, computation: Async[__G], fn: Callable[[__G], Async[__H]]) -> Async[__H]:
    return singleton_1.Bind(computation, fn)


def Test_TestAsyncBuilder__Using_14BA44F9(_: Test_TestAsyncBuilder, disposable: __E, fn: Callable[[__E], Async[__F]]) -> Async[__F]:
    return singleton_1.Using(disposable, fn)


def Test_TestAsyncBuilder__While_49259930(_: Test_TestAsyncBuilder, condition: Callable[[], bool], fn: Async[None]) -> Async[None]:
    return singleton_1.While(condition, fn)


def Test_TestAsyncBuilder__For_Z23956591(_: Test_TestAsyncBuilder, sequence: IEnumerable_1[__D], fn: Callable[[__D], Async[None]]) -> Async[None]:
    return singleton_1.For(sequence, fn)


def Test_TestAsyncBuilder__Combine_Z3AE9B5C1(_: Test_TestAsyncBuilder, fn1: Async[None], fn2: Async[__C]) -> Async[__C]:
    return singleton_1.Combine(fn1, fn2)


def Test_TestAsyncBuilder__TryFinally_73399279(_: Test_TestAsyncBuilder, fn: Async[__B], compensation: Callable[[], None]) -> Async[__B]:
    return singleton_1.TryFinally(fn, compensation)


def Test_TestAsyncBuilder__TryWith_48476DCF(_: Test_TestAsyncBuilder, fn: Async[__A], catch_handler: Callable[[Exception], Async[__A]]) -> Async[__A]:
    return singleton_1.TryWith(fn, catch_handler)


def Test_TestAsyncBuilder__Run_Z3C5FE790(_: Test_TestAsyncBuilder, fn: Async[None]) -> TestCase:
    return TestCase(1, _.name, fn, _.focus_state)


def Test_failtest(msg: str) -> Any:
    raise Exception(msg)


def Test_failtestf(fmt: Any, msg: __A) -> __B:
    return to_fail(fmt)(msg)


def Expect_notEqual(actual: __A, expected: __A, msg: str) -> None:
    assert_not_equal(actual, expected, msg)


def Expect_isNull_0027(cond: Optional[Any]=None) -> bool:
    if equals(cond, None):
        return True

    else: 
        return False



def Expect_isNull(cond: Optional[Any]=None) -> Callable[[str], None]:
    actual: bool = Expect_isNull_0027(cond)
    def _arrow30(msg: str, cond: __A=cond) -> None:
        actual_1: bool = actual
        msg_1: str = msg
        if actual_1 == True:
            assert_equal(actual_1, True, msg_1)

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual_1)) + "") + ('\033[0m')) + " \n\b    Message: ") + msg_1) + "")


    return _arrow30


def Expect_isNotNull(cond: Optional[Any]=None) -> Callable[[str], None]:
    actual: bool = Expect_isNull_0027(cond)
    def _arrow31(msg: str, cond: __A=cond) -> None:
        Expect_notEqual(actual, True, msg)

    return _arrow31


def Expect_isNotNaN(cond: float, msg: str) -> None:
    if isnan(cond):
        raise Exception(msg)



def Expect_isNotInfinity(cond: float, msg: str) -> None:
    if isinf(cond):
        raise Exception(msg)



def Expect_isTrue(cond: bool) -> Callable[[str], None]:
    def _arrow32(msg: str, cond: bool=cond) -> None:
        actual: bool = cond
        msg_1: str = msg
        if actual == True:
            assert_equal(actual, True, msg_1)

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(True)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + msg_1) + "")


    return _arrow32


def Expect_isFalse(cond: bool) -> Callable[[str], None]:
    def _arrow34(msg: str, cond: bool=cond) -> None:
        actual: bool = cond
        msg_1: str = msg
        if actual == False:
            assert_equal(actual, False, msg_1)

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(False)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + msg_1) + "")


    return _arrow34


def Expect_isZero(cond: int) -> Callable[[str], None]:
    def _arrow35(msg: str, cond: int=cond) -> None:
        actual: int = cond or 0
        msg_1: str = msg
        if actual == 0:
            assert_equal(actual, 0, msg_1)

        else: 
            raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(0)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + msg_1) + "")


    return _arrow35


def Expect_isEmpty(x: IEnumerable_1[Any], msg: str) -> None:
    if not is_empty(x):
        to_fail(printf("%s. Should be empty."))(msg)



def Expect_pass(__unit: None=None) -> None:
    assert_equal(True, True, "The test passed")


def Expect_passWithMsg(message: str) -> None:
    msg: str = message
    assert_equal(True, True, msg)


def Expect_exists(x: IEnumerable_1[_A], a: Callable[[_A], bool], msg: str) -> None:
    if not exists(a, x):
        raise Exception(msg)



def Expect_all(x: IEnumerable_1[_A], a: Callable[[_A], bool], msg: str) -> None:
    if not for_all(a, x):
        raise Exception(msg)



def Expect_isNonEmpty(x: IEnumerable_1[Any], msg: str) -> None:
    if is_empty(x):
        to_fail(printf("%s. Should not be empty."))(msg)



def Expect_isNotEmpty(x: IEnumerable_1[Any], msg: str) -> None:
    Expect_isNotNull(x)(msg)
    Expect_isNonEmpty(x, msg)


def Expect_hasLength(x: IEnumerable_1[Any], number: int, msg: str) -> None:
    actual: int = length(x) or 0
    expected: int = number or 0
    msg_1: str = to_text(printf("%s. Expected %A to have length %i"))(msg)(x)(number)
    if actual == expected:
        assert_equal(actual, expected, msg_1)

    else: 
        raise Exception(((((((((((((("    Expected: " + ('\033[96m')) + "") + str(expected)) + "") + ('\033[0m')) + " \n\b    Actual: ") + ('\033[91m')) + "") + str(actual)) + "") + ('\033[0m')) + " \n\b    Message: ") + msg_1) + "")



def Expect_isOk(x: FSharpResult_2[Any, Any], message: str) -> None:
    if x.tag == 1:
        to_fail(printf("%s. Expected Ok, was Error(\"%A\")."))(message)(x.fields[0])

    else: 
        Expect_passWithMsg(message)



def Expect_wantOk(x: FSharpResult_2[__A, Any], message: str) -> __A:
    if x.tag == 1:
        return to_fail(printf("%s. Expected Ok, was Error(\"%A\")."))(message)(x.fields[0])

    else: 
        Expect_passWithMsg(message)
        return x.fields[0]



def Expect_stringContains(subject: str, substring: str, message: str) -> None:
    if not (subject.find(substring) >= 0):
        to_fail(printf("%s. Expected subject string \'%s\' to contain substring \'%s\'."))(message)(subject)(substring)

    else: 
        Expect_passWithMsg(message)



def Expect_isError(x: FSharpResult_2[Any, Any], message: str) -> None:
    if x.tag == 0:
        to_fail(printf("%s. Expected Error _, was Ok(%A)."))(message)(x.fields[0])

    else: 
        Expect_passWithMsg(message)



def Expect_isSome(x: Optional[__A], message: str) -> None:
    if x is None:
        to_fail(printf("%s. Expected Some _, was None."))(message)

    else: 
        Expect_passWithMsg(message)



def Expect_wantSome(x: Optional[__A], message: str) -> __A:
    if x is None:
        return to_fail(printf("%s. Expected Some _, was None."))(message)

    else: 
        x_0027: __A = value_2(x)
        Expect_passWithMsg(message)
        return x_0027



def Expect_wantError(x: FSharpResult_2[Any, _B], message: str) -> _B:
    if x.tag == 0:
        return to_fail(printf("%s. Expected Error _, was Ok(%A)."))(message)(x.fields[0])

    else: 
        Expect_passWithMsg(message)
        return x.fields[0]



def Expect_isNone(x: Optional[__A], message: str) -> None:
    if x is not None:
        x_0027: __A = value_2(x)
        to_fail(printf("%s. Expected None, was Some(%A)."))(message)(x_0027)

    else: 
        Expect_passWithMsg(message)



def Expect_throws_0027(f: Callable[[], None]) -> Optional[Exception]:
    try: 
        f()
        return None

    except Exception as exn:
        return exn



def Expect_throws(f: Callable[[], None], msg: str) -> None:
    match_value: Optional[Exception] = Expect_throws_0027(f)
    if match_value is not None:
        pass

    else: 
        to_fail(printf("%s. Expected f to throw."))(msg)



def Expect_throwsC(f: Callable[[], None], cont: Callable[[Exception], __A]) -> __A:
    match_value: Optional[Exception] = Expect_throws_0027(f)
    if match_value is not None:
        return cont(match_value)

    else: 
        return to_fail(printf("Expected f to throw."))



def Expect_containsAll(actual: IEnumerable_1[__A], expected: IEnumerable_1[__A], message: str) -> None:
    matchValue: FSharpList[__A] = of_seq(actual)
    expected_els: FSharpList[__A] = of_seq(expected)
    actual_els: FSharpList[__A] = matchValue
    def predicate(a: Optional[__A]=None, actual: IEnumerable_1[Any]=actual, expected: IEnumerable_1[Any]=expected, message: str=message) -> bool:
        class ObjectExpr55:
            @property
            def Equals(self) -> Callable[[__A_, __A_], bool]:
                return equals

            @property
            def GetHashCode(self) -> Callable[[__A_], int]:
                return structural_hash

        return contains(a, expected_els, ObjectExpr55())

    matching_els: FSharpList[__A] = filter(predicate, actual_els)
    def predicate_1(a_1: Optional[__A]=None, actual: IEnumerable_1[Any]=actual, expected: IEnumerable_1[Any]=expected, message: str=message) -> bool:
        class ObjectExpr56:
            @property
            def Equals(self) -> Callable[[__A_, __A_], bool]:
                return equals

            @property
            def GetHashCode(self) -> Callable[[__A_], int]:
                return structural_hash

        return not contains(a_1, matching_els, ObjectExpr56())

    extra_els: FSharpList[__A] = filter(predicate_1, actual_els)
    def predicate_2(e: Optional[__A]=None, actual: IEnumerable_1[Any]=actual, expected: IEnumerable_1[Any]=expected, message: str=message) -> bool:
        class ObjectExpr57:
            @property
            def Equals(self) -> Callable[[__A_, __A_], bool]:
                return equals

            @property
            def GetHashCode(self) -> Callable[[__A_], int]:
                return structural_hash

        return not contains(e, matching_els, ObjectExpr57())

    missing_els: FSharpList[__A] = filter(predicate_2, expected_els)
    if is_empty_1(missing_els):
        pass

    else: 
        Test_failtest(to_text(printf("%s. Sequence `actual` does not contain all `expected` elements. Missing elements from `actual`: %A. Extra elements in `actual`: %A"))(message)(missing_els)(extra_els))



def Expect_floatClose(accuracy: Accuracy, actual: float, expected: float, message: str) -> None:
    if isinf(actual):
        Test_failtestf(printf("%s. Expected actual to not be infinity, but it was."), message)

    elif isinf(expected):
        Test_failtestf(printf("%s. Expected expected to not be infinity, but it was."), message)

    else: 
        def _arrow59(__unit: None=None, accuracy: Accuracy=accuracy, actual: float=actual, expected: float=expected, message: str=message) -> bool:
            a: float = actual
            b: float = expected
            def _arrow58(__unit: None=None) -> float:
                m_1: Accuracy = accuracy
                return m_1.absolute + (m_1.relative * max(compare_primitives, abs(a), abs(b)))

            return abs(a - b) <= _arrow58()

        if not _arrow59():
            arg: float
            m_2: Accuracy = accuracy
            def _arrow60(x_1: float, y_1: float, accuracy: Accuracy=accuracy, actual: float=actual, expected: float=expected, message: str=message) -> int:
                return compare_primitives(x_1, y_1)

            arg = m_2.absolute + (m_2.relative * max(_arrow60, abs(actual), abs(expected)))
            arg_3: float = abs(actual - expected)
            Test_failtestf(printf("%s. Expected difference to be less than %.20g for accuracy {absolute=%.20g; relative=%.20g}, but was %.20g. actual=%.20g expected=%.20g"), message)(arg)(accuracy.absolute)(accuracy.relative)(arg_3)(actual)(expected)




def Expect_floatLessThanOrClose(accuracy: Accuracy, actual: float, expected: float, message: str) -> None:
    if actual > expected:
        Expect_floatClose(accuracy, actual, expected, message)



def Expect_floatGreaterThanOrClose(accuracy: Accuracy, actual: float, expected: float, message: str) -> None:
    if actual < expected:
        Expect_floatClose(accuracy, actual, expected, message)



def Pyxpecto_isFocused(test: TestCase) -> bool:
    (pattern_matching_result, tests, tests_1) = (None, None, None)
    if test.tag == 1:
        if test.fields[2].tag == 2:
            pattern_matching_result = 1

        else: 
            pattern_matching_result = 4


    elif test.tag == 2:
        pattern_matching_result = 2
        tests = test.fields[1]

    elif test.tag == 3:
        pattern_matching_result = 3
        tests_1 = test.fields[1]

    elif test.fields[2].tag == 2:
        pattern_matching_result = 0

    else: 
        pattern_matching_result = 4

    if pattern_matching_result == 0:
        return True

    elif pattern_matching_result == 1:
        return True

    elif pattern_matching_result == 2:
        def _arrow68(test_1: TestCase, test: TestCase=test) -> bool:
            return Pyxpecto_isFocused(test_1)

        return exists_1(_arrow68, tests)

    elif pattern_matching_result == 3:
        def _arrow70(test_2: TestCase, test: TestCase=test) -> bool:
            return Pyxpecto_isFocused(test_2)

        return exists_1(_arrow70, tests_1)

    elif pattern_matching_result == 4:
        return False



def Pyxpecto_flattenTests(last_name: str, _arg: TestCase) -> FSharpList[TestCase]:
    if _arg.tag == 1:
        name_1: str = _arg.fields[0]
        return singleton(TestCase(1, name_1 if is_null_or_white_space(last_name) else to_text(printf("%s - %s"))(last_name)(name_1), _arg.fields[1], _arg.fields[2]))

    elif _arg.tag == 2:
        def _arrow73(__unit: None=None, last_name: str=last_name, _arg: TestCase=_arg) -> IEnumerable_1[TestCase]:
            def _arrow72(test_2: TestCase) -> IEnumerable_1[TestCase]:
                return Pyxpecto_flattenTests(_arg.fields[0], test_2)

            return collect(_arrow72, _arg.fields[1])

        return to_list(delay(_arrow73))

    elif _arg.tag == 3:
        def _arrow75(__unit: None=None, last_name: str=last_name, _arg: TestCase=_arg) -> IEnumerable_1[TestCase]:
            def _arrow74(test_3: TestCase) -> IEnumerable_1[TestCase]:
                return Pyxpecto_flattenTests(_arg.fields[0], test_3)

            return collect(_arrow74, _arg.fields[1])

        return to_list(delay(_arrow75))

    else: 
        name: str = _arg.fields[0]
        return singleton(TestCase(0, name if is_null_or_white_space(last_name) else to_text(printf("%s - %s"))(last_name)(name), _arg.fields[1], _arg.fields[2]))



def Pyxpecto_checkFocused(test: TestCase) -> bool:
    has_focused: bool = False
    def loop(_arg: TestCase, test: TestCase=test) -> None:
        nonlocal has_focused
        (pattern_matching_result, tests) = (None, None)
        if _arg.tag == 0:
            if _arg.fields[2].tag == 2:
                pattern_matching_result = 0

            else: 
                pattern_matching_result = 1


        elif _arg.tag == 3:
            pattern_matching_result = 2
            tests = _arg.fields[1]

        elif _arg.tag == 2:
            pattern_matching_result = 2
            tests = _arg.fields[1]

        elif _arg.fields[2].tag == 2:
            pattern_matching_result = 0

        else: 
            pattern_matching_result = 1

        if pattern_matching_result == 0:
            has_focused = True

        elif pattern_matching_result == 1:
            pass

        elif pattern_matching_result == 2:
            with get_enumerator(tests) as enumerator:
                while enumerator.System_Collections_IEnumerator_MoveNext():
                    loop(enumerator.System_Collections_Generic_IEnumerator_1_get_Current())


    loop(test)
    return has_focused


Pyxpecto_PyBindings_cmd_args: Array[str] = sys.argv

def _expr113() -> TypeInfo:
    return class_type("Fable.Pyxpecto.Pyxpecto.CustomTestRunner", None, Pyxpecto_CustomTestRunner)


class Pyxpecto_CustomTestRunner:
    def __init__(self, test: TestCase) -> None:
        has_focused: bool = Pyxpecto_checkFocused(test)
        verify_focused_allowed: None
        class ObjectExpr112:
            @property
            def Equals(self) -> Callable[[str, str], bool]:
                def _arrow111(x: str, y: str) -> bool:
                    return x == y

                return _arrow111

            @property
            def GetHashCode(self) -> Callable[[str], int]:
                return string_hash

        if has_focused if contains_1("--fail-on-focused-tests", Pyxpecto_PyBindings_cmd_args, ObjectExpr112()) else False:
            raise Exception(((((("" + ('\033[91m')) + "Cannot run focused tests with \'") + "--fail-on-focused-tests") + "\' commandline arg.") + ('\033[0m')) + "")

        else: 
            verify_focused_allowed = None

        self._SuccessfulTests: int = 0
        self._FailedTests: int = 0
        self._IgnoredTests: int = 0
        self._HasFocused: bool = has_focused

    def print_success_msg(self, name: str) -> None:
        this: Pyxpecto_CustomTestRunner = self
        to_console(((("" + ("💎 | " if this.HasFocused else "")) + "✔️ ") + name) + "")

    def print_error_msg(self, name: str, msg: str) -> None:
        this: Pyxpecto_CustomTestRunner = self
        to_console(((((("" + ("💎 | " if this.HasFocused else "")) + "❌ ") + name) + "\n\b") + msg) + "")

    def print_skip_pending_msg(self, name: str) -> None:
        to_console(printf("🚧 skipping \'%s\' due to it being marked as pending"))(name)

    @property
    def SuccessfulTests(self, __unit: None=None) -> int:
        __: Pyxpecto_CustomTestRunner = self
        return __._SuccessfulTests

    @SuccessfulTests.setter
    def SuccessfulTests(self, v: int) -> None:
        __: Pyxpecto_CustomTestRunner = self
        __._SuccessfulTests = v or 0

    @property
    def FailedTests(self, __unit: None=None) -> int:
        __: Pyxpecto_CustomTestRunner = self
        return __._FailedTests

    @FailedTests.setter
    def FailedTests(self, v: int) -> None:
        __: Pyxpecto_CustomTestRunner = self
        __._FailedTests = v or 0

    @property
    def IgnoredTests(self, __unit: None=None) -> int:
        __: Pyxpecto_CustomTestRunner = self
        return __._IgnoredTests

    @IgnoredTests.setter
    def IgnoredTests(self, v: int) -> None:
        __: Pyxpecto_CustomTestRunner = self
        __._IgnoredTests = v or 0

    @property
    def HasFocused(self, __unit: None=None) -> bool:
        __: Pyxpecto_CustomTestRunner = self
        return __._HasFocused

    @property
    def SumTests(self, __unit: None=None) -> int:
        this: Pyxpecto_CustomTestRunner = self
        return this.SuccessfulTests + this.FailedTests

    def RunSyncTest(self, name: str, body: Callable[[], None]) -> None:
        this: Pyxpecto_CustomTestRunner = self
        try: 
            body()
            this.SuccessfulTests = (this.SuccessfulTests + 1) or 0
            this.print_success_msg(name)

        except Exception as e:
            this.FailedTests = (this.FailedTests + 1) or 0
            arg_1: str = str(e)
            this.print_error_msg(name, arg_1)


    def RunAsyncTest(self, name: str, body: Async[None]) -> None:
        this: Pyxpecto_CustomTestRunner = self
        try: 
            def _arrow110(__unit: None=None) -> Async[None]:
                def _arrow109(__unit: None=None) -> Async[None]:
                    this.SuccessfulTests = (this.SuccessfulTests + 1) or 0
                    this.print_success_msg(name)
                    return singleton_1.Zero()

                return singleton_1.Bind(body, _arrow109)

            run_synchronously(singleton_1.Delay(_arrow110))

        except Exception as e:
            this.FailedTests = (this.FailedTests + 1) or 0
            arg_2: str = str(e)
            this.print_error_msg(name, arg_2)


    def SkipPendingTest(self, name: str) -> None:
        this: Pyxpecto_CustomTestRunner = self
        this.IgnoredTests = (this.IgnoredTests + 1) or 0
        this.print_skip_pending_msg(name)

    def SkipUnfocusedTest(self, __unit: None=None) -> None:
        this: Pyxpecto_CustomTestRunner = self
        this.IgnoredTests = (this.IgnoredTests + 1) or 0


Pyxpecto_CustomTestRunner_reflection = _expr113

def Pyxpecto_CustomTestRunner__ctor_Z1F0D1F49(test: TestCase) -> Pyxpecto_CustomTestRunner:
    return Pyxpecto_CustomTestRunner(test)


def Pyxpecto_runViaPy(test: TestCase) -> int:
    runner: Pyxpecto_CustomTestRunner = Pyxpecto_CustomTestRunner(test)
    def run(runner_1: Pyxpecto_CustomTestRunner, test_1: TestCase, test: TestCase=test) -> None:
        (pattern_matching_result, name_2, test_cases) = (None, None, None)
        if test_1.tag == 1:
            pattern_matching_result = 1

        elif test_1.tag == 3:
            pattern_matching_result = 2
            name_2 = test_1.fields[0]
            test_cases = test_1.fields[1]

        elif test_1.tag == 2:
            pattern_matching_result = 2
            name_2 = test_1.fields[0]
            test_cases = test_1.fields[1]

        else: 
            pattern_matching_result = 0

        if pattern_matching_result == 0:
            test_2: Callable[[], None] = test_1.fields[1]
            name: str = test_1.fields[0]
            focus: FocusState = test_1.fields[2]
            matchValue: bool = runner_1.HasFocused
            (pattern_matching_result_1,) = (None,)
            if matchValue:
                if focus.tag == 2:
                    pattern_matching_result_1 = 2

                else: 
                    pattern_matching_result_1 = 3


            elif focus.tag == 0:
                pattern_matching_result_1 = 0

            elif focus.tag == 1:
                pattern_matching_result_1 = 1

            else: 
                pattern_matching_result_1 = 3

            if pattern_matching_result_1 == 0:
                runner_1.RunSyncTest(name, test_2)

            elif pattern_matching_result_1 == 1:
                runner_1.SkipPendingTest(name)

            elif pattern_matching_result_1 == 2:
                runner_1.RunSyncTest(name, test_2)

            elif pattern_matching_result_1 == 3:
                runner_1.SkipUnfocusedTest()


        elif pattern_matching_result == 1:
            test_3: Async[None] = test_1.fields[1]
            name_1: str = test_1.fields[0]
            focus_1: FocusState = test_1.fields[2]
            matchValue_1: bool = runner_1.HasFocused
            (pattern_matching_result_2,) = (None,)
            if matchValue_1:
                if focus_1.tag == 2:
                    pattern_matching_result_2 = 2

                else: 
                    pattern_matching_result_2 = 3


            elif focus_1.tag == 0:
                pattern_matching_result_2 = 0

            elif focus_1.tag == 1:
                pattern_matching_result_2 = 1

            else: 
                pattern_matching_result_2 = 3

            if pattern_matching_result_2 == 0:
                runner_1.RunAsyncTest(name_1, test_3)

            elif pattern_matching_result_2 == 1:
                runner_1.SkipPendingTest(name_1)

            elif pattern_matching_result_2 == 2:
                runner_1.RunAsyncTest(name_1, test_3)

            elif pattern_matching_result_2 == 3:
                runner_1.SkipUnfocusedTest()


        elif pattern_matching_result == 2:
            def mapping(t: TestCase, runner_1: Pyxpecto_CustomTestRunner=runner_1, test_1: TestCase=test_1) -> FSharpList[TestCase]:
                return Pyxpecto_flattenTests(name_2, t)

            list_2: FSharpList[TestCase] = collect_1(mapping, test_cases)
            iterate(curry2(run)(runner_1), list_2)


    to_console(printf("🚀 start running tests ..."))
    run(runner, test)
    inner_msg_string: str = ((((((((((((((((((((((("" + ('\033[36m')) + "") + str(runner.SumTests)) + "") + ('\033[0m')) + " tests run - ") + ('\033[92m')) + "") + str(runner.SuccessfulTests)) + "") + ('\033[0m')) + " passed, ") + ('\033[36m')) + "") + str(runner.IgnoredTests)) + "") + ('\033[0m')) + " ignored, ") + ('\033[91m')) + "") + str(runner.FailedTests)) + "") + ('\033[0m')) + " failed"
    msg: str = to_string(StringBuilder__AppendLine_Z721C83C5(StringBuilder__AppendLine_Z721C83C5(StringBuilder__AppendLine_Z721C83C5(StringBuilder__ctor(), "-------------------------------------------------------------------------------"), inner_msg_string), "-------------------------------------------------------------------------------"))
    to_console(printf("%s"))(msg)
    match_value_2: int = runner.FailedTests or 0
    if match_value_2 == 1:
        to_console(((((("" + ('\033[91m')) + "") + str(runner.FailedTests)) + " test failed!") + ('\033[0m')) + "")
        return 1

    elif match_value_2 > 1:
        to_console(((((("" + ('\033[91m')) + "") + str(match_value_2)) + " tests failed!") + ('\033[0m')) + "")
        return 1

    else: 
        to_console(((("" + ('\033[92m')) + "Success!") + ('\033[0m')) + "")
        return 0



def Pyxpecto_runViaDotnet(test: TestCase) -> int:
    raise Exception("Currently not implemented, use Expecto for now.")
    return 1


def Pyxpecto_runTests(test: TestCase) -> int:
    return Pyxpecto_runViaPy(test)


