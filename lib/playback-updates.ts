// New editorial content follows the blog's English fallback until translated.
const en = {
  lang: 'en',
  badge: 'Upcoming update',
  title: 'Your library. More ways to play.',
  description: 'We’re improving local playback, device selection, and the controls you use every day.',
  items: [
    { title: 'Keep your local music close', description: 'Imported songs stay available after reopening the iOS app. Local audio uses its own artwork, without a leftover video thumbnail.' },
    { title: 'Choose where you listen', description: 'Open Play On to choose AirPlay on iPhone and see the active receiver. Cast and DLNA handle compatible media on supported platforms.' },
    { title: 'A queue you can find', description: 'A dedicated Queue button keeps what plays next within reach. The video player adapts to smaller screens, with extra controls grouped in a menu.' },
    { title: 'Pause means pause', description: 'iPhone lock-screen and Control Center commands reach the player, so a deliberate pause stays paused while background playback remains available.' },
  ],
  note: 'These changes are in development. iOS is not yet publicly available, and physical Chromecast testing is still pending.',
  guide: 'Read the playback guide',
  changelog: 'See what’s changing',
};

const pt = {
  lang: 'pt-BR',
  badge: 'Próxima atualização',
  title: 'Sua biblioteca. Mais formas de ouvir.',
  description: 'Estamos melhorando a reprodução local, a escolha de dispositivos e os controles que você usa todos os dias.',
  items: [
    { title: 'Sua música local, sempre por perto', description: 'As músicas importadas continuam disponíveis ao reabrir o app no iOS. O áudio local usa sua própria capa, sem a miniatura de um vídeo anterior.' },
    { title: 'Escolha onde ouvir', description: 'Abra Reproduzir em para escolher AirPlay no iPhone e ver o receptor ativo. Cast e DLNA reproduzem mídia compatível nas plataformas com suporte.' },
    { title: 'Uma fila fácil de encontrar', description: 'Um botão dedicado à fila facilita ver o que vem a seguir. O player de vídeo se adapta a telas menores e reúne os controles extras em um menu.' },
    { title: 'Pausar é pausar', description: 'Os comandos da tela bloqueada e da Central de Controle do iPhone chegam ao player. Uma pausa intencional é respeitada, mantendo a reprodução em segundo plano disponível.' },
  ],
  note: 'Estas mudanças estão em desenvolvimento. O app para iOS ainda não está disponível ao público, e os testes com um Chromecast físico estão pendentes.',
  guide: 'Leia o guia de reprodução',
  changelog: 'Veja o que está mudando',
};

export function getPlaybackUpdates(locale: string) {
  return locale === 'pt-BR' ? pt : en;
}
