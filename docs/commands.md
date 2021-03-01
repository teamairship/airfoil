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

**Args:**

- `--update` (`-u`) - provide an exact version number
- `--verbose` (`-v`) - print more detailed logs

**Example:**

```
# bump version - patch release (e.g. 0.0.1 -> 0.0.2)
airfoil version patch

# bump version - minor release (e.g. 0.0.2 -> 0.1.0)
airfoil version minor

# bump version - major release (e.g. 0.1.0 -> 1.0.0)
airfoil version major

# bump version to 2.3.4
airfoil version -u 2.3.4
```

---

## `add (a)`

**Alias: [`generate`, `g`]**

### `add env`

Add an ENV var.

This updates `.env`, `.env.example`, `app/constants.ts`, and `appcenter-pre-build.sh` all in one go.

NOTE: an ENV value of "true" or "false" is always interpreted as a boolean.

**Args:**

- `--boolean` (`--bool`, `-b`) - process as boolean ENV var
- `--comment` (`-c`) - add a comment for this ENV var
- `--dry` (`-d`) - perform a dry test run _(print out a Git diff of changes without changing any files)_
- `--verbose` (`-v`) - print more detailed logs

**Example:**

```
# follow prompts to add ENV
airfoil add env

# add env var SETUP=true
airfoil add env setup=true

# add env var TEST=true (alternative format)
airfoil add env test true

# add env var DEV=mighty as a boolean
airfoil add env dev=mighty --boolean

# perform dry run
airfoil add env API_KEY=abc123 --dry
```

### `add adr`

Add an Architecture Design Record (ADR).

**Example:**

```
# follow prompts to add ADR
airfoil add adr

# specify ADR title as arg1
airfoil add adr "Choose Cognito for Auth"

```

### `add appcenter`

Add AppCenter support to your React Native app.

This makes file changes and installs dependencies based on the AppCenter Getting Started guide](https://docs.microsoft.com/en-us/appcenter/sdk/getting-started/react-native).

**Args:**

- `--dry` (`-d`) - perform a dry test run _(print out a Git diff of changes without changing any files)_
- `--verbose` (`-v`) - print more detailed logs

**Example:**

```
# follow prompts to add appcenter
airfoil add appcenter
```

---

`help (h)`

List all available Airfoil commands

---

`version (v)`

Print out the Airfoil version number
