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

## `generate (g)`

**Alias: [`add`, `a`]**

### `generate env`

Add an ENV var.

This updates `.env`, `.env.example`, `app/constants.ts`, and `appcenter-pre-build.sh` all in one go.

**Args:**

- `--boolean` (`--bool`, `-b`) - process as boolean ENV var
- `--dry` (`-d`) - perform a dry test run (print out a Git diff of changes without changing any files)

**Example:**

```
# follow prompts to add ENV
airfoil add env

# add env var SETUP=true
airfoil add env setup=true

# add env var TEST=true (alternate args)
airfoil add env test true

# add env var DEV=true as a boolean
airfoil add env dev=true --boolean

# perform dry run
airfoil add env API_KEY=abc123 --dry
```

---

`help (h)`

List all available Airfoil commands

---

`version (v)`

Print out the Airfoil version number
