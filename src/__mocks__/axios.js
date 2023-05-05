const fixtures = {
  items: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2],
      interviewers: [1, 2],
      spots: 1,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [3, 4],
      interviewers: [3, 4],
      spots: 1,
    },
  ],
};

const axiosMock = {
  defaults: { baseURL: "" },
  get: jest.fn((url) => {
    if (url === "/items") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.items,
      });
    }
  }),
};

export default axiosMock;
