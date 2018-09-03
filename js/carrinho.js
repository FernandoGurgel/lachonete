var continuar;
var $formLogin = $('#login-form');
var $formLost = $('#lost-form');
var $formRegister = $('#register-form');
var $divForms = $('#div-forms');
var $modalAnimateTime = 300;
var $msgAnimateTime = 150;
var $msgShowTime = 2000;


$(document).ready(function(){
    $("#login-modal").load("modal.html");
    $("#menu-lanche").load("menu.html");
    $("#carousel-lanche").load("caroseul.html");
    $("#contato").load("rodape.html");
    
    
    $(".card-food .comprar").click(function(){
        addCarrinho($(this).attr('id'));
    });
    
    $(".cont > .btn-contol").click(function(){
        displayCont($(this))
    });
    
    notificacao();
    
    getLista();

    $("form").submit(function () {
        switch(this.id) {
            case "login-form":
                var $lg_username=$('#login_username').val();
                var $lg_password=$('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                return false;
                break;
            case "lost-form":
                var $ls_email=$('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                var $rg_username=$('#register_username').val();
                var $rg_email=$('#register_email').val();
                var $rg_password=$('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
                return false;
                break;
            default:
                return false;
        }
        return false;
    });
    
    $('#login_register_btn').click(  modalAnimate($formLogin, $formRegister));
    $('#register_login_btn').click(  modalAnimate($formRegister, $formLogin));
    $('#login_lost_btn').click(  modalAnimate($formLogin, $formLost));
    $('#lost_login_btn').click(  modalAnimate($formLost, $formLogin));
    $('#lost_register_btn').click(  modalAnimate($formLost, $formRegister));
    $('#register_lost_btn').click(  modalAnimate($formRegister, $formLost));
    
    
});

function modalAnimate ($oldForm, $newForm) {
    var $oldH = $oldForm.height();
    var $newH = $newForm.height();
    $divForms.css("height",$oldH);
    $oldForm.fadeToggle($modalAnimateTime, function(){
        $divForms.animate({height: $newH}, $modalAnimateTime, function(){
            $newForm.fadeToggle($modalAnimateTime);
        });
    });
}

function msgFade ($msgId, $msgText) {
    $msgId.fadeOut($msgAnimateTime, function() {
        $(this).text($msgText).fadeIn($msgAnimateTime);
    });
}

function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
    var $msgOld = $divTag.text();
    msgFade($textTag, $msgText);
    $divTag.addClass($divClass);
    $iconTag.removeClass("glyphicon-chevron-right");
    $iconTag.addClass($iconClass + " " + $divClass);
    setTimeout(function() {
        msgFade($textTag, $msgOld);
        $divTag.removeClass($divClass);
        $iconTag.addClass("glyphicon-chevron-right");
        $iconTag.removeClass($iconClass + " " + $divClass);
      }, $msgShowTime);
}

$.getJSON("js/produtos.json", function(data){
    var list1 = data.sanduiche;
    var list2 = data.batata;
    var list3 = data.bebidas;
    apresentaProduto(list1,list2,list3);
});

function getLista(){
    var list = JSON.parse(window.sessionStorage.getItem("carrinho"));
    if (list == null){
        $('.cestaTable > tbody').html('<tr><td colspan="3" scope="col"> Sem Item</td></tr>');
    }
    for (x in list){
        $('.cestaTable > tbody:last-child').append('<tr id='+list[x].cod+'><td>'+
        list[x].cod+'</td><td><img class="imgsTabela" src="'+
        list[x].img+'"></td><td>'+
        list[x].titulo+'</td><td>'+
        list[x].valor+'</td><td><button class="btn btn-danger btn-sm btn-close" id='+list[x].cod+'><span class="oi oi-x"></span></button></tr>');
    }
}

function displayCont(ob){
    var id = ob.attr("id");
    var result = $('input[name*="txtQtd'+id+'"]');
    var cont = parseInt(result.val());

    if(ob.text() == "-" ){
        if(result.val() > 0 && result.val() != null )
            result.val(cont-1);
    }else{
        if(parseFloat(result.val()) < 100 || result.val() != null){
            result.val(cont+1);
        }
        else if(result.val() != null){
            alert("Valor muito superior")
        }
    }   
}

function apresentaProduto(sanduiche,bata,bebidas){

    var san = $("#sanduiche-card");
    var batata = $("#batataFrita-card");
    var bebida = $("#bebidas-card");
    var tag;

    for (x in sanduiche){
        san.append(
        '<div class="col-lg-4">'+
            '<div class="card card-food card'+sanduiche[x].cod+'">'+
                '<a href="detalhes.html?id='+sanduiche[x].cod+'cat=sanduiches">'+
                    '<img class="card-img-top"  src="'+sanduiche[x].img+'" alt="Card image cap">'+
                '</a>'+
                '<div class="card-body">'+
                    '<h5 class="card-title text-center">'+sanduiche[x].titulo+'</h5>'+
                    '<p class="card-text">R$ '+sanduiche[x].valor+'</p>'+
                        '<div class="row">'+
                            '<div class="btn-group col-lg-6 cont">'+
                                '<button class="btn btn-contol" id="'+sanduiche[x].cod+'">-</button>'+
                                '<input class="form-control" type="number" pattern="[0-100]" value="0" name="txtQtd'+sanduiche[x].cod+'" size="10" disabled>'+
                                '<button class="btn btn-contol" id="'+sanduiche[x].cod+'">+</button>'+
                            '</div>'+
                            '<div class="col-lg-6">'+
                                '<button type="button" class="btn btn-outline-success comprar" id="'+sanduiche[x].cod+'">Adicionar</button>'+
                            '</div>'+
                        '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
    }

    for (x in bata){
        batata.append(
        '<div class="col-lg-4">'+
            '<div class="card card-food card'+bata[x].cod+'">'+
                '<a href="detalhes.html?id='+bata[x].cod+'cat=batatas">'+
                    '<img class="card-img-top"  src="'+bata[x].img+'" alt="Card image cap">'+
                '</a>'+
                '<div class="card-body">'+
                    '<h5 class="card-title text-center">'+bata[x].titulo+'</h5>'+
                    '<p class="card-text">R$'+bata[x].valor+'</p>'+
                        '<div class="row">'+
                            '<div class="btn-group col-lg-6 cont">'+
                                '<button class="btn btn-contol" id="'+bata[x].cod+'">-</button>'+
                                '<input class="form-control" type="number" pattern="[0-100]" value="0" name="txtQtd'+bata[x].cod+'" size="10" disabled>'+
                                '<button class="btn btn-contol" id="'+bata[x].cod+'">+</button>'+
                            '</div>'+
                            '<div class="col-lg-6">'+
                                '<button type="button" class="btn btn-outline-success comprar" id="'+bata[x].cod+'">Adicionar</button>'+
                            '</div>'+
                        '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
    }

    for (x in bebidas){
        bebida.append(
        '<div class="col-lg-4">'+
            '<div class="card card-food card'+bebidas[x].cod+'">'+
                '<a href="detalhes.html?id='+bebidas[x].cod+'cat=bebidas">'+
                    '<img class="card-img-top"  src="'+bebidas[x].img+'" alt="Card image cap">'+
                '</a>'+
                '<div class="card-body">'+
                    '<h5 class="card-title text-center">'+bebidas[x].titulo+'</h5>'+
                    '<p class="card-text">R$'+bebidas[x].valor+'</p>'+
                        '<div class="row">'+
                            '<div class="btn-group col-lg-6 cont">'+
                                '<button class="btn btn-contol" id="'+bebidas[x].cod+'">-</button>'+
                                '<input class="form-control" type="number" pattern="[0-100]" value="0" name="txtQtd'+bebidas[x].cod+'" size="10" disabled>'+
                                '<button class="btn btn-contol" id="'+bebidas[x].cod+'">+</button>'+
                            '</div>'+
                            '<div class="col-lg-6">'+
                                '<button type="button" class="btn btn-outline-success comprar" id="'+bebidas[x].cod+'">Adicionar</button>'+
                            '</div>'+
                        '</div>'+
                '</div>'+
            '</div>'+
        '</div>');
    }
}

function addCarrinho(id){
    var lista = [];

    if ($('input[name*="txtQtd'+id+'"]').val() > 0){
        if(window.sessionStorage.getItem("carrinho") != null){
            lista = JSON.parse(window.sessionStorage.getItem("carrinho"));
        }
        lista = itemExistem(lista,id);
        if(continuar){
            var item = {
                cod : id,
                titulo:$(".card"+id+" .card-title").text(),
                quantidade: $('input[name*="txtQtd'+id+'"]').val(),
                valor: ($(".card"+id+" .card-text").text()).substring(3),
                img: $(".card"+id+" .card-img-top").attr('src')
            };
            lista.push(item);
            continuar = true;
        }
        window.sessionStorage.setItem("carrinho",JSON.stringify(lista));
        notificacao("Item adicionado com sucesso!",0);
    }else{
        notificacao("Quantidade inferior",1);
    }
}

function itemExistem(ob,cod){
    var cot = 0;
    for(x in ob){
        if(ob[x].cod == cod){
            ob[x].quantidade = $('input[name*="txtQtd'+cod+'"]').val();
            cot = 1;
        }
    }
    if(cot == 1){
        continuar = false;
    }else{
        continuar = true;
    }
    return ob;
}

function notificacao(msg,op){
    var x = $('#snackbar').text(msg);
    var cont = JSON.parse(window.sessionStorage.getItem("carrinho"));
    switch(op){
        case 0:{
            x.toggleClass("alert alert-success show");
            setTimeout(function(){ x.toggleClass("alert alert-success show"); }, 3000);
            break;
        }
        case 1:{
            x.toggleClass("alert alert-danger show");
            setTimeout(function(){ x.toggleClass("alert alert-danger show"); }, 3000);
            break;
        }
        case 2:{
            x.toggleClass("alert alert-warning show");
            setTimeout(function(){ x.toggleClass("alert alert-warning show"); }, 3000);
            break;
        }
    }
    if(cont != null){
        $('.badge').text(cont.length);
    }
}