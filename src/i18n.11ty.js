module.exports = class {
  data() {
    return {
      pagination: {
        data: "i18n",
        size: 1,
        alias: "langContent",
        resolve: "values"
      },
      permalink: ({ pagination }) => {
		    const langKey = Object.keys(pagination.items[0])[0];
        return `i18n/${langKey}.json`;
      }
    };
  }

  render({ pagination }) {
    const content = pagination.items[0];
	  const json = JSON.stringify(content, null, 2);
    return json;
  }
};
