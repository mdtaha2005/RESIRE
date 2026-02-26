const bcrypt = require("bcrypt");
async function crypt(text){
    const cryt = await bcrypt.hash(text,10);
    console.log(cryt);
}
crypt("Rehma");