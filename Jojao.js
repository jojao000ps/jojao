deixe loadedPlugins = [];

console.limpar();
const noop = () => {};
console.warn = console.error = janela.debug = noop;

const splashScreen = document.createElement('splashScreen');

classe EventEmitter {
  construtor() { this.events = {}; }
  em(t, e) {
    (Array.isArray(t) ? t : [t]).forEach(t => {
      (este.eventos[t] = este.eventos[t] || []).push(e);
    });
  }
  desligado(t, e) {
    (Array.isArray(t) ? t : [t]).forEach(t => {
      isto.eventos[t] && (isto.eventos[t] = isto.eventos[t].filtro(h => h !== e));
    });
  }
  emitir(t, ...e) {
    isto.eventos[t]?.paraCada(h => h(...e));
  }
  uma vez(t, e) {
    const s = (...i) => {
      e(...i);
      isto.off(t, s);
    };
    isto.em(t, s);
  }
}

const plppdo = novo EventEmitter();

// Observer implementado
novo MutationObserver(mutationsList =>
  mutationsList.some(m => m.type === 'childList') && plppdo.emit('domChanged')
).observe(document.body, { childList: true, subtree: true });

// Funções helpers
const delay = ms => nova Promessa(resolver => definirTimeout(resolver, ms));
const findAndClickBySelector = seletor => document.querySelector(seletor)?.click();

função sendToast(texto, duração = 5000, gravidade = 'fundo') {
  Toastify({
    texto,
    duração,
    gravidade,
    posição: "centro",
    stopOnFocus: verdadeiro,
    estilo: { fundo: "#000000" }
  }).showToast();
}

função assíncrona showSplashScreen() {
  splashScreen.style.cssText = "posição:fixo;topo:0;esquerda:0;largura:100%;altura:100%;cor de fundo:#000;exibição:flexível;alinhar-itens:centro;justificar-conteúdo:centro;índice z:9999;opacidade:0;transição:opacidade 0,5 s facilidade;seleção do usuário:nenhum;cor:branco;família da fonte:MuseoSans,sans-serif;tamanho da fonte:30px;alinhamento do texto:centro;";
  splashScreen.innerHTML = '<span style="color:white;">KHAN</span><span style="color:#72ff72;">DESTRUIDOR</span>';
  documento.corpo.appendChild(tela inicial);
  setTimeout(() => splashScreen.style.opacity = '1', 10);
}

função assíncrona hideSplashScreen() {
  splashScreen.style.opacidade = '0';
  setTimeout(() => splashScreen.remove(), 1000);
}

função assíncrona loadScript(url, rótulo) {
  const resposta = await fetch(url);
  const script = aguardar resposta.texto();
  loadedPlugins.push(rótulo);
  avaliação(script);
}

função assíncrona loadCss(url) {
  retornar nova Promessa(resolver => {
    const link = document.createElement('link');
    link.rel = 'folha de estilo';
    link.tipo = 'texto/css';
    link.href = url;
    link.onload = resolver;
    documento.cabeçalho.appendChild(link);
  });
}

função setupMain() {

  const originalFetch = janela.fetch;
  
  window.fetch = função assíncrona (entrada, inicialização) {

    deixe o corpo;
    se (instância de entrada da solicitação) {
      corpo = aguardar entrada.clone().texto();
    } senão se (init?.corpo) {
      corpo = init.corpo;
    }


    se (corpo?.includes('"operationName":"updateUserVideoProgress"')) {
      tentar {
        deixe bodyObj = JSON.parse(corpo);
        se (bodyObj.variáveis?.entrada) {
          const duraçãoSegundos = bodyObj.variáveis.input.duraçãoSegundos;
          bodyObj.variables.input.secondsWatched = duraçãoSegundos;
          bodyObj.variables.input.lastSecondWatched = duraçãoSegundos;
          corpo = JSON.stringify(bodyObj);
          
          se (instância de entrada da solicitação) {
            entrada = nova solicitação(entrada, { corpo });
          } outro {
            init.corpo = corpo;
          }
          
          sendToast("🔄｜Vídeo explorado.", 1000);
        }
      } pegar (e) {}
    }

   
    const originalResponse = await originalFetch.apply(this, argumentos);
    

    tentar {
      const clonadoResponse = originalResponse.clone();
      const responseBody = await clonedResponse.text();
      deixe responseObj = JSON.parse(responseBody);
      
      se (responseObj?.data?.assessmentItem?.item?.itemData) {
        deixe itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
        
        se (itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
          itemData.answerArea = {
            calculadora: falso,
            chi2Table: falso,
            tabela periódica: falso,
            tTable: falso,
            zTable: falso
          };
          
          itemData.question.content = " Desenvolvido por: ! Snow? " + `[[☃ radio 1]]`;
          itemData.question.widgets = {
            "rádio 1": {
              tipo: "rádio",
              opções: {
                escolhas: [{ content: "🤍", correto: verdadeiro }]
              }
            }
          };
          
          responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
          
          retornar nova resposta(JSON.stringify(responseObj), {
            status: originalResponse.status,
            statusText: originalResponse.statusText,
            cabeçalhos: originalResponse.headers
          });
        }
      }
    } pegar (e) {}
    
    retornar resposta original;
  };


  (assíncrono () => {
    seletores const = [
      `[data-testid="ícone-de-escolha__biblioteca-ícone-de-escolha"]`,
      `[data-testid="exercício-verificação-resposta"]`,
      `[data-testid="exercício-próxima-pergunta"]`,
      `._1udzurba`,
      `._awve9b`
    ];
    
    window.khanwareDominates = verdadeiro;
    
    enquanto (window.khanwareDominates) {
      para (const seletor de seletores) {
        findAndClickBySelector(seletor);
        
        const elemento = document.querySelector(`${selector}> div`);
        if (element?.innerText === "Mostrar resumo") {
          sendToast("🎉｜Exercício concluído!", 3000);
        }
      }
      aguardar atraso(1500);
    }
  })();
}

se (!/^https?:\/\/([a-z0-9-]+\.)?khanacademy\.org/.test(window.location.href)) { window.location.href = "https://pt.khanacademy.org/";
} outro {
  (função assíncrona init() {
    aguardar showSplashScreen();
    
    aguarde Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin').then(()=>{ DarkReader.setFetchMethod(window.fetch); DarkReader.enable(); }),
      loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css'),
      loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
    ]);
    
    aguardar atraso(2000);
    aguardar hideSplashScreen();
    
    configuraçãoMain();
    sendToast("🤍｜Khan Destroyer iniciado!");
    console.limpar();
  })();
    }
