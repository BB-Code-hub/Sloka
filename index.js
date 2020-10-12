const axios = require('axios');
const cheerio = require('cheerio');
const FileSystem = require("fs");

const url = "https://www.valmiki.iitk.ac.in/sloka?field_kanda_tid=5&language=dv&field_sarga_value=";


for (let i = 1; i < 69; i++) {
    let newUrl = url + i;
    console.log(newUrl);
    axios.get(newUrl).then(response => {
        getData(response.data,i);
    }).catch(error => {
        console.log(error);
    });
}

let getData = (html,index) => {
    let data = [];
    const $ = cheerio.load(html);
    $("div.views-field-body div.field-content").each((i, ele) => {
        data.push({
            sloka: $(ele).text()
        });
    });
    FileSystem.writeFile('yuddhakanda-devangiri/Yuddhakanda'+index+'.json', JSON.stringify(data), (err) => {
        if (err) throw err;
    });
};




