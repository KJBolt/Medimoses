# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': 'Medimoses',
    'version': '1.1',
    'sequence': 1,
    'module_type': 'official',
    'summary': 'A system for managing business operations',
    'images': [],
    'depends': [
        'web', 'purchase','base', 'contacts', 'stock','hr', 'mail', 'sale_management', 'mrp'
    ],
    'data': [
        'views/menus.xml',
        'views/dashboard.xml',
    ],
    'installable': True,
    'application': True,
    'assets': {
        'web.assets_backend': [
            'medimoses/static/src/img/js/dashboard.js',
            'medimoses/static/src/xml/dashboard.xml',
        ],
        'web.assets_frontend': [],
    },
    'images': [],
    'license': 'LGPL-3',
}
