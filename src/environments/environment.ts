// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const URL_DEV = `http://localhost:5122`;
const URL_PROD = `https://api.infoacademie.com`;

export const environment = {
  production: false,
  apiUrl: `${URL_DEV}/api`,
  url: `${URL_DEV}`,
  mobile : false
};

const IMAGE = 'assets/404.png';

export function displayImage(urlImage: string) {
  if (!urlImage) {
    return IMAGE;
  }
  if (urlImage && urlImage?.startsWith('http')) {
    return urlImage;
  }
  if (urlImage.includes('/') === false) {
    return IMAGE;
  }

  return `${environment.url}/${urlImage}`;
}

export function newInstance<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function jsonParce<T>(s: string): T[] {
  try {
    return JSON.parse(s);
  } catch (error) {
    return [];
  }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
