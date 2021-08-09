import * as sharp from 'sharp';
import imageSize from 'image-size';

import { APP_ICON_SETTINGS } from '../constants';
import { GluegunToolboxExtended } from '../extensions/extensions';
import { interfaceHelpers } from '../utils/interface';

const BASE_IMG_SIZE = 1024;
const PATH_APP_ICON = 'AppIcon.png';
const PATH_IMG_MASK_CIRCLE = 'assets/img/mask-circle.png';
const PATH_IMG_MASK_ROUNDED = 'assets/img/mask-rounded.png';

export const addAppIcon = async (toolbox: GluegunToolboxExtended, projectName: string) => {
  const { filesystem, print } = toolbox;
  const { dim, cyan } = print.colors;
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

  const dimensions = imageSize(filesystem.path(PATH_APP_ICON));
  if (dimensions.width !== dimensions.height) {
    print.error(`${PATH_APP_ICON} must be a square image.`);
    print.info(dim(`current image is ${cyan(`${dimensions.width}x${dimensions.height}`)}`));
    printInstructions();
    process.exit(1);
  }

  if (dimensions.width < BASE_IMG_SIZE || dimensions.height < BASE_IMG_SIZE) {
    print.error(`${PATH_APP_ICON} must be 1024x1024 or larger`);
    print.info(dim(`current image is ${cyan(`${dimensions.width}x${dimensions.height}`)}`));
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

    if (optDry) {
      // prettier-ignore
      print.info(dim(`Target icon replacement: path=${relPath} width=${width} height=${height}${rounded ? ' rounded=true' : ''}${circle ? ' circle=true' : ''}`));
      return;
    }

    let maskImgPath;
    if (rounded) maskImgPath = fullPathImgMaskRounded;
    if (circle) maskImgPath = fullPathImgMaskCircle;

    const source = maskImgPath
      ? await Utils.toMaskedImg(filesystem.path(imgPath), maskImgPath)
      : filesystem.path(imgPath);

    await sharp(source)
      .resize({ width, height })
      .toFile(destPath);

    print.success(`${print.checkmark} added ${relPath}`);
  };

  public static async toNormalizedImg(imgPath: string) {
    if (!imgPath) throw new Error(`Expected imgPath in toNormalizedImg()`);

    const dimensions = imageSize(imgPath);
    if (dimensions.width === BASE_IMG_SIZE && dimensions.height === BASE_IMG_SIZE) return imgPath;

    return sharp(imgPath)
      .resize({ width: BASE_IMG_SIZE, height: BASE_IMG_SIZE })
      .png()
      .toBuffer();
  }

  public static async toMaskedImg(sourceImgPath: string, maskImgPath: string): Promise<Buffer> {
    if (!sourceImgPath) throw new Error(`Expected sourceImgPath in toMaskedImg()`);
    if (!maskImgPath) throw new Error(`Expected maskImgPath in toMaskedImg()`);

    const imgNormalized = await Utils.toNormalizedImg(sourceImgPath);
    const maskNormalized = await Utils.toNormalizedImg(maskImgPath);

    return (
      sharp(imgNormalized)
        // apply a subtractive image mask
        .composite([{ input: maskNormalized, blend: 'dest-in' }])
        .png()
        .toBuffer()
    );
  }

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
