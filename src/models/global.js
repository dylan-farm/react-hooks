/** @format */
import Immutable from 'seamless-immutable';

const initState = Immutable({
  data: {},
});
export default {
  state: initState,
  actions: ({ model, setState }) => ({
    getToken() {
      const { token } = model(); // Get own model
      setState({ token: '12345678' });
      return token;
    },
  }),
};
