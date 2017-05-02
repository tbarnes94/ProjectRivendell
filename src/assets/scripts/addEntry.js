$('document').ready(function(){

    $('#next').on('click',function(e){
        if($("#startdate").val() != "" && $("#duration").val() != "") {
            $('#input_1').hide();
            $('#input_2').show();
            $('#back').show();

            e.preventDefault();
            var serviceoffice = $("#serviceoffice").val(); 
            var spl = $("#spl").val();
            var dmm = $("#dmm").val();
            var em_ade = $("#em_ade").val();
            var se = $("#se").val();
            var segment = $("#segment").val();
            var tpid = $("#tpid").val();
            var startdate = $("#startdate").val();

            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var date =  Number($('#startdate').val().split("/")[0]);
            var duration = Number($("#duration").val());
            var year = new Date().getFullYear()
            var rows = 2;
            var cols = duration;
            var table = $('<table align="center"><tbody>');
            for(var r = 0; r < rows; r++)
            {
                var tr = $('<tr>');
                if(r==0) {
                    var i = date-1;
                    var c = 0;
                    while(c < cols) {
                        var month = monthNames[i%12] + ' ' + year;
                        i = i+1;
                        c = c+1;
                        $("<th><center>"+month+"</center></th>").appendTo(tr);
                    }
                    tr.appendTo(tableHolder);
                }
                else {
                    for (var c = 0; c < cols; c++)
                    $('<td><input type="text" placeholder="$1000" data-type="val"/></td>').appendTo(tr);
                tr.appendTo(tableHolder);
                }
            }
            table.append('body');
        }

        $('input[data-type=val]').change(function() {
            this.value = "$" + Number(this.value).toLocaleString();
        }); 
    
    });

    $('#back').on('click',function(){
        $('#input_2').hide();
        $('#input_1').show();
        $('#back').hide();
        var elem = document.getElementById('tableHolder');
        while (elem.hasChildNodes()) {
            elem.removeChild(elem.lastChild);
        }
        
    });
});
