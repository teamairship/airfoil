// NOTE - had to use "$__{" inside template literals to avoid interpolation,
// allowing us to later change to "${"
const F = str => str.replace(/\$__\{/g, '${');

//
// SAMPLE A
//
// See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw
const INPUT_A = F(String.raw`
# create .env file if not exists
touch .env

echo "API_BASE_URL=\"$__{API_BASE_URL}\"" >>.env
echo "BLAH=\"$__{BLAH}\"" >>.env
echo "BLAM=\"$__{BLAM}\"" >>.env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);
const ARGS_A = { envKey: 'test-test' };
const OUTPUT_A = F(String.raw`
# create .env file if not exists
touch .env

echo "API_BASE_URL=\"$__{API_BASE_URL}\"" >>.env
echo "BLAH=\"$__{BLAH}\"" >>.env
echo "BLAM=\"$__{BLAM}\"" >>.env
echo "TEST_TEST=\"$__{TEST_TEST}\"" >>.env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);

//
// SAMPLE B
//
const INPUT_B = F(String.raw`
# create .env file if not exists
touch .env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);
const ARGS_B = { envKey: 'testTest' };
const OUTPUT_B = F(String.raw`
# create .env file if not exists
touch .env

echo "TEST_TEST=\"$__{TEST_TEST}\"" >>.env
echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);

//
// SAMPLE C
//
const INPUT_C = F(String.raw`
echo "ARG=\"$__{ARG}\"" >.env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);
const ARGS_C = { envKey: 'test' };
const OUTPUT_C = F(String.raw`
echo "ARG=\"$__{ARG}\"" >.env
echo "TEST=\"$__{TEST}\"" >>.env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);

//
// SAMPLE D
//
const INPUT_D = F(String.raw`
echo "ARG=\"$__{ARG}\"" >.env
echo "API_URL=\"$__{API_URL}\"" >>.env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);
const ARGS_D = { envKey: 'test' };
const OUTPUT_D = F(String.raw`
echo "ARG=\"$__{ARG}\"" >.env
echo "API_URL=\"$__{API_URL}\"" >>.env
echo "TEST=\"$__{TEST}\"" >>.env

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);

//
// SAMPLE E
//
const INPUT_E = F(String.raw`

echo "Done writing variables. Displaying created .env file ..."

cat .env

echo ".env" >/tmp/envfile
`);
const ARGS_E = { envKey: 'test' };
const ERR_MSG_E = `appcenter-pre-build.sh file improperly formatted - could not update`;

//
// SAMPLE F
//
const INPUT_F = F(String.raw`
# create .env file if not exists
touch .env
echo "API_BASE_URL=\"$__{API_BASE_URL}\"" >>.env
echo "BLAH=\"$__{BLAH}\"" >>.env
echo "BLAM=\"$__{BLAM}\"" >>.env
echo "Done writing variables. Displaying created .env file ..."
cat .env
echo ".env" >/tmp/envfile
`);
const ARGS_F = { envKey: 'BAT_MAN' };
const OUTPUT_F = F(String.raw`
# create .env file if not exists
touch .env
echo "API_BASE_URL=\"$__{API_BASE_URL}\"" >>.env
echo "BLAH=\"$__{BLAH}\"" >>.env
echo "BLAM=\"$__{BLAM}\"" >>.env
echo "BAT_MAN=\"$__{BAT_MAN}\"" >>.env
echo "Done writing variables. Displaying created .env file ..."
cat .env
echo ".env" >/tmp/envfile
`);

//
// SAMPLE G
//
const INPUT_G = F(String.raw`
# create .env file if not exists
touch .env
echo "ALREADY_TAKEN=\"$__{ALREADY_TAKEN}\"" >>.env
echo "Done writing variables. Displaying created .env file ..."
cat .env
echo ".env" >/tmp/envfile
`);
const ARGS_G = { envKey: 'already-taken' };
const ERR_MSG_G = `ENV key "ALREADY_TAKEN" already exists in appcenter-pre-build.sh`;

module.exports.INPUT_A = INPUT_A;
module.exports.ARGS_A = ARGS_A;
module.exports.OUTPUT_A = OUTPUT_A;
module.exports.INPUT_B = INPUT_B;
module.exports.ARGS_B = ARGS_B;
module.exports.OUTPUT_B = OUTPUT_B;
module.exports.INPUT_C = INPUT_C;
module.exports.ARGS_C = ARGS_C;
module.exports.OUTPUT_C = OUTPUT_C;
module.exports.INPUT_D = INPUT_D;
module.exports.ARGS_D = ARGS_D;
module.exports.OUTPUT_D = OUTPUT_D;
module.exports.INPUT_E = INPUT_E;
module.exports.ARGS_E = ARGS_E;
module.exports.ERR_MSG_E = ERR_MSG_E;
module.exports.INPUT_F = INPUT_F;
module.exports.ARGS_F = ARGS_F;
module.exports.OUTPUT_F = OUTPUT_F;
module.exports.INPUT_G = INPUT_G;
module.exports.ARGS_G = ARGS_G;
module.exports.ERR_MSG_G = ERR_MSG_G;
