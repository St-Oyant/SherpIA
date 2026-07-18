# SherpIA 🦙 v1.0 — Déploiement

App d'apprentissage de l'IA (chapitre pilote : Ch.3 « La révolution générative »).

## Déployer sur GitHub Pages (comme PyQuest / Cortex)

1. Dans ton repo GitHub (ex. `sherpia`), uploade les **7 fichiers** :
   `index.html`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`, `icon-192-maskable.png`, `icon-512-maskable.png`
2. Settings → Pages → déploiement depuis la branche `main` (dossier racine).
3. Ouvre l'URL `https://<ton-user>.github.io/sherpia/` sur ton téléphone.
4. Chrome Android → menu ⋮ → **« Installer l'application »**.

⚠️ Si tu avais déjà installé la v1.0 : désinstalle le raccourci existant avant
de réinstaller, sinon Android garde l'ancienne icône en cache (le cercle blanc).

### Pourquoi il y a 4 icônes
Android génère lui-même un cercle blanc autour d'une icône si l'app ne fournit
pas d'icône « maskable » (pensée pour être détourée). Les fichiers `-maskable`
ont le lama recentré avec la marge de sécurité qu'Android exige — c'est ce qui
corrige le rendu en raccourci.

## Mises à jour (prochains chapitres)

1. **Exporte ton code de sauvegarde** dans l'app (bouton 💾) — par précaution.
2. Remplace les fichiers dans le repo par ceux de la nouvelle version.
3. Rouvre l'app (le service worker se met à jour tout seul, le cache est versionné).
4. Ta progression locale est normalement conservée ; sinon, réimporte ton code 💾.

## Code de sauvegarde

Format `SHP1-…-XX`, versionné avec somme de contrôle. Il restaure toute la
progression (meilleurs scores, XP, rangs recalculés). Garde-le dans tes notes
après chaque chapitre terminé — un nettoyage du navigateur efface la sauvegarde locale.

## Tests (avant chaque livraison)

```
cd sherpia && python3 -m http.server 8123 &
node test.js   # nécessite playwright
```

70 vérifications : parcours complet des 5 leçons + TP, XP, déblocages,
export/import, checksum, uniformité du mélange Fisher-Yates, anti-farming.
