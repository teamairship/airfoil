import { Toolbox } from 'gluegun/build/types/domain/toolbox';

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
