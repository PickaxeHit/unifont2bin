const fs = require("fs");
const https = require("https");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const downloadMirror = "https://mirrors.tuna.tsinghua.edu.cn/gnu";
// const downloadMirror = "https://ftp.gnu.org/gnu";
// const downloadMirror = "https://unifoundry.com/pub";
// const downloadMirror = "https://ftpmirror.gnu.org";

function download(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    });
}

var buf = Buffer.alloc(2097152);
var pos = 0;

function convertToBin(input, output) {
    console.log("convert started" + input);
    var res = fs.readFileSync(input);
    res = res.slice(res[10]);
    buf.fill(0);
    pos = 0;
    for (let row = 255; row >= 0; row--) {
        for (let col = 2; col < 258; col++) {
            for (let ypos = 15; ypos >= 0; ypos--) {
                for (let xpos = 0; xpos < 2; xpos++) {
                    buf[pos] = ~res[row * 16 * 4128 / 8 + col * 16 / 8 + ypos * 4128 / 8 + xpos];
                    pos++;
                }
            }
        }
    }
    fs.writeFileSync(output, buf);
    console.log("convert finished" + output);
}

function concatBin(input1, input2, output) {
    var buf1 = fs.readFileSync(input1);
    var buf2 = fs.readFileSync(input2);
    var bufo = Buffer.concat([buf1, buf2]);
    fs.writeFileSync(output, bufo);
}

function downloadUnifont() {
    console.log("download index finished");
    const dom = new JSDOM(fs.readFileSync("./out/unifont.html", "utf8"));
    const document = dom.window.document;
    const picpos = document
        .getElementsByClassName("content")[0]
        .getElementsByTagName("table")[1]
        .getElementsByTagName("a");
    download(downloadMirror + picpos[2].href.substring(4), "./out/unifont_smp.bmp", () => {
        console.log("download smp finished");
        download(downloadMirror + picpos[1].href.substring(4), "./out/unifont_bmp_jp.bmp", () => {
            console.log("download bmp-jp finished");
            download(downloadMirror + picpos[0].href.substring(4), "./out/unifont_bmp.bmp", () => {
                console.log("download bmp finished");
                convertToBin("./out/unifont_bmp.bmp", "./out/unifont_bmp.bin");
                convertToBin("./out/unifont_bmp_jp.bmp", "./out/unifont_bmp_jp.bin");
                convertToBin("./out/unifont_smp.bmp", "./out/unifont_smp.bin");
                concatBin("./out/unifont_bmp.bin", "./out/unifont_smp.bin", "./out/unifont.bin");
                concatBin("./out/unifont_bmp_jp.bin", "./out/unifont_smp.bin", "./out/unifont_jp.bin");
                fs.unlinkSync("./out/unifont.html");
                fs.unlinkSync("./out/unifont_bmp.bmp");
                fs.unlinkSync("./out/unifont_smp.bmp");
                fs.unlinkSync("./out/unifont_bmp_jp.bmp");
            });
        });
    });
}

download("https://unifoundry.com/unifont/index.html", "./out/unifont.html", downloadUnifont);
