//Get the Filter Table botton and set event handler to get the data when clicked
var filterButton = d3.select("#filter-btn");
filterButton.on("click", getTableData);

//Map the countries from the data into array and then find the uniqe ones
var country = data.map(sighting => sighting.country);
var uniqueCountry = country.filter((x, i, a) => a.indexOf(x) == i);

//Sort in alphabetical order
uniqueCountry.sort();

//Call the addtoDropDown function to add the countries to the dropdown
addtoDropDown("#country", uniqueCountry);

//Map the shapes from the data into an array and then find the unique ones
var shape = data.map(sighting => sighting.shape);
var uniqueShape = shape.filter((x, i, a) => a.indexOf(x) == i);

//Sort in alphabetical order
uniqueShape.sort();

//Call the function to add the shapes to the dropdown
addtoDropDown("#shape", uniqueShape);

//Load the data when the page is refreshed or opened the first time
getTableData();

//Add the list sent in to the id field sent in
function addtoDropDown(id, list) {
    //Get the dropdown
    var dropdown = d3.select(id).node();

    //Loop through the list sent in and add to the dropdown
    for (i=0; i<list.length; i++) {
        var option = d3.create("option").node();
        option.text = list[i];
        option.value = list[i]
        dropdown.add(option, i+1);   
    }
}

//Display all the sightings data or only show rows that match the search data
function getTableData() {
 
    //Get a copy of the data 
    filteredData = data;

    //Get the body of the table and clear it, incase this is not the first time through
    var tbody = d3.select("tbody");
    tbody.html("");

    //Get the date entered and filter on that date
    var inputDate = d3.select("#datetime").property("value");
    if (inputDate != ""){
        var filteredData = filteredData.filter(sighting => sighting.datetime === inputDate);
    }
    
    //Get the city entered and filter on that city
    var inputCity = d3.select("#city").property("value").toLowerCase();
    if (inputCity != ""){
        var filteredData = filteredData.filter(sighting => sighting.city === inputCity);
    }

     //Get the state entered and filter on that state
     var inputState = d3.select("#state").property("value").toLowerCase();
     if (inputState != ""){
         var filteredData = filteredData.filter(sighting => sighting.state === inputState);
     }

    //Get the country entered and filter on that county
    var inputCountry = d3.select("#country").property("value");

    if (inputCountry != "All"){
        var filteredData = filteredData.filter(sighting => sighting.country === inputCountry);
    }

    //Get the shape entered and filter on that shape
    var inputShape = d3.select("#shape").property("value");
    if (inputShape != "All"){
        var filteredData = filteredData.filter(sighting => sighting.shape === inputShape);
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