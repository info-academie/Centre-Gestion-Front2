const URL_PROD = `https://centre-api.infoacademie.com`;

export const environment = {
  production: true,
  apiUrl : `${URL_PROD}/api`,
  url : `${URL_PROD}`,
  mobile : false
};

const IMAGE = 'assets/404.png';

export function displayImage(urlImage: string) {
  if (!urlImage) {
    return IMAGE;
  }
  if (urlImage && urlImage.startsWith('http')) {
    return urlImage;
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
