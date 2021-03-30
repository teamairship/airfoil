const NEW_CONTENT = `    <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
`;

function getCursorClosingResourcesTag(str: string) {
  // match ending `</resources>`
  const reg = /<\/resources>/;
  const matches = str.match(reg);
  if (!matches || !matches.length)
    throw new Error(
      'Could not update `android/app/src/main/res/values/strings.xml` - could not find closing `</resources>`',
    );
  const matchingString = matches[0];
  const cursorPos = str.indexOf(matchingString);
  return cursorPos;
}

export function updateResStringsXmlWithNewContent(existingContent: string) {
  if (existingContent.indexOf(NEW_CONTENT.trim()) > -1)
    throw new Error(
      'appcenter lines already exist in `android/app/src/main/res/values/strings.xml`',
    );
  const cursor = getCursorClosingResourcesTag(existingContent);
  return (existingContent.slice(0, cursor) + NEW_CONTENT + existingContent.slice(cursor)).replace(
    /^\s{2}$\n/gm,
    '\n',
  );
}
