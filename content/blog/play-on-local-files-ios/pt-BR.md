---
title: "Próxima atualização: música local, Reproduzir em e controles mais claros"
excerpt: "Conheça as melhorias em arquivos locais, a escolha de AirPlay no iPhone, o botão dedicado à fila e os controles do sistema."
date: "2026-10-02"
author: "Equipe PPPlayer"
category: "Guides"
readTime: "4"
isDraft: false
---

A próxima atualização do PPPlayer melhora a reprodução dos seus arquivos, a escolha do dispositivo e o acesso à fila. Estas mudanças estão em desenvolvimento. Elas ainda não fazem parte de uma nova versão pública, e o app para iOS ainda não está disponível ao público.

## Suas músicas importadas continuam disponíveis

Na versão de desenvolvimento para iOS, as músicas importadas são copiadas para a biblioteca local do app. Você pode fechar e reabrir o app e ouvir a música em **Música local**, sem depender de um arquivo temporário da importação.

Se uma importação antiga aponta para um arquivo temporário que já desapareceu, importe o arquivo original novamente. A atualização não recupera arquivos apagados. Excluir o app e seus dados também remove os arquivos guardados nele; mantenha suas cópias originais.

As músicas locais também usam sua própria capa ou a imagem padrão de áudio, sem exibir a miniatura de um vídeo reproduzido antes.

## Escolha um dispositivo em Reproduzir em

Inicie uma música e abra **Reproduzir em** no player. Na versão de desenvolvimento para iOS, escolha **AirPlay** e selecione um receptor no seletor da Apple. O nome do receptor selecionado aparece em Reproduzir em, indicando onde o áudio está tocando.

A reprodução de música local de um iPhone físico para um MacBook via AirPlay foi testada. Se o receptor estiver selecionado, mas não houver som, confira o volume nos dois dispositivos e se o receptor está disponível para AirPlay.

Para voltar ao iPhone, toque em **Este dispositivo** e selecione o iPhone no seletor de AirPlay da Apple. O indicador acompanha a rota ativa; tocá-lo abre o seletor do sistema, em vez de desconectar o receptor diretamente.

### AirPlay, Cast e DLNA têm requisitos diferentes

- **AirPlay:** usa o seletor de áudio do sistema no iPhone. O novo seletor dentro do app é para iOS; no macOS, a rota de áudio continua sendo escolhida pelos controles do sistema.
- **Google Cast:** implementado para Android e iOS. O acesso aos arquivos locais e a transferência têm testes automatizados com um receptor simulado; os testes com um Chromecast físico ainda estão pendentes. O caminho de transferência por URL de mídia não aceita a reprodução do YouTube.
- **DLNA/UPnP:** exige um receptor acessível na rede local e um formato que ele consiga reproduzir. No iOS, a descoberta também exige aprovação de multicast da Apple e uma configuração de compilação habilitada. A validação com um receptor DLNA físico ainda está pendente.

Com Cast e DLNA, o receptor lê uma URL HTTP temporária fornecida pelo app. Mantenha o app e o receptor em uma rede acessível. O PPPlayer não converte o formato do arquivo. Um receptor offline ou inacessível não consegue lê-lo. O AirPlay usa a rota de áudio da Apple, sem esse servidor HTTP.

## Encontre a fila facilmente

O player de vídeo agora tem um botão dedicado à **Fila**, junto dos controles principais. Abra-o para ver e gerenciar as próximas faixas, mantendo o player de vídeo montado.

Em telas menores, reprodução, pausa e navegação entre faixas ficam em destaque. Ações adicionais, como reprodução aleatória, repetição, reprodução automática, legendas, seleção de áudio e ajuste do vídeo, ficam em um menu de opções quando disponíveis. O layout também se adapta à orientação horizontal e a textos maiores.

## Pause pelos controles do iPhone

Na versão atualizada para iOS, os comandos da tela bloqueada e da Central de Controle usam a mesma intenção de reprodução dos controles do app. Uma pausa intencional cancela a recuperação automática, evitando que a música recomece sozinha.

O comportamento foi verificado em um iPhone físico: o comando chegou ao player, a reprodução permaneceu pausada e só voltou após um comando explícito para reproduzir. A recuperação de pausas causadas pela passagem para segundo plano continua disponível.

## Disponibilidade

Confira a [página de downloads](/pt-BR/download) para as versões disponíveis e o [histórico de alterações](/pt-BR/changelog) para os lançamentos. Estas melhorias continuam marcadas como futuras até que sejam incluídas em uma versão publicada. Este guia não anuncia disponibilidade na App Store ou no TestFlight.
