// import { BlockfrostProtocolParameters } from '../types/mod';

class ResponseError extends Error {
  response: unknown;
  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

// type ResponseResult = void | BlockfrostProtocolParameters;

export async function fetcher(
  url: string | URL,
  fetchOptions?: RequestInit,
): Promise<unknown> {
  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      throw new ResponseError('Bad request', response);
    }

    return await response.json();
  } catch (error) {
    // Handle the error, with full access to status and body
    // switch (error.response.status) {
    //   case 400:
    //     /* Handle */ break;
    //   case 401:
    //     /* Handle */ break;
    //   case 404:
    //     /* Handle */ break;
    //   case 500:
    //     /* Handle */ break;
    // }
  }
}
