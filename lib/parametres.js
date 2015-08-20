
module.exports = {
    
    folderName: 'cron',
    // Inject Boxs in dashboard
    // dashboadBoxs is an array of dashboardBox 
    dashboardBoxs: [{
        title: 'Cron rules',
        // the name of your Angular Controller for this box (put an empty string if you don't use angular)
        ngController: 'cronController as vm',
        file : 'box.ejs',
        icon: 'fa fa-time',
        type: 'box-primary'
    }],
    // link assets to project
    linkAssets: true
};