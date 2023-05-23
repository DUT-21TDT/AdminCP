const imgbbUploader = require("imgbb-uploader");

module.exports = async(uploadPath)=> {
    const response = await imgbbUploader(process.env.imgbb, uploadPath)
    .then((response) => { return {
        success: true,
        url: response.display_url
    }})
    .catch((error) => {
        return {
            success: false,
            message: error,
            url: null,
        }
    });
    return response;
}