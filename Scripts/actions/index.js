﻿import * as config from '../constants/Config';


function getAntiForgeryToken() {
    var inputsToken = document.getElementsByName("__RequestVerificationToken");
    return inputsToken[0].value;;
}

//Viene usato solo per avere tutti glia argomenti
export const getArgomentiByCategoria = (dispatch, categoriaSel = {}) => {
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/argomenti-by-categoria', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('__RequestVerificationToken', getAntiForgeryToken());
    let data = "";

    if (categoriaSel !== undefined && categoriaSel !== config.categoriaAllObject) {
        /*data = new FormData();
        data.append("Author", commento.autore);
        data.append("Text", commento.testo);*/
        data = JSON.stringify(categoriaSel);
    }

    xhr.onload = function (e) {
        let data = JSON.parse(xhr.responseText);
        if (data.errore === undefined) {
            dispatch({
                type: "GET_ALL_ARGOMENTI_SUCCESS",
                listaArgomenti: data
            });
        }
       
    }

    xhr.send(data);
}

export const getAllCategorie = (dispatch) => {
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/categorie', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('__RequestVerificationToken', getAntiForgeryToken());
    xhr.onload = function (e) {        
        let data = JSON.parse(xhr.responseText);
        if (data.errore === undefined) {
            dispatch({
                type: "GET_ALL_CATEGORIE_SUCCESS",
                listaCategorie: data
            });
        }
        getArgomentiByCategoria(dispatch, config.categoriaAllObject);       
    }
    xhr.send();
}

export const cancellaCategoria = (categoria = {}, dispatch) => {
    let xhr = new XMLHttpRequest();
    xhr.open('post', '/cancella-categoria', true);
    //xhr.open('post', '/cancella-categoria', true, null, null);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('__RequestVerificationToken', getAntiForgeryToken());
    let data = "";

    if (categoria !== undefined && categoria !== config.categoriaAllObject) {
        data = JSON.stringify(categoria);
    }

    xhr.onload = function (e) {
        let response = JSON.parse(xhr.responseText);
        if (response.errore === undefined) {
            getAllCategorie(dispatch);
        }
        
    }
    //}.bind(this);
    xhr.send(data);
}

export const aggiungiCategoria = (nomeCategoria = "", tipoProcessoSuccessivo = "", dispatch) => {

    if (nomeCategoria !== undefined && nomeCategoria === "") {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('post', '/aggiungi-categoria', true);  
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('__RequestVerificationToken', getAntiForgeryToken());
    let data = "";

    data = JSON.stringify({ 'nomeCategoria': nomeCategoria });
    
    xhr.onload = function (e) {
      
            //Aggiorna la lista delle categorie
            getAllCategorie(dispatch)

            let oggettoCategoriaCreato = JSON.parse(xhr.responseText);
            dispatch({
                type: "CONTINUA_PROCESSO",
                tipoAvanzamento: tipoProcessoSuccessivo,
                oggettoCategoria: oggettoCategoriaCreato
            });
        
    }
    //}.bind(this);
    xhr.send(data);
}

export const aggiungiArgomento = (titoloArgomento = "", idCategoriaCollegata = "", tipoProcessoSuccessivo = "", dispatch) => {
    if (titoloArgomento === "" || idCategoriaCollegata === "") {
        return;
    }

    let xhr = new XMLHttpRequest();
    xhr.open('post', '/aggiungi-argomento', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('__RequestVerificationToken', getAntiForgeryToken());
    let data = "";

    data = JSON.stringify({
        'titoloArgomento': titoloArgomento,
        'idCategoria': idCategoriaCollegata
    });

    xhr.onload = function (e) {

            //Aggiorna la lista delle categorie e argomenti
            getAllCategorie(dispatch)
        
            dispatch({
                type: "CONTINUA_PROCESSO",
                tipoAvanzamento: tipoProcessoSuccessivo,
                oggettoCategoria: null
            });
        
    }

    xhr.send(data);
}

export const toogleDialog = (dispatch) => {
    dispatch({
        type: "TOGGLE_DIALOG"
    });
}

export const avanzaProcessoAdd = (dispatch, tipoAvanzamento = "", oggettoCategoria = {}) => {
    dispatch({
        type: "CONTINUA_PROCESSO",
        tipoAvanzamento: tipoAvanzamento,
        oggettoCategoria: oggettoCategoria
    });
}

export const precedenteProcessoAdd = (store) => {

    let listaStati = store.getState().processoAdd;

    if (listaStati.length === 0) {
        //Chiudo il dialog se non ci sono processi precedenti nella lista
        toogleDialog(store.dispatch);
    } else {
        store.dispatch({
            type: "PRECENDENTE_PROCESSO"
        });
    }

   
}
