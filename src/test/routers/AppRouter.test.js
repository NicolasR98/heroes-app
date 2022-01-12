import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Tests on <AppRouter />', () => {
    const contextValue = {
        user: {
            logged: false,
        },
    };
    const contextValueAuthenticated = {
        user: {
            name: 'Nicolas',
            logged: true,
        },
    };

    test('should display Login if user is not authenticated', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );

        const h1 = wrapper.find('h1').text().trim();

        expect(wrapper).toMatchSnapshot();
        expect(h1).toBe('Login');
    });

    test('should display Marvel component if user is authenticated', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValueAuthenticated}>
                <AppRouter />
            </AuthContext.Provider>
        );
        const navbarExist = wrapper.find('.navbar').exists();

        expect(wrapper).toMatchSnapshot();
        expect(navbarExist).toBeTruthy();
    });
});
