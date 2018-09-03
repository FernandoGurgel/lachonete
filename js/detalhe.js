$(document).ready(function(){
    $.getJSON("js/produtos.json", function(data){
        var list1 = data.sanduiche;
        var list2 = data.batata;
        var list3 = data.bebidas;
        apresentaDetalhe(list1,list2,list3);
    });
})

function apresentaDetalhe(sanduiches,batatas,bebidas){
    //alert("dtealhes");
    var cod = (document.URL).substring((document.URL).indexOf("id=")+3,(document.URL).indexOf("cat="));
    var categoria = (document.URL).substring((document.URL).indexOf("cat=")+4);
    var item = retornaItem(sanduiches,batatas,bebidas,categoria,cod);
    var display = $("#detalhe-produto").html(
        '<div class="row">'+
        '<div class="card">'+
                '<div class="container-fliud">'+
                    '<div class="wrapper row">'+
                        '<div class="preview col-md-6">'+
                            '<div align="center">'+
                            '<div class="tab-pane active" id="p-img"><img src="'+item.img+'" /></div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="col-md-6">'+
                            '<h3 id=titulo>'+item.titulo+'</h3>'+
                            
                            '<p id ="descricao" >Descricao descricao Descricao descricao Descricao descricao Descricao descricao Descricao descricao Descricao descricao Descricao descricao</p>'+

                            '<h4 id="preco">Preço: R$<span id="valor"> '+item.valor+'</span></h4>'+
                            '<br>  '+

                            '<div class="row">'+
                                '<div size="50" class="btn-group col-lg-3 cont">'+
                                    '<button class="btn btn-contol" id="'+item.cod+'">-</button>'+

                                    '<input class="form-control" type="number"   pattern="[0-100]" value="0" name="txtQtd'+item.cod+'" size="10" disabled>'+

                                    '<button class="btn btn-contol" id="'+item.cod+'">+</button>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>        '+
            '</div>        '+
    '</div>'+
    '<div class="row justify-content-between" id="button-detalhes">'+
        '<a href="index.html">            '+
            '<button type="button" class="btn btn-outline-warning">Voltar</button>'+
        '</a>'+
        '<button type="button" class="btn btn-outline-success comprar" id="'+item.cod+'">Adicionar</button>'+
    '</div>'
    );
}

function retornaItem(sanduiches,batatas,bebidas,categoria,cod){
    var lista = [];
    var item;
    if (categoria == "sanduiches"){
        lista = sanduiches;
    }else if (categoria == "batatas") {
        lista = batatas;
    }else if (categoria == "bebidas"){
        lista = bebidas;
    }

    for (x in lista){
        if(lista[x].cod == cod)
            item = lista[x]
    }

    return item;
}