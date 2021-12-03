let data_federer;

let federer_svg;
let federer_width;
let federer_height;
let federer_margin;
let federer_innerWidth;
let federer_innerHeight;

//TODO change dataset
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Top_Spin_Nedal.csv")])
    .then(function(values){  
        data_federer = values[0];

        federer_svg = d3.select('#federer_chart');
        federer_width = +federer_svg.style('width').replace('px','');
        federer_height = +federer_svg.style('height').replace('px','');
        federer_margin = { top:50, bottom: 50, right: 50, left: 60 };
        innerWidth = federer_width - federer_margin.left - federer_margin.right;
        innerHeight = federer_height - federer_margin.top - federer_margin.bottom;

        draw_federer_chart()
    })
  
});

function draw_federer_chart() {
  
}