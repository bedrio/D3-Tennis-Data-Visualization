let data_federer;

let federer_svg;
let federer_width;
let federer_height;
let federer_margin;
let federer_innerWidth;
let federer_innerHeight;

//TODO change dataset
document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Chart5_federer.csv")])
    .then(function(values){  
        data_federer = values[0];

        federer_svg = d3.select('#federer_chart');
        federer_width = +federer_svg.style('width').replace('px','');
        federer_height = +federer_svg.style('height').replace('px','');
        federer_margin = { top:20, bottom: 60, right: 20, left: 120 };
        federer_innerWidth = federer_width - federer_margin.left - federer_margin.right;
        federer_innerHeight = federer_height - federer_margin.top - federer_margin.bottom;

        draw_federer_chart()
    })
  
});

function draw_federer_chart() {
    data_federer.forEach(d => {
        d.name = d["Player "];
        d.top4 = +d["Grand Slam SemiFinals"];
    });

    const xScale = d3.scaleLinear()
                        .domain([0, d3.max(data_federer, function(d) {  return d.top4 + 10; })]) // data_federer space
                        .range([0,federer_innerWidth]); // pixel space
    const yScale = d3.scaleBand()
                .domain(data_federer.map(function(d) { return d.name;}))
                .range([0,federer_innerHeight])
                .padding(0.1);

                const g = federer_svg.append('g')
                // .attr('transform', `translate(${margin.left}, ${margin.top})`);
                .attr('transform', 'translate('+federer_margin.left+', '+federer_margin.top+')');


    // 10. This is what adds the rectangles in our bar chart.
    g.selectAll('rect')
        .data(data_federer)
        .enter()
        .append('rect')
        .attr('fill', "#C6C669")
        .attr('y', d => yScale(d.name))
        .attr('height',yScale.bandwidth())
        .attr('width', function(d) {
            return  xScale(d.top4);
        });

    const yAxis = d3.axisLeft(yScale);
    g.append('g').call(yAxis);
    
    const xAxis = d3.axisBottom(xScale);
    g.append('g').call(xAxis)
                    .attr('transform',`translate(0,${federer_innerHeight})`)
                    .selectAll("text")                   // If you want to rotate the axis text,
                        .style("text-anchor", "end")     // select it with the selectAll call and
                        .attr("dx", "-10px")             // and slightly shift it (using dx, dy)
                        .attr("dy", "0px")               // and then rotate it.
                        .attr("transform", "rotate(-45)" );

    
    
    // 12. Add axis labels
    g.append('text')
        .attr('class','axis-label')
        .attr('transform','rotate(-90)')
        .attr('y','-100px')
        .attr('x',-federer_innerHeight/2)
        .attr('text-anchor','middle')
        .text('Players')
    g.append('text')
        .attr('class','axis-label')
        .attr('text-anchor','middle')
        .attr('x',federer_innerWidth/2)
        .attr('y',federer_innerHeight+50)
        .text('Grand Slam Top 4 Appearances')
}