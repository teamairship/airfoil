import * as sharp from 'sharp';
import { APP_ICON_SETTINGS } from '../constants';

import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';

const PATH_APP_ICON = 'AppIcon.png';

const PATH_IMG_MASK_CIRCLE = 'assets/img/mask-circle.png';
const PATH_IMG_MASK_ROUNDED = 'assets/img/mask-rounded.png';

export const addAppIcon = async (toolbox: GluegunToolboxExtended, projectName: string) => {
  const { filesystem, print } = toolbox;
  const { dryNotice } = interfaceHelpers(toolbox);
  dryNotice();

  const fullPathAppIconFolderIos = APP_ICON_SETTINGS.ios.iconFolderPath.replace('%s', projectName);

  const printInstructions = Utils.printInstructions(toolbox);
  const processImg = Utils.processImg(toolbox);

  if (!filesystem.exists(PATH_APP_ICON)) {
    print.error(`${PATH_APP_ICON} not found.`);
    printInstructions();
    process.exit(1);
  }

  await Promise.all(
    APP_ICON_SETTINGS.ios.icons.map(icon =>
      processImg(PATH_APP_ICON, icon.filename, icon.width, icon.height, {
        parentPath: fullPathAppIconFolderIos,
      }),
    ),
  );

  await Promise.all(
    APP_ICON_SETTINGS.android.icons.map(icon =>
      Promise.all(
        APP_ICON_SETTINGS.android.iconFlavors.map(iconFlavor =>
          processImg(PATH_APP_ICON, [icon.filename, iconFlavor.filename], icon.width, icon.height, {
            parentPath: APP_ICON_SETTINGS.android.iconFolderPath,
            rounded: iconFlavor.rounded,
            circle: iconFlavor.circle,
          }),
        ),
      ),
    ),
  );
};

type ProcessImgOptions = {
  parentPath?: string;
  rounded?: boolean;
  circle?: boolean;
};

class Utils {
  public static processImg = (toolbox: GluegunToolboxExtended) => async (
    imgPath: string,
    destFile: string | string[],
    width: number,
    height: number,
    { parentPath = '', rounded, circle }: ProcessImgOptions = {},
  ) => {
    const { filesystem, print, meta } = toolbox;
    const { dim } = print.colors;
    const { optDry } = toolbox.globalOpts;
    const fullPathImgMaskCircle = filesystem.path(meta.src || '', PATH_IMG_MASK_CIRCLE);
    const fullPathImgMaskRounded = filesystem.path(meta.src || '', PATH_IMG_MASK_ROUNDED);
    const destPath = Array.isArray(destFile)
      ? filesystem.path(parentPath, ...destFile)
      : filesystem.path(parentPath, destFile);
    const relPath = destPath.replace(filesystem.path(''), '');
    const onSuccess = () => print.success(`${print.checkmark} added ${relPath}`);

    if (optDry) {
      // prettier-ignore
      print.info(dim(`Target icon replacement: path=${relPath} width=${width} height=${height}${rounded ? ' rounded=true' : ''}${circle ? ' circle=true' : ''}`));
      return;
    }

    let compositeImg;
    if (rounded) compositeImg = fullPathImgMaskRounded;
    if (circle) compositeImg = fullPathImgMaskCircle;

    if (compositeImg) {
      return (
        sharp(filesystem.path(imgPath))
          // apply a subtractive image mask
          .composite([{ input: compositeImg, blend: 'dest-in' }])
          .png()
          .toBuffer()
          .then(data =>
            sharp(data)
              .resize({ width, height })
              .toFile(destPath),
          )
          .then(onSuccess)
      );
    }

    return sharp(filesystem.path(imgPath))
      .resize({ width, height })
      .toFile(destPath)
      .then(onSuccess);
  };

  public static printInstructions = (toolbox: GluegunToolboxExtended) => () => {
    const { print } = toolbox;
    const { yellow } = print.colors;
    print.newline();
    print.info(yellow('====  App Icon Requirements:  ===='));
    print.info(yellow('• File must be named `AppIcon.png`'));
    print.info(yellow('• File must be added to the project root'));
    print.info(yellow('• Image must be square and at least 1024x1024.'));
  };
}
