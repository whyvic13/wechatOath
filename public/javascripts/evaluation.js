$(document).ready(function(){
    var i=1;
    $("#add_row0").click(function(){
        $('#feedback'+i).html("<td><select class='form-control'><option>DeleteCurrent</option><option>Add</option></select></td><td><select class='form-control'><option>Instruments</option><option>Datasets</option><option>Variables</option><option>Organizations</option><option>Tool-model</option><option>StatisticalTechnology</option><option>Filters</option><option>ProjectionType</option><option>Projects</option><option>Aircraft</option><option>Satellite</option><option>Ground</option><option>Algorithms</option><option>Visualizations</option></select></td><td><input type='text'name='input'placeholder='Please Indentify Missing Term'class='form-control'/></td>");

        $('#tab_logic0').append('<tr id="feedback'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_row0").click(function(){
        if(i>1){
            $("#feedback"+(i-1)).html('');
            i--;
        }
    });
    $("#submit0").click(function(){

        $("#evaluation0").hide();

    });
});