import { authReducer } from "../../auth/authReducer";
import { types } from "../../types";

describe('Tests on authReducer', () => {
    test('should reurn the default state', () => {
        const initialState = { logged: false };

        const state = authReducer(initialState, {});
        expect(state).toEqual(initialState)
    });

    test('should authenticate and put "name" of the user', () => {
        const initialState = { logged: false };
        const expected = {
            name: 'Nicolas',
            logged: true,
        };
        const action = {
            type: types.login,
            payload: {
                name: 'Nicolas',
            },
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(expected);
    });

    test('should remove the user "name" and set "logged" on false', () => {
        const initialState = {
            name: 'Nicolas',
            logged: true,
        };
        const expected = {
            logged: false,
        };
        const action = {
            type: types.logout,
        };
        const state = authReducer(initialState, action);

        expect(state).toEqual(expected)
    });
});
