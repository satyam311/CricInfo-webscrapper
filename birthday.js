url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-kings-xi-punjab-53rd-match-1216506/full-scorecard" ;
const request = require("request");
const cheerio = require("cheerio");

request(url,callback);
function callback(error , response , html ){
    if(error){
        console.log("Oops! something went wrong");
    }else {
        handleHTML(html);
    }
}

function handleHTML(html){
    let $ = cheerio.load(html);
    // We scrap the array of innings 
    let inningArr = $(".card.content-block.match-scorecard-table > .Collapsible");

    for(let i = 0 ; i < inningArr.length ; i++ ){

        // Basically I donot need team name
        let teamNameElem = $(inningArr[i]).find(".header-title.label");
        let teamName = teamNameElem.text();
        
        teamName = teamName.split("INNINGS")[0];
        teamName = teamName.trim();
        // console.log(teamName);
        // 

        let tableElement = $(inningArr[i]).find(".table.batsman");
        let allBatmans = $(tableElement).find("tr");
        for(let j = 0 ; j < allBatmans.length ; j++){
            let allColsOfPlayer = $(allBatmans[j]).find("td");
            // let playerName = $(allColsOfPlayer[0]).text();
            // console.log("playerName : " + playerName );
            // console.log(`teamname : ${teamName} Batsman : ${playerName}`);
            let isbatsman  = $(allColsOfPlayer[0]).hasClass("batsman-cell");
            if(isbatsman == true){
                let playerNamehref = $(allColsOfPlayer[0]).find("a").attr("href");
                let name = $(allColsOfPlayer[0]).text();

                let fullLink = "https://www.espncricinfo.com"+ playerNamehref;
                // console.log(`teamname : ${teamName} Batsman : ${fulllink}`);
                getBirthDayPage(fullLink,name,teamName);

            }            

        }



    }



}

function getBirthDayPage(fullLink,name,teamName){
    request(fullLink, callback);
    function callback(error , response , html){
        if(error){

        }else{
            extractBirthday(html, name , teamName);
        }
    }
}

function extractBirthday(html, name , teamName){
    let $ = cheerio.load(html);
    let playerDetails  = $(".player_overview-grid .player-card-description");
    
    let birthday = $(playerDetails[1]).text();
    console.log(`${name} plays for ${teamName} was born on ${birthday}`);


}