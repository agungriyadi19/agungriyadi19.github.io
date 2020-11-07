const base_url = "https://api.football-data.org/v2";
const api_token = "e4bde930f7fa4cf0a225bf636f4157c0";

const ucl           = `${base_url}/competitions/2001/standings?standingType=TOTAL`;
const eredivisie    = `${base_url}/competitions/2003/standings?standingType=TOTAL`;
const premier       = `${base_url}/competitions/2021/standings?standingType=TOTAL`;
const laliga        = `${base_url}/competitions/2014/standings?standingType=TOTAL`;

const detail_team = `${base_url}/teams/`;

const typeTeam = "team";
const storeNameTeam = "favorite_team";

function status(response) {
    if (response.status !== 200) {
        console.log("[API.js][status] Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}

function error(error) {
    console.log("[API.js][error] Error : " + error);
}

function fetchAPI(endpoint) {
    return fetch(endpoint, {
        headers: {
            "X-Auth-Token": api_token
        }
    });
}

function getTeam(data){
    var tableLigaHtml = "";

    data.standings.forEach(function (standing) {

        standing.table.forEach(function (team) {
            team = JSON.parse(JSON.stringify(team).replace(/^http:\/\//i, 'https://'));  

            tableLigaHtml += `


        <div class="card-panel grey lighten-5 z-depth-1 border-radius">
        <h5 class="center-align">${team.team.name}</h5>
          <div class="row">
            <div class="col s12 m5">
              <img src="${team.team.crestUrl}" alt="" class="responsive-img">
              
            </div>
            <div class="col s12 m7">
              <span class="black-text">
                    <table class="highlight">
                        <tr>
                            <th class="center-align">Position</th>
                            <td class="center-align">${team.position}</td>
                        </tr>
                        <tr>
                            <th class="center-align">Played</th>
                            <td class="center-align">${team.playedGames}</td>
                        </tr>
                        <tr>
                            <th class="center-align">Won</th>
                            <td class="center-align">${team.won}</td>
                        </tr>
                        <tr>
                            <th class="center-align">Draw</th>
                            <td class="center-align">${team.draw}</td>
                        </tr>
                        <tr>
                            <th class="center-align">Lost</th>
                            <td class="center-align">${team.lost}</td>
                        </tr>
                        <tr>
                            <th class="center-align">Points</th>
                            <td class="center-align">${team.points}</td>
                        </tr>
                    </table>
                    <a href="./detailTeam.html?id=${team.team.id}" class="waves-effect blue darken-4 border-radius btn right">Detail</a>
              </span>
            </div>
          </div>
        </div>

            `;
        })
    });

    document.getElementById("liga").innerHTML = tableLigaHtml;
    
}


function getUcl() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(ucl).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getTeam(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(ucl)
            .then(status)
            .then(json)
            .then(function(data) {
                getTeam(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getEredivisie() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(eredivisie).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getTeam(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(eredivisie)
            .then(status)
            .then(json)
            .then(function(data) {
                getTeam(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getPremier() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(premier).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getTeam(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(premier)
            .then(status)
            .then(json)
            .then(function(data) {
                getTeam(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getLaliga() {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(laliga).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        getTeam(data);
                        resolve(data);
                    });
                }
            });
        }
    
        fetchAPI(laliga)
            .then(status)
            .then(json)
            .then(function(data) {
                getTeam(data);
                resolve(data);
            })
    
        .catch(error);
    });
}

function getLiga(type) {
    if (type == "ucl") {
        getUcl();
    }
    else if(type == "eredivisie") {
        getEredivisie();
    }
    else if(type == "premier") {
        getPremier();
    }
    else if(type == "laliga") {
        getLaliga();
    }
}

function getTeamDetail(teamID) {
    return new Promise(function(resolve, reject) {
        if ("caches" in window) {
            caches.match(detail_team + teamID).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Short Name</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Founded</td>
            <td>${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Three Letter Abbreviation</td>
            <td>${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Phone</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Club Colors</td>
            <td>${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Venue</td>
            <td>${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
            <tr>
                <td>${number}</td>
                <td>${squad.name}</td>
                <td>${squad.position}</td>
                <td>${squad.nationality}</td>
            </tr>
        `;
        number++;
    });

    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
                        resolve(data);
                    });
                }
            });
        }

        fetchAPI(detail_team + teamID)
            .then(status)
            .then(json)
            .then(function(data) {
                data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Short Name</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Founded</td>
            <td>${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Three Letter Abbreviation</td>
            <td>${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Phone</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Club Colors</td>
            <td>${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Venue</td>
            <td>${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
            <tr>
                <td>${number}</td>
                <td>${squad.name}</td>
                <td>${squad.position}</td>
                <td>${squad.nationality}</td>
            </tr>
        `;
        number++;
    });

    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
                resolve(data);
            })
        .catch(error);
    });  
}

function getTeamFav(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableTeamFavoriteHtml = "";
    let number = 1;
    tableTeamFavoriteHtml += `
    <div class="row">
    `;

    data.forEach(function(team) {
    tableTeamFavoriteHtml += `
    
    <div class="col s12 m6">
        <div class="card-panel grey lighten-5 z-depth-1 border-radius">
            <h5 class="center-align">${team.name}</h5>
            <img src="${team.crestUrl}" alt="" width="100%">
            <a href="./detailTeam.html?id=${team.id}&saved=true" class="waves-effect blue darken-4 border-radius btn right">Detail</a>
            <a class="waves-effect waves-light btn-small red" onclick="removeFromFavorites(${team.id}, 'favorite_team')"><i class="large material-icons">delete</i></a>
            </div>
          </div>
        
    `;
        number++;
    });
    tableTeamFavoriteHtml += `
    </div>
    `;


    document.getElementById("favorite-item").innerHTML = tableTeamFavoriteHtml;
}

function tabFavorite() {

        getAllFavorites(storeNameTeam).then(function(data) {
            getTeamFav(data);
        });

}

function getTeamFavId(data) {
    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));

    var tableOverviewHtml = "";
    var tableSquadHtml = "";

    tableOverviewHtml += `
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Name</td>
            <td>${data.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Short Name</td>
            <td>${data.shortName}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Founded</td>
            <td>${data.founded}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Three Letter Abbreviation</td>
            <td>${data.tla}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Address</td>
            <td>${data.address}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Phone</td>
            <td>${data.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Website</td>
            <td><a href="${data.website}" target="_blank">${data.website}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Club Colors</td>
            <td>${data.clubColors}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Venue</td>
            <td>${data.venue}</td>
        </tr>
    `;

    let number = 1;
    data.squad.forEach(function (squad) {
        tableSquadHtml += `
            <tr>
                <td class="center-align">${number}</td>
                <td>${squad.name}</td>
                <td class="center-align">${squad.position}</td>
                <td class="center-align">${squad.nationality}</td>
            </tr>
        `;
        number++;
    });

    document.getElementById("crestUrl").src = data.crestUrl;
    document.getElementById("nameHeader").innerHTML = data.name;
    document.getElementById("preloader").innerHTML = "";
    document.getElementById("tableOverview").innerHTML = tableOverviewHtml;
    document.getElementById("tableSquad").innerHTML = tableSquadHtml;
}


function getFavoriteById(ID, type) {
    if (type == typeTeam) {
        getById(ID, storeNameTeam).then(function(data) {
            getTeamFavId(data);
        });
    
    }
}