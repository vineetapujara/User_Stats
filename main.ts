//Interface for devices object
interface Device {
  logged_in: string;
  logged_out: string;
  lastActive: string;
}
//interface for Users objects
interface User {
  user_id: string;
  devices: Device[];
}

//Dummy data for user
const users: User[] = [
  {
    user_id: "user1",
    devices: [
      {
        logged_in: "2023-06-01",
        logged_out: "2023-06-02",
        lastActive: "2023-06-01T10:00:00Z",
      },
      {
        logged_in: "2023-06-03",
        logged_out: "2023-06-04",
        lastActive: "2023-06-03T12:00:00Z",
      },
    ],
  },
  {
    user_id: "user2",
    devices: [
      {
        logged_in: "2023-06-01",
        logged_out: "2023-06-02",
        lastActive: "2023-06-01T08:00:00Z",
      },
      {
        logged_in: "2023-06-03",
        logged_out: "2023-06-04",
        lastActive: "2023-06-03T09:00:00Z",
      },
    ],
  },
];

//looping over user then sorting it according to the lastActive
users.forEach((user) => {
  user.devices.sort(
    (a, b) =>
      new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
  );
});

//to calculate monthly logged_in we have to create differt interface for it.
interface MonthlyStats {
  loggedInCount: number;
  activeCount: number;
}

const monthlyStats: { [key: string]: MonthlyStats } = {};

//Now looping over each user and
users.forEach((user) => {
  user.devices.forEach((device) => {
    const loggedInDate = new Date(device.logged_in);
    const lastActiveDate = new Date(device.lastActive);

    const loggedInMonthYear = `${loggedInDate.getFullYear()}-${
      loggedInDate.getMonth() + 1
    }`;
    const lastActiveMonthYear = `${lastActiveDate.getFullYear()}-${
      lastActiveDate.getMonth() + 1
    }`;

    // Increment logged in count
    if (!monthlyStats[loggedInMonthYear]) {
      monthlyStats[loggedInMonthYear] = { loggedInCount: 0, activeCount: 0 }; //storing loggedIn count value if not present in monthly stats
    }
    monthlyStats[loggedInMonthYear].loggedInCount += 1;

    // Increment active count
    if (!monthlyStats[lastActiveMonthYear]) {
      monthlyStats[lastActiveMonthYear] = { loggedInCount: 0, activeCount: 0 }; //storing active_count value;
    }
    monthlyStats[lastActiveMonthYear].activeCount += 1;
  });
});

console.log(monthlyStats);
