import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Ducktion Documentation',
    description: 'Ducktion Documentation desc',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Getting started', link: '/getting-started'},
            {text: 'Changelog', link: 'https://github.com/therealironduck/Ducktion/blob/develop/CHANGELOG.md'},
        ],

        sidebar: [
            {
                text: 'Introduction',
                items: [
                    {text: 'Getting started', link: '/getting-started'},
                    {text: 'Installation', link: '/installation'},
                ]
            },
            {
                text: 'Basics',
                items: [
                    {text: 'Configurator classes', link: '/basics/configurator-classes'},
                    {text: 'Register services', link: '/basics/register-services'},
                    {text: 'Resolving services', link: '/basics/resolving-services'},
                    {text: 'Overriding services', link: '/basics/overriding-services'},
                    {text: 'Configure the container', link: '/basics/configure-the-container'},
                ]
            },
            {
                text: 'Services',
                items: [
                    {text: 'Lazy Loading', link: '/services/lazy-loading'},
                    {text: 'Singleton services', link: '/services/singleton-services'},
                    {text: 'Dynamic instantiate', link: '/services/dynamic-instantiate'},
                    {text: 'Bind specific instances', link: '/services/bind-specific-instances'},
                    {text: 'Service IDs', link: '/services/service-ids'},
                ]
            },
            {
                text: 'Game Objects',
                items: [
                    {text: 'Handle prefabs', link: '/game-objects/handle-prefabs'},
                    {text: 'Mono Di Configurators', link: '/game-objects/mono-di-configurators'},
                ]
            },
            {
                text: 'Event Bus',
                items: [
                    {text: 'Using the eventbus', link: '/event-bus/using-the-eventbus'},
                    {text: 'Firing events', link: '/event-bus/firing-events'},
                    {text: 'Listening for events', link: '/event-bus/listening-for-events'},
                ]
            },
            {
                text: 'Testing',
                items: [
                    {text: 'Create a Unity Test', link: '/testing/create-a-unity-test'},
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/therealironduck/Ducktion/'}
        ]
    },
    sitemap: {
        hostname: 'https://ducktion.docs.jkniest.de'
    }
})