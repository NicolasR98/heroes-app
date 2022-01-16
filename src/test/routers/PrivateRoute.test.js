import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../routers/PrivateRoute";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Going to Login</span>
}))

describe('Tests on <PrivateRoute />', () => {
    Storage.prototype.setItem = jest.fn();

    test('should display component if user is authenticated and save on the localStorage', () => {
        const contextValue = {
            user: {
                logged: true,
                name: 'Nicolas',
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Route Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text()).toBe('Private Route Component');
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    });

    test('should not enter on the component if user is not authenticated', () => {
        const contextValue = {
            user: {
                logged: false,
            },
        };

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/']}>
                    <PrivateRoute>
                        <h1>Private Route Component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text()).toBe('Going to Login');
    });
});
