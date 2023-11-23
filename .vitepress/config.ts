import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: 'Ducktion',
    description: 'Ducktion Documentation',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        search: {
            provider: 'local'
        },

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
                    {text: 'Configure the container', link: '/basics/'},
                    {text: 'Configurator classes', link: '/basics/configurator-classes'},
                    {text: 'Register services', link: '/basics/register-services'},
                    {text: 'Resolve services', link: '/basics/resolve-services'},
                    {text: 'Override services', link: '/basics/override-services'},
                ]
            },
            {
                text: 'Services',
                items: [
                    {text: 'Lazy Loading', link: '/services/lazy-loading'},
                    {text: 'Singleton services', link: '/services/singleton-services'},
                    {text: 'Bind specific instances', link: '/services/bind-specific-instances'},
                    {text: 'Dynamic instantiation', link: '/services/dynamic-instantiation'},
                    {text: 'Service IDs', link: '/services/service-ids'},
                    {text: 'Auto Resolve', link: '/services/auto-resolve'},
                ]
            },
            {
                text: 'Game Objects',
                items: [
                    {text: 'Handle prefabs', link: '/game-objects/handle-prefabs'}
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
                text: 'Testing & Debugging',
                items: [
                    {text: 'Internal logger', link: '/testing-and-debugging/logging'},
                ]
            },
            {
                text: 'Other',
                items: [
                    {text: 'API reference', link: '/api-reference'},
                    {text: 'Changelog', link: 'https://github.com/therealironduck/Ducktion/blob/develop/CHANGELOG.md'},
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