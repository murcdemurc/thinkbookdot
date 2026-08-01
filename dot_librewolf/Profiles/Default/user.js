// Managed LibreWolf-Einstellungen.
// Wird bei jedem Browser-Start zusätzlich zu prefs.js angewendet und
// überschreibt diese. prefs.js selbst wird vom Browser verwaltet und hier
// nur gesichert (siehe .chezmoiscripts/run_after_30_librewolf-backup.sh.tmpl).
//
// Syntax: user_pref("präferenz", wert);  -> zum Aktivieren Kommentar entfernen
// Alle geänderten Einstellungen live ansehen: about:config

// ===== Startseite / Neuer Tab =====
// user_pref("browser.newtabpage.enabled", true);
// user_pref("browser.startup.homepage", "https://start.duckduckgo.com");
// user_pref("browser.startup.page", 1);

// ===== Suche =====
// user_pref("browser.search.defaultenginename", "DuckDuckGo");
// user_pref("browser.urlbar.update2.engineAliasRefresh", true);

// ===== Privatsphäre (nur falls LibreWolf-Defaults angepasst werden sollen) =====
// user_pref("privacy.resistFingerprinting", true);
// user_pref("network.http.referer.XOriginPolicy", 2);
// user_pref("webgl.disabled", true);

// ===== Downloads =====
// user_pref("browser.download.useDownloadDir", false);          // immer nach Ort fragen
// user_pref("browser.download.alwaysOpenPanel", false);

// ===== Aussehen / Theme =====
// Nutzt die in chrome/userChrome.css definierten Anpassungen
// user_pref("toolkit.legacyUserProfileCustomizations.stylesheets", true);
// user_pref("ui.systemUsesDarkTheme", 1);
// user_pref("browser.theme.dark-private-windows", true);
