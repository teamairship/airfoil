module.exports.INPUT_A = `
<resources>
    <string name="app_name">Hello App Display Name</string>
</resources>
`;
module.exports.OUTPUT_A = `
<resources>
    <string name="app_name">Hello App Display Name</string>
    <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
</resources>
`;

module.exports.INPUT_B = `
<resources>
    <string name="app_name">Hello App Display Name</string>
    <string name="appCenterCrashes_whenToSendCrashes" moduleConfig="true" translatable="false">DO_NOT_ASK_JAVASCRIPT</string>
    <string name="appCenterAnalytics_whenToEnableAnalytics" moduleConfig="true" translatable="false">ALWAYS_SEND</string>
</resources>
`;
module.exports.ERR_MSG_B =
  'appcenter lines already exist in `android/app/src/main/res/values/strings.xml`';
