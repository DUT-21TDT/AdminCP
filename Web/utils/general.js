const text2float = (text) => {
    return parseFloat(text) ? parseFloat(text) : null; 
};

module.exports = {
    text2float,
}