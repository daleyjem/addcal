/**
 * Forces a download in the browser
 * @param {*} data File data to be inserted into downloadable file
 * @param {*} options Additional options for file (charset, mimetype, etc.)
 * @param {string} options.filename Filename of file being downloaded
 * @param {string} options.charset Charset of file being downloaded
 * @param {string} options.mimetype Mimetype of file being downloaded
 */
export default (data, options = {}) => {
    options.filename = options.filename || 'file.txt';
    options.charset = options.charset || 'utf-8';
    options.mimetype = options.mimetype || 'text/plain';

    const element = document.createElement('a');
    element.setAttribute('href', `data:${options.mimetype};charset=${options.charset},` + encodeURIComponent(data));
    element.setAttribute('download', options.filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
};
