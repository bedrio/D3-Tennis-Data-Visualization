let data_chart_race;

let bar_race_svg;
let bar_race_width;
let bar_race_height;
let bar_race_margin;
let bar_race_innerWidth;
let bar_race_innerHeight;
let currentYear;

document.addEventListener('DOMContentLoaded', function() {
    Promise.all([d3.csv("data/Bar_Chart_Race.csv")])
    .then(function(values){  
        data_chart_race = values[0];

        bar_race_svg = d3.select('#bar_race');
        bar_race_width = +bar_race_svg.style('width').replace('px','');
        bar_race_height = +bar_race_svg.style('height').replace('px','');
        bar_race_margin = { top:50, bottom: 50, right: 50, left: 100 };
        bar_race_innerWidth = bar_race_width - bar_race_margin.left - bar_race_margin.right;
        bar_race_innerHeight = bar_race_height - bar_race_margin.top - bar_race_margin.bottom;

        currentYear = "2000";
        draw_bar_race_chart()
    })
  
});

function stop() {
    d3.select("#stopButton").style('opacity',0)
    d3.select("#playButton").style('opacity',1)
    pressed = false
}

async function start() {
    d3.select("#stopButton").style('opacity',1)
    d3.select("#playButton").style('opacity',0)
    pressed = true
    
    while(currentYear !== "2021.75" && pressed ) {
        await new Promise(r => setTimeout(r, 100));
        currentYear = (Number(currentYear) + 0.25).toString();
        draw_bar_race_chart()
        if(currentYear == "2021.75") {
            stop()
        }
    }
}

function draw_bar_race_chart() {
    data_chart_race.sort(function(a,b) {
        return +b[currentYear] - +a[currentYear];
    });

    // 6. Only get the first 10 items in the array.
    data_chart_race = data_chart_race.slice(0,10);

    data_chart_race.forEach(d => {
        d.slams = +d[currentYear];
        d.player = d["Player"];
    });

    const xScale = d3.scaleLinear()
                        .domain([0, 20]) // data space
                        .range([0,bar_race_innerWidth]); // pixel space
    const yScale = d3.scaleBand()
                        .domain(data_chart_race.map(function(d) { return d.player;}))
                        .range([0,bar_race_innerHeight])
                        .padding(0.1);

    bar_race_svg.select('g').remove();
    const g = bar_race_svg.append('g')
                .attr('transform', 'translate('+bar_race_margin.left+', '+bar_race_margin.top+')');

    // // 10. This is what adds the rectangles in our bar chart.
    var barchart = g.selectAll('rect')
                    .data(data_chart_race)
                    .enter()
                    .append('rect')
                    .attr('fill', "lightcoral")
                    .attr('y', d => yScale(d.player))
                    .attr('height',yScale.bandwidth())
                    .attr('width', function(d) {
                        return  xScale(d.slams);
                    });

    // 11. Add the x-axis and y-axis with additional styling
    const yAxis = d3.axisLeft(yScale);
    g.append('g').call(yAxis)
                 .selectAll('.domain, .tick line').remove(); // remove the y-axis line and tick marks using this 'selectAll' command
               
    const xAxisTickFormat = function(d) { 
            // You can use this link to look at d3.format options: 
            // http://bl.ocks.org/zanarmstrong/05c1e95bf7aa16c4768e
            return d3.format('.3s')(d).replace('G','B') 
    }
    const xAxis = d3.axisBottom(xScale)
                    // make the x-axis labels nicer using a custom tick format function
                    .tickFormat(xAxisTickFormat)
                    // extend the x-axis tick marks backwards to the top of the chart
                    .tickSize(-bar_race_innerHeight);                
    var gXAxis = g.append('g').call(xAxis);
//     // remove the x-axis line 
    gXAxis.selectAll('.domain').remove();                   
    gXAxis.attr('transform',`translate(0,${bar_race_innerHeight})`)
                    .selectAll("text")                   // If you want to rotate the axis text,
                        .style("text-anchor", "end")     // select it with the selectAll call and
                        .attr("dx", "-10px")             // and slightly shift it (using dx, dy)
                        .attr("dy", "0px")               // and then rotate it.
                        .attr("transform", "rotate(-45)" );
    
    

//     // 12. Label the x-axis and add a title
//     // Note that we're using CSS to help style both these 
//     // components and the x-axis tick marks.
    g.append('text')
        .attr('class','axis-label')
        .attr('text-anchor','middle')
        .attr('x',bar_race_innerWidth/2)
        .attr('y',bar_race_innerHeight+70)
        .text('Population')    
    g.append('text')
        .attr('class','graphTitle')
        .attr('y',-10)
        .attr('x',bar_race_innerWidth/3)
        .text('Number of Grand Slams by Player');
}