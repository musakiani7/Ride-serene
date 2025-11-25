# Sher Khan Limousine - Performance Optimization Guide

## VS Code Performance Settings

This project includes optimized VS Code settings in `.vscode/settings.json` to prevent slowdowns:

- Excludes `node_modules` from file watching
- Excludes `uploads` folder from search
- Limits memory usage for TypeScript server
- Optimizes auto-save settings

## Large Files to Ignore

The following are automatically excluded from version control:
- `node_modules/` (dependencies)
- `package-lock.json` (large lock files)
- `uploads/` (user uploaded files)
- Build folders (`dist/`, `build/`)

## Recommended VS Code Extensions

For optimal performance, only install these essential extensions:
- ESLint (for code linting)
- Prettier (for code formatting, optional)

## Performance Tips

1. **Close unused files**: Keep only necessary files open
2. **Disable unused extensions**: Disable extensions not needed for this project
3. **Use .gitignore**: Large folders are already ignored
4. **Memory**: If VS Code is slow, restart it or increase memory limits
5. **Search scope**: Use folder-specific searches instead of workspace-wide

## File Structure

```
Sher Khan Lemosine/
├── backend/           # Express.js API
│   ├── controllers/   # Business logic
│   ├── models/        # Database schemas
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── uploads/       # User uploads (ignored by git)
│
└── frontend/          # React application
    ├── src/
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   ├── contexts/   # React contexts
    │   ├── utils/      # Utility functions
    │   └── layouts/    # Layout components
    └── public/         # Static assets
```

## Database Optimization

- All schemas use proper indexing
- Mongoose connections are optimized
- Query limits are set to prevent memory issues

## Known Issues & Solutions

**Issue**: VS Code becomes slow
- **Solution**: Restart VS Code, close unused files, check Task Manager for memory usage

**Issue**: File watching errors
- **Solution**: Excluded folders are properly configured in settings

**Issue**: Search is slow
- **Solution**: Use specific folder searches, exclude `node_modules`

## Development Best Practices

1. Run backend and frontend in separate terminals
2. Clear console logs in production
3. Keep dependencies updated but minimal
4. Use environment variables for configuration
5. Regular cleanup of unused imports
