interface ApiReturnType {
  data?: object[] | object;
  error?: Error;
  headers?: Headers;
}

export class NetworkRequest {
  private apiKey: string = '9526f02a9f92adaf39272b5d785cff61';
  private baseUri: string = 'https://api.themoviedb.org/3';
  private headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  });

  constructor(apiKey?: string) {
    apiKey && (this.apiKey = apiKey);
  }

  async getAmovie(id: number): Promise<ApiReturnType> {
    try {
      const resp = await fetch(
        `${this.baseUri}/movie/${id}?api_key=${this.apiKey}`,
        {
          headers: this.headers,
          method: 'GET',
        }
      );

      return await handleRawResp(resp);
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async discoverMovies(): Promise<ApiReturnType> {
    try {
      const resp = await fetch(
        `${this.baseUri}/discover/movie?api_key=${this.apiKey}`,
        {
          headers: this.headers,
          method: 'GET',
        }
      );

      return await handleRawResp(resp);
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async movieCategoris(): Promise<ApiReturnType> {
    try {
      const resp = await fetch(
        `${this.baseUri}/genre/movie/list?api_key=${this.apiKey}`,
        {
          headers: this.headers,
          method: 'GET',
        }
      );

      return await handleRawResp(resp);
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }
}

async function handleRawResp(resp: any): Promise<ApiReturnType> {
  if (resp.ok) {
    const parsed = await resp.json();

    return { data: parsed ?? parsed.message, headers: resp.headers };
  } else {
    // error code !== 2xx
    const parsed = await resp.json();
    return { error: parsed, headers: resp.headers };
  }
}
