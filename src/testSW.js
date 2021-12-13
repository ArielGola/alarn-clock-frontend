const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);


export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            console.log("Service worker files paths do not match");
            return;
        };
        
        window.addEventListener('load', () => {
        
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
    
            if (isLocalhost) {
    
                changeConfigHeaders(swUrl, config);
    
                navigator.serviceWorker.ready.then(() => {
                    console.log('ServiceWorker is running as a service in localhost');
                });
    
            } else {
                validateRegister(swUrl, config);
                console.log("validateRegister (running)");
            }
        });
    };
};


function changeConfigHeaders(swUrl, config) {
    try {
        fetch(swUrl, {headers: {'Service-Worker': 'script'}})
            .then((res) => {
                const contentType = res.headers.get('content-type');

                if (
                    res.status === 404 || 
                    (contentType != null && contentType.indexOf('javascript') === -1)
                ) {

                    navigator.serviceWorker.ready.then((registration) => {
                        registration.unregister().then(() => {
                            window.location.reload();
                        })
                    });

                } else {
                    validateRegister(swUrl, config);
                    console.log("validateRegister (running)");
                };
            })
            .catch(() => {
                console.log('No connection to ineternet now, app is running in offline mode.');
            });
    } catch (error) {
        console.log('changeConfigHeaders BAD');  
    };
};


function validateRegister(swUrl, config) {
    navigator.serviceWorker.register(swUrl)
        .then((registration) => {

            loadPeriodicBackgroundSync(registration)

            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return null;
                };
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {

                            console.log('New content is available and will be used when all tabs for this page are closed');

                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            };
                        } else {

                            console.log('Content is cached for offline use.');

                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                }
            }
        })
        .catch((error) => {
            console.error('Error during service worker registrtion.', error.message);
        });
};


export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready()
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
};


async function loadPeriodicBackgroundSync(registration) {
  
    if ('periodicSync' in registration) {
  
      if ('periodicSync' in registration) {
  
        const status = await navigator.permissions.query({
          name: 'periodic-background-sync',
        });
  
        if (status.state === 'granted') {
  
          try {
  
            await registration.periodicSync.register({
                tag: 'hola',
                minPeriod: 30 * 60
            });
  
            console.log('Periodic sync ON!');
  
          } catch (error) {
            console.log("Periodic sync AREN'T ON", error);
          };
  
        }
      };
    };
  };