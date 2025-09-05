const animaisData = [
    { nome: 'Rex', tipo: 'cão', brinquedos: ['RATO','BOLA'] },
    { nome: 'Mimi', tipo: 'gato', brinquedos: ['BOLA','LASER'] },
    { nome: 'Fofo', tipo: 'gato', brinquedos: ['BOLA','RATO','LASER'] },
    { nome: 'Zero', tipo: 'gato', brinquedos: ['RATO','BOLA'] },
    { nome: 'Bola', tipo: 'cão', brinquedos: ['CAIXA','NOVELO'] },
    { nome: 'Bebe', tipo: 'cão', brinquedos: ['LASER','RATO','BOLA'] },
    { nome: 'Loco', tipo: 'jabuti', brinquedos: ['SKATE','RATO'] }
];

class AbrigoAnimais {
    constructor() {
        this.animaisPorPessoa = { pessoa1: 0, pessoa2: 0 };
    }

    encontraPessoas(brinquedos1, brinquedos2, animaisStr) {
        try {
            const listaBrinquedos1 = this.validaBrinquedos(brinquedos1);
            const listaBrinquedos2 = this.validaBrinquedos(brinquedos2);
            const listaAnimais = this.validaAnimais(animaisStr);

            const resultado = [];

            for (const animalNome of listaAnimais) {
                const animal = animaisData.find(a => a.nome === animalNome);

                const podePessoa1 = this.verificaAdocao(animal, listaBrinquedos1);
                const podePessoa2 = this.verificaAdocao(animal, listaBrinquedos2);

                let dono = 'abrigo';

                if (podePessoa1 && !podePessoa2 && this.animaisPorPessoa.pessoa1 < 3) {
                    dono = 'pessoa 1';
                    this.animaisPorPessoa.pessoa1++;
                } else if (podePessoa2 && !podePessoa1 && this.animaisPorPessoa.pessoa2 < 3) {
                    dono = 'pessoa 2';
                    this.animaisPorPessoa.pessoa2++;
                }

                resultado.push(`${animal.nome} - ${dono}`);
            }

            resultado.sort();
            return { lista: resultado };

        } catch (erro) {
            return { erro: erro.message };
        }
    }

    validaBrinquedos(brinquedosStr) {
        if (!brinquedosStr) throw new Error('Brinquedo inválido');
        const brinquedos = brinquedosStr.split(',').map(b => b.trim().toUpperCase());

        const setBrinquedos = new Set(brinquedos);
        if (setBrinquedos.size !== brinquedos.length) throw new Error('Brinquedo inválido');

        const todosBrinquedos = new Set(animaisData.flatMap(a => a.brinquedos));
        for (const b of brinquedos) {
            if (!todosBrinquedos.has(b)) throw new Error('Brinquedo inválido');
        }

        return brinquedos;
    }

    validaAnimais(animaisStr) {
        if (!animaisStr) throw new Error('Animal inválido');
        const animais = animaisStr.split(',').map(a => a.trim());

        const setAnimais = new Set(animais);
        if (setAnimais.size !== animais.length) throw new Error('Animal inválido');

        const nomesAnimais = animaisData.map(a => a.nome);
        for (const a of animais) {
            if (!nomesAnimais.includes(a)) throw new Error('Animal inválido');
        }

        return animais;
    }

    verificaAdocao(animal, brinquedosPessoa) {
        const b = animal.brinquedos;

        if (animal.tipo === 'gato') {
            let idx = 0;
            for (const brinquedo of b) {
                idx = brinquedosPessoa.indexOf(brinquedo, idx);
                if (idx === -1) return false;
                idx++;
            }
            return true;
        } else if (animal.nome === 'Loco') {
            return true; 
        } else {
            let idx = -1;
            for (const brinquedo of b) {
                const novaIdx = brinquedosPessoa.indexOf(brinquedo, idx + 1);
                if (novaIdx === -1) return false;
                idx = novaIdx;
            }
            return true;
        }
    }
}


export { AbrigoAnimais as AbrigoAnimais };
