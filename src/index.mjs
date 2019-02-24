import nodefs from 'fs';
import nodepath from 'path';
import mkdirp from 'mkdirp';

/**
 * @param {string} path
 * @param {Object} options
 * @returns {Promise<string>}
 */
export async function mkdir(path, options) {
    return new Promise((resolve, reject) => {
        mkdirp(path, options, (err, made) => {
            if (err) {
                reject(err);
            }
            resolve(made);
        });
    });
}

/**
 * @param {string} path
 * @param {Object} options
 * @returns {Promise<void>}
 */
export function mkdirSync(path, options) {
    return mkdirp.sync(path, options);
}

/**
 * @param {string} path
 * @param {Object} options
 * @returns {Promise<string|Buffer>}
 */
export async function readFile(path, options) {
    return new Promise((resolve, reject) => {
        nodefs.readFile(path, options, (err, content) => {
            if (err) {
                reject(err);
            }
            resolve(content);
        });
    });
}

/**
 * @param {string} path
 * @param {string} content
 * @param {string|Object} options
 * @param {Object} mkdirOptions
 * @returns {Promise<void>}
 */
export async function writeFile(path, content, options, mkdirOptions) {
    await mkdir(nodepath.dirname(path), mkdirOptions);
    await writeFilePromise(path, content, options);
}

/**
 * @param {string} path
 * @param {string} content
 * @param {string|Object} options
 * @returns {Promise<void>}
 */
export async function writeFilePromise(path, content, options) {
    return new Promise((resolve, reject) => {
        nodefs.writeFile(path, content, options, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
}

/**
 * @param {string} path
 * @param {string} content
 * @param {string|Object} options
 * @returns {void}
 */
export function writeFileSync(path, content, options) {
    mkdirp.sync(nodepath.dirname(path));
    nodefs.writeFileSync(path, content, options);
}

/**
 * @param {string} path
 * @param {*} value
 * @param {string|Object} options
 * @param {Object} mkdirOptions
 * @returns {Promise<void>}
 */
export async function writeAsJson(path, value, options, mkdirOptions) {
    return writeFile(path, JSON.stringify(value, null, 2), options, mkdirOptions);
}

/**
 * @param {string} path
 * @param {*} value
 * @param {string|Object} options
 * @returns {void}
 */
export function writeAsJsonSync(path, value, options) {
    writeFileSync(path, JSON.stringify(value, null, 2), options);
}
