//Dummy data for user
var users = [
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
users.forEach(function (user) {
    user.devices.sort(function (a, b) {
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
    });
});
var monthlyStats = {};
//Now looping over each user and
users.forEach(function (user) {
    user.devices.forEach(function (device) {
        var loggedInDate = new Date(device.logged_in);
        var lastActiveDate = new Date(device.lastActive);
        var loggedInMonthYear = "".concat(loggedInDate.getFullYear(), "-").concat(loggedInDate.getMonth() + 1);
        var lastActiveMonthYear = "".concat(lastActiveDate.getFullYear(), "-").concat(lastActiveDate.getMonth() + 1);
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
