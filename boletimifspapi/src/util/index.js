exports.getElementText = (page, elm) => {
    return page.evaluate(elm => elm.innerText, elm);
}

exports.isEmpty = (values) => {
    return values.some(x => !x || x.length == 0);
}

exports.asyncForEach = function (callback) {
    for (let index = 0; index < this.length; index++) {
        callback(this[index], index, this);
    }
};

exports.asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++)
        await callback(array[index], index, array);
}