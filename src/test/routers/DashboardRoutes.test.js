import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Tests on <DashboardRoutes />', () => {
    const contextValue = {
        user: {
            name: 'Nicolas',
            logged: true,
        },
    };

    test('should display correctly component', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                {/*Used when need the components to be able to render and navigate */}
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Nicolas');
    });

    test('should display correctly component DC', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                {/*Used when need the components to be able to render and navigate */}
                <MemoryRouter initialEntries={['/dc']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Heroes List - DC Comics');
    });

    test('should display correctly component Marvel', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                {/*Used when need the components to be able to render and navigate */}
                <MemoryRouter initialEntries={['/marvel']}>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Heroes List - Marvel Comics');
    });
});
