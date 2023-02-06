sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("googleimagens.controller.Inicial", {
            //Função para iniciar quando carregar a pagina INICIALIZATION do ABAP
            onInit: function () {
                ////Aula 1
                ////objeto = equivale a uma classe/estrutura no abap
                /*this.produto = {
                    nome: "margarina",
                    marca: "doriana",
                    peso: 500,
                    uom: 'G',
                    estoque: 12,
                    adicionarEstoque: function (){
                        this.estoque++;
                        return this.estoque + ' Unidades em estoque';
                    }
                }
                */

                ////Aula 2
                let ImageList = {
                    Imagens : [
                        /* AULA 2
                        {
                            url: "https://www.iuf.org/wp-content/uploads/2020/09/Coca-Cola-Header.jpg",
                            thumbnail:"https://rapidapi.usearch.com/api/thumbnail/get?value=1574528931575308325",
                            title:"Coca-Cola - IUF",
                            provider: {
                                name:"iuf"
                            }
                        },
                        {
                            url: "http://cdn.shopify.com/s/files/1/0265/3893/4330/products/coca-cola-110591_1200x1200.jpg?v=1590528264",
                            thumbnail:"https://rapidapi.usearch.com/api/thumbnail/get?value=158279291306047240",
                            title:"Coca-cola White Lily Diner",
                            provider: {
                                name:"shopify"
                            }
                        },
                        {
                            url: "http://cdn.shopify.com/s/files/1/0309/8755/0851/products/CocaCola_1200x1200.jpg?v=1585705641",
                            thumbnail:"https://rapidapi.usearch.com/api/thumbnail/get?value=549732196490595880",
                            title:"Coca Cola Mary's Mountain Cookies in Omaha",
                            provider: {
                                name:"shopify"
                            }
                        }
                        */                    
                    ]
                };

                //CRIAÇÃO DO MODELO PARA EXIBIR DADOS NA TELA
                let ImageModel = new JSONModel(ImageList);
                let view = this.getView();
                view.setModel(ImageModel, "ModeloImagem");

            },
            onPressBuscar: function () {
                //AULA 1 e Aula 3 Exemplo pegando dados do input
                let inputBusca = this.byId("inpBusca");
                let query = inputBusca.getValue();
                //alert(query);

                const settings = {
                    "async": true,
                    "crossDomain": true,
                    //concatenate
                    "url": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q="
                    + query 
                    + "&pageNumber=1&pageSize=10&autoCorrect=true",
                    "method": "GET",
                    "headers": {
                        "X-RapidAPI-Key": "8ac08da20amsh3fd0309022d33abp10a47bjsnaed7b32b00d0",
                        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    }
                };
                
                // Parenteses serve para passar parametros
                $.ajax(settings).done(function (response) {
                    console.log(response);

                    //Instanciar o modelo
                    let oImageModel = this.getView().getModel("ModeloImagem");
                    let oDadosImage = oImageModel.getData();

                    //Clear tabela interna = array
                    oDadosImage.Imagens = [];

                    //Loop que adiciona dados de uma tabela em outra tabela
                    let listaResultados = response.value;
                    let newItem;

                    //vamos ao loop
                    for (var i=0; i < listaResultados.length; i++){
                        //read table pelo indice
                        newItem = listaResultados[i];
                        //append dos dados na nova tabela
                        oDadosImage.Imagens.push(newItem);
                    }

                    oImageModel.refresh();


                }.bind(this)
                );

                
                ////AULA 1 Exemplo
                ////alert("Nasceu");
                
                ////Variaveis
                //var material = "Coca Cola";
                //var unidades = 10;
                //var peso = 1.5;

                ////Lista = Tabela Interna Abap
                //let listaCompras = ["pao","leite","banana","maça"];

                //var total = this.produto.adicionarEstoque();
                //alert(total);
            }
        });
    });
