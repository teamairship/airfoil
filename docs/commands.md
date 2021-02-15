# Command Reference for airfoil

## `new (n)`

Create a new React Native project

You will be prompted to choose a project name, and then select through
various configuration options.

**Example:**

```
cd /path/where/new/project/will/be/created
airfoil new
# follow instructions in prompts
```

```
# alternatively, specify project name as 1st arg:
airfoil new starshipLaunchApp
```

Violá! Once everything finishes, you will have a working React Native app ready for development.

---

## `version (v)`

Bump the version number for a React Native project.

This updates the version in `package.json` as well as `ios/` and `android/` directories.

**Example:**

```
# bump version number (patch release e.g. 0.0.1 -> 0.0.2)
airfoil version patch

# bump version number (minor release e.g. 0.0.2 -> 0.1.0)
airfoil version minor

# bump version number (major release e.g. 0.1.0 -> 1.0.0)
airfoil version major
```

---

`generate (g)` WIP

Generate a new model (?)

---

`help (h)`

List all available Airfoil commands

---

`version (v)`

Print out the Airfoil version number
