import { render, } from '@testing-library/react'
import App from '../../app/index.jsx';

it('snapshot', () => {
    const { container, } = render(<App />);
    expect(container).toMatchSnapshot();
});
