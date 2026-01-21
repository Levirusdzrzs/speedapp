self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Écoute des messages venant de l'application
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
        const title = event.data.title;
        const options = event.data.options;
        
        // Affiche la notification système (persistante)
        self.registration.showNotification(title, options);
    }
});

// Clic sur la notification = Ouvre l'app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Si l'app est ouverte, on met le focus dessus
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url.includes('manage-orders.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            // Sinon on l'ouvre
            if (clients.openWindow) {
                return clients.openWindow('manage-orders.html');
            }
        })
    );
});
