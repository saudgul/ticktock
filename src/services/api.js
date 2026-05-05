// Mock Data
const mockUsers = [
  {
    id: 1,
    email: 'john@example.com',
    password: 'password123',
    name: 'John Doe'
  }
];

const mockTimesheets = [
  { week: 1, date: "1 - 5 January, 2024", status: "completed" },
  { week: 2, date: "8 - 12 January, 2024", status: "completed" },
  { week: 3, date: "15 - 19 January, 2024", status: "incomplete" },
  { week: 4, date: "22 - 26 January, 2024", status: "completed" },
  { week: 5, date: "28 January - 1 February, 2024", status: "missing" },
];

const mockTimesheetEntries = {
  1: [
    { id: 1, day: 'Monday', date: '21 Jan', project: 'Project A', type: 'Development', description: 'API Integration', hours: 8 },
    { id: 2, day: 'Tuesday', date: '22 Jan', project: 'Project B', type: 'Design', description: 'UI Mockups', hours: 7 },
    { id: 3, day: 'Wednesday', date: '23 Jan', project: 'Project A', type: 'Development', description: 'Bug Fixes', hours: 8 },
    { id: 4, day: 'Thursday', date: '24 Jan', project: 'Project C', type: 'QA', description: 'Testing', hours: 6 },
    { id: 5, day: 'Friday', date: '25 Jan', project: 'Project A', type: 'Development', description: 'Code Review', hours: 8 },
  ]
};

// API Service
const API = {
  // User Authentication
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (user) {
          const { password, ...userWithoutPassword } = user;
          resolve({
            success: true,
            data: userWithoutPassword,
            token: 'mock-jwt-token-' + Date.now()
          });
        } else {
          reject({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }, 500);
    });
  },

  // Get list of timesheets
  getTimesheets: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = [...mockTimesheets];
        
        // Apply filters
        if (filters.status) {
          data = data.filter(t => t.status === filters.status);
        }
        
        resolve({
          success: true,
          data,
          total: data.length
        });
      }, 300);
    });
  },

  // Get timesheet entries for a specific week
  getTimesheetEntries: async (weekId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const entries = mockTimesheetEntries[weekId];
        if (entries) {
          resolve({
            success: true,
            data: entries
          });
        } else {
          reject({
            success: false,
            message: 'Week not found'
          });
        }
      }, 300);
    });
  },

  // Create new timesheet entry
  createTimesheetEntry: async (weekId, entryData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEntry = {
          id: Date.now(),
          ...entryData
        };
        
        if (!mockTimesheetEntries[weekId]) {
          mockTimesheetEntries[weekId] = [];
        }
        
        mockTimesheetEntries[weekId].push(newEntry);
        
        resolve({
          success: true,
          data: newEntry,
          message: 'Entry created successfully'
        });
      }, 300);
    });
  },

  // Update timesheet entry
  updateTimesheetEntry: async (weekId, entryId, entryData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const entries = mockTimesheetEntries[weekId];
        const index = entries?.findIndex(e => e.id === entryId);
        
        if (index > -1) {
          mockTimesheetEntries[weekId][index] = {
            ...mockTimesheetEntries[weekId][index],
            ...entryData
          };
          
          resolve({
            success: true,
            data: mockTimesheetEntries[weekId][index],
            message: 'Entry updated successfully'
          });
        } else {
          reject({
            success: false,
            message: 'Entry not found'
          });
        }
      }, 300);
    });
  }
};

export default API;
