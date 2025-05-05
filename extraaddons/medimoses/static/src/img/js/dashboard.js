/** @odoo-module */
import {registry} from '@web/core/registry';
import {Component, useRef, onWillStart, onMounted} from '@odoo/owl';
import {useService} from '@web/core/utils/hooks';
import {loadJS} from '@web/core/assets';

export class Dashboard extends Component {
    setup() {
        this.orm = useService('orm');
        this.action = useService('action');
        
        // Create refs for each chart
        this.purchaseChartRef = useRef('purchaseChart');
        this.salesChartRef = useRef('salesChart');
        this.manufacturingChartRef = useRef('manufacturingChart');
        
        this.state = {
            purchaseData: [],
            salesData: [],
            manufacturingData: [],
            labels: []
        };

        onWillStart(async () => {
            try {
                await loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js");
                await this.fetchOrderData();
            } catch (error) {
                console.error("Error loading Chart.js or fetching data:", error);
            }
        });
        
        onMounted(() => {
            this.renderCharts();
        });
    }

    async fetchOrderData() {
        // Get current date
        const today = new Date();
        const labels = [];
        const purchaseData = [];
        const salesData = [];
        const manufacturingData = [];
        
        // Set start date to May 5th of the current year
        const startDate = new Date(today.getFullYear(), 4, 5); // Month is 0-indexed, so 4 = May
        
        // If today is before May 5th of this year, use May 5th of last year
        if (today < startDate) {
            startDate.setFullYear(startDate.getFullYear() - 1);
        }
        
        // Calculate number of days from May 5th to today
        const dayCount = Math.floor((today - startDate) / (24 * 60 * 60 * 1000)) + 1;
        
        // Format dates for domain queries (YYYY-MM-DD format)
        const formatDate = (date) => {
            return date.toISOString().split('T')[0];
        };
        
        // Generate data for each day from May 5th up to today
        for (let i = 0; i < dayCount; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            // Format date for display
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            
            const dateStr = formatDate(date);
            
            // Count purchase orders for this day
            const purchaseCount = await this.orm.searchCount('purchase.order', [
                ['date_order', '>=', `${dateStr} 00:00:00`],
                ['date_order', '<=', `${dateStr} 23:59:59`]
            ]);
            purchaseData.push(purchaseCount);
            
            // Count sales orders for this day
            const salesCount = await this.orm.searchCount('sale.order', [
                ['date_order', '>=', `${dateStr} 00:00:00`],
                ['date_order', '<=', `${dateStr} 23:59:59`]
            ]);
            salesData.push(salesCount);
            
            // Count manufacturing orders for this day
            const manufacturingCount = await this.orm.searchCount('mrp.production', [
                ['create_date', '>=', `${dateStr} 00:00:00`],
                ['create_date', '<=', `${dateStr} 23:59:59`]
            ]);
            manufacturingData.push(manufacturingCount);
        }
        
        this.state.labels = labels;
        this.state.purchaseData = purchaseData;
        this.state.salesData = salesData;
        this.state.manufacturingData = manufacturingData;
    }

    renderCharts() {
        if (!window.Chart) {
            console.error("Chart.js not loaded yet!");
            return;
        }

        // Render Purchase Orders Chart
        this.renderPurchaseChart();
        
        // Render Sales Orders Chart
        this.renderSalesChart();
        
        // Render Manufacturing Orders Chart
        this.renderManufacturingChart();
    }
    
    renderPurchaseChart() {
        const canvas = this.purchaseChartRef.el;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.state.labels,
                datasets: [{
                    label: "Purchase Orders",
                    data: this.state.purchaseData,
                    backgroundColor: "rgba(54, 162, 235, 0.7)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Orders'
                        }
                    }
                }
            }
        });
    }
    
    renderSalesChart() {
        const canvas = this.salesChartRef.el;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.state.labels,
                datasets: [{
                    label: "Sales Orders",
                    data: this.state.salesData,
                    backgroundColor: "rgba(75, 192, 192, 0.7)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Orders'
                        }
                    }
                }
            }
        });
    }
    
    renderManufacturingChart() {
        const canvas = this.manufacturingChartRef.el;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.state.labels,
                datasets: [{
                    label: "Manufacturing Orders",
                    data: this.state.manufacturingData,
                    backgroundColor: "rgba(255, 159, 64, 0.7)",
                    borderColor: "rgba(255, 159, 64, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Orders'
                        }
                    }
                }
            }
        });
    }

    viewPurchaseOrders() {
        this.env.services['action'].doAction('purchase.purchase_form_action', {
            clear_breadcrumbs: true
        });
    }

    viewSalesOrders() {
        this.env.services['action'].doAction('sale.action_orders', {
            clear_breadcrumbs: true
        });
    }

    viewManufacturingOrders() {
        this.env.services['action'].doAction('mrp.action_picking_tree_mrp_operation', {
            clear_breadcrumbs: true
        });
    }
}

Dashboard.template = 'medimoses.Dashboard';
registry.category('actions').add('medimoses.dashboard', Dashboard);
