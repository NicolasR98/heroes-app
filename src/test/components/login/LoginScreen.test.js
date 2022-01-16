import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../auth/authContext";
import { LoginScreen } from '../../../components/login/LoginScreen';
import { cleanup } from "@testing-library/react";
import { types } from "../../../types";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Tests on <LoginScreen />', () => {
    beforeEach(() => {
        cleanup()
    });

    const contextValue = {
        user: {
            logged: false
        },
        dispatch: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should do the `dispatch` and navigation to `/` when login', () => {
        wrapper.find('button').prop('onClick')();

        const expectDispatch = {
            payload: {
                name: 'Nicolas test'
            },
            type: types.login,
        };

        expect(contextValue.dispatch).toHaveBeenCalledWith(expectDispatch);
        expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });

    test('should do the `dispatch` and navigation to `lastPath` item of `localStorage`', () => {
        // 1. Set path on `LocalStorage`
        const expectedPath = '/dc';
        localStorage.setItem('lastPath', expectedPath);

        // 2. Find and click the button to login
        wrapper.find('button').prop('onClick')();

        expect(mockNavigate).toHaveBeenCalledWith(expectedPath, { replace: true });
    });

});
