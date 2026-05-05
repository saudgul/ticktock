const mockUsers = [
  {
    id: 1,
    email: "john@example.com",
    password: "password123",
    name: "John Doe",
  },
];

const mockTimesheets = [
  { week: 1, date: "1 - 5 January, 2024", startDate: "2024-01-01", endDate: "2024-01-05" },
  { week: 2, date: "8 - 12 January, 2024", startDate: "2024-01-08", endDate: "2024-01-12" },
  { week: 3, date: "15 - 19 January, 2024", startDate: "2024-01-15", endDate: "2024-01-19" },
  { week: 4, date: "22 - 26 January, 2024", startDate: "2024-01-22", endDate: "2024-01-26" },
  { week: 5, date: "28 January - 1 February, 2024", startDate: "2024-01-28", endDate: "2024-02-01" },
  { week: 6, date: "5 - 9 February, 2024", startDate: "2024-02-05", endDate: "2024-02-09" },
  { week: 7, date: "12 - 16 February, 2024", startDate: "2024-02-12", endDate: "2024-02-16" },
  { week: 8, date: "19 - 23 February, 2024", startDate: "2024-02-19", endDate: "2024-02-23" },
  { week: 9, date: "26 February - 1 March, 2024", startDate: "2024-02-26", endDate: "2024-03-01" },
  { week: 10, date: "4 - 8 March, 2024", startDate: "2024-03-04", endDate: "2024-03-08" },
];

const mockTimesheetEntries = {
  1: [
    { id: 1, day: "Monday", date: "Jan 1", project: "Project A", type: "Development", description: "API Integration", hours: 8 },
    { id: 2, day: "Tuesday", date: "Jan 2", project: "Project B", type: "Design", description: "UI Mockups", hours: 8 },
    { id: 3, day: "Wednesday", date: "Jan 3", project: "Project A", type: "Development", description: "Bug Fixes", hours: 8 },
    { id: 4, day: "Thursday", date: "Jan 4", project: "Project C", type: "QA", description: "Testing", hours: 8 },
    { id: 5, day: "Friday", date: "Jan 5", project: "Project A", type: "Development", description: "Code Review", hours: 8 },
  ],
  2: [
    { id: 6, day: "Monday", date: "Jan 8", project: "Project A", type: "Development", description: "Sprint Planning", hours: 8 },
    { id: 7, day: "Tuesday", date: "Jan 9", project: "Project B", type: "Design", description: "Wireframes", hours: 8 },
    { id: 8, day: "Wednesday", date: "Jan 10", project: "Project B", type: "Design", description: "Prototype Review", hours: 7 },
    { id: 9, day: "Thursday", date: "Jan 11", project: "Project C", type: "QA", description: "Regression Testing", hours: 7 },
    { id: 10, day: "Friday", date: "Jan 12", project: "Project A", type: "Development", description: "Bug Fixes", hours: 6 },
  ],
  3: [],
  4: [
    { id: 11, day: "Monday", date: "Jan 22", project: "Project A", type: "Development", description: "Frontend Tasks", hours: 8 },
    { id: 12, day: "Tuesday", date: "Jan 23", project: "Project A", type: "Development", description: "API Integration", hours: 8 },
    { id: 13, day: "Wednesday", date: "Jan 24", project: "Project C", type: "QA", description: "Test Cases", hours: 8 },
    { id: 14, day: "Thursday", date: "Jan 25", project: "Project B", type: "Design", description: "Review Feedback", hours: 8 },
    { id: 15, day: "Friday", date: "Jan 26", project: "Project A", type: "Development", description: "Deployment", hours: 8 },
  ],
  5: [],
  6: [
    { id: 16, day: "Monday", date: "Feb 5", project: "Project B", type: "Design", description: "Homepage Concepts", hours: 8 },
    { id: 17, day: "Tuesday", date: "Feb 6", project: "Project A", type: "Development", description: "Component Work", hours: 8 },
    { id: 18, day: "Wednesday", date: "Feb 7", project: "Project A", type: "Development", description: "Feature Updates", hours: 8 },
    { id: 19, day: "Thursday", date: "Feb 8", project: "Project C", type: "QA", description: "Smoke Tests", hours: 8 },
    { id: 20, day: "Friday", date: "Feb 9", project: "Project A", type: "Development", description: "Release Prep", hours: 8 },
  ],
  7: [
    { id: 21, day: "Monday", date: "Feb 12", project: "Project A", type: "Development", description: "API Cleanup", hours: 6 },
    { id: 22, day: "Tuesday", date: "Feb 13", project: "Project B", type: "Design", description: "UX Iteration", hours: 6 },
    { id: 23, day: "Wednesday", date: "Feb 14", project: "Project C", type: "QA", description: "Test Execution", hours: 6 },
    { id: 24, day: "Thursday", date: "Feb 15", project: "Project A", type: "Development", description: "Bug Fixing", hours: 5 },
    { id: 25, day: "Friday", date: "Feb 16", project: "Project A", type: "Development", description: "Documentation", hours: 5 },
  ],
  8: [],
  9: [
    { id: 26, day: "Monday", date: "Feb 26", project: "Project A", type: "Development", description: "Planning", hours: 8 },
    { id: 27, day: "Tuesday", date: "Feb 27", project: "Project B", type: "Design", description: "Mockups", hours: 8 },
    { id: 28, day: "Wednesday", date: "Feb 28", project: "Project A", type: "Development", description: "Feature Work", hours: 8 },
    { id: 29, day: "Thursday", date: "Feb 29", project: "Project C", type: "QA", description: "Testing", hours: 8 },
    { id: 30, day: "Friday", date: "Mar 1", project: "Project A", type: "Development", description: "Release", hours: 8 },
  ],
  10: [
    { id: 31, day: "Monday", date: "Mar 4", project: "Project A", type: "Development", description: "Backlog Grooming", hours: 8 },
    { id: 32, day: "Tuesday", date: "Mar 5", project: "Project B", type: "Design", description: "Wireframe Review", hours: 8 },
    { id: 33, day: "Wednesday", date: "Mar 6", project: "Project A", type: "Development", description: "Sprint Delivery", hours: 8 },
    { id: 34, day: "Thursday", date: "Mar 7", project: "Project C", type: "QA", description: "Regression", hours: 8 },
    { id: 35, day: "Friday", date: "Mar 8", project: "Project A", type: "Development", description: "Retrospective", hours: 8 },
  ],
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function calculateTotalHours(entries) {
  return entries.reduce((sum, entry) => sum + (Number(entry.hours) || 0), 0);
}

function getWeekStatus(entries) {
  const totalHours = calculateTotalHours(entries);

  if (totalHours === 0) {
    return "missing";
  }

  return totalHours >= 40 ? "completed" : "incomplete";
}

function getMonthBoundary(monthKey) {
  const [year, month] = monthKey.split("-").map(Number);
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  return { startDate, endDate };
}

function weekOverlapsMonth(week, monthKey) {
  const { startDate: monthStart, endDate: monthEnd } = getMonthBoundary(monthKey);
  const weekStart = new Date(week.startDate);
  const weekEnd = new Date(week.endDate);

  return weekStart <= monthEnd && weekEnd >= monthStart;
}

function mapWeekSummaries() {
  return mockTimesheets.map((week) => ({
    ...week,
    status: getWeekStatus(mockTimesheetEntries[week.week] || []),
  }));
}

// No simulated network delay in this build — API returns immediately.

// API Service
const API = {
  // User Authentication
  login: async (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _password, ...userWithoutPassword } = user;
      return {
        success: true,
        data: userWithoutPassword,
        token: 'mock-jwt-token-' + Date.now()
      };
    }

    throw {
      success: false,
      message: 'Invalid email or password'
    };
  },

  // Get list of timesheets
  getTimesheets: async (filters = {}) => {
    let data = mapWeekSummaries();

    // Apply filters
    if (filters.status) {
      data = data.filter(t => t.status === filters.status);
    }

    if (filters.dateRange) {
      data = data.filter((week) => weekOverlapsMonth(week, filters.dateRange));
    }

    return {
      success: true,
      data,
      total: data.length
    };
  },

  // Get timesheet entries for a specific week
  getTimesheetEntries: async (weekId) => {
    const entries = mockTimesheetEntries[weekId];
    if (entries) {
      return {
        success: true,
        data: clone(entries)
      };
    }

    throw {
      success: false,
      message: 'Week not found'
    };
  },

  // Create new timesheet entry
  createTimesheetEntry: async (weekId, entryData) => {
    const newEntry = {
      id: Date.now(),
      day: entryData.day || entryData.date,
      ...entryData
    };

    if (!mockTimesheetEntries[weekId]) {
      mockTimesheetEntries[weekId] = [];
    }

    mockTimesheetEntries[weekId].push(newEntry);

    return {
      success: true,
      data: newEntry,
      message: 'Entry created successfully'
    };
  },

  // Update timesheet entry
  updateTimesheetEntry: async (weekId, entryId, entryData) => {
    const entries = mockTimesheetEntries[weekId];
    const index = entries?.findIndex(e => e.id === entryId);

    if (index > -1) {
      mockTimesheetEntries[weekId][index] = {
        ...mockTimesheetEntries[weekId][index],
        ...entryData
      };

      return {
        success: true,
        data: mockTimesheetEntries[weekId][index],
        message: 'Entry updated successfully'
      };
    }

    throw {
      success: false,
      message: 'Entry not found'
    };
  },

  deleteTimesheetEntry: async (weekId, entryId) => {
    const entries = mockTimesheetEntries[weekId];
    const index = entries?.findIndex((entry) => entry.id === entryId);

    if (index > -1) {
      const [removedEntry] = mockTimesheetEntries[weekId].splice(index, 1);
      return {
        success: true,
        data: removedEntry,
        message: 'Entry deleted successfully'
      };
    }

    throw {
      success: false,
      message: 'Entry not found'
    };
  }
};

export default API;
