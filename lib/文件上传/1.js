const fetch = require("node-fetch");
var fs = require('fs'); // 引入fs模块

var url = 'https://dldir1.qq.com/qqfile/qq/QQ9.0.8/24209/QQ9.0.8.24209.exe'
url = "https://www.python.org/ftp/python/3.7.2/python-3.7.2-amd64.exe";
let fileName = url.split("/").reverse()[0].split("?")[0];

function fetchFile(u){
  return new Promise(function (resolve, reject) {
      fetch(u, {
          method: "GET", //请求方式
          // mode: 'cors',
          headers: { //请求头
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36",
              "Cache-Control": "no-cache",
              Connection: "keep-alive",
              Pragma: "no-cache",
              Range: "bytes=0-1"
          }
      }).then(r => {
          var h = {};
          r.headers.forEach(function (v, i, a) {
              h[i.toLowerCase()] = v;
          })
          return resolve(h);
      }).catch(reject);
  });
}

function downLoadFile(u, startAndEnd, etag){
  console.log(startAndEnd)

  let option = {
    'Content-Type': 'application/octet-stream',
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    Pragma: "no-cache",
    "Range": "bytes=" + startAndEnd,
    etag: etag,
  };
  console.log(option)
  return fetch(u, {method: 'GET', headers: option}).then((res)=>res.buffer())
}

(async function(){
  var res = await fetchFile(url)
  console.log(res)
  var contentRange = res['content-range']
  var len = Number(contentRange.split("/").reverse()[0]); 
  console.log(len)
  var block = 1024 * 1024 * 8 // b
  var blockLen = Math.ceil(len / block)

  let blist = [];
  for(let i=0; i<blockLen; i++){
    let startAndEnd
    if(i != blockLen-1){
      startAndEnd = `${block*i}-${block*(i+1)-1}` 
    }else {
      startAndEnd = `${block*i}-${len}` 
    }
    
    let b = await downLoadFile(url, startAndEnd, res['etag'])
    blist.push(b)
  }
  fileBuffer = Buffer.concat(blist);

  fs.writeFile(fileName, fileBuffer, function (err) {
      if(err) {
        console.error(err);
      } else {
        console.log('写入成功');
      }

  });
}())


