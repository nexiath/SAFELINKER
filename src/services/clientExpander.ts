// Client-side URL expansion using iframe and other techniques
export class ClientURLExpander {
  
  async expandUrl(url: string): Promise<string> {
    try {
      // Method 1: Try using an iframe with sandbox
      const iframeMethod = await this.tryIframeMethod(url);
      if (iframeMethod && iframeMethod !== url) {
        return iframeMethod;
      }

      // Method 2: Try head request with fetch
      const fetchMethod = await this.tryFetchMethod(url);
      if (fetchMethod && fetchMethod !== url) {
        return fetchMethod;
      }

      // Method 3: Try known patterns for popular shorteners
      const patternMethod = await this.tryPatternExpansion(url);
      if (patternMethod && patternMethod !== url) {
        return patternMethod;
      }

      return url; // Return original if all methods fail
    } catch (error) {
      console.warn('URL expansion failed:', error);
      return url;
    }
  }

  private async tryIframeMethod(url: string): Promise<string | null> {
    return new Promise((resolve) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.sandbox = 'allow-scripts allow-same-origin';
      
      let resolved = false;
      const timeout = setTimeout(() => {
        if (!resolved) {
          resolved = true;
          document.body.removeChild(iframe);
          resolve(null);
        }
      }, 3000);

      iframe.onload = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          
          try {
            const finalUrl = iframe.contentWindow?.location.href;
            document.body.removeChild(iframe);
            resolve(finalUrl || null);
          } catch (error) {
            document.body.removeChild(iframe);
            resolve(null);
          }
        }
      };

      iframe.onerror = () => {
        if (!resolved) {
          resolved = true;
          clearTimeout(timeout);
          document.body.removeChild(iframe);
          resolve(null);
        }
      };

      iframe.src = url;
      document.body.appendChild(iframe);
    });
  }

  private async tryFetchMethod(url: string): Promise<string | null> {
    try {
      // Try with no-cors mode to at least get redirected URL
      const response = await fetch(url, { 
        method: 'HEAD', 
        mode: 'no-cors',
        redirect: 'follow',
        cache: 'no-cache'
      });
      
      // Check if URL changed (might work for some redirects)
      return response.url !== url ? response.url : null;
    } catch (error) {
      return null;
    }
  }

  private async tryPatternExpansion(url: string): Promise<string | null> {
    const urlObj = new URL(url);
    
    // Bit.ly pattern: try to construct the info URL
    if (urlObj.hostname === 'bit.ly') {
      const code = urlObj.pathname.slice(1);
      // Try different patterns
      const patterns = [
        `https://bitly.com/${code}+`,
        `https://bit.ly/${code}+`,
        `http://bit.ly/${code}+`
      ];
      
      for (const pattern of patterns) {
        try {
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(pattern)}`;
          const response = await fetch(proxyUrl);
          
          if (response.ok) {
            const data = await response.json();
            const content = data.contents;
            
            // Look for the original URL in various places
            const patterns = [
              /data-long-url="([^"]+)"/,
              /long_url["']?\s*:\s*["']([^"']+)["']/,
              /"long_url":"([^"]+)"/,
              /originalURL["']?\s*:\s*["']([^"']+)["']/
            ];
            
            for (const pattern of patterns) {
              const match = content.match(pattern);
              if (match && match[1]) {
                return decodeURIComponent(match[1]);
              }
            }
          }
        } catch (error) {
          continue;
        }
      }
    }

    // TinyURL pattern
    if (urlObj.hostname === 'tinyurl.com') {
      const code = urlObj.pathname.slice(1);
      try {
        const previewUrl = `https://preview.tinyurl.com/${code}`;
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(previewUrl)}`;
        const response = await fetch(proxyUrl);
        
        if (response.ok) {
          const data = await response.json();
          const content = data.contents;
          
          const patterns = [
            /redirecturl=([^&"']+)/,
            /data-url="([^"]+)"/,
            /"redirecturl":"([^"]+)"/
          ];
          
          for (const pattern of patterns) {
            const match = content.match(pattern);
            if (match && match[1]) {
              return decodeURIComponent(match[1]);
            }
          }
        }
      } catch (error) {
        // Continue to other methods
      }
    }

    // t.co (Twitter) - harder to expand, return as-is
    if (urlObj.hostname === 't.co') {
      // Twitter's t.co links require special handling
      // For now, we'll just note it's a Twitter short link
      return url;
    }

    return null;
  }
}

export const clientExpander = new ClientURLExpander();