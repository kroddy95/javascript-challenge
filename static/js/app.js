//Get the table boday and the botton
var filterButton = d3.select("#filter-btn");

//Load the data when the page is refreshed or opened the first time
getTableData(data);

//Display all the sightings data or only show rows that match the search data
function getTableData(filteredData) {

    //Get a copy of the data 
    filteredData = data;

    //Get the body of the table and clear it, incase this is not the first time through
    var tbody = d3.select("tbody");
    tbody.html("");

    //Get the date entered and filter on that date
    var inputDate = d3.select("#datetime").property("value");
    if (inputDate != ""){
        var filteredData = data.filter(sighting => sighting.datetime === inputDate);
    }
    
    //Get the city entered and filter on that city
    var inputCity = d3.select("#city").property("value").toLowerCase();
    if (inputCity != ""){
        var filteredData = filteredData.filter(sighting => sighting.city === inputCity);
    }

    //Now take the rows left in the filteredData and add to the table on page
    filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });

}

//When the Filter Table button is clicked, get the data
filterButton.on("click", function() {
    getTableData(data);
 });
