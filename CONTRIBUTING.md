## Contributing Guidelines

### Project organization

The purpose of using React is to build reusable components. One rule of thumb that is generally followed is that the 'src' directory should more or less follow the routing structure of the app. Take the example of a particular course page in a learning management app. Basically, the route to it would look like `/courses/:courseId`. So the directory structure for the relevant files could be 'src/views/courses'. This will include Courses.js, Course.js and the related CSS. Routes don't always have to be top level, you can include routes like these - `/courses/:courseId/marks/students` etc. Make sure to specify *exact* while writing the route. For API calls and state management, directories separate from 'src' should be made.

### Naming Conventions

Names for files should be apt, short, and most importantly, unambiguous. Javascript filenames should follow the TitleCase, and should not contain any hyphens or underscores. React component names (class based or function based) should also follow the TitleCase. Every other variable name should follow camelCase.

### Imports

Multiple imports from a single source should be grouped together by curly braces. The order of imports is usually like this - first the imports from npm packages, then from specific files within those npm packages, and finally imports from user-defined modules.

### Code Sanitation

Always auto format your code before commiting it in Git. This is an extremely simple way to make code indentations and whitespaces look beautiful and systematic. For VS Code, the shortcut is Alt+Shift+F. Refer to the shortcuts for editors you use. Do not leave empty spaces and newlines where they don't make sense.

### Compiler Warnings

Never ignore compiler warnings. They are there for a reason. Most of the time they arise because of unused imports. Do not import anything if you do not plan to use it, it just increases the bundle size needlessly. Check the browser console (press F12 in browser) for warnings too. Do not 'npm install' packages that are not being used. Uninstall them to keep the 'package.json' clean.

### Commit Messages

Always write meaningful commit messages. 'New files added' or 'Made minor changes' are not commit messages. They're not really helpful. Write commit messages in the present tense (not the past tense). Give a brief description of what was actually done. Never say 'modified this file/changed this/updated that'. Anyone can see the what files have been modified, you don't need to specify that. Just write what change you've made.
