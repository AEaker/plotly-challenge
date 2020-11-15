function DemoTable(id) {
    //read json
    d3.json("samples.json").then((data)=> {
        
      // get demo info by id
        var demoinfo = data.metadata.filter(meta => meta.id.toString() === id)[0];

        // reference id in html
        var demotable = d3.select("#sample-metadata");

        //Empty table
        demotable.html("");

        // totally had no idea how to do this :) ty GOOGLE
        Object.entries(demoinfo).forEach((key) => {   
            demotable.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");  
    })
});
};

function MakePlot(id){
    //read json
    d3.json("samples.json").then((data)=>{

        
    var samples = data.samples.filter(s => s.id.toString() == id)[0];
    //top 10
    var samplevalues = samples.sample_values.slice(0,10).reverse();
    //top 10 and formatting
    var otuids = samples.otu_ids.slice(0,10).reverse().map(o => "OTU " + o);
    //top 10
    var otulabels = samples.otu_labels.slice(0,10).reverse();


    var trace = [{
        type: 'bar',
        x: samplevalues,
        y: otuids,
        text: otulabels,
        orientation: 'h'
    }];

    

    var layout = {
        title: "Top 10 OTU",
        type: "linear",
        autorange: true,
    };
    
    Plotly.newPlot('bar', trace, layout)



    var trace2 = [{
        x: otuids,
        y: samplevalues,
        mode: "markers",
        marker:{
            size: samplevalues,
            colorscale: "Rainbow"
        },
        text: otulabels
    }];

    var layout2 = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1300
    };

    Plotly.newPlot("bubble", trace2, layout2);

});
};



function initializePage() {
    // select dropdown menu from line #25 in index.html
    var dropdown = d3.select("#selDataset");

    // read in the data from json
    d3.json("samples.json").then((data)=> {
        
        // get the id data to the dropdown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots to the page(use first id to build first plots)
        MakePlot(data.names[0]);
        DemoTable(data.names[0]);
    });
};


//redo demo info and table with new id.
function optionChanged(id) {
    MakePlot(id);
    DemoTable(id);
};

//run it when page opens
initializePage();




