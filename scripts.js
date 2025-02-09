const uploadBotao = document.getElementById('upload-btn');
const inputUpload = document.getElementById('image-upload');
const imagemPrincipal = document.querySelector('.main-image');
const imagemNome = document.querySelector('.container-image-nome p'); // Corrigido

uploadBotao.addEventListener('click', () => {
    inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        if (!arquivo.type.startsWith('image/')) {
            return reject('O arquivo selecionado não é uma imagem.');
        }

        const leitor = new FileReader();

        leitor.onload = () => resolve({ url: leitor.result, nome: arquivo.name });
        leitor.onerror = () => reject(`Erro na leitura do arquivo ${arquivo.name}`);

        leitor.readAsDataURL(arquivo);
    });
}

inputUpload.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoArquivo.url;
            imagemNome.textContent = conteudoArquivo.nome;
        } catch (erro) {
            console.error('Houve erro ao carregar o arquivo:', erro);
        }
    }
});
