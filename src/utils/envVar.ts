import { constantCase } from 'constant-case';

// capture "\n<EOF>"
const REG_FILE_END = /(\n|\s)*$/g;
// capture "# "
const REG_ENV_COMMENT_START = /^#{0,1}\s*/;
// capture "// "
const REG_JS_COMMENT_START = /^\/\/{0,1}\s*/;
// capture "/*" or "*/"
const REG_JS_COMMENT_PART = /((\/\*)|(\*\/))/g;
// capture "echo "ENV=\"${ENV}\"" >>.env"
const REG_APPCENTER_ENV = /^echo\s*".*=\\"\$\{.*\}\\""\s*>>\.env$/gim;
// capture "touch .env" and one-to-two newlines
const REG_APPCENTER_TOUCH = /touch \.env\n\n{0,1}/g;
// capture "echo "ENV=\"${ENV}\"" >.env" (note the single ">")
const REG_APPCENTER_FIRST_ENV = /"\s*>\.env\n/g;
// white-space regex pattern (two back-slashes needed inside RegExp constructor)
const WS = '\\s*';

/**
 * Given .env file content, return new content containing
 * the added ENV var
 * @param {string} existingContent
 * @param {string} envKey
 * @param {string} envVal
 * @param {string} envComment
 * @returns {string}
 */
export const addEnvVar = (
  existingContent: string = '',
  envKey: string = '',
  envVal: string = '',
  envComment: string = '',
): string => {
  if (!envKey) throw new Error('ENV key is required.');

  if (new RegExp(`^${constantCase(envKey)}=.*$`, 'gim').test(existingContent))
    throw new Error(`ENV key "${constantCase(envKey)}" already exists in .env`);

  const contentWithoutEndingNewLines = existingContent.replace(REG_FILE_END, '');
  const comment = envComment ? `# ${envComment.replace(REG_ENV_COMMENT_START, '')}\n` : '';
  const envLine = `${constantCase(envKey)}=${envVal}\n`;
  return `${contentWithoutEndingNewLines}\n${comment}${envLine}`;
};

/**
 * Given constants.ts file content, return new content containing
 * the added constant declaration / export.
 * @param {string} existingContent
 * @param {string} envKey
 * @param {string} envComment
 * @returns {string}
 */
export const addConstant = (
  existingContent: string = '',
  envKey: string = '',
  envComment: string = '',
  envType: 'string' | 'boolean' = 'string',
) => {
  if (!envKey) throw new Error('ENV key is required.');

  const ENV = constantCase(envKey);

  const regAlreadyExists = new RegExp(`^export${WS}const${WS}${ENV}${WS}=${WS}.*$`, 'gim');
  if (regAlreadyExists.test(existingContent))
    throw new Error(`ENV key "${ENV}" already exists in constants.ts`);

  const contentWithoutEndingNewLines = existingContent.replace(REG_FILE_END, '');
  const comment = envComment
    ? `// ${envComment.replace(REG_JS_COMMENT_START, '').replace(REG_JS_COMMENT_PART, '')}\n`
    : '';
  const varLine =
    envType === 'string'
      ? `export const ${ENV} = Config.${ENV};\n`
      : `export const ${ENV} = Config.${ENV} === 'true';\n`;

  return `${contentWithoutEndingNewLines}\n${comment}${varLine}`;
};

/**
 * Given appcenter-prebuild.sh file content, return new content
 * containing the added ENV var assignment.
 * @see url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
 * @param {string} existingContent
 * @param {string} envKey
 * @returns {string}
 */
export const addAppCenterVar = (content: string = '', envKey: string = ''): string => {
  if (!envKey) throw new Error('ENV key is required.');

  const ENV = constantCase(envKey);
  const regAlreadyExists = new RegExp(`echo${WS}"${ENV}=`, 'gim');
  if (regAlreadyExists.test(content))
    throw new Error(`ENV key "${ENV}" already exists in appcenter-pre-build.sh`);

  let cursorStart = 0;
  let cursorEnd = 0;
  let matches = [];

  // initially place cursor immediately following the `touch .env`
  if (REG_APPCENTER_TOUCH.test(content)) {
    cursorStart = content.search(REG_APPCENTER_TOUCH);
    cursorStart += content.match(REG_APPCENTER_TOUCH)[0].length;
    cursorEnd = cursorStart;
  }

  // if first env var definition exists (indicated by single caret ">"), set cursor immediately following it
  if (REG_APPCENTER_FIRST_ENV.test(content)) {
    cursorStart = content.search(REG_APPCENTER_FIRST_ENV);
    cursorStart += content.match(REG_APPCENTER_FIRST_ENV)[0].length;
    cursorEnd = cursorStart;
  }

  // see if any ENV vars already exist, and if so, place cursor at start and end of all of the ENV definitions
  if (REG_APPCENTER_ENV.test(content)) {
    cursorStart = content.search(REG_APPCENTER_ENV);
    matches = content.match(REG_APPCENTER_ENV) || [];
    cursorEnd = cursorStart + matches.join('\n').length + 1;
  }

  const ERR_IMPROPERLY_FORMATTED =
    'appcenter-pre-build.sh file improperly formatted - could not update';
  if (cursorStart <= 0) throw new Error(ERR_IMPROPERLY_FORMATTED);
  if (cursorEnd <= 0) throw new Error(ERR_IMPROPERLY_FORMATTED);

  const startContent = content.slice(0, cursorStart);
  const envContent = content.slice(cursorStart, cursorEnd);
  const endContent = content.slice(cursorEnd, content.length);

  const newContent = String.raw`echo "${ENV}=\"$__{${ENV}}\"" >>.env`.replace('$__{', '${');

  return `${startContent}${envContent}${newContent}\n${endContent}`;
};
