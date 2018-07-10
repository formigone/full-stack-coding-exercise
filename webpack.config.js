const webpack = require('webpack');
const fs = require('fs');
const path = require('path');


const output = {
  path: 'js',
  filename: 'bundle.js',
  library: ['GSTV', '[name]'],
  libraryTarget: 'var',
};

const config = {
  devtool: 'source-map',
  entry: './client/index.js',
  output: output,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          plugins: ['transform-es2015-spread'],
        },
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    extensions: ['', '.js'],
  },
};

function getMimeType(filename) {
  const parts = filename.split(/.*?\.(\w+)$/);
  if (parts.length < 2) {
    return 'text/plain';
  }

  switch (parts[1]) {
    case 'js':
      return 'application/javascript';
    case 'css':
      return 'text/css';
    case 'eot':
      return 'application/vnd.ms-fontobject';
    case 'ttf':
      return 'application/font-sfnt';
    case 'svg':
      return 'image/svg+xml';
    case 'woff':
      return 'application/font-woff';
    case 'woff2':
      return 'font/woff2';
    default:
      return 'text/plain;charset=UTF-8';
  }
}

function uploadToAws(bundles, bucket) {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
  });

  return new Promise((resolve) => {
    const promises = [];
    Object.keys(bundles).forEach(filename => {
      const key = bundles[filename];
      console.log(` >>> Uploading to AWS: ${__dirname}/dist/${filename} => ${key}`);
      promises.push(new Promise(resolve => {
        const obj = {
          Bucket: bucket,
          Key: `react/${key}`,
          Body: fs.createReadStream(`${__dirname}/dist/${filename}`),
          ACL: 'public-read',
          CacheControl: 'public, s-maxage=31536000, max-age=31536000', // one year
          ContentType: getMimeType(filename),
        };

        s3.putObject(obj, (err, result) => {
          if (err) {
            throw err;
          }

          console.log(`AWS UPLOAD SUCCESSFUL http://cdn.ksl.com/react/${key}`, result);
          resolve(result);
        });
      }));
    });

    Promise.all(promises)
      .then(() => resolve(bundles)
      )
      .catch(err => console.error(`Error caught: ${err.message}`));
  });
}

function uploadBundleToAws(bundle, key, bucket) {
  const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    signatureVersion: 'v4',
  });

  return new Promise((resolve, reject) => {
    console.log(' >>> Uploading bundle AWS');
    const obj = {
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(bundle),
      ACL: 'public-read',
      CacheControl: 'max-age=60',
      ContentType: 'application/json',
      ContentEncoding: 'utf-8',
    };

    s3.putObject(obj, (err, result) => {
      if (err) {
        reject(err);
      }

      console.log(`AWS UPLOAD SUCCESSFUL http://cdn.ksl.com/${key}`, result);
      resolve(result);
    });
  });
}

/**
 *
 * @param {string} str Bundled filename. Example: `deps-4ccedc608996232e9c68.bundle.js`
 * @returns {Object} { type: [js|css], name: '' }
 */
function parts(str) {
  const parts = str.split(/-{2}.*?\.(\w+)$/);
  if (parts.length < 2) {
    return null;
  }

  return { type: parts[1], name: parts[0], file: str };
}

function genHashMap(files, target) {
  return new Promise(resolve => {
    const bundles = {};
    files
      .filter(parts)
      .forEach(p => {
          const part = parts(p);
          bundles[part.type] = bundles[part.type] || {};
          bundles[part.type][part.name] = part.file;
        }
      );

    console.log(`Generating hash maps...`);
    fs.writeFile(target, JSON.stringify(bundles, null, 2), (err) => {
      if (err) {
        throw err;
      }
      console.log('Bundles hash complete');
      console.log(bundles);
      resolve(bundles);
    });
  });
}

function getFiles(dir) {
  return new Promise(resolve => {
    fs.readdir(dir, (err, files) => {
        if (err) {
          throw err;
        }

        if (!dir.match(/\/$/)) {
          dir = `${dir}/`;
        }

        const stat = fs.statSync;
        const sorted = files.sort((a, b) => stat(dir + a).mtime.getTime() - stat(dir + b).mtime.getTime());
        resolve(sorted);
      }
    );
  });
}

module.exports = config;
