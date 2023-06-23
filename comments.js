const form = document.querySelector("form#formulario");
const inputName = document.querySelector("input#caixa-nome");
const textComment = document.querySelector("textarea#espaco-comentario");
const commentPost = document.querySelector("div#comm");

//array para salvar os comentarios começa vazia
let comentarios = [];
//recupera os dados dos comentarios em forma de string
let datastring = localStorage.getItem("comm");
//se a string não for null, sobrescreve os comentários e preenche o array
if (datastring != null) {
    comentarios = JSON.parse(datastring);
}


function getTime() {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    let opts = { day: 'numeric', month : 'long', hour : '2-digit', minute : '2-digit'}


    let dateString = date.toLocaleDateString(Intl.LocalesArgument, opts);

    let time = `${dateString}`

    return time;
}

function postComment(nome, comentario, data) {

    //cria e define o elemento imagem
    let img = document.createElement('img');
    img.src = 'imagens/sem-foto.png';
    img.width = 30;
    img.height = 30;

    //cria o Nome
    let pNome = document.createElement('p');
    pNome.innerHTML = `<strong>${nome}</strong>`;

    //cria a Data
    let pData = document.createElement('p');
    pData.style.fontSize = 'x-small';
    pData.innerHTML = `${data}`;

    //cria a div header com o Nome e a Data
    let divHeader = document.createElement('div');
    divHeader.style.display = "flex";
    divHeader.style.flexFlow = "column";
    divHeader.appendChild(pNome);
    divHeader.appendChild(pData)

    //cria e define o elemento texto
    let p = document.createElement('p');
    p.innerHTML = `${comentario}`;

    //cria a div para o comentário
    let divP = document.createElement('div');
    divP.appendChild(p);

    //cria a div para o header e o comentário
    let divComm = document.createElement('div');
    divComm.style.display = "flex";
    divComm.style.flexFlow = "column";
    divComm.appendChild(divHeader);
    divComm.appendChild(divP)


    //cria uma div para colocar os dois elementos filhos
    let newDiv = document.createElement('div');
    newDiv.style.display = "flex"
    newDiv.style.flexFlow = "row"
    newDiv.appendChild(img);
    newDiv.appendChild(divComm);

    //cria uma div e posta a imagem e o comentário
    commentPost.appendChild(newDiv);

}

form.addEventListener('submit', (e) => {
    //previne a página de atualizar ao clicar no botão Comentar
    e.preventDefault();
    //se o nome estiver preenchido
    if (inputName.value.length != 0) {
        postComment(inputName.value, textComment.value, getTime());
        //inserir comentários no array
        comentarios.push({ nome: inputName.value, comentario: textComment.value, hora: getTime()})
        //transformando objeto em string e salvando no localStorage
        localStorage.setItem("comm", JSON.stringify(comentarios));
        //após postar, zera as caixas e volta o foco pro Nome
        inputName.value = '';
        textComment.value = '';
        inputName.focus();
    } else {
        window.alert("Favor inserir seu nome");
    }
}
)

//posta os comentarios recuperados da memória localStorage
for (let i = 0; i < comentarios.length; i++) {
    postComment(comentarios[i].nome, comentarios[i].comentario, comentarios[i].hora)
}



console.log(getTime());

