let combinedObject = {};

let index = 0;
items.forEach(item => {
    try{
        const parsedData = JSON.parse(item.json.response);

        Object.keys(parsedData).forEach(key => {
            const uniqueKey = `${key}_${index}`;
            combinedObject[uniqueKey] = parsedData[key];
        });
        index++;
    }catch(error){
        console.log(`Error al parsear JSON: ${error.message}`);
    }
});

return [{
    json: {
        combinedData: combinedObject
    }
}];

