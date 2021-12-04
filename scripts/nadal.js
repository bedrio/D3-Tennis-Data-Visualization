let data_nadal;

let nadal_svg;
let nadal_width;
let nadal_height;
let nadal_margin;
let nadal_innerWidth;
let nadal_innerHeight;

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Top_Spin_nadal.csv")])
    .then(function(values){  
        data_nadal = values[0];
        data_nadal.forEach(d => {
            for(var key in d) {
                d[key] = +d[key]
            }
        });

        nadal_svg = d3.select('#nadal_chart');
        nadal_width = +nadal_svg.style('width').replace('px','');
        nadal_height = +nadal_svg.style('height').replace('px','');
        nadal_margin = { top: 30, right: 30, bottom: 55, left: 60 };
        nadal_innerWidth = nadal_width - nadal_margin.left - nadal_margin.right;
        nadal_innerHeight = nadal_height - nadal_margin.top - nadal_margin.bottom;

        draw_nadal_chart("Federer")
        draw_nadal_chart("Nadal")
        draw_nadal_chart("Djokovic")
    })
  
});

function draw_nadal_chart(attribute) {
    var xScale = d3.scaleLinear()
        .domain([12, 0]) // data space
        .range([0, nadal_innerWidth]); // pixel space;
    
    const g = nadal_svg.append('g')
            .attr('transform',`translate(${nadal_margin.left},${nadal_margin.top})`);

    const yScale = d3.scaleLinear()
            .domain([0, 2.5])
            .range([nadal_innerHeight,0]);

    g.append('g')
        .call(d3.axisLeft(yScale));
    g.append('g')
        .attr('transform',`translate(0,${nadal_innerHeight})`)
        .call(d3.axisBottom(xScale))

    const singleLine = d3.line()
        .x(d => xScale(d["Distance"]))
        .y(d => yScale(d[attribute]))  
        .curve(d3.curveMonotoneX)

    g.append('path')
        .datum(data_nadal)  
        .attr('class','singleLine')      
        .style('fill','none')
        .style('stroke',getColor(attribute))
        .style('stroke-width','2')
        .attr('d', singleLine);

    
    g.selectAll('image')
            .data(data_nadal)
            .enter()
            .append('image')
            .attr('xlink:href', 'images/tennis_' + attribute + '.png')
            .attr('width', 16)
            .attr('height', 16)
            .attr('x', d => xScale(d["Distance"]) - 8)
            .attr('y', d => yScale(d[attribute]) - 8)

    g.append('text')
        .attr('class','graphTitle')
        .attr('y',-5)
        .attr('dx',nadal_innerWidth/4)
        .text('The Curves of Rafael Nadal');
    
    // // Add axis labels
    addAxesLabels(g);
}

function addAxesLabels(g) {
    g.append('text')
        .attr('transform','rotate(-90)')
        .attr('dy','-35')
        .attr('dx',-nadal_innerHeight/4)
        .style('text-anchor','end')
        .text('Height of Ball (in meters)');
    g.append('text')
        .attr('transform',`translate(${nadal_innerWidth},${nadal_innerHeight-10})`)
        .attr('dy','48')
        .attr('dx',-nadal_innerWidth/3)
        .style('text-anchor','end')
        .text('Length of Half Court (in meters)');
}