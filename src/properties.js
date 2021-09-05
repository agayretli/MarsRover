const config = require('../config');
const { I18n } = require('i18n')
const path = require('path')

const i18n = new I18n({
    locales: ['en'],
    directory: path.join(__dirname, '../locales'),
    defaultLocale: 'en'
})

i18n.setLocale(config.language);

const properties = [
    {
        description: i18n.__('mapDescribe'),
        name: 'map',
        validator: /^([1-9]) ([1-9])$/,
        warning: i18n.__('mapWarn'),
        required: true
    },
    {
        description: i18n.__('vehicleDescribe'),
        name: 'vehicle',
        validator: /^\d \d ([NSWE])$/,
        warning: i18n.__('vehicleWarn'),
        required: true
    },
    {
        description: i18n.__('commandDescribe'),
        name: 'command',
        validator: /^([LRM])+$/,
        warning: i18n.__('commandWarn'),
        required: true
    }
];

module.exports = properties;