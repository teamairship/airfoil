import { Toolbox } from 'gluegun/build/types/domain/toolbox';
import { GluegunTemplateGenerateOptions } from 'gluegun/build/types/toolbox/template-types';

export const buildProjectDirectoryStructure = async ({
  toolbox,
  projectName,
  appRootPath,
  subDirectories,
}: {
  toolbox: Toolbox;
  projectName: string;
  appRootPath: string;
  subDirectories: string[];
}) => {
  const { filesystem } = toolbox;

  subDirectories.forEach(subdir => {
    // `filesystem.dir` creates a directory if it does not already exist
    filesystem
      .dir(projectName)
      .dir(appRootPath)
      .dir(subdir);
  });
};

export const generateFiles = async ({
  toolbox,
  projectName,
  appRootPath,
  templates,
}: {
  toolbox: Toolbox;
  projectName: string;
  appRootPath: string;
  templates: GluegunTemplateGenerateOptions[];
}) => {
  const { filesystem, template } = toolbox;
  const { path } = filesystem;
  return Promise.all(
    templates.map(templateOpts => {
      // TODO: check to make sure target does not already exist??
      return template.generate({
        ...templateOpts,
        target: path(projectName, appRootPath, templateOpts.target),
      });
    }),
  );
};
