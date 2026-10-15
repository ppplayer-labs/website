---
title: "Status do PPPlayer: versão publicada 3.0.2 e candidato 4.0.0"
excerpt: "O que já foi publicado, o que está implementado no próximo candidato e quais validações continuam pendentes."
date: "2026-10-15"
author: "Equipe PPPlayer"
category: "Atualizações"
readTime: "3"
isDraft: false
---

A versão 4.0.0 é a publicação mais recente do aplicativo no GitHub, de 15 de outubro de 2026. Consulte o [histórico e os arquivos publicados](https://github.com/ppplayer-labs/app/releases).

**O PPPlayer 4.0.0 foi lançado oficialmente.** Metadados do build: Aplicativo `4.0.0+12`, Windows MSIX `4.0.0.0`, Publicador: `Devflier`. Todas as versões de plataforma (macOS, Windows, Android e Linux) foram validadas e publicadas.

## Implementado no candidato

- Reprodução do YouTube por Chromium no Android, macOS, Windows e Linux. O iOS continua com WebKit; arquivos locais e streams diretos usam MediaKit.
- Fila redesenhada com painel no desktop e folha no celular, navegação independente da tela cheia, largura ajustável e preferência salva.
- Leitura ampliada de playlists M3U, PLS, XSPF e ASX, detecção de HLS, grupos e cabeçalhos HTTP de IPTV, links relativos, remoção de duplicatas e limites de tamanho e tempo.
- Consultas da biblioteca local, acesso a arquivos, metadados e análise de vídeo; recuperação e troca de fontes; correções de redimensionamento de vídeo e permissões de importação no macOS.
- Scripts de empacotamento Linux e mais testes e ferramentas de validação. Scripts não comprovam suporte Linux distribuído.

## Compatibilidade do candidato

| Plataforma | Configuração e limites |
| --- | --- |
| macOS | 13+, compatível com Apple Silicon e Intel. A versão 3.0.2 tinha alvo mínimo 12. |
| Android | ARM64 e x86_64, sem ARM de 32 bits. API 24 no manifesto registrado; confirmar nos arquivos finais. |
| iOS | 15+, iPhone/iPad. Sem disponibilidade pública verificada na App Store. |
| Windows | Alvo Windows 10+ x64; validação final de execução e instalação pendente. |
| Linux | Empacotamento x86_64 experimental; instalação e reprodução pendentes. A publicação 3.0.2 não contém arquivo Linux. |

O painel de requisitos descreve os requisitos de sistema (4 GB de RAM recomendados para Desktop, 2 GB de RAM recomendados para dispositivos móveis). Os downloads existentes têm compatibilidade específica de cada versão.

## Limitações conhecidas

A reprodução do YouTube no Android trava após Home/apagar a tela na validação em emulador. Isso será entregue como limitação conhecida e não corrigida (causa não determinada; a política do YouTube também proíbe reprodução oculta). Não conte com reprodução do YouTube em segundo plano no Android. Testes em ARM64 físico, PiP, interrupções de áudio, controles de notificação e pausas longas continuam pendentes.

A assinatura de produção, a notarização da Apple, o pacote MSIX para Windows e os pacotes AppImage/Debian para Linux foram concluídos e aprovados nos testes automatizados de lançamento.

O PPPlayer 4.0.0 está disponível para download imediato no [GitHub Releases do PPPlayer](https://github.com/ppplayer-labs/app/releases) e nas respectivas lojas de aplicativos.
