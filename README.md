# Synapse

Веб-драйвер для мышей Razer. Работает в Chrome / Edge через [WebHID](https://developer.mozilla.org/en-US/docs/Web/API/WebHID_API), без установки Razer Synapse.

Страница: https://codexdev.ru/synapse

Сайт отдаёт `humoridze.github.io` (кастомный домен). Чтобы `/synapse` работал, файлы лежат в папке `synapse/` того репозитория. Этот репозиторий — исходники драйвера.

Протокол команд — [OpenRazer](https://github.com/openrazer/openrazer). Проект не связан с Razer Inc.

## Сейчас поддерживается

| Мышь | VID:PID |
| --- | --- |
| DeathAdder Essential (2021) | `1532:0098` |

Для этой модели: DPI (оси X/Y), частота опроса 125/500/1000 Гц, яркость и эффекты логотипа (выкл / статичный / дыхание). Цвет LED аппаратно зелёный.

## Как пользоваться

1. Chromium-браузер (Chrome, Edge, Opera) и HTTPS.
2. Мышь по USB. Razer Synapse лучше закрыть.
3. «Подключить мышь» → выбрать устройство в системном диалоге.
4. Если Chrome показывает только «мышь» и соединение не проходит — это защищённая HID-коллекция. Нужен vendor-интерфейс того же устройства (обычно он есть в том же списке).

Настройки пишутся в память мыши, фоновый процесс не нужен.

## Добавить новую мышь

1. Создать `js/devices/<slug>.js` по образцу `deathadder-essential-2021.js`.
2. Импортировать профиль в `js/devices/registry.js` и добавить в `catalog`.
3. Transaction ID, DPI, polling protocol (`v1` / `v2`) и зоны подсветки брать из OpenRazer (`driver/razermouse_driver.c`, `daemon/openrazer_daemon/hardware/mouse.py`).

Профиль описывает возможности. UI собирается по ним: карточки DPI, опроса и подсветки появляются только если они есть у модели.

## Локальный запуск

Нужен HTTP(S), `file://` WebHID не откроет.

```bash
python -m http.server 8080
```

Открыть `http://localhost:8080`.

GitHub Pages: Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
