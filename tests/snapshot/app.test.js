import renderer from 'react-test-renderer';
import App from '../../app/index.jsx';

it('snapshot', () => {
    const tree = renderer.create(<App></App>).toJSON();
    expect(tree).toMatchSnapshot();
});
