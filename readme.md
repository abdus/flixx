[![Maintainability](https://api.codeclimate.com/v1/badges/05ae8ebf246cba5e1015/maintainability)](https://codeclimate.com/github/abdus/flixx/maintainability)

![flixx](./docs/flixx.png)

> browse through movies, save your favorite ones for later

Design is not my own. It's from [simantOo on Dribbble](https://dribbble.com/shots/10795979-Movie-App-Free)

# Flixx

Flixx is an android app which allows user to browse through different movie
genre. It fetches information from The Movie Database. Please note, this project
is still in work.

## Pre-built APK

If you want to try it out in your own android phone, you can find a downloadable
APK file on project [Release page](https://github.com/abdus/flixx/releases/).

Mind it, it is not a good thing to download random APKs from web and use it.
Always get them from Play Store or F-Droid.

## Local Development

This is a bare React Native project. So, you should be able to get it running in
couple of simple commands.

1. Clone this codebase: `git clone https://github.com/abdus/flixx.git`
2. `cd flixx`
3. Run `yarn` to install packages
4. Start Metro server: `yarn start`
5. Open a separate terminal, `cd` to `flixx` and run `yarn android`. This
   command will build and install the APK in connected device.

That's it.

## License

GPL3
