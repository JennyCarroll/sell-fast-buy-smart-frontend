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
  defaults: { baseURL: "https://octopus-app-hzms7.ondigitalocean.app" },
  get: jest.fn((url) => {
    console.log("url", url);
    if (url === "https://octopus-app-hzms7.ondigitalocean.app/items") {
      return Promise.resolve({
        status: 200,
        statusText: "OK",
        data: fixtures.items,
      });
    }
  }),
};

export default axiosMock;
