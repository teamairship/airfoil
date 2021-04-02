# Command Guide for airfoil

Any file added to the `src/commands` dir automatically gets read by gluegun.

The basic boilerplate for a command is as follows:

```
const command = {
  name: '<COMMAND_NAME>',
  alias: [<ARRAY_OF_STRINGS_FOR_COMMAND_ALIASES>],
  run: async (toolbox: GluegunToolboxExtended) => {
    // your code goes here
  });
});
```
