import { mount } from "enzyme";
import { AuthContext } from "../../../auth/authContext";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Tests on <Navbar />', () => {

    const contextValue = {
        user: {
            name: 'Nicolas',
            logged: true,
        },
        dispatch: jest.fn(),
    };

    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<Navbar />} />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    );
    test('should display correctly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe(contextValue?.user?.name)
    });

    test('should call `logout`, `navigate and `dispatch` with arguments', () => {
        const expected = { type: types.logout };

        wrapper.find('button').prop('onClick')();

        expect(contextValue.dispatch).toHaveBeenCalledWith(expected);
    });

});
