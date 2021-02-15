import { GluegunToolbox } from 'gluegun';
import { interfaceHelpers } from '../utils/interface';

module.exports = {
  name: 'generate',
  alias: ['g', 'add'],
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      template: { generate },
      print: { info },
    } = toolbox;
    const { titleSecondary, about } = interfaceHelpers(toolbox);

    titleSecondary();
    about();

    const name = parameters.first;

    await generate({
      template: 'model.ts.ejs',
      target: `models/${name}-model.ts`,
      props: { name },
    });

    info(`Generated file at models/${name}-model.ts`);
  },
};
