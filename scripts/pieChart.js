let data_pie_slams;
let data_pie_titles;

let pie_svg;
let pie_width;
let pie_height;
let pie_margin;
let pie_innerWidth;
let pie_innerHeight;

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv('data/Pie_Chart_Slams.csv'),
                 d3.csv('data/Pie_Chart_Titles.csv')])
    .then(function(values){  
        data_pie_slams = values[0];
        data_pie_titles = values[1];

        pie_svg = d3.select("#pie_slam");
        pie_width = +pie_svg.style('width').replace('px','');
        pie_height = +pie_svg.style('height').replace('px','');
        pie_margin = { top:50, bottom: 50, right: 50, left: 60 };
        pie_innerWidth = pie_width - pie_margin.left - pie_margin.right;
        pie_innerHeight = pie_height - pie_margin.top - pie_margin.bottom;

        draw_pie_chart()
    })
  
});

function draw_pie_chart() {
    let selected_player = +document.getElementById("player_select").value;
    let selected_competition = document.getElementById("competition_select").value
    let radius = Math.min(pie_width, pie_height) / 2 - pie_margin.left
    pie_svg.select('g').remove();
    let g = pie_svg.append("g").attr("transform", "translate(" + pie_width / 2 + "," + pie_height / 2 + ")");
    
    let data;
    if(selected_competition === "grand_slams") {
        data = [
            {
                "name": "Australian Open",
                "wins": data_pie_slams[selected_player]["Australian Open"]
            },
            {
                "name": "French Open",
                "wins": data_pie_slams[selected_player]["French Open"]
            },
            {
                "name": "US Open",
                "wins": data_pie_slams[selected_player]["US Open"]
            },
            {
                "name": "Wimbledon",
                "wins": data_pie_slams[selected_player]["Wimbledon"]
            },
        ]
    } else {
        data = [
            {
                "name": "Grass",
                "wins": data_pie_titles[selected_player]["Grass"]
            },
            {
                "name": "Clay",
                "wins": data_pie_titles[selected_player]["Clay"]
            },
            {
                "name": "Hard",
                "wins": data_pie_titles[selected_player]["Hard"]
            }
        ]
    }
    

    let ordScale = d3.scaleOrdinal().domain(data)
                    .range(['#ffd384','#94ebcd','#fbaccc','#d3e0ea']);

    let pie = d3.pie().value(function(d) {
        return d.value.wins;
    })

    var data_entries = pie(d3.entries(data))

    var arc = d3.arc()
                    .innerRadius(0)
                    .outerRadius(radius)


    g.selectAll('pie_slices')
        .data(data_entries)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d){ return(ordScale  (d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .data(data)
        .on('mouseover', function(d,i) {
            d3.select("#tooltip")
              .style("left", (d3.event.pageX + 28) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
              .style("opacity", 1)
              .text(d.name);
        })
        .on('mousemove',function(d,i) {
            d3.select("#tooltip")
                .style("left", (d3.event.pageX + 28) + "px")
                .style("top", (d3.event.pageY - 28) + "px")
                .style("opacity", 1)
                .text(d.name);
        })
        .on('mouseout', function(d,i) {
            d3.select("#tooltip") 
                .style("opacity", 0)
        })
}