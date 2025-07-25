import type { Atom, WritableAtom, Getter, Setter } from "jotai";
import { createStore } from 'jotai';

export type GetterFn = <T>(key: string) => T;
export type SetterFn = <T>(key: string, val: T) => void;

export type AnyWritableAtom = WritableAtom<any, any[], any>;
export type AnyAtom = Atom<unknown> | AnyWritableAtom;

export type AtomScopedStore = ReturnType<typeof createStore>;
