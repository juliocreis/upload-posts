// Resgatando os elementos do DOM e armazenando nas variáveis 
const uploadBotao = document.getElementById('upload-btn'); // Botão de carregar imagem
const inputUpload = document.getElementById('image-upload'); // Input oculto que realiza o upload da imagem
const imagemPrincipal = document.querySelector('.main-image'); // Imagem que foi carregada
const imagemNome = document.querySelector('.container-image-nome p'); // Nome da imagem

uploadBotao.addEventListener('click', () => { // Quando o botão de carregar imagem for clicado, ele dispara um clique no input do arquivo que está oculto para abrir a janela de seleção do arquivo
    inputUpload.click();
});

// O uso da Promise neste caso é garantir que o código aguarde a leitura de forma eficiente sem bloquear a execução de outras operações
function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        if (!arquivo.type.startsWith('image/')) { // Se o tipo do arquivo não começar com 'image/'
            return reject('O arquivo selecionado não é uma imagem.'); // Rejeita o arquivo
        }

        const leitor = new FileReader(); // Cria um FileReader que é um leitor de arquivos. FileReader é um objeto JavaScript que permite ler o conteúdo do arquivo e convertê-lo para diferentes formatos

        leitor.onload = () => resolve({ url: leitor.result, nome: arquivo.name }); // Quando a leitura do arquivo termina com sucesso (onload), a Promise é resolvida e retorna a url (conteúdo do arquivo como uam URL Base64) e o nome do arquivo.
        leitor.onerror = () => reject(`Erro na leitura do arquivo ${arquivo.name}`); // Se houver erro na leitura do arquivo a Promise é rejeitada informando que houve um erro

        leitor.readAsDataURL(arquivo); // Lê o conteúdo do arquivo e o converte para uma URL no formato Base64, armazenando-a em leitor.result. O evento onload só será disparado após a execução deste comando.
    });
}

inputUpload.addEventListener('change', async (evento) => { // Quando um arquivo é selecionado pelo usuário, este evento assíncrono é acionado.
    const arquivo = evento.target.files[0]; // Armazena o primeiro arquivo que foi feito upload

    if (arquivo) { // Se o arquivo existir 
        try { // Tentar
            const conteudoArquivo = await lerConteudoDoArquivo(arquivo); // Esperar realizar a leitura do conteúdo do arquivo com await e armazenar o resultado da leitura na constante conteudoArquivo
            imagemPrincipal.src = conteudoArquivo.url; // O Source da imagem que irá aparecer será a url da leitura do arquivo. Esta url só será possível ser lida devido ao comando readAsDataURL que converte a URL para o formato Base64
            imagemNome.textContent = conteudoArquivo.nome; // Nome da imagem que irá aparecer abaixo dela na página
        } catch (erro) { // Caso haja algum erro no arquivo
            console.error('Houve erro ao carregar o arquivo:', erro); // Mensagem de erro
        }
    }
});


// Armazenam os elementos das tags
const inputTags = document.getElementById('categoria'); 
const listaTags = document.querySelector('.lista-tags');
const tagsDisponiveis = ['Front-end', 'Programação', 'Back-end', 'Full-Stack', 'DevOps', 'UX-UI', 'Data Science', 'IA']; // Simula um banco de dados contendo as tags disponíveis para serem adicionadas

listaTags.addEventListener('click', (evento) => { // Adiciona um evento de clique na lista das tags
    if(evento.target.classList.contains('remove-tag')) { // Verifica a lista de classes do elemento exato que foi clicado se há a classe remove-tag
        const tagParaRemover = evento.target.parentElement; // Armazena a tag que irá ser removida (a tag filha da lista de classes)
        listaTags.removeChild(tagParaRemover); // Remove o item da lista
    }
});

/* Simulando requisição assíncrona */


async function verificarTagDisponivel(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto)); // Simula um tempo de espera antes de verificar se a tag existe na lista de tags disponíveis
        }, 1000);
    });
}

inputTags.addEventListener('keypress', async (evento) => { // Evento para quando as tags forem adicionadas pressionando uma tecla
    if(evento.key === 'Enter') {
        evento.preventDefault()
        const tagTexto = inputTags.value.trim(); 
        if (tagTexto !== '') { 
            try {
                const tagExiste = await verificarTagDisponivel(tagTexto);
                if(tagExiste) {
                    const tagNova = document.createElement('li'); 
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag">`; 
                    listaTags.appendChild(tagNova);
                    inputTags.value = '';
                } else {
                    alert('A tag não foi encontrada');
                }
            } catch(error) {
                console.error('Erro ao verificar a existência da tag');
                alert('Erro ao verificar a existência da tag. Verifique o console');
            }
            
        } else {
            alert('Tag inválida!');
        }
    }
});

const botaoPublicar = document.querySelector('.botao-publicar');

async function envioFormulario(nomeProjeto, descricaoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.5;

            if(deuCerto) {
                resolve('Envio do formulário realizado com sucesso');
            } else {
                reject('Falha no envio do formulário');
            }
        }, 2000);
    })
}

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const nomeProjeto = document.getElementById('nome').value;
    const descricaoProjeto = document.getElementById('descricao').value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent);

    try {
        const mensagem = await envioFormulario(nomeProjeto, descricaoProjeto, tagsProjeto);
        console.log(mensagem);
        alert(mensagem);
    } catch (error) {
        console.log(error);
        alert(error);
    }
});

const botaoDescartar = document.querySelector('.botao-descartar');

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector('form');
    formulario.reset();

    imagemPrincipal.src = './img/image-icon.png';
    imagemNome.textContent = 'image.projeto.png';
    
    listaTags.innerHTML = '';
})

