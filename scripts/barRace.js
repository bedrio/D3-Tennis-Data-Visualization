let data_chart_race;

let bar_race_svg;
let bar_race_width;
let bar_race_height;
let bar_race_margin;
let bar_race_innerWidth;
let bar_race_innerHeight;

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Bar_Chart_Race.csv")])
    .then(function(values){  
        data_chart_race = values[0];

        bar_race_svg = d3.select('#bar_race');
        bar_race_width = +bar_race_svg.style('width').replace('px','');
        bar_race_height = +bar_race_svg.style('height').replace('px','');
        bar_race_margin = { top:50, bottom: 50, right: 50, left: 60 };
        innerWidth = bar_race_width - bar_race_margin.left - bar_race_margin.right;
        innerHeight = bar_race_height - bar_race_margin.top - bar_race_margin.bottom;

        draw_bar_race_chart()
    })
  
});

function draw_bar_race_chart() {
  
}