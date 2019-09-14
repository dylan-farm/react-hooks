/** @format */

export default {
  state: {
    name: 'flooks',
  },
  actions: ({ model, setState }) => ({
    setName() {
      const { name } = model(); // Get own model
      setState({ name: name === 'flooks' ? '福禄克斯' : 'flooks' });
    },
  }),
};
