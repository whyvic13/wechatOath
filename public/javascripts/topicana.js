/**
 * Created by yuanchen on 10/6/16.
 */
var regions = {
        "AEROSOLS":"AEROSOLS",
        "ALTITUDE":"ALTITUDE",
        "ATMOSPHERIC_TEMPERATURE":"ATMOSPHERIC_TEMPERATURE",
        "BRIGHTNESS_TEMPERATURE":"BRIGHTNESS_TEMPERATURE",
        "CLOUDS":"CLOUDS",
        "CONDENSATION":"CONDENSATION",
        "CONVECTION":"CONVECTION",
        "EROSION":"EROSION",
        "EVAPORATION":"EVAPORATION",
        "GRAVITY/WAVE":"GRAVITY/WAVE",
        "HEAT_FLUX":"HEAT_FLUX",
        "HUMIDITY":"HUMIDITY",
        "HURRICANES":"HURRICANES",
        "LIDAR":"LIDAR",
        "LIGHTNING":"LIGHTNING",
        "NATURAL_HAZARDS":"NATURAL_HAZARDS",
        "OCEAN_CIRCULATION":"OCEAN_CIRCULATION",
        "OSCILLATIONS":"OSCILLATIONS",
        "Others":"Others",
        "PRECIPITATION":"PRECIPITATION",
        "RADAR":"RADAR",
        "SEA_SURFACE_TEMPERATURE":"SEA_SURFACE_TEMPERATURE",
        "STORM_SURGE":"STORM_SURGE",
        "STORMS":"STORMS",
        "SURFACE_WINDS":"SURFACE_WINDS",
        "TIDES":"TIDES",
        "TORNADOES":"TORNADOES",
        "TROPICAL_CYCLONES":"TROPICAL_CYCLONES",
        "TROPOPAUSE":"TROPOPAUSE",
        "TURBULENCE":"TURBULENCE",
        "TYPHOONS":"TYPHOONS",
        "VORTICITY":"VORTICITY",
        "WATER_VAPOR":"WATER_VAPOR",
        "WIND_PROFILES":"WIND_PROFILES",
        "WIND_SHEAR":"WIND_SHEAR"
    },
    w = 925,
    h = 550,
    margin = 30,
    startYear = 1969,
    endYear = 2016,
    startAge = 0,
    endAge = 10,
    y = d3.scale.linear().domain([endAge, startAge]).range([0 + margin, h - margin]),
    x = d3.scale.linear().domain([1969, 2016]).range([0 + margin, w - margin]),
    years = [1969,1970,1971,1972,1973,1974,1975,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1996,1999,2001,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016];



var vis = d3.select("#vis").append("svg:svg").attr("width", w).attr("height", h).append("svg:g")
var line = d3.svg.line().x(function(d, i) {
    return x(d.x);
}).y(function(d) {
    return y(d.y);
});

var countries_regions = {};
var ready = false;

d3.text('data/new_data_1.csv', 'text/csv', function(text) {
    var regions = d3.csv.parseRows(text);
    for (i = 1; i < regions.length; i++) {
        countries_regions[regions[i][0]] = regions[i][1];
    }
});
var countryCodes = {};
d3.text('data/new_data.csv', 'text/csv', function(text) {
    var countries = d3.csv.parseRows(text);
    for (i = 1; i < countries.length; i++) {
        var values = countries[i].slice(2, countries[i.length - 1]);
        var currData = [];
        countryCodes[countries[i][1]] = countries[i][0];
        var started = false;
        for (j = 0; j < values.length; j++) {
            currData.push({
                              x: years[j],
                              y: values[j]
                          });
        }
        vis.append("svg:path").data([currData]).attr("country", countries[i][1]).attr("class", countries_regions[countries[i][1]]).attr("d", line).on("mouseover", onmouseover).on("mouseout", onmouseout);
    }
    ready = true;
});
vis.append("svg:line").attr("x1", x(1969)).attr("y1", y(startAge)).attr("x2", x(2016)).attr("y2", y(startAge)).attr("class", "axis")

vis.append("svg:line").attr("x1", x(startYear)).attr("y1", y(startAge)).attr("x2", x(startYear)).attr("y2", y(endAge)).attr("class", "axis")

vis.selectAll(".xLabel").data(x.ticks(10)).enter().append("svg:text").attr("class", "xLabel").text(String).attr("x", function(d) {
    return x(d)
}).attr("y", h - 10).attr("text-anchor", "middle")

vis.selectAll(".yLabel").data(y.ticks(4)).enter().append("svg:text").attr("class", "yLabel").text(String).attr("x", 0).attr("y", function(d) {
    return y(d)
}).attr("text-anchor", "right").attr("dy", 3)


function onclick(d, i) {
    var currClass = d3.select(this).attr("class");
    if (d3.select(this).classed('selected')) {
        d3.select(this).attr("class", currClass.substring(0, currClass.length - 9));
    } else {
        d3.select(this).classed('selected', true);
    }
}

function onmouseover(d, i) {
    var currClass = d3.select(this).attr("class");
    d3.select(this).attr("class", currClass + " current");
    d3.select(this).moveToFront();
    var countryCode = $(this).attr("country");
    var blurb = '<h2>' + countryCodes[countryCode] + '</h2>';

    $("#default-blurb").hide();
    $("#blurb-content").html(blurb);
}

function onmouseout(d, i) {
    var currClass = d3.select(this).attr("class");
    var prevClass = currClass.substring(0, currClass.length - 8);
    d3.select(this).attr("class", prevClass);
    $("#default-blurb").show();
    $("#blurb-content").html('');
}

d3.selection.prototype.moveToFront = function() {
    return this.each(function(){
        this.parentNode.appendChild(this);
    });
};
d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

function showRegion(regionCode) {
    if (ready) {
        var countries = d3.select("path." + regionCode);
        d3.select("path." + regionCode).moveToFront();
        if (countries.classed('highlight')) {
            countries.attr("class", regionCode);
        } else {
            countries.classed('highlight', true);
        }
    }
}
