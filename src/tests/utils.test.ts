import {describe, expect, test} from '@jest/globals';
import {camelCase, resolveValue} from '@utils/common';

describe('utils module', () => {
  test("camelCase 'border-right'", () => {
    expect(camelCase('border-right')).toBe('borderRight');
  });
  test("camelCase 'border right'", () => {
    expect(camelCase('border right')).toBe('borderRight');
  });
  test("camelCase 'border|right'", () => {
    expect(camelCase('border-right')).toBe('borderRight');
  });
  test("resolveValue 'true'", () => {
    expect(resolveValue(true)).toBe(true);
  });
  test("resolveValue '() => true'", () => {
    expect(resolveValue(() => true)).toBe(true);
  });
});