function readCsvFile(path){
    const fs = require('fs');
    const csv = require('csv-parser');
    const results = [];

    try{
        fs.createReadStream(path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            const jsonData = JSON.stringify({ data: results }, null, 2);
            return jsonData
        });
    }catch(err){
        console.log(err);
        return null;
    }
}

module.exports = readCsvFile