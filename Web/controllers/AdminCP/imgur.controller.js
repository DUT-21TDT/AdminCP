const fs = require("fs");
const { ImgurClient } =  require('imgur');

module.exports = async (uploadPath) => {
    const client = new ImgurClient({ clientId: process.env.imgur_clientId}); // please config here...
    const response = await client.upload({
                image: fs.createReadStream(uploadPath),
                type: 'stream',
    });

    return response;
}