# ⚛️ Ionic Cordova Base App

Aplicación base de desarrollo móvil utilizando **Ionic Framework** y **Angular** con integración nativa a través de **Cordova**. Ideal para iniciar proyectos escalables.

## 🚀 Características Clave

- Construido con **Ionic 8** y **Angular 20** (Standalone Components).
- Integración nativa a través de **Cordova 12**.
- Configuración de `config.xml` optimizada para **Android (SDK 35)** e **iOS** (Uso de WKWebView).
- Soporte para **Splash Screen** e **Íconos** configurado en el `config.xml`.
- Scripts de conveniencia para ejecutar en dispositivos con *live-reload* y compilar versiones de *release*.
- Dependencias de desarrollo para **ESLint** y **TypeScript 5.8**.

---

## 📦 Scripts y Comandos Disponibles

Estos comandos, definidos en `package.json`, te ayudarán en el ciclo de desarrollo y compilación de tu aplicación.

| Script | Descripción |
| :--- | :--- |
| `npm start` | Inicia el servidor de desarrollo de **Angular** (`ng serve`). |
| `npm run ionic:serve` | Inicia la app **Ionic** en el navegador para desarrollo web. |
| `npm run build` | Compila la aplicación web para producción (`ng build`). |
| `npm run android` | Ejecuta la app en **Android** con *live-reload* y `ionic cordova run android -l`. |
| `npm run ios` | Ejecuta la app en **iOS** con *live-reload* y `ionic cordova run ios -l`. |
| `npm run android:debug` | **Compila la APK/AAB** de Android en modo **`--debug`**. |
| `npm run android:release` | **Compila la APK/AAB** de Android en modo **`--release`** (Lista para subir a tiendas). |
| `npm run ios:debug` | **Compila la app iOS** en modo **`--debug`**. |
| `npm run ios:release` | **Compila la app iOS** en modo **`--release`** (Lista para subir a tiendas). |
| `npm run test` | Ejecuta las pruebas unitarias con Karma + Jasmine. |
| `npm run lint` | Ejecuta el linter con ESLint para mantener la calidad del código. |

---

## 📱 Configuración Nativa (Cordova)

El archivo `config.xml` contiene las configuraciones nativas principales:

### Identificación
| Parámetro | Valor |
| :--- | :--- |
| **ID del Paquete** | `com.jaime.base` |
| **Nombre Visible** | `Ionic Cordova Base App` |
| **Autor** | `Jaime Andres Peralta Charris` |

### Preferencias Clave
- **Orientación:** `portrait` (Vertical).
- **WebView iOS:** `WKWebViewOnly` es `true`.
- **SDK Android:** `minSdkVersion` **22** y `targetSdkVersion` **35**.
- **Splash Screen:** Retraso de **3000ms** y auto-ocultado.

### Plugins Incluidos
- `cordova-plugin-statusbar`
- `cordova-plugin-device`
- `cordova-plugin-splashscreen`
- `cordova-plugin-ionic-webview`
- `cordova-plugin-ionic-keyboard`

---

## 📂 Estructura de Desarrollo

La estructura es la estándar de un proyecto Ionic con Angular, lista para comenzar a añadir *features* y páginas.

```bash
ionic-cordova-base-app/
├── node_modules/
├── platforms/              # Estructura nativa (android/ios) generada por Cordova
├── www/                    # Output de la compilación web
├── src/
│   ├── app/                # Componentes y lógica de la aplicación
│   ├── assets/             # Recursos estáticos (imágenes, iconos, etc.)
│   ├── environments/       # Archivos de configuración de entorno
│   ├── index.html          # Punto de entrada principal
│   └── main.ts             # Arranque de Angular
├── resources/              # Íconos y Splash Screens de Cordova (Generados con Ionic)
├── config.xml              # Configuración nativa principal de Cordova
└── package.json            # Dependencias y scripts