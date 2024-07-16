const cartCodeGenerator = () => {
 const lenght = 4;
 const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

 let result = '';
 for(let i=0; i < lenght; i++){
    result += character.charAt(Math.floor(Math.random() * character?.length))
 }
 return result;
}

module.exports = { cartCodeGenerator }
