# Todo App

A clean and modern React Native todo list application with local storage, filtering, and analytics.

## Features

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete
- ✅ Filter todos (All, Active, Completed)
- ✅ View analytics and statistics
- ✅ Local storage persistence
- ✅ Clean and intuitive UI
- ✅ Profile management
- ✅ Responsive design

## Project Structure

```
RN-CourseGoals-App/
├── App.js                    # Main application entry
├── screens/                  # Screen components
│   ├── TodoListScreen.js    # Main todo list
│   ├── TodoDetailScreen.js  # Todo details view
│   ├── AnalyticsScreen.js   # Statistics & analytics
│   ├── SettingsScreen.js    # App settings
│   └── ProfileScreen.js     # User profile
├── navigation/               # Navigation setup
│   └── RootNavigator.js     # Main navigator
├── services/                 # Data services
│   └── localStorage.js       # Local storage service
├── store/                    # State management
│   └── appStore.js          # App state store
├── utils/                    # Utilities
│   └── helpers.js           # Helper functions
└── package.json             # Dependencies
```

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn
- Expo CLI

### Installation

```bash
# Install dependencies
npm install

# Start the development server
npx expo start
```

## Usage

1. **Add Todo**: Type in the input field and press Add or Enter
2. **Edit Todo**: Click the edit icon and modify the text
3. **Complete Todo**: Click the checkbox to mark as complete
4. **Delete Todo**: Click the delete icon to remove
5. **Filter**: Use the filter buttons to view specific todos
6. **Analytics**: Visit the Stats tab to see completion metrics
7. **Settings**: Configure app preferences

## Technology Stack

- **React Native** - Mobile app framework
- **React Navigation** - Navigation library
- **AsyncStorage/localStorage** - Data persistence
- **Expo** - Development platform

## Available Scripts

```bash
npm start      # Start development server
npm test       # Run tests (if configured)
npm run build  # Build for production
```

## File Formats

The app uses JSON format for data export/import:

```json
{
  "version": 1,
  "exportDate": "2026-02-05T12:00:00.000Z",
  "todos": [
    {
      "id": 1,
      "text": "Buy groceries",
      "completed": false,
      "createdAt": 1707118800000
    }
  ]
}
```

## Performance Considerations

- Todos are cached in memory for fast access
- Data is persisted to local storage
- UI updates are optimized with React hooks
- List rendering is optimized with FlatList

## Future Enhancements

- Categories and tags for todos
- Due dates and reminders
- Dark mode support
- Cloud sync capabilities
- Collaborative features
- Search functionality

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is open source and available under the MIT License.
