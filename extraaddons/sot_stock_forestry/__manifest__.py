# -*- coding: utf-8 -*-
# Part of School of Thought, Bangladesh and Geo Iworks, Ghana. See LICENSE file for full copyright and licensing details.

{
    "name": "Forestry Stock Management",
    "version": "17.0.0.2",
    "category": "Inventory/Inventory",
    'license': 'OPL-1',
    'summary': 'Inventory Management System for Large Scale Plantation Projects',
    "description": """
        This odoo app helps user to manage forestry projects, plantations, nurseries, and other forestry related activities. 
        User can manage forestry projects, plantations, nurseries, and other forestry related activities.
    """,
    "author": "School of Thought, Bangladesh and Geo Iworks, Ghana",
    "website": "https://www.schoolofthought.com",
    "depends": ['sot_forestry'],
    "data": [
        'views/stock_picking_views.xml',
        'views/stock_quant_views.xml',
        
    ],
    "qweb": [],
    "auto_install": False,
    "installable": True,
    "application": True,
    "live_test_url": 'https://youtu.be/forestry-ghana',
}
