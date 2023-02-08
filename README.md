# amo
This repository contains all the code required to run the amo app on a device/emulator.

## Setup
After cloning the repository, install Expo by running:

```bash
yarn add expo
```

Now install all the dependencies by running:
```bash
npx expo install
```

## Running the application
### On a physical device
Download [Expo Go](https://expo.dev/client) to your physical device and launch it. Make sure your PC and physical device are connected to the same local network. At the root of the project, run:
```bash
npm run start
```
This will start the development server and provide you with a QR Code in the terminal. Scanning that QR with the Expo Go app will launch the application on your device.

### On an emulator
Please follow the steps given [here](https://docs.expo.dev/workflow/expo-cli/).

## Development
### Installing packages
Here are some things to keep in mind before installing a package to prevent installation or build issues:
1. **Check if the package is compatible with Expo**: Some React Native packages cannot work with Expo, while other packages are built for the web.
2. **Make sure the package is decently maintained**: Of course, there are exceptions to this, but as a general rule of thumb always try to install packages that are well maintained and up to date.
3. **How to install? expo install, npm install, or yarn add?**: Always install packages via `expo install <package>` - if that doesn't work due to some issue, you can try `npm install <package>` and finally `yarn add <package>`. [Read more](https://docs.expo.dev/workflow/expo-cli/#install).

### Developer sanity
A good codebase is one that is well-typed and documented. Keeping the following in mind will help us not lose our fucking minds while coding/debugging:
- **Small, modular files**: If any file exceeds >200 lines, its time to break it up into small files that are more specific.
- **JSDoc annotations**: If there's a function that is being exported, add a JSDoc comment describing what it does. There isn't a need to describe the parameters, function type, or the return type, as Typescript will take care of it.. which brings us to the next point.
- **Type it out**: VS Code Intellisense does a good job of figuring out basic types, but always add types to objects, function parameters, and return types wherever they are not readily obvious.
- **READMEs**: READMEs are not just for the other person to understand what's going on, they're also for the future you who's probably going to be painfully debugging the mess you've coded, not knowing what the actual fuck is going on. READMEs prevent suicides and burnouts. As a good rule of thumb, add a `README.md` to every folder in the heirarchy, describing the intent, the files within it, and a brief overview of what they do.

### File structure
The structure of a file follows this pattern:
- **Packages**: Import all packages, internally defined utility functions and hooks.
- **Typescript**: Import, define, and export Typescript declarations.
- **Imports**: Import images, icons, and other media.
- **Constants**: Import or define all constants.
- **Components**: Import components.
- **Redux**: Import Redux-related functions and constants.
- **Variables**: Import or declare all variables. **[DISCOURAGED]**
- **Styles**: Import or define all styles.
- **Functions**: Define the key functions (including components) that may be inline imported.
- **Exports**: Handle exports here.

### Component structure
The structure of a component follows this pattern:
- **Constants**: Declare all constants and instances here.
- **Refs**: Declare all refs here using `useRef`.
- **Memo**: Define all memoized values using `useMemo`.
- **State**: Define all state variables using `useState` or Redux's `useSelector`.
- **Functions**: Define all functions here, wrapped by `useCallback` or not.
- **Effects**: Define all effects here using `useEffect`.
- **Return**: Return the value/values.

To visually help segment files and components, you can use the [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight) VS Code Extension. After installing it, copy the settings from [here](https://github.com/amoapp/amo/blob/master/.extensions/todohighlight.settings.json) and add them to your VS Code `settings.json` file.

## License
MIT
