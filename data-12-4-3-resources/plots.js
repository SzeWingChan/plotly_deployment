//12.4.3
//Test if the sample.json file could be loaded
//d3.json("samples.json").then(function(test) {
    //console.log("test");
//});

function init() {
    //The d3.select() method is used to select the dropdown menu, which has an id of #selDataset
    var selector = d3.select("#selDataset");
  
    //The d3.json() method is used to read the data from samples.json.
    //The data from the entire JSON file is assigned the (arbitrary) argument name data.
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      //For each element in the array, a dropdown menu option is appended. 
      //The text of each dropdown menu option is the ID. Its value property is also assigned the ID.
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
})}
  
init();

//Print the name of the ID in the console
// function optionChanged(newSample) {
//     console.log(newSample);
//   }

//Print colunteer's information to the Demographic Info panel
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);

    //When a dropdown menu option is selected, the ID number is passed in as sample.
    function buildMetadata(sample) {
      //Then d3.json() pulls in the entire dataset contained in samples.json. Once the dataset is read in, it is referred to as data.
      d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        //The filter() method is called on the metadata array to filter for an object in the array whose id property matches the ID number passed into buildMetadata() as sample. 
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        //PANEL.html("") ensures that the contents of the panel are cleared when another ID number is chosen
        PANEL.html("");
        PANEL.append("h6").text("ID: " + result.id);
        PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
        PANEL.append("h6").text("GENDER: " + result.gender);
        PANEL.append("h6").text("AGE: " + result.age);
        PANEL.append("h6").text("LOCATION: " + result.location);
        PANEL.append("h6").text("BBTYPE: " + result.bbtype);
        PANEL.append("h6").text("WFREQ: "+ result.wfreq);
      });
    }
}
  