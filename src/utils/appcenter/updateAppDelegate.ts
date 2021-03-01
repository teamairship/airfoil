function getCursorBeforeFbSonarKit(str: string) {
  // match `#ifdef FB_SONARKIT_ENABLED`
  const reg = /#import\s"{0,1}<{0,1}.*\.h"{0,1}>{0,1}\n+(#ifdef\sFB_SONARKIT_ENABLED)/;
  const matches = str.match(reg);
  if (!matches || !matches[1]) return -1;
  const sub = matches[1];
  return str.indexOf(sub);
}

function getCursorBeforeIfDebug(str: string) {
  // match `#if DEBUG`
  const reg = /#import\s"{0,1}<{0,1}.*\.h"{0,1}>{0,1}\n+(#if DEBUG)/;
  const matches = str.match(reg);
  if (!matches || !matches[1]) return -1;
  const sub = matches[1];
  return str.indexOf(sub);
}

function getCursorAfterLastImport(str: string) {
  // match last `#import` statement
  const reg = /(^#import\s"{0,1}<{0,1}.*\.h"{0,1}>{0,1}$)/gm;
  const matches = str.match(reg);
  if (!matches || !matches.length) return -1;
  const sub = matches[matches.length - 1];
  // the +1 at the end is for the newline character
  return str.indexOf(sub) + sub.length + 1;
}

function getCursorForNewImports(str: string) {
  const cursorsFound = [];
  const cursorA = getCursorBeforeFbSonarKit(str);
  const cursorB = getCursorBeforeIfDebug(str);
  const cursorC = getCursorAfterLastImport(str);
  if (cursorA > -1) cursorsFound.push(cursorA);
  if (cursorB > -1) cursorsFound.push(cursorB);
  if (cursorC > -1) cursorsFound.push(cursorC);
  if (!cursorsFound.length)
    throw new Error('Could not update `AppDelegate.m` - imports in unexpected format');
  return Math.min(...cursorsFound);
}

const CONTENT_APP_DELEGATE_IMPORTS = `
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>

`;

export function updateAppDelegateImports(existingContent: string) {
  if (existingContent.indexOf(CONTENT_APP_DELEGATE_IMPORTS.trim()) > -1)
    throw new Error('appcenter imports already exist in `AppDelegate.m`');
  const cursor = getCursorForNewImports(existingContent);
  return (
    existingContent.slice(0, cursor) + CONTENT_APP_DELEGATE_IMPORTS + existingContent.slice(cursor)
  );
}

const CONTENT_DID_FINISH_LAUNCHING_WITH_OPTIONS = `
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];

  `;

function getCursorDidfinishLaunchingWithOptions(str: string) {
  // match full `didFinishLaunchingWithOptions` method from its start to its return statement
  const reg = /-\s.* didFinishLaunchingWithOptions\:\(.*\)launchOptions\s*\n*{\n*(.|\n)*?(return YES;)/;
  const matches = str.match(reg);
  if (!matches || !matches.length)
    throw new Error(
      'Could not update `AppDelegate.m` - `didFinishLaunchingWithOptions` method not in expected format',
    );
  const fullMatch = matches[0];
  const returnStatement = 'return YES;';
  const cursorPos = str.indexOf(fullMatch) + fullMatch.length - returnStatement.length;
  return cursorPos;
}

export function updateAppDelegateDidFinishLaunchingWithOptions(existingContent: string) {
  if (existingContent.indexOf(CONTENT_DID_FINISH_LAUNCHING_WITH_OPTIONS.trim()) > -1)
    throw new Error(
      'appcenter `didFinishLaunchingWithOptions` lines already exist in `AppDelegate.m`',
    );
  const cursor = getCursorDidfinishLaunchingWithOptions(existingContent);
  return (
    existingContent.slice(0, cursor) +
    CONTENT_DID_FINISH_LAUNCHING_WITH_OPTIONS +
    existingContent.slice(cursor)
  ).replace(/^\s{2}$\n/gm, '\n');
}
