let data_nedal;

let nedal_svg;
let nedal_width;
let nedal_height;
let nedal_margin;
let nedal_innerWidth;
let nedal_innerHeight;

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Top_Spin_Nedal.csv")])
    .then(function(values){  
        data_nedal = values[0];

        nedal_svg = d3.select('#nedal_chart');
        nedal_width = +nedal_svg.style('width').replace('px','');
        nedal_height = +nedal_svg.style('height').replace('px','');
        nedal_margin = { top:50, bottom: 50, right: 50, left: 60 };
        innerWidth = nedal_width - nedal_margin.left - nedal_margin.right;
        innerHeight = nedal_height - nedal_margin.top - nedal_margin.bottom;

        draw_nedal_chart()
    })
  
});

function draw_nedal_chart() {
  
}