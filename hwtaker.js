url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");



request(url,callback);
function callback(error , response , html){
    if(error){
        console.log("Oops! something went wrong");
    }else{
        handleHTML(html);

    }

}

function handleHTML(html){
    let $ = cheerio.load(html);
    let contentArray = $(".match-info.match-info-MATCH .team");
    for(let i = 0 ; i < contentArray.length; i++){
        let hasclass = $(contentArray[i]).hasClass("team-gray");
        if(hasclass == false){
            // there is something problem
            let teamNameElem = $(contentArray[i]).find(".name");
            let nameofteam = teamNameElem.text();
            // console.log("teamNameElem.text()");
            // console.log( "Winning team :" + nameofteam);

        }
    }
 
    let inningArr = $(".card.content-block.match-scorecard-table >.Collapsible");
    for(let i = 0 ; i < inningArr.length ; i++){
        let hasclass = $(contentArray[i]).hasClass("team-gray");
        if(hasclass){
            let teamNameElem = $(inningArr[i]).find(".header-title.label");
            let teamName = teamNameElem.text();
            teamName = teamName.split("INNINGS")[0];
            teamName = teamName.trim();
            

            let tableElement = $(inningArr[i]).find(".table.bowler");
            let tablerows = $(tableElement).find("tr");
            let hwt = 0 ;
            let hwtName = "";

            for(let j = 0 ; j < tablerows.length ;j++){
                let allColsOfPlayer = $(tablerows[j]).find("td");
                let bowlerName = $(allColsOfPlayer[0]).text();
                let wicket = $(allColsOfPlayer[4]).text();

                if(wicket >= hwt ){
                    hwt = wicket;
                    hwtName = bowlerName ;

                }

                
                // console.log("bowlerName: " + bowlerName);
                // console.log("wicket: " + wicket);
                // console.log(`Loosing Team ${teamName} Bowler Name of Winning team  ${bowlerName} Taken ${wicket} wickets`);


            }
                // this is name of player of winning team 
                // the name of bowler of winning is extracted from loosing team  chart 

            console.log(`Highest wicket taker name from the winning team is ${hwtName} taken ${hwt} wickets`);

        }

    }



    

}

