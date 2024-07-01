// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    var metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number. Using find, instead of filter method since  I expect to a single match. 
    let result = metadata.find(meta => meta.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    var metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata each time before getting new id info
    metadataPanel.html(""); 

    // Inside a loop use d3 to append new tags for each key-value in the filtered metadata.
    Object.entries(result).forEach(([key, value]) => {
        metadataPanel.append("h6").text(`${key.toUpperCase()}: ${value}`)
    });

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    var samples = data.samples; 

    // Filter the samples for the object with the desired sample number
    var sampleResult = samples.find(samp => samp.id == sample);

    // Get the otu_ids, otu_labels, and sample_values
    var otuIds = sampleResult.otu_ids; 
    var sampleValues = sampleResult.sample_values; 
    var otuLabels = sampleResult.otu_labels; 
    

    // Build a Bubble Chart
    // First, create a layout for the BubbleChart
    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: {t:0}, 
        showlegend: false, 
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Number of Bacteria"},
        hovermode: "closest",
        margin: {t:50}
      };

    // Then, create the trace for the bubble Chart
    var bubbleMetrics = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "Earth"
        }
    }]; 

    // Finally, render the Bubble Chart using Plotly
    Plotly.newPlot("bubble", bubbleMetrics, bubbleLayout, {responsive: true});  


    // For the Bar Chart, mapping the otu_ids to a list of strings for the yticks
    //use top-10 values for y values in descending order
    var yticks = otuIds.slice(0,10).map(id => "OTU " + id).reverse(); 

    // Build a Bar Chart
    var barMetrics = [{
      x: sampleValues.slice(0,10).reverse(),
      y: yticks,
      text: otuLabels.slice(0,10).reverse(),
      type: "bar",
      orientation: 'h'
    }];

    //Create the layout for the bar
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 30, l: 150},
      xaxis: {
        tickmode: "linear",
        dtick: 20,
        title: "Number of Bacteria"
      },
      yaxis: {
        tickmode: "array",
        tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        ticktext: yticks
      }
    };

    // Render the Bar Chart
    Plotly.newPlot("bar", barMetrics, barLayout); 

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    var names = data.names; 

    // Use d3 to select the dropdown with id of `#selDataset`
    var dropSelector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name) => {
      dropSelector.append("option").text(name).property("value", name);
    
    });


    // Get the first sample from the list
    var sampleOne = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(sampleOne); 
    buildMetadata(sampleOne);
  });
}
// Initialize the dashboard
init();

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample); 
  buildMetadata(newSample);

}