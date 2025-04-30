# -*- coding: utf-8 -*-
# Part of School of Thought, Bangladesh and Geo Iworks, Ghana. See LICENSE file for full copyright and licensing details.

{
    "name": "Forestry Management System",
    "version": "17.0.0.2",
    "category": "Website",
    'license': 'OPL-1',
    'summary': 'Forestry Management System for Large Scale Plantation Projects',
    "description": """
        This odoo app helps user to manage forestry projects, plantations, nurseries, and other forestry related activities. 
        User can manage forestry projects, plantations, nurseries, and other forestry related activities.
    """,
    "author": "School of Thought, Bangladesh and Geo Iworks, Ghana",
    "website": "https://www.schoolofthought.com",
    "depends": ['product', 'purchase', 'stock', 'account', 'fleet', 'sot_mrp_formula_builder'],
    "data": [
        'security/ir.model.access.csv',

        'views/forest_pricelist_approval_views.xml',
        'views/forest_type_views.xml',
        'views/product_attribute_type_views.xml',
        'views/product_attribute_views.xml',
        'views/product_views.xml',

        # start rana
        'views/forest_rerverse_views.xml',
        'views/forest_tree_register_views.xml',
        'views/forest_tree_line_views.xml',
        'views/forest_tree_felling_views.xml',
        'views/machine_machine_views.xml',
        'views/certificate_status_views.xml',
        'views/forest_district_views.xml',
        'views/forest_property_mark_views.xml',
        'views/res_partner_views.xml',
        'views/vehicle_type_views.xml',

        'views/cross_cut_views.xml',
        'views/hauling_views.xml',
        'views/forest_tree_information_views.xml',
        'views/waybill_views.xml',
        'views/dashboard.xml',

        'views/menus.xml',
        'views/login_templates.xml',
        'data/forest_type_data.xml',
        'data/product_attribute_type_data.xml',
        'data/ir_sequence.xml',
        'data/certificate_status.xml',
        'data/ir_cron_inactive_date.xml',

        # reports
        'reports/waybill_report.xml',
        'reports/reports.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'sot_forestry/static/src/components/**/*.js',
            'sot_forestry/static/src/components/**/*.xml',
            'sot_forestry/static/src/components/**/*.scss',
            'sot_forestry/static/src/components/backend.css',
            'sot_forestry/static/src/views/**/*',

        ],
        'web.assets_common': [
            # Assets common to both frontend and backend
            'sot_forestry/static/src/components/moment.min.js',
        ],
    },
    'demo': [
        # 'data/product_demo.xml',
    ],
    "qweb": [],
    "auto_install": False,
    "installable": True,
    "application": True,
    "live_test_url": 'https://youtu.be/forestry-ghana',
}
