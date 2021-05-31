import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('dotenv').config({ path: './environment/.env.test' });

Enzyme.configure({
    adapter: new Adapter()
});
