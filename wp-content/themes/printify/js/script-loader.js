
class ScriptLoaderService {
    loadedScripts = {};

    load(sourceUrl, opts) {
        let existingScript = document.head.querySelector(`[src="${sourceUrl}"]`);

        if (opts?.reload) {
            if (existingScript) document.head.removeChild(existingScript);
            this.loadedScripts[sourceUrl] = null;
            existingScript = null;
        }

        this.loadedScripts[sourceUrl] ??= new Promise((resolve, reject) => {
            if (existingScript) {
                setAttributes(existingScript, opts?.customAttr);
                resolve();
                return;
            }

            const scriptElement = document.createElement('script');

            scriptElement.setAttribute('type', 'text/javascript');
            scriptElement.setAttribute('src', sourceUrl);
            scriptElement.setAttribute('async', (opts?.async ?? true).toString());
            scriptElement.setAttribute('crossOrigin', 'anonymous');

            if (opts?.defer) {
                scriptElement.setAttribute('defer', 'defer');
            }

            scriptElement.onload = () => {
                resolve();
            };

            scriptElement.onerror = (error) => {
                reject(error);
            };

            setAttributes(scriptElement, opts?.customAttr);

            if (opts?.location) {
                opts.location.nativeElement.append(scriptElement);
                return;
            }
            document.head.append(scriptElement);
        });

        return this.loadedScripts[sourceUrl];
    }
}

function setAttributes(script, attrs) {
  if (!attrs?.length) return;
  attrs.forEach((attr) => script.setAttribute(attr.name, attr.value));
}

// Makes this available globally when loaded in head.php
const scriptLoader = new ScriptLoaderService();
