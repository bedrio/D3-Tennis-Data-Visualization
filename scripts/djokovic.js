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
        innerWidth = djokovic_width - djokovic_margin.left - djokovic_margin.right;
        innerHeight = djokovic_height - djokovic_margin.top - djokovic_margin.bottom;

        draw_djokovic_chart()
    })
  
});

function draw_djokovic_chart() {
  
}