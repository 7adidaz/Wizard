module.exports = function (string) {
    // normalizing input for the sql query not to break and to reduce the tokens. 
    string = string.replaceAll('"', "'");
    string = string.replaceAll('`', "'");
    string = string.replaceAll(' the ', " ");
    string = string.replaceAll(' a ', " ");
    string = string.replaceAll(' an  ', " ");
    string = string.replaceAll(' in ', " ");
    string = string.replaceAll(' of ', " ");
    string = string.replaceAll(' and ', ", ");
    string = string.replaceAll('\n', "");

    return string;
}

