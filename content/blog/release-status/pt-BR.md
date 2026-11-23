---
title: "Status de Lançamento do PPPlayer 4.0.2"
excerpt: "O PPPlayer 4.0.2 está disponível no GitHub Releases com recuperação do mini-vídeo no desktop, rolagem da Home mais fluida, correções de SAF/ciclo de vida no Android e build sem anúncios."
date: "2026-11-23"
author: "Equipe PPPlayer"
category: "Atualizações"
readTime: "3"
isDraft: false
---

O PPPlayer 4.0.2 é a publicação mais recente do aplicativo no GitHub, lançada em 23 de novembro de 2026. Consulte o [GitHub Release v4.0.2](https://github.com/ppplayer-labs/app/releases/tag/v4.0.2) como fonte pública oficial de downloads.

**O PPPlayer 4.0.2 foi publicado oficialmente no GitHub Releases.** Metadados do build: Aplicativo `4.0.2+14`, Windows MSIX `4.0.2.0` (pacote de envio para a Microsoft Store), Publicador: `Devflier`. Esta versão é distribuída **temporariamente sem anúncios** (SDK Google Mobile Ads, fluxo UMP e permissão de Advertising ID removidos).

## Novidades na versão 4.0.2

- **Recuperação do mini-vídeo no desktop e persistência de configurações:** Corrigida a tela preta intermitente no mini-vídeo após alternar rapidamente Mostrar/Ocultar, eliminando rajadas de redimensionamento do Chromium/CEF (superfície constante em `160×90`, estacionamento fora da tela no desktop e exclusão de ponteiro/acessibilidade quando oculto) e serializando gravações no Hive.
- **Rolagem da Home mais fluida e cache de capas Retina:** Eliminados shimmers repetidos de seção e animações repetidas de entrada, preservadas as posições de rolagem vertical e horizontal entre navegações, adicionado agrupamento compartilhado de largura de decodificação e cache desktop limitado de `80 MB / 300 entradas`, melhorada a resiliência offline com stale-while-revalidate e corrigida a leitura de URLs de capa do Spotify e fallbacks de capa ausente.
- **Chromium `0.5.7` e ciclo de vida no desktop:** Atualizado para `flutter_chromium_webview ^0.5.7`, com restauração preguiçosa na inicialização, controle de taxa de renderização inativa (`setRenderingActive`), sessões persistentes do Chromium e encerramento ordenado (`AppShutdownCoordinator`).
- **Correções no Android:** Corrigidas falhas no desacoplamento da Activity durante reprodução no Chromium, restaurada a importação de pastas via Storage Access Framework (SAF) para músicas e vídeos, alinhado `minSdk` para API 24 e reforçadas regras R8 e compatibilidade com Picture-in-Picture.
- **Empacotamento Linux:** Metadados desktop, AppStream e ícone incluídos no tarball portátil `x86_64`, perfil AppArmor `userns` no pacote `.deb` e somas de verificação reforçadas.

## Compatibilidade e distribuição

| Plataforma | Alvo e disponibilidade |
| --- | --- |
| macOS | macOS 13.0+, **somente Apple Silicon (`arm64`)** (DMG/ZIP assinado, notarizado e grampeado no GitHub Releases). Builds Intel/universais não são qualificados. |
| Windows | Windows 10+ `x64`, distribuído pela **Microsoft Store** (o pacote MSIX do Partner Center não é oferecido como instalador direto no GitHub). |
| Linux | AppImage `x86_64`, `.deb` e `.tar.gz` portátil disponíveis no GitHub Releases. Snap Store e Flathub seguem trilhas independentes (envio ao Flathub em revisão). |
| Android | Android 7.0 (API 24)+, `ARM64` e `x86_64` (APK assinado e sem anúncios disponível no GitHub Releases; atualização na Google Play tratada separadamente). |
| iOS | iOS 15.0+, iPhone/iPad (em desenvolvimento; ainda sem publicação pública na App Store). |

## Limitações conhecidas

A reprodução do YouTube em segundo plano no Android continua não suportada nesta versão. Baixe o PPPlayer 4.0.2 no [GitHub Release v4.0.2](https://github.com/ppplayer-labs/app/releases/tag/v4.0.2) ou na Microsoft Store para Windows.
