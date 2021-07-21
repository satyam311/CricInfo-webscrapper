const request = require("request");
const cheerio = require("cheerio");

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/ball-by-ball-commentary";
// console.log("Before");
request(url,callback);
function callback(error , response , html ){
    if (error){
        console.log("Oops something went wrong");
    }else {
        extractHTML(html);

    }
}
// console.log("after");

function extractHTML(html){
    let $ = cheerio.load(html);
    let contentArray = $(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    let text = $(contentArray[0]).text();
    let htmlData = $(contentArray[0]).html();

    console.log("text" + text );
    console.log("htmlData"+ htmlData);

} 