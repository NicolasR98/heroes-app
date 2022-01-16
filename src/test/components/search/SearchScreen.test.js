import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Tests on <SearchScreen />', () => {
    test('should render correctly', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero!');
    });

    test('should show Batman and the input value of the queryString', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper.find('img').prop('alt')).toBe('Batman');
    });

    test('should display an error if hero not found', () => {
        const query = 'batman!!!'
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${query}`]}>
                <SearchScreen />
            </MemoryRouter>
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe(`No results of: ${query}`)
    });

    test('should call `navigate` to the new screen', () => {
       const wrapper = mount(
           <MemoryRouter initialEntries={[`/search`]}>
               <SearchScreen />
           </MemoryRouter>
       );

       const expected = 'batman'

       const event = {
           target: {
               name: 'searchText',
               value: expected,
           },
       };

       wrapper.find('input').simulate('change', event);

       wrapper.find('form').prop('onSubmit')({
           preventDefault(){},
       });

       expect(mockNavigate).toHaveBeenCalledWith(`?q=${expected}`);
    });
    
});
