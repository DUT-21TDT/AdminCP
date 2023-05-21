function delay(callback, ms) {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }

const text2float = (text) => {
  return parseFloat(text) ? parseFloat(text) : null; 
};


const privacy = {
  private:0,
  pending:1,
  public:2
}