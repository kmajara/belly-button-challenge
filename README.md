Belly Button Biodiversity Dashboard

This project is a Belly Button Biodiversity Dashboard that allows users to explore a dataset of belly button bacteria. The dashboard includes interactive charts and a demographic info panel. It is built using HTML, CSS, JavaScript, D3.js, and Plotly.
Project Structure

    index.html: The main HTML file containing the structure of the dashboard.
    static/js/app.js: The JavaScript file that contains the logic for fetching data, building charts, and updating the demographic info panel.
    samples.json: The JSON data file containing the belly button biodiversity dataset.

Features

    Dropdown menu to select a test subject ID.
    Metadata panel to display demographic information for the selected test subject.
    Bar chart to display the top 10 bacteria cultures found in the selected test subject's belly button.
    Bubble chart to display the bacteria cultures per sample for the selected test subject.

Setup and Usage
Prerequisites

    A web browser
    Internet connection

Instructions

    Clone or Download the Repository

    sh

    git clone https://github.com/kmajara/belly-button-challenge.git
    cd belly-button-challenge

    Ensure the samples.json file is in the correct path or update the URL in app.js to point to the correct location of the samples.json file.

    Open index.html in a web browser to view the dashboard.

Code Overview
index.html

    Contains the basic structure and layout of the dashboard using Bootstrap for styling.
    Includes containers for the dropdown menu, metadata panel, bar chart, and bubble chart.
    Links to the D3.js and Plotly.js libraries and the app.js script.

static/js/app.js

    buildMetadata(sample): Fetches metadata for the selected sample and updates the demographic info panel.
        Fetches JSON data and filters the metadata for the selected sample.
        Clears existing metadata and appends new key-value pairs to the panel.

    buildCharts(sample): Fetches sample data for the selected sample and updates the bar and bubble charts.
        Fetches JSON data and filters the samples for the selected sample.
        Extracts otu_ids, otu_labels, and sample_values to build and render the Bubble and Bar charts using Plotly.

    init(): Initializes the dashboard by populating the dropdown menu and displaying the first sample's data.
        Fetches JSON data and populates the dropdown with sample IDs.
        Builds charts and metadata panel with the first sample in the list.

    optionChanged(newSample): Updates the charts and metadata panel when a new sample is selected.
        Calls buildCharts and buildMetadata with the new sample ID.

Usage

    Load the JSON Data: The data is loaded from the provided URL.
    Populate the Dropdown: The dropdown menu is populated with sample IDs.
    Display Metadata: The metadata panel displays demographic information for the selected sample.
    Build Charts: The bar and bubble charts display the data for the selected sample.
    Update on Change: When a new sample is selected, the metadata and charts update accordingly.

License

This project is licensed under the MIT License.
