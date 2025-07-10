// Alternative backend API for URL analysis when client-side fails
export interface RedirectAPIResponse {
  success: boolean;
  originalUrl: string;
  finalUrl: string;
  redirectChain: Array<{
    url: string;
    statusCode: number;
    headers: Record<string, string>;
  }>;
  error?: string;
}

class RedirectAPI {
  private async callBackendAPI(url: string): Promise<RedirectAPIResponse | null> {
    // Try multiple public APIs for URL expansion
    const apis = [
      {
        name: 'Unshorten.it',
        endpoint: 'https://unshorten.it/json/',
        method: 'POST',
        body: { url },
        parser: (data: any) => ({
          success: true,
          originalUrl: url,
          finalUrl: data.resolved_url || url,
          redirectChain: [
            { url, statusCode: 301, headers: {} },
            { url: data.resolved_url || url, statusCode: 200, headers: {} }
          ]
        })
      },
      {
        name: 'JSONP Unshortener',
        endpoint: `https://jsonp.afeld.me/?url=${encodeURIComponent(`https://unshorten.it/json/`)}`,
        method: 'POST',
        body: { url },
        parser: (data: any) => ({
          success: true,
          originalUrl: url,
          finalUrl: data.resolved_url || url,
          redirectChain: [
            { url, statusCode: 301, headers: {} },
            { url: data.resolved_url || url, statusCode: 200, headers: {} }
          ]
        })
      }
    ];

    for (const api of apis) {
      try {
        console.log(`Trying ${api.name} API...`);
        
        const response = await fetch(api.endpoint, {
          method: api.method,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: api.method === 'POST' ? JSON.stringify(api.body) : undefined
        });

        if (response.ok) {
          const data = await response.json();
          console.log(`${api.name} response:`, data);
          
          return api.parser(data);
        } else {
          console.warn(`${api.name} failed with status:`, response.status);
        }
      } catch (error) {
        console.warn(`${api.name} error:`, error);
      }
    }

    return null;
  }

  async expandUrl(url: string): Promise<RedirectAPIResponse> {
    try {
      // Validate URL first
      new URL(url);
      
      // Try backend APIs
      const apiResult = await this.callBackendAPI(url);
      if (apiResult) {
        return apiResult;
      }

      // Try direct expansion for known shorteners
      const expanded = await this.tryDirectExpansion(url);
      if (expanded) {
        return expanded;
      }

      // Fallback - return original URL
      return {
        success: false,
        originalUrl: url,
        finalUrl: url,
        redirectChain: [{ url, statusCode: 200, headers: {} }],
        error: 'Unable to expand URL - all services failed'
      };

    } catch (error) {
      return {
        success: false,
        originalUrl: url,
        finalUrl: url,
        redirectChain: [{ url, statusCode: 400, headers: {} }],
        error: error instanceof Error ? error.message : 'Invalid URL'
      };
    }
  }

  private async tryDirectExpansion(url: string): Promise<RedirectAPIResponse | null> {
    const urlObj = new URL(url);
    
    // Special handling for bit.ly
    if (urlObj.hostname === 'bit.ly') {
      try {
        // Try bit.ly's info endpoint
        const infoUrl = `https://bit.ly/${urlObj.pathname.slice(1)}+`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(infoUrl)}`);
        
        if (response.ok) {
          const data = await response.json();
          const content = data.contents;
          
          // Parse the HTML to find the actual URL
          const urlMatch = content.match(/data-long-url="([^"]+)"/);
          if (urlMatch) {
            return {
              success: true,
              originalUrl: url,
              finalUrl: urlMatch[1],
              redirectChain: [
                { url, statusCode: 301, headers: {} },
                { url: urlMatch[1], statusCode: 200, headers: {} }
              ]
            };
          }
        }
      } catch (error) {
        console.warn('Bit.ly direct expansion failed:', error);
      }
    }

    // Special handling for tinyurl
    if (urlObj.hostname === 'tinyurl.com') {
      try {
        const previewUrl = `https://preview.tinyurl.com/${urlObj.pathname.slice(1)}`;
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(previewUrl)}`);
        
        if (response.ok) {
          const data = await response.json();
          const content = data.contents;
          
          const urlMatch = content.match(/redirecturl=([^&"]+)/);
          if (urlMatch) {
            const decodedUrl = decodeURIComponent(urlMatch[1]);
            return {
              success: true,
              originalUrl: url,
              finalUrl: decodedUrl,
              redirectChain: [
                { url, statusCode: 301, headers: {} },
                { url: decodedUrl, statusCode: 200, headers: {} }
              ]
            };
          }
        }
      } catch (error) {
        console.warn('TinyURL direct expansion failed:', error);
      }
    }

    return null;
  }
}

export const redirectAPI = new RedirectAPI();