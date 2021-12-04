let data_djokovic;

let djokovic_svg;
let djokovic_width;
let djokovic_height;
let djokovic_margin;
let djokovic_innerWidth;
let djokovic_innerHeight;

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Win_Rate_Djokovic.csv")])
    .then(function(values){  
        data_djokovic = values[0];

        djokovic_svg = d3.select('#djokovic_chart');
        djokovic_width = +djokovic_svg.style('width').replace('px','');
        djokovic_height = +djokovic_svg.style('height').replace('px','');
        djokovic_margin = { top:50, bottom: 50, right: 50, left: 60 };
        djokovic_innerWidth = djokovic_width - djokovic_margin.left - djokovic_margin.right;
        djokovic_innerHeight = djokovic_height - djokovic_margin.top - djokovic_margin.bottom;

        draw_djokovic_chart()
        draw_djokovic_chart()
    })
  
});

function value_to_name(value) {
    switch(value) {
        case 0:
            return "Roger Federer";
        case 1:
            return "Rafael Nadal";
        case 2:
            return "Andy Murray";
        case 3:
            return "Stan Wawrinka";
        case 4:
            return "Del Potro";
        case 5:
            return "Marin Cilic";
    }
}

function draw_djokovic_chart() {
    let selected_player = +document.getElementById("player_select_donut").value;
    let radius = Math.min(djokovic_width, djokovic_height) / 2 - djokovic_margin.left
    djokovic_svg.select('g').remove();
    let g = djokovic_svg.append("g").attr("transform", "translate(" + djokovic_width / 2 + "," + djokovic_height / 2 + ")");
    
    // console.log(data_djokovic)

    let data = [
        {
            "name": "Wins",
            "wins": data_djokovic[selected_player]["wins"]
        },
        {
            "name": "Losses",
            "wins": data_djokovic[selected_player]["losses"]
        }
    ]

    let ordScale = d3.scaleOrdinal().domain(data)
                    .range(['#F44336','#00E676']);

    let pie = d3.pie().value(function(d) {
        return d.value.wins;
    })

    var data_entries = pie(d3.entries(data))
    console.log(data_entries)

    g.selectAll('djokovic_slices')
        .data(data_entries)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(100)         // This is the size of the donut hole
            .outerRadius(radius)
        )
        .attr('fill', function(d){ return(ordScale(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .data(data)
        .on('mouseover', function(d,i) {
            console.log(d.wins)
            d3.select("#tooltip")
              .style("left", (d3.event.pageX + 28) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
              .style("opacity", 1)
              .text(d.wins + " matches");
        })
        .on('mousemove',function(d,i) {
            d3.select("#tooltip")
                .style("left", (d3.event.pageX + 28) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("opacity", 1)
                .text(d.wins + " matches");
        })
        .on('mouseout', function(d,i) {
            d3.select("#tooltip") 
                .style("opacity", 0)
        })

    g.append('text')
        .attr('class','graphTitle')
        .attr('y', -djokovic_innerHeight/1.8)
        .attr('dx',-djokovic_innerWidth/4)
        .text(value_to_name(selected_player) + " vs Djokovic Win Rate");
}