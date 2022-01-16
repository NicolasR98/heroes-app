import { mount } from "enzyme";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Hero } from "../../../components/heroes/HeroScreen";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Tests on <HeroScreen />', () => {
    test('should not display <Hero /> if there is not a hero in the url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <Routes>
                    <Route path="/hero" element={<Hero />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('No Hero Page');
    })

    test('should display a hero if the in the url exists and it is valid', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<Hero />} />
                    <Route path="/" element={<h1>No Hero Page</h1>} />
                </Routes>
            </MemoryRouter>
        );
        expect(wrapper.find('h2').text().trim()).toBe('Spider Man');
    });

    test('should go back to the previous screen', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Routes>
                    <Route path="/hero/:heroId" element={<Hero />} />
                </Routes>
            </MemoryRouter>
        );
        wrapper.find('button').prop('onClick')();

        expect(mockNavigate).toHaveBeenCalledWith(-1, { replace: true });
    });
});
