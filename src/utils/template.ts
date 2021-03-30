import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types';

import { GluegunToolboxExtended } from '../extensions/extensions';

export const addTemplateAndPromptIfExisting = async (
  toolbox: GluegunToolboxExtended,
  printDiff: (originalContent: string, newContent: string, fileName?: string) => Promise<void>,
  generateOptions: GluegunTemplateGenerateOptions,
) => {
  const { template, filesystem, prompt, print } = toolbox;
  const { optDry } = toolbox.globalOpts;
  const { yellow } = print.colors;
  const { target } = generateOptions;

  if (optDry) {
    const generated = await template.generate({
      ...generateOptions,
      target: undefined,
    });
    await printDiff('', generated, target);
    return;
  }

  let textAction = 'added';
  if (filesystem.exists(target)) {
    const { confirmed } = await prompt.ask([
      {
        type: 'confirm',
        name: 'confirmed',
        message: `${yellow(target)} already exists - overwrite?`,
      },
    ]);
    if (!confirmed) return;
    textAction = 'updated';
  }

  await template.generate(generateOptions);
  print.success(`${print.checkmark} ${textAction} ${target}`);
};
