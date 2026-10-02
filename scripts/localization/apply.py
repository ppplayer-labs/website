"""Apply explicit playback translations and shared app terminology to all locales."""
import csv
import json
from pathlib import Path

root = Path(__file__).resolve().parents[2]
rows = list(csv.DictReader((Path(__file__).parent / 'playback.tsv').open(), delimiter='\t'))
files = {p.stem: p for p in (root / 'messages').glob('*.json')}
assert len(rows) == len(files) and {r['locale'] for r in rows} == files.keys()
requirements = {r.pop('locale'): r for r in csv.DictReader((Path(__file__).parent / 'requirements.tsv').open(), delimiter='\t')}
for row in rows:
    locale = row.pop('locale')
    assert all(row.values())
    p = files[locale]
    data = json.loads(p.read_text())
    app = json.loads((root.parent / 'app/lib/l10n' / f"app_{'pt' if locale == 'pt-BR' else locale}.arb").read_text())
    data['playbackUpdates'] = {**row, 'localTitle': app['localMusicCard'], 'outputTitle': app['playOn'], 'queueTitle': app['queue'], 'pauseTitle': app['pause']}
    data['common'] = {'language': app['language'], 'menu': app['moreOptions'], 'home': app['home'], 'artist': app['artist'], 'radio': app['radioStations'], 'player': app['fullscreen']}
    data['downloadCTA']['reqs']['ios']['os'] = data['downloadCTA']['reqs']['ios']['os'].replace('13.0', '14.0')
    if locale in requirements:
        req = requirements[locale]
        for platform in ['macos', 'windows', 'linux', 'ios', 'android']:
            data['downloadCTA']['reqs'][platform]['os'] = req[platform]
            data['downloadCTA']['reqs'][platform]['mem'] = req['memory'].format(size=2 if platform in ['ios', 'android'] else 4)
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(f'Applied playback and accessibility translations to {len(files)} catalogs')
