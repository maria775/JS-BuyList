$(document).ready(function(){
    var $list = $(".product-input");
    var ONE_ROW_HTML = $(".one-row-template").html();

    var $leftover_template = $(".leftover-items");
    var LEFTOVER_HTML = $(".leftover-item-template").html();

    var $bought_items_template = $(".bought-items");
    var BOUGHT_HTML = $(".bought-item-template").html();

    //console.log("leftover html", LEFTOVER_HTML);



    function addItem(title){
        var $node = $(ONE_ROW_HTML);
        $node.find(".bl-title").text(title);
        var $leftover_node = $(LEFTOVER_HTML);
        var $bought_node = $(BOUGHT_HTML);

        $list.append($node);


        var quantity=1;
        var $quantity_label= $node.find(".bl-label");
        $quantity_label.text(quantity);

        var $leftover_node = $(LEFTOVER_HTML);
        $leftover_node.find(".product-name").text(title);
        var $count_label =  $leftover_node.find(".count-label").text(quantity);

        $node.find(".bl-plus").click(function(){
            $node.find(".bl-minus").prop("disabled", false);
            $node.find(".bl-minus").css('opacity', '1');
            quantity += 1;
            $bought_node.find(".count-label").text(quantity);
            $leftover_node.find(".count-label").text(quantity);
            $quantity_label.text(quantity);
        });

        $node.find(".bl-minus").click(function(){
            if(quantity >1){
                quantity -= 1;
                $bought_node.find(".count-label").text(quantity);
                $leftover_node.find(".count-label").text(quantity);
                $quantity_label.text(quantity);
                if (quantity == 1) {
                    $node.find(".bl-minus").prop("disabled", true);
                    $node.find(".bl-minus").css('opacity', '0.5');
                }
            } else if (quantity == 1) {
                $node.find(".bl-minus").prop("disabled", true);
                $node.find(".bl-minus").css('opacity', '0.5');
            }
        });
        $leftover_template.append($leftover_node);                                    $bought_items_template.append($bought_node);

        $leftover_node.find(".product-name").text(title);
        $leftover_node.find(".count-label").text(quantity);
        $bought_node.find(".product-name").text(title);
        $bought_node.find(".count-label").text(quantity);

        $bought_node.hide();

        $node.find(".bl-delete").click(function(){
            $node.hide();
            $bought_node.hide();
            $leftover_node.hide();
        });


        var prod = $node.find(".bl-title");
        var newName = $node.find(".edit");
        prod.click(function(){
            newName.val(prod.text());
            prod.hide();
            newName.show();
            newName.focus();
            // $node.find(".edit").val(title);
        });
        newName.focusout(function(){
            prod.text(newName.val());
            newName.hide();
            prod.show();
        });

        $node.find(".bl-bought").click(function () {
            $leftover_node.hide();
            $node.find('.bl-delete').hide();
            $node.find('.bl-minus').hide();
            $node.find('.bl-plus').hide();
            $node.find('.bl-bought').hide();
            $node.find('.bl-unbought').show();
            $node.find('.bl-title').addClass("linethrough");
            $bought_node.show();
            $leftover_node.hide();
            $bought_node.find(".product-name").addClass("linethrough");
            $bought_node.find(".count-label").addClass("linethrough");
        });



        $node.find(".bl-unbought").click(function () {
            $node.removeClass("is-bought");
            $node.find('.bl-delete').show();
            $node.find('.bl-minus').show();
            $node.find('.bl-plus').show();
            $node.find('.bl-unbought').hide();

            $node.find('.bl-bought').show();
            $leftover_node.show();
            // $bought_node.hide();
            $node.find('.bl-title').removeClass("linethrough");
            $bought_node.hide();
            $leftover_node.show();
        });


    }

    addItem("Печиво");
    addItem("Цибуля");
    addItem("Яблука");

    //adding new rows
    var $new_input = $(".input");
    $(".primary-button").click(function(){
        var new_name = $new_input.val();
        if(new_name.trim()){
            addItem(new_name);
            $new_input.val("");
            $new_input.focus();
        }
    });


    $(".input").keypress(function (enter){
        if (enter.which ==13){
            var new_name = $new_input.val();
            if(new_name.trim()){
                addItem(new_name);
                $new_input.val("");
                $new_input.focus();
            }
        }
    });



});





